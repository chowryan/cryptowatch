const axios = require('axios');

const getRedditPosts = (subreddit = 'bitcoin', sortBy = 'hot', count = 0, limit = 10) => {
  const redditURL = `https://www.reddit.com/r/${subreddit}/${sortBy}/.json?count=${count}&limit=${limit}`;
  return axios.get(redditURL)
  .then((res) => {
    const data = res.data.data.children;
    console.log(data, data.length);
    return { data, error: null };
  })
  .catch((error) => {
    console.log('getRedditPosts error: ', error);
    return { data: null, error };
  });
};

getRedditPosts();

module.exports.getRedditPosts = getRedditPosts;