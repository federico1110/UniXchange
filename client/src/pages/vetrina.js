import React, { useState } from "react";
import axios from "axios";
import universitaList from '../data/universita.json';

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const Vetrina = () => {
  const [nomeProdotto, setNomeProdotto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [universita, setUniversita] = useState("");
  const [annunci, setAnnunci] = useState([]);
  const [showAnnunci, setShowAnnunci] = useState(false);

  const searchAnnuncio = async () => {

    try {
      const response = await axios.get(`${serverURL}/api/v1/annuncio/get`, {
        params: {
          nome: nomeProdotto,
          categoria: categoria,
          universita: universita
        }

      });

      setAnnunci(response.data);
      setShowAnnunci(true);
      console.log("1" + response.data);

    } catch (error) {
      console.error(error);
      if (error.response.status === 404) {
        setAnnunci(null);
        setShowAnnunci(true);
      }
    }
  };

  const handleShowAllAnnunci = () => {
    if (nomeProdotto.trim() === "" && categoria.trim() === "" && universita.trim() === "") {
      alert("Inserisci un nome prodotto oppure seleziona una categoria oppure inserisci università");
      return;
    }

    searchAnnuncio();
  };

  return (
    <div className="vetrina-container">
      <div id="input-form-container">
        <div className="input-form">
          <label> Nome prodotto: </label>
          <input
            type="text"
            id="nome-prodotto"
            value={nomeProdotto}
            onChange={(event) => setNomeProdotto(event.target.value)}
          />
        </div>

        <div className="input-form">
          <label> Quale categoria? </label>
          <select id="categoria" value={categoria} onChange={(event) => setCategoria(event.target.value)}>
            <option value="">Seleziona categoria</option>
            <option value="Computer">Computer</option>
            <option value="Telefonia">Telefonia</option>
            <option value="Libri">Libri</option>
            <option value="Accessori elettronici">Accessori elettronici</option>
            <option value="Altro">Altro</option>
          </select>
        </div>

        <div className="input-form">
          <label htmlFor="universita">Università</label>
          <select id="universita" value={universita} onChange={(event) => setUniversita(event.target.value)}>
            <option value="">Seleziona università</option>
            {universitaList.records.map((universita) => (
              <option key={universita.COD_Ateneo} value={universita.NomeEsteso}>{universita[2]}</option>
            ))}
          </select>
        </div>

        <div className="input-form">
          <button onClick={handleShowAllAnnunci}>Ricerca</button>
        </div>

      </div>
      <h1>Qui puoi visualizzare gli annunci della tua ricerca</h1>

      {showAnnunci && (
        <div>
          <h1>Annunci:</h1>
          {Array.isArray(annunci) === false ? (
            <h2>Nessun annuncio corrispondente alla ricerca</h2>
          ) : (
            <ul>
              {annunci.map((annuncio) => (
                <li key={annuncio._id}>
                  <div>
                    <h2>Titolo: {annuncio.nome}</h2>
                  </div>
                  <div>
                    <h3>Prezzo: {annuncio.prezzo} €</h3>
                  </div>
                  <div>
                    <h3>Università: {annuncio.universita} </h3>
                  </div>
                  <div>
                    <h3>Descrizione: {annuncio.descrizione}</h3>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div id="img-container">
                      <img src={annuncio.immagine} alt={annuncio.nome} />
                    </div>
                  </div>


                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};