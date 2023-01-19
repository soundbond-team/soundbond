import axios from "axios";

export const GET_MOST_LISTENED = "GET_MOST_LISTENED";


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
  