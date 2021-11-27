import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { get_soundlocation } from "../actions/soundlocation.actions";
import { getallPost } from "../actions/post.actions";
import Map from "../components/Map/Map";
function MapPage() {
  const dispatch = useDispatch();

  // These, in 'state', are defined in index.js
  const allposts = useSelector((state) => state.postReducer); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).
  const soundlocationdata = useSelector((state) => state.soundlocationReducer); // On stocke tous les SoundLocation les plus proches(se mettra a jour automatiquement par rapport a letat du reducer).

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (positiongeo) {
      let position = {
        lat: positiongeo.coords.latitude,
        lng: positiongeo.coords.longitude,
      };
      dispatch(get_soundlocation(position));
      //récuperer tous les posts dans la database
      dispatch(getallPost());
    });
    // eslint-disable-next-line
  }, []);

  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (positiongeo) {
      let position = {
        lat: positiongeo.coords.latitude,
        lng: positiongeo.coords.longitude,
      };
      dispatch(get_soundlocation(position));
    });
    // eslint-disable-next-line
  }, [allposts]);

  // eslint-disable-line react-hooks/exhaustive-deps

  const listItems = soundlocationdata.map((i) => (
    <li key={i.id}>
      Latitude: {i.latitude} Longitude:{i.longitude}
    </li>
  ));
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {" "}
          <Map post_points={allposts} />
        </div>
        <br />
        <div className="container">
          <div className="row justify-content-center">
            <h2>Positions des sons les plus proches:</h2>
            <div>{listItems}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapPage;
