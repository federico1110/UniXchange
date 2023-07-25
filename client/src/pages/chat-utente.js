import React from "react";
import { useParams } from "react-router-dom";

export const ChatUtente = () => {
    return (
        <div className="chat">
            <Chat />
        </div>
    );
};


const Chat = () => {

    let idAnnuncio = useParams();
    console.log(idAnnuncio);

    return (
        <div className="chat-container">
            <div class="chat-text">
                <ul class="chat-list">
                    <li class="chat-item-him">By Other User</li>
                    <li class="chat-item-me">By this User, first message</li>
                    <li class="chat-item-me">By this User, secondmessage</li>
                    <li class="chat-item-me">By this User, third message</li>
                    <li class="chat-item-me">By this User, fourth message</li>
                </ul>
            </div>
            <form>
                <button id="info-btn" type="submit">Invia messaggio</button>
            </form>
        </div>
    );
};


/*<ul>
 <li class="him">By Other User</li>
 <li class="me">By this User, first message</li>
 <li class="me">By this User, secondmessage</li>
 <li class="me">By this User, third message</li>
 <li class="me">By this User, fourth message</li>
</ul>*/


