import React, { useState } from "react";

import { makeStyles } from "@material-ui/styles";
import Card from "react-bootstrap/Card";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Post from "../../components/Post/Post";

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
function Playlist(props) {
  //const [description, setDescription] = useState(" "); // Utilisé pour stocker le description.

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <div
        className="container d-flex justify-content-center"
        style={{ marginBottom: "25px", height: "8rem" }}
      >
        <Card
          onClick={handleClickOpen}
          style={props.parent ? { width: "15rem" } : { width: "100%" }}
        >
          <Card.Header> Playlist</Card.Header>
          <Card.Body>
            <Card.Title>{props.playlist.title} </Card.Title>
            <Card.Text>{props.playlist.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleCancel}>
        <DialogTitle className={classes.flex}>
          {props.playlist.title}{" "}
        </DialogTitle>
        <DialogContent>
          <>
            {
              <Grid container direction="column-reverse" spacing={3}>
                {props.playlist.listpost ? (
                  props.playlist.listpost.map((j, index2) => {
                    return (
                      <Grid key={index2} item>
                        <Post post={j} parent="playlist" />
                      </Grid>
                    );
                  })
                ) : (
                  <Grid item>
                    <br />
                    <div className="container ">
                      {" "}
                      <p className="d-flex  justify-content-center">
                        Aucune Playlist publié
                      </p>
                    </div>
                  </Grid>
                )}
              </Grid>
            }
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default Playlist;
