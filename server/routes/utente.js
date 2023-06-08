const express = require("express");
const utenteModel = require('../models/Utente');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const utenteRouter = express.Router();

utenteRouter.get("/get", async (req, res) => {
    const _id = req.query._id;
    try{
        const utente = await utenteModel.findById(_id);
        
        console.log(utente)
        if (utente == null) { 
            return res.json({ message: "Utente non trovato" });
          }

        res.json(utente);

    } catch(err){
        res.json(err);
    }
});

utenteRouter.post("/register", async (req, res) => {
    const {username, password, nome, cognome, email} = req.body;
    const user = await utenteModel.findOne({username: username});

    if(user){
        return res.json({message: "Utente esiste di già"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new utenteModel({username: username, password: hashedPassword, nome: nome, cognome: cognome, email: email});
    await newUser.save();

    res.json({message: "Utente registrato correttamente"});
});

utenteRouter.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await utenteModel.findOne({username: username});

    if(!user){ 
        return res.json({message: "L'utente non esiste"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({message: "Username o password sono incorretti"})
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
    res.json({token: token, userID: user._id})


});


module.exports = utenteRouter;