const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  hometown: {
    type: String,
    required: true
  },
  fightingStyle: {
    type: String,
    enum: ['boxing', 'wrestling', 'karate', 'thugjitsu', 'sambo', 'muay thai'],
    required: true
  },
  wins: {
    type: Number,
  },
  losses: {
    type: Number,
  }
});

module.exports = mongoose.model('Champion', schema);
