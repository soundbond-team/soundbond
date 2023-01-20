import axios from "axios";

export const GET_MOST_LISTENED = "GET_MOST_LISTENED";
export const GET_TOP_TREND = "GET_TOP_TREND";
export const GET_NUMBER_POST = "GET_NUMBER_POST";
export const GET_TIME_LISTENING = "GET_TIME_LISTENING";


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

export const number_posts_during_period = (user_id) => {
    return (dispatch) => {
      return axios({
        method: "get",
        url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/user/${user_id}/stats/number_post/`,
      })
        .then((res) => {
          dispatch({ type: GET_NUMBER_POST, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
};

export const get_time_listening = (user_id, timelaps) => {
    return (dispatch) => {
      return axios({
        method: "get",
        url: process.env.REACT_APP_BACK_SERVER_URL+`api/v1/user/${user_id}/stats/timeListening/${timelaps}`,
      })
        .then((res) => {
          dispatch({ type: GET_TIME_LISTENING, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
};
  