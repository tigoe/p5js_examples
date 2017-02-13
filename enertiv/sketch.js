var data = {
  'client_id': 'c99b7f5dec0d6a0f6178',
  'client_secret': '575af139440e5ae453d6171d14efd8ce3a4f3005',
  'grant_type': 'password',
  'username': 'mmg542@nyu.edu',
  'password': 'energyatitp'
};

function setup() {
  createCanvas(640,480);

  //httpDo('https://api.enertiv.com:443/o/token','POST',data,'json',success,failure);
  console.log("I made the request");
}

function draw() {
background(255);

}

function success(response) {
  console.log("Success! " + response);
}

function failure(response) {
  console.log("failure! " + response);
}
