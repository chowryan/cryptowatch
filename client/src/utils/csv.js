const csv = require('csv');
const numeral = require('numeral');

const parseCSV = readerResult => new Promise((resolve, reject) => {
  csv.parse(readerResult, (err, data) => {
    if (err) console.warn(err);
    const priceArray = data.map(tuple => ({ date: tuple[0], price: numeral(tuple[1]).value() }));
    if (priceArray[0].price === null) priceArray.shift();
    resolve(priceArray);
  });
});

module.exports = {
  parseCSV,
};
