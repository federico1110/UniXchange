const express = require("express");
const utenteModel = require('../models/Utente');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const utenteRouter = express.Router();

utenteRouter.get("/", async (req, res) => {
    const _id = req.query._id;
    try{
        const utente = await utenteModel.findById(_id);
        
        if (utente == null) { 
            res.status(404);
            res.json({ message: "Utente non trovato" });
            return 
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
        res.status(409);
        res.json({ message: "Utente esiste già" });
        return 
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
        res.status(404);
        res.json({message: "L'utente non esiste"});
        return 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        res.status(401);
        res.json({ message: "Username o password sono incorretti" });
        return 
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
    res.json({token: token, userID: user._id})


});

module.exports = utenteRouter;