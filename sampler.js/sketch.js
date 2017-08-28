/*
	sound player
  jumps to points in the sound when you press A, L, or space. 
  
  created by Tom Igoe
  5 Oct 2016
*/

var mySound;		// the sound file to be played

function preload() {
 // load the sound:
 mySound = loadSound('assets/papa.mp3');
}

function setup() { 
  createCanvas(400, 300);
  // set sound play mode for jumping around:
  mySound.playMode('restart');
  textSize(48);
} 

function draw() { 
  background(30, 20, 180);
  // draw the sound's current time in seconds:
  fill(255);
  text(mySound.currentTime().tofixed(3), 20, 100); 
}

function mousePressed() {
  // play sound when mouse is pressed:
	mySound.setVolume(0.1);
  mySound.play();
}

function keyPressed() {
  // jump to 9.15 seconds when A is pressed:
  if (key === 'A') {
    mySound.jump(9.15);
  }
  
  // jump to 0.4 seconds when L is pressed:
  if (key === 'L'){
    mySound.jump(0.40);
  }
  
  // toggle play/pause when space is pressed:
  if (key === ' ') {
    if (mySound.isPlaying()){
      mySound.pause();
    } else {
      mySound.play();
    }
  } 
}