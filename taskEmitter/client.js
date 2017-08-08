const EventEmitter = require('events');
const { createInterface } = require('readline');

const readline  = createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmitter();
const server = require('./server')(client);

server.on('response', res => {
  process.stdout.write(res);
  process.stdout.write('\n')
})

readline.on('line', input => {
  const args = input.split(' ')
  client.emit('command', args[0], ...input);
});