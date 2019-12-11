require('dotenv').config();
require('./utils/connect')();

const Champion = require('./models/Champion');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ champions: ['Demetrious Mighty Mouse Johnson', 'Jon Bones Jones', 'Stipe Miocic', 'The Last Emperor Fedor Emelianenko', 'Thug Rose Namajunas', 'Unsmoochable Pubert Winklebog'] });
});

app.get('/champions', (req, res) => {
  Champion.find()
    .then(response => {
      res.send(response);
    });
});
  
app.get('/champions/:id', (req, res) => {
  Champion.findById(req.params.id)
    .then(response => res.send(response));
});
  
app.post('/champions', (req, res) => {
  Champion.create(req.body)
    .then(champion => {
      res.send(champion);
    });
});
  
app.put('/champions/:id', (req, res) => {
  Champion.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedItem => {
      res.send(updatedItem);
    });
});
  
app.delete('/champions/:id', (req, res) => {
  Champion.findByIdAndDelete(req.params.id)
    .then(deletedItem => {
      res.send(deletedItem);
    });
});

module.exports = app;
