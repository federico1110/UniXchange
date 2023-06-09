const request = require('supertest');
const express = require("express");
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');
const AnnuncioModel = require('../models/Annuncio');
const app = express();
// Assicurati di avere un'istanza di MongoDB in esecuzione o utilizza un database di test

describe('GET /api/v1/annuncio', () => {

  let connection;

  beforeAll(async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected!');
    //return connection; // Need to return the Promise db connection?
  });

  afterAll(() => {
    mongoose.connection.close(true);
    console.log("Database connection closed");
  });

  // create a valid token
  var token = jwt.sign(
    { id: '646b612a6b246153cf41037d' },
    process.env.SECRET_KEY,
    { expiresIn: 86400 }
  );


  test('GET /api/v1/annunci should respond with an array of annunci', async () => {
    return request(app)
      .get('/api/v1/annuncio/get')
      .expect(200)
  });

});
