const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const getTweets = require('./api/twitter');

const { analyzeSentiment } = require('./watsonHelpers');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/dist')));
app.get('/searchTwitter', (req, res) => {
  // const searchText = req.body.text;
  const searchText = 'bitcoin';
  getTweets(searchText, (emotions, allTweets) => {
    console.log('emotions: ', emotions);
    console.log('allTweets: ', allTweets);
    let searchResult = {
      sentimentScore: emotions.joy * 4 - emotions.sadness - emotions.anger - emotions.disgust - emotions.fear,
      tweets: allTweets,
    }
    res.send(searchResult);
  })
 });

app.get('/watson', (req, res) => {
  const text = 'bitcoin good, ethereum bad';
  analyzeSentiment(text)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.post('/', (req, res) => {
  res.status(201).send(req.body);
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});


module.exports = app;
