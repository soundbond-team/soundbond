import axios from "axios";

export const GET_USER = "GET_USER";
export const FOLLOW = "FOLLOW";
export const UNFOLLOW = "UNFOLLOW";
export const GET_OTHER_PROFIL_USER = "GET_OTHER_PROFIL_USER";
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/api/v1/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
// Ajoute un follow en bd
export const follow = (id, user_id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/user/follow/${id}`,
      data: {
        following: user_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: FOLLOW, payload: "" });
        }
      })
      .catch((err) => console.log(err));
  };
};
// remove un follow en bd
export const unfollow = (id, user_id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/user/unfollow/${id}`,
      data: {
        following: user_id,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: UNFOLLOW, payload: res.data.errors });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getotherprofiluser = (username) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `http://localhost:8080/api/v1/user/username/${username}`,
    })
      .then((res) => {
        if (res.data !== "" && res.data != null) {
          dispatch({ type: GET_OTHER_PROFIL_USER, payload: res.data });
        }
      })
      .catch((err) => console.log(err));
  };
};
