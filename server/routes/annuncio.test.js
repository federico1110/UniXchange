const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const AnnuncioModel = require('../models/Annuncio');
const app = require('../index.js');


describe('GET /api/v1/annuncio', () => {

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
    { id: '646b612a6b246153cf41037d' },
    process.env.SECRET_KEY,
    { expiresIn: 86400 }
  );


  test('GET /api/v1/annuncio should respond with a 400 error', async () => {
    return request(app)
      .get('/api/v1/annuncio/get')
      .expect(400)
  });

  test('GET /api/v1/annuncio should respond with an array of annunci', async () => {
    return request(app)
      .get('/api/v1/annuncio/get?categoria=Telefonia')
      .expect(200)
  });

  test('GET /api/v1/annuncio should respond with a 404 error', async () => {
    return request(app)
      .get('/api/v1/annuncio/get?nome=unexisting')
      .expect(404)
  });

  test('POST /api/v1/annuncio should post an ad', async () => {
    return request(app)
      .post('/api/v1/annuncio/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        nome: "test1",
        descrizione: "test1",
        categoria: "Telefonia",
        prezzo: 1400,
        universita: "Università degli Studi di Trento",
        immagine: "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=",
        statoPreferiti: false,
        proprietario: "646b612a6b246153cf41037d",
        dataAnnuncio: "2023-05-17T13:43:24.483Z",
      })
      .expect(200)
  });

  test('DELETE /api/v1/annuncio should delete an ad', async () => {
    return request(app)
      .get('/api/v1/annuncio/get?nome=test1')
      .set('Accept', 'application/json')
      .then((res) => {
        return request(app)
          .delete('/api/v1/annuncio/delete')
          .set('x-access-token', token)
          .set('Accept', 'application/json')
          .send({
            annunci: [res.body[0]._id]
          })
          .expect(200);
      });

  });


});
