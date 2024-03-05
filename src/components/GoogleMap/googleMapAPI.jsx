import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./googleMapAPI.css";

const MapComponent = ({ selectedLocationss }) => {
  const REACT_APP_GOOGLE_MAPS_KEY = "AIzaSyAePasC96mT2mWIMAGi0aPUIAL5hKRnhOg";
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div style={{ marginTop: "50px" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "800px",
        }}
        center={selectedLocationss}
        zoom={13}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={selectedLocationss}
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
