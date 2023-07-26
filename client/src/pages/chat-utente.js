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
    const [messaggioUtente, setMessaggioUtente] = useState([]);
    const [checkDone, setCheckDone] = useState(false);

    let nomeAnnuncio = useParams();

    const searchMessaggi = async () => {
        try {
            const mittente = window.localStorage.getItem("userID");
            const destinatario = datiAnnuncio.proprietario;
            const annuncio = datiAnnuncio._id;

            var temp_messaggi = [];

            await axios.get(`${serverURL}/api/v1/messaggio/`, {
                params: {
                    mittente: mittente,
                    destinatario: destinatario,
                    annuncio: annuncio,
                }
            }).then(res => {
                res.data.forEach(messaggio => {
                    const mess = {
                        _id: messaggio._id,
                        createdAt: new Date(messaggio.createdAt).getTime(),
                        testo: messaggio.testo,
                        utente: true
                    }
                    temp_messaggi.push(mess)
                });
            });

            await axios.get(`${serverURL}/api/v1/messaggio/`, {
                params: {
                    mittente: destinatario,
                    destinatario: mittente,
                    annuncio: annuncio,
                }
            }).then(res => {
                res.data.forEach(messaggio => {
                    const mess = {
                        _id: messaggio._id,
                        createdAt: new Date(messaggio.createdAt).getTime(),
                        testo: messaggio.testo,
                        utente: false
                    }
                    temp_messaggi.push(mess)
                });
            });

            temp_messaggi.sort((a, b) => a.createdAt - b.createdAt);
            console.log(temp_messaggi);
            setMessaggioUtente(temp_messaggi);

        } catch (error) {
            console.error(error);
        }
    };

    const checkAnnuncio = async (nome) => {
        try {
            const { data: response } = await axios.get(`${serverURL}/api/v1/annuncio`, {
                params: {
                    nome: nome,
                    fullmatch: true
                }
            })

            setDatiAnnuncio(response[0]);
            setCheckDone(true);

        } catch (error) {
            if (error.response.status === 404) {
                window.location.replace('/vetrina');
            }
        };
    }

    useEffect(() => {
        checkAnnuncio(nomeAnnuncio.id);
    }, []);

    useEffect(() => {
        if (checkDone) {
            searchMessaggi();
        }
    }, [checkDone]);


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

        if (mittente == destinatario) {
            alert("Non puoi inviare un messaggio a un tuo annuncio!");
            window.location.replace('/vetrina');
        }

        try {
            axios.post(`${serverURL}/api/v1/messaggio`, {
                mittente: mittente,
                destinatario: destinatario,
                annuncio: annuncio,
                testo: messaggio
            });

            alert("Messaggio inviato!");
            window.location.reload(true);

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
                {messaggioUtente.length === 0 ? (
                    <li class="chat-item-him">Contatta il venditore con un messaggio!</li>
                ) : (
                    <ul class="chat-list">
                        {messaggioUtente.map((messaggio) => (
                            <li class={(messaggio.utente ? "chat-item-me" : "chat-item-him")} key={messaggio._id}>{messaggio.testo}</li>
                        ))}
                    </ul>
                )}
            </ul>
            <div id="chat-button-box">
                <form onSubmit={inviaMessaggio}>
                    <input type="text" id="chat-text" name="chat" onChange={(event) => setMessaggio(event.target.value)} />
                    <button id="chat-btn" type="submit">Invia messaggio</button>
                </form>
            </div>
        </div>

    );
};
