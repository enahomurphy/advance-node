const { readFile, createReadStream } = require('fs');
const { createServer } = require('http');

const server = createServer();

server.on('request', (req, res) => {
  // readFile('./big.file', (err, data) => {
  //   if (err ) throw err;

  //   res.end(data);
  // })
  createReadStream('./big.file').pipe(res)
});

server.listen(8000);