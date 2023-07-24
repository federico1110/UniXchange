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

  test('POST /api/v1/messaggio should post a message', async () => {
    return request(app)
      .post('/api/v1/messaggio')
      .set('Accept', 'application/json')
      .send({
        mittente: "64bd332f17104915f0a72e7d",
        destinatario: "6481a687a378ef79e54920eb",
        annuncio: "6481a70ca378ef79e54920ef",
        testo: "Ciao, sarei interessato ad acquistare il tuo prodotto.",
      })
      .expect(200)
  });

  test('POST /api/v1/messaggio should not post a messaggio due to missing parameters ', async () => {
    return request(app)
      .post('/api/v1/messaggio')
      .set('Accept', 'application/json')
      .send({
        mittente: "64807cb9d53cfd5389420d13",
        destinatario: "6481a687a378ef79e54920eb",
      })
      .expect(400)
  });

  test('GET /api/v1/messaggio should respond with a 400 error - idMittente inesistente', async () => {
    return request(app)
      .get('/api/v1/messaggio?mittente=000000000000000000000000')
      .expect(400)
  });

  test('GET /api/v1/messaggio should respond with a 400 error - idDestinatario inesistente', async () => {
    return request(app)
      .get('/api/v1/messaggio?mittente=64bd332f17104915f0a72e7d&destinatario=000000000000000000000000')
      .expect(400)
  });

  test('GET /api/v1/messaggio should respond with a 400 error - idAnnuncio inesistente', async () => {
    return request(app)
      .get('/api/v1/messaggio?mittente=64bd332f17104915f0a72e7d&destinatario=6481a687a378ef79e54920eb&annuncio=000000000000000000000000')
      .expect(400)
  });

  test('GET /api/v1/messaggio should respond with a 400 error - nessun parametro fornito', async () => {
    return request(app)
      .get('/api/v1/messaggio/')
      .expect(400)
  });

  test('GET /api/v1/messaggio should respond with a 409 error - mittente == destinatario', async () => {
    return request(app)
      .get('/api/v1/messaggio?mittente=6481a687a378ef79e54920eb&destinatario=6481a687a378ef79e54920eb')
      .expect(409)
  });

  test('GET /api/v1/messaggio should receive all messages from mittente to destinatario on an annuncio', async () => {
    return request(app)
      .get('/api/v1/messaggio?mittente=64bd332f17104915f0a72e7d&destinatario=6481a687a378ef79e54920eb&annuncio=6481a70ca378ef79e54920ef')
      .expect(200)
  });

  test('DELETE /api/v1/messaggio should delete a messaggio', async () => {
    return request(app)
      .get('/api/v1/messaggio?mittente=64bd332f17104915f0a72e7d&destinatario=6481a687a378ef79e54920eb&annuncio=6481a70ca378ef79e54920ef')
      .set('Accept', 'application/json')
      .then((res) => {
        return request(app)
          .delete('/api/v1/messaggio')
          .set('Accept', 'application/json')
          .send({
            mittente: "64bd332f17104915f0a72e7d",
            destinatario: "6481a687a378ef79e54920eb",
            annuncio: "6481a70ca378ef79e54920ef",
            testo: "Ciao, sarei interessato ad acquistare il tuo prodotto.",
          })
          .expect(200);
      });

  });

  test('DELETE /api/v1/messaggio should not delete a messaggio for missing parameter', async () => {
    return request(app)
      .get('/api/v1/messaggio')
      .set('Accept', 'application/json')
      .then((res) => {
        return request(app)
          .delete('/api/v1/messaggio')
          .set('Accept', 'application/json')
          .send({
            mittente: "64bd332f17104915f0a72e7d",
            destinatario: "6481a687a378ef79e54920eb",
            annuncio: "6481a70ca378ef79e54920ef",
          })
          .expect(400);
      });

  });

  test('DELETE /api/v1/messaggio should not delete a messaggio for missing parameters', async () => {
    return request(app)
      .get('/api/v1/messaggio')
      .set('Accept', 'application/json')
      .then((res) => {
        return request(app)
          .delete('/api/v1/messaggio')
          .set('Accept', 'application/json')
          .expect(400);
      });

  });

});
