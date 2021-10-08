import React, { useState } from "react";
import Map from "../components/Map/Map";
import { useSelector } from "react-redux";
function MapPage() {
  const soundlocationdata = useSelector((state) => state.soundlocationReducer);
  const listItems = soundlocationdata.map((i) => (
    <li key={i.id}>
      Latitude: {i.latitude} Longitude:{i.longitude}
    </li>
  ));

  return (
    <>
      <div class="container-fluid">
        <div class="row justify-content-center">
          {" "}
          <div class="col-7">
            <Map soundlocationdata={soundlocationdata} />
          </div>
        </div>
      </div>
      <div class="container">
        <h2>Positions des sons les plus proches:</h2>
        <div>{listItems}</div>
      </div>
    </>
  );
}

export default MapPage;
