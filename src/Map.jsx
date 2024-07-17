import React, { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Col, Container, Row } from "react-bootstrap";
import "leaflet/dist/leaflet.css";

// Set the default icon path for Leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const mapContainerStyle = {
  height: "50vh",
  overflow: "auto",
};
const center = {
  lat: 25.1673265,
  lng: 55.4044733,
};

const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      onClick({ lat, lng });
    },
  });
  return null;
};

function Map() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [locationDetails, setLocationDetails] = useState({
    name: "",
    city: "",
    district: "",
    country: "",
  });

  const onMapClick = useCallback(async (coords) => {
    const { lat, lng } = coords;

    // Use Google's Geocoding API with language parameter set to English
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&language=en`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const { address_components, formatted_address } = result;

        let city = address_components.find(comp => comp.types.includes('locality'))?.long_name;
        if (!city) {
          city = address_components.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name;
        }

        setSelectedPlace({ lat, lng });
        setLocationDetails({
          name: formatted_address || "",
          city: city || "",
          district: address_components.find(comp => comp.types.includes('sublocality'))?.long_name || "",
          country: address_components.find(comp => comp.types.includes('country'))?.long_name || "",
        });

        console.log("Selected Place:", { lat, lng });
        console.log("Location Details:", {
          name: formatted_address,
          city: city,
          district: address_components.find(comp => comp.types.includes('sublocality'))?.long_name,
          country: address_components.find(comp => comp.types.includes('country'))?.long_name,
        });
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  }, []);

  return (
    <Container>
      <br />
      <MapContainer center={center} zoom={12} style={mapContainerStyle}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler onClick={onMapClick} />
        {selectedPlace && (
          <Marker position={[selectedPlace.lat, selectedPlace.lng]} />
        )}
      </MapContainer>

      <form className="container mt-5">
        <div className="form-group row">
          <label htmlFor="locationName" className="col-3 col-form-label">
            <b> Location Name:</b>
          </label>
          <div className="col-9">
            <input
              type="text"
              className="form-control p-3"
              id="locationName"
              placeholder="Enter location name"
              readOnly
              value={locationDetails.name}
            />
          </div>
        </div>
        <Row>
          <Col className="form-group row">
            <label htmlFor="district" className="col-12 col-form-label">
              <b>District:</b>
            </label>
            <div className="col-12">
              <input
                type="text"
                className="form-control p-3"
                id="district"
                placeholder="Enter district"
                readOnly
                value={locationDetails.district}
              />
            </div>
          </Col>

          <Col className="form-group row">
            <label htmlFor="city" className="col-12 col-form-label">
              <b> City:</b>
            </label>
            <div className="col-12">
              <input
                type="text"
                className="form-control p-3"
                id="city"
                placeholder="Enter city"
                readOnly
                value={locationDetails.city}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="form-group row">
            <label htmlFor="buildingNumber" className="col-12 col-form-label">
              <b> Building Number:</b>
            </label>
            <div className="col-12">
              <input
                type="text"
                className="form-control p-3"
                id="buildingNumber"
                placeholder="Enter building number"
              />
            </div>
          </Col>
          <Col className="form-group row">
            <label htmlFor="flatNumber" className="col-12 col-form-label">
              <b> Flat Number:</b>
            </label>
            <div className="col-12">
              <input
                type="text"
                className="form-control p-3"
                id="flatNumber"
                placeholder="Enter flat number"
              />
            </div>
          </Col>
        </Row>
        <div className="form-group row">
          <label htmlFor="addressDetails" className="col-sm-2 col-form-label">
            <b> Additional Details:</b>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control p-3"
              id="addressDetails"
              placeholder="Enter address details"
            />
          </div>
        </div>
      </form>
    </Container>
  );
}

export default Map;
