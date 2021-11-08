import React, { useState, useContext, useEffect } from "react";

import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import { UidContext } from "../Appcontext";


function Comment(props) {

  const userData = useSelector((state) => state.userReducer);
  const postData = useSelector((state) => state.postReducer);
  //const [commentaire, setCommentaire] = useState(""); // Utilisé pour stocker un commentaire.


/*
  const sendComment = async () => {
    if (commentaire !== "") {
      await dispatch(addComment(props.post.id, uid, commentaire));
      setCommentaire("");
    }
  };
*/
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
      {props.comments}

        {/* Commentaire. */}

        {/*<Grid item container justifyContent="center">
          <TextInput
            multiline={true}
            style={{backgroundColor: "lightgray"}}
            placeholder="Commenter"
            onChangeText={(comment) => setCommentaire(comment)}
            defaultValue={""}
            value={commentaire} // nécessaire pour effacer le texte.
          />
          <IconButton onClick={sendComment}>
            Commenter
          </IconButton>
              </Grid>*/}
        
      </Card>

    </>
  );
}

export default Comment;
