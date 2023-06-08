import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState("");

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        setActiveMenu("");
        navigate("auth");
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
      };

    const alertAuth = () => {
        alert("Per aggiungere un annuncio devi effettuare l'accesso! \nVerrai reindirizzato alla pagina per la registrazione o login!");
    };

    return (<div className="navbar"> 
        <Link to="/" onClick={() => setActiveMenu("")}>
                <img src={process.env.PUBLIC_URL + "/logoUniXchange.png"} alt="Logo" />
        </Link>
        {!cookies.access_token ? (<Link to="/auth" onClick={alertAuth} > I miei annunci </Link>) : (<Link to="/mieiAnnunci" className={activeMenu === "mieiAnnunci" ? "active" : ""} onClick={() => handleMenuClick("mieiAnnunci")}> I miei annunci </Link>)}
        {!cookies.access_token ? (<Link to="/auth" onClick={alertAuth}> Vetrina </Link>) : (<Link to="/vetrina" className={activeMenu === "vetrina" ? "active" : ""} onClick={() => handleMenuClick("vetrina")}> Vetrina </Link>)}
        {!cookies.access_token ? (<Link to="/auth" onClick={alertAuth}> Aggiungi Annuncio </Link>) : (<Link to="/addAnnuncio" className={activeMenu === "addAnnuncio" ? "active" : ""} onClick={() => handleMenuClick("addAnnuncio")}> Aggiungi Annuncio </Link>)}
        {!cookies.access_token ? (<Link to="/auth"> Login/Register </Link>) : (<Link to="/auth" onClick={logout}> Logout </Link>)}
    </div>
    );
}