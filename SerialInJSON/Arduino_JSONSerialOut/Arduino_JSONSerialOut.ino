/*
  JSON Object

  This sketch demonstrates how to use the
  Official Arduino JSON library to make and serialize
  JSON objects.

  created 31 Mar 2019
  by Tom Igoe
  from examples by Sandeep Mistry
*/

#include <Arduino_JSON.h>

void setup() {
  Serial.begin(9600);
}

void loop() {
  // make a JSON object for the sensor values:
  JSONVar sensors;
  
  // read the sensors:
  sensors["potentiometer"] = analogRead(A0);
  sensors["button1"] = digitalRead(4);
  sensors["button2"] = digitalRead(5);
  
  // stringify the JSON object:
  String jsonString = JSON.stringify(sensors);
  // send it:
  Serial.println(jsonString);
}
