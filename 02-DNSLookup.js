var fs = require('fs');
var dns = require ('dns');

var config = require('./config.json');

var files = fs.readdirSync( config.tmpPath ).filter(function(file){
	return file.indexOf('.json') != -1;
});
	
function lookupDomain( domains, filePath, callback ){
	if (domains.length){
		var name = domains.shift() + config.domainExtension;
		dns.resolveNs( name, function(err, addresses) {
			if (err && err.code === "ENOTFOUND") {
				fs.appendFileSync('./results.txt', name + "\n");
			}
			lookupDomain(domains, filePath, callback);
		});
	} else {
		callback(filePath);
	}
}

function readFiles( files ){
	if ( files.length ) {
		var filePath = config.tmpPath + files.shift();
		var domains = require( filePath );

		console.log(filePath + ' read');
		lookupDomain(domains, filePath, function(filePath){
			fs.unlinkSync(filePath);
			console.log(filePath + ' deleted');
			readFiles(files);
		});
	} else {
		fs.rmdirSync( config.tmpPath );
	}
}

readFiles(files);