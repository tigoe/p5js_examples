/*
		Serial output ASCII example
    Sends a single byte, "H" or "L", out the serial port.
    
    To be used with the Arduino Physical Pixel example 
    (Arduino File Menu -> Examples -> Communication -> PhysicalPixel)
    created 9 Oct 2017
    by Tom Igoe
*/

var serial; // variable to hold an instance of the serialport library

function setup() {
  createCanvas(320, 240);							 // make a canvas
  serial = new p5.SerialPort(); 			 // make a new instance of the serialport library
  serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background("#2297EF");
}

function mousePressed() {						  // when the mouse is pressed,
  serial.write("H");									// write "H" out the serial port
}

function mouseReleased() {					  // when the mouse is released,
  serial.write("L");									// write "L" out the serial port
}
