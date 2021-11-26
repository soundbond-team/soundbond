import React from "react";

import { useSelector } from "react-redux";

import Post from "../Post/Post";
import Grid from "@material-ui/core/Grid";

function RechercheTags() {
  // These, in 'state', are defined in index.js
  const allposts = useSelector((state) => state.postReducer); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).

  return (
    <>
      {
        <Grid container direction="column-reverse" spacing={3}>
          {allposts.length > 0 ? (
            allposts.map((i, index) => (
              <Grid key={index} item>
                <Post post={i} />
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

export default RechercheTags;
