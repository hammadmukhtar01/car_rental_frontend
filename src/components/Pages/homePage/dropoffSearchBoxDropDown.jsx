import React, { useState, useRef, useEffect } from "react";
import MapComponent from "../homePage/MapComponent";
import "./pickupdropoffModal.css";
import { Form } from "react-bootstrap";

function DropoffLocationModal({
  show,
  handleButtonClick,
  cityNames,
  mileleLocations,
  updateDropoffLocationMessage,
  initialSelectedLocation,
  initialInputFieldValue,
}) {
  console.log("initialInputFieldValue: ", initialInputFieldValue)
  const [selectedTab, setSelectedTab] = useState(
    initialSelectedLocation || "pick"
  );
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [inputFieldValue, setInputFieldValue] = useState("");
  const [dropoffLocationMessage, setDropoffLocationMessage] = useState("");
  const mapRef = useRef();

  useEffect(() => {
    if (initialInputFieldValue) {
      const [locationName, inputValue] = initialInputFieldValue.split("-");
  
      if (locationName && inputValue) {
        // For "deliver" tab
        const selectedCity = cityNames.find(city => city.locationName === locationName);
        if (selectedCity) {
          setSelectedLocation(selectedCity);
          setHoveredLocation(null);
          setInputFieldValue(inputValue);
        }
      } else {
        // For "pick" tab
        const selectedMileleLocation = mileleLocations.find(location => location.locationName === initialInputFieldValue);
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
  };

  const handleInputSubmit = () => {
    let message = "";
    if (selectedTab === "deliver") {
      message = `${
        selectedLocation ? selectedLocation.locationName : ""
      }-${inputFieldValue}`;
    } else if (selectedTab === "pick") {
      message = `${selectedLocation ? selectedLocation.locationName : ""}`;
    }
    setDropoffLocationMessage(message);
    updateDropoffLocationMessage(message);

    handleButtonClick(selectedTab, {
      locationName: selectedLocation ? selectedLocation.locationName : "",
      inputValue: inputFieldValue,
    });
  };

  return (
    show && (
      <div className="custom-modal">
        <div className="col-4 dropoff-option-menus pb-3">
          <div
            className={`dropoff-loc-option ${
              selectedTab === "deliver"
                ? "deliver-me-selected"
                : "deliver-me-not-selected"
            } px-2 py-2`}
            onClick={() => handleTabChange("deliver")}
          >
            <span className="deliver-to-me-text">Deliver to Me</span>
          </div>
          <div
            className={`dropoff-loc-option ${
              selectedTab === "pick" ? "dropoff-selected" : "dropoff-not-selected"
            } px-2 py-2`}
            onClick={() => handleTabChange("pick")}
          >
            <span className="dropoff-text"> Pick Up Myself</span>
          </div>
        </div>

        {selectedTab === "deliver" ? (
          <div>
            {/* Content for "Deliver to Me" */}
            <div className="row">
              <div className="col-4 px-5 py-8">
                <h2 className="text-xl font-bold mb-4">Available Locations</h2>
                <ul className="deliver-to-me-loc-list list-unstyled">
                  {cityNames.map((city) => (
                    <li
                      key={city.id}
                      onClick={() => handleListClick(city)}
                      onMouseEnter={() => handleListHover(city)}
                      className={`deliver-to-me-single-list ${
                        selectedLocation === city || hoveredLocation === city
                          ? "active"
                          : ""
                      }`}
                    >
                      <span className="mr-2">🛫</span>
                      {city.locationName}
                      <hr />
                    </li>
                  ))}
                </ul>
                {selectedLocation && (
                  <div className="mt-5">
                    <Form.Group controlId="formKeyword">
                      <input
                        className="form-control-location mt-2 col-12"
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
              <div className="col-8">
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
              <div className="col-4 px-5 py-8">
                <h2 className="text-xl font-bold mb-4">Available Locations</h2>
                <ul className="dropoff-loc-list list-unstyled">
                  {mileleLocations.map((location) => (
                    <li
                      key={location.id}
                      onClick={() => handleListClick(location)}
                      onMouseEnter={() => handleListHover(location)}
                      className={`dropoff-single-list ${
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
              <div className="col-8">
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

        <div className="button-container">
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

export default DropoffLocationModal;
