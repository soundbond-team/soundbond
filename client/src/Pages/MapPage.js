import React, { useEffect, useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { get_soundlocation } from "../actions/soundlocation.actions";
import { getallPostForMap } from "../actions/post.actions";
import Map from "../components/Map/Map";
import { UidContext } from "../components/Appcontext";

import MesPlaylistOnMap from "../components/MesPlaylistOnMap/MesPlaylistOnMap";
function MapPage() {
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  // These, in 'state', are defined in index.js

  const allpostsforMap = useSelector((state) => state.allpostmapReducer); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).
  const soundlocationdata = useSelector((state) => state.soundlocationReducer); // On stocke tous les SoundLocation les plus proches(se mettra a jour automatiquement par rapport a letat du reducer).

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (positiongeo) {
      let position = {
        lat: positiongeo.coords.latitude,
        lng: positiongeo.coords.longitude,
      };
      dispatch(get_soundlocation(position));
      //récuperer tous les posts dans la database
      dispatch(getallPostForMap());
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (positiongeo) {
      let position = {
        lat: positiongeo.coords.latitude,
        lng: positiongeo.coords.longitude,
      };
      dispatch(get_soundlocation(position));
    }); // eslint-disable-next-line
  }, [allpostsforMap]);

  const listItems = soundlocationdata.map((i) => (
    <li key={i.id}>
      Latitude: {i.latitude} Longitude:{i.longitude}
    </li>
  ));
  return (
    <>
      <div className="container-fluid">
        <div className="col">
          <div className="row justify-content-center">
            <Map post_points={allpostsforMap} connected_user_id={uid} />
          </div>
          <br />
          <br />
          <div className="row justify-content-center">
            <h3>Positions des sons les plus proches:</h3>
            <div>{listItems.length > 0 ? listItems : "aucun"}</div>
          </div>
          <br />
          <br />
          <div className="row justify-content-center">
            <h3>Vos playlists:</h3>
            <div>
              <br /> <MesPlaylistOnMap />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapPage;
