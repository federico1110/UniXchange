const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const MessaggioModel = require('../models/Messaggio');
const app = require('../index.js');


describe('TESTING /api/v1/messaggio', () => {

  let connection;

  beforeAll(async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected!');

  });

  afterAll(() => {
    mongoose.connection.close(true);
    console.log("Database connection closed");
  });

  var token = jwt.sign(
    { id: '64bd332f17104915f0a72e7d' },
    process.env.SECRET_KEY,
    { expiresIn: 86400 }
  );

  test('POST /api/v1/messaggio should post a message', async () => {
    return request(app)
      .post('/api/v1/messaggio/')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        mittente: "64bd332f17104915f0a72e7d",
        destinatario: "64bd4e024f269412fdb45d94",
        annuncio: "6481a70ca378ef79e54920ef",
        testo: "Ciao, vorrei comprare il tuo prodotto.",
      })
      .expect(200)
  });


});
