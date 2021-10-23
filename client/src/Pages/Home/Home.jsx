import React,{useEffect}from "react";
import "./home.css"



function Home (){

    
    useEffect(() => {
        if(!localStorage.getItem("loggedIn")){
            localStorage.setItem("loggedIn",false);
        }
    }, []);

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