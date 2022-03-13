import React, { useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { UidContext } from "../Appcontext";
import axios from "axios";
import Post from "../Post/Post";
const backServerURL = process.env.REACT_APP_BACK_SERVER_URL;
function HistoriqueEcoute() {
  const [histo, setHisto] = useState([]);

  const currentUserdata = useSelector((state) => state.getotherprofiluser);
  const uid = useContext(UidContext);

  async function getHistoryByUser() {
    await axios({
      method: "get",
      url: backServerURL + `api/v1/user/` + uid + `/history`,
    })
      .then((res) => {
        if (res.data.err) {
          console.log("err");
        } else {
          console.log(res.data);
          setHisto(res.data[0].has_titreliste);
        }
      })
      .catch((err) => {});
  }

  useEffect(() => {
    if (currentUserdata) {
      getHistoryByUser();
    } // eslint-disable-next-line
  }, [currentUserdata]);

  return (
    <>
      {currentUserdata ? (
        <>
          <br />

          {
            <Grid container direction="column-reverse" spacing={3}>
              {histo.length > 0 ? (
                histo.map((i, index) => (
                  <Grid key={index} item>
                    <Post post={i.adds_the_post} />
                  </Grid>
                ))
              ) : (
                <Grid item>
                  <br />
                  <div className="container ">
                    {" "}
                    <p className="d-flex  justify-content-center">
                      Aucun historique
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

export default HistoriqueEcoute;
