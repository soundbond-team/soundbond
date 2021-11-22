import React, { useState, useRef, useEffect, useContext } from "react";

import { ReactMic } from "react-mic";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";

import { makeStyles } from "@material-ui/styles";
import MicIcon from "@material-ui/icons/Mic";
import CropIcon from "@mui/icons-material/Crop";
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
import { UidContext } from "../Appcontext";
import "./Microphone.css";
import { Input } from "@material-ui/core";

import getWavBytes from './sound_computation.js'; // convertAnAudioBufferToBlob()

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
  const [description, setDescription] = useState(" "); // Utilisé pour stocker le description.
  const [tag, setTag] = useState(" ");
  const [tags, setTags] = useState([]); //tous les tags
  const [record, setRecord] = useState(false);
  const [open, setOpen] = useState(false);
  const [tempFile, setTempFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurfer = useRef(null);
  const uid = useContext(UidContext);
  const buttonTag = useRef();

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
      plugins: [
        RegionsPlugin.create({
          regions: [
            {
              id: 1,
              start: 0,
              end: 1,
              color: "rgba(0, 0, 0, 0.1)",
            },
          ],
        }),
      ],
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
  }, [tempFile]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlayback = () => {
    if (!isPlaying) {
      if (wavesurfer.current.regions.list[1]) {
        wavesurfer.current.regions.list[1].play();
      } else {
        wavesurfer.current.play();
      }
    } else {
      wavesurfer.current.pause();
    }
  };
  const stopPlayback = () => wavesurfer.current.stop();

  const cropSound = () => {
    const start =
      wavesurfer.current.regions.list[
        Object.keys(wavesurfer.current.regions.list)[0]
      ].start.toFixed(2);
    const end =
      wavesurfer.current.regions.list[
        Object.keys(wavesurfer.current.regions.list)[0]
      ].end.toFixed(2);
    const originalBuffer = wavesurfer.current.backend.buffer;

    var newBuffer = wavesurfer.current.backend.ac.createBuffer(
      originalBuffer.numberOfChannels,
      //la partition du son que l'on souhaite récupérer
      (end - start) * (originalBuffer.sampleRate * 1),
      originalBuffer.sampleRate
    );

    for (var i = 0; i < originalBuffer.numberOfChannels; i++) {
      var chanData = originalBuffer.getChannelData(i);
      var segmentChanData = newBuffer.getChannelData(i);
      for (var j = 0; j < end * originalBuffer.sampleRate; j++) {
        segmentChanData[j] = chanData[j + start * originalBuffer.sampleRate];
      }
    }

    wavesurfer.current.loadDecodedBuffer(newBuffer);
    wavesurfer.current.clearRegions();
    let newBlob = convertAnAudioBufferToBlob(newBuffer);
    setTempFile(newBlob);
  };

  const convertAnAudioBufferToBlob = (audioBuffer) => {
    /* Conversion d'un AudioBuffer, après découpage, en un objet
        Blob traitable par le reste du programme.
      - https://stackoverflow.com/questions/62172398/convert-audiobuffer-to-arraybuffer-blob-for-wav-download
      - https://stackoverflow.com/questions/61253805/whats-the-best-way-to-get-an-audio-buffer-into-a-blob-that-can-be-played-by-an
    */

    // Float32Array samples
    // Used when left and right channels : const [left, right] =  [audioBuffer.getChannelData(0), audioBuffer.getChannelData(1)]
    const channel = audioBuffer.getChannelData(0) // But we only have one.

    // interleaved
    const interleaved = new Float32Array(channel.length)
    for (let src=0, dst=0; src < channel.length; src++, dst+=2) {
      interleaved[dst] = channel[src]
    }

    // get WAV file bytes and audio params of your audio source
    const wavBytes = getWavBytes(interleaved.buffer, {
      isFloat: true,       // floating point or 16-bit integer
      numChannels: 2,
      sampleRate: 48000,
    })
    const blob = new Blob([wavBytes], { type: 'audio/mp3' })

    console.log(blob);
    const url = window.URL.createObjectURL(blob);

    // Création du nouveau blob.
    let newBlob = tempFile;
    newBlob.blob = blob;
    newBlob.blobURL = url;

    return newBlob;
  };

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
  }, [lastsoundlocation]); // eslint-disable-line react-hooks/exhaustive-deps

  const addsound = (tempfile_object, soundlocation_id) =>
    /* Poster un Sound.
  Prend en argument :
    - l'Objet avec les informations du fichier temporaire
    - l'ID du SoundLocation correspondant.
  */
    new Promise((resolve, reject) => {
      dispatch(post_sound(tempfile_object, soundlocation_id, uid));
      resolve();
    });

  useEffect(() => {
    if (tempFile) {
      addpost(sound.id, description, tags);
      setTempFile(null);
      setOpen(false);
      setRecord(false);
    }
  }, [sound]); // eslint-disable-line react-hooks/exhaustive-deps

  const addpost = (sound_id, _description, tags) =>
    // Poster un Post puis recupérer tous les Posts.
    new Promise((resolve, reject) => {
      dispatch(post_post(sound_id, _description, uid, tags)).then(() => {
        setTags([]);
        setDescription(" ");
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
  const addTag = () => {
    if (tags.includes(tag) === false) {
      setTags((state) => [...state, tag]);
      setTag("");
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center">
        <IconButton onClick={handleClickOpen}>
          <MicIcon className={classes.icon} />
        </IconButton>
      </div>
      <Dialog maxWidth="sm" open={open} onClose={handleCancel}>
        <DialogTitle className={classes.flex}>Enregistrer un son</DialogTitle>
        <DialogContent>
          {" "}
          {/* Zone d'affichage  */}
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
              mimeType="audio/wav"
            />
          )}
        </DialogContent>

        {/* Description  */}

        <div className="input-group mb-3 container">
          <Input
            type="text"
            className="form-control"
            placeholder="Description"
            aria-label="Description"
            aria-describedby="basic-addon2"
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={""}
          />
        </div>
        {" Tags: " + tags + ", "}
        <div className="input-group mb-3 container">
          <Input
            style={{ whiteSpace: "nowrap" }}
            type="text"
            multiple
            class="text-break"
            className="form-control"
            placeholder="Tag"
            aria-label="Tag"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setTag(e.target.value.replace(/\s/g, ""));
            }}
            id="tag"
            defaultValue={""}
            ref={buttonTag}
            value={tag}
            pattern="^\S+$"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              onClick={addTag}
            >
              Ajouter
            </button>
          </div>
        </div>

        <DialogActions>
          <Grid container>
            {tempFile && (
              <Grid item container justify="center" xs={12}>
                {!isPlaying ? (
                  <IconButton onClick={togglePlayback}>
                    {" "}
                    <PlayArrowIcon className={classes.icon} />
                  </IconButton>
                ) : (
                  <IconButton onClick={togglePlayback}>
                    {" "}
                    <PauseIcon className={classes.icon} />
                  </IconButton>
                )}

                <IconButton onClick={stopPlayback}>
                  {" "}
                  <StopIcon className={classes.icon} />
                </IconButton>

                <IconButton onClick={cropSound}>
                  {" "}
                  <CropIcon className={classes.icon} />
                </IconButton>
              </Grid>
            )}
            <Grid item container justify="center" xs={12}>
              {!record && !tempFile && (
                <IconButton onClick={startRecording}>
                  {" "}
                  <FiberManualRecordIcon
                    style={{ color: red[500] }}
                    className={classes.icon}
                  />
                </IconButton>
              )}

              {!record && tempFile && (
                <IconButton onClick={startRecording}>
                  {" "}
                  <ReplayIcon className={classes.icon} />
                </IconButton>
              )}

              {record && (
                <IconButton onClick={stopRecording}>
                  {" "}
                  <StopIcon className={classes.icon} />
                </IconButton>
              )}

              <IconButton onClick={done}>
                {" "}
                <DoneIcon
                  style={tempFile && !record ? { color: green[500] } : {}}
                  className={classes.icon}
                />
              </IconButton>

              <IconButton onClick={download}>
                {" "}
                <DownloadIcon
                  style={tempFile && !record ? { color: blue[500] } : {}}
                  className={classes.icon}
                />
              </IconButton>

              <IconButton onClick={handleCancel}>
                {" "}
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
