
import React, { useState } from "react";

import axios from "axios";



function Profil() {


    const followUser = ()=>{

    }



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
                   <h4>username</h4>
                   <h5>@pseudo</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"150%"}}>
                       <h6> posts</h6>
                       <h6> followers</h6>
                       <h6> following</h6>
                   </div>
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>

                </div>
            </div>      
            </div>
        </div>       
          
            
        
    
    );
    
}

export default Profil;
