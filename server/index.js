const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('cryptowatch listening on port 5000');
});

const io = require('socket.io').listen(server);

io.on('connect', (client) => {
  console.log('server side socket connected!');
  // require('./api/twitter.js')(io, client);

});