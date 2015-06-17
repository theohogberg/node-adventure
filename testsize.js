  var tty = require('tty');
  var width;
  var height;

  if(tty.isatty(1) && tty.isatty(2)) {
    if(process.stdout.getWindowSize) {
      width = process.stdout.getWindowSize(1)[0];
      height = process.stdout.getWindowSize(1)[1];
    } else if (tty.getWindowSize) {
      width = tty.getWindowSize()[1];
      height = tty.getWindowSize()[0];
    } else if (process.stdout.columns && process.stdout.rows) {
      height = process.stdout.columns;
      width = process.stdout.rows;
    }
  } else {
    throw new Error('window-size could not get size with tty or process.stdout.');
  }

console.log(width, height)


