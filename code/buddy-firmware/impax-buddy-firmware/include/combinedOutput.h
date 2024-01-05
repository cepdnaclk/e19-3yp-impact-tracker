#include "highGCalibrated.h"
#include "mpu6050calibrated.h"

class CombinedOutput
{
public:
    CombinedOutput();
    int isAnImpact();
    String getDirection();

private:
    MPU6050Calibrated mpuSensor;
    HighGCalibrated highGSensor;
    float aX, aY, aZ;
    float angleX, angleY, angleZ;
    float magnitude;
};