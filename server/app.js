const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const Promise = require('bluebird');
const { getAll, fetchTweets } = require('./api/twitter');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/retrieveCryptoMood/:source/:keyword', (req, res) => {
  if (req.params.source === 'twitter') {
    const searchText = req.params.keyword;
    getAll(searchText, (emotions, allTweets) => {
      const { joy, sadness, anger, disgust, fear } = emotions;
      const searchResult = {
        keyword: searchText,
        sentimentScore: (joy * 4) - sadness - anger - disgust - fear,
        tweets: allTweets,
      };
      res.send(searchResult);
    });
  } else if (req.params.source === 'reddit') {
    res.send({ error: 'currently unavailble' });
  } else { res.send({ error: 'invalid source' }); }
});

// app.post('/retrieveCryptoMoods', (req, res) => {

//   const searchTextArray = req.body.list;
//   let returnArray = [];
//   return Promise.each((searchTextArray, searchText) => {
//     return getAll(searchText)
//       .then((emotions) => {
//         const { joy, sadness, anger, disgust, fear } = emotions;
//         returnArray.push([searchText, null, (joy * 4) - sadness - anger - disgust - fear]);
//       })
//     .then((searchTextArray) => {
//       return Promise.resolve(res.send(returnArray));
//     })
//     .catch((err) => { console.log(err); })
//   });
// });


app.get('/fetchTweets', (req, res) => {
  return fetchTweets()
  .then((data) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});

app.post('/', (req, res) => {
  res.status(201).send(req.body);
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});


module.exports = app;
