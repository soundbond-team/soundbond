import React ,{useState}from "react";
import "./login.css";
import Axios from "axios";


import {useHistory} from 'react-router-dom';

function Login (){
    const [usernamelog, setUsernamelog] = useState("");
    const [passwordlog, setPasswordlog] = useState("");
    
    
    Axios.defaults.withCredentials = true;
    const[errorMessage,setErrorMessage] = useState(""); 
    let history = useHistory();

    const login = () =>{
        //console.log(usernamelog);
        Axios.post("http://localhost:8080/user/login", {
        username: usernamelog,
        password: passwordlog,
        }).then((response) => {
            
            if(response.data.loggedIn){
                localStorage.setItem("loggedIn",true);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("id_user",response.data.id_user);

                console.log("connected");
                history.push("/home");

            }
            else{
                setErrorMessage(response.data.message);
            }
        });
    };
    
    
    return (
        <div className="Login">
            <h1>Login</h1>
            <div className="LoginForm">
                <input 
                    type="text"
                    placeholder="username..." 
                    onChange={(e) => {
                        setUsernamelog(e.target.value);
                }}/>
                <input 
                    type="password"
                    placeholder="password..." 
                    onChange={(e) => {
                        setPasswordlog(e.target.value);
                
                }}/>
                <button onClick={login}>Login</button>
                <h1 style={{color : "red"}}>{errorMessage}</h1>
            </div>   
        </div>
    );
}

export default Login;