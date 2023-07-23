const mongoose = require("mongoose");
//const AnnuncioSchema = require('./Annuncio');

const utenteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    //ruolo: {type: String, required: true, enum: ["Utente autenticato", "Utente anonimo", "Moderatore"]},
    //statoAttivo: {type: Boolean, required: true},
    //annunciPreferiti: [{type: AnnuncioSchema}]
})

const utenteModel = mongoose.model("Utente", utenteSchema, "Utente");

module.exports = utenteModel;