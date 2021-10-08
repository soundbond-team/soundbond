import "../App.css";
import React, { useEffect, useState } from "react";
import Microphone from "../components/Microphone/Microphone";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import Map from "../components/Map/Map";
import { useDispatch, useSelector } from "react-redux";
import { getsoundlocation } from "../actions/soundlocation.actions";
import { NavLink } from "react-router-dom";
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
    </>
  );
}

export default Home;
