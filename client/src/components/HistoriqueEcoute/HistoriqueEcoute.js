import React, { useContext, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { UidContext } from "../Appcontext";

import Post from "../Post/Post";
import { getHistoryByUser } from "../../actions/post.actions";

function HistoriqueEcoute() {
  const histo = useSelector((state) => state.historyReducer);
  const dispatch = useDispatch();
  const currentUserdata = useSelector((state) => state.getotherprofiluser);
  const uid = useContext(UidContext);

  async function getHistoryByUserf() {
    dispatch(getHistoryByUser(uid));
  }

  useEffect(() => {
    if (currentUserdata) {
      getHistoryByUserf();
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
                histo.map((i, index) => {
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
