const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
const Champion = require('./models/Champion');

const newChamp = {
  name: 'The Slapmaster, Biff Turkle',
  hometown: 'Woonsocket, RI',
  fightingStyle: 'wrestling',
  wins: 4,
  losses: 227
};

describe('app routes', () => {

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('has a home get route', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ champions: ['Demetrious Mighty Mouse Johnson', 'Jon Bones Jones', 'Stipe Miocic', 'The Last Emperor Fedor Emelianenko', 'Thug Rose Namajunas', 'Unsmoochable Pubert Winklebog'] });
      });
  });
});
