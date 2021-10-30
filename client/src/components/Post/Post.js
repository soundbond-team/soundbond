import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";
import "../Share/Share";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { blue } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Modal from "react-bootstrap/Modal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import { addLike } from "../../actions/post.actions";
import { removeLike } from "../../actions/post.actions";
import ModalHeader from "react-bootstrap/ModalHeader";
import { UidContext } from "../Appcontext";
import IconButton from "@material-ui/core/IconButton";
function Post(props) {
  const faces = [];

  const [liked, setLiked] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const postData = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const uid = useContext(UidContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let currentpost;
    for (let i = 0; i < postData.length; i++) {
      if (postData[i].id === props.id_post) {
        currentpost = postData[i];
      }
    }
    for (let i = 0; i < currentpost.liked_by.length; i++) {
      if (currentpost.liked_by[i].id === uid) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  const pushLike = async () => {
    if (liked === true) {
      setLiked(false);

      await dispatch(removeLike(props.id_post, uid, userData));
    } else {
      setLiked(true);
      await dispatch(addLike(props.id_post, uid, userData));
    }
  };

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
                primary={props.publisher.username}
                secondary={"@".concat(props.publisher.username + " · 11h ago")}
              />
            </ListItem>
          </List>
        </Grid>

        {
          <AudioPlayer
            file={null}
            id_son={props.id_position_son}
            latitude={props.latitude}
            longitude={props.longitude}
          />
        }

        <Grid item container justifyContent="flex-end">
          <span>
            <span
              data-toggle="popover"
              onClick={props.like_users.length > 0 ? handleShow : handleClose}
              style={{ margin: "2px 5px", cursor: "pointer" }}
            >
              {props.like_users.length}{" "}
            </span>
            <IconButton>
              <ThumbUpIcon
                onClick={pushLike}
                style={
                  liked
                    ? { color: blue[500], cursor: "pointer" }
                    : { color: "grey", cursor: "pointer" }
                }
                className={classes.icon}
              />
            </IconButton>
          </span>

          <IconButton>
            {" "}
            <CommentIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Card>

      <Modal show={show} onHide={handleClose} size="sm" centered>
        <ModalHeader closeButton>
          <Modal.Title>Mentions J'aime</Modal.Title>
        </ModalHeader>
        <Modal.Body>
          <div className="container">
            {props.like_users.map((d) => (
              <>
                {" "}
                <span key={d.id}>{d.username}</span> <br />
              </>
            ))}{" "}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withRouter(Post);
