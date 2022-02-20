import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

import { Button } from "@material-ui/core";
import Icon from "./icon";

const backServerURL = process.env.REACT_APP_BACK_SERVER_URL;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameGoogle, setUsernameGoogle] = useState("");
  const [passwordGoogle, setPasswordGoogle] = useState("");
  const [statePass, setstatePass] = useState(false);
  const [err, setErr] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: backServerURL + `api/v1/user/login`,
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
  const handleLogin2 = async () => {
    console.log(usernameGoogle, passwordGoogle);
    console.log("ess");
    await axios({
      method: "post",
      url: backServerURL + `api/v1/user/login`,
      withCredentials: true,
      data: {
        username: usernameGoogle,
        password: passwordGoogle,
      },
    }).then((res) => {
      if (res.data === "") {
        console.log("etape 2" + res);
        console.log("mdp ou username incorrect");
        setErr("Mot de passe ou username incorrect");
      } else {
        console.log("etape 2" + res);
        window.location = "/";
      }
    });
  };
  const handleSignup = async (username_, password_) => {
    console.log(backServerURL + `api/v1/user/register`);
    console.log(process.env.REACT_APP_BACK_SERVER_URL);
    await axios({
      method: "post",
      url: backServerURL + `api/v1/user/register`,

      data: {
        username: username_,
        password: password_,
      },
    })
      .then((res) => {
        if (res.data.err) {
        } else {
          console.log("etape 1" + res);
          setstatePass(true);
        }
      })
      .catch((err) => {});
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(result.token);
    setUsernameGoogle(result.givenName);
    setPasswordGoogle(result.googleId);
  };
  useEffect(() => {
    if (passwordGoogle !== "" && usernameGoogle !== "") {
      console.log(usernameGoogle, passwordGoogle);
      handleSignup(usernameGoogle, passwordGoogle);
    } //eslint-disable-next-line
  }, [passwordGoogle]);
  useEffect(() => {
    if (statePass) {
      handleLogin2();
    } //eslint-disable-next-line
  }, [statePass]);

  const googleError = (res) => {
    console.log(res);
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
          <GoogleLogin
            clientId="504601928607-ku2iaokba00hkahjad5ikldnoect5s1j.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <input type="submit" value="Se connecter" />
        </form>
        {err}
      </div>
    </>
  );
}

export default Login;
