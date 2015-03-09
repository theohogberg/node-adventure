var fs = require('fs');
var zlib = require('zlib');

module.exports.readJSON = function (filename){
	var data = fs.readFileSync(filename, {encoding : "utf8"});
	return JSON.parse(data);
};

module.exports.gzipJSON = function (input, output) {
	var gzip = zlib.createGzip();
	var inp = fs.createReadStream(input);
	var out = fs.createWriteStream( (output || input) + ".gz" );
	inp.pipe(gzip).pipe(out);
};

module.exports.gunzipJSON = function (input) {
	var gunzip = zlib.createGunzip();
	var inp = fs.createReadStream( input );
	var out = fs.createWriteStream( input.slice(0, input.indexOf(".gz")) );
	inp.pipe(gunzip).pipe(out);
};

// gives stream printable to stdout
module.exports.createLoc = function (){
	var stream = require('stream').Readable;
	
};