const express = require("express");
const mongoose = require("mongoose");
const annuncioModel = require('../models/Annuncio');
const utenteModel = require('../models/Utente');
const { verifyToken } = require("./utente");

const annuncioRouter = express.Router();

annuncioRouter.get("/get", async (req, res) => {
    const nomeProdotto = req.query.nome;
    const categoria = req.query.categoria;
    const universita = req.query.universita;
    const idProp = req.query.proprietario;
    
    try {
      let query = {};
  
      if (nomeProdotto && categoria && universita) {
        query = { nome: nomeProdotto, categoria: categoria, universita: universita };
      } else {
        
        if (nomeProdotto) {
          query.nome = nomeProdotto;
        }
      
        if (universita) {
          query.universita = universita;
        }
      
        if (categoria) {
          query.categoria = categoria;
        }

        if (idProp) {
          query.proprietario = idProp;
        }
      
        if (Object.keys(query).length === 0) {
          return res.status(400).json({ message: "Nessun parametro fornito" });
        }
      }
  
      const annunci = await annuncioModel.find(query);
  
      if (annunci.length === 0) { 
        return res.status(404).json({ message: "Annuncio non esiste" });
      }
  
      res.json(annunci);
      
    } catch (err) {
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

annuncioRouter.delete("/delete", async (req, res) => {
  const { annunci } = req.body;

  try {
    await annuncioModel.deleteMany({ _id: { $in: annunci } });

    res.json({ message: "Annunci eliminati con successo" });
  } catch (error) {
    res.json(error);
  }
});


module.exports = annuncioRouter;