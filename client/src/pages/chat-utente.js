import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const ChatUtente = () => {
    return (
        <div className="chat">
            <Chat />
        </div>
    );
};

const checkAnnuncio = async (nome) => {
    try {
        const response = await axios.get(`${serverURL}/api/v1/annuncio`, {
            params: {
                nome: nome,
                fullmatch: true
            }
        });
    } catch (error) {
        if (error.response.status === 404) {
            window.location.replace('/vetrina');
        }
    };
}

const Chat = () => {

    let nomeAnnuncio = useParams();
    checkAnnuncio(nomeAnnuncio.id);

    return (
        <div className="chat-container">
            <ul class="chat-list">
                <li class="chat-item-him">{nomeAnnuncio.id}</li>
                <li class="chat-item-me">By this User, first message</li>
                <li class="chat-item-me">By this User, secondmessage</li>
                <li class="chat-item-me">By this User, third message</li>
                <li class="chat-item-me">By this User, fourth message</li>
            </ul>
            <div>
                <form>
                    <input type="text" id="chat-text" name="chat" />
                    <button id="chat-btn" type="submit">Invia messaggio</button>
                </form>
            </div>
        </div>
    );
};

/** 
Check annuncio esiste

Inserisci test mockup utente venditore

Get mittente dest X ann
Get dest mittente X ann
Unisci array e ordina decr

Form validate col messaggio da utente a venditore sull' idannuncio 
*/