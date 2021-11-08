import axios from "axios";
require("dotenv").config();

export const GET_POST = "GET_POST";
export const GET_ALL_POST = "GET_ALL_POST";
export const ADD_POST = "ADD_POST";
export const GET_POST_ERRORS = "GET_POST_ERRORS";
export const ADD_LIKE = "ADD_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const ADD_COMMENT = "ADD_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

// Ajoute un post en BD
export const GET_ALL_POST_TREND = "GET_ALL_POST_TREND";
// Permet d'ajouter un post en BD
export const post_post = (sound_id, description, uid) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/post/`,
      data: {
        description: description,
        publisher_user_id: uid,
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

export const getPostTrend = (id) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/api/v1/post/trend/${id}`)
      .then((res) => {
        dispatch({ type: GET_ALL_POST_TREND, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Ajoute un like en bd
export const addLike = (id, user_id, user_data) => {
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
          dispatch({ type: ADD_LIKE, payload: "" });
        } else {
          dispatch({ type: ADD_LIKE, payload: { id, user_data } });
        }
      })
      .catch((err) => console.log(err));
  };
};

// Supprime un like de la bd
export const removeLike = (id, user_id, user_data) => {
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
          dispatch({ type: REMOVE_LIKE, payload: { id, user_data } });
        }
      })
      .catch((err) => console.log(err));
  };
};

// Ajoute un commentaire en bd
export const addComment = (post_id, user_id, comment) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/post/comment/`,
      data: {
        post_id: post_id,
        user_id: user_id,
        comment_text: comment
      },
    })
      .catch((err) => console.log(err));
  };
};

// Supprime un commentaire de la bd
export const removeComment = (id, user_id, user_data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/post/uncomment/${id}`,
      data: {
        user_id: user_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: REMOVE_COMMENT, payload: res.data.errors });
        } else {
          dispatch({ type: REMOVE_COMMENT, payload: { id, user_data } });
        }
      })
      .catch((err) => console.log(err));
  };
};