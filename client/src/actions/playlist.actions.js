import axios from "axios";
require("dotenv").config();

export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const FIND_ALL_PLAYLIST_FOR_USER = "FIND_ALL_PLAYLIST_FOR_USER";
// Récupérer tous les SoundLocation
export const create_playlist = (user_id, posts_list, title, description) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/playlist/create`,
      data: {
        title: title,
        description: description,
        publisher_user_id: user_id,
        list_post: posts_list,
      },
    })
      .then((res) => {
        dispatch({ type: CREATE_PLAYLIST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const findallForUser = (user_id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `http://localhost:8080/api/v1/playlist/findAll/${user_id}`,
    })
      .then((res) => {
        dispatch({ type: FIND_ALL_PLAYLIST_FOR_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
