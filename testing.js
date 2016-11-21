var os = require('os');
var fs = require('fs');
var http = require('http');
var port = 8000;

	  	fs.readFile('./views/index.html', function (err, html) {
		    if (err) {
		        throw err; 
		    }       
		    http.createServer(function(request, response) {  
		        response.writeHeader(200, {"Content-Type": "text/html"});  
		        response.write(html);  
		        response.end();

	    	}).listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));
		});