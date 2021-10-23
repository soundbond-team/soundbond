import axios from "axios";
require("dotenv").config();

export const GET_SOUND = "GET_SOUND";
export const POST_SOUND = "POST_SOUND";
export const GET_SOUND_ERRORS = "GET_SOUND_ERRORS";
//Envoie et recupere les données du dernier son posté
export const postsound = (id_soundlocation) => {
  console.log(id_soundlocation + "refe");
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/sound/`,
      data: {
        url: "url",
        size: 50,
        codec: "codec",
        startTime: 5,
        stopTime: 10,
        duration: 5,
        uploader_user_id: 1,
        soundlocation_id: id_soundlocation,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: POST_SOUND, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
