import React, { useState, useContext, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import mapboxgl from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { Icon } from '@iconify/react';
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
  addShare,
  removeShare,
} from "../../actions/post.actions";
import { change_ZOOM } from "../../actions/postToMap.actions";
import ModalHeader from "react-bootstrap/ModalHeader";
import IconButton from "@material-ui/core/IconButton";
import { TextInput } from "react-native";

import { UidContext } from "../Appcontext";
import RepeatIcon from "@mui/icons-material/Repeat";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
function Post(props) {
  const uid = useContext(UidContext);
  const [liked, setLiked] = useState(() => {
    for (let i = 0; i < props.post.liked_by.length; i++) {
      if (props.post.liked_by[i].id === uid) {
        return true;
      }
    }
    return false;
  });
  const [rePosted, setRePosted] = useState(() => {
    for (let i = 0; i < props.post.shared_by.length; i++) {
      if (props.post.shared_by[i].id === uid) {
        return true;
      }
    }
    return false;
  });
  const [nombrelike, setNombrelike] = useState(props.post.liked_by.length);
  const userData = useSelector((state) => state.userReducer);
  const [commentaire, setCommentaire] = useState(""); // Utilisé pour stocker un commentaire.

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showMentionJaimeModal, setShowMentionJaimeModal] = useState(false);
  const handleCloseMentionJaimeModal = () => setShowMentionJaimeModal(false);
  const handleShowMentionJaimeModal = () => setShowMentionJaimeModal(true);

  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const handleCloseCommentsModal = () => setShowCommentsModal(false);
  const handleShowCommentsModal = () => setShowCommentsModal(true);
  const [placeName, setplaceName] = useState("");
  useEffect(() => {
    let currentpost = props.post;
    if (currentpost) {
      async function translateToAdress() {
        let lat = currentpost.publishing.soundlocation.latitude;
        let lng = currentpost.publishing.soundlocation.longitude;
        await fetch(
          ` https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=address&access_token=${mapboxgl.accessToken}`,
          { method: "GET" }
        ).then(async (response) => {
          let address = await response.json();
          console.log(address.features[0].place_name);
          setplaceName(address.features[0].place_name);
        });
      }
      if (
        currentpost.publishing.soundlocation.latitude != null &&
        currentpost.publishing.soundlocation.longitude != null
      ) {
        translateToAdress();
      }
    } // eslint-disable-next-line
  }, []);

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

  const share = async () => {
    if (rePosted === true) {
      setRePosted(false);

      await dispatch(removeShare(props.post.id, uid, userData));
    } else {
      setRePosted(true);

      await dispatch(addShare(props.post.id, uid, userData));
    }
  };

  const goToMap = async () => {
    navigate("/map");
    const location = {
      longitude: props.post.publishing.soundlocation.longitude,
      latitude: props.post.publishing.soundlocation.latitude,
    };
    await dispatch(change_ZOOM(location));
  };

  const sendAddComment = async () => {
    if (commentaire !== "") {
      await dispatch(removeComment(props.post.id, uid, commentaire, userData));
      await dispatch(addComment(props.post.id, uid, commentaire, userData));
    }
    setCommentaire("");
  };

  const sendRemoveComment = async (post_id, user_id, _commentaire) => {
    await dispatch(removeComment(post_id, user_id, _commentaire, userData));
  };

  const getFileName = () => {
    // Génère une URL de fichier à partir de l'URL de base Azure blob et du nom de fichier.
    let azure = process.env.REACT_APP_AZURE_BLOB_STORAGE_ADRESS;
    let filename = props.post.publishing.url;
    return azure + filename;
  };
  const [blob_url] = useState(getFileName());

  const date = new Date(props.post.publishing.createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const supp = ()=>{
    return 2;
  }
  return (
    <>
      <Card className={classes.card}>
        {/* Utilisateur postant le Post. */}
        <Grid item>
          <List className={classes.list}>
            <IconButton 
              onClick={supp} 
              style={{ float:"right" }}
              >
              <Icon icon="bytesize:ellipsis-vertical" vFlip={true} />
            </IconButton>
            <ListItem alignItems="flex-start" className={classes.listItem}>
              <ListItemAvatar>
                <NavLink
                  className="nav-link"
                  exact
                  to={`/profil/${props.post.publisher.username}/posts`}
                  style={{ textDecoration: "none" }}
                >
                  <Avatar className={classes.avatar} />
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
                    props.post.publisher.username +
                      " · " +
                      new Intl.DateTimeFormat(
                        navigator.language,
                        options
                      ).format(date)
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
            file_url={blob_url}
            id_son={props.post.publishing.id}
            address={placeName !== "" ? placeName : ""}
            visit={
              props.post.publishing.visited_by
                ? props.post.publishing.visited_by
                : null
            }
          />
        }

        {/* Boutons like et comment. */}
        <span>{"Description: " + props.post.description}</span>
        <br />
        {props.post.tagpost.length > 0 ? (
          <span>{"Tags: "}</span>
        ) : (
          <span></span>
        )}
        {props.post.tagpost.length > 0 ? (
          props.post.tagpost.map((i, index) => <span>{i.tag + ", "}</span>)
        ) : (
          <p></p>
        )}
        <Grid item container justifyContent="flex-end">
          <span>
            <span
              data-toggle="popover"
              onClick={
                props.post.liked_by.length > 0 && !props.parent
                  ? handleShowMentionJaimeModal
                  : handleCloseMentionJaimeModal
              }
              disabled={props.parent ? true : false}
              style={{ cursor: "pointer" }}
            >
              {nombrelike}{" "}
            </span>
            <IconButton
              onClick={pushLike}
              disabled={props.parent ? true : false}
            >
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
          <span>
            <span
              style={{ marginLeft: "5px", cursor: "pointer" }}
              onClick={!props.parent ? handleShowCommentsModal : null}
            >
              {props.post.commented_by.length}{" "}
            </span>
            <IconButton
              onClick={handleShowCommentsModal}
              disabled={props.parent ? true : false}
            >
              <CommentIcon className={classes.icon} />
            </IconButton>
          </span>
          {/* share button */}
          <span>
            <span style={{ marginLeft: "5px", cursor: "pointer" }}></span>
            <IconButton onClick={share} disabled={props.parent ? true : false}>
              <RepeatIcon
                style={
                  rePosted
                    ? { color: blue[500], cursor: "pointer" }
                    : { color: "grey", cursor: "pointer" }
                }
                className={classes.icon}
              />
            </IconButton>
          </span>
          <span>
            <span style={{ marginLeft: "5px", cursor: "pointer" }}></span>
            <IconButton onClick={goToMap}>
              <LocationOnIcon
                style={
                  rePosted
                    ? { color: blue[500], cursor: "pointer" }
                    : { color: "grey", cursor: "pointer" }
                }
                className={classes.icon}
              />
            </IconButton>
          </span>

          <span>
            <FacebookShareButton
              url={`${process.env.REACT_APP_FRONT_URL}/profil/${props.post.publisher.username}`}
              quote={`Écouter ce super post SoundBond -> ${props.post.description}`}
              className={classes.socialMediaButton}
            >
              <FacebookIcon size={36} round />
            </FacebookShareButton>
          </span>
          <span>
            <TwitterShareButton
              url={`${process.env.REACT_APP_FRONT_URL}/profil/${props.post.publisher.username}`}
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
          <IconButton
            disabled={props.parent ? true : false}
            onClick={sendAddComment}
          >
            <SendIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Modal>
    </>
  );
}

export default Post;
