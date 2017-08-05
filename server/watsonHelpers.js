const Promise = require('bluebird');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const config = require('../config/apiKeys.js');

// "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
const nlu = new NaturalLanguageUnderstandingV1({
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api',
  username: config.watson.WATSON_NLU_API_USERNAME,
  password: config.watson.WATSON_NLU_API_PASSWORD,
  version_date: '2017-02-27',
});

const analyzeSentiment = params => new Promise((resolve, reject) => {
  nlu.analyze(params, (err, response) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.stringify(response, null, 2));
    }
  });
});

module.exports.analyzeSentiment = analyzeSentiment;
