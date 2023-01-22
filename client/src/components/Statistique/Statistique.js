import React from "react";
import Podium from "./Podium";
import TopTrend from "./TopTrend";
import NumberPosts from "./NumberPosts";
import ListeningTime from "./ListeningTime";
import NumberFollowers from "./NumberFollowers";


function Statistique() {

  return (
    <>
    <div>
      <Podium/>     
      <hr/>
      <TopTrend/> 
      <hr/>
      <NumberPosts/>
      <hr/>
      <ListeningTime/>
      <hr/>
      <NumberFollowers/>
    </div>
    </>
  );
}

export default Statistique;
