#include <Arduino.h>
#include "lorae5.h"
#include "config_application.h"
#include "DHT.h"

#define DHTPIN 7
#define DHTTYPE DHT11

int tick, tick_prec, delai = 0;
int smooth_vent = 0;
int v_vent;

DHT dht(DHTPIN, DHTTYPE);

int temperature_value = 0;
int humidite_value = 0;


int PortPompe4 = 6;
int PortHumidite1 = A0;
int PortPompe3 = 5;
int PortHumidite2 = A1;
int PortPompe2 = 3;
int PortHumidite3 = A2;
int PortPompe1 = 3;
int PortHumidite4 = A3;

float humiditeCapteur1 = 0;
float humiditeCapteur2 = 0;
float humiditeCapteur3 = 0;
float humiditeCapteur4 = 0;



LoraE5 LoRaE5(devEUI, appEUI, appKey, devAddr, nwkSKey, appSKey); 

void setup() {

  LoRa_Serial.begin(9600);
  USB_Serial.begin(9600);
  attachInterrupt(digitalPinToInterrupt(2), inter, RISING);
  pinMode(PortHumidite1, INPUT);
  pinMode(PortPompe1, OUTPUT);
  digitalWrite(PortPompe1, HIGH);

  pinMode(PortHumidite2, INPUT);
  pinMode(PortPompe2, OUTPUT);
  digitalWrite(PortPompe2, HIGH);

  pinMode(PortHumidite3, INPUT);
  pinMode(PortPompe3, OUTPUT);
  digitalWrite(PortPompe3, HIGH);

  pinMode(PortHumidite4, INPUT);
  pinMode(PortPompe4, OUTPUT);
  digitalWrite(PortPompe4, HIGH);


  while (!USB_Serial);

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

  //pinMode(IN1, OUTPUT);
  //pinMode(Pin1, INPUT);
  //digitalWrite(IN1, HIGH);
  dht.begin();
}

void loop() {
  anemometre();
  humidite();
  temperature();
  waterControl();

  LoRaE5.sendMsg(_STRING, String(temperature_value) + "_" + String(humidite_value) + "_" + String(smooth_vent) + "_" + String(humiditeCapteur1) + "_" + String(humiditeCapteur2) + "_" + String(humiditeCapteur3) + "_" + String(humiditeCapteur4));
}

void temperature() {
  //USB_Serial.println("Temperature = " + String(dht.readTemperature()) + " °C");
  //USB_Serial.println("Humidite = " + String(dht.readHumidity()) + " %");
  temperature_value = dht.readTemperature();
  // Envoie la valeur de la température au lieu de "HELLO"
  //LoRaE5.sendMsg(_STRING, String(temperature_value));
  delay(10);
}

void humidite(){
  humidite_value = dht.readHumidity();
  delay(10);
}



void waterControl() {
  Serial.print("Humidité capteur 1:"); 
  humiditeCapteur1 = analogRead(PortHumidite1);
  Serial.println(humiditeCapteur1);
  Serial.print("Humidité capteur 2:"); 
  humiditeCapteur2 = analogRead(PortHumidite2);
  Serial.println(humiditeCapteur2);
  Serial.print("Humidité capteur 3:"); 
  humiditeCapteur3 = analogRead(PortHumidite3);
  Serial.println(humiditeCapteur3);
  Serial.print("Humidité capteur 4:"); 
  humiditeCapteur4 = analogRead(PortHumidite4);
  Serial.println(humiditeCapteur4);
  //if (humiditeCapteur1 < 500) {
    //digitalWrite(PortPompe1, LOW);
  //} else {
    //digitalWrite(PortPompe1, HIGH);
  //}

  //if (humiditeCapteur2 < 500){
  //  digitalWrite(PortPompe2, LOW);
  //} else {
  //  digitalWrite(PortPompe2, HIGH);
  //}

  //if (humiditeCapteur3 < 500){
  //  digitalWrite(PortPompe3, LOW);
  //} else {
  //  digitalWrite(PortPompe3, HIGH);
  //}
//
  //if (humiditeCapteur4 < 500){
  //  digitalWrite(PortPompe4, LOW);
  //} else {
  //  digitalWrite(PortPompe4, HIGH);
  //}
  delay(10);
}
void anemometre() {
  if (tick - tick_prec > 0) {
    delai = tick - tick_prec;
  }
  tick_prec = tick;

  v_vent = calk(delai);
  smooth_vent = smooth_vent + ((v_vent - smooth_vent) / 4);
  //Serial.println(smooth_vent);
  //LoRaE5.sendMsg(_STRING, String(smooth_vent));
}

int calk(int delai) {
  return (2400 / delai);
}

void inter() {
  tick = millis();
}
