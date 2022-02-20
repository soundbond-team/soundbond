import React, { useState } from "react";
import firebase from 'firebase/app'
import 'firebase/auth'

import axios from "axios";
import { useNavigate } from "react-router";

const backServerURL = process.env.REACT_APP_BACK_SERVER_URL

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: backServerURL+`api/v1/user/login`,
      withCredentials: true,
      data: {
        username,
        password,
      },
    }).then((res) => {
      if (res.data === "") {
        console.log("mdp ou username incorrect");
        setErr("Mot de passe ou username incorrect");
      } else {
        window.location = "/";
      }
    });
  };

  //authentification avec google et github


  const google = () => {
    firebase.auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((userCre) => {
      console.log(userCre);
    });
  };

  const github = () => {
    firebase.auth()
    .signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then((userCre) => {
      console.log(userCre);
    });
  };

  return (
    <>
      <div className="container">
        <h1> Se connecter </h1>
        <form action="" onSubmit={handleLogin} id="sign-in">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <br />
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <br />
          <input type="submit" value="Se connecter" />
        </form>
        {err}
      </div>
        <button onClick={google}>Google</button>
        <button onClick={github}>Github</button>

    </>
  );
}

export default Login;
