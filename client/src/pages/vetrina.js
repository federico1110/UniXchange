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
  const [sortOrder, setSortOrder] = useState("asc");

  const addEmail = (id) => {
    return axios
      .get(`${serverURL}/api/v1/auth/`, {
        params: {
          _id: id
        }
      })
      .then((response) => response.data.email)
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  const searchAnnuncio = async () => {

    try {
      const response = await axios.get(`${serverURL}/api/v1/annuncio/`, {
        params: {
          nome: nomeProdotto,
          categoria: categoria,
          universita: universita
        }

      });

      const updatedAnnunci = await Promise.all(
        response.data.map(async (annuncio) => {
          const email = await addEmail(annuncio.proprietario);
          annuncio.email = email;
          return annuncio;
        })
      );

      setAnnunci(updatedAnnunci);
      setShowAnnunci(true);


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

  const handleSortAnnunci = () => {
    const sorted = [...annunci].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.prezzo - b.prezzo;
      } else {
        return b.prezzo - a.prezzo;
      }
    });

    setAnnunci(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
          <label> &nbsp; </label>
          <button onClick={handleShowAllAnnunci}>Ricerca</button>
        </div>

      </div>
      <h1 style={{ textAlign: "center" }}>Qui puoi visualizzare gli annunci della tua ricerca</h1>

      {showAnnunci && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1> &nbsp; Annunci:</h1>
            <button id="sorted-btn" onClick={handleSortAnnunci}>
              Ordina per prezzo {sortOrder === "asc" ? "crescente" : "decrescente"}
            </button>
          </div>
          {Array.isArray(annunci) === false ? (
            <h2> &nbsp; Nessun annuncio corrispondente alla ricerca</h2>
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
                    <h3>Email: {annuncio.email} </h3>
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