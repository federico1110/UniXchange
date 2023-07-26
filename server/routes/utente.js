const express = require("express");
const utenteModel = require('../models/Utente');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const utenteRouter = express.Router();

utenteRouter.get("/", async (req, res) => {
    const _id = req.query._id;
    try {
        const utente = await utenteModel.findById(_id);

        if (utente == null) {
            res.status(404);
            res.json({ message: "Utente non trovato" });
            return
        }

        res.json(utente);

    } catch (err) {
        res.json(err);
    }
});

utenteRouter.post("/register", async (req, res) => {
    const { username, password, nome, cognome, email } = req.body;
    const user = await utenteModel.findOne({ username: username });

    if (user) {
        res.status(409);
        res.json({ message: "Utente esiste già" });
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new utenteModel({ username: username, password: hashedPassword, nome: nome, cognome: cognome, email: email });
    await newUser.save();

    res.json({ message: "Utente registrato correttamente" });
});

utenteRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await utenteModel.findOne({ username: username });

    if (!user) {
        res.status(404);
        res.json({ message: "L'utente non esiste" });
        return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401);
        res.json({ message: "Username o password sono incorretti" });
        return
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.json({ token: token, userID: user._id })


});

utenteRouter.post("/modifica", async (req, res) => {
    const { username, password, nome, cognome, email, userID } = req.body;

    try {
        // Verifica se l'utente esiste nel database
        const user = await utenteModel.findById(userID);
        if (!user) {
            res.status(404);
            res.json({ message: "Utente non trovato" });
            return;
        }

        // Se i campi sono stati forniti nel corpo della richiesta, aggiorna i dati dell'utente
        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (nome) user.nome = nome;
        if (cognome) user.cognome = cognome;
        if (email) user.email = email;

        await user.save();

        res.json({ message: "Utente modificato correttamente" });
    } catch (error) {
        res.status(500);
        res.json({ message: "Errore durante la modifica dell'utente" });
    }
});


utenteRouter.delete("/deleteUser", async (req, res) => {
    const userID = req.body.userID;
    try {
      await utenteModel.deleteOne({ _id: userID });
    
    } catch (error) {
        res.json({ message: "utente" });
      res.json(error);
    }
  });

module.exports = utenteRouter;