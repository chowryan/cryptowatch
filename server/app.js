const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
// const knex = require('knex')(require('../knexfile'));
const models = require('../db/models');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('app');
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

app.post('/', (req, res) => {
  res.status(201).send(req.body);
});

module.exports = app;