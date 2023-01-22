import React from "react";
import Podium from "./Podium";
import TopTrend from "./TopTrend";
import NumberPosts from "./NumberPosts";
import ListeningTime from "./ListeningTime";
import NumberFollowers from "./NumberFollowers";
import QueryStatsIcon from '@mui/icons-material/QueryStats';


function Statistique() {

  return (
    <>
    <div style={{display:"flex", flexDirection:"column", justifyItems:"space-between"}}>
      <center>
        <h5>Vos Statistiques </h5> 
        <QueryStatsIcon sx={{ fontSize: 80 }}/>
      </center>
      <hr/>
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
