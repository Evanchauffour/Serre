#include "DHT.h"

#define DHTPIN 7
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

int temperature_value = 0;

void setup() {
  dht.begin();
}

void loop() {
  temperature_value = dht.readTemperature();
  Serial.println(temperature_value);
  delay(1000);
}
