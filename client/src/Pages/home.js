import "../App.css";
import React, { useEffect, useState } from "react";
import Microphone from "../components/Microphone/Microphone";
import { useDispatch, useSelector } from "react-redux";
import { getsoundlocation } from "../actions/soundlocation.actions";
import Post from "../components/Post/Post";
import Grid from "@material-ui/core/Grid";
import Map from "../components/Map/Map";
import { getallPost } from "../actions/post.actions";

function Home() {
  const [files, setFiles] = useState("");
  const dispatch = useDispatch();
  const allposts = useSelector((state) => state.postReducer);

  const pushFile = (file) => {
    setFiles(file);
  };
  const [positions, setPosition] = useState({ lat: null, lng: null });
  const [like, setLikes] = useState(0);
  const [id, setId] = useState(0);
  const [Posts, setPosts] = useState([
    { files: files, positions: positions, like: like, id: id },
  ]);

  const pushPosition = ({ lat, lng }) => {
    setPosition({ lat: lat.toFixed(2), lng: lng.toFixed(2) });
  };
  const pushPost = (post) => {
    setPosts([...Posts, post]);
  };
  const pushid = (id) => {
    setId(id);
  };
  const pushlike = (like) => {
    setLikes(like);
  };
  useEffect(() => {
    Posts.shift(); // pour la map
    dispatch(getallPost());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getsoundlocation(positions));
    if (files != null && positions.lat != null && positions.lng != null) {
      let post = { files, positions, like, id };
      pushPost(post);
    }
  }, [positions]); // eslint-disable-line react-hooks/exhaustive-deps
  const soundlocationdata = useSelector((state) => state.soundlocationReducer);
  const listItems = soundlocationdata.map((i) => (
    <li key={i.id}>
      Latitude: {i.latitude} Longitude:{i.longitude}
    </li>
  ));

  return (
    <>
      <div class="row">
        <div class="col-5">
          <div class="container">
            <div class="row justify-content-center">
              <Microphone
                pushFile={pushFile}
                pushPosition={pushPosition}
                pushid={pushid}
                pushlike={pushlike}
              />
            </div>
          </div>
          <div class="container">
            <Grid container direction="column" spacing={3}>
              {Posts.length > 0 ? (
                Posts.map((posts, index) => (
                  <Grid key={index} item>
                    <Post
                      file={posts.files}
                      position={posts.positions}
                      like={posts.like}
                      id={posts.id}
                    />
                  </Grid>
                ))
              ) : (
                <p></p>
              )}

              {allposts.length > 0 ? (
                allposts.map((posts, index) => (
                  <Grid key={posts.id} item>
                    <Post
                      file={null}
                      like={posts.like}
                      position={{ lat: 10, lng: 15 }}
                      id={posts.id}
                    />
                  </Grid>
                ))
              ) : (
                <p></p>
              )}
            </Grid>
          </div>
        </div>
        <div class="col-6">
          <div class="container">
            <div class="row justify-content-center">
              {" "}
              <Map soundlocationdata={soundlocationdata} />
            </div>
            <br />
            <div class="container">
              <div class="row justify-content-center">
                <h2>Positions des sons les plus proches:</h2>
                <div>{listItems}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
