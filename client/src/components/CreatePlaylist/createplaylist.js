import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DoneIcon from "@material-ui/icons/Done";
import Post from "../../components/Post/Post";
import { Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { getPostsUser } from "../../actions/post.actions";
import { create_playlist } from "../../actions/playlist.actions";
import { findallForUser } from "../../actions/playlist.actions";
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

export default function CreatePlaylist(props) {
  const [title, setTitle] = useState(" "); // Utilisé pour stocker le description.
  const [description, setDescription] = useState(" "); // Utilisé pour stocker le description.
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [list_post, setList_post] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDone = () => {
    dispatch(create_playlist(userData.id, list_post, title, description)).then(
      () => {
        setOpen(false);
        dispatch(findallForUser(userData.id));
      }
    );
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const userData = useSelector((state) => state.userReducer);
  const allpostprofilsreducer = useSelector((state) => state.profilPostReducer);

  useEffect(() => {
    dispatch(getPostsUser(userData.id));
  }, [userData]);
  useEffect(() => {
    console.log(list_post);
  }, [list_post]);
  const postSelected = (postcheck) => {
    let checked = false;
    for (let i = 0; i < list_post.length; i++) {
      console.log(list_post[i]);
      if (list_post[i].id === postcheck.id) {
        checked = true;
        console.log(true);
      }
    }
    if (checked === false) {
      console.log(false);
      if (list_post.length === 0) {
        setList_post([postcheck]);
      } else {
        setList_post((oldArray) => [...oldArray, postcheck]);
      }
    } else {
      setList_post(list_post.filter((item) => item.id !== postcheck.id));
    }
  };
  const classes = useStyles();

  return (
    <>
      <div
        className="container d-flex justify-content-center"
        style={{ marginBottom: "35px" }}
      >
        <IconButton onClick={handleClickOpen}>
          <PlaylistAddIcon className={classes.icon} />
        </IconButton>
      </div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleCancel}>
        <DialogTitle className={classes.flex}>Creer une Playlist</DialogTitle>
        <DialogContent>
          <>
            {userData ? (
              <>
                {" "}
                {
                  <Grid container direction="column-reverse" spacing={3}>
                    {allpostprofilsreducer.length > 0 ? (
                      allpostprofilsreducer.map((i, index) => (
                        <Grid key={index} item>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            onChange={() => {
                              postSelected(i);
                            }}
                          />{" "}
                          <Post post={i} parent="createplaylist" />
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
          <div className="input-group mb-3 container">
            <Input
              type="text"
              className="form-control"
              placeholder="Title"
              aria-label="Title"
              aria-describedby="basic-addon2"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={""}
            />
          </div>
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
        </DialogContent>

        <DialogActions>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <IconButton onClick={handleDone}>
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
