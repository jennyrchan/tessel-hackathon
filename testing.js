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
var accel = require('accel-mma84').use(tessel.port['A']);


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