import React, { useState } from "react";
import axios from "axios";

export const Vetrina = () => {
  const [annunci, setAnnunci] = useState([]);
  const [showAllAnnunci, setShowAllAnnunci] = useState(false);

  const searchAnnuncio = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/annuncio/get");
      setAnnunci(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowAllAnnunci = () => {
    setShowAllAnnunci(true);
    searchAnnuncio();
  };

  return (
    <div>
      <p>Qui puoi visualizzare tutti gli ultimi annunci</p>
      {!showAllAnnunci && (
        <button onClick={handleShowAllAnnunci}>Richiedi tutti gli annunci</button>
      )}
      <div>
        <h1>Annunci</h1>
        <ul>
          {annunci.map((annuncio) => (
            <li key={annuncio._id}>
              <div>
                <h2>{annuncio.nome}</h2>
              </div>
              <div className="instructions">
                <p>{annuncio.descrizione}</p>
              </div>
              <img src={annuncio.immagine} alt={annuncio.nome} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
