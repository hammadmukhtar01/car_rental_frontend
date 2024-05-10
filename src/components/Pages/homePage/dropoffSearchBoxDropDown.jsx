/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import MapComponent from "../../GoogleMap/googleMapAPI";
import "./pickupdropoffModal.css";
import { Form } from "react-bootstrap";
import SearchLocationInput from "../../GoogleMap/googleAutoCompleteAPI";
import UseGlobalFormFields from "../Utils/useGlobalFormFields";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DropoffLocationModal({
  show,
  handleButtonClick,
  updateDropoffLocationMessage,
  initialInputFieldValue,
  inputDropoffFieldValue,
  handleInputFieldChange,
}) {
  const [selectedLocationss, setSelectedLocationss] = useState({
    lat: 25.177316,
    lng: 55.376264,
  });

  const [dropOffLocationss] = useState({
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
  const [dropoffLocationState, setPickupLocationState] = useState("");
  const [deliverToAddressValue, setDeliverToAddressValue] = useState("");

  console.log("Old loc is: ", selectedLocationName);

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

  const { formFields, handleFieldChange } = UseGlobalFormFields({
    deliveryMapLocDropOff: "",
    selectedTabDropOff: "deliver" || "",
    completeAddress: deliverToAddressValue || "",
    dropoffLocationStateV1: dropoffLocationState || "",
    dropoffInputMessageV1: updateDropoffLocationMessage || "",
  });

  useEffect(() => {
    setSelectedTab(formFields.selectedTabDropOff);
  }, [formFields?.selectedTabDropOff]);

  useEffect(() => {
    setSelectedTab(formFields?.selectedTabDropOff || "pick");
  }, [formFields?.selectedTabDropOff]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    handleFieldChange("selectedTabDropOff", tab);
    if (tab === "deliver") {
      handleFieldChange("dropoffLocationStateV1");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
    handleInputFieldChange(value);
  };

  const handleInputSubmit = () => {
    if (selectedTab === "deliver") {
      if (!formFields?.deliveryMapLocDropOff?.trim()) {
        const errorMessage = "Please fill the required field.";
        toast.error(errorMessage, {
          autoClose: 3000,
          style: {
            color: "#e87a28",
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
        });
        return;
      }
    }
    let message = "";
    console.log("Selected tab Value is-------:", selectedTab);
    if (selectedTab === "deliver") {
      message = `${formFields.deliveryMapLocDropOff || ""}`;
      console.log("1---Messg before update value...", message);
      handleFieldChange("deliveryMapLocDropOff", message);
    } else if (selectedTab === "pick") {
      message = `Samari Retails - Milele head office AF-07`;
      handleFieldChange("dropoffInputMessageV1", message);
      handleFieldChange("pickupLocationStateV1", "Dubai");
    }

    handleFieldChange("selectedTabDropOff", selectedTab);

    if (formFields) {
      if (formFields.selectedTabDropOff === "pick") {
        updateDropoffLocationMessage(
          formFields?.dropoffInputMessageV1 ||
            "Samari Retails - Milele head office AF-07"
        );
      } else {
        updateDropoffLocationMessage(
          formFields?.deliveryMapLocDropOff ||
            "Samari Retails - Milele head office AF-07"
        );
      }
    }

    console.log(
      "Final new --- updateDropoffLocationMessage v ---- is: ----",
      updateDropoffLocationMessage
    );

    handleButtonClick(selectedTab, {
      inputValue: inputDropoffFieldValue,
    });
  };

  const handleStateChange = (stateName) => {
    handleFieldChange("dropoffLocationStateV1", stateName);
  };

  return (
    show && (
      <div className="custom-modal">
        <div className="col-lg-4 col-md-8 dropoff-option-menus pb-3">
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
              selectedTab === "pick"
                ? "dropoff-selected"
                : "dropoff-not-selected"
            } px-2 py-2`}
            onClick={() => handleTabChange("pick")}
          >
            <span className="dropoff-text"> Pick Up Myself</span>
          </div>
        </div>

        {selectedTab === "deliver" ? (
          <div>
            {/* Content for "Deliver to Me" */}
            <div className="">
              <div className=" px-5 py-8">
                <h2 className="text-xl font-bold mb-4">Select Location</h2>

                <div className="mt-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <Form.Group controlId="formKeyword">
                        {/* <SearchLocationInput
                          onChange={handleInputChange}
                          setSelectedLocationss={setSelectedLocationss}
                        /> */}
                        <SearchLocationInput
                          previousLocationValue={
                            formFields.deliveryMapLocDropOff
                          }
                          setLocationName={(value) =>
                            handleFieldChange("deliveryMapLocDropOff", value)
                          }
                          setSelectedLocationss={setSelectedLocationss}
                          onStateChange={handleStateChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-lg-4">
                      <div className="inputgroup">
                        {/* <input
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
                        /> */}
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="inputDropoffFieldValue"
                          name="inputDropoffFieldValue"
                          required
                          value={formFields?.inputDropoffFieldValue || ""}
                          onChange={handleInputChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="inputDropoffFieldValue">
                          Complete Address
                        </label>{" "}
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <button
                        onClick={handleInputSubmit}
                        className="map-loc-middle py-3"
                      >
                        <span className="animate-button btn4">
                          Start Booking
                        </span>
                      </button>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Map */}
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 deliver-map mt-3 mb-3">
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
                        {/* <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="dropoffLocationName"
                          name="dropoffLocationName"
                          required
                          readOnly
                          value={dropoffLocationName}
                          onChange={(e) => {
                            setDropoffLocationName(e.target.value);
                          }}
                        /> */}
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="dropoffLocationName"
                          name="dropoffLocationName"
                          required
                          readOnly
                          value={"Samari retail111"}
                        />

                        <label htmlFor="dropoffLocationName">Location</label>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="readOnlyInputGroup">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="dropOffLocationDetail"
                          name="dropOffLocationDetail"
                          readOnly
                          required
                          // value={dropOffLocationDetail}
                          value={"Milele head office AF-07"}
                          // onChange={(e) => {
                          //   setPickUpLocationDetail(e.target.value);
                          // }}
                        />
                        <label htmlFor="dropOffLocationDetail">
                          Address Detail
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <button
                        onClick={handleInputSubmit}
                        className="map-loc-middle py-3"
                      >
                        <span className="animate-button btn4">
                          Start Booking
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Map */}
              <div className="pick-map mt-3 mb-3 ">
                <MapComponent selectedLocationss={dropOffLocationss} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default DropoffLocationModal;
