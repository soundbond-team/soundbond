import React /*, { useEffect, useState }*/ from "react";
import "./Navbar.css";

//import { Chat, Notifications, Person, Search } from "@material-ui/icons"
import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
function NavigationBar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <NavLink style={{ textDecoration: "none" }} exact to="/">
            Soundbond
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Subscribe</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* <div className="NavbarContainer">
            <div className="NavbarLeft">
                <span className="logo">SoundBond</span>
            </div>
            <div className="NavbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input placeholder="search for a friend or a post"
                        className="searchInput" />
                </div>
            </div>
            <div className="NavbarRight">


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
                        <div className="NavbarIcon">
                            <div className="NavbarIconItem">
                                <Person />
                                <span className="NavbarIconbadge">1</span>
                            </div>
                            <div className="NavbarIconItem">
                                <Chat />
                                <span className="NavbarIconbadge">1</span>
                            </div>
                            <div className="NavbarIconItem">
                                <Notifications />
                                <span className="NavbarIconbadge">1</span>
                            </div>
                            <img src="../../profil.jpg" alt=" " className="ProfilImg" />

                        </div>
                    </>


                }


            </div>


        </div>*/}
    </>
  );
}
export default NavigationBar;
