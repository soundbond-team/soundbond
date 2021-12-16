import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const backServerURL = process.env.REACT_APP_BACK_SERVER_URL;

function Logout() {
  const logout = async (e) => {
    e.preventDefault();
    await axios({
      method: "get",
      url: backServerURL + `api/v1/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookiejwt("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  const removeCookiejwt = (key) => {
    // eslint-disable-next-line
    if (window != "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  return (
    <>
      <span style={{ margin: "4px", cursor: "pointer" }} onClick={logout}>
        Deconnexion
      </span>
    </>
  );
}
export default Logout;
