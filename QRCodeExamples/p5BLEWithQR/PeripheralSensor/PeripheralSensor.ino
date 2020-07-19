/*
  BLE Sensor Peripheral

  This example creates a BLE peripheral with service that contains a
  characteristic to report a sensor value

  The circuit:
  - Arduino MKR WiFi 1010, Arduino Uno WiFi Rev2 board, Arduino Nano 33 IoT,
    Arduino Nano 33 BLE, or Arduino Nano 33 BLE Sense board.

  You can use a generic BLE central app, like LightBlue (iOS and Android) or
  nRF Connect (Android), to interact with the services and characteristics
  created in this sketch.

  modified from Sandeep Mistry's ArduinoBLE library example
  by Tom Igoe
  19 July 2020
*/

#include <ArduinoBLE.h>
// BLE Sensor Service:
BLEService sensorService("3FDCC5C9-6538-4D3E-B8FE-522323E2CB73"); 
// BLE Sensor Characteristic:
BLEByteCharacteristic sensorCharacteristic("3FDCC5C9-6539-4D3E-B8FE-522323E2CB73", BLERead | BLENotify);

const int ledPin = LED_BUILTIN; 
void setup() {
  Serial.begin(9600);
  // wait 5 seconds if serial monitor is not open:
  if (!Serial) delay(5000);

  // set LED pin to output mode
  pinMode(ledPin, OUTPUT);

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed.");
    while (true);
  }

  // set advertised local name and service UUID:
  BLE.setLocalName("Sensor");
  BLE.setAdvertisedService(sensorService);

  // add the characteristic to the service
  sensorService.addCharacteristic(sensorCharacteristic);
  // add service
  BLE.addService(sensorService);
  // set the initial value for the characeristic:
  sensorCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();
  Serial.println("BLE Sensor Peripheral");
}

void loop() {
  // listen for BLE central devices to connect:
  BLEDevice central = BLE.central();

  // if a central is connected to this peripheral:
  if (central) {
    // turn on LED to indicate a connection:
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.print("Connected to central: ");
    Serial.println(central.address());

    // while the central is connected to peripheral,
    // this is effectively your main loop:
    while (central.connected()) {
      int sensor = analogRead(A0);
      sensorCharacteristic.writeValue(sensor);
    }
    // turn off LED on disconnect:
    digitalWrite(LED_BUILTIN, LOW);
    // when the central disconnects, print it out:
    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  }
}
