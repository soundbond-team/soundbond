import React, { useEffect } from "react";
import Post from "../../components/Post/Post";

import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";

import { getPostsUser } from "../../actions/post.actions";

function MyPosts() {
  const allpostprofilsreducer = useSelector((state) => state.profilPostReducer);

  const dispatch = useDispatch();

  const currentUserdata = useSelector((state) => state.getotherprofiluser);
  useEffect(() => {
    if (currentUserdata) {
      dispatch(getPostsUser(currentUserdata.id));
    } // eslint-disable-next-line
  }, [currentUserdata]);

  return (
    <>
      {currentUserdata ? (
        <>
          {" "}
          {
            <Grid container direction="column-reverse" spacing={3}>
              {allpostprofilsreducer.length > 0 ? (
                allpostprofilsreducer.map((i, index) => (
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
                      Aucun post publié
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

export default MyPosts;
