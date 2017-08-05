const Twitter = require('twitter-node-client').Twitter;
const Keys = require('../../config/apiKeys').twitter;
const Promise = require('bluebird');

const keys = {
  consumerKey: Keys.consumer_key,
  consumerSecret: Keys.consumer_secret,
  accessToken: Keys.access_token_key,
  accessTokenSecret: Keys.access_token_secret,
  callBackUrl: 'None',
};

const error = (err, response, body) => {
  console.error('error: ', err);
}

const success = (data) => {
  console.log('data: ', data);
}

const twitter = new Twitter(keys);

const getTweets = (req, res) => {
 twitter.getSearch({'q': '#bitcoin', 'count':1000}, error, success);
}

module.exports = getTweets;
