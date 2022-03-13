import React, { useEffect } from "react";
import Post from "../../components/Post/Post";

import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";

import { getPostVisitedByUser } from "../../actions/post.actions";

function HistoriqueEcoute(){
    const allpostshare = useSelector((state) => state.allpostsharedReducer);

  const currentUserdata = useSelector((state) => state.getotherprofiluser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserdata) {
      dispatch(getPostVisitedByUser(currentUserdata.id));
    } // eslint-disable-next-line
  }, [currentUserdata]);

  return (
    <>
      {currentUserdata ? (
        <>
          <br />
          {
            <Grid container direction="column-reverse" spacing={3}>
              {allpostshare.length > 0 ? (
                allpostshare.map((i, index) => (
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
                      Aucun post pour le moment
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