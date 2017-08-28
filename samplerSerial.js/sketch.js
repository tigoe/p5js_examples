/*
	serial sound player
  jumps to points in the sound when an external serial device sends A, L, or space. 
  
  created by Tom Igoe
  5 Oct 2016
*/

var mySound;		// the sound file to be played
var serial; 		// instance of the serialport library
var sensorValue; // latest sensor value from serial

function preload() {
 // load the sound:
 mySound = loadSound('assets/papa.mp3');
}

function setup() { 
  createCanvas(400, 300);
  // set sound play mode for jumping around:
  mySound.playMode('restart');
  mySound.setVolume(0.1);
  textSize(48);
  
	// make a new instance of  serialport library:
  serial = new p5.SerialPort();  
  // listeners for serialport events:
  serial.on('list', printList);  
  serial.on('data', serialEvent);
  
  // list the serial ports:
	serial.list();                 
  // open a port:
	serial.open("/dev/cu.usbmodem1421"); 
} 

function draw() { 
  background(30, 20, 180);
  // draw the sound's current time in seconds:
  fill(255);
  text(mySound.currentTime().toFixed(3), 20, 100); 
  controlSound();
}

function controlSound() {
  // jump to 9.15 seconds when A is pressed:
  if (sensorValue === 'A') {
    mySound.jump(9.15);
  }
  
  // jump to 0.4 seconds when L is pressed:
  if (sensorValue === 'L'){
    mySound.jump(0.40);
  }
  
  // toggle play/pause when space is pressed:
  if (sensorValue == ' ') {
    if (mySound.isPlaying()){
      mySound.pause();
    } else {
      mySound.play();
    }
  } 
  sensorValue = "";
}

// get the list of ports:
function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
	// Display the list the console:
 	println(i + " " + portList[i]);
 }
}

function serialEvent() {
	var inString = serial.readLine();
	if (inString.length > 0) {
	  inString = inString.trim();
		sensorValue = inString;
    controlSound();
	}
}
