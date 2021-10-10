import React from "react";
import "./home.css"

import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";


function Home (){
    return (
        <>
            
                <div className="homeContainer">
                    <Feed/>
                    <Rightbar/>

                    
                </div>

            
        
        
        </>

    );
}

export default Home;