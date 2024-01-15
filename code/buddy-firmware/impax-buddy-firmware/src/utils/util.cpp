#include "util.h"

// init leds
void initLED()
{
    pinMode(LED_ON_PIN, OUTPUT);
    pinMode(LED_WIFI_PIN, OUTPUT);
}

// // turn on LED_ON_PIN
void onLedOn()
{
    digitalWrite(LED_ON_PIN, HIGH);
}

void offLedOn()
{
    digitalWrite(LED_ON_PIN, LOW);
}

// turn on LED_WIFI_PIN
void onLedWifi()
{
    digitalWrite(LED_WIFI_PIN, HIGH);
}

void offLedWifi()
{
    digitalWrite(LED_WIFI_PIN, LOW);
}

int getBatteryStatus()
{
    float voltage = getBatteryVoltage();

    int percentage = 2808.3808 * pow(voltage, 4) - 43560.9157 * pow(voltage, 3) + 252848.5888 * pow(voltage, 2) - 650767.4615 * voltage + 626532.5703;
    if (voltage > 4.19)
        percentage = 100;
    else if (voltage <= 3.50)
        percentage = 0;

    // Calculate the percentage
    // return map(val, 0, 100, 0, 100);
    return percentage;
}

void batteryInit()
{
    for (int i = 0; i < MOVING_AVERAGE_SIZE; i++)
    {
        getBatteryVoltage();
        delay(1);
    }
}

float getBatteryVoltage()
{
    static float readings[MOVING_AVERAGE_SIZE];
    static int index = 0;
    static float sum = 0;

    // Read the raw value
    int rawValue = analogRead(BATTERY_READ);

    // Convert the raw value to voltage (assuming a voltage divider)
    float voltage = rawValue * (3.3 / 4095.0); // Adjust 3.3 to your actual reference voltage

    // Assuming a voltage divider with equal resistors, adjust the divisor accordingly
    voltage = voltage * 2.0;

    // Update the sum with the new reading and subtract the oldest reading
    sum = sum - readings[index] + voltage;

    // Store the new reading in the array
    readings[index] = voltage;

    // Move to the next index
    index = (index + 1) % MOVING_AVERAGE_SIZE;

    // Calculate the moving average
    float movingAverage = sum / MOVING_AVERAGE_SIZE;

    // Serial.print(voltage);
    // Serial.print(" - ");

    // for (int i = 0; i < MOVING_AVERAGE_SIZE; i++)
    // {
    //     Serial.print(readings[i]);
    //     Serial.print(", ");
    // }
    // Serial.println(movingAverage);

    return movingAverage;
}

void blinkLedWifi()
{
    static unsigned long lastTime = 0;
    static bool state = false;

    if (millis() - lastTime > LED_BLINK_DELAY)
    {
        lastTime = millis();
        state = !state;
        digitalWrite(LED_WIFI_PIN, state);
    }
}

void blinkLedOn()
{
    static unsigned long lastTime = 0;
    static bool state = false;

    if (millis() - lastTime > LED_BLINK_DELAY)
    {
        lastTime = millis();
        state = !state;
        digitalWrite(LED_ON_PIN, state);
    }
}

void led(int LED_STATE)
{
    if (LED_STATE == LED_OFF)
    {
        offLedOn();
        offLedWifi();
    }
    else if (LED_STATE == LED_BLINK)
    {
        onLedOn();
        blinkLedWifi();
    }
    else if (LED_STATE == LED_ON)
    {
        onLedOn();
        onLedWifi();
    }
    else if (LED_STATE == LED_BATTERY_LOW)
    {
        blinkLedOn();
        onLedWifi();
    }
}