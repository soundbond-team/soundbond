import React, { useState, useRef, useEffect } from "react";
import { TextInput } from 'react-native';
import { ReactMic } from "react-mic";
import WaveSurfer from "wavesurfer.js";

import { makeStyles } from "@material-ui/styles";
import MicIcon from "@material-ui/icons/Mic";
import IconButton from "@material-ui/core/IconButton";
import StopIcon from "@material-ui/icons/Stop";
import ReplayIcon from "@material-ui/icons/Replay";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { green, red, blue } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";


import { post_soundlocation } from "../../actions/soundlocation.actions";
import { post_sound } from "../../actions/sound.actions";
import { post_post, getallPost } from "../../actions/post.actions";

import "./Microphone.css";

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 38,
    width: 38,
  },
  reactmic: {
    width: "100%",
    height: 200,
  },
  wavesurfer: {
    width: "100%",
  },
  flex: {
    flex: 1,
  },
}));

export default function Microphone(props) {
  const dispatch = useDispatch();
  const sound = useSelector((state) => state.soundReducer);
  const lastsoundlocation = useSelector(
    (state) => state.onesoundlocationReducer
  );
  const [description, setDescription] = useState(''); // Utilisé pour stocker le description.
  const [record, setRecord] = useState(false);
  const [open, setOpen] = useState(false);
  const [tempFile, setTempFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (!open || (open && !tempFile)) return;

    wavesurfer.current = WaveSurfer.create({
      container: "#wavesurfer-id",
      waveColor: "grey",
      progressColor: "tomato",
      height: 140,
      cursorWidth: 1,
      cursorColor: "lightgrey",
      barWidth: 2,
      normalize: true,
      responsive: true,
      fillParent: true,
    });

    const handleResize = wavesurfer.current.util.debounce(() => {
      wavesurfer.current.empty();
      wavesurfer.current.drawBuffer();
    }, 150);

    wavesurfer.current.on("play", () => setIsPlaying(true));
    wavesurfer.current.on("pause", () => setIsPlaying(false));
    window.addEventListener("resize", handleResize, false);
  }, [open, tempFile]);

  useEffect(() => {
    if (tempFile) {
      wavesurfer.current.load(tempFile.blobURL);
    }
  }, [tempFile]);

  const togglePlayback = () => {
    if (!isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };
  const stopPlayback = () => wavesurfer.current.stop();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const done = () => {
    /* Lorsqu'un son est enregistré et que l'on appuie sur le bouton coche, cette fonction est appelée. */
    if (tempFile) {
      // Récupérer la géolocalisation
      navigator.geolocation.getCurrentPosition(function (positiongeo) {
        dispatch(
          post_soundlocation({
            lat: positiongeo.coords.latitude,
            lng: positiongeo.coords.longitude,
          })
        );
      });
    }
  };
  useEffect(() => {
    if (tempFile) {
      addsound(tempFile, lastsoundlocation.id);
    }
  }, [lastsoundlocation]);

  const addsound = (tempfile_object, soundlocation_id) =>
  /* Poster un Sound.
  Prend en argument :
    - l'Objet avec les informations du fichier temporaire
    - l'ID du SoundLocation correspondant.
  */
    new Promise((resolve, reject) => {
      dispatch(post_sound(tempfile_object, soundlocation_id));
      resolve();
    });

  useEffect(() => {
    if (tempFile) {
      addpost(sound.id, description);
      setTempFile(null);
      setOpen(false);
      setRecord(false);
    }
  }, [sound]);

  const addpost = (sound_id, _description) =>
  // Poster un Post puis recupérer tous les Posts.
    new Promise((resolve, reject) => {
      dispatch(post_post(sound_id, _description)).then(() => {
        dispatch(getallPost());
      });
      resolve();
    });

  const handleCancel = () => {
    setRecord(false);
    setTempFile(null);
    setOpen(false);
  };

  const download = () => {
    if (tempFile) {
      const url = tempFile.blobURL;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "rzqr.mp3");
      document.body.appendChild(link);
      link.click();
    }
  };

  const startRecording = () => {
    setTempFile(null);
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    //console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = (recordedBlob) => {
    setTempFile(recordedBlob);
  };

  const classes = useStyles();

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <MicIcon className={classes.icon} />
      </IconButton>

      <Dialog maxWidth="sm" open={open} onClose={handleCancel}>
        <DialogTitle className={classes.flex}>Enregistrer un son</DialogTitle>
        <DialogContent> {/* Zone d'affichage  */}
          {tempFile ? (
            <div className={classes.wavesurfer} id="wavesurfer-id" />
          ) : (
            <ReactMic
              record={record}
              className={classes.reactmic}
              onStop={onStop}
              onData={onData}
              strokeColor="grey"
              backgroundColor="white"
              mimeType="audio/mp3"
            />
          )}
        </DialogContent>

        {/* Description  */}
        <TextInput
          multiline = {true}
          style={{height: 40,backgroundColor: 'azure', fontSize: 20}}
          placeholder="Description"
          onChangeText={description => setDescription(description)}
          defaultValue={""}
        />  

        <DialogActions>
          <Grid container>
            {tempFile && (
              <Grid item container justify="center" xs={12}>
                {!isPlaying ? (
                  <IconButton onClick={togglePlayback}>
                    <PlayArrowIcon className={classes.icon} />
                  </IconButton>
                ) : (
                  <IconButton onClick={togglePlayback}>
                    <PauseIcon className={classes.icon} />
                  </IconButton>
                )}
                <IconButton onClick={stopPlayback}>
                  <StopIcon className={classes.icon} />
                </IconButton>
              </Grid>
            )}
            <Grid item container justify="center" xs={12}>
              {!record && !tempFile && (
                <IconButton onClick={startRecording}>
                  <FiberManualRecordIcon
                    style={{ color: red[500] }}
                    className={classes.icon}
                  />
                </IconButton>
              )}

              {!record && tempFile && (
                <IconButton onClick={startRecording}>
                  <ReplayIcon className={classes.icon} />
                </IconButton>
              )}

              {record && (
                <IconButton onClick={stopRecording}>
                  <StopIcon className={classes.icon} />
                </IconButton>
              )}

              <IconButton onClick={done}>
                <DoneIcon
                  style={tempFile && !record ? { color: green[500] } : {}}
                  className={classes.icon}
                />
              </IconButton>

              <IconButton onClick={download}>
                <DownloadIcon
                  style={tempFile && !record ? { color: blue[500] } : {}}
                  className={classes.icon}
                />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CancelIcon
                  style={tempFile && !record ? { color: red[500] } : {}}
                  className={classes.icon}
                />
              </IconButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
