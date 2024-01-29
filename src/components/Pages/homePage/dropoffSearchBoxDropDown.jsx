import React, { useState, useRef } from "react";
import { Tab } from "@headlessui/react";
import MapComponent from "../homePage/MapComponent";
import { Form } from "react-bootstrap";
import "./pickupdropoffModal.css";

function DropoffLocationModal({
  show,
  handleButtonClick,
  cityNames,
  mileleLocations,
  updateDropoffLocationMessage,
}) {
  const [selectedTab, setSelectedTab] = useState("deliver");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [inputFieldValue, setInputFieldValue] = useState("");
  const [dropoffLocationMessage, setDropoffLocationMessage] = useState("");
  const mapRef = useRef(null);

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
      message = `${
        selectedLocation ? selectedLocation.locationName : ""
      }`;
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
        <Tab.Group>
          <Tab.List className="col-3 dropoff-option-menus pb-3">
            <Tab
              className={({ selected }) =>
                selected
                  ? "dropoff-loc-option deliver-me-selected px-2 py-2"
                  : "dropoff-loc-option deliver-me-not-selected px-2 py-2"
              }
              onClick={() => handleTabChange("deliver")}
            >
              <span className="deliver-to-me-text">Deliver to Me</span>
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "dropoff-loc-option dropoff-selected px-2 py-2"
                  : "dropoff-loc-option dropoff-not-selected px-2 py-2"
              }
              onClick={() => handleTabChange("pick")}
            >
              <span className="dropoff-text"> Pick Up Myself</span>
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              {/* Content for "Deliver to Me" */}
              <div className="row">
                <div className="col-4 px-5 py-8">
                  <h2 className="text-xl font-bold mb-4">
                    Available Locations
                  </h2>
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
                      {/* <button onClick={handleInputSubmit}>Submit</button> */}
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
            </Tab.Panel>

            <Tab.Panel>
              {/* Content for "Pick Up Myself" */}
              <div className="row">
                <div className="col-4 px-5 py-8">
                  <h2 className="text-xl font-bold mb-4">
                    Available Locations
                  </h2>
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
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

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
