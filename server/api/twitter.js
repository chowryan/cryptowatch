const keys = require('../../config/apiKeys')

exports.tweetSearch = function(query, res) {
  const error = function(err, res, body) {
    console.log('ERROR in Twitter Fetch [%s]', err);
  };
  const success = function (data) {
    console.log('Fetch from Twitter Successful');
    var result = data;
    res.send('hello from twitter search')
  };

  const Twitter = require('twitter-node-client').Twitter;

  const config = {
    "consumerKey": keys.Twitter.consumerKey,
    "consumerSecret": keys.Twitter.consumerSecret,
    "accessToken": keys.Twitter.accessToken,
    "accessTokenSecret": keys.Twitter.accessSecret,
    "callBackUrl": 'None'
  }

  const twitter = new Twitter(config);

  twitter.getSearch({'q':'#haiku','count': 10}, error, success);
}
