/*
  QR Code generator

  Draws a QR code using a text string. Uses 
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
   // make the QR code:
   let qr = qrcode(0, 'L');
   qr.addData(urlString);
   qr.make();
   // create an image from it:
   let qrImg = qr.createImgTag(2, 8, "qr code");
   // put the image and the URL string into the HTML div:
   tagDiv.html(urlString + '<br>' + qrImg);
   // position it:
   tagDiv.position(10, 10);
   // set a callback function for clicking on the tag:
   tagDiv.mousePressed(hideTag);
}

function draw() {

}

// This function hides the tag div when you click on it:
function hideTag() {
   tagDiv.hide();
}