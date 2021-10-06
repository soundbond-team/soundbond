
import React from 'react';
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink,form } from "react-router-dom";

const Header = () => {
    return(
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink to="/" className="navbar-brand">SoundBond</NavLink>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <NavLink to="/accueil" className="nav-link">Accueil</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/activite" className="nav-link">Activité</NavLink>
              </li>
              <li>
                <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="Chercher" aria-label="Chercher"/>
                  <button class="btn btn-outline-success" type="submit">Chercher</button>
                </form>
              </li>
            </ul>
            
            <ul className="navbar-nav">
              <li className="navbar-item">
                <NavLink to="/" className="nav-link">Profil</NavLink>
              </li>
              </ul>
          </div>
        </nav>
    </div>
    )
}

export default Header;
