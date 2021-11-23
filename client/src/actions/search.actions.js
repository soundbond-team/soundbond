import axios from "axios";
require("dotenv").config();

export const GET_POST_BY_TAG="GET_POST_BY_TAG";

export const getPostByTag = (tag) =>{
    return(dispatch) => {
      return axios({
        method:"get",
        url: 'http://localhost:8080/api/v1/post/getPostByTag/${tag}' ,
      })
      .then((res) => {
        dispatch({
          type: GET_POST_BY_TAG,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log(err));
  };
};
