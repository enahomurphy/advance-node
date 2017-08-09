const string  = 'tablet';
const buffer = Buffer.from('tablet');

// console.log(string, string.length);
// console.log(buffer, buffer.length);

const buf1 = Buffer.allocUnsafe(26);

function printBuf(buf, allocated) {
  for(let i = 0; i < buf.length; i++) {
    buf[i] = i + 97;
  }
  return buf;
}

console.log(printBuf(buf1, 26).toString())

function middleware(req, res, next) {
  req.decoded = { message: 'test'};
  return next();
}

function controller(req, res) {
    console.log(req.decoded)
}
app.get('/books', middleware, controller)