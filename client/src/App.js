import './App.css';
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Microphone from './components/Microphone/Microphone';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Map from './components/Map/Map';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col'
function App() {
  const [files, setFiles] = useState("");

  const pushFile = file => {
    setFiles(file);
  };

  return (
    <>
    
   
  <Container>
    <Row>
      <Microphone pushFile={pushFile} />
      </Row></Container>
      <Container>  
       <Grid  direction="column" spacing={3}>
      
          <Grid>
            <AudioPlayer file={files} />
          
          </Grid>
       
      </Grid>
      
   </Container><br></br>
     <Container fluid>
   <Row className="justify-content-center">   <Col sm={7}>
      <Map /></Col>
      </Row></Container>
    </>
  );
}

export default App;
