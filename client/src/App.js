import "./App.css";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Microphone from "./components/Microphone/Microphone";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import Map from "./components/Map/Map";

function App() {
  const [files, setFiles] = useState("");

  const pushFile = (file) => {
    setFiles(file);
  };
  const [positions, setPosition] = useState({ lat: null, lng: null });

  const pushPosition = ({ lat, lng }) => {
    setPosition({ lat: lat.toFixed(2), lng: lng.toFixed(2) });
  };

  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <Microphone pushFile={pushFile} pushPosition={pushPosition} />
        </div>
      </div>
      <div class="container">
        <Grid direction="column" spacing={3}>
          <Grid>
            <AudioPlayer file={files} position={positions} />
          </Grid>
        </Grid>
      </div>
      <br></br>
      <div class="container-fluid">
        <div class="row justify-content-center">
          {" "}
          <div class="col-7">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
