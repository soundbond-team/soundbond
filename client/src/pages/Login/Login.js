import React ,{useState}from "react";
import Axios from "axios";
import "./Login.css";


function Login (){
    const [usernamelog, setUsernamelog] = useState("");
    const [passwordlog, setPasswordlog] = useState("");
    
    
    Axios.defaults.withCredentials = true;
    
    const login = () =>{
        Axios.post("http://localhost:8080/login", {
        username: usernamelog,
        password: passwordlog,
        }).then((response) => {
        console.log(response);
        });
    }
    
    
    return (
        <div classname="Login">
            <h1>Login</h1>
            <div className="LoginForm">
                <input type="text"
                placeholder="username..." 
                onChange={(e) => {
                    setUsernamelog(e.target.value);
                  }}/>
                <input type="password"
                placeholder="password..." 
                onChange={(e) => {
                    setPasswordlog(e.target.value);
                  }}/>
                <button onClick={login}>Login</button>
            </div>   
        </div>
    );
}

export default Login;