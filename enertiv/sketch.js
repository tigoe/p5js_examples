var data = {
  'client_id': '',
  'client_secret': '',
  'grant_type': 'password',
  'username': '',
  'password': ''
};

function setup() {
  createCanvas(640,480);

  //httpPost('https://api.enertiv.com/o/token',data,'json',success,failure);
  console.log("I made the request");
}

function draw() {
  background(255,0,0);
fill(255);
ellipse(width/2, height/2, 20, 20);
}

function success(response) {
  console.log("Success! " + response);
}

function failure(response) {
  console.log("failure! " + response);
}
