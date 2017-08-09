const { createWriteStream } = require('fs');

const file = createWriteStream('./big.file');


for(let i = 0; i < 2e6; i++) {
  file.write('Lorem ispum dolor sit args is nit grat');
}

file.end();