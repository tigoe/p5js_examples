/*
  8x8 LED matrix pong
 for p5.js
 
 This example draws a pong game.  Left paddle is controlled by 'a' and 'z'.
 Right paddle is controlled by 'l' and','.
 
 created 1 Apr 2009
 modified 1 Nov 2020
 by Tom Igoe
 
 This was based on an Arduino mega example and a Processing example. 
 */

// define the edges of the screen:
const LEFT = 0;
const RIGHT = 15;
const TOP = 0;
const BOTTOM = 7;

const HIGH = 0;
const LOW = 255;

var pixelArray = []; // 2-dimensional array of pixels


var ballX = 8; // X position of the ball 
var ballY = 4; // Y position of the ball
var ballDirectionY = 1; // X direction of the ball
var ballDirectionX = 1; // Y direction of the ball

var rightPaddleY = 0; // X position of the center of the right paddle
var leftPaddleY = 0; // Y position of the center of the right paddle

var timeStamp = 0; // time stamp to control the pauses between ball moves
var interval = 120; // interval between ball moves, in milliseconds
var gamePaused = false; // state of the game

function setup() {
  // initialize the I/O pins as outputs:
  createCanvas(420, 220);
  smooth();
  frameRate(30);

  // initialize the pixel matrix:
  for (var x = 0; x < 16; x++) {
    for (var y = 0; y < 8; y++) {
      // add an element to the array:
      pixelArray.push([x, y]);
      // set the element's value:
      pixelArray[x][y] = HIGH;
    }
  }
}

function draw() {
  // read input:
  readSensors();
  // move the ball:
  if (gamePaused) {
    if (millis() - timeStamp > interval * 10) {
      // if enough time has passed, start the game again:
      gamePaused = false;
    }
  }
  // if the game isn't paused, and enough time between ball moves
  // has passed, move the ball and update the timestamp:
  else {
    if (millis() - timeStamp > interval) {
      moveBall();
      timeStamp = millis();
    }
  }
  // draw the screen:
  refreshScreen();
}

function readSensors() {
  // set the  left paddle to off:
  setPaddle(LEFT, leftPaddleY, HIGH);
  // set the right paddle to off:
  setPaddle(RIGHT, rightPaddleY, HIGH);

  // read the keyboard for X and Y values:
  if (keyIsPressed) {
    keyRead();
  }

  // set the  left paddle to on:
  setPaddle(LEFT, leftPaddleY, LOW);
  // set the right paddle to on:
  setPaddle(RIGHT, rightPaddleY, LOW);
}

function setPaddle(paddleX, paddleY, state) {
  // set the last right paddle to on:
  pixelArray[paddleX][paddleY] = state;
  // set the bottom pixel of the paddle:
  if (paddleY < BOTTOM) {
    pixelArray[paddleX][paddleY + 1] = state;
  }

  // set the top pixel of the paddle:
  if (paddleY > TOP) {
    pixelArray[paddleX][paddleY - 1] = state;
  }
}

function moveBall() {
  // check to see if the ball is in the horizontal range 
  // of the paddles:

  // right:
  if (ballX >= RIGHT - 1) {
    // if the ball's next Y position is between 
    // the top and bottom of the paddle, reverse its  X direction:
    if ((ballY + ballDirectionY >= rightPaddleY - 1) &&
      (ballY + ballDirectionY <= rightPaddleY + 1)) {
      // reverse the ball horizontal direction:
      ballDirectionX = -ballDirectionX;
    }
  }

  // left:
  if (ballX <= LEFT + 1) {
    // if the ball's next Y position is between 
    // the top and bottom of the paddle, reverse its  X direction:
    if ((ballY + ballDirectionY >= leftPaddleY - 1) &&
      (ballY + ballDirectionY <= leftPaddleY + 1)) {
      // reverse the ball horizontal direction:
      ballDirectionX = -ballDirectionX;
    }
  }

  // if the ball goes off the screen bottom,
  // reverse its Y direction:
  if (ballY == BOTTOM) {
    ballDirectionY = -ballDirectionY;
  }
  // if the ball goes off the screen top, 
  // reverse its X direction:
  if (ballY == TOP) {
    ballDirectionY = -ballDirectionY;
  }

  // clear the ball's previous position:
  pixelArray[ballX][ballY] = HIGH;

  // if the ball goes off the screen left or right:
  if ((ballX == LEFT) || (ballX == RIGHT)) {
    // reset the ball:
    ballX = 8;
    ballY = 4;
    // pause  and note the time you paused:
    gamePaused = true;
    timeStamp = millis();
  }
  // increment the ball's position in both directions:
  ballX = ballX + ballDirectionX;
  ballY = ballY + ballDirectionY;

  // if the game isn't paused, set the ball
  // in its new position:
  if (!gamePaused) {
    // set the new position:
    pixelArray[ballX][ballY] = LOW;
  }
}


function refreshScreen() {
  // make the screen black:
  background(0);
  // iterate over the buffer array:
  for (var x = 0; x < 16; x++) {
    // determine the circle's X position onscreen:
    var circleX = (x + 1) * 24;
    for (var y = 0; y < 8; y++) {
      // determine the circle's Y position onscreen:
      var circleY = (y + 1) * 24;
      // get the color of the circle from the buffer array:
      fill(pixelArray[x][y]);
      // draw the circle:
      ellipse(circleX, circleY, 20, 20);
    }
  }
}

function keyRead() {
  switch (key) {
    case 'z': // right down
      if (leftPaddleY < BOTTOM) {
        leftPaddleY++;
      }
      break;
    case 'a': // right up
      if (leftPaddleY > TOP) {
        leftPaddleY--;
      }
      break;
    case ',': // left down
      if (rightPaddleY < BOTTOM) {
        rightPaddleY++;
      }
      break;
    case 'l': // left up
      if (rightPaddleY > TOP) {
        rightPaddleY--;
      }
      break;
  }
}