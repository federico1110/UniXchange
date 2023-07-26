import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export const HomePage = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const modProf = async () => {
        navigate("/mod-Prof");
    }

    return (
        <div>
            {!cookies.access_token ? (
                <><br /><br />
                    <h1> Benvenuto su UniXchange! </h1>
                    <h2> Questo portale è specializzato nella compra-vendita di oggetti in ambito universitario!</h2>
                    <h2> Inizia la tua avventura cliccando sulla sezione Login/Register per poter iniziare a vendere e comprare</h2></>

            ) : (
                <div id="homep">
                <button id="modProf" onClick={modProf}>Modifica profilo</button>
                </div>
            )}
        </div>
    );
}
