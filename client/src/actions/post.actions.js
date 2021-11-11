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
export const GET_ALL_COMMENT_FOR_SPECIFIC_POST = "GET_ALL_COMMENT_FOR_SPECIFIC_POST";

export const POST_USER = "POST_USER";

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
      .get(`http://localhost:8080/api/v1/user/${id}/trending/`)
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
          console.log(id, user_data);
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
  console.log(post_id, user_id, comment)
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
export const removeComment = (post_id, user_id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/post/uncomment/`,
      data: {
        post_id: post_id,
        user_id: user_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          //dispatch({ type: REMOVE_COMMENT, payload: res.data.errors });
        } else {
          //dispatch({ type: REMOVE_COMMENT, payload: { id } });
        }
      })
      .catch((err) => console.log(err));
  };
};
// Charge tous les Posts (ainsi que les données des foregn key)
/*export const getallComments = (post_id) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/api/v1/post/${post_id}/getAllComments`)
      .then((res) => {
        dispatch({ type: GET_ALL_COMMENT_FOR_SPECIFIC_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};*/
//TODO
export const getallComments = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/api/v1/post/1/getAllComments`)
      .then((res) => {
        dispatch({ type: GET_ALL_COMMENT_FOR_SPECIFIC_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getPostsUser = (id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `http://localhost:8080/api/v1/post/${id}`,
    })
      .then((res) => {
        if (res.data !== "" && res.data !== null) {
          dispatch({ type: POST_USER, payload: res.data });
        }
      })
      .catch((err) => {});
  };
};
