import React, { useState, useRef, useEffect } from "react";

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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { green, red } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import "./Microphone.css";
import { postsoundlocation } from "../../actions/soundlocation.actions";

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

  const [record, setRecord] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [tempFile, setTempFile] = React.useState(null);

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
    console.log("tempFile", tempFile);
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

  const handleDone = async () => {
    if (tempFile) {
      props.pushFile(tempFile);
      setTempFile(null);
      setOpen(false);
      setRecord(false);
      // Envoyer les data au backkk

      navigator.geolocation.getCurrentPosition(async function (positiongeo) {
        await dispatch(
          postsoundlocation({
            lat: positiongeo.coords.latitude,
            lng: positiongeo.coords.longitude,
          })
        );
        props.pushPosition({
          lat: positiongeo.coords.latitude,
          lng: positiongeo.coords.longitude,
        });
      });
    }
  };

  const handleCancel = () => {
    setRecord(false);
    setTempFile(null);
    setOpen(false);
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
        <DialogTitle className={classes.flex}>Record</DialogTitle>
        <DialogContent>
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

              <IconButton onClick={handleDone}>
                <DoneIcon
                  style={tempFile && !record ? { color: green[500] } : {}}
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
