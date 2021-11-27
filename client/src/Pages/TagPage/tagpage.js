import React, { useEffect } from "react";

import Post from "../../components/Post/Post";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getpostbytag } from "../../actions/post.actions";
import { useParams } from "react-router-dom";
function TagPage(props) {
  const dispatch = useDispatch();
  const allpostbytag = useSelector((state) => state.postSearcByTagReducer);
  const params = useParams();
  useEffect(() => {
    dispatch(getpostbytag("#" + params.tag));
  }, [props, params]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="container" style={{ marginTop: "25px" }}>
        <h2>{"#" + params.tag}</h2>
        <br />
        <div>
          <Grid container direction="row" spacing={3}>
            {allpostbytag ? (
              allpostbytag.map((i, index) => (
                <Grid key={index} item>
                  <Post post={i} />
                </Grid>
              ))
            ) : (
              <p></p>
            )}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default TagPage;
