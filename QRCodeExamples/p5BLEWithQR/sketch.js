/*
  p5.BLE Connect to Peripheral with QR Code

  Connects to a peripheral via Bluetooth LE using p5.ble.js
  Draws the sketch's URL as a QR code for opening on a  mobile phone using 
  https://github.com/kazuhikoarase/qrcode-generator

  created 19 July 2020
  by Tom Igoe
*/

// a string to diisplay in the QR code
// (the URL of this sketch):
let urlString = parent.location.href;
// HTML divs for BLE tag and BLE data:
let tagDiv;
let bleDiv;

// The BLE serviceUuid must match the serviceUuid of the service 
// on  the device to which you want to connect. Letter characters
// must be lower case in the UUID:
const serviceUuid = "3fdcc5c9-6538-4d3e-b8fe-522323e2cb73";
let myCharacteristic;
let myBLE;

function setup() {
  // we're not doing any drawing, so you don't need a canvas:
  noCanvas();
  // Create a p5ble class
  myBLE = new p5ble();
  // make the HTML divs:
  // tag div:
  tagDiv = createDiv();
  tagDiv.position(10, 10);

  // make the BLE div:
  bleDiv = createDiv('click the button to search for BLE peripherals');
  bleDiv.position(100, 130);

  // Create a 'Connect' button:
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);
  connectButton.position(10, 130);

  // make the QR code:
  let qr = qrcode(0, 'L');
  qr.addData(urlString);
  qr.make();
  // create an image from it:
  let qrImg = qr.createImgTag(2, 8, "qr code");
  // put the image and the URL string into the HTML div:
  tagDiv.html(qrImg + '<br>' + urlString);
}

function draw() {
// BLE doesn't use the draw loop
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  bleDiv.html('characteristics: ', characteristics);
  myCharacteristic = characteristics[0];
  // Read the value of the first characteristic
  myBLE.read(myCharacteristic, gotValue);
}

// This function will be called when you have a value
// from a BLE characteristic:
function gotValue(error, value) {
  if (error)  bleDiv.html('error: ', error);
  bleDiv.html('BLE characteristic value: ' + value);
  // After getting a value, call p5ble.read() again to get the value again
  myBLE.read(myCharacteristic, gotValue);
}