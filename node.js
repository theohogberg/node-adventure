var KEYS = { 
	UP : "1b5b41",
	DOWN : "1b5b42", 
	RIGHT : "1b5b43", 
	LEFT : "1b5b44",
	ESC : "1b"
}

process.stdin.setEncoding('hex');
process.stdin.setRawMode(true);

process.stdin.on("data", function(b){

	var keyAsHex = b.toString();

	switch ( keyAsHex ) {
		case KEYS.UP:
			console.log("up");
			break;
		case KEYS.DOWN:
			console.log("down");
			break;
		case KEYS.RIGHT:
			console.log("right");
			break;
		case KEYS.LEFT:
			console.log("left");
			break;
		case KEYS.ESC:
			console.log("escape");
			process.exit(0);
			break;
	}

	// console.log( keyAsHex );
});


process.on('exit', function(code) {
	console.log('About to exit with code:', code);
	
	if ( code === 0 ) {
		console.log('exit success');	
	} else {
		console.log('exit failure');	
	}

});

