const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client) {
    super(client)
    this.tasks = [];
    this.id = 1
    client.on('command', (command, args) => {
      switch(command) {
        case 'help':
          this.help();
          break
        case 'add':
          this.add(args);
          break
        case 'ls':
          this.ls();
          break
        case 'delete':
          this.delete(args);
          break
        case 'get':
          this.get(args);
          break
        default: 
          this.emit('response', 'unknown command....');
      }
    });
  }

  help() {
    process.stdout.write('ls: List all tasks \n')
    process.stdout.write('add: Add a new task \n')
    process.stdout.write('delete: Delete a task \n')
    process.stdout.write('Get: Get a task \n')
    process.stdout.write('help: List all available commands \n')
    this.emit('response', 'Help method was called')
  }

  add(task) {
    this.tasks.push({ id: this.id, task  });
    this.id++
    this.emit('response', 'Item added')
  }

  ls() {
    this.emit('response', 'List of all tasks')
    this.tasks.forEach(task => {
      this.writer(task);
    });
  }

  delete(id) {
    this.emit('response', 'Delete method was called');
    if (!isNaN(id)) {
      this.tasks = this.tasks.filter(task => task.id !== parseInt(id));
      console.log(this.tasks);
    }
  }

  get(id) {
    this.tasks.forEach(task => {
      if (!isNaN(id) && task.id === parseInt(id)) {
        this.writer(task)
        return 
      }
    })
  }
  writer(task) {
    process.stdout.write(`${task.id}: ${task.task}`);
    process.stdout.write('\n');
  }
}


module.exports = (client) => new Server(client);