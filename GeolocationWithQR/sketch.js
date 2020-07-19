/*
 Geolocation with QR Code

 Reads the geolocation and draws it to the screen.
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
let geolocation = 'getting geolocation';

function setup() {
   createCanvas(windowWidth, windowHeight);
   // make the HTML tag div:
   tagDiv = createDiv();
   // position it:
   tagDiv.position(10, 10);
    // start the geolocation watch
    parent.navigator.geolocation.watchPosition(success, failure, options);
}

function draw() {
   background(255);
   fill(0);
   //  display geolocation:
   text( geolocation, 10, 150);

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

/*
Geolocation
Context: p5.js
*/
var label = "Checking to see if your browser supports geolocation...";
var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};


function success(position) {
 let coordinates = position.coords;
 let now = new Date(position.timestamp);
 geolocation = 'Your position is:'
   + '\nLatitude : ' + coordinates.latitude.toFixed(5)
   + '\nLongitude: ' + coordinates.longitude.toFixed(5)
   + '\nWithin ' + coordinates.accuracy + ' meters, at'
   + '\n' + new Date(position.timestamp);
}

function failure(error) {
   geolocation = 'Error code ' + error.code + ': \n' + error.message;
}
