import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
function NavigationBar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <NavLink style={{ textDecoration: "none" }} exact to="/" id="sel-button">
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
            <NavDropdown title="Users" id="collasible-nav-dropdown">
              <NavDropdown.Item>User 1</NavDropdown.Item>
              <NavDropdown.Item>User 2</NavDropdown.Item>
              <NavDropdown.Item>User 3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar;
