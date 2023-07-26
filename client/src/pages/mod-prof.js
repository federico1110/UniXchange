import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const ModificaProf = () => {
    const navigate = useNavigate();

    const [_, setCookies] = useCookies(["access_token"]);
    const [activeMenu, setActiveMenu] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [email, setEmail] = useState("");
    const [userID, setuserID] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            await axios.post(`${serverURL}/api/v1/auth/modifica`, { 
                username,
                password,
                nome,
                cognome,
                email, 
                userID:window.localStorage.getItem("userID") });


            window.localStorage.removeItem("userID")
            setCookies("access_token", "");
            setActiveMenu("");
            navigate("/")
        } catch (error) {
            console.error(error);


        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Modifica profilo</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cognome">Cognome:</label>
                    <input
                        type="text"
                        id="cognome"
                        value={cognome}
                        onChange={(event) => setCognome(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};