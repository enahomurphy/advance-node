const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client) {
    super(client)
    this.tasks = [];
    this.id = 1
    client.on('command', (command, task) => {
      switch(command) {
        case 'help':
          this.help();
          break
        case 'add':
          this.add(task);
          break
        case 'ls':
          this.ls();
          break
        case 'delete':
          this.add();
          break
        default: 
          this.emit('response', 'unknown command....');
      }
    });
  }

  help() {
    process.stdout.write('ls: List')
    this.emit('response', 'Help method was called')
  }

  add(task) {
    this.tasks.push({ id: this.id, task  });
    this.id++
    this.emit('response', 'Add method was called')
  }

  ls() {
    this.tasks.forEach(task => {
      process.stdout.write(`${task.id}: ${task.task}`);
      process.stdout.write('\n')
    });
    this.emit('response', 'hshshh')
  }

  delete() {
    this.emit('response', 'Delete method was called')
  }
}


module.exports = (client) => new Server(client);