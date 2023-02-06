import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { loadMorePosts } from "../../actions/post.actions";

import Post from "../Post/Post";
import Grid from "@material-ui/core/Grid";

function Allposts() {
  // These, in 'state', are defined in index.js
  const allposts = useSelector((state) => state.postReducer);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch(); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).
  const windowRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleScroll = (e) => {
      setLoading(true);
      console.log("cj  :" + offset);
      if (
        windowRef.current.innerHeight + windowRef.current.scrollY >=
        document.body.offsetHeight
      ) {
        setOffset(offset + 10);
        console.log("cj2  :" + offset);
      }
    };
    windowRef.current = window;
    windowRef.current.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      windowRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  useEffect(() => {
    console.log("xj3é  :" + offset);
    const load = async () => {
      await dispatch(loadMorePosts(offset));
    };
    console.log(allposts.length);
    if (offset !== 0 && allposts.length <= offset) {
      load().then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [offset]);

  return (
    <>
      {
        //activé la fonction handleScroll
        <>
          {" "}
          <Grid container direction="column-reverse" spacing={3}>
            {allposts.length > 0 ? (
              allposts.map((i, index) => {
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
                  <p className="d-flex  justify-content-center">Aucun post</p>
                </div>
              </Grid>
            )}
            {loading ? <p>loading...</p> : null}
          </Grid>
        </>
      }
    </>
  );
}

export default Allposts;
