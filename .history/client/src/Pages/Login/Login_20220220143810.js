import React, { useState } from "react";

import axios from "axios";

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

  const google = ()=>{
    window.open("http://localhost:8080/api/v1/auth/google","_self");
  }

  /*const github = ()=>{
    window.open("http://localhost:8080//api/v1/auth/github","_self");
  }
*/
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

  
        <button onClick={google}>Google</button>
        <button >Github</button>

      </div>
    </>
  );
}

export default Login;
