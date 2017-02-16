
var express = require('express'); // include the express library
var server = express();           // create a server using express
var message = "Hello Client!"

server.use('/',express.static('public'));   // set a static file directory

function handleRequest(request, response) {
  response.send(message);         // send message to the client
  response.end();                 // close the connection
}

// start the server:
server.listen(8080);

// define what to do when the client requests something:
server.get('/mything', handleRequest);         // GET request
