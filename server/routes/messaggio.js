const express = require("express");
const mongoose = require("mongoose");
const messaggioModel = require('../models/Messaggio');
const utenteModel = require('../models/Utente');
const annuncioModel = require('../models/Annuncio');

const messaggioRouter = express.Router();

messaggioRouter.get("/", async (req, res) => {
    const mittente = req.query.mittente;
    const destinatario = req.query.destinatario;
    const annuncio = req.query.annuncio;

    try {

        const mittente_temp = await utenteModel.findById(mittente);

        if (mittente_temp == null) {
            res.status(400);
            res.json({ message: "Mittente inesistente" });
            return
        }

        const destinatario_temp = await utenteModel.findById(destinatario);

        if (destinatario_temp == null) {
            res.status(400);
            res.json({ message: "Destinatario inesistente" });
            return
        }

        if (mittente == destinatario) {
            res.status(409);
            res.json({ message: "Il mittente non può essere il destinatario" });
            return
        }

        const annuncio_temp = await annuncioModel.findById(annuncio);

        if (annuncio_temp == null) {
            res.status(400);
            res.json({ message: "Annuncio inesistente" });
            return
        }

        const messaggio = await messaggioModel.find({ mittente: { $eq: mittente }, destinatario: { $eq: destinatario }, annuncio: { $eq: annuncio } }).exec();

        res.status(200);
        res.json(messaggio);

    } catch (err) {
        res.json(err);
    }
});

messaggioRouter.post("/", async (req, res) => {
    const mittente = req.body.mittente;
    const destinatario = req.body.destinatario;
    const annuncio = req.body.annuncio;
    const testo = req.body.testo;

    try {

        if (mittente == null || destinatario == null || annuncio == null || testo == null) {
            res.status(400);
            res.json({ message: "Messaggio non creato per mancanza parametro/i" });
            return
        }

        const messaggio = new messaggioModel(req.body);

        const response = await messaggio.save();
        res.json(messaggio);
    } catch (err) {
        res.json(err);
    }
});

messaggioRouter.delete("/", async (req, res) => {
    const mittente = req.body.mittente;
    const destinatario = req.body.destinatario;
    const annuncio = req.body.annuncio;
    const testo = req.body.testo;

    try {

        if (mittente == null || destinatario == null || annuncio == null || testo == null) {
            res.status(400);
            res.json({ message: "Messaggio non eliminato per mancanza parametro/i" });
            return
        }

        await messaggioModel.deleteOne({ mittente: { $eq: mittente }, destinatario: { $eq: destinatario }, annuncio: { $eq: annuncio }, testo: { $eq: testo } });

        res.json({ message: "Messaggio eliminato con successo" });
    } catch (error) {
        res.json(error);
    }
});

module.exports = messaggioRouter;
