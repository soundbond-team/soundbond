import "../App.css";
import React, { useEffect, useState } from "react";
import Microphone from "../components/Microphone/Microphone";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import Map from "../components/Map/Map";
import { useDispatch, useSelector } from "react-redux";
import { getsoundlocation } from "../actions/soundlocation.actions";
require("dotenv").config();
function Home() {
  const [files, setFiles] = useState("");
  const dispatch = useDispatch();

  const soundlocationdata = useSelector((state) => state.soundlocationReducer);
  const pushFile = (file) => {
    setFiles(file);
  };
  const [positions, setPosition] = useState({ lat: null, lng: null });

  const pushPosition = ({ lat, lng }) => {
    setPosition({ lat: lat.toFixed(2), lng: lng.toFixed(2) });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (positiongeo) {
      pushPosition({
        lat: positiongeo.coords.latitude,
        lng: positiongeo.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    dispatch(getsoundlocation(positions));
  }, [positions]); // eslint-disable-line react-hooks/exhaustive-deps

  const listItems = soundlocationdata.map((i) => (
    <li key={i.id}>
      Latitude: {i.latitude} Longitude:{i.longitude}
    </li>
  ));
  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <Microphone pushFile={pushFile} pushPosition={pushPosition} />
        </div>
      </div>
      <div class="container">
        <AudioPlayer file={files} position={positions} />
      </div>
      <br></br>
      <div class="container-fluid">
        <div class="row justify-content-center">
          {" "}
          <div class="col-7">
            <Map soundlocationdata={soundlocationdata} />
          </div>
        </div>
      </div>
      <br></br>
      <div class="container">
        <h2>Positions des sons les plus proches:</h2>
        <div>{listItems}</div>
      </div>
    </>
  );
}

export default Home;
