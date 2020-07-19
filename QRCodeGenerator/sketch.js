/*
  QR Code generator

  Draws a QR code using a text string.  Uses 
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
  tagDiv.position(30, 30);
}

function draw() {
  background(255);
  fill(0);
  text(inputString, 10, 10);

  // make the QR code:
  let qr = qrcode(0, 'L');
  qr.addData(inputString);
  qr.make();
  // create an image from it:
  // paaramtetrs are cell size, margin size, and alt tag
  // cell size default: 2
  // margin zize defaault: 4 * cell size
  let qrImg = qr.createImgTag(5, 20, "qr code");
  // put the image into the HTML div:
  tagDiv.html(qrImg);
}