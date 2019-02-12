# Dweet.io Reader and Graphing Sketch

This p5.js sketch reads data from [dweet.io](http://dweet.io) and graphs the result. Assumes the device that's sending data is sending characteristic called `sensorValue`. The expected dweet response is shown above the readResponse function below.

based on my [Serial Running Graph Sketch](https://github.com/tigoe/GraphingSketches/blob/master/RunningGraph/sketch.js).

The [dweetPost example](https://github.com/arduino-libraries/ArduinoHttpClient/blob/master/examples/DweetPost/DweetPost.ino) from the [ArduinoHTTPClient](https://github.com/arduino-libraries/ArduinoHttpClient) library supplies data for this sketch well. 
