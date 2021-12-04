import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import SearchBox from "../../components/Search/SearchBox";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl";
import { useSelector } from "react-redux";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ post_points }) => {
  // Access the store via the `useContext` hook
  //const { store } = useContext(ReactReduxContext)

  const mapContainerRef = useRef(null);
  const itineraire = useSelector((state) => state.itinerairereducer);
  const linkFromPost = useSelector((state) => state.postToMapReducer);
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);
  const markers_list = [];
  //const [search_results, setSearchResults] = useState('');
  const childToParent = async (results) => {
    clearMarkers();
    //setSearchResults(results);
  };

  function clearMarkers() {
    // Deletes markers from the map.
    if (markers_list) {
      for (var i = markers_list.length - 1; i >= 0; i--) {
        markers_list[i].remove();
      }
    }
  }
  function addMarkers(map) {
    for (const e of post_points) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker ";

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat([
          e.publishing.soundlocation.longitude,
          e.publishing.soundlocation.latitude,
        ])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h5>${e.publishing.soundlocation.longitude}, ${e.publishing.soundlocation.latitude}</h5>
              <p>${e.description}</p>
              <p>posté par <b>${e.publisher.username}</b></p>` //TODO ajouter un lien vers la page utilisateur de l'User.
            )
        )
        .addTo(map);

      markers_list.push(el);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (positiongeo) {
        setLat(positiongeo.coords.latitude);
        setLng(positiongeo.coords.longitude);
      },
      function errorCallback(error) {
        //do error handling
      },
      {
        timeout: 7000,
      }
    );

    // Initialize map when component mounts
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      width: 200,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    const start = [lng, lat];

    async function getCoordinates() {
      map.flyTo({
        center: [linkFromPost.longitude, linkFromPost.latitude],
        zoom: 8,
      });
    }

    async function getRoute() {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change

      let line = "";
      let itineraire_list = itineraire.map(
        (point) => (line = line + `;${point.longitude},${point.latitude}`)
      );
      console.log(itineraire_list);
      if (itineraire.length > 0) {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]}${line}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
          { method: "GET" }
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };
        // if the route already exists on the map, we'll reset it using setData

        // otherwise, we'll make a new request
        if (map.getSource("route")) {
          map.getSource("route").setData(geojson);
        }
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
    }

    map.on("load", () => {
      addMarkers(map);

      getRoute();
      getCoordinates();
      // clearMarkers(); clear bien les markers quand on supprime tt

      // this is where the code from the next step will go
    });
    // Clean up on unmount
    return () => map.remove();
  }, [post_points, itineraire, linkFromPost]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SearchBox
        placeholder="SearchBox"
        className="col-4 btn btn-dark"
        childToParent={childToParent}
      />

      <div className="container-fluid">
        <div className="sidebarStyle">
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
        <div className="map-container" ref={mapContainerRef} />
      </div>
    </>
  );
};

export default Map;
