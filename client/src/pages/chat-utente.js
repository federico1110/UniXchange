import React, { useState, useEffect } from "react";
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

const Chat = () => {
    const [datiAnnuncio, setDatiAnnuncio] = useState([]);
    const [messaggio, setMessaggio] = useState("");

    let nomeAnnuncio = useParams();

    const checkAnnuncio = async (nome) => {
        try {
            const { data: response } = await axios.get(`${serverURL}/api/v1/annuncio`, {
                params: {
                    nome: nome,
                    fullmatch: true
                }
            })

            setDatiAnnuncio(response[0]);

        } catch (error) {
            if (error.response.status === 404) {
                window.location.replace('/vetrina');
            }
        };
    }

    useEffect(() => {
        checkAnnuncio(nomeAnnuncio.id);
    }, []);

    const inviaMessaggio = async (event) => {
        event.preventDefault();

        if (!messaggio.trim()) {
            alert("Scrivi un messaggio prima di inviarlo!");
            return;
        }

        if (messaggio.length > 300) {
            alert("Il messaggio è troppo lungo!");
            return;
        }

        const mittente = window.localStorage.getItem("userID");
        const destinatario = datiAnnuncio.proprietario;
        const annuncio = datiAnnuncio._id;

        try {

            axios.post(`${serverURL}/api/v1/messaggio`, {
                mittente: mittente,
                destinatario: destinatario,
                annuncio: annuncio,
                testo: messaggio
            });

            alert("Messaggio inviato!");

        } catch (error) {
            console.error(error);
            if (error.response.status === 400) {
                alert("Errore nell'invio del messaggio");
            }

        }
    };

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
                <form onSubmit={inviaMessaggio}>
                    <input type="text" id="chat-text" name="chat" onChange={(event) => setMessaggio(event.target.value)} />
                    <button id="chat-btn" type="submit">Invia messaggio</button>
                </form>
            </div>
        </div>
    );
};
