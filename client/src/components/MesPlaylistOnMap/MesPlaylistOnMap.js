import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";

import { findallForUser } from "../../actions/playlist.actions";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Playlist from "../../components/Playlists/Playlist";
import { IconButton } from "@mui/material";
import { change_itineraire } from "../../actions/itineraire.actions";

function MesPlaylistOnMap(props) {
  const allplaylistByUser = useSelector((state) => state.allplaylistByUser);

  const currentUserdata = useSelector((state) => state.userReducer);
  const [itineraire, setItineraire] = useState(null);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState();
  const handleColor = (index) => {
    setSelected(index);
  };

  const pushitineraire = (i) => {
    setItineraire(i);
  };
  useEffect(() => {
    if (itineraire !== null) {
      let itineraire_list = itineraire.listpost.map((post) => ({
        longitude: post.publishing.soundlocation.longitude,
        latitude: post.publishing.soundlocation.latitude,
      }));

      dispatch(change_itineraire(itineraire_list));
      setItineraire(null);
    } // eslint-disable-next-line
  }, [itineraire]);

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
            <Grid container direction="row" spacing={3}>
              {allplaylistByUser.length > 0 ? (
                allplaylistByUser.map((i, index) => {
                  return (
                    <>
                      {" "}
                      <Grid key={index} item style={{ marginBottom: "2rem" }}>
                        <Playlist playlist={i} parent="mappage" />
                        <div className="d-flex  justify-content-start">
                          {" "}
                          <IconButton
                            key={index}
                            onClick={() => {
                              pushitineraire(i);
                            }}
                            style={{
                              color: selected === index ? "green" : "grey",
                            }}
                            onClickCapture={() => {
                              handleColor(index);
                            }}
                          >
                            <PlayArrow />
                          </IconButton>
                        </div>
                      </Grid>
                    </>
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

export default MesPlaylistOnMap;
