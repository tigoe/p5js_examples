/*
	Multi-port Serial in

  by Tom Igoe
*/

var serial; // variable to hold an instance of the serialport library
var serial2;

function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of  serialport library
  serial.on('data', serialEvent); // callback for new data coming in
  serial.on('open', portOpen); // callback for port opening
  serial.open("/dev/cu.usbmodem142431"); // open a port

  serial2 = new p5.SerialPort(); // make a new instance of  serialport library
  serial2.on('data', serial2Event); // callback for new data coming in
  serial2.on('open', port2Open); // callback for port opening
  serial2.open("/dev/cu.usbmodem142442"); // open a port
  console.log("started");
}

function draw() {
  background(220);
  fill(0);
}

// when the serial connection first opens, send a byte
// to get the microcontroller started sending:
function portOpen() {
  console.log("port open");
}

function port2Open() {
  console.log("port 2 open");
}

function serialEvent() {
  var input = serial.readLine();
  console.log(input);
}

function serial2Event() {
  var input = serial2.readLine();
  console.log(input);
}
