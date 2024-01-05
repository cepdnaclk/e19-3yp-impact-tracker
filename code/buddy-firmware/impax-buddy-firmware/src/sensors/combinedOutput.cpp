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
    // Rotational Matrix
    m11 = std::cos(angleY) * std::cos(angleZ);
    m12 = std::cos(angleY) * std::sin(angleZ);
    m13 = -std::sin(angleY);
    m21 = std::sin(angleX) * std::sin(angleY) * std::cos(angleZ) - std::cos(angleX) * std::sin(angleZ);
    m22 = std::sin(angleX) * std::sin(angleY) * std::sin(angleZ) + std::cos(angleX) * std::cos(angleZ);
    m23 = std::sin(angleX) * std::cos(angleY);
    m31 = std::cos(angleX) * std::sin(angleY) * std::cos(angleZ) + std::sin(angleX) * std::sin(angleZ);
    m32 = std::cos(angleX) * std::sin(angleY) * std::sin(angleZ) - std::sin(angleX) * std::cos(angleZ);
    m33 = std::cos(angleX) * std::cos(angleY);

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
        return magnitude;
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