import React from "react";

import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";

import IconButton from "@material-ui/core/IconButton";

import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { red, blue } from "@material-ui/core/colors";

import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";

function Post(props) {
  const faces = [];
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
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <Grid container direction="column"></Grid>
        <Grid item>
          <List className={classes.list}>
            <ListItem alignItems="flex-start" className={classes.listItem}>
              <ListItemAvatar>
                <Avatar className={classes.avatar} src={faces[4]} />
              </ListItemAvatar>
              <ListItemText
                primary="Username"
                secondary="@username · 11h ago"
              />
            </ListItem>
          </List>
        </Grid>

        <AudioPlayer file={props.file} position={props.position} />

        <Grid item container justifyContent="flex-end">
          <IconButton>
            <ThumbUpIcon
              style={{ color: blue[500] }}
              className={classes.icon}
            />
          </IconButton>

          <IconButton>
            <ShareIcon style={{ color: red[500] }} className={classes.icon} />
          </IconButton>

          <IconButton>
            <CommentIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Card>
    </>
  );
}

export default Post;
