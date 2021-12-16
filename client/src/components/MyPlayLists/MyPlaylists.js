import React, { useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";

import { findallForUser } from "../../actions/playlist.actions";

import Playlist from "../../components/Playlists/Playlist";
function MyPlayLists() {
  const allplaylistByUser = useSelector((state) => state.allplaylistByUser);

  const currentUserdata = useSelector((state) => state.getotherprofiluser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserdata) {
      dispatch(findallForUser(currentUserdata.id));
    } // eslint-disable-next-line
  }, [currentUserdata]);

  return (
    <>
      {currentUserdata ? (
        <>
          {" "}
          {
            <Grid container direction="column-reverse" spacing={3}>
              {allplaylistByUser.length > 0 ? (
                allplaylistByUser.map((i, index) => {
                  return (
                    <Grid key={index} item>
                      <Playlist playlist={i} />
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
      ) : (
        <p></p>
      )}
    </>
  );
}

export default MyPlayLists;
