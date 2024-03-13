import React, { useState, useRef, useEffect } from "react";
import MapComponent from "../../GoogleMap/googleMapAPI";
import "./pickupdropoffModal.css";
import { Form } from "react-bootstrap";
import SearchLocationInput from "../../GoogleMap/googleAutoCompleteAPI";

function PickupLocationModal({
  show,
  handleButtonClick,
  cityNames,
  mileleLocations,
  updatePickupLocationMessage,
  initialSelectedLocation,
  initialInputFieldValue,
}) {
  const [selectedLocationss, setSelectedLocationss] = useState({
    lat: 25.177316,
    lng: 55.376264,
  });

  const [pickUpLocationss, ] = useState({
    lat: 25.177316,
    lng: 55.376264,
  });

  console.log("initialInputFieldValue: ", initialInputFieldValue);
  const [selectedTab, setSelectedTab] = useState(
    initialSelectedLocation || "deliver"
  );
  const [locationDetail, setLocationDetail] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [pickupLocationName, setPickupLocationName] =
    useState("Samari retails");
  const [pickUpLocationDetail, setPickUpLocationDetail] = useState(
    "Milele head office AF-07"
  );
  const [inputFieldValue, setInputFieldValue] = useState("");
  const [pickupLocationMessage, setPickupLocationMessage] = useState("");
  const mapRef = useRef();

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

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedLocation(null);
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
            <div className="">
              <div className="px-5 py-8">
                <h2 className="text-xl font-bold mb-4">Select Location</h2>

                <div className="mt-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <Form.Group controlId="formKeyword">
                        <SearchLocationInput
                          onChange={handleInputChange}
                          setSelectedLocationss={setSelectedLocationss}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-lg-4">
                      <div className="inputgroup">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="locationDetail"
                          name="locationDetail"
                          required
                          value={locationDetail}
                          onChange={(e) => {
                            setLocationDetail(e.target.value);
                          }}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="locationDetail">Complete Address</label>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="button-container rent-button-in-map text-center mt-3 mb-2">
                        <button
                          type="button"
                          className="animated-button pt-2 pb-2"
                          onClick={handleInputSubmit}
                        >
                          <span className="button-text-span">
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">Start Booking</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Map */}
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 deliver-map mt-3 mb-3 ">
                <MapComponent selectedLocationss={selectedLocationss} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Content for "Pick Up Myself" */}
            <div className="">
              <div className="px-5 py-8">
                <h2 className="text-xl font-bold mb-4">Select Location</h2>
                <div className="mt-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="readOnlyInputGroup">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="pickupLocationName"
                          name="pickupLocationName"
                          required
                          readOnly
                          value={pickupLocationName}
                          onChange={(e) => {
                            setPickupLocationName(e.target.value);
                          }}
                        />
                        <label htmlFor="pickupLocationName">Location</label>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="readOnlyInputGroup">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="pickUpLocationDetail"
                          name="pickUpLocationDetail"
                          readOnly
                          required
                          value={pickUpLocationDetail}
                          onChange={(e) => {
                            setPickUpLocationDetail(e.target.value);
                          }}
                        />
                        <label htmlFor="pickUpLocationDetail">
                          Address Detail
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="button-container rent-button-in-map text-center mt-3 mb-2">
                        <button
                          type="button"
                          className="animated-button pt-2 pb-2"
                          onClick={handleInputSubmit}
                        >
                          <span className="button-text-span">
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">Start Booking</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Map */}
              <div className="pick-map mt-3 mb-3 ">
                <MapComponent selectedLocationss={pickUpLocationss} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default PickupLocationModal;
