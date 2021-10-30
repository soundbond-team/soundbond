import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/styles";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";

import PauseIcon from "@material-ui/icons/Pause";
import Grid from "@material-ui/core/Grid";
import DownloadIcon from "@mui/icons-material/Download";
import { blue } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    minWidth: 100,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    width: "100%",
  },
  list: {
    padding: 0,
  },
  listItem: {
    //paddingBottom: 0
  },
  controls: {
    minWidth: "100px",
  },
  icon: {
    height: 18,
    width: 18,
  },
  avatar: {
    display: "inline-block",
  },
}));

export default function AudioPlayer(props) {
  const wavesurfer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferId = `wavesurfer--${uuidv4()}`;
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: `#${wavesurferId}`,
      waveColor: "grey",
      progressColor: "tomato",
      height: 60,
      cursorWidth: 1,
      cursorColor: "lightgray",
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.file) {
      wavesurfer.current.load(props.file.blobURL);
    }
  }, [props.file]);

  const togglePlayback = () => {
    if (!isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };

  const stopPlayback = () => wavesurfer.current.stop();

  const classes = useStyles();

  let transportPlayButton;

  if (!isPlaying) {
    transportPlayButton = (
      <IconButton>
        {" "}
        <PlayArrowIcon onClick={togglePlayback} className={classes.icon} />{" "}
      </IconButton>
    );
  } else {
    transportPlayButton = (
      <IconButton>
        {" "}
        <PauseIcon className={classes.icon} onClick={togglePlayback} />{" "}
      </IconButton>
    );
  }

  const download = () => {
    if (props.file) {
      const url = props.file.blobURL;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "rzqr.mp3");
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <>
      <Grid item id={wavesurferId} />
      <Grid item container className={classes.buttons}>
        <Grid item xs={5}>
          {transportPlayButton}

          <IconButton>
            {" "}
            <StopIcon className={classes.icon} onClick={stopPlayback} />{" "}
          </IconButton>

          <IconButton>
            {" "}
            <DownloadIcon
              onClick={download}
              style={props.file ? { color: blue[500] } : {}}
              className={classes.icon}
            />{" "}
          </IconButton>

          <p style={{ margin: "4px" }}>
            {"  Latitude: " + props.latitude}{" "}
            {" / Longitude: " + props.longitude}{" "}
          </p>
        </Grid>
      </Grid>
    </>
  );
}
