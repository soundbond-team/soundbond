import Profil from "../../components/Profil";
import React from "react";
import {  useSelector } from "react-redux";

function Profile() {

  const userData = useSelector((state) => state.userReducer);
  
    


    return (


      <div>
          <Profil username ={userData.username} />
          
      </div>      
          
    );
    
}

export default Profile;
