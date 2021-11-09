import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../actions/users.actions"


const Follow = (props)=>{

  const userData = useSelector((state) => state.userReducer);
  

  //const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const followHandler=()=>{
    
        dispatch(followUser(userData.id,props.idToFollow));
        
        //setIsFollowed(true);
  };



    
  //{isFollowed && !isEmpty(userData)&&()}
  return (
  
     <>
        <button style={{margin:"10px"}} 
            className="btn waves-effect waves-light #64b5f6 blue darken-1" 
            onClick={followHandler}
        >Follow</button>
        
    </>
  )

};


export default Follow;