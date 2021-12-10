import axios from "axios";
require("dotenv").config();

export const GET_SOUNDLOCATION = "GET_SOUNDLOCATION";
export const POST_SOUNDLOCATION = "POST_SOUNDLOCATION";
export const GET_SOUND_ERRORS = "GET_SOUND_ERRORS";

// Récupérer tous les SoundLocation
export const get_soundlocation = (location) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/soundlocation/getClosestPositions/`,
      params: { latitude: location.lat, longitude: location.lng },
    })
      .then((res) => {
        dispatch({ type: GET_SOUNDLOCATION, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Envoie et récupère les données du dernier SoundLocation posté
export const post_soundlocation = (props) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/soundlocation/`,
      data: { latitude: props.lat, longitude: props.lng },
    })
      .then((res) => {
        dispatch({ type: POST_SOUNDLOCATION, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};