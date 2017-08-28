var serial; // variable to hold an instance of the serialport library
var sensorValue = 0; // ellipse position
var ballX, ballY, ballZ;

function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of  serialport library
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  serial.on('open', openPort);    // callback for port opening
  //serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem142421"); // open a port
}

function draw() {
  background("#2307AF");
  fill(255);
  ellipse(ballX, ballY, 20, 20);
  text(ballX + " " + ballY + " " + ballZ, 20, 20);
}

function openPort(){
 println("serial port is open for business!!"); 
 serial.write("X");  
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function mousePressed() {
  serial.write("X");
}

function serialEvent() {
  var inString = serial.readLine();
  if (inString.length > 0) {
    inString = inString.trim();
    var values = split(inString, ",");
    if (values.length > 2) {
      ballX = Number(values[0]);
      ballY = Number(values[1]);
      ballZ = Number(values[2]);

      ballX = floor(map(ballX, 400, 700, 0, width));
      ballY = floor(map(ballY, 400, 700, 0, height));
      ballZ = floor(map(ballZ, 400, 700, 0, 255));
      serial.write("X");
    }
    //println(ballX + " " + ballY + " " + ballZ);
    //	sensorValue = Number(inString/4);
    // println(sensorValue);
    
  }

}