var serial; // variable to hold an instance of the serialport library
var sensorValue;

function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of  serialport library
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem142431"); // open a port
}

function draw() {
  background(255);
  fill(0);
  text(mouseX + "," + mouseY, width / 2, height / 2);
  text("From Arduino:  " + sensorValue, 10, 30);
}

function mouseReleased() {
  println("sending");
  serial.write(mouseX);
  serial.write(mouseY);
  serial.write(255);
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  println("serialevent");
  var inString = serial.readLine();
  if (inString.length > 0) {
    inString = inString.trim();
    sensorValue = inString;

  }
}