const Twitter = require('twitter-node-client').Twitter;
const Keys = require('../../config/apiKeys').twitter;
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
  const allTweets = [];

  const error = (err) => { console.error('error: ', err); };
  const success = (data) => {
    let tweetString = '';
    const twitterObj = JSON.parse(data);

    if (twitterObj.statuses.length > 0) {
      twitterObj.statuses.forEach((item) => {
        const tweet = {
          id: item.id,
          user: {
            name: item.user.name,
            screen_name: item.user.screen_name,
            profile_image_url: item.user.profile_image_url,
          },
          text: item.text,
          created_at: item.created_at,
          favorite_count: item.favorite_count,
          retweet_count: item.retweet_count,
          entities: {
            media: item.entities.media,
            urls: item.entities.url,
            user_mentions: item.entities.user_mentions,
            hashtags: item.entities.hashtags,
            symbols: item.entities.symbols,
          },
        };
        allTweets.push(tweet);
        tweetString += item.text;
      });
    }

    watson(tweetString)
    .then((response) => {
      const sentimentData = JSON.parse(response);
      const emotions = {
        joy: 0,
        sadness: 0,
        fear: 0,
        disgust: 0,
        anger: 0,
      };
      let size = 0;

      sentimentData.keywords.forEach((item) => {
        if (item.emotion) {
          emotions.joy += item.emotion.joy;
          emotions.sadness += item.emotion.sadness;
          emotions.fear += item.emotion.fear;
          emotions.disgust += item.emotion.disgust;
          emotions.anger += item.emotion.anger;
          size += 1;
        }
      });

      Object.keys(emotions).forEach((key) => {
        emotions[key] /= size;
      });
      cb(emotions, allTweets);
    })
    .catch((err) => {
      console.error('err: ', err);
    });
  };

  const getTweets = (kw) => {
    twitter.getSearch({ q: kw, count: 1000 }, error, success);
  };
  const word = `#${keyword}`;
  getTweets(word, cb);
};

module.exports = getAll;
