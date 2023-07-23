const mongoose = require("mongoose");

const MessaggioSchema = new mongoose.Schema({
    mittente: { type: mongoose.Schema.Types.ObjectId, ref: "Utente", required: true },
    destinatario: { type: mongoose.Schema.Types.ObjectId, ref: "Utente", required: true },
    annuncio: { type: mongoose.Schema.Types.ObjectId, ref: "Annuncio", required: true },
    testo: { type: String, required: true },

}, {
    timestamps: true,
});

const messaggioModel = mongoose.model("Messaggio", MessaggioSchema, "Messaggio");

module.exports = messaggioModel;
