#include <WiFiNINA.h>

char ssid[] = "SOTON-IoT";
char pass[] = "c0YhM1lf8v88";
int status = WL_IDLE_STATUS;

int    HTTP_PORT   = 443;
String HTTP_METHOD = "GET";
char   HOST_NAME[] = "example.phpoc.com";
String PATH_NAME   = "";

WiFiSSLClient client;


void setup() {
  Serial.begin(9600);
  while (!Serial);
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to network: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
    delay(5000);
  }

  Serial.println("Connected");
  if(client.connectSSL(HOST_NAME, HTTP_PORT)) {
    Serial.println("Connected to server");
    client.println(HTTP_METHOD + " " + PATH_NAME + " HTTP/1.1");
    client.println("Host: " + String(HOST_NAME));
    client.println("Connection: close");
    client.println();
    while(client.available())
{
  // read an incoming byte from the server and print them to serial monitor:
  char c = client.read();
  Serial.println(c);
  Serial.println("here");
}

if(!client.connected())
{
  Serial.println("disconnected");
  client.stop();
}
  } else {
    Serial.println("connection failed");
  }
}

void loop() {

}
