import paho.mqtt.client as mqtt
from datetime import datetime
import json

# MQTT broker settings
broker_address = "raspberrypi"
broker_port = 1883

# MQTT topics
impact_topic = "buddy/+/impact"
mapping_topic = "player_map"
session_topic = "session"
session_end_topic = "session_end"
session_data= "session_data"
is_concussion_topic = "player/+/concussion"

# Player to device mapping (device_id:player_id)
player_device_mapping = {}

# Session variables
session_started = False
start_time = None
data_buffer = []
time_offset = 0

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("#")

def on_message(client, userdata, msg):
    global session_started, start_time, data_buffer, player_device_mapping,time_offset

    # data from dashboards - JSON objects
    try:
        data = json.loads(msg.payload.decode())

    # data from imapact buddies - ESP32 -text strings
    except json.JSONDecodeError:
        data = msg.payload.decode().split()

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
            start_time = datetime.now()
            time_offset = data["updatedAt"]-start_time
            print("Session updated!")

    elif msg.topic == impact_topic:
        if session_started:
            # Add timestamp to the received data and publish to the dashboards
            # data = magnitude direction
            device_id = msg.topic.split("/")[1]
            player_id = player_device_mapping[device_id]
            timestamp = datetime.now() + time_offset
            impact_json = {player_id:{"magnitude": data[0], "direction": data[1], "timestamp": timestamp, "isConcussion": False}}
            
            impact_with_time = "buddy/"+ device_id+ "/impact_with_timestamp"           
            client.publish(impact_with_time, json.dumps(impact_json), retain=True)
            
            # Store the data in the buffer
            data_buffer.append(impact_json)
    
    elif msg.topic == is_concussion_topic:
        # if concussion, record it in the buffer
        player_id = msg.topic.split("/")[1]
        timestamp = data["timestamp"]

        for entry in data_buffer:
            if entry[player_id]["timestamp"] == timestamp:
                entry[player_id]["isConcussion"] = data["isConcussion"]
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
