

const WebSocket = require('ws');
const ws = new WebSocket('wss://ws-feed.gdax.com');

const req = {
  type: 'subscribe',
  product_ids: [
    'BTC-USD',
    'ETH-USD',
  ],
};

ws.on('open', () => {
  console.log('OPEN');
  ws.send(JSON.stringify(req));
});

ws.on('message', (message) => {
    console.log('received: %s', message);
});
