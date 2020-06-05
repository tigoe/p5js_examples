/*
	pitch detector in p5.js

	Listens to the microphone, displays the loudest pitch
	waveform drawing routine comes from the p5.FFT example.

	created 15 Nov 2018
	by Tom Igoe
*/

var mic;		// an object for the microphone input
var fft;		// an object for the FFT frequency analyzer
var audioStarted = false;
// a list of standard pitches:


var pitches = {
	NOTE_B0: 31,
	NOTE_C1: 33,
	NOTE_CS1: 35,
	NOTE_D1: 37,
	NOTE_DS1: 39,
	NOTE_E1: 41,
	NOTE_F1: 44,
	NOTE_FS1: 46,
	NOTE_G1: 49,
	NOTE_GS1: 52,
	NOTE_A1: 55,
	NOTE_AS1: 58,
	NOTE_B1: 62,
	NOTE_C2: 65,
	NOTE_CS2: 69,
	NOTE_D2: 73,
	NOTE_DS2: 78,
	NOTE_E2: 82,
	NOTE_F2: 87,
	NOTE_FS2: 93,
	NOTE_G2: 98,
	NOTE_GS2: 104,
	NOTE_A2: 110,
	NOTE_AS2: 117,
	NOTE_B2: 123,
	NOTE_C3: 131,
	NOTE_CS3: 139,
	NOTE_D3: 147,
	NOTE_DS3: 156,
	NOTE_E3: 165,
	NOTE_F3: 175,
	NOTE_FS3: 185,
	NOTE_G3: 196,
	NOTE_GS3: 208,
	NOTE_A3: 220,
	NOTE_AS3: 233,
	NOTE_B3: 247,
	NOTE_C4: 262,
	NOTE_CS4: 277,
	NOTE_D4: 294,
	NOTE_DS4: 311,
	NOTE_E4: 330,
	NOTE_F4: 349,
	NOTE_FS4: 370,
	NOTE_G4: 392,
	NOTE_GS4: 415,
	NOTE_A4: 440,
	NOTE_AS4: 466,
	NOTE_B4: 494,
	NOTE_C5: 523,
	NOTE_CS5: 554,
	NOTE_D5: 587,
	NOTE_DS5: 622,
	NOTE_E5: 659,
	NOTE_F5: 698,
	NOTE_FS5: 740,
	NOTE_G5: 784,
	NOTE_GS5: 831,
	NOTE_A5: 880,
	NOTE_AS5: 932,
	NOTE_B5: 988,
	NOTE_C6: 1047,
	NOTE_CS6: 1109,
	NOTE_D6: 1175,
	NOTE_DS6: 1245,
	NOTE_E6: 1319,
	NOTE_F6: 1397,
	NOTE_FS6: 1480,
	NOTE_G6: 1568,
	NOTE_GS6: 1661,
	NOTE_A6: 1760,
	NOTE_AS6: 1865,
	NOTE_B6: 1976,
	NOTE_C7: 2093,
	NOTE_CS7: 2217,
	NOTE_D7: 2349,
	NOTE_DS7: 2489,
	NOTE_E7: 2637,
	NOTE_F7: 2794,
	NOTE_FS7: 2960,
	NOTE_G7: 3136,
	NOTE_GS7: 3322,
	NOTE_A7: 3520,
	NOTE_AS7: 3729,
	NOTE_B7: 3951,
	NOTE_C8: 4186,
	NOTE_CS8: 4435,
	NOTE_D8: 4699,
	NOTE_DS8: 4978
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	if (!audioStarted) {
		fill('0099FF');
		text("click mouse to start audio", 10, height / 2);
	} else {
		// get the mic level
		micLevel = mic.getLevel();
		// analyze the sound using FFT:
		var spectrum = fft.analyze();
		// variable to find the loudest pitch:
		var loudestPitch = 0;
		// variable for tne note name of the loudest pitch:
		var note = '';
		// loop over the pitches array:
		for (var thisPitch in pitches) {
			// get the sound energy at the pitch of each element in the array:
			var amplitude = fft.getEnergy(pitches[thisPitch]);
			// if the sound energy is the loudest so far,
			// save this as the current loudest:
			if (amplitude > loudestPitch) {
				loudestPitch = amplitude;
				note = thisPitch;
			}
		}
		// print out the loudest note:
		text(note, 20, 20);

		// draw the sound waveform:
		var waveform = fft.waveform();
		noFill();
		beginShape();
		stroke('#0099FF'); // waveform is teal
		strokeWeight(1);
		for (var i = 0; i < waveform.length; i++) {
			var x = map(i, 0, waveform.length, 0, width);
			var y = map(waveform[i], -1, 1, 0, height);
			vertex(x, y);
		}
		endShape();
	}
}

function mouseReleased() {
	startAudio();
}
function startAudio() {
	// make a microphone object:
	mic = new p5.AudioIn()
	// make an FFT sound analyzer:
	fft = new p5.FFT();
	// start the mic:
	mic.start();
	// set the mic as the input to the analyzer:
	fft.setInput(mic);
	audioStarted = true;
}