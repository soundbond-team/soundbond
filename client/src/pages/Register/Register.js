import React, { useState } from "react";
import "./Register.css";


import Axios from 'axios'
function Register() {

    const[username, setUsername]=useState("");
    const[password, setPassword]=useState("");

    const register =()=>{
        Axios.post("http://localhost:3001/user/register",{
            username : username,
            password:password
        }).then((Response)=>
        {console.log(Response);
        });
    };
    return (
        <div className="Register">
            <h1>Registration</h1>
            <div className="RegisterForm">
                <input type="text" placeholder="username..." 
                onChange={(event)=>{setUsername(event.target.value);
                }}
                />
                <input type="password"
                placeholder="password..." 
                onChange={(event)=>{setPassword(event.target.value);
                }}
                />
                <button onClick={register}>Register</button>
            </div>
        </div>
    );
    
}
export default Register;
