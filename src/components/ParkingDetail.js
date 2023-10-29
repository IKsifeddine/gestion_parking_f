import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './parkingDetail.css';

const ParkingDetail = () => {
  const { id } = useParams();
  const [data, setdata] = useState(null);

  useEffect(() => {
    // Effectuer une requête API à votre backend Laravel pour récupérer les détails du parking
    axios
      .get(`http://127.0.0.1:8000/api/parking/${id}`)
      .then(response => {
        setdata(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!data) {
    return <div className="loading">Chargement...</div>;
  }

  const tarifs = data.tarifs;

  return (
    <>
      <Navbar />
      <div className="parking-detail-container">
        <h2>{data.parking.nomPark}</h2>
        <p>Ville : {data.parking.ville}</p>
        <p>Nombre de places libres : {data.parking.nbPlaceLibre}</p>
        <p>prix par carte : {tarifs[0].prix}</p>
        <p>prix par espèce : {tarifs[1].prix}</p>
      </div>
    </>
  );
};

export default ParkingDetail;
