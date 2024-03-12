/* eslint-disable no-unused-vars */
// import React from "react";
// import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
// // import { REACT_APP_GOOGLE_MAPS_KEY } from "../constants/constants";

// const MapComponent = ({ selectedLocatio }) => {
//   console.log("lat and long are: ", selectedLocatio)
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyAePasC96mT2mWIMAGi0aPUIAL5hKRnhOg",
//   });
//   const mapRef = React.useRef();
//   const onMapLoad = React.useCallback((map) => {
//     mapRef.current = map;
//   }, []);
//   if (loadError) return "Error";
//   if (!isLoaded) return "Maps";

//   return (
//     <div style={{ marginTop: "50px" }}>
//       <GoogleMap
//         mapContainerStyle={{
//           height: "800px",
//         }}
//         center={selectedLocatio}
//         zoom={13}
//         onLoad={onMapLoad}
//       >
//         <MarkerF
//           position={selectedLocatio}
//           icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
//         />
//       </GoogleMap>
//     </div>
//   );
// };

// export default MapComponent;

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

