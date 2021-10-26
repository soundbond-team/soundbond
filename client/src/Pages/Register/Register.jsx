import React, {useState } from "react";
import Axios from "axios";
import "./register.css";
import {useHistory} from 'react-router-dom';

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  
  Axios.defaults.withCredentials = true;
  let history = useHistory();

  const register = () => {
    console.log(usernameReg);
    Axios.post("http://localhost:8080/user/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
    history.push("/login");

  };


    return (
        <div className="Register">
            <h1>Registration</h1>
            <div className="RegisterForm">
                <label>Username</label>
                <input type="text" placeholder="username..." 
                 className="loginInput"
                 onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
                />
                <label>Password</label>
                <input type="password"
                placeholder="password..." 
                className="loginInput"
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}

                />
                <button onClick={register} >Register</button>
            </div>
        </div>
    );
    
}

