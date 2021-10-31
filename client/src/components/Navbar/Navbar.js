import React, { useContext } from "react";
import "./Navbar.css";

//import { Chat, Notifications, Person, Search } from "@material-ui/icons"

import Logout from "../Logout";

import { NavLink } from "react-router-dom";
import { UidContext } from "../Appcontext";
import { useSelector } from "react-redux";
function NavigationBar() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink
            activeStyle={{ style: "none" }}
            className="navbar-brand"
            exact
            to="/home"
            style={{ textDecoration: "none" }}
          >
            Soundbond
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/map"
                  style={{ textDecoration: "none" }}
                >
                  Map
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/profil"
                  style={{ textDecoration: "none" }}
                >
                  Profil
                </NavLink>
              </li>
            </ul>
            <form className="d-flex">
              {uid ? (
                <>
                  <p style={{ margin: "4px" }}> Bonjour {userData.username} </p>
                  <Logout />
                </>
              ) : (
                <>
                  {" "}
                  <NavLink
                    className="nav-link"
                    exact
                    to="/login"
                    style={{ textDecoration: "none" }}
                  >
                    Se connecter
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    exact
                    to="/register"
                    style={{ textDecoration: "none" }}
                  >
                    S'inscrire
                  </NavLink>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>

      {/* <div classNameName="NavbarContainer">
            <div classNameName="NavbarLeft">
                <span classNameName="logo">SoundBond</span>
            </div>
            <div classNameName="NavbarCenter">
                <div classNameName="searchbar">
                    <Search classNameName="searchIcon" />
                    <input placeholder="search for a friend or a post"
                        classNameName="searchInput" />
                </div>
            </div>
            <div classNameName="NavbarRight">


                {!loggedIn ?

                    <>

                        <a href="/register">Register</a>
                        <a href="/login">Login</a>
                    </>
                    :
                    <>
                        <a href="/home">Home</a>
                        <a href="/profil" > Profil </a>
                        <a href="/map">Map</a>
                        <div classNameName="NavbarIcon">
                            <div classNameName="NavbarIconItem">
                                <Person />
                                <span classNameName="NavbarIconbadge">1</span>
                            </div>
                            <div classNameName="NavbarIconItem">
                                <Chat />
                                <span classNameName="NavbarIconbadge">1</span>
                            </div>
                            <div classNameName="NavbarIconItem">
                                <Notifications />
                                <span classNameName="NavbarIconbadge">1</span>
                            </div>
                            <img src="../../profil.jpg" alt=" " classNameName="ProfilImg" />

                        </div>
                    </>


                }


            </div>


        </div>*/}
    </>
  );
}
export default NavigationBar;
