import paho.mqtt.client as mqtt
from datetime import datetime
import time
import json
import re

# MQTT broker settings
broker_address = "192.168.8.151"
broker_port = 1883

# MQTT topics
impact_topic = "buddy/+/impact"
mapping_topic = "player_map"
session_topic = "session"
session_end_topic = "session_end"
session_data = "session_data"
is_concussion_topic = "player/+/concussion"

# Player to device mapping (device_id:player_id)
player_device_mapping = {}

# Session variables
session_started = False
start_time = None
data_buffer = {}
time_offset = 0


def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("#")


def on_message(client, userdata, msg):
    global session_started, start_time, data_buffer, player_device_mapping, time_offset

    # data from dashboards - JSON objects
    print(msg.payload.decode())
    try:
        data = json.loads(msg.payload.decode())

    # data from imapact buddies - ESP32 -text strings
    except json.JSONDecodeError:
        data = msg.payload.decode().split(" ")
    print(data)

    if msg.topic == mapping_topic:
        # Update player to device mapping
        player_device_mapping = data
        print("Player to device mapping updated:", player_device_mapping)

    elif msg.topic == session_topic:
        if data["active"] == False:
            if session_started:
                end_session()
        else:
            session_started = True
            start_time = int(time.time()*1000)
            time_offset = data["updatedAt"]-start_time
            print("time offset:", time_offset)
            print("Session updated!")

    elif bool(re.search(r"buddy/\d+/impact$", msg.topic)):
        if session_started:
            # Add timestamp to the received data and publish to the dashboards
            # data = magnitude direction
            device_id = msg.topic.split("/")[1]
            if device_id in player_device_mapping:
                player_id = player_device_mapping[device_id]
                timestamp = int(time.time()*1000)+time_offset
                impact_json = data[0]+' '+data[1]+' '+ str(timestamp)
                timestamp = int(time.time()*1000)+timestamp
                impact_json = data[0]+' '+data[1]+' ' + str(timestamp)
                print(impact_json)

                impact_with_time = "buddy/" + device_id + "/impact_with_timestamp"
                client.publish(impact_with_time, impact_json, retain=True)

                # Store the data in the buffer
                if player_id not in data_buffer:
                    data_buffer[player_id] = []
                impact = {"magnitude": int(
                    data[0]), "direction": data[1], "timestamp": timestamp, "isConcussion": False}
                data_buffer[player_id].append(impact)

                # send total impact history to dashboards
                impact_history = data_buffer[player_id]
                impact_history_topic = "player/" + \
                    str(player_id)+"/impact_history"
                client.publish(impact_history_topic, json.dumps(
                    impact_history), retain=True)

    elif bool(re.search(r"player/\d+/concussion$", msg.topic)):
        # if concussion, record it in the buffer
        player_id = msg.topic.split("/")[1]
        timestamp = data["timestamp"]
        print(data)

        for impact in data_buffer[player_id]:
            if impact["timestamp"] == timestamp:
                impact["isConcussion"] = data["isConcussion"]
                break


def on_disconnect(client, userdata, rc):
    print("Disconnected with result code " + str(rc))


def end_session():
    global session_started, start_time, data_buffer, player_device_mapping
    session_started = False
    for entry in data_buffer:
        client.publish(session_data, json.dumps(entry), retain=True)

    data_buffer = []  # Clear the buffer after sending the stored data
    start_time = None
    player_device_mapping = {}
    print("Session ended!")


# Create MQTT client
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect = on_disconnect

client.username_pw_set("impax", "impax")

# Connect to the broker
client.connect(broker_address, broker_port, 60)

# Start the MQTT loop
client.loop_start()

try:
    while True:
        pass
except KeyboardInterrupt:
    # Gracefully disconnect on keyboard interrupt
    client.disconnect()
    client.loop_stop()
