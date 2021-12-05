import React from "react";

import { useSelector } from "react-redux";

import Post from "../Post/Post";
import Grid from "@material-ui/core/Grid";

function TrendingPost() {
  // These, in 'state', are defined in index.js
  const allposts = useSelector((state) => state.postTrendReducer); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).

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
            <Grid item>
              <br />
              <div className="container ">
                {" "}
                <p className="d-flex  justify-content-center">
                  Aucun post d'abonnements
                </p>
              </div>
            </Grid>
          )}
        </Grid>
      }
    </>
  );
}

export default TrendingPost;
