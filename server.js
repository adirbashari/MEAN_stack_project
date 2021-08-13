const http = require('http');
const port= process.env.Potrt || 3000;

const server=http.createServer((req, res)=> {
  res.end('Hello World!');
});
server.listen(port);
