import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("auth");
    };

    const alertAuth = () => {
        alert("Per aggiungere un annuncio devi effettuare l'accesso! \nVerrai reindirizzato alla pagina per la registrazione o login!");
    };

    return (<div className="navbar"> 
        <Link to="/"> Home </Link>
        {!cookies.access_token ? (<Link to="/auth" onClick={alertAuth}> Vetrina </Link>) : (<Link to="/vetrina"> Vetrina </Link>)}
        {!cookies.access_token ? (<Link to="/auth" onClick={alertAuth}> Aggiungi Annuncio </Link>) : (<Link to="/addAnnuncio"> Aggiungi Annuncio </Link>)}
        {!cookies.access_token ? (<Link to="/auth"> Login/Register </Link>) : (<Link to="/auth" onClick={logout}> Logout </Link>)}
    </div>
    );
}