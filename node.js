var util = require('./utils');
util.readJSON("loc01.json");
var window_size;

var KEYS = { 
	UP : "1b5b41",
	DOWN : "1b5b42", 
	RIGHT : "1b5b43", 
	LEFT : "1b5b44",
	ESC : "1b"
};

var UNICODE = {
	LEFT : 0x21e6,
	UP : 0x21e7,
	RIGHT : 0x21e8,
	DOWN : 0x21e9,
	RETURN : 0x23CE
};

function initConsole (encoding, raw, clean, debug) {
	
	if (clean)
		process.stdout.write('\033c');
	window_size = process.stdout.getWindowSize();
	process.stdin.setEncoding(encoding);
	process.stdin.setRawMode(raw);
	process.stdin.on("data", function(b){

		process.stdout.write('\033c'); //clear

		var keyAsHex = b.toString();
		switch ( keyAsHex ) {
			case KEYS.UP:
				process.stdout.write(String.fromCharCode(UNICODE.UP)+'\n');
				break;
			case KEYS.DOWN:
				process.stdout.write(String.fromCharCode(UNICODE.DOWN)+'\n');
				break;
			case KEYS.RIGHT:
				process.stdout.write(String.fromCharCode(UNICODE.LEFT)+'\n');
				break;
			case KEYS.LEFT:
				process.stdout.write(String.fromCharCode(UNICODE.RIGHT)+'\n');
				break;
			case KEYS.ESC:
				process.stdout.write(String.fromCharCode(UNICODE.RETURN)+'\n');
				process.exit(0);
				break;
		}

	});

	if (debug) {
		if (process.stdout.isTTY) {
			console.log("The console size is:", process.stdout.getWindowSize());
		} else {
			console.log("stdout is not a console");
		}

		process.on('exit', function(code) {
			console.log('\nAbout to exit with code:', code);

			if ( code === 0 ) {
				console.log('exit success');	
			} else {
				console.log('exit failure');	
			}

		});

	}
	
}

function printAt (idx, idy, string) {
	var cols = window_size[0];
	// console.log(idy*cols);
	for ( var i = 0 ; i < (idy*cols)+idx ; i++ ) {
		process.stdout.write('1');
	}
	process.stdout.write(string);
}


initConsole('hex', true, true);

printAt(1, 0, '0');



