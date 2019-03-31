/*
  JSON Object

  This sketch demonstrates how to use the
  Official Arduino JSON library to read
  JSON objects in the serial port

  created 31 Mar 2019
  by Tom Igoe
  from examples by Sandeep Mistry
*/

#include <Arduino_JSON.h>

void setup() {
  Serial.begin(9600);
}

void loop() {
  // wait for serial input:
  while (Serial.available()) {
    // read until newline"
    String incoming = Serial.readStringUntil('\n');

    // parse the string into a JSONVar object:
    JSONVar myObject = JSON.parse(incoming);

    // myObject.keys() can be used to get an array
    // of all the keys in the object
    JSONVar keys = myObject.keys();

    // read over the object, one key at a time:
    for (int i = 0; i < keys.length(); i++) {
      JSONVar value = myObject[keys[i]];

      // print the results back to the serial sender:
      Serial.print("JSON.typeof(myObject[");
      Serial.print(keys[i]);
      Serial.print("]) = ");
      Serial.println(JSON.typeof(value));

      Serial.print("myObject[");
      Serial.print(keys[i]);
      Serial.print("] = ");
      Serial.println(value);

      Serial.println();
    }
  }
}

//
//void demoParse() {
//  Serial.println("parse");
//  Serial.println("=====");
//
//  JSONVar myObject = JSON.parse(input);
//
//  // JSON.typeof(jsonVar) can be used to get the type of the var
//  if (JSON.typeof(myObject) == "undefined") {
//    Serial.println("Parsing input failed!");
//    return;
//  }
//
//  Serial.print("JSON.typeof(myObject) = ");
//  Serial.println(JSON.typeof(myObject)); // prints: object
//
//  // myObject.hasOwnProperty(key) checks if the object contains an entry for key
//  if (myObject.hasOwnProperty("result")) {
//    Serial.print("myObject[\"result\"] = ");
//
//    Serial.println((bool) myObject["result"]);
//  }
//
//  if (myObject.hasOwnProperty("count")) {
//    Serial.print("myObject[\"count\"] = ");
//
//    Serial.println((int) myObject["count"]);
//  }
//
//  if (myObject.hasOwnProperty("count")) {
//    Serial.print("myObject[\"count\"] = ");
//
//    Serial.println((double) myObject["count"]);
//  }
//
//  if (myObject.hasOwnProperty("foo")) {
//    Serial.print("myObject[\"foo\"] = ");
//
//    Serial.println((const char*) myObject["foo"]);
//  }
//
//  // JSON vars can be printed using print or println
//  Serial.print("myObject = ");
//  Serial.println(myObject);
//
//  Serial.println();
//}
//
//void demoCreation() {
//  Serial.println("creation");
//  Serial.println("========");
//
//  JSONVar myObject;
//
//  myObject["hello"] = "world";
//  myObject["true"] = true;
//  myObject["x"] = 42;
//
//  Serial.print("myObject.keys() = ");
//  Serial.println(myObject.keys());
//
//  // JSON.stringify(myVar) can be used to convert the json var to a String
//  String jsonString = JSON.stringify(myObject);
//
//  Serial.print("JSON.stringify(myObject) = ");
//  Serial.println(jsonString);
//
//  Serial.println();
//
//  // myObject.keys() can be used to get an array of all the keys in the object
//  JSONVar keys = myObject.keys();
//
//  for (int i = 0; i < keys.length(); i++) {
//    JSONVar value = myObject[keys[i]];
//
//    Serial.print("JSON.typeof(myObject[");
//    Serial.print(keys[i]);
//    Serial.print("]) = ");
//    Serial.println(JSON.typeof(value));
//
//    Serial.print("myObject[");
//    Serial.print(keys[i]);
//    Serial.print("] = ");
//    Serial.println(value);
//
//    Serial.println();
//  }
//
//  Serial.println();
//
//  // setting a value to undefined can remove it from the object
//  myObject["x"] = undefined;
//
//  // you can also change a value
//  myObject["hello"] = "there!";
//
//  Serial.print("myObject = ");
//  Serial.println(myObject);
//}
