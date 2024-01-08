import paho.mqtt.client as mqtt
import time
import random

# MQTT broker settings
broker_address = "localhost"
broker_port = 1883

# Number of buddy devices
num_buddies = 20

# Impact frequency (chance for a buddy to publish an impact each cycle)
impact_frequency = 0.25

# Maximum battery drain per cycle (percentage points)
max_drain = 3

# Create clients with initial battery levels and publishing intervals
clients = [
    (mqtt.Client(f"buddy_{i + 1}"),
     random.uniform(4, 16), random.randint(50, 100))
    for i in range(num_buddies)
]


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print(
            f"Client {client._client_id.decode('utf-8')} connected successfully")
    else:
        print(
            f"Failed to connect client {client._client_id.decode('utf-8')} with result code {rc}")


# Connect all clients to the broker
for client, _, _ in clients:
    client.on_connect = on_connect
    client.connect(broker_address, broker_port)
    client.loop_start()  # Start background thread for each client

while True:
    # Randomly shuffle the clients list
    random.shuffle(clients)

    for client, interval, battery_level in clients:
        # Simulate battery drain or no change
        new_battery_level = max(
            0, battery_level - (random.randint(0, max_drain)) / 20)
        client_id_str = client._client_id.decode("utf-8")
        topic = f"buddy/{client_id_str.split('_')[1]}/status"
        client.publish(topic, f"{new_battery_level}", qos=2, retain=True)

        # Update battery level for the next iteration
        battery_level = new_battery_level

        # Publish impacts less frequently and randomly
        if random.random() < impact_frequency:
            magnitude = random.randint(14, 100)
            direction = random.choice(
                ["left", "right", "front", "back", "top", "bottom"])
            topic = f"buddy/{client_id_str.split('_')[1]}/impact"
            client.publish(topic, f"{magnitude} {direction}", retain=True)

    time.sleep(5)  # Check for new publications every second
