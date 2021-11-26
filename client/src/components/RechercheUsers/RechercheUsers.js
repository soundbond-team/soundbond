import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import Post from "../Post/Post";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
function RechercheUsers(props) {
  // These, in 'state', are defined in index.js
  // const allposts = useSelector((state) => state.postReducer); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).
  const [allUsersSuggestion, setAllUsersSuggestion] = useState([]);
  const params = useParams();
  useEffect(() => {
    const getAllUsers = async (recherche) => {
      await axios({
        method: "get",
        url: `http://localhost:8080/api/v1/user/recherche/${recherche}`,
      })
        .then((res) => {
          console.log(res);
          if (res.data !== "" && res.data != null) {
            setAllUsersSuggestion(res.data);
            console.log("adda");
            console.log(res.data);
          } else {
            setAllUsersSuggestion([]);
          }
        })
        .catch((err) => {
          setAllUsersSuggestion([]);
        });
    };
    console.log(params.user);
    getAllUsers(params.user);
  }, [props, params]);

  return (
    <>
      <h1>Users</h1>
      <Grid container direction="column-reverse" spacing={3}>
        {allUsersSuggestion.length > 0 ? (
          allUsersSuggestion.map((i, index) => (
            <Grid key={index} item>
              {i.username}
            </Grid>
          ))
        ) : (
          <p></p>
        )}
      </Grid>
    </>
  );
}

export default RechercheUsers;
