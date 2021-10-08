import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
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
            <NavLink
              to="/map"
              style={{ textDecoration: "none" }}
              activeClassName="selected"
            >
              Map
            </NavLink>

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
