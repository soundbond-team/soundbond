import React, { useEffect } from "react";
import Post from "../../components/Post/Post";

import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";

import { getPostVisitedByUser } from "../../actions/post.actions";

function HistoriqueEcoute(){
  const allplaylistByUser = useSelector((state) => state.allplaylistByUser);

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
              {allplaylistByUser.length > 0 ? (
                allplaylistByUser.map((i, index) => (
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