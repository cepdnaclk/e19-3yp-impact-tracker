import RPi.GPIO as GPIO         # Import Raspberry Pi GPIO library
from time import sleep          # Import the sleep function 

pinLEDOn = 19                      # LED GPIO Pin
pinLEDCustom = 5                       # LED GPIO Pin

GPIO.setmode(GPIO.BCM)          # Use GPIO pin number
GPIO.setwarnings(False)         # Ignore warnings in our case
GPIO.setup(pinLEDOn, GPIO.OUT)    # GPIO pin as output pin
GPIO.setup(pinLEDCustom, GPIO.OUT)    # GPIO pin as output pin

GPIO.output(pinLEDOn, GPIO.HIGH)
GPIO.output(pinLEDCustom, GPIO.HIGH)

while True:                          # Endless Loop
    pass