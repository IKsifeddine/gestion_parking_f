import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [adresseUtil, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://127.0.0.1:8000/api/login', { adresseUtil, pass })
      .then((response) => {
        // Succès de l'authentification, gérer la réponse

        // Stocker le jeton d'authentification dans le cookie ou le stockage local
        if (response.data.message === 'succes') {
          return navigate('/home');
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        // Échec de l'authentification, afficher l'erreur
        setError('Identifiants invalides');
        console.log(error.response.data);
      });
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={adresseUtil} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input type="password" value={pass} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
