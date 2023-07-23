const express = require("express");
const mongoose = require("mongoose");
const messaggioModel = require('../models/Messaggio');

const messaggioRouter = express.Router();

messaggioRouter.get("/", async (req, res) => {
    const _id = req.query._id;
    try {
        const utente = await utenteModel.findById(_id);

        if (utente == null) {
            res.status(404);
            res.json({ message: "Messaggio non trovato" });
            return
        }

        res.json(utente);

    } catch (err) {
        res.json(err);
    }
});


messaggioRouter.post("/", async (req, res) => {
    const messaggio = new messaggioModel(req.body);
    try {
        const response = await messaggio.save();
        res.json(messaggio);
    } catch (err) {
        res.json(err);
    }
});

module.exports = messaggioRouter;