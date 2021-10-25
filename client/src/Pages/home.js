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
  const [allpostdata, setPost] = useState([]);
  const dispatch = useDispatch();
  const allposts = useSelector((state) => state.postReducer);
  const soundlocationdata = useSelector((state) => state.soundlocationReducer);

  //récuperer tous les posts dans la database
  const pushPost = (allpostdata) => {
    setPost(allpostdata);
  };

  useEffect(() => {
    //Posts.shift(); // pour la map

    navigator.geolocation.getCurrentPosition(async function (positiongeo) {
      let position = {
        lat: positiongeo.coords.latitude,
        lng: positiongeo.coords.longitude,
      };
      dispatch(getsoundlocation(position));

      dispatch(getallPost());
    });
  }, []); 
  
  // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    pushPost(allposts);
    navigator.geolocation.getCurrentPosition(async function (positiongeo) {
      let position = {
        lat: positiongeo.coords.latitude,
        lng: positiongeo.coords.longitude,
      };
      dispatch(getsoundlocation(position));
    });
  }, [allposts]);
  
  
  // eslint-disable-line react-hooks/exhaustive-deps

  const listItems = soundlocationdata.map((i) => (
    <li key={i.id}>
      Latitude: {i.latitude} Longitude:{i.longitude}
    </li>
  ));

  return (
    <>
      <div className="row">
        <div className="col-5">
          <div className="container">
            <div className="row justify-content-center">
              <Microphone pushFile={null} />
            </div>
          </div>
          <div className="container">
            {
              <Grid container direction="column-reverse" spacing={3}>
                {allpostdata.length > 0 ? (
                  allpostdata.map((i, index) => (
                    <Grid key={index} item>
                      <Post
                        //post
                        id_post={i.id}
                        like={i.like}
                        description={i.description}
                        //son
                        id_son={i.publishing ? i.publishing.id : null}
                        url={i.publishing ? i.publishing.url : null}
                        size={i.publishing ? i.publishing.size : null}
                        duration={i.publishing ? i.publishing.duration : null}
                        //position
                        id_position_son={
                          i.publishing.soundlocation
                            ? i.publishing.soundlocation.id
                            : null
                        }
                        latitude={
                          i.publishing.soundlocation
                            ? i.publishing.soundlocation.latitude
                            : null
                        }
                        longitude={
                          i.publishing.soundlocation
                            ? i.publishing.soundlocation.longitude
                            : null
                        }
                      />
                    </Grid>
                  ))
                ) : (
                  <p></p>
                )}
              </Grid>
            }
          </div>
        </div>
        <div className="col-6">
          <div className="container">
            <div className="row justify-content-center">
              {" "}
              <Map soundlocationdata={soundlocationdata} />
            </div>
            <br />
            <div className="container">
              <div className="row justify-content-center">
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
