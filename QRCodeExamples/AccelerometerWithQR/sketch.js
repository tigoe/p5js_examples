/*
 Accelerometer with QR Code

 Reads the accelerometer and device orientation and draws them to the screen.
 Also draws a QR code using a text string of the URL for this sketch.  Uses 
  https://github.com/kazuhikoarase/qrcode-generator
  as the QR Code generator library. It's hosted at this CDN:
  https://unpkg.com/qrcode-generator@1.4.4/qrcode.js"

  created 19 July 2020
  by Tom Igoe
*/

// a string to diisplay in the QR code
// (the URL of this sketch):
let urlString = parent.location.href;
// an HTML div to display it in:
let tagDiv;

function setup() {
   createCanvas(windowWidth, windowHeight);
   // make the HTML tag div:
   tagDiv = createDiv();
   tagDiv.style('font-size', '18px');
   // make the QR code:
   let typeNumber = 0;  // 1 - 40
   let errorCorrection = 'L'; // L, M, Q, H
   let qr = qrcode(typeNumber, errorCorrection);
   qr.addData(urlString);
   qr.make();
   // create an image from it:
   let cellSize = 2;
   let margin = 8;
   let qrImg = qr.createImgTag(cellSize, margin, "qr code");
   // put the image and the URL string into the HTML div:
   tagDiv.html(urlString + '<br>' + qrImg);
   // position it:
   tagDiv.position(10, 10);
   // set a callback function for clicking on the tag:
   tagDiv.mousePressed(hideTag);
}

function draw() {
   background(255);
   fill(0);
   // get acceleration as a string:
   let acceleration = 'Acceleration: x: '
      + accelerationX + ", y: "
      + accelerationY + ", z: "
      + accelerationZ;
   // get rotation as a string:
   let rotation = 'Rotation: x: '
      + rotationX + ", y: "
      + rotationY + ", z: "
      + rotationZ;
   //  display all three:
   let readingDiv = createDiv();
   readingDiv.position(10,200);
   readingDiv.style('font-size', '18px');
   let readings = 'Orientation: ' + deviceOrientation + '<br>';
   readings += rotation + '<br>';
   readings += acceleration;
   readingDiv.html(readings);
}

// This function hides the tag div when you click on it:
function hideTag() {
   tagDiv.hide();
}