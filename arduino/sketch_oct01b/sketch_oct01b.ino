#include <SPI.h>
#include <WiFiNINA.h>

char ssid[] = "SOTON-IoT";
char pass[] = "c0YhM1lf8v88";
//char ssid[] = "OnePlus 6T";
//char pass[] = "linsey69";
int status = WL_IDLE_STATUS;

int    HTTP_PORT   = 443;
String HTTP_METHOD = "POST";
char   HOST_NAME[] = "us-central1-picohack-2022.cloudfunctions.net";
String PATH_NAME   = "/panic";
String body = "{\n  \"patient\": 16\n}";

WiFiClient client;

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
  
  if(client.connect(HOST_NAME, HTTP_PORT)) {
    //Serial.println(client.connected());
    Serial.println("Connected to server");
    
    //client.println(HTTP_METHOD + " " + PATH_NAME + " HTTP/1.1");
    client.println("POST /panic HTTP/1.1");
    client.println("Host: " + String(HOST_NAME));

    client.println("Content-Type: application/json");
    client.println("Content-Length: " + String(body.length()));
    
    client.println("Connection: close");
    client.println();
    //Serial.println(client.connected());

    client.println(body);
    //Serial.println(client.connected());

    
    //Serial.println(client.available());
    while(client.connected()) {
          Serial.println(client.connected());

        if (client.available()){
        Serial.println("here1");
        // read an incoming byte from the server and print them to serial monitor:
        char c = client.read();
        Serial.println(c);
        Serial.println("here");
      }}
      
        Serial.println("disconnected");
        client.stop();
  } else {
    Serial.println("connection failed");
  }
}

void loop() {

}
