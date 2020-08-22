/*
 Geolocation with QR Code

 Reads the geolocation and draws it to the screen.
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
let geolocation = 'Checking to see if your browser supports geolocation...';
var geoOptions = {
   enableHighAccuracy: true,
   timeout: 10000,
   maximumAge: 0
};

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
   // start the geolocation watch
   parent.navigator.geolocation.watchPosition(geoSuccess, geoFailure, geoOptions);
}

function draw() {
   background(255);
   fill(0);
   //  display geolocation:
   text(geolocation, 10, 150);
}

function geoSuccess(position) {
   let coordinates = position.coords;
   let now = new Date(position.timestamp);
   geolocation = 'Your position is:'
      + '\nLatitude : ' + coordinates.latitude.toFixed(5)
      + '\nLongitude: ' + coordinates.longitude.toFixed(5)
      + '\nWithin ' + coordinates.accuracy + ' meters, at'
      + '\n' + new Date(position.timestamp);
}

function geoFailure(error) {
   geolocation = 'Error code ' + error.code + ': \n' + error.message;
}

// This function hides the tag div when you click on it:
function hideTag() {
   tagDiv.hide();
}
