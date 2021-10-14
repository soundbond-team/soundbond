import axios from "axios";
require("dotenv").config();

export const POST_SOUNDLOCATION = "POST_SOUNDLOCATION";

export const postsoundlocation = (props) => {
  console.log(props.lat + "/" + props.lng);
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:8080/api/v1/soundlocation/`,
      data: { latitude: props.lat, longitude: props.lng },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: POST_SOUNDLOCATION, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
