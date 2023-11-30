#include <Arduino.h>
#include "lorae5.h"
#include "config_application.h"
#include "DHT.h"

#define DHTPIN 7
#define DHTTYPE DHT11



#define PINPORT 2
int tick, tick_prec, delai = 0;
int smooth_vent = 0;
int v_vent;

DHT dht(DHTPIN, DHTTYPE);

int IN1 = 8;
int Pin1 = A0;
float value1 = 0;

int temperature_value = 0;


LoraE5 LoRaE5(devEUI, appEUI, appKey, devAddr, nwkSKey, appSKey); 

void setup() {

   LoRa_Serial.begin(9600);
  USB_Serial.begin(9600);
  while (!USB_Serial);
  USB_Serial.println("\r\n\n\n\n\n\n\n\n");
  USB_Serial.println("#######################################");
  USB_Serial.println("#### LoRaWAN Training Session #########");
  USB_Serial.println("#### Savoie Mont Blanc University #####\r\n");
  
  while(!LoRaE5.checkBoard());

  LoRaE5.setup(ACTIVATION_MODE, CLASS, SPREADING_FACTOR, ADAPTIVE_DR, CONFIRMED, PORT);
  LoRaE5.printInfo(SEND_BY_PUSH_BUTTON, FRAME_DELAY, LOW_POWER);

  if(ACTIVATION_MODE == OTAA){
    LoRaE5.setDevEUI(devEUI);
    LoRaE5.setAppEUI(appEUI);
    LoRaE5.setAppKey(appKey);
    USB_Serial.println("\r\nJoin Procedure in progress...");
    while(LoRaE5.join() == false);
    delay(3000);
   }
  
 if(ACTIVATION_MODE == ABP){
   LoRaE5.setDevAddr(devAddr);
   LoRaE5.setNwkSKey(nwkSKey);
   LoRaE5.setAppSKey(appSKey);
 }

  pinMode(IN1, OUTPUT);
  pinMode(Pin1, INPUT);
  digitalWrite(IN1, HIGH);
//  attachInterrupt(digitalPinToInterrupt(2), inter, RISING);
  dht.begin();
}

void loop() {
  anemometre();
  temperature();
  //waterControl();
}

void temperature() {
  USB_Serial.println("Temperature = " + String(dht.readTemperature()) + " °C");
  USB_Serial.println("Humidite = " + String(dht.readHumidity()) + " %");
  temperature_value = dht.readTemperature();

  // Envoie la valeur de la température au lieu de "HELLO"
  LoRaE5.sendMsg(_STRING, String(temperature_value));
  delay(FRAME_DELAY - 10000);
}



//void waterControl() {
//  Serial.print("MOISTURE LEVEL:"); value1 = analogRead(Pin1);
//  Serial.println(value1);
//  if (value1 > 500) {
//    digitalWrite(IN1, LOW);
//  } else {
//    digitalWrite(IN1, HIGH);
//  }
//  Serial.println();
//  delay(1000);
//}
//
void anemometre() {
  if (tick - tick_prec > 0) {
    delai = tick - tick_prec;
  }
  tick_prec = tick;

  v_vent = calk(delai);
  smooth_vent = smooth_vent + ((v_vent - smooth_vent) / 4);
  USB_Serial.println(smooth_vent);
  LoRaE5.sendMsg(_STRING, String(smooth_vent));
  delay(FRAME_DELAY - 10000);
}

int calk(int delai) {
  return (2400 / delai);
}

void inter() {
  tick = millis();
}
