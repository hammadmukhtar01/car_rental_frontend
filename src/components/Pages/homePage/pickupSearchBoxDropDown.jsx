import React, { useState } from "react";
import MapComponent from "../../GoogleMap/googleMapAPI";
import "./pickupdropoffModal.css";
import { Form } from "react-bootstrap";
import SearchLocationInput from "../../GoogleMap/googleAutoCompleteAPI";

function PickupLocationModal({
  show,
  handleButtonClick,
  updatePickupLocationMessage,
  inputFieldValue,
  setInputFieldValue,
  initialSelectedLocation,
  initialInputFieldValue,
  handleInputFieldChange,
}) {
  const [selectedLocationss, setSelectedLocationss] = useState({
    lat: 25.177316,
    lng: 55.376264,
  });

  const [pickUpLocationss] = useState({
    lat: 25.177316,
    lng: 55.376264,
  });

  console.log("initialInputFieldValue: ", initialInputFieldValue);
  const [selectedTab, setSelectedTab] = useState(
    initialSelectedLocation || "deliver"
  );

  const [selectedLocationName, setSelectedLocationName] = useState(
    initialInputFieldValue || ""
  );
  const [pickupLocationState, setPickupLocationState] = useState("");

  console.log("Old loc is: ", selectedLocationName);

  // const [pickupLocationName, setPickupLocationName] =
  //   useState("Samari retails");
  // const [pickUpLocationDetail, setPickUpLocationDetail] = useState(
  //   "Milele head office AF-07"
  // );

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
  };

  const handleInputChange = (e) => {
    handleInputFieldChange(e.target.value);
  };

  const handleInputSubmit = () => {
    let message = "";
    console.log("Selected tab Value is-------:", selectedTab);
    if (selectedTab === "deliver") {
      message = `${selectedLocationName ? selectedLocationName : ""}`;
    } else if (selectedTab === "pick") {
      message = `Samari Retails - Milele head office AF-07`;
    }
    updatePickupLocationMessage(message);

    handleButtonClick(selectedTab, {
      // locationName: selectedLocationName ? selectedLocationName : "",
      inputValue: inputFieldValue,
    });
  };

  const handleStateChange = (stateName) => {
    setPickupLocationState(stateName);
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
                          // onChange={handleInputChange}
                          previousLocationValue={selectedLocationName}
                          setLocationName={setSelectedLocationName}
                          setSelectedLocationss={setSelectedLocationss}
                          onStateChange={handleStateChange}
                        />
                      </Form.Group>
                    </div>
                    <p>State: {pickupLocationState}</p>

                    <div className="col-lg-4">
                      <div className="inputgroup">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="inputFieldValue"
                          name="inputFieldValue"
                          required
                          value={inputFieldValue}
                          onChange={handleInputChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="inputFieldValue">
                          Complete Address
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
                          value={"Samari retail111"}
                          // onChange={(e) => {
                          //   setPickupLocationName(e.target.value);
                          // }}
                        />
                        <label htmlFor="pickupLocationName">
                          PickUp Location
                        </label>
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
                          value={"Milele head office AF-07"}
                          // onChange={(e) => {
                          //   setPickUpLocationDetail(e.target.value);
                          // }}
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
