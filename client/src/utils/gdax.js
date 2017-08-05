const orderbookSync = new Gdax.OrderbookSync(['BTC-USD', 'ETH-USD']);
console.log(orderbookSync.books['ETH-USD'].state());
