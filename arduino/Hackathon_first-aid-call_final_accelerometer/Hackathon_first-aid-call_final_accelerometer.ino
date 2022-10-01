const int alarmButton = 6;
const int cancelButton = 7;

int alarmButtonState = 0;
int prevAlarmButtonState = 0;

int cancelButtonState = 0;
int prevCancelButtonState = 0;

#include <math.h>
const int x_out = A1; /* connect x_out of module to A1 of UNO board */
const int y_out = A2; /* connect y_out of module to A2 of UNO board */
const int z_out = A3; /* connect z_out of module to A3 of UNO board */

// my added extra variables
int avDisplacement = 0;
int finx_displacement = 0;
int finy_displacement = 0;
int finz_displacement = 0;

void setup()
{
  // put your setup code here, to run once:

  Serial.begin(9600);

  pinMode(alarmButton, INPUT);
  pinMode(cancelButton, INPUT);
  pinMode(0, OUTPUT);
  pinMode(1, OUTPUT);
  pinMode(2, OUTPUT);

  digitalWrite(0, LOW);
  digitalWrite(1, LOW);
  digitalWrite(2, HIGH);
}

void loop()
{
  // put your main code here, to run repeatedly:

  alarmButtonState = digitalRead(alarmButton);
  cancelButtonState = digitalRead(cancelButton);

  if (alarmButtonState != prevAlarmButtonState)
  {
    if (alarmButtonState == LOW)
    {
      digitalWrite(0, HIGH);
      digitalWrite(1, HIGH);
      digitalWrite(2, HIGH);
      Serial.println("Alert:Patient_16_Has_Fallen_Down!!!");
    }
  }

  if (cancelButtonState != prevCancelButtonState)
  {
    if (cancelButtonState == LOW)
    {
      digitalWrite(0, LOW);
      digitalWrite(1, LOW);
    }
  }
  digitalWrite(2, HIGH);
  prevAlarmButtonState = alarmButtonState;
  prevCancelButtonState = cancelButtonState;

  // new copy-paste accelerometer code
  int x_adc_value, y_adc_value, z_adc_value;
  x_adc_value = analogRead(x_out); /* Digital value of voltage on x_out pin */
  y_adc_value = analogRead(y_out); /* Digital value of voltage on y_out pin */
  z_adc_value = analogRead(z_out); /* Digital value of voltage on z_out pin */
  Serial.print("x = ");
  Serial.print(x_adc_value);
  Serial.print("\t\t");
  Serial.print("y = ");
  Serial.print(y_adc_value);
  Serial.print("\t\t");
  Serial.print("z = ");
  Serial.print(z_adc_value);
  Serial.print("\t\t");
  // delay(100);

  finx_displacement = x_adc_value - 850;
  finy_displacement = y_adc_value - 863;
  finz_displacement = z_adc_value - 1015;
  avDisplacement = sqrt((sq(finx_displacement)) + (sq(finy_displacement)) + (sq(finz_displacement)));

  Serial.print("Average Displacement is: ");
  Serial.print(avDisplacement);
  delay(150);

  Serial.print("finXdisp = ");
  Serial.print(finx_displacement);
  Serial.print("\t");
  Serial.print("finYdisp =");
  Serial.print(finy_displacement);
  Serial.print("\t");
  Serial.print("finZdisp =");
  Serial.print(finz_displacement);
  Serial.print("\n\n");
  delay(150);

  if (avDisplacement > 180)
  {
    digitalWrite(0, HIGH);
    digitalWrite(1, HIGH);
    digitalWrite(2, HIGH);
    Serial.println("Alert:Patient_16_Has_Fallen_Down!!!");
  }
}
