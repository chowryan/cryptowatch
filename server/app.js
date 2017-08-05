const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
// const models = require('../db/models');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/dist')));
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send();
});

app.post('/', (req, res) => {
  res.status(201).send(req.body);
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});


module.exports = app;
