import React from "react";


import Follow from "../components/Follow";

function Profil (props) {

    

return (
<div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               
               <div>
                   <h4>{props.username}</h4>
                   <h5>@{props.username}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"150%"}}>
                       <h6> posts</h6>
                       <h6> followers</h6>
                       <h6> following</h6>
                   </div>
                   <Follow idToFollow={props.user}/>
                   
                 
                </div>
            </div>      
            </div>
        </div>   
);

        }
    export default Profil ;