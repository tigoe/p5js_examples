/*
	serial sound player
  jumps to points in the sound when an external serial device sends A, L, or space. 
  
  created by Tom Igoe
  5 Oct 2016
*/

var mySound;		// the sound file to be played
var serial; 		// instance of the serialport library
var sensorValue; // latest sensor value from serial
var serialDiv;   // a div for serial data
var timeDiv;    // a div for the time
var menu;         // a variable to hold the options menu
var hidden = false; // whether the serial controls are hidden or not


function preload() {
  // load the sound:
  mySound = loadSound('assets/papa.mp3');
}

function setup() {
  createCanvas(400, 300);
  createHTML();
  // set sound play mode for jumping around:
  mySound.playMode('restart');
  mySound.setVolume(0.9);
  // textSize(48);

  // make a new instance of  serialport library:
  serial = new p5.SerialPort();
  // listeners for serialport events:
  serial.on('list', printList);
  serial.on('data', serialEvent);
}

function draw() {
  background(30, 20, 180);
  // draw the sound's current time in seconds:
  fill(255);
  timeDiv.html(mySound.currentTime().toFixed(3));
}

function createHTML() {
  // make an option menu for the serial ports:
  menu = createSelect();
  menu.option("Choose a serial port: ");
  menu.attribute('aria-label', 'Serial port selector');
  menu.position(10, 10);
  menu.changed(openPort);

  serialDiv = createElement('div', 'serial incoming data goes here');
  serialDiv.attribute('aria-role', 'alert');
  serialDiv.attribute('aria-live', 'polite');
  serialDiv.style('color', 'white');
  serialDiv.position(10, 40);

  timeDiv = createElement('div', 'sound file play time goes here');
  timeDiv.attribute('aria-role', 'alert');
  timeDiv.attribute('aria-live', 'polite');
  timeDiv.style('font-size', '48pt');
  timeDiv.style('color', 'white');
  timeDiv.position(10, 80);
}
function controlSound() {
  // jump to 9.15 seconds when A is pressed:
  if (sensorValue === 'A') {
    mySound.jump(9.15);
  }

  // jump to 0.4 seconds when L is pressed:
  if (sensorValue === 'L') {
    mySound.jump(0.40);
  }

  // toggle play/pause when space is pressed:
  if (sensorValue == ' ') {
    if (mySound.isPlaying()) {
      mySound.pause();
    } else {
      mySound.play();
    }
  }
  sensorValue = "";
}

function serialEvent() {
  var inString = serial.readLine();
  console.log(inString);
  if (inString.length > 0) {
    inString = inString.trim();
    sensorValue = inString;
    serialDiv.html(inString);
    controlSound();
  }
}

function openPort() {
  // get the value of the option chosen from the select menu:
  portName = menu.elt.value;
  // open the port:
  serial.open(portName);
  // notify the user in the HTML div:
  serialDiv.html('Serial port ' + portName + ' is open.')
}

// Got the list of ports
function printList(serialList) {
  // add serial port list items to the options menu:
  for (var i = 0; i < serialList.length; i++) {
    menu.option(serialList[i]);
  }
}

function keyPressed() {
  // if the shift-spacebar is pressed, show or hide the serial menu and display div
    if (keyIsDown(SHIFT) && key == ' ') {
      if (!hidden) {
        serialDiv.hide();
        menu.hide();
      } else {
        serialDiv.show();
        menu.show();
      }
      hidden = !hidden;
    }
}