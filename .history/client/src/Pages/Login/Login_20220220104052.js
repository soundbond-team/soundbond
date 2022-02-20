import React, { useState } from "react";
import {initializeAuth} from "../../firebase"
import axios from "axios";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";


initializeAuth();

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

  
  
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn =()=>{
    const auth = getAuth();

    signInWithPopup (auth,googleProvider)
  .then((result)=>{
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log(user);
  }).catch((error)=>{
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }
  //const githubProvider = new GithubAuthProvider();

  
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
        <button onClick={handleGoogleSignIn}>Google</button>
        <button >Github</button>

    </>
  );
}

export default Login;
