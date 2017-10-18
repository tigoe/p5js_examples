/*
		Serial input in ASCII example
    Reads a serial input line, terminated by a newline, using serial.readLine()
    
    To be used with the Arduino AnalogReadSerial example 
    (Arduino File Menu -> Examples -> Communication -> SerialCallResponseASCII)
    created 9 Oct 2017
    by Tom Igoe
*/
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14221'; // fill in your serial port name here
var xValue = 0;
var yValue = 0;
var visibility = 1;

function setup() {
  createCanvas(800, 600);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('open', portOpen);
  serial.open(portName); // open a serial port
}

function draw() {
  background("#2277A3"); 	// set the background color
  fill("#55CAFE"); 				// set the circle fill color
  noStroke(); 						// don't use a stroke around the circle
  if (visibility === 1) {
   for (var offset=0; offset<1000; offset++) {
    // draw the circle:
    var c = color(0x55, 0xCA, 0xFE, 5);
     fill(c);
    ellipse(xValue, yValue, 30+offset/10, 30+offset/10);
   }
  }

}

function portOpen() {
  console.log('port is open.');
  serial.write('A');
}


function serialEvent() {
  var data = serial.readLine();
  if (data.length > 0) {
     console.log(data);
    var sensors = split(data, ",");		// split the string called data on the commas
    if (sensors.length > 2) {
      xValue = sensors[0];
      yValue = sensors[1];
      visibility = int(sensors[2]);
    }
    serial.write('A');
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}