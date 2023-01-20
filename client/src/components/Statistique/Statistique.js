import React from "react";
import Podium from "./Podium";
import TopTrend from "./TopTrend";
import NumberPosts from "./NumberPosts";
import ListeningTime from "./ListeningTime";



function Statistique() {

  return (
    <>
    <div>
      <Podium/>     

      <TopTrend/> 

      <NumberPosts/>

      <ListeningTime/>

    </div>
    </>
  );
}

export default Statistique;
