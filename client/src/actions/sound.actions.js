import axios from "axios";
require("dotenv").config();

export const GET_SOUND = "GET_SOUND";
export const POST_SOUND = "POST_SOUND";
export const GET_SOUND_ERRORS = "GET_SOUND_ERRORS";
//Envoie et recupere les données du dernier son posté
export const post_sound = (tempfile_object, soundlocation_id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/sound/`,
      data: {
        url: "url", //! à remplacer avec l'URL du BLOC
        size: tempfile_object['blob']['size'],
        codec: tempfile_object['blob']['type'],
        startTime: tempfile_object['startTime'],
        stopTime: tempfile_object['stopTime'],
        duration: tempfile_object['stopTime']-tempfile_object['startTime'],
        uploader_user_id: 1, //! à remplacer avec le current user id.
        soundlocation_id: soundlocation_id,
      },
    })
      .then((res) => {
        dispatch({ type: POST_SOUND, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
