import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";

import { getAllPostSharedByUser } from "../../actions/post.actions";
import { useParams } from "react-router-dom";

function MesPartages() {
  const params = useParams();
  const allpostshare = useSelector((state) => state.allpostsharedReducer);
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
      dispatch(getAllPostSharedByUser(currentUserdata.id));
    }
  }, [currentUserdata]); // eslint-disable-line react-hooks/exhaustive-deps

  const pushUserdata = async (data) => {
    await setcurrentUserdata(data);
  };

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
                        Aucun partage
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
