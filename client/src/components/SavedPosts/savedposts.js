import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostSavedByUser } from "../../actions/post.actions";
import Post from "../Post/Post";
import Grid from "@material-ui/core/Grid";
import { UidContext } from "../Appcontext";
function PostSave() {
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  // These, in 'state', are defined in index.js
  const PostSaved = useSelector((state) => state.allpostsavedReducer); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).
  useEffect(() => {
    dispatch(getAllPostSavedByUser(uid)); // eslint-disable-next-line
  }, []);
  return (
    <>
      {
        <Grid container direction="column" spacing={3}>
          {PostSaved.length > 0 ? (
            PostSaved.map((i, index) => (
              <Grid key={index} item>
                <Post key={index} post={i} />
              </Grid>
            ))
          ) : (
            <Grid item>
              <br />
              <div className="container ">
                {" "}
                <p className="d-flex  justify-content-center">Aucun post</p>
              </div>
            </Grid>
          )}
        </Grid>
      }
    </>
  );
}

export default PostSave;
