const axios = require('axios');

/**
 * Normalize exchange data
 * @param {string} exchange
 * @param {array} bids [{quantity, price}]
 * @param {array} asks
 */

const formatData = (exchange, bids, asks) => {
  const bidVol = bids.reduce((a, b) => a + +b.quantity, 0);
  const bidQuantity = bids.length;
  let bidHigh;
  let bidLow;
  bids.forEach((bid) => {
    if (bidHigh === undefined) bidHigh = +bid.price;
    if (bidLow === undefined) bidLow = +bid.price;
    if (+bid.price < bidLow) bidLow = +bid.price;
    if (+bid.price > bidHigh) bidHigh = +bid.price;
  });

  const askVol = asks.reduce((a, b) => a + +b.quantity, 0);
  const askQuantity = asks.length;
  let askHigh;
  let askLow;
  asks.forEach((ask) => {
    if (askHigh === undefined) askHigh = +ask.price;
    if (askLow === undefined) askLow = +ask.price;
    if (+ask.price < askLow) askLow = +ask.price;
    if (+ask.price > askHigh) askHigh = +ask.price;
  });

  const result = {
    exchange,
    bidVol,
    bidQuantity,
    bidHigh,
    bidLow,
    askVol,
    askQuantity,
    askHigh,
    askLow,
  };

  return result;
};

const getGDAXData = (product) => new Promise((resolve, reject) => {
  axios.get(`https://api.gdax.com/products/${product}/book?level=2`)
    .then((response) => {
      const data = response.data;
      const exchange = 'GDAX';

      const bids = data.bids.map(bid => ({ quantity: bid[1], price: bid[0] }));
      const asks = data.asks.map(ask => ({ quantity: ask[1], price: ask[0] }));
      resolve(formatData(exchange, bids, asks));
    })
    .catch((error) => reject({ error }));
});

Promise.all([getGDAXData('BTC-USD'), getGDAXData('ETH-USD')])
  .then(console.log);

const getBithumbData = (req, res) => {
  request(`https://api.bithumb.com/public/orderbook/${req.params.product}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body).data;
      const exchange = 'Bithumb';

      const bids = data.bids;
      const asks = data.asks;

      res.end(JSON.stringify(formatData(exchange, bids, asks)));
    } else {
      console.warn('req.body: ', req.body);
      console.warn(error);
      res.end(error, body);
    }
  });
};

const getPoloniexData = (req, res) => {
  request(`https://poloniex.com/public?command=returnOrderBook&currencyPair=USDT_${req.params.product}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const exchange = 'Poloniex';

      const bids = data.bids.map(bid => ({ quantity: bid[1], price: bid[0] }));
      const asks = data.asks.map(ask => ({ quantity: ask[1], price: ask[0] }));

      res.end(JSON.stringify(formatData(exchange, bids, asks)));
    } else {
      console.warn('req.body: ', req.body);
      console.warn(error);
      res.end(error, body);
    }
  });
};

const getCoinoneData = (req, res) => {
  request(`https://api.coinone.co.kr/orderbook/?currency=${req.params.product}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const exchange = 'Coinone';

      const bids = data.bid.map(bid => ({ quantity: bid.qty, price: bid.price }));
      const asks = data.ask.map(ask => ({ quantity: ask.qty, price: ask.price }));

      res.end(JSON.stringify(formatData(exchange, bids, asks)));
    } else {
      console.warn('req.body: ', req.body);
      console.warn(error);
      res.end(error, body);
    }
  });
};

module.exports = {
  getBithumbData,
  getGDAXData,
  getPoloniexData,
  getCoinoneData,
};
