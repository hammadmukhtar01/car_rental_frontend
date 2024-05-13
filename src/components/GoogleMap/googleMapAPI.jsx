/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

function MapComponent({ selectedLocationss }) {
  const [lat, setLat] = useState(selectedLocationss?.lat || "25.177316");
  const [lng, setLng] = useState(selectedLocationss?.lng || "55.376264");

  useEffect(() => {
    setLat(selectedLocationss?.lat);
    setLng(selectedLocationss?.lng);
  }, [selectedLocationss]);

  useEffect(() => {
    const map1 = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: parseFloat(lat), lng: parseFloat(lng) },
      zoom: 13,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: parseFloat(lat), lng: parseFloat(lng) },
      map: map1,
      title: "Your Location",
    });
  }, [lat, lng]);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
}

export default MapComponent;
