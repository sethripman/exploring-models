const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
const Champion = require('./models/Champion');

const newChamp = {
  fullName: 'The Slapmaster, Biff Turkle',
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

  it('has a home get route', async(done) => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ champions: ['Demetrious Mighty Mouse Johnson', 'Jon Bones Jones', 'Stipe Miocic', 'The Last Emperor Fedor Emelianenko', 'Thug Rose Namajunas', 'Unsmoochable Pubert Winklebog'] });
        done();
      });
  });

  it('has a /champions post route', async(done) => {
    return request(app)
      .post('/champions')
      .send(newChamp)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          fullName: 'The Slapmaster, Biff Turkle',
          hometown: 'Woonsocket, RI',
          fightingStyle: 'wrestling',
          wins: 4,
          losses: 227,
          __v: 0
        });
      })
      .then(() => {
        done();
      });
  });

  it('has a /champions get route', () => {
    return request(app)
      .post('/champions')
      .send(newChamp)
      .then(() => {
        return request(app)
          .get('/champions');
      })
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          fullName: 'The Slapmaster, Biff Turkle',
          hometown: 'Woonsocket, RI',
          fightingStyle: 'wrestling',
          wins: 4,
          losses: 227,
          __v: 0
        }]);
      });
  });

  it('has a /champions get by ID route', async() => {
    const champion = await Champion.create(newChamp);

    return request(app)
      .get(`/champions/${champion._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: champion._id.toString(),
          fullName: 'The Slapmaster, Biff Turkle',
          hometown: 'Woonsocket, RI',
          fightingStyle: 'wrestling',
          wins: 4,
          losses: 227,
          __v: 0
        });
      });
  });

  it('has a /champions put route', async(done) => {
    return request(app)
      .post('/champions')
      .send(newChamp)
      .then(champion => {
        return request(app)
          .put(`/champions/${champion.body._id}`)
          .send({ fullName: 'Tickle-Me-Not Elmo Fudnupple' });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: `${res.body._id}`,
          fullName: 'Tickle-Me-Not Elmo Fudnupple',
          hometown: 'Woonsocket, RI',
          fightingStyle: 'wrestling',
          wins: 4,
          losses: 227,
          __v: 0
        });
      })
      .then(() => {
        done();
      });
  });

  it('has a /champions by ID delete route', () => {
    return request(app)
      .post('/champions')
      .send(newChamp)
      .then(champion => {
        return request(app)
          .delete(`/champions/${champion.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              fullName: 'The Slapmaster, Biff Turkle',
              hometown: 'Woonsocket, RI',
              fightingStyle: 'wrestling',
              wins: 4,
              losses: 227,
              __v: 0
            });
          });
      });
  });

});
