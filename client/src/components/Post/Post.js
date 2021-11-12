import React, { useState, useContext, useEffect } from "react";

import { NavLink } from "react-router-dom";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";
import "../Share/Share";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import Modal from "react-bootstrap/Modal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import {
  addLike,
  removeLike,
  addComment,
  removeComment,
} from "../../actions/post.actions";
import ModalHeader from "react-bootstrap/ModalHeader";
import IconButton from "@material-ui/core/IconButton";
import { TextInput } from "react-native";

import { UidContext } from "../Appcontext";

function Post(props) {
  const faces = [];

  const [liked, setLiked] = useState(false);
  const [nombrelike, setNombrelike] = useState(props.post.liked_by.length);
  const userData = useSelector((state) => state.userReducer);
  const [commentaire, setCommentaire] = useState(""); // Utilisé pour stocker un commentaire.

  const dispatch = useDispatch();
  const uid = useContext(UidContext);

  const [showMentionJaimeModal, setShowMentionJaimeModal] = useState(false);
  const handleCloseMentionJaimeModal = () => setShowMentionJaimeModal(false);
  const handleShowMentionJaimeModal = () => setShowMentionJaimeModal(true);

  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const handleCloseCommentsModal = () => setShowCommentsModal(false);
  const handleShowCommentsModal = () => setShowCommentsModal(true);

  useEffect(() => {
    let currentpost = props.post;

    for (let i = 0; i < currentpost.liked_by.length; i++) {
      if (currentpost.liked_by[i].id === uid) {
        setLiked(true);
        break;
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
      setNombrelike(nombrelike - 1);
      await dispatch(removeLike(props.post.id, uid, userData));
    } else {
      setLiked(true);
      setNombrelike(nombrelike + 1);
      await dispatch(addLike(props.post.id, uid, userData));
    }
  };

  const sendAddComment = async () => {
    if (commentaire !== "") {
      await dispatch(removeComment(props.post.id, uid, commentaire, userData));
      await dispatch(addComment(props.post.id, uid, commentaire, userData));
    }
    setCommentaire("");
  };

  const sendRemoveComment = async (post_id, user_id, commentaire) => {
    await dispatch(removeComment(post_id, user_id, commentaire, userData));
  };

  return (
    <>
      <Card className={classes.card}>
        {/* Utilisateur postant le Post. */}
        <Grid item>
          <List className={classes.list}>
            <ListItem alignItems="flex-start" className={classes.listItem}>
              <ListItemAvatar>
                <NavLink
                  className="nav-link"
                  exact
                  to={`/profil/${props.post.publisher.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <Avatar className={classes.avatar} src={faces[4]} />
                </NavLink>
              </ListItemAvatar>
              <NavLink
                className="nav-link"
                exact
                to={`/profil/${props.post.publisher.username}`}
                style={{ textDecoration: "none" }}
              >
                {" "}
                <ListItemText
                  primary={props.post.publisher.username}
                  secondary={"@".concat(
                    props.post.publisher.username + " · 11h ago"
                  )}
                />{" "}
              </NavLink>
            </ListItem>
          </List>
        </Grid>

        {/* Lecteur du Sound + SoundLocation. */}

        {
          <AudioPlayer
            id="son"
            file={null}
            id_son={props.post.publishing.id}
            latitude={props.post.publishing.soundlocation.latitude}
            longitude={props.post.publishing.soundlocation.longitude}
          />
        }

        {/* Boutons like et comment. */}
        <span>{props.post.description}</span>
        {props.post.tag.length > 0 ? <span>Tags: </span> : <span></span>}
        {props.post.tag.length > 0 ? (
          props.post.tag.map((i, index) => <span>{i.tag + ", "}</span>)
        ) : (
          <p></p>
        )}
        <Grid item container justifyContent="flex-end">
          <span>
            <span
              data-toggle="popover"
              onClick={
                props.post.liked_by.length > 0
                  ? handleShowMentionJaimeModal
                  : handleCloseMentionJaimeModal
              }
              style={{ margin: "2px 5px", cursor: "pointer" }}
            >
              {nombrelike}{" "}
            </span>
            <IconButton onClick={pushLike}>
              <ThumbUpIcon
                style={
                  liked
                    ? { color: blue[500], cursor: "pointer" }
                    : { color: "grey", cursor: "pointer" }
                }
                className={classes.icon}
              />
            </IconButton>
          </span>

          <IconButton onClick={handleShowCommentsModal}>
            {" "}
            <CommentIcon className={classes.icon} />
          </IconButton>
          <span>
            <FacebookShareButton
              url={`http://192.168.1.15:3000/profil/${props.post.publisher.username}`}
              quote={`Écouter ce super post SoundBond -> ${props.post.description}`}
              className={classes.socialMediaButton}
            >
              <FacebookIcon size={36} round />
            </FacebookShareButton>
          </span>

          <span>
            <TwitterShareButton
              url={`http://192.168.1.15:3000/profil/${props.post.publisher.username}`}
              title={`Écouter ce super post SoundBond -> ${props.post.description}`}
              className={classes.socialMediaButton}
            >
              <TwitterIcon size={36} round />
            </TwitterShareButton>
          </span>
        </Grid>
      </Card>

      <Modal
        show={showMentionJaimeModal}
        onHide={handleCloseMentionJaimeModal}
        size="sm"
        centered
      >
        <ModalHeader closeButton>
          <Modal.Title>Mentions J'aime</Modal.Title>
        </ModalHeader>
        <Modal.Body>
          {props.post.liked_by.map((likes, index) => (
            <div key={index}>
              <span>{likes.username}</span> <br />
            </div>
          ))}
        </Modal.Body>
      </Modal>

      <Modal
        show={showCommentsModal}
        onHide={handleCloseCommentsModal}
        size="sm"
        centered
      >
        <ModalHeader closeButton>
          <Modal.Title>Commentaires</Modal.Title>
        </ModalHeader>
        <Modal.Body>
          {props.post.commented_by.map((comment, index) => (
            <div key={index}>
              <span>
                {comment.username} | {comment.comment.comment}
                <IconButton
                  onClick={() => {
                    sendRemoveComment(
                      comment.comment.post_id,
                      comment.comment.user_id,
                      comment.comment.comment
                    );
                  }}
                >
                  {userData.id === comment.comment.user_id ? (
                    <DeleteIcon className={classes.icon} />
                  ) : (
                    <span />
                  )}
                </IconButton>
              </span>
              <br />
            </div>
          ))}
        </Modal.Body>

        {/* Commentaire. */}

        <Grid item container justifyContent="center">
          <TextInput
            multiline={true}
            style={{ backgroundColor: "lightgray" }}
            placeholder="Commenter"
            onChangeText={(comment) => setCommentaire(comment)}
            defaultValue={""}
            value={commentaire} // nécessaire pour effacer le texte.
          />
          <IconButton onClick={sendAddComment}>
            <SendIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Modal>
    </>
  );
}

export default Post;
