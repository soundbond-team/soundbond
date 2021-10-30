import React, { useState } from "react";

import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8080/api/v1/user/login`,
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
    </>
  );
}

export default Login;
