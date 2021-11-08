import React from "react";

import { useSelector } from "react-redux";

import Comment from "./Comment";
import Grid from "@material-ui/core/Grid";

function Comments() {
  // These, in 'state', are defined in index.js
  const comments = useSelector((state) => state.postReducer); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).

  return (
    <>
      {
        <Grid container direction="column-reverse" spacing={3}>
          {comments.length > 0 ? (
            comments.map((i, index) => (
              <Grid key={index} item>
                <Comment comment={i} />
              </Grid>
            ))
          ) : (
            <p></p>
          )}
        </Grid>
      }
    </>
  );
}

export default Comments;
