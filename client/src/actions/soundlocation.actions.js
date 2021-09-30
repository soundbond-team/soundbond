import axios from "axios";
require("dotenv").config();

export const GET_SOUNDLOCATION = "GET_SOUNDLOCATION";

export const getsoundlocation = (location) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/soundlocation/getClosestPositions/`,
      params: { latitude: location.lat, longitude: location.lng },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_SOUNDLOCATION, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
