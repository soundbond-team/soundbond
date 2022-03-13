import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useSelector } from "react-redux";

import SuggestionButton from "../SuggestionButton/SuggestionButton";

function FollowSuggestion() {
  const [listSuggestion, setListSuggestion] = useState(null);
  const backServerURL = process.env.REACT_APP_BACK_SERVER_URL;

  const currentUserdata = useSelector((state) => state.userReducer);
  useEffect(() => {
    axios({
      method: "get",
      url:
        backServerURL + `api/v1/user/${currentUserdata.id}/suggestionsFollow/`,
    }).then((res) => {
      if (res.data) {
        const result = Array.from(
          res.data.reduce(
            // eslint-disable-next-line
            (map, item) => (map.get(item.id).count++, map),
            new Map(
              res.data.map((o) => [o.id, Object.assign({}, o, { count: 0 })])
            )
          ),
          ([k, o]) => o
        )
          .sort((a, b) => b.count - a.count)
          .map((o) => o);
        setListSuggestion(result.slice(0, 5));
      }
    });
    // eslint-disable-next-line
  }, [currentUserdata]);

  return (
    <>
      {currentUserdata ? (
        <>
          {" "}
          {
            <Grid container direction="column" spacing={3}>
              {listSuggestion != null ? (
                listSuggestion.map((i, index) => (
                  <Grid key={index} item>
                    <SuggestionButton user={i} />
                  </Grid>
                ))
              ) : (
                <Grid item>
                  <br />
                  <div className="container ">
                    {" "}
                    <p className="d-flex  justify-content-center">
                      Aucune suggestion
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

export default FollowSuggestion;
