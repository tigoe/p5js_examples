/*
  Two-player Pong™ derivative game. 

  This is a template for making your own Pong-game. It supports two players, 
  and currently takes keyboard input. It could also take other forms of input
  with minimal modification: asynchronous serial, Bluetooth LE, TCP socket,
  UDP Datagram, WebSocket, or whatever you can come up with. 

  The left paddle is controlled using the letters W and S (from the WASD gaming layout),
  keyCodes 87 and 83, The right paddle is controlled using the up down arrows, keycodes
  38 and 40. The keyReleased function below takes these inputs.
  As long as your input can send those five different byte values, 
  you won't have to touch the rest of the game.

  created 15 July 2020
  by Tom Igoe
  based on a version I did in Processing from 24 Jan 2011
*/

// constants:
const LEFT_PLAYER = 0;            // first player in the list
const RIGHT_PLAYER = 1;           // second player in the list
const WINNING_SCORE = 5;          // score needed to win
const PADDLE_HEIGHT = 80;         // vertical dimension of the paddles
const PADDLE_WIDTH = 10;          // horizontal dimension of the paddles
const PADDLE_MOVE_DISTANCE = 20;  // minimum move of each paddle

// make two players:
let playerList;
// make the ball:
let ball = {
  size: 10,    // ball size
  direction: { // direction, X and Y increments
    h: 2,
    v: 2
  },              // position
  h: 0,
  v: 0,
  moving: false   // whether it's currently moving or not
}

let gameOver = true;       // whether or not a game is in progress
let delayCounter;          // a counter for the delay after an event
let gameOverDelay = 4000;  // pause after each game
let pointDelay = 2000;     // pause after each point

function setup() {
  // set up canvas and rect drawing mode:
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  // populate the player list with positions, now that
  // you know the size of the window:
  playerList = [
    // left player:
    {
      paddleH: 30,
      paddleV: height / 2,
      score: 0
    },
    // right player:
    {
      paddleH: width - 30,
      paddleV: height / 2,
      score: 0
    }
  ];
}

function draw() {
  drawGame();
}

/*
  player input function. This version uses the USB keyboard and keyReleased() function,
  but you could modify this for asynchronous serial, Bluetooth LE, or various network clients
  by using  this function as a template. Have your clients send the byte values represented
  by the keyCodes below, and call the movePaddle() and newGame() functions as needed, and the rest 
  of the code can stay the same.
*/

function keyReleased() {
  switch (keyCode) {
    case 87:    // W key
      movePaddle(LEFT_PLAYER, -PADDLE_MOVE_DISTANCE);
      break;
    case 83:    // S key
      movePaddle(LEFT_PLAYER, PADDLE_MOVE_DISTANCE);
      break;
    case 38:    // up arrow key
      movePaddle(RIGHT_PLAYER, -PADDLE_MOVE_DISTANCE);
      break;
    case 40:    // down arrow key
      movePaddle(RIGHT_PLAYER, PADDLE_MOVE_DISTANCE);
      break;
    case 78:   // n key
      newGame();
      break;
  }
}

function drawGame() {
  background(0);
  // draw all the paddles
  for (let p = 0; p < playerList.length; p++) {
    // show the paddle for this player:
    showPaddle(p);
  }

  // calculate ball's position:
  if (ball.moving) {
    moveBall();
  }
  // Draw the ball:
  rect(ball.h, ball.v, ball.size, ball.size);

  // show the score:
  showScore();

  // if the game is over, show the winner:
  if (gameOver) {
    textSize(24);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2 - 30);
    if (playerList[LEFT_PLAYER].score > playerList[RIGHT_PLAYER].score) {
      text("Left player Wins!", width / 2, height / 2);
    }
    else if (playerList[LEFT_PLAYER].score < playerList[RIGHT_PLAYER].score) {
      text("Right player Wins!", width / 2, height / 2);
    }
    text("Press n for new game ", width / 2, height / 2 + 30);
  }


  // // pause after each point:
  if (!gameOver && !ball.moving && (millis() >
    delayCounter + pointDelay)) {
    ball.moving = true;
  }
}

function moveBall() {
  // Check to see if the ball contacts any paddles:
  for (let p = 0; p < playerList.length; p++) {
    let thisPlayer = playerList[p];
    // calculate the horizontal edges of the paddle:
    let paddleRight = thisPlayer.paddleH + PADDLE_WIDTH / 2;
    let paddleLeft = thisPlayer.paddleH - PADDLE_WIDTH / 2;

    // calculate the vertical edges of the paddle:
    let paddleTop = thisPlayer.paddleV - PADDLE_HEIGHT / 2;
    let paddleBottom = thisPlayer.paddleV + PADDLE_HEIGHT / 2;

    //check to see if the paddle is striking the paddle:
    if ((ball.v >= paddleTop && ball.v <= paddleBottom)
      && (ball.h <= paddleRight && ball.h >= paddleLeft)) {
      // reverse the ball direction:
      ball.direction.h = -ball.direction.h;
    }
  }

  // if the ball goes off the screen left:
  if (ball.h < 0) {
    // increment right player's score:
    playerList[RIGHT_PLAYER].score++;
    // change ball direction:
    ball.direction.h = (random(2) + 1) * -1;
    // reset the ball to the center:
    resetBall();
  }
  // if the ball goes off the screen right:
  if (ball.h > width) {
       // change ball direction:
    playerList[LEFT_PLAYER].score++;
        // reset the ball to the center:
    ball.direction.h = (random(2) + 1);
    resetBall();
  }

  // if any player goes over WINNING_SCORE points, the other player loses:
  if ((playerList[LEFT_PLAYER].score > WINNING_SCORE) || (playerList[RIGHT_PLAYER].score > WINNING_SCORE)) {
    // set the delay counter and reset the game:
    delayCounter = millis();
    gameOver = true;
  }

  // stop the ball going off the top or bottom of the screen:
  if ((ball.v - ball.size / 2 <= 0) || (ball.v + ball.size / 2 >= height)) {
    // reverse the y direction of the ball:
    ball.direction.v = -ball.direction.v;
  }
  // update the ball position:
  ball.v = ball.v + ball.direction.v;
  ball.h = ball.h + ball.direction.h;
}

// reset the game:
function newGame() {
  gameOver = false;
  playerList[LEFT_PLAYER].score = 0;
  playerList[RIGHT_PLAYER].score = 0;
  resetBall();
}

// show the score at the top of the screen:
function showScore() {
  textSize(24);
  fill(255);
  text(playerList[LEFT_PLAYER].score, 20, 40);
  text(playerList[RIGHT_PLAYER].score, width - 40, 40);
}

// put the ball back in the center:
function resetBall() {
  ball.v = height / 2;
  ball.h = width / 2;
  ball.moving = false;
  delayCounter = millis();
}

// change the position of a player's paddle:
function movePaddle(playerNumber, howMuch) {
  let thisPlayer = playerList[playerNumber];
  let newPosition = thisPlayer.paddleV + howMuch;
  // constrain the paddle's position to the width of the window:
  thisPlayer.paddleV = constrain(newPosition, 0, height);
}

// redraw a player's paddle (no change of position):
function showPaddle(playerNumber) {
  let thisPlayer = playerList[playerNumber];
  rect(thisPlayer.paddleH, thisPlayer.paddleV, PADDLE_WIDTH, PADDLE_HEIGHT);
}