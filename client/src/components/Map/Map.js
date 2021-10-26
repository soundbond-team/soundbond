import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hlbGxzaG9jazIzIiwiYSI6ImNrdHpyeml5aTBtN24yb3BjNnlyMzF0ZXMifQ.jVBnWwAN0suAcWniseo60g";

const Map = ({ post_points }) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "",
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
          publisher_name:
            post_points[key].publisher.first_name +
            " " +
            post_points[key].publisher.last_name,
        },
      });
    });
    console.log(geojson);
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
      el.className = "marker";

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
    // Clean up on unmount
    return () => map.remove();
  }, [post_points]); // eslint-disable-line react-hooks/exhaustive-deps

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
