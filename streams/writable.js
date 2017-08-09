const { Writable } = require('stream');

const outWrite = new Writable({
  write(chunk, encoding, cb) {
    console.log(chunk.toString());
    cb();
  }
});


process.stdout.pipe(outWrite);