const express = require("express");
const mongoose = require("mongoose");
const annuncioModel = require('../models/Annuncio');
const utenteModel = require('../models/Utente');
const { verifyToken } = require("./utente");

const annuncioRouter = express.Router();

annuncioRouter.get("/get", async (req, res) => {
    try{
        const annuncio = await annuncioModel.find({});
        res.json(annuncio);
    } catch(err){
        res.json(err);
    }
});

annuncioRouter.post("/add", async (req, res) => {
    const annuncio = new annuncioModel(req.body);
    try{
        const response = await annuncio.save();
        res.json(annuncio);
    } catch(err){
        res.json(err);
    }
});




module.exports = annuncioRouter;