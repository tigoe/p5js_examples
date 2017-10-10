/*
		Serial output example
    Sends a single byte, the mouseY value, out the serial port.
    
    To be used with the Arduino Dimmer example 
    (Arduino File Menu -> Examples -> Communication -> Dimmer)
    created 3 Oct 2017
    by Tom Igoe
*/

var serial; 			// variable to hold an instance of the serialport library

function setup() {
  createCanvas(320, 240);							 	// make a canvas
  serial = new p5.SerialPort(); 			 	// make a new instance of the serialport library
  serial.open("/dev/cu.usbmodem1411"); 	// open a port
}

function draw() {
  background("#2297D4");								// set the background color
  fill("#AAD3FF");											// set the fill color
  text(mouseY, width/2, height/2);			// draw the mouseY on the screen
}

function mouseDragged() {						  	// when the mouse is dragged,
  serial.write(mouseY);									// write "H" out the serial port
}