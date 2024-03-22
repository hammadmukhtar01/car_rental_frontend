/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import MapComponent from "../../GoogleMap/googleMapAPI";
import "./pickupdropoffModal.css";
import { Form } from "react-bootstrap";
import SearchLocationInput from "../../GoogleMap/googleAutoCompleteAPI";
import UseGlobalFormFields from "../Utils/useGlobalFormFields";
// import FormDataContext from "../Utils/FormDataContext";

function PickupLocationModal({
  show,
  handleButtonClick,
  updatePickupLocationMessage,
  inputPickupFieldValue,
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

  console.log(
    "initialInputFieldValue:--12121212121-- ",
    initialInputFieldValue
  );
  const [selectedTab, setSelectedTab] = useState("");

  const [selectedLocationName, setSelectedLocationName] = useState(
    initialInputFieldValue || ""
  );
  const [pickupLocationState, setPickupLocationState] = useState("");
  const [deliverToAddressValue, setDeliverToAddressValue] = useState("");

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

  useEffect(() => {
    const inputs = document.querySelectorAll(".inputgroup input");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus, true);
      input.addEventListener("blur", handleBlur, true);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus, true);
        input.removeEventListener("blur", handleBlur, true);
      });
    };
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    handleFieldChange("selectedTabPickUp", tab);
    if (tab === "deliver") {
      handleFieldChange("pickupLocationStateV1");
    }
  };

  const { formFields, handleFieldChange } = UseGlobalFormFields({
    deliveryMapLocPickUp: "",
    selectedTabPickUp: "",
    completeAddress: deliverToAddressValue || "",
    pickupLocationStateV1: pickupLocationState || "",
    pickupInputMessageV1: updatePickupLocationMessage || "",
  });

  useEffect(() => {
    setSelectedTab(formFields.selectedTabPickUp);
  }, [formFields?.selectedTabPickUp]);

  useEffect(() => {
    setSelectedTab(formFields?.selectedTabPickUp || "pick");
  }, [formFields?.selectedTabPickUp]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
    handleInputFieldChange(value);
  };

  const handleInputSubmit = () => {
    let message = "";
    console.log("Selected tab Value is-------:", selectedTab);
    if (selectedTab === "deliver") {
      message = `${formFields.deliveryMapLocPickUp || ""}`;
      console.log("1---Messg before update value...", message);
      handleFieldChange("deliveryMapLocPickUp", message);
    } else if (selectedTab === "pick") {
      message = `Samari Retails - Milele head office AF-07`;
      handleFieldChange("pickupInputMessageV1", message);
    }
    console.log("Select tab------------------", selectedTab)

      handleFieldChange("selectedTabPickUp", selectedTab);

    if (formFields) {
      if (formFields.selectedTabPickUp === "pick") {
        updatePickupLocationMessage(
          formFields?.pickupInputMessageV1 ||
            "Samari Retails - Milele head office AF-07"
        );
      } else {
        updatePickupLocationMessage(
          formFields?.deliveryMapLocPickUp ||
            "Samari Retails - Milele head office AF-07"
        );
      }
    }

    handleButtonClick(selectedTab || "pick", {
      inputValue: inputPickupFieldValue,
    });
  };

  const handleStateChange = (stateName) => {
    handleFieldChange("pickupLocationStateV1", stateName);
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
                          previousLocationValue={
                            formFields.deliveryMapLocPickUp
                          }
                          // setLocationName={setSelectedLocationName}
                          setLocationName={(value) =>
                            handleFieldChange("deliveryMapLocPickUp", value)
                          }
                          setSelectedLocationss={setSelectedLocationss}
                          onStateChange={handleStateChange}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-lg-4">
                      <div className="inputgroup">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="inputPickupFieldValue"
                          name="inputPickupFieldValue"
                          required
                          // value={inputPickupFieldValue}
                          value={formFields?.inputPickupFieldValue || ""}
                          onChange={handleInputChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="inputPickupFieldValue">
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
