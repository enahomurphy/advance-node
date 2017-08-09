const { createServer } = require('net');

const server = createServer();
let counter = 0;
sockets = {}

server.on('connection', socket => {
  socket.id = counter++;
  sockets[socket.id] = socket;

  console.log('client has connected')
  socket.write('Welcome new client \n')

  socket.on('data', data => {
    Object.entries(sockets).forEach(([key, cs]) => {
    console.log(`${socket.id}: ${data}`)
      if (key !== socket.id) {
        cs.write(`${socket.id}: `);
        cs.write(data);
      }
    })
  });
  socket.setEncoding('utf8');
  socket.on('end', () => {
    console.log('Client has disconnected')
  })

})

server.listen(5000, () => console.log('Server started'));