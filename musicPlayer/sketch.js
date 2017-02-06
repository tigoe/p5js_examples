/*
 Music player
Plays a directory of music

Plays songs in a subdirectory of the sketch called music

Put any songs you want in the music subdirectory, then
copy the list of song names into the songs[] array.

created by Tom Igoe
5 Feb 2017
*/

var song;		// the sound file to be played

// the list of songs:
var songs = ['song1','song2','song3'];

var songCount = songs.length; // number of songs in the music dir
var currentSong = 0;          // current song number

function preload() {          // load the first song on preload
 song = loadSound('music/' + songs[currentSong]);
}
function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(30, 20, 180);
  fill(255);
  // draw the song's name and current time in seconds:
  text(songs[currentSong], 20, 50);
  text(song.currentTime().toFixed(3), 20, 100);
}

function controlSound(input) {
  switch(input) {
    case 49:   // start/stop, press 1
      if (song.isPlaying()){
        song.stop();
      } else {
        song.play();
      }
      break;
    case 50:   // play/pause, press 2
      if (song.isPlaying()){
        song.pause();
      } else {
        song.play();
      }
      break;
    case 51:    // skip ahead, press 3
      // make sure the song number is valid, and increment:
      if (currentSong < songs.length-1) {
        currentSong++;
      } else {
        currentSong = 0;
      }
      // get new song:
      getSong(currentSong);
      break;
    case 52:    // skip back, press 4
      // in the first second, just rewind the current track:
      if (song.currentTime() > 1.0) {
        song.jump(0);
      // if more than a second has elapsed, then
      // make sure the song number is valid, and decrement:
      } else {
        if (currentSong > 0) {
          currentSong--;
        } else {
          currentSong = songs.length-1;
        }
        // get new song:
        getSong(currentSong);
      }
      break;
    case 53:    // fast forward, press 5
        song.rate(2.0);   // double the play speed
      if (!song.isPlaying()){
        song.play();
      }
      break;
    case 54:    // random song, press 6
      currentSong = Math.round(random(songCount));  // get a new song number
      getSong(currentSong);             // play it
      break;
  }
}

function getSong(songNumber) {
  if (songNumber < songs.length) {   // if the song number is in range
    if (song.isPlaying()) {
      song.stop();
    }
    // load a new song:
    song = loadSound('music/'+ songs[currentSong], resumePlay);
    return true;
  } else {        // if the song number was out of range, return false
    return false;
  }
}

function resumePlay() {
  // if the song isn't playing, play it
  if (song.isPlaying()){
    song.stop();
  } else {
    song.play();
  }
}

function keyReleased() {
  controlSound(keyCode);    // send the ASCII number of the key
}
