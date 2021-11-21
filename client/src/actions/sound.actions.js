import axios from "axios";
require("dotenv").config();

export const GET_SOUND = "GET_SOUND";
export const POST_SOUND = "POST_SOUND";
export const GET_SOUND_ERRORS = "GET_SOUND_ERRORS";
//Envoie et recupere les données du dernier son posté

const send_file = (tempfile_object, filename) => {
  // Envoyer un fichier au serveur Node.
  let file = new File([tempfile_object.blob], filename); // Créer un objet File à partir du blob local.
  const data = new FormData();
  data.append('file', file);

  // Envoi de la requête POST du fichier.
  return axios({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: "post",
    url: `http://localhost:8080/api/v1/file/`,
    data
  })

}

export const post_sound = (tempfile_object, soundlocation_id, user_id) => {
  let random = Math.random().toString(36).substring(1); // Générer un nom aléatoire.
  let filename = user_id+'_'+random+".mp3"; // Nom de fichier : [user_id]_[aléatoire].mp3
  send_file(tempfile_object, filename); // On poste le fichier.

  // Envoi de la requête POST du Sound.
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/sound/`,
      data: {
        url: filename, // nom du fichier envoyé précédemment.
        size: tempfile_object['blob']['size'],
        codec: tempfile_object['blob']['type'],
        startTime: tempfile_object['startTime'],
        stopTime: tempfile_object['stopTime'],
        duration: tempfile_object['stopTime'] - tempfile_object['startTime'],
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
