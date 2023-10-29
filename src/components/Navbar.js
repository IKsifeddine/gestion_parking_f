import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/addstat" className="navbar-link">
            Ajouter un stationnement
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/parkingsearch" className="navbar-link">
            Chercher un parking
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/mes_stationnements" className="navbar-link">
            Mes stationnements
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
