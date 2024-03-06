import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./googleMapAPI.css";

const SearchLocationInput = ({ setSelectedLocationss }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false); 
  const googleMapsApiKey = "AIzaSyAePasC96mT2mWIMAGi0aPUIAL5hKRnhOg";

  useEffect(() => {
    if (!googleMapsApiKey) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [googleMapsApiKey]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: e.target.value, componentRestrictions: { country: "AE" } },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
            setShowSuggestions(true);
          }
        }
      );
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectLocation = (placeId) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place
      ) {
        setSelectedLocation(place);
        setInputValue(place.name);
        setSelectedLocationss({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setSuggestions([]);
        setShowSuggestions(false);
      }
    });
  };

  const handleFocus = (e) => {
    const inputGroup = e.target.closest(".inputgroup");
    if (inputGroup) {
      inputGroup.classList.add("input-filled");
    }
  };

  const handleBlur = (e) => {
    const inputGroup = e.target.closest(".inputgroup");
    if (inputGroup) {
      if (e.target.value === "") {
        inputGroup.classList.remove("input-filled");
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Form.Group as={Row}>
        <Col>
          {/* <Form.Control
            type="text"
            className="form-control-location mt-2 col-12"
            placeholder="Enter location"
            value={inputValue}
            onChange={handleInputChange}
          /> */}

          <div className="inputgroup col-lg-12 col-md-12 col-sm-12 col-12">
            <input
              type="text"
              autoComplete="off"
              className="form-control"
              id="locationName"
              name="locationName"
              required
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <label htmlFor="locationName">Location</label>
          </div>

          {showSuggestions && (
            <ul
              className="list-group suggested-locations-div"
            >
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="list-group-item d-flex align-items-center"
                  onClick={() => handleSelectLocation(suggestion.place_id)}
                >
                  <FaMapMarkerAlt className="mr-2" />
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Form.Group>
      <Row>
        <Col>
          {selectedLocation && (
            <div>
              {/* <p>Latitude: {selectedLocation.geometry.location.lat()}</p> */}
              {/* <p>Longitude: {selectedLocation.geometry.location.lng()}</p> */}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchLocationInput;
