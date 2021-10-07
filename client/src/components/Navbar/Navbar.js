import React from "react"; 
import "./Navbar.css";


function Navbar() {


    return (
    <div className ="Navbar">
            <a href="/">Home</a>
            <a href ="/Register">Register</a>
            <a href ="/Login">Login</a>
            <a href="/Map">Map</a>
         </div>
    );
}
export default Navbar;