#include "combinedOutput.h"
#include "highGCalibrated.h"
#include "mpu6050calibrated.h"

CombinedOutput::CombinedOutput()
{
    MPU6050Calibrated mpuSensor;
    HighGCalibrated highGSensor;
    mpuSensor.begin();
    mpuSensor.calibrate();
    highGSensor.begin();
}

int CombinedOutput::isAnImpact()
{

    mpuSensor.update();
    angleX = mpuSensor.getAngleX();
    angleY = mpuSensor.getAngleY();
    angleZ = mpuSensor.getAngleZ();
    highGSensor.calibrate();
    aX = highGSensor.readAccX();
    aY = highGSensor.readAccY();
    aZ = highGSensor.readAccZ();

    float m11, m12, m13, m21, m22, m23, m31, m32, m33;

    m11 = 1.123;
    m12 = 0.002;
    m13 = -0.058;
    m21 = 0.002;
    m22 = 1.223;
    m23 = 0.104;
    m31 = -0.058;
    m32 = 0.104;
    m33 = 0.918;

    float vx, vy, vz;

    vx = m11 * aX + m12 * aY + m13 * aZ;
    vy = m21 * aX + m22 * aY + m23 * aZ;
    vz = m31 * aX + m32 * aY + m33 * aZ;

    aX = vx;
    aY = vy;
    aZ = vz;
    magnitude = sqrt(aX * aX + aY * aY + aZ * aZ);
    if (magnitude > 14.0)
    {
        return 1;
    }
    else
    {
        return 0;
    }
};

String CombinedOutput::getDirection()
{

    const double threshold = 0.1; // Adjust this threshold value as needed

    // Check if the magnitude of the acceleration in any axis is above the threshold
    if (std::abs(aX) > threshold || std::abs(aY) > threshold || std::abs(aZ) > threshold)
    {
        // Check the dominant axis
        if (std::abs(aX) >= std::abs(aY) && std::abs(aX) >= std::abs(aZ))
        {
            if (aX > 0)
                return "Right";
            else
                return "Left";
        }
        else if (std::abs(aY) >= std::abs(aX) && std::abs(aY) >= std::abs(aZ))
        {
            if (aY > 0)
                return "Top";
            else
                return "Bottom";
        }
        else
        {
            if (aZ > 0)
                return "Front";
            else
                return "Back";
        }
    }

    // If the magnitude of acceleration is below the threshold, return "No movement"
    return "No movement";
}