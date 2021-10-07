import axios from "axios";
require("dotenv").config();

export const GET_SOUND = "GET_SOUND";
export const POST_SOUND = "POST_SOUND";
export const GET_SOUND_ERRORS = "GET_SOUND_ERRORS";

export const postsound = () => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/sound/`,
      data: {
        title: "Titre",
        description: "Description",
        published: true,
        url: "url",
        size: 50,
        startTime: 5,
        stopTime: 10,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: POST_SOUND, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};