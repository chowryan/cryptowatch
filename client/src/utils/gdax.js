

const socket = require('socket.io-client')('wss://ws-feed.gdax.com');

const auth = {
  type: 'subscribe',
  product_ids: [
    'BTC-USD'
  ],
  signature: '',
  key: '',
  passphrase: '',
  timestamp: '',
};

socket.emit('subscribe', auth);
console.log(socket);
socket.on('connect', () => console.log(socket));
socket.on('event', (data) => console.log(data));
socket.on('disconnect', () => console.log('disconnected'));