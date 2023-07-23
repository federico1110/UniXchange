const mongoose = require("mongoose");

const AnnuncioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descrizione: { type: String, required: true },
    categoria: { type: String, required: true, enum: ["Computer", "Telefonia", "Libri", "Accessori elettronici", "Altro"] },
    universita: { type: String, required: true },
    prezzo: { type: Number, required: true },
    immagine: { type: String, required: true },
    statoPreferiti: { type: Boolean, required: true },
    proprietario: { type: mongoose.Schema.Types.ObjectId, ref: "Utente", required: true },
    dataAnnuncio: { type: Date, required: true },

})

const annuncioModel = mongoose.model("Annuncio", AnnuncioSchema, "Annuncio");

module.exports = annuncioModel;
