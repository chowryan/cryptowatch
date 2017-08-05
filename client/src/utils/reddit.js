const axios = require('axios');

const getRedditPosts = (subreddit = 'bitcoin', sortBy = 'hot', count = 0, limit = 100) => {
  const redditURL = `https://www.reddit.com/r/${subreddit}/${sortBy}/.json?count=${count}&limit=${limit}`;
  return axios.get(redditURL)
  .then((res) => {
    const redditPosts = res.data.data.children;
    const data = redditPosts.map((redditPost) => {
      let image = null;
      if (redditPost.data.preview) {
        image = redditPost.data.preview.images[0].source.url;
      }
      return {
        title: redditPost.data.title,
        image,
        url: redditPost.data.url,
      };
    });
    return {data, error: null};
  })
  .catch((error) => {
    console.log('getRedditPosts error: ', error);
    return { data: null, error };
  });
};

getRedditPosts();

module.exports.getRedditPosts = getRedditPosts;