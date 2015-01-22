var u = require('./utils');
u.readJSON("loc01.json");

process.stdout.write('\033c');

var KEYS = { 
	UP : "1b5b41",
	DOWN : "1b5b42", 
	RIGHT : "1b5b43", 
	LEFT : "1b5b44",
	ESC : "1b"
};

var UNICODE = {
	LEFT : 0x219E,
	UP : 0x219F,
	RIGHT : 0x21A0,
	DOWN : 0x21A1,
	RETURN : 0x23CE
};

process.stdin.setEncoding('hex');
process.stdin.setRawMode(true);

process.stdin.on("data", function(b){

	// Clear console
	process.stdout.write('\033c');

	var keyAsHex = b.toString();
	switch ( keyAsHex ) {
		case KEYS.UP:
			process.stdout.write(String.fromCharCode(UNICODE.UP));
			break;
		case KEYS.DOWN:
			process.stdout.write(String.fromCharCode(UNICODE.DOWN));
			break;
		case KEYS.RIGHT:
			process.stdout.write(String.fromCharCode(UNICODE.LEFT));
			break;
		case KEYS.LEFT:
			process.stdout.write(String.fromCharCode(UNICODE.RIGHT));
			break;
		case KEYS.ESC:
			process.stdout.write(String.fromCharCode(UNICODE.RETURN));
			process.exit(0);
			break;
	}

	// console.log( keyAsHex );
});



process.on('exit', function(code) {
	console.log('\nAbout to exit with code:', code);

	if ( code === 0 ) {
		console.log('exit success');	
	} else {
		console.log('exit failure');	
	}

});

// function start (startfile) {
// 	var zlib = require('zlib');
// 	var gzip = zlib.createUnzip();
// 	var fs = require('fs');
// 	var inp = fs.createReadStream(startfile);
// 	inp.pipe(gzip).pipe(process.stdout);
// }

if (process.stdout.isTTY) {
	console.log("The console size is:", process.stdout.getWindowSize());
} else {
	console.log("stdout is not a console");
} 