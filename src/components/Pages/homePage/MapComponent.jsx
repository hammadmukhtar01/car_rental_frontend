import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect, useMemo } from "react";
import L from "leaflet";
import markerIconUrl from "../../images/mapPinIcon.gif";
import { useNavigate } from "react-router-dom";

function MapComponent({ locations, mapRef, defaultLat, defaultLon }) {
  const navigate = useNavigate();

  const defaultCenter = useMemo(() => {
    return locations.length > 0
      ? [locations[0].lat, locations[0].lng]
      : [25.276987, 55.296249];
  }, [locations]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(defaultCenter, 10);
    }
  }, [locations, mapRef, defaultCenter]);

  const customIcon = new L.Icon({
    iconUrl: markerIconUrl,
    iconSize: [50, 80],
    popupAnchor: [1, -34],
  });

  const handleMarkerClick = (location) => {
    const lat = location.lat;
    const lng = location.lng;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };
  

  return (
    <MapContainer
      center={defaultCenter}
      ref={mapRef}
      zoom={20}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((location) => (
        <Marker
          key={location.id || location}
          position={[location.lat, location.lng]}
          icon={customIcon}
          eventHandlers={{
            click: () => handleMarkerClick(location),
          }}
        >
          <Popup>{location.locationName}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
