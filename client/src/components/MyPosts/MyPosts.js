import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";

import { getPostsUser } from "../../actions/post.actions";
import { useParams } from "react-router-dom";

function MyPosts() {
  const params = useParams();
  const allpostprofilsreducer = useSelector((state) => state.profilPostReducer);

  const [currentUserdata, setcurrentUserdata] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserdata !== params.username) {
      const getcurrentUser = async (username) => {
        await axios({
          method: "get",
          url: `http://localhost:8080/api/v1/user/username/${username}`,
        })
          .then((res) => {
            if (res.data !== "" && res.data != null) {
              pushUserdata(res.data);
            } else window.location = "/";
          })
          .catch((err) => {
            window.location = "/";
          });
      };

      getcurrentUser(params.username);
    } // eslint-disable-next-line
  }, [params]); //react-hooks/exhaustive-deps  eslint-disable-next-line

  useEffect(() => {
    if (currentUserdata) {
      dispatch(getPostsUser(currentUserdata.id));
    }
  }, [currentUserdata]); // eslint-disable-line react-hooks/exhaustive-deps

  const pushUserdata = async (data) => {
    await setcurrentUserdata(data);
  };

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
