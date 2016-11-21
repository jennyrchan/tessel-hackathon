var av = require('tessel-av');
var path = require('path');
var os = require('os');
var fs = require('fs');
var http = require('http');
var port = 8000;
var camera = new av.Camera();
var capture = camera.capture();
var tessel = require('tessel');
var servolib = require('servo-pca9685');
var servo = servolib.use(tessel.port['B']);
var servo1 = 1; // We have a servo plugged in at position 1
//ready event on camera, accel, and servo 
//create server
var accel = require('accel-mma84').use(tessel.port['A']);


var accelGo = function() {
	// Initialize the accelerometer.
	accel.on('ready', function () {
	    // Stream accelerometer data
	  var oldX, oldY, oldZ;

	  accel.on('data', function(xyz) {
	    oldX = xyz[0].toFixed(2),
	    oldY = xyz[1].toFixed(2),
	    oldZ = xyz[2].toFixed(2);

	    console.log(oldX, oldY, oldZ);

	  });

	  setTimeout(function () {
	    console.log('1 second later...');
	    accel.removeAllListeners('data');
	    // Stream new coordinates and compare to old coordinates
	    accel.on('data', function (xyz) {
	      var newX = xyz[0].toFixed(2),
	          newY = xyz[1].toFixed(2),
	          newZ = xyz[2].toFixed(2);

	      if (Math.abs(newX - oldX) > 0.01) {
	        console.log("MOVING!");
	        
		    http.createServer(function(request, response) {  
		        response.writeHeader(200, {"Content-Type": "text/html"});  
		        response.write(html);  
		        response.end();

	    	}).listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));
	      }
	    });
	  }, 1000);
	});
};

var servoGo = function() {

	servo.on('ready', function () {
	  var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

	  servo.configure(servo1, 0.05, 0.12, function () {
	    setInterval(function () {
	      console.log('Position (in range 0-1):', position);
	      //  Set servo #1 to position pos.
	      servo.move(servo1, position);

	      // Increment by 10% (~18 deg for a normal servo)
	      position += 0.5;
	      if (position > 1) {
	        position = 0; // Reset servo position
	      }
	    }, 500); // Every 500 milliseconds
	  });
	});
}

var cameraCapture = function() {
	capture.on('data', function(data) {
  	fs.writeFile(path.join(__dirname, '/views/the_culprit.jpg'), data, function (err, data) {	
	  	fs.readFile('./index.html', function (err, html) {
		    if (err) {
		        throw err; 
		    }       
		    http.createServer(function(request, response) {  
		        response.writeHeader(200, {"Content-Type": "text/html"});  
		        response.write(html);  
		        response.end();

	    	}).listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));
		});
	
  	});
});
}

accelGo();

	//on accelerometer move: triggers somethign that sends to 
	//servo moving 

	//triggers camera takes a pic and uploads it to webstie
	
	//when tehwebsite receives a picture, it also begins to play the audio. 
  // response.writeHead(200, { 'Content-Type': 'image/jpg' });


  // camera.capture().pipe(response);

