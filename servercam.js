var av = require('tessel-av');
var path = require('path');
var os = require('os');
var fs = require('fs');
var http = require('http');
var port = 8000;
var camera = new av.Camera();
var capture = camera.capture();

//ready event on camera, accel, and servo 
//create server


capture.on('data', function(data) {
  	fs.writeFile(path.join(__dirname, 'assets/the_culprit.jpg'), data, function (err, data) {
	  	
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



	//on accelerometer move: triggers somethign that sends to 
	//servo moving 

	//triggers camera takes a pic and uploads it to webstie
	
	//when tehwebsite receives a picture, it also begins to play the audio. 
  // response.writeHead(200, { 'Content-Type': 'image/jpg' });


  // camera.capture().pipe(response);

