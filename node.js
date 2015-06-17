var util = require('./utils');
//util.readJSON("loc01.json");
var DEBUG = 0;
var KEYS = { 
	UP : "1b5b41",
	DOWN : "1b5b42", 
	RIGHT : "1b5b43", 
	LEFT : "1b5b44",
	ESC : "1b" };
var UNICODE = {
	LEFT : 0x21e6,
	UP : 0x21e7,
	RIGHT : 0x21e8,
	DOWN : 0x21e9,
	RETURN : 0x23CE };

function Console (proc, fn, encoding, raw) {
	this.process = proc;	
	this.win_size = process.stdout.getWindowSize(0);
	this.process.stdin.setEncoding(encoding || 'hex');
	this.process.stdin.setRawMode(raw || true);
}

Console.prototype.setMain = function (fn) {
	this.process.stdin.on("data", fn.bind(this));
}

Console.prototype.printAt = function (idx, idy, char) {
	var cols = this.win_size[0];
	for ( var i = 0 ; i < (idy*cols)+idx ; i++ ) {
		this.process.stdout.write(' ');
	}
	this.process.stdout.write(char);
}

Console.prototype.printMap = function (array) {
			
}


function printKeys (b) {
	this.process.stdout.write('\033c'); //clear
	var keyAsHex = b.toString();

//	this.printAt(2, 0, 'c');
	switch ( keyAsHex ) {
		case KEYS.UP:
			this.process.stdout.write(String.fromCharCode(UNICODE.UP)+'\n');
			break;
		case KEYS.DOWN:
			this.process.stdout.write(String.fromCharCode(UNICODE.DOWN)+'\n');
			break;
		case KEYS.RIGHT:
			this.process.stdout.write(String.fromCharCode(UNICODE.LEFT)+'\n');
			break;
		case KEYS.LEFT:
			this.process.stdout.write(String.fromCharCode(UNICODE.RIGHT)+'\n');
			break;
		case KEYS.ESC:
			this.process.stdout.write(String.fromCharCode(UNICODE.RETURN)+'\n');
			this.process.exit(0);
			break;
	}

}

var c = new Console(process);
c.setMain( printKeys )



if (DEBUG) {
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

