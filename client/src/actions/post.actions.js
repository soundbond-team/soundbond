import axios from "axios";
require("dotenv").config();

export const GET_POST = "GET_POST";
export const GET_ALL_POST = "GET_ALL_POST";
export const ADD_POST = "ADD_POST";
export const GET_POST_ERRORS = "GET_POST_ERRORS";
export const ADD_LIKE = "ADD_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
// Permet d'ajouter un post en BD
export const post_post = (sound_id, description, uid) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/post/`,
      data: {
        description: description,
        publisher_user_id: uid, //TODO
        sound_id: sound_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      })
      .catch((err) => console.log(err));
  };
};

// Charge tous les Posts (ainsi que les données des foregn key)
export const getallPost = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/api/v1/post/`)
      .then((res) => {
        dispatch({ type: GET_ALL_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Ajoute un like en bd
export const addLike = (id, user_id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/post/like/${id}`,
      data: {
        user_id: user_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: ADD_LIKE, payload: res.data.errors });
        } else {
          dispatch({ type: ADD_LIKE, payload: "" });
        }
      })
      .catch((err) => console.log(err));
  };
};

// Ajoute un like en bd
export const removeLike = (id, user_id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/post/unlike/${id}`,
      data: {
        user_id: user_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: REMOVE_LIKE, payload: res.data.errors });
        } else {
          dispatch({ type: REMOVE_LIKE, payload: "" });
        }
      })
      .catch((err) => console.log(err));
  };
};
