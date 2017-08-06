const csv = require('csv');

const parseCSV = readerResult => new Promise((resolve, reject) => {
  csv.parse(readerResult, (err, data) => {
    if (err) console.warn(err);
    const priceArray = data.map(tuple => ({ date: tuple[0], price: tuple[1] }));
    if (priceArray[0].price === 'Price') priceArray.shift();
    resolve(priceArray);
  });
});

module.exports = {
  parseCSV,
};
