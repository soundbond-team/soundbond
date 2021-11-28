import React, { useState, useEffect } from "react";

import axios from "axios";
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";

import { findallForUser } from "../../actions/playlist.actions";
import { useParams } from "react-router-dom";
import Playlist from "../../components/Playlists/Playlist";
function MyPlayLists() {
  const params = useParams();
  const allplaylistByUser = useSelector((state) => state.allplaylistByUser);

  const [currentUserdata, setcurrentUserdata] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(allplaylistByUser);
    // eslint-disable-next-line
  }, [allplaylistByUser]);
  useEffect(() => {
    if (currentUserdata !== params.username) {
      const getcurrentUser = async (username) => {
        await axios({
          method: "get",
          url: `http://localhost:8080/api/v1/user/username/${username}`,
        })
          .then((res) => {
            if (res.data !== "" && res.data != null) {
              pushUserdata(res.data);
            } else window.location = "/";
          })
          .catch((err) => {
            window.location = "/";
          });
      };

      getcurrentUser(params.username);
    } // eslint-disable-next-line
  }, [params]); //react-hooks/exhaustive-deps  eslint-disable-next-line

  useEffect(() => {
    if (currentUserdata) {
      dispatch(findallForUser(currentUserdata.id));
    }
  }, [currentUserdata]); // eslint-disable-line react-hooks/exhaustive-deps

  const pushUserdata = async (data) => {
    await setcurrentUserdata(data);
  };

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
