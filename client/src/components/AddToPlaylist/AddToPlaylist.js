import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/styles";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DoneIcon from "@material-ui/icons/Done";
import Post from "../Post/Post";
import { Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getPostsUser } from "../../actions/post.actions";
import {
  create_playlist,
  findallForUser,
} from "../../actions/playlist.actions";
import { UidContext } from "../Appcontext";
import Playlist from "../../components/Playlists/Playlist";
const backServerURL = process.env.REACT_APP_BACK_SERVER_URL;
const useStyles = makeStyles((theme) => ({
  icon: {
    height: 22,
    width: 22,
    padding: "0px",
    margin: "0px",
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

export default function AddToPlaylist(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [list_playlist, setList_playlist] = useState([]);
  const [playlist_selected, setplaylist_selected] = useState(null);
  const [checked, setChecked] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const uid = useContext(UidContext);

  const handleDone = async (post) => {
    console.log(post);
    await axios({
      method: "post",
      url: backServerURL + `api/v1/playlist/add`,
      data: {
        post_id: post.id,
        playlist_id: playlist_selected.id,
      },
    })
      .then((res) => {
        if (res.data.err) {
          console.log("err");
        } else {
          console.log(res);
        }
      })
      .catch((err) => {});
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const getPlaylists = async () => {
    await axios({
      method: "get",
      url: backServerURL + `api/v1/playlist/findAll/` + uid,
    })
      .then((res) => {
        if (res.data.err) {
          console.log("err");
        } else {
          setList_playlist(res.data);
        }
      })
      .catch((err) => {});
  };

  const userData = useSelector((state) => state.userReducer);
  useEffect(() => {
    getPlaylists();
    // eslint-disable-next-line
  }, [userData]);
  useEffect(() => {
    console.log(list_playlist);
  }, [list_playlist]);
  const postSelected = (palylistchecked) => {
    setChecked(false);

    setplaylist_selected(palylistchecked);
  };
  const classes = useStyles();

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <PlaylistAddIcon className={classes.icon} />
      </IconButton>

      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleCancel}>
        <DialogTitle className={classes.flex}>
          Ajouter à une Playlist
        </DialogTitle>
        <DialogContent>
          <>
            {userData ? (
              <>
                {" "}
                {
                  <Grid container direction="column-reverse" spacing={3}>
                    {list_playlist.length > 0 ? (
                      list_playlist.map((i, index) => (
                        <Grid key={index} item>
                          <input
                            className="form-check-input"
                            type="radio"
                            id="flexCheckDefault"
                            onChange={() => {
                              postSelected(i);
                            }}
                            name="radAnswer"
                          />{" "}
                          <Playlist playlist={i} />
                        </Grid>
                      ))
                    ) : (
                      <Grid item>
                        <br />
                        <div className="container ">
                          {" "}
                          <p className="d-flex  justify-content-center">
                            Aucun post publié
                          </p>
                        </div>
                      </Grid>
                    )}
                  </Grid>
                }
              </>
            ) : (
              <p></p>
            )}
          </>
        </DialogContent>

        <DialogActions>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <IconButton
                onClick={() => {
                  handleDone(props.post);
                }}
              >
                {" "}
                <DoneIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
