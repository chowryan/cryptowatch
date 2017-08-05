const Promise = require('bluebird');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const config = require('../config/apiKeys.js');

const nlu = new NaturalLanguageUnderstandingV1({
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api',
  username: config.watson.username,
  password: config.watson.password,
  version_date: '2017-02-27',
});

const analyzeSentiment = text => new Promise((resolve, reject) => {
  const params = {
    html: text,
    features: {
      keywords: { sentiment: true, emotion: true },
      emotion: {
        targets: ['bitcoin', 'ethereum', 'litecoin', 'cryptocurrency', 'crypto', 'market'],
      },
    },
  };

  nlu.analyze(params, (err, response) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.stringify(response, null, 2));
    }
  });
});

module.exports.analyzeSentiment = analyzeSentiment;
