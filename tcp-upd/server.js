const { createServer } = require('net');

const server = createServer();
let counter = 0;
sockets = {}

server.on('connection', socket => {
  socket.id = counter++;
  
  console.log('client has connected')
  socket.write('Please enter your name: ')

  socket.on('data', data => {
    if(!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }
    Object.entries(sockets).forEach(([key, cs]) => {
    console.log(`${socket.id}: ${data}`)
      if (key != socket.id) {
        cs.write(`${socket.name}: `);
        cs.write(data);
      }
    })
  });
  socket.setEncoding('utf8');
  socket.on('end', data => {
    delete sockets[socket.id];
    Object.entries(sockets).forEach(([keys, sc]) => {
      sc.write(`${socket.name}: `);
      sc.write('has disconnected\n');
    })
    console.log(`${socket.name} has disconnected`)
  })

})

server.listen(5000, () => console.log('Server started'));