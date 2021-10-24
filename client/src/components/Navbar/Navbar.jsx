import React, { useEffect, useState } from "react"; 
import "./Navbar.css";
import { Chat, Notifications, Person, Search } from "@material-ui/icons"


function Navbar() {

    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(localStorage.getItem("loggedIn"))
    },[localStorage.getItem("loggedIn")])

    return (
        <div className="NavbarContainer">
            <div className ="NavbarLeft">
                <span className="logo">SoundBond</span>
            </div>
            <div className ="NavbarCenter">
                <div className ="searchbar">
                    <Search className ="searchIcon"/>
                        <input placeholder="search for a friend or a post" 
                        className="searchInput" />
                </div>
            </div>
            <div className ="NavbarRight">
                

                {loggedIn ? 
                
                <>

                    <a href ="/register">Register</a>
                    <a href ="/login">Login</a>
                </>
                 : 
                <>
                    <a href="/">Home</a>
                    <a href="/profil" > Profil </a>
                    <a href="/map">Map</a>
                    <div className="NavbarIcon">
                        <div className="NavbarIconItem">
                            <Person/>
                            <span className="NavbarIconbadge">1</span>
                        </div>
                        <div className="NavbarIconItem">
                            <Chat/>
                            <span className="NavbarIconbadge">1</span>
                        </div>
                        <div className="NavbarIconItem">
                            <Notifications/>
                            <span className="NavbarIconbadge">1</span>
                        </div>
                        <img src="../../profil.jpg" alt =" " className ="ProfilImg"/>

                    </div>
                </>
                
                
                }
               
            
            </div>
            
            
        </div> 
    );
}
export default Navbar;