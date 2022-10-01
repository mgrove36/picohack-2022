#include <SPI.h>
#include <WiFiNINA.h>

char SSID[] = "OnePlus 6T";     // the name of your network/HotSpot
char PASSWORD[] = "linsey69";    // the password of your WiFi

byte mac[6];                     // the MAC address of your Wifi Module

void connectWiFi()
{
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Connecting to WiFi..");
    WiFi.begin(SSID, PASSWORD);
    delay(500);
  }

  Serial.println("Connected!");
}
void setup()
{
  Serial.begin(9600);

  while (!Serial)
    Serial.print("."); // Wait for Serial to be ready
 
  Serial.println("Serial is Ready");
 
  connectWiFi();

  Serial.println("Here we go");
  
  // if you are connected, print your MAC address:
  WiFi.macAddress(mac);
  Serial.print("MAC: ");
  Serial.print(mac[5], HEX);
  Serial.print(":");
  Serial.print(mac[4], HEX);
  Serial.print(":");
  Serial.print(mac[3], HEX);
  Serial.print(":");
  Serial.print(mac[2], HEX);
  Serial.print(":");
  Serial.print(mac[1], HEX);
  Serial.print(":");
  Serial.println(mac[0], HEX);

}

void loop () {}
