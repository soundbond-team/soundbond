import axios from "axios";

export const GET_MOST_LISTENED = "GET_MOST_LISTENED";
export const GET_TOP_TREND = "GET_TOP_TREND";


// Récupérer tous les users qui sont les plus écoutés 
export const most_listened_users = (user_id) => {
    return (dispatch) => {
      return axios({
        method: "get",
        url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/user/${user_id}/stats/mostListened/`,
      })
        .then((res) => {
          dispatch({ type: GET_MOST_LISTENED, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

export const top_trend = () => {
    return (dispatch) => {
      return axios({
        method: "get",
        url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/user/stats/tags`,
      })
        .then((res) => {
          dispatch({ type: GET_TOP_TREND, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

export const number_posts_during_period = () => {
    return (dispatch) => {
      return axios({
        method: "get",
        url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/user/stats/tags`,
      })
        .then((res) => {
          dispatch({ type: GET_TOP_TREND, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
};
  