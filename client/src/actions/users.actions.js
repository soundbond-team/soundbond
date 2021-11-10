import axios from "axios";
export const GET_ALL_USER = "GET_ALL_USER";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";


export const getAllUser = () =>{
    return (dispatch) => {
      return axios
        .get(`http://localhost:8080/api/v1/user/`)
        .then((res)=>{
          dispatch({ type : GET_ALL_USER, payload : res.data });
        })
        .catch((err) => console.log(err));
    };
};

export const followUser = (followerId, idToFollow)=>{
    return (dispatch) =>{
      return axios({
        method : "post",
        url: `http://localhost:8080/api/v1/user/follows/${idToFollow}`,
        data : {
          idToFollow,
          followerId,
        },
      })
      .then((res)=>{
        dispatch({type : FOLLOW_USER, payload:idToFollow});
      })
      .catch((err)=>console.log(err));
    };
};
 

/*export const unfollowUser = (followerId, idToUnfollow) => {
    return (dispatch) => {
      return axios({
        method: "post",
        url: `http://localhost:8080/api/user/unfollows/${idToUnfollow}`,
        data: { idToUnfollow },
      })
        .then((res) => {
          dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
        })
        .catch((err) => console.log(err));
    };
};
*/