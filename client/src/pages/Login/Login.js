import React from "react";
import "./Login.css";

function Login (){
    return (
        <div classname="Login">
            <h1>Login</h1>
            <div className="LoginForm">
                <input type="text"/>
                <input type="password"/>
                <button onClick={Login}>Login</button>
            </div>   
        </div>
    );
}

export default Login;