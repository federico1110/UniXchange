import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const MieiAnnunci = () => {
  const [annunci, setAnnunci] = useState([]);
  const [showAnnunci, setShowAnnunci] = useState(false);
  const [selectedAnnunci, setSelectedAnnunci] = useState([]);

  const searchAnnuncio = async () => {
    try {
      const storedIdProp = window.localStorage.getItem("userID");
      if (storedIdProp) {
        const response = await axios.get(`${serverURL}/api/v1/annuncio/`, {
          params: {
            proprietario: storedIdProp
          }
        });
        setAnnunci(response.data);
        setShowAnnunci(true);
      } else {
        setShowAnnunci(false);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 404) {
        setAnnunci(null); 
      }
    }
  };

  useEffect(() => {
    searchAnnuncio();
  }, []);

  const handleSelectAnnuncio = (annuncioId) => {
    if (selectedAnnunci.includes(annuncioId)) {
      setSelectedAnnunci(selectedAnnunci.filter(id => id !== annuncioId));
    } else {
      setSelectedAnnunci([...selectedAnnunci, annuncioId]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.delete(`${serverURL}/api/v1/annuncio/`, {
        data: {
          annunci: selectedAnnunci
        }
      });
      searchAnnuncio();
      setSelectedAnnunci([]);
      alert(`Hai eliminato ${selectedAnnunci.length} annunci selezionati`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="vetrina-container">

      <h1 style={{ textAlign: "center" }}>Qui puoi visualizzare ed eliminare tutti i tuoi annunci pubblicati</h1>

      {showAnnunci && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Annunci:</h1>
            <button id="miei-annunci-btn" onClick={handleDeleteSelected}>Elimina annunci selezionati</button>
          </div>
          {Array.isArray(annunci) === false ? (
            <h2>Non hai ancora inserito nessun annuncio, fallo ora con la sezione Aggiungi Annuncio</h2>
          ) : (
            <ul>
              {annunci.map((annuncio) => (
                <li key={annuncio._id}>
                  <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <h2 style={{ marginTop: 0, marginBottom: 0}}>Titolo: {annuncio.nome}</h2>
                    <div style={{ marginLeft: "auto" }}>
                      <input
                        type="checkbox"
                        checked={selectedAnnunci.includes(annuncio._id)}
                        onChange={() => handleSelectAnnuncio(annuncio._id)}
                      />
                    </div>
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
                  <div style={{ display: "flex", justifyContent: "center" }}>
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