import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './searchStat.css';

const ExpensePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expenses, setExpenses] = useState();
  const idutil = 1;
  const [montantTotal, setMontantTotal] = useState(0);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API call to retrieve expenses between the two dates using Axios
    axios
      .get(`http://127.0.0.1:8000/api/stationnement`, {
        params: {
          start_date: startDate,
          end_date: endDate,
          idUtil: idutil,
        },
      })
      .then((response) => {
        setExpenses(response.data);
        const total = response.data.reduce(
          (acc, expense) => acc + expense.montant,
          0
        );
        setMontantTotal(total);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="expense-page-container">
        <h2>Consultation des dépenses</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="start_date">Date de début :</label>
          <input
            type="date"
            format="yyyy-MM-dd"
            id="start_date"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />

          <label htmlFor="end_date">Date de fin :</label>
          <input
            type="date"
            format="yyyy-MM-dd"
            id="end_date"
            value={endDate}
            onChange={handleEndDateChange}
            required
          />

          <button type="submit">Consulter</button>
        </form>

        {expenses && (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Nom du parking</th>
                <th>Ville</th>
                <th>Prix</th>
                <th>Nombre d'unité</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.nomPark}</td>
                  <td>{expense.ville}</td>
                  <td>{expense.prix}</td>
                  <td>{expense.nbUnit}</td>
                  <td>{expense.montant}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>Total des montants :</td>
                <td>{montantTotal}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpensePage;
