import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './Navbar';
import './ajoutestat.css'
function Addstat() {
  const [parking, setParking] = useState([]);
  const [type, setType] = useState([]);
  const [dateStat, setdateStat] = useState('');
  const idUtilisateur = 1;
  const [idPark, setidPark] = useState(1);
  const [idType, setidType] = useState(1);
  const [nbUnit, setnbUnit] = useState('');
  const [validation, setValidation] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/allparkings')
      .then(response => {
        setParking(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/alltypes')
      .then(response => {
        setType(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/AjouterStationnement", {
        dateStat,
        idUtilisateur,
        idPark,
        idType,
        nbUnit,
      });
      console.log(response.data);
      setValidation(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <h1>Ajout d'un stationnement</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="dateStat">Date :</label>
              <input type="date" id="dateStat" name="dateStat" value={dateStat} onChange={(e) => setdateStat(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="nbUnit">Nombre d'unité :</label>
              <input type="number" id="nbUnit" name="nbUnit" value={nbUnit} onChange={(e) => setnbUnit(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="parking">Parking :</label>
              <select id="parking" name="parking" value={idPark} onChange={(e) => setidPark(e.target.value)}>
                {parking.map((elem) => (
                  <option key={elem.idPark} value={elem.idPark}>{elem.nomPark}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="type">Type de paiement :</label>
              <select id="type" name="type" value={idType} onChange={(e) => setidType(e.target.value)}>
                {type.map((elem) => (
                  <option key={elem.idT} value={elem.idT}>{elem.nomType}</option>
                ))}
              </select>
            </div>
            {validation && <div className="success-message">{validation}</div>}
            <button type="submit">Ajouter Stationnement</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addstat;
