import './App.css';
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Microphone from './components/Microphone/Microphone';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
function App() {
  const [files, setFiles] = useState("");

  const pushFile = file => {
    setFiles(file);
  };

  return (
    <>
  
      <Microphone pushFile={pushFile} />
      <Grid container direction="column" spacing={3}>
      
          <Grid>
            <AudioPlayer file={files} />
          
          </Grid>
       
      </Grid>
    </>
  );
}

export default App;
