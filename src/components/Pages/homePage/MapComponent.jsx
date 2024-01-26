// In MapComponent.js
import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";

function MapComponent({ locations, mapRef, defaultLat, defaultLon }) {
  const defaultCenter = useMemo(() => {
    return locations.length > 0 ? [locations[0].lat, locations[0].lng] : [25.276987, 55.296249];
  }, [locations]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(defaultCenter, 10);
    }
  }, [locations, mapRef, defaultCenter]);

  return (
    <MapContainer center={defaultCenter} ref={mapRef} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((location) => (
        <Marker
          key={location.id || location}
          position={[location.lat, location.lng]}
        >
          <Popup>{location.locationName}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
