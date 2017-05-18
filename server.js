const http = require('http');
const app = require('./server/app');

const port = parseInt(process.env.PORT, 10) || 8080;
app.set('port', port);

require('./server/router')(app);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is running at localhost:${port}`);
});
