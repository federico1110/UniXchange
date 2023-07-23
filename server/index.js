const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const annuncioRouter = require('./routes/annuncio');
const utenteRouter = require('./routes/utente');
const messaggioRouter = require("./routes/messaggio");
const dotenv = require('./node_modules/dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.DB_URL
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use("/api/v1/annuncio", annuncioRouter);
app.use("/api/v1/auth", utenteRouter);
app.use("/api/v1/messaggio", messaggioRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3001, () => console.log("SERVER STARTED"));
}

app.use((req, res) => {
  res.status(404);
  res.json({ error: "Not found" });
});

module.exports = app;



