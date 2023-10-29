import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './parkingsearch.css';
import Navbar from './Navbar';

const ParkingSearch = () => {
  const [maxPrice, setMaxPrice] = useState('');
  const [parkings, setParkings] = useState([]);
  const [idType, setidType] = useState(1);

  const handleSearch = () => {
    // Effectuer une requête API à votre backend Laravel pour récupérer les parkings
    // avec des places libres et un prix maximum
    axios
      .get('http://127.0.0.1:8000/api/filtrerparking', {
        params: {
          maxPrice: maxPrice,
          idType: idType
        }
      })
      .then(response => {
        setParkings(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="parking-search-container">
        <h2>Recherche de Parkings</h2>
        <div className="search-form">
          <label htmlFor="maxPrice">Prix maximum :</label>
          <input
            type="text"
            id="maxPrice"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />
          <button onClick={handleSearch}>Rechercher</button>
        </div>
        <div className="results">
          <h3>Résultats :</h3>
          <ul className="parking-list">
            {parkings.map(parking => (
              <li key={parking.idPark}>
                <Link to={`/parking/${parking.idPark}`}>
                  <span>{parking.nomPark}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParkingSearch;
