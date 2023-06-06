import { useState, useEffect } from "react";
import universitaList from '../data/universita.json';

const serverURL = process.env.REACT_APP_SERVER_URL;

export const AddAnnuncio = () => {

  const [inputValues, setInputValues] = useState({
    nome: "",
    descrizione: "",
    categoria: "",
    prezzo: "",
    universita: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const [base64Image, setBase64Image] = useState("");

  function convertToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setBase64Image(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const body = {
    ...inputValues,
    immagine: base64Image,
    statoPreferiti: false,
    proprietario: window.localStorage.getItem("userID"),
    dataAnnuncio: new Date().toISOString(),
  };


  const sendData = async () => {
    const obbligatori = ["nome", "descrizione", "categoria", "prezzo"];

    if (obbligatori.some((campo) => inputValues[campo].length === 0) || body.immagine == "") {
      alert("Inserisci tutti i campi obbligatori");
      return;
    }

    try {
      const response = await fetch(`${serverURL}/api/v1/annuncio/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      alert("Il tuo annuncio è stato pubblicato");
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-annuncio">
      <h2> Aggiungi Annuncio</h2>
      <form>
        <div className="formAddAnnuncio">
          <label htmlFor="nome"> Nome </label>
          <input type="text" id="nome" name="nome" onChange={handleChange} />
        </div>
        <div className="formAddAnnuncio">
          <label htmlFor="descrizione"> Descrizione </label>
          <textarea id="descrizione" name="descrizione" onChange={handleChange} > </textarea>
        </div>
        <div className="formAddAnnuncio">
          <label htmlFor="categoria">Categoria</label>
          <select id="categoria" name="categoria" onChange={handleChange}>
            <option value="">Seleziona categoria</option>
            <option value="Computer">Computer</option>
            <option value="Telefonia">Telefonia</option>
            <option value="Libri">Libri</option>
            <option value="Accessori elettronici">Accessori elettronici</option>
            <option value="Altro">Altro</option>
          </select>
        </div>
        <div className="formAddAnnuncio">
          <label htmlFor="prezzo"> Prezzo </label>
          <input type="number" id="prezzo" name="prezzo" onChange={handleChange} />
        </div>

        <div className="formAddAnnuncio">
          <label htmlFor="universita">Università</label>
          <select id="universita" name="universita" value={inputValues.universita} onChange={handleChange}>
            <option value="">Seleziona università</option>
            {universitaList.records.map((universita) => (
              <option key={universita.COD_Ateneo} value={universita.NomeEsteso}>{universita[2]}</option>
            ))}
          </select>
        </div>

        <div className="formAddAnnuncio">
          <label htmlFor="immagine"> Immagine </label>
          <input type="file" id="immagine" name="immagine" onChange={convertToBase64} />
        </div>

        <button type="button" onClick={sendData}>Aggiungi annuncio</button>
      </form>
    </div>)
};

