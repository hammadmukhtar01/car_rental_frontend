import React, { useState, useRef, useEffect } from "react";
import MapComponent from "../homePage/MapComponent";
import "./pickupdropoffModal.css";
import { Form } from "react-bootstrap";

function PickupLocationModal({
  show,
  handleButtonClick,
  cityNames,
  mileleLocations,
  updatePickupLocationMessage,
  initialSelectedLocation,
  initialInputFieldValue,
}) {
  console.log("initialInputFieldValue: ", initialInputFieldValue);
  const [selectedTab, setSelectedTab] = useState(
    initialSelectedLocation || "pick"
  );
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [inputFieldValue, setInputFieldValue] = useState("");
  const [pickupLocationMessage, setPickupLocationMessage] = useState("");
  const mapRef = useRef();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (initialInputFieldValue) {
      const [locationName, inputValue] = initialInputFieldValue.split("-");

      if (locationName && inputValue) {
        // For "deliver" tab
        const selectedCity = cityNames.find(
          (city) => city.locationName === locationName
        );
        if (selectedCity) {
          setSelectedLocation(selectedCity);
          setHoveredLocation(null);
          setInputFieldValue(inputValue);
        }
      } else {
        // For "pick" tab
        const selectedMileleLocation = mileleLocations.find(
          (location) => location.locationName === initialInputFieldValue
        );
        if (selectedMileleLocation) {
          setSelectedLocation(selectedMileleLocation);
          setHoveredLocation(null);
        }
      }
    }
  }, [initialInputFieldValue, cityNames, mileleLocations]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedLocation(null);
    setHoveredLocation(null);
  };

  const handleListHover = (location) => {
    if (!selectedLocation) {
      setHoveredLocation(location);
    }
  };

  const handleListClick = (location) => {
    setSelectedLocation(location);
    setHoveredLocation(null);
  };

  const handleInputChange = (e) => {
    setInputFieldValue(e.target.value);
    // Use Google Places Autocomplete API to get suggestions based on input value
    const input = e.target.value;
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    if (input) {
      autocompleteService.getPlacePredictions(
        { input },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // Update state with suggestions
            setSuggestions(predictions.map((prediction) => prediction.description));
          }
        }
      );
    } else {
      // Clear suggestions if input is empty
      setSuggestions([]);
    }
  };

  const handleInputSubmit = () => {
    let message = "";
    if (selectedTab === "deliver") {
      message = `${selectedLocation ? selectedLocation.locationName : ""}-${inputFieldValue}`;
    } else if (selectedTab === "pick") {
      message = `${selectedLocation ? selectedLocation.locationName : ""}`;
    }
    setPickupLocationMessage(message);
    updatePickupLocationMessage(message);

    handleButtonClick(selectedTab, {
      locationName: selectedLocation ? selectedLocation.locationName : "",
      inputValue: inputFieldValue,
    });
  };

  return (
    show && (
      <div className="custom-modal">
        <div className="col-lg-4 col-md-8 pickup-option-menus pb-3">
          <div
            className={`pickup-loc-option ${
              selectedTab === "deliver"
                ? "deliver-me-selected"
                : "deliver-me-not-selected"
            } px-2 py-2`}
            onClick={() => handleTabChange("deliver")}
          >
            <span className="deliver-to-me-text">Deliver to Me</span>
          </div>
          <div
            className={`pickup-loc-option ${
              selectedTab === "pick" ? "pickup-selected" : "pickup-not-selected"
            } px-2 py-2`}
            onClick={() => handleTabChange("pick")}
          >
            <span className="pickup-text"> Pick Up Myself</span>
          </div>
        </div>

        {selectedTab === "deliver" ? (
          <div>
            {/* Content for "Deliver to Me" */}
            <div className="row">
              <div className="col-lg-4 col-md-12 px-5 py-8">
                <h2 className="text-xl font-bold mb-4">Available Locations</h2>
                <ul className="deliver-to-me-loc-list list-unstyled">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => setInputFieldValue(suggestion)}
                      className="suggestion"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
                
                {selectedLocation && (
                  <div className="mt-5">
                    <Form.Group controlId="formKeyword">
                      <input
                        className="form-control-location mt-2 col-12"
                        required
                        type="text"
                        placeholder={`Address for ${selectedLocation.locationName}`}
                        value={inputFieldValue}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                )}
              </div>

              {/* Right Column - Map */}
              <div className="col-lg-8 col-md-12 col-sm-12 col-12 deliver-map">
                {(hoveredLocation || selectedLocation) && (
                  <MapComponent
                    locations={[hoveredLocation || selectedLocation]}
                    mapRef={mapRef}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Content for "Pick Up Myself" */}
            <div className="row">
              <div className="col-lg-4 col-md-8  px-5 py-8">
                <h2 className="text-xl font-bold mb-4">Available Locations</h2>
                <ul className="pickup-loc-list list-unstyled">
                  {mileleLocations.map((location) => (
                    <li
                      key={location.id}
                      onClick={() => handleListClick(location)}
                      onMouseEnter={() => handleListHover(location)}
                      className={`pickup-single-list ${
                        selectedLocation === location ||
                        hoveredLocation === location
                          ? "active"
                          : ""
                      }`}
                    >
                      <span className="mr-2">🛫</span>
                      {location.locationName}
                      <hr />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column - Map */}
              <div className="col-lg-8 col-md-12 col-sm-12 col-12 pick-map">
                {(hoveredLocation || selectedLocation) && (
                  <MapComponent
                    locations={[hoveredLocation || selectedLocation]}
                    mapRef={mapRef}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="button-container rent-button-in-map">
          <button className="animated-button" onClick={handleInputSubmit}>
            <span className="button-text-span">
              <span className="transition"></span>
              <span className="gradient"></span>
              <span className="label">Rent Now</span>
            </span>
          </button>
        </div>
      </div>
    )
  );
}

export default PickupLocationModal;
