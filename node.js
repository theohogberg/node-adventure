var KEYS = { 
	UP : "1b5b41",
	DOWN : "1b5b42", 
	RIGHT : "1b5b43", 
	LEFT : "1b5b44",
	ESC : "1b"
}

var UNICODE = {
	LEFT : 8606,
	UP : 8607,
	RIGHT : 8608,
	DOWN : 8609
}

process.stdin.setEncoding('hex');
process.stdin.setRawMode(true);

process.stdin.on("data", function(b){

	process.stdout.write('\033c');

	var keyAsHex = b.toString();
	switch ( keyAsHex ) {
		case KEYS.UP:
			process.stdout.write("up");
			break;
		case KEYS.DOWN:
			process.stdout.write("down");
			break;
		case KEYS.RIGHT:
			process.stdout.write("right");
			break;
		case KEYS.LEFT:
			process.stdout.write("left");
			break;
		case KEYS.ESC:
			process.stdout.write("escape");
			process.exit(0);
			break;
	}

	// console.log( keyAsHex );
});


process.stdout.write( String.fromCharCode(UNICODE.LEFT) );

process.on('exit', function(code) {
	console.log('About to exit with code:', code);

	if ( code === 0 ) {
		console.log('exit success');	
	} else {
		console.log('exit failure');	
	}

});

