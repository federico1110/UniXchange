const request = require('supertest');
const mongoose = require('mongoose');
const UtenteModel = require('../models/Utente');
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

    test('GET /api/v1/auth should respond with an user', async () => {
        return request(app)
            .get('/api/v1/auth/get?_id=646b612a6b246153cf41037d')
            .expect(200)
    });

    test('GET /api/v1/auth should respond with a 404 error', async () => {
        return request(app)
            .get('/api/v1/auth/get?_id=000000000000000000000000')
            .expect(404)
    });

    test('POST /api/v1/auth should register an user', async () => {
        return request(app)
            .post('/api/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                username: "Utente1",
                nome: "ut",
                cognome: "ente",
                email: "user@mail.com",
                password: "pass",
            })
            .expect(200)
    });

    test('POST /api/v1/auth shouldnt register an existing user', async () => {
        return request(app)
            .post('/api/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                username: "Utente1",
                nome: "ut",
                cognome: "ente",
                email: "user@mail.com",
                password: "pass",
            })
            .expect(409)
    });

    test('POST /api/v1/login should log in  an existing user', async () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                username: "Utente1",
                password: "pass",
            })
            .expect(200)
    });

    test('POST /api/v1/login shouldnt log in a non existing user', async () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                username: "Utente0",
                password: "pass",
            })
            .expect(404)
    });

    test('POST /api/v1/login shouldnt log in with a wrong passwords', async () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                username: "Utente1",
                password: "wrong",
            })
            .expect(401)
    });

});
