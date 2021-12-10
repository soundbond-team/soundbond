import React, { useEffect } from "react";
import Post from "../../components/Post/Post";

import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";

import { getAllPostSharedByUser } from "../../actions/post.actions";

function MesPartages() {
  const allpostshare = useSelector((state) => state.allpostsharedReducer);

  const currentUserdata = useSelector((state) => state.getotherprofiluser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserdata) {
      dispatch(getAllPostSharedByUser(currentUserdata.id));
    }
  }, [currentUserdata]);

  return (
    <>
      {currentUserdata ? (
        <>
          <br />
          <div className="container">
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
                        Aucun post partagé
                      </p>
                    </div>
                  </Grid>
                )}
              </Grid>
            }
          </div>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
}

export default MesPartages;
