const Twitter = require('twitter-node-client').Twitter;
const Keys = require('../../config/apiKeys').twitter;
const Promise = require('bluebird');
const watson = require('../watsonHelpers').analyzeSentiment;

const keys = {
  consumerKey: Keys.consumer_key,
  consumerSecret: Keys.consumer_secret,
  accessToken: Keys.access_token_key,
  accessTokenSecret: Keys.access_token_secret,
  callBackUrl: 'None',
};

const twitter = new Twitter(keys);

const getAll = (keyword, cb) => {

  let allTweets = [];

  const getTweets = (keyword, cb) => {
    twitter.getSearch({'q': keyword, 'count': 10}, error, success);
  }

  const error = (err, response, body) => {
    console.error('error: ', err);
  }

  const success = (data) => {

    let tweetString = '';
    let twitterObj = JSON.parse(data);

    // console.log('twitterObj is: ', twitterObj);

    if (twitterObj.statuses.length > 0) {
      twitterObj.statuses.map((item, index) => {
        let tweet = {
          id: item.id,
          text: item.text,
          created_at: item.created_at,
        }
        allTweets.push(tweet);
        tweetString += item.text;
        // console.log(`${index}:`,item.text);
      });
    }

    watson(tweetString)
    .then(response => {
      let sentimentData = JSON.parse(response)
      let emotions = {
        joy: 0,
        sadness: 0,
        fear: 0,
        disgust: 0,
        anger: 0,
      }
      let size = 0;

      sentimentData.keywords.map((item) => {
        if (item.emotion) {
          emotions.joy += item.emotion.joy,
          emotions.sadness += item.emotion.sadness,
          emotions.fear += item.emotion.fear,
          emotions.disgust += item.emotion.disgust,
          emotions.anger += item.emotion.anger
          size+=1;
        }
      });

      for (let key in emotions) {
        emotions[key] = emotions[key] / size;
      }
      cb(emotions, allTweets);
    })
    .catch(err => {
      console.error('err: ', err);
    });
  }

  const word = `#${keyword}`
  getTweets(word, cb);
}

module.exports = getAll;
