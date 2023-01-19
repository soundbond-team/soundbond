import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import Post from "../Post/Post";
import Grid from "@material-ui/core/Grid";

function Allposts() {
  // These, in 'state', are defined in index.js
  const allposts = useSelector((state) => state.postReducer); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).

  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();

      console.log('beforeunload event triggered');

      return (event.returnValue =
        'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);
  
  return (
    <>
      {
        <Grid container direction="column-reverse" spacing={3}>
          {allposts.length > 0 ? (
            allposts.map((i, index) => {
              if (i !== null) {
                return (
                  <Grid key={index} item>
                    <Post post={i} />
                  </Grid>
                );
              } else {
                return null;
              }
            })
          ) : (
            <Grid item>
              <br />
              <div className="container ">
                {" "}
                <p className="d-flex  justify-content-center">Aucun post</p>
              </div>
            </Grid>
          )}
        </Grid>
      }
    </>
  );
}

export default Allposts;
