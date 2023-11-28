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

void setup() {
  Serial.begin(9600);
  pinMode(IN1, OUTPUT);  
  pinMode(Pin1, INPUT);
  digitalWrite(IN1, HIGH);
  attachInterrupt(digitalPinToInterrupt(2), inter, RISING);
  dht.begin();
}

void loop() {
//  anemometre();
//  temperature();
waterControl();
}

void waterControl(){
  Serial.print("MOISTURE LEVEL:"); value1 = analogRead(Pin1);
  Serial.println(value1);
  if(value1>500) {
    digitalWrite(IN1, LOW);
  } else {
    digitalWrite(IN1, HIGH);
  }
  Serial.println();
  delay(1000);
}

void anemometre(){
  if (tick - tick_prec > 0) {
    delai = tick - tick_prec;
  }
  tick_prec = tick;

  v_vent = calk(delai);
  smooth_vent = smooth_vent + ((v_vent-smooth_vent)/4);
  Serial.println(smooth_vent);
}

void temperature(){
  Serial.println("Temperature = " + String(dht.readTemperature())+" °C");
  Serial.println("Humidite = " + String(dht.readHumidity())+" %");
}


int calk(int delai) {
  return (2400/delai);
}

void inter(){
  tick = millis();
}
