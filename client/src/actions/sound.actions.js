import axios from "axios";

export const GET_SOUND = "GET_SOUND";
export const POST_SOUND = "POST_SOUND";
export const GET_SOUND_ERRORS = "GET_SOUND_ERRORS";
export const ADD_VISIT = "ADD_VISIT";
//Envoie et recupere les données du dernier son posté

const send_file = (tempfile_object, filename) => {
  // Envoyer un fichier au serveur Node.
  let file = new File([tempfile_object.blob], filename); // Créer un objet File à partir du blob local.
  const data = new FormData();
  data.append("file", file);

  // Envoi de la requête POST du fichier.
  return axios({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "post",
    url: process.env.REACT_APP_BACK_SERVER_URL + `api/v1/file/`,
    data,
  });
};

function get_random_string() {
  /* Returns 9 random string with modern crypto solution.
  Base on :
  - https://stackoverflow.com/questions/60738424/javascript-generate-random-hexadecimal
  - https://stackoverflow.com/questions/7463658/how-to-trim-a-string-to-n-chars-in-javascript
  */
  const crypto = window.crypto || window.msCrypto;
  return [...crypto.getRandomValues(new Uint8Array(20))]
    .map((m) => ("0" + m.toString(16)).slice(-2))
    .join("")
    .substring(0, 9);
}

export const post_sound = (tempfile_object, soundlocation_id, user_id) => {
  let filename = user_id + "_" + get_random_string() + ".wav"; // Nom de fichier : [user_id]_[aléatoire].wav
  send_file(tempfile_object, filename); // On poste le fichier.

  // Envoi de la requête POST du Sound.
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL + `api/v1/sound/`,
      data: {
        url: filename, // nom du fichier envoyé précédemment.
        size: tempfile_object["blob"]["size"],
        codec: tempfile_object["blob"]["type"],
        startTime: tempfile_object["startTime"],
        stopTime: tempfile_object["stopTime"],
        duration: tempfile_object["stopTime"] - tempfile_object["startTime"],
        uploader_user_id: user_id,
        soundlocation_id: soundlocation_id,
      },
    })
      .then((res) => {
        dispatch({ type: POST_SOUND, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const addVisit = (id, user_id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL + `api/v1/sound/visit/${id}`,
      data: {
        user_id: user_id,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
};

export const getVisitLength = (id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url:
        process.env.REACT_APP_BACK_SERVER_URL +
        `api/v1/sound/visit/length/${id}`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };
};
