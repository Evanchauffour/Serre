#include <Arduino.h>
#include <lorae5.h>
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

int wateringTime = 5000;

int PortPompe4 = 6;
int PortHumidite1 = A0;
int PortPompe3 = 5;
int PortHumidite2 = A1;
int PortPompe2 = 4;
int PortHumidite3 = A2;
int PortPompe1 = 3;
int PortHumidite4 = A3;

int PortWaterSensor= A4;
int waterSensor = 0;

float humiditeCapteur1 = 0;
float humiditeCapteur2 = 0;
float humiditeCapteur3 = 0;
float humiditeCapteur4 = 0;

uint8_t sizeUplink = 8;
uint8_t sizeDownlink = 5;

uint8_t uplink[] = {0, 0, 0, 0, 0, 0, 0, 0};
uint8_t downlink[]={0, 0, 0, 0, 0};

const int stepPin = 10; 
const int dirPin = 11; 

LORAE5 lorae5(devEUI, appEUI, appKey, devAddr, nwkSKey, appSKey); 

void setup() {

  //LoRa_Serial.begin(9600);
  //USB_Serial.begin(9600);
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

  pinMode(stepPin,OUTPUT); 
  pinMode(dirPin,OUTPUT);


  lorae5.setup(ACTIVATION_MODE, CLASS, SPREADING_FACTOR, ADAPTIVE_DR, CONFIRMED, PORT);
  lorae5.printInfo(SEND_BY_PUSH_BUTTON, FRAME_DELAY);

  if(ACTIVATION_MODE == OTAA){
    USB_Serial.println("Join Procedure in progress...");
    while(lorae5.join() == false);
    delay(2000);
  }

  dht.begin();
}

void loop() {
  anemometre();
  waterDetect();
  humidite();
  temperature();
  //waterControl();
  uplink[0] = temperature_value;
  uplink[1] = humidite_value;
  uplink[2] = humiditeCapteur1;
  uplink[3] = humiditeCapteur2;
  uplink[4] = humiditeCapteur3;
  uplink[5] = humiditeCapteur4;
  uplink[6] = waterSensor;
  uplink[7] = smooth_vent;

   if( lorae5.sendData(uplink, sizeUplink, downlink, &sizeDownlink) == true){
      Serial.print("downlink :");
      Serial.println(downlink[0]);
      Serial.println(downlink[1]);
      Serial.println(downlink[2]);
      Serial.println(downlink[3]);
      Serial.println(downlink[4]);
  }

  if (downlink[0] == 211) {
      digitalWrite(PortPompe1, LOW);
      delay(wateringTime);
      digitalWrite(PortPompe1, HIGH);
      downlink[0] = 0;
  }

  if (downlink[0] == 215) {
      digitalWrite(PortPompe2, LOW);
      delay(wateringTime);
      digitalWrite(PortPompe2, HIGH);
      downlink[0] = 0;
  }
  if (downlink[0] == 219) {
        digitalWrite(PortPompe3, LOW);
      delay(wateringTime);
      digitalWrite(PortPompe3, HIGH);
      downlink[0] = 0;
  }
  if (downlink[0] == 223) {
      digitalWrite(PortPompe4, LOW);
      delay(wateringTime);
      digitalWrite(PortPompe4, HIGH);
      downlink[0] = 0;
  }


  //if (downlink[0] == 182) {
  //  digitalWrite(dirPin,HIGH); 
  //  for(int x = 0; x < 200; x++) {
  //    digitalWrite(stepPin,HIGH); 
  //    delayMicroseconds(100); 
  //    digitalWrite(stepPin,LOW); 
  //    delayMicroseconds(100); 
  //  }
//
  //  delay(3000); // One second delay
  //  Serial.println("HELLO WORLD !");
  //}
  delay(FRAME_DELAY);
}

void temperature() {
  //USB_Serial.println("Temperature = " + String(dht.readTemperature()) + " °C");
  //USB_Serial.println("Humidite = " + String(dht.readHumidity()) + " %");
  temperature_value = dht.readTemperature();
  delay(10);
}

void humidite(){
  humidite_value = dht.readHumidity();
  delay(10);
}

void waterDetect(){
  Serial.print("Capteur eau:"); 
  waterSensor=analogRead(PortWaterSensor);

  if (waterSensor > 100) {
    waterSensor = 1;
  } else {
    waterSensor = 0;
  } 
  Serial.println(waterSensor);
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

  if (humiditeCapteur1 < 500) {
    digitalWrite(PortPompe1, LOW);
  } else {
    digitalWrite(PortPompe1, HIGH);
  }
  
  if (humiditeCapteur2 < 500){
    digitalWrite(PortPompe2, LOW);
  } else {
    digitalWrite(PortPompe2, HIGH);
  }
  
  if (humiditeCapteur3 < 500){
    digitalWrite(PortPompe3, LOW);
  } else {
    digitalWrite(PortPompe3, HIGH);
  }

  if (humiditeCapteur4 < 500){
    digitalWrite(PortPompe4, LOW);
  } else {
    digitalWrite(PortPompe4, HIGH);
  }
  delay(10);
}
void anemometre() {
  if (tick - tick_prec > 0) {
    delai = tick - tick_prec;
  }
  tick_prec = tick;

  v_vent = calk(delai);
  smooth_vent = smooth_vent + ((v_vent - smooth_vent) / 4);
  Serial.print("Vitesse vent :");
  Serial.println(smooth_vent);
  //lorae5.sendMsg(_STRING, String(smooth_vent));
}

int calk(int delai) {
  return (2400 / delai);
}

void inter() {
  tick = millis();
}
