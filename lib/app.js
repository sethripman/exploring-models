require('dotenv').config();
require('./utils/connect')();

const Champion = require('./models/Champion');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ champions: ['Demetrious Mighty Mouse Johnson', 'Jon Bones Jones', 'Stipe Miocic', 'The Last Emperor Fedor Emelianenko', 'Thug Rose Namajunas', 'Unsmoochable Pubert Winklebog'] });
});

module.exports = app;
