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
    static float prevPercentage[MOVING_PERCENTAGE_SIZE];
    static int index = 0;

    float voltage = getBatteryVoltage();

    // Serial.println(voltage);

    int percentage = 2808.3808 * pow(voltage, 4) - 43560.9157 * pow(voltage, 3) + 252848.5888 * pow(voltage, 2) - 650767.4615 * voltage + 626532.5703;

    // // Check if the percentage is increasing
    // bool isIncreasingPercentage = (percentage > prevPercentage);
    // // Update the previous percentage value
    // prevPercentage = percentage;

    // if (isIncreasingPercentage)
    //     return CHARGIN_STATE;

    // Store the new reading in the array
    prevPercentage[index] = percentage;

    // Move to the next index
    index = (index + 1) % MOVING_PERCENTAGE_SIZE;

    // Serial.print(percentage);
    // Serial.print(" - ");

    // for (int i = 0; i < MOVING_PERCENTAGE_SIZE; i++)
    // {
    //     Serial.print(prevPercentage[i]);
    //     Serial.print(", ");
    // }
    // Serial.println("");

    // if (isIncreasing(prevPercentage, MOVING_PERCENTAGE_SIZE))
    //     return CHARGIN_STATE;

    if (voltage > VOLTAGE_UPPER_LIMIT || percentage > 100)
        return 100;
    else if (voltage <= VOLTAGE_LOWER_LIMIT || percentage <= 0)
        return 0;

    return percentage;
}

void batteryInit()
{
    for (int i = 0; i < MOVING_PERCENTAGE_SIZE; i++)
    {
        getBatteryStatus();
        delay(10);
    }

    for (int i = 0; i < MOVING_AVERAGE_SIZE; i++)
    {
        getBatteryVoltage();
        delay(10);
    }
}

bool batteryIsCharging(float *readings, int size)
{
    for (int i = 1; i < size; i++)
    {
        if (readings[i] >= readings[i - 1])
        {
            return false; // If any element is less than or equal to the previous one, the array is not strictly increasing
        }
    }
    return true; // If all elements are strictly increasing
}

float getBatteryVoltage(float *readings)
{
    static int index = 0;
    static float sum = 0;

    // Read the raw value
    int rawValue = analogRead(BATTERY_READ);

    // Convert the raw value to voltage (assuming a voltage divider)
    float voltage = rawValue * (Vref / 4095.0); // Adjust 3.3 to your actual reference voltage

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

bool isIncreasing(float arr[], int size)
{
    for (int i = 0; i < size - 1; i++)
    {
        if (arr[i] > arr[i + 1] || (arr[i] == 0.0 || arr[i + 1] == 0.0))
        {
            return false;
        }
    }
    return true;
}

float getBatteryVoltage()
{
    static float readings[MOVING_AVERAGE_SIZE];
    static int index = 0;
    static float sum = 0;

    // Read the raw value
    int rawValue = analogRead(BATTERY_READ);

    // Convert the raw value to voltage (assuming a voltage divider)
    float voltage = rawValue * (Vref / 4095.0); // Adjust 3.3 to your actual reference voltage

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

void fadeLedOn()
{
    static unsigned long lastTime = 0;
    static int brightness = 0;
    static int fadeDirection = 5; // 1 for increasing brightness, -1 for decreasing

    if (millis() - lastTime > LED_FADE_DELAY)
    {
        lastTime = millis();

        brightness += fadeDirection;

        // Change fade direction when reaching brightness limits
        if (brightness <= 0 || brightness >= 255)
        {
            fadeDirection = -fadeDirection;
        }

        analogWrite(LED_ON_PIN, brightness);
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
    else if (LED_STATE == LED_CHARGIN)
    {
        fadeLedOn();
        onLedWifi();
    }
}

int wakeup_reason()
{
    esp_sleep_wakeup_cause_t wakeup_reason;

    wakeup_reason = esp_sleep_get_wakeup_cause();

    switch (wakeup_reason)
    {
    case ESP_SLEEP_WAKEUP_EXT0:
        Serial.println("Wakeup caused by external signal using RTC_IO");
        return 1;
        break;
    default:
        Serial.printf("Wakeup was not caused by deep sleep: %d\n", wakeup_reason);
        return 0;
        break;
    }
}