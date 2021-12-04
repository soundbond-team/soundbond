import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl";
import { useSelector } from "react-redux";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ post_points }) => {
  const mapContainerRef = useRef(null);
  const itineraire = useSelector((state) => state.itinerairereducer);
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    console.log(itineraire);
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
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "geojson",
          geometry: {
            type: "",
            coordinates: [-77.032, 38.913],
          },
          properties: {
            title: "",
            description: "",
          },
        },
      ],
    };
    geojson.features.shift();
    Object.keys(post_points).map(function (key, index) {
      return geojson.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            post_points[key].publishing.soundlocation.longitude,
            post_points[key].publishing.soundlocation.latitude,
          ],
        },
        properties: {
          title:
            post_points[key].publishing.soundlocation.latitude +
            ", " +
            post_points[key].publishing.soundlocation.longitude,
          description: post_points[key].description,
          publisher_name: post_points[key].publisher.username,
        },
      });
    });

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

    for (const { geometry, properties } of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker ";

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h5>${properties.title}</h5>
              <p>${properties.description}</p>
              <p>posté par <b>${properties.publisher_name}</b></p>` //TODO ajouter un lien vers la page utilisateur de l'User.
            )
        )
        .addTo(map);
    }

    const start = [lng, lat];

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

      // add turn instructions here at the end
    }

    map.on("load", () => {
      // make an initial directions request that
      // starts and ends at the same location

      // Add starting point to the map
      getRoute();

      // this is where the code from the next step will go
    });
    // Clean up on unmount
    return () => map.remove();
  }, [post_points, itineraire]); // eslint-disable-line react-hooks/exhaustive-deps

  //Functions servant à l'itineraire

  return (
    <>
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
