import React, { useState, useEffect } from "react";
import MapComponent from "../../GoogleMap/googleMapAPI";
import "./pickupdropoffModal.css";
import { Form } from "react-bootstrap";
import SearchLocationInput from "../../GoogleMap/googleAutoCompleteAPI";
import UseGlobalFormFields from "../Utils/useGlobalFormFields";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../Pages/OtherPages/toastStyle.css';

function DropoffLocationModal({
  show,
  handleButtonClick,
  updateDropoffLocationMessage,
  initialInputFieldValue,
  inputDropoffFieldValue,
  handleInputFieldChange,
  onSelectTabChange,
  onStateChange,
}) {
  const [selectedLocationss, setSelectedLocationss] = useState({
    lat: 25.17411857864891,
    lng: 55.376264,
  });

  const [dropOffLocationss] = useState({
    lat: 25.17411857864891,
    lng: 55.376264,
  });

  const [selectedTab, setSelectedTab] = useState("");
  const [dropoffLocationState, setDropoffLocationState] = useState("");
  const [deliverToAddressValue] = useState("");

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
    setSelectedTab(formFields?.selectedTabDropOff);
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
    onSelectTabChange(tab);
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
            color: "black",
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
        });
        return;
      }
    }
    let messageDrop = "";
    if (selectedTab === "deliver") {
      messageDrop = `${formFields?.deliveryMapLocDropOff || ""}`;
      handleFieldChange("deliveryMapLocDropOff", messageDrop);
    } else if (selectedTab === "pick") {
      handleFieldChange("deliveryMapLocDropOff", "");
      messageDrop = `Ras Al Khor - Milele Showroom 11`;
      handleFieldChange("dropoffInputMessageV1", messageDrop);
      handleFieldChange("dropoffLocationStateV1", "Dubai");
    }
    console.log("Select tab------------------", selectedTab);

    handleFieldChange("selectedTabDropOff", selectedTab);

    if (formFields) {
      if (formFields?.selectedTabDropOff === "pick") {
        updateDropoffLocationMessage(
          formFields?.dropoffInputMessageV1 ||
            "Ras Al Khor - Milele Showroom 11"
        );
      } else {
        updateDropoffLocationMessage(
          formFields?.deliveryMapLocDropOff ||
            "Ras Al Khor - Milele Showroom 11"
        );
      }
    }

    handleButtonClick(selectedTab, {
      inputValue: inputDropoffFieldValue,
    });
  };

  const handleStateChange = (stateName) => {
    handleFieldChange("dropoffLocationStateV1", stateName);
    setDropoffLocationState(stateName);
    onStateChange(stateName);
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
            id="dropoff-loc-deliver-to me"
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
            id="dropoff-loc-pick-up-myself"
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
                        <SearchLocationInput
                          previousLocationValue={
                            formFields?.deliveryMapLocDropOff
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
                        id="dropoff-loc-booking-button-deliver-to-me"
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
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="dropoffLocationName"
                          name="dropoffLocationName"
                          required
                          readOnly
                          value={"Ras Al Khor"}
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
                          value={"Milele Showroom 11"}
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
                        id="dropoff-loc-booking-button-pick-up-myself"
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
