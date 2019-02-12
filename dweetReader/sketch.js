/*
	Dweet.io example

	Reads dweets and graphs them. Assumes the device that's sending data
	is sending characteristic called sensorValue. The expected dweet response is shown above the readResponse function below.

	based on https://github.com/tigoe/GraphingSketches/blob/master/RunningGraph/sketch.js

	The dweetPost example from the ArduinoHTTPClient library feeds this well:
	https://github.com/arduino-libraries/ArduinoHttpClient/blob/master/examples/DweetPost/DweetPost.ino

	created 11 Feb 2019
	by Tom Igoe
*/

// your dweet URL. Change as needed. See https://dweet.io/play/#!/dweets/getLatestDweet_get_2 for details:
let url = 'https://dweet.io:443/get/latest/dweet/for/scandalous-cheese-hoarder';

// array to hold raw sensor readings:
let readings = [];
// last mapped sensor reading (for graphing)
let lastReading = 0;
// minimum and maximum sensor values. Adjust to fit your needs
let minValue = 0;
let maxValue = 480;

function setup() {
	createCanvas(640, 480);
	textSize(24);
}
// every 1.5 seconds, make an HTTP GET request:
function makeRequest() {
	httpDo(url, 'GET', readResponse);
}
// set the get request timer:
setInterval(makeRequest, 1500);

function draw() {
	var thisReading; // current reading being plotted
	var xPos;        // current x position

	// clear the background:
	background(0);
	for (xPos = 1; xPos < width; xPos++) {
		// get the current reading and the last reading:
		thisReading = readings[xPos];
		lastReading = readings[xPos - 1];
		// if there's a valid reading:
		if (thisReading) {
			// draw over previous reading text:
			stroke(0);
			fill(0);
			text(lastReading, 30, 30);
			// set fill for  current reading text
			fill('#CC98FF');
			text(thisReading, 30, 30);
			// set stroke color for the graph lines:
			stroke('#CC98FF');
			// calculate the current and previous Y positions:
			var yPos = map(thisReading, minValue, maxValue, height, 0);
			var lastYPos = map(lastReading, minValue, maxValue, height, 0);
			// draw a line from the last position to the current one:
			line(xPos - 1, yPos, xPos, lastYPos);
		}
		// if the array is the width of the canvas,
		// start deleting elements from the front of the array
		// to save memory:
		if (readings.length > width) {
			readings.shift(); // delete the first element in the array
		}
	}

}

/*
{"this":"succeeded","by":"getting","the":"dweets","with":[{"thing":"device-name","created":"2019-02-12T01:50:03.215Z","content":{"sensorValue":632}}]}
*/
function readResponse(response) {
	// get response as a JSON object:
	let data = JSON.parse(response);
	// parse out the value you want:
	data = data.with[0].content;
	let value = data.sensorValue;
	// add it to the readings array:
	readings.push(value);
}