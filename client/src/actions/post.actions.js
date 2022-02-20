import axios from "axios";


export const GET_POST = "GET_POST";
export const GET_ALL_POST = "GET_ALL_POST";
export const ADD_POST = "ADD_POST";
export const GET_POST_ERRORS = "GET_POST_ERRORS";
export const ADD_LIKE = "ADD_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const ADD_COMMENT = "ADD_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const POSTS_BY_TAG = "POSTS_BY_TAG";
export const GET_POST_TAG = "GET_POST_TAG";
export const ADD_SHARE = "ADD_SHARE";
export const REMOVE_SHARE = "REMOVE_SHARE";
export const GET_ALL_Shares_FOR_SPECIFIC_POST =
  "GET_ALL_Shares_FOR_SPECIFIC_POST";
export const GET_ALL_POSTS_SHARED_BY_USER = " GET_ALL_POSTS_SHARED_BY_USER";

// Ajoute un post en BD
export const GET_ALL_POST_TREND = "GET_ALL_POST_TREND";
export const GET_ALL_COMMENT_FOR_SPECIFIC_POST =
  "GET_ALL_COMMENT_FOR_SPECIFIC_POST";

export const POST_USER = "POST_USER";

export const GET_POST_BY_TAG = "GET_POST_BY_TAG";

export const getPostByTag = (tag) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/getPostByTag/${tag}`,
    })
      .then((res) => {
        dispatch({
          type: GET_POST_BY_TAG,
          payload: res.data.tagging,
        });
      })
      .catch((err) => console.log(err));
  };
};

// Permet d'ajouter un post en BD
export const post_post = (sound_id, description, uid, tag) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/`,
      data: {
        description: description,
        publisher_user_id: uid,
        sound_id: sound_id,
        tags: tag,
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
      .get(process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/`)
      .then((res) => {
        dispatch({ type: GET_ALL_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getPostTrend = (id) => {
  return (dispatch) => {
    return axios
      .get(process.env.REACT_APP_BACK_SERVER_URL+`api/v1/user/${id}/trending/`)
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
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/like/${id}`,
      data: {
        user_id: user_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: ADD_LIKE, payload: "" });
        } else {
          console.log(id, user_data);
          dispatch({
            type: ADD_LIKE,
            payload: { id, user_data, playlist_id: 1 },
          });
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
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/unlike/${id}`,
      data: {
        user_id: user_id,
      },
    }).then((res) => {
      if (res.data.errors) {
        dispatch({ type: REMOVE_LIKE, payload: res.data.errors });
      } else {
        dispatch({ type: REMOVE_LIKE, payload: { id, user_data } });
      }
    });
  };
};

// Ajoute un commentaire en bd
export const addComment = (post_id, user_id, comment, userData) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/comment/`,
      data: {
        post_id: post_id,
        user_id: user_id,
        comment_text: comment,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: ADD_COMMENT, payload: res.data.errors });
        } else {
          let data = res.data;
          dispatch({ type: ADD_COMMENT, payload: { data, post_id, userData } });
        }
      })
      .catch((err) => console.log(err));
  };
};

// Supprime un commentaire de la bd
export const removeComment = (comment_id, userData) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/uncomment/`,
      data: {
        comment_id: comment_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          //dispatch({ type: REMOVE_COMMENT, payload: res.data.errors });
        } else {
          dispatch({
            type: REMOVE_COMMENT,
            payload: { comment_id, userData },
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getPostsUser = (user_id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/user/${user_id}/posts`,
    })
      .then((res) => {
        if (res.data !== "" && res.data !== null) {
          dispatch({ type: POST_USER, payload: res.data });
        }
      })
      .catch((err) => {});
  };
};

export const getpostbytag = (tag) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/getPostBytag`,
      data: {
        tag: tag,
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data) {
        dispatch({ type: POSTS_BY_TAG, payload: res.data.tagging });
      }
    });
  };
};

export const addShare = (post_id, user_id, userData) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/share/`,
      data: {
        post_id: post_id,
        user_id: user_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: ADD_SHARE, payload: "" });
        } else {
          dispatch({ type: ADD_SHARE, payload: { post_id, userData } });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const removeShare = (id, user_id, userData) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/post/unshare/`,
      data: {
        post_id: id,
        user_id: user_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: REMOVE_SHARE, payload: "" });
        } else {
          dispatch({ type: REMOVE_SHARE, payload: { id, userData } });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getAllPostSharedByUser = (user_id) => {
  return (dispatch) => {
    return axios
      .get(process.env.REACT_APP_BACK_SERVER_URL+`api/v1/user/${user_id}/sharedPosts`)
      .then((res) => {
        if (res.data.shared_posts) {
          dispatch({
            type: GET_ALL_POSTS_SHARED_BY_USER,
            payload: res.data.shared_posts,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};
