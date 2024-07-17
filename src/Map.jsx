import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Col, Row } from "react-bootstrap";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};
const center = {
  lat: 25.1673265,
  lng: 55.4044733,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeId: "hybrid", 
};

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAePasC96mT2mWIMAGi0aPUIAL5hKRnhOg",
    libraries,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);

  const onMapClick = useCallback(async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Fetch place details using OpenCage Data API
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      console.log("OpenCage Data Result: ", result);

      const { components, formatted } = result;
      const addressParts = [];

      if (components.house_number) {
        addressParts.push(components.house_number);
      }
      if (components.road) {
        addressParts.push(components.road);
      }
      if (components.neighbourhood) {
        addressParts.push(components.neighbourhood);
      }
      if (components.suburb) {
        addressParts.push(components.suburb);
      }
      if (components.city) {
        addressParts.push(components.city);
      }
      if (components.state) {
        addressParts.push(components.state);
      }
      if (components.country) {
        addressParts.push(components.country);
      }

      const detailedAddress = addressParts.join(", ");

      const formattedParts = formatted.split(", ");
      console.log("formattedParts : ", formattedParts);

      let city = components.state;

      console.log("city : ", city);
      if (!city && formattedParts.length > 2) {
        city = formattedParts[formattedParts.length - 3];
        if (city.includes(" ")) {
          city = city.split(" ")[0];
        }
      }

      setSelectedPlace({ lat, lng });
      setLocationDetails({
        name: formatted,
        detailedAddress,
        city: components.state,
        district: components.suburb || components.neighbourhood,
        country: components.country,
      });

      console.log({
        name: formatted,
        detailedAddress,
        city: components.state,
        district: components.suburb || components.neighbourhood,
        country: components.country,
      });
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div>
      <br />
      <br />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        {selectedPlace && (
          <Marker
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          />
        )}
      </GoogleMap>

      <form className="container mt-5">
        <div className="form-group row">
          <label htmlFor="locationName" className="col-3 col-form-label">
            Location Name:
          </label>
          <div className="col-9">
            <input
              type="text"
              className="form-control p-3"
              id="locationName"
              placeholder="Enter location name"
              value={
                selectedPlace && locationDetails
                  ? locationDetails.detailedAddress
                  : ""
              }
            />
          </div>
        </div>
        <Row>
          <Col className="form-group row">
            <label htmlFor="district" className="col-12 col-form-label">
              District:
            </label>
            <div className="col-12">
              <input
                type="text"
                className="form-control p-3"
                id="district"
                placeholder="Enter district"
                value={
                  selectedPlace && locationDetails
                    ? locationDetails.district
                    : ""
                }
              />
            </div>
          </Col>

          <Col className="form-group row">
            <label htmlFor="city" className="col-12 col-form-label">
              City:
            </label>
            <div className="col-12">
              <input
                type="text"
                className="form-control p-3"
                id="city"
                placeholder="Enter city"
                value={
                  selectedPlace && locationDetails ? locationDetails.city : ""
                }
              />
            </div>
          </Col>
        </Row>

       
        <Row>
          <Col className="form-group row">
            <label htmlFor="buildingNumber" className="col-12 col-form-label">
              Building Number:
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
              Flat Number:
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
            Additional Details:
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
    </div>
  );
}

export default Map;
