/*
 Accelerometer with QR Code

 Reads the accelerometer and device orientation and draws them to the screen.
 Also draws   a QR code using a text string of the URL for this sketch.  Uses 
  https://github.com/kazuhikoarase/qrcode-generator
  as the QR Code generator library. It's hosted at this CDN:
  https://unpkg.com/qrcode-generator@1.4.4/qrcode.js"

  created 19 July 2020
  by Tom Igoe
*/

// a string to diisplay in the QR code
// (the URL of this sketch):
// (note: change to window.location.href if you're serving this page from somewhere other than the p5.js editor)
let inputString = parent.location.href;
// an HTML div to display it in:
let tagDiv;

function setup() {
   createCanvas(windowWidth, windowHeight);
   // make the HTML tag div:
   tagDiv = createDiv();
   // position it:
   tagDiv.position(10, 10);
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
   text('Orientation: '  + deviceOrientation, 10, 150);
   text(acceleration, 10, 180);
   text(rotation, 10, 210);

   // display the URL:
   text(inputString, 10, 120);
   // make the QR code:
   let qr = qrcode(0, 'L');
   qr.addData(inputString);
   qr.make();
   // create an image from it:
   let qrImg = qr.createImgTag(2, 8, "qr code");
   // put the image into the HTML div:
   tagDiv.html(qrImg);
}