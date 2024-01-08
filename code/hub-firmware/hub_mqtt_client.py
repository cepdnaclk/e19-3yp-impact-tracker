import paho.mqtt.client as mqtt
from datetime import datetime
import json

# MQTT broker settings
broker_address = "raspberrypi"
broker_port = 1883
sport_data_topic = "sport_data_topic"
mapping_topic = "device_mapping_topic"

# Player to device mapping (player_id -> device_id)
player_device_mapping = {}

# Session variables
session_started = False
start_time = None
data_buffer = []

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("#")

def on_message(client, userdata, msg):
    global session_started, start_time, data_buffer, player_device_mapping

    data = json.loads(msg.payload.decode())

    if msg.topic == mapping_topic:
        # Update player to device mapping
        player_device_mapping = data
        print("Player to device mapping updated:", player_device_mapping)

    elif msg.topic == sport_data_topic:
        if "session_start" in data and data["session_start"] == True:
            session_started = True
            start_time = datetime.now()
            print("Session started!")

        if session_started:
            # Add timestamp to the received data
            data["timestamp"] = (datetime.now() - start_time).total_seconds()

            # Store the data in the buffer
            data_buffer.append(data)

def on_disconnect(client, userdata, rc):
    print("Disconnected with result code " + str(rc))

    # Process and save data when the session ends
    if session_started:
        save_data_to_file(data_buffer)

def save_data_to_file(data):
    with open("sport_session_data.txt", "a") as file:
        for entry in data:
            file.write(json.dumps(entry) + "\n")

# Create MQTT client
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect = on_disconnect

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
