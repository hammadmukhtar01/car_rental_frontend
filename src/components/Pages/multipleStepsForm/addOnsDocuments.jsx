import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import {
  BsPersonCircle,
  BsFillShieldLockFill,
  BsFileEarmarkArrowUp,
} from "react-icons/bs";
import Select from "react-select";
import axios from "axios";

const AddOnsDocuments = ({ prevStep, nextStep }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [driversAge, setDriversAge] = useState("");
  const [airlineTicketNum, setAirlineTicketNum] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [driverDrivingLicense, setDriverDrivingLicense] = useState("");
  const [driverPassport, setDriverPassport] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [addOnsValuesData, setAddOnsValuesData] = useState([]);
  // const [complexFeaturesIcons, setComplexFeaturesIcons] = useState([]);

  const fetchAddOnsChargesData = useCallback(async () => {
    try {
      const token =
        "pwhUHSoPIOJmECDhAyhlP1X5ZvzD1W3dmhUOdpQ-BQtQzg1PNlv8invCvbT1qk3EsoJfM_v8Pj8ZJsPKXVoC-kZtg0p2mpAu4f5g8LiMWrGbqZ4QRY-1xJRJTcWF-t24jUgdng1-myn-TgDddhkldDmkOufYlMdkGQDpZtnUfQ00qgl58t65VCWwK29g4ZWq_Y9djzMDXsmSARNbtZD4TkjqEtIihGsxcffl8VEdO_f3oqDZamOk-mq9XrzlOxdU76g7WRmubIBctGiJPO8DV5crp-ccVfeZ_3TinZc6pmUABcezl9QxkrcbcgTGrRjMhpdqtXYOworyQjpjOfEhbTHYrkQFw-7yTJOJiUCIUMX05z97fE5DIi7GJg8-PL5xfzUyPgruvfnkHHmlFRWIFOkoEgf7FdcQ3S7EveRJZsHVxCKUKg-Dvjm4k7VyHE3uLhKurIgj4VzVSdRYGVRiggymUxvRT4h5Lr_nh2G1vzIrOG1R5vfb_93Pk5SelyNHoizjG_3nCfGbgWzwQ728Z6Vn22CAcbKemFRF7kVh0mg";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `https://app.speedautosystems.com/api/services/app/chargesSetting/GetChargesSettings`;

      const ModuleValue = {
        module: 1,
      };

      const response = await axios.post(url, ModuleValue, { headers });
      setAddOnsValuesData(response.data.result.items);
      console.log(
        "Result of our all speed add ons are : ",
        response.data.result.items
      );
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, []);

  useEffect(() => {
    fetchAddOnsChargesData();
  }, [fetchAddOnsChargesData]);

  const NationalityNames = [
    { label: "Pakistan", value: "pakistan" },
    { label: "Dubai", value: "dubai" },
    { label: "Turkey", value: "turkey" },
    { label: "India", value: "india" },
    { label: "America", value: "america" },
  ];

  const AddOnsData = [
    {
      id: 1,
      addOnsName: "Tint",
      pricePerTrip: 150,
      IconName: BsFileEarmarkArrowUp,
      checkBoxValue: 0,
      addOnsDetail:
        "1 Detail Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam natus quia provident ipsa, eius aut totam fugiat nostrum. Assumenda, deserunt commodi. Quibusdam dolorum in corrupti ipsum. Ducimus nostrum itaque quas?",
    },

    {
      id: 2,
      addOnsName: "Additional Driver",
      pricePerTrip: 50,
      checkBoxValue: 1,
      IconName: BsPersonCircle,
      addOnsDetail:
        "2 Detail Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam natus quia provident ipsa, eius aut totam fugiat nostrum. Assumenda, deserunt commodi. Quibusdam dolorum in corrupti ipsum. Ducimus nostrum itaque quas?",
    },
    {
      id: 3,
      addOnsName: "Tissue Box",
      pricePerTrip: 5,
      IconName: BsFileEarmarkArrowUp,
      checkBoxValue: 0,
      addOnsDetail:
        "1 Detail Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam natus quia provident ipsa, eius aut totam fugiat nostrum. Assumenda, deserunt commodi. Quibusdam dolorum in corrupti ipsum. Ducimus nostrum itaque quas?",
    },

    {
      id: 4,
      addOnsName: "Air Freshner",
      pricePerTrip: 15,
      IconName: BsFileEarmarkArrowUp,
      checkBoxValue: 0,
      addOnsDetail:
        "1 Detail Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam natus quia provident ipsa, eius aut totam fugiat nostrum. Assumenda, deserunt commodi. Quibusdam dolorum in corrupti ipsum. Ducimus nostrum itaque quas?",
    },
  ];

  const handleCheckBoxChange = (id) => {
    setSelectedAddOns((prevSelectedAddOns) => {
      const index = prevSelectedAddOns.findIndex((addOn) => addOn.id === id);
      if (index !== -1) {
        const updatedAddOns = [...prevSelectedAddOns];
        updatedAddOns.splice(index, 1);
        return updatedAddOns;
      } else {
        const addOnToAdd = AddOnsData.find((addOn) => addOn.id === id);
        return [...prevSelectedAddOns, addOnToAdd];
      }
    });
  };

  const totalAddOnsPriceSimple = () => {
    return selectedAddOns.reduce((total, addOn) => {
      return total + (addOn.pricePerTrip || 0);
    }, 0);
  };

  const handleViewDetails = (addOn) => {
    setSelectedAddOn(addOn);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNextStep = () => {
    let isFormValid = true;

    if (!firstName.trim()) {
      isFormValid = false;
      console.log("First name is required");
    }

    if (!lastName.trim()) {
      isFormValid = false;
      console.log("Last name is required");
    }

    if (!contactNum.trim()) {
      isFormValid = false;
      console.log("Contact Num is required");
    }

    if (!emailAddress.trim()) {
      isFormValid = false;
      console.log("Email is required");
    }

    if (!nationality.trim()) {
      console.log("nationlity value is: ", nationality);
      isFormValid = false;
      console.log("Nationality is required");
    }

    if (!driversAge.trim()) {
      isFormValid = false;
      console.log("Age is required");
    }

    if (!airlineTicketNum.trim()) {
      isFormValid = false;
      console.log("Ticket Number is required");
    }

    if (!driverDrivingLicense.trim()) {
      isFormValid = false;
      console.log("Lisence is required");
    }

    if (!driverPassport.trim()) {
      isFormValid = false;
      console.log("Passport is required");
    }

    if (!isFormValid) {
      console.log("");
      return;
    }

    const nextStepUrl = "/bookingPage/3";
    window.location.href = nextStepUrl;
  };

  const handleAddOnsDocumentStepForm = async (e) => {
    e.preventDefault();
    console.log(
      "Data: ",
      firstName,
      lastName,
      contactNum,
      emailAddress,
      nationality,
      driversAge,
      airlineTicketNum,
      driverDrivingLicense,
      driverPassport
    );
  };

  const selectStyles = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid rgb(184, 184, 184)",
      boxShadow: "none",
      lineHeight: "32px",
      marginLeft: "-13px",
      marginRight: "-14px",
      borderRadius: "6px",
      ":hover": {
        border: "1px solid rgb(184, 184, 184)",
      },
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: isSelected ? "#cc6119" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#cc6119" : "rgb(229, 229, 229)",
      },
    }),
  };

  return (
    <div>
      <div className="vehicle-details-location-main-div pt-3 pb-3">
        <Container fluid className="pt-4">
          <>
            <form
              action="#"
              className="signin-form"
              onSubmit={handleAddOnsDocumentStepForm}
            >
              <div className="step1-car-location-details-container">
                <div className="step1-location-details pb-3 pt-3">
                  <div className="location-label">
                    <div className="styled-label">
                      <BsPersonCircle className="mr-2 heading-icon" />
                      <b>Driver's Details</b>
                      <hr className="heading-underline" />
                    </div>
                  </div>

                  <div className="driver-details-form-container">
                    <div className=" form-group pl-4 pr-4">
                      <div className="">
                        <Row>
                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>First Name</b>
                                </label>
                              </div>
                              <input
                                className="form-control-location mt-2 col-12"
                                type="text"
                                required
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </Form.Group>
                          </Col>

                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>Last Name</b>
                                </label>
                              </div>
                              <input
                                className="form-control-location mt-2 col-12"
                                type="text"
                                required
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>Contact Number</b>
                                </label>
                              </div>
                              <input
                                className="form-control-location mt-2 col-12"
                                type="tel"
                                required
                                placeholder="contact number"
                                value={contactNum}
                                onChange={(e) => setContactNum(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>Email</b>
                                </label>
                              </div>
                              <input
                                className="form-control-location mt-2 col-12"
                                type="email"
                                placeholder="Email address"
                                required
                                value={emailAddress}
                                onChange={(e) =>
                                  setEmailAddress(e.target.value)
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label mb-3">
                                  <b>Nationality</b>
                                </label>
                              </div>
                              <Select
                                options={NationalityNames}
                                required
                                className="form-control-nationality col-12"
                                setNationality
                                onChange={(selectedOption) => {
                                  console.log(
                                    "Selected optn is: ",
                                    selectedOption
                                  );
                                  setNationality(selectedOption.value);
                                }}
                                styles={selectStyles}
                              />
                            </Form.Group>
                          </Col>

                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>Driver's Age</b>
                                </label>
                              </div>
                              <input
                                className="form-control-age mt-2 col-12"
                                type="number"
                                required
                                placeholder="Enter age"
                                min={22}
                                value={driversAge}
                                onChange={(e) => setDriversAge(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>Airline Ticket No.</b>
                                </label>
                              </div>
                              <input
                                className="form-control-location mt-2 col-12"
                                required
                                type="text"
                                placeholder="Enter ticket number"
                                value={airlineTicketNum}
                                onChange={(e) =>
                                  setAirlineTicketNum(e.target.value)
                                }
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="step1-car-details p-4">
                  <div className="location-label">
                    <div className="styled-label">
                      <BsFillShieldLockFill className="mr-2 heading-icon" />
                      <b>Rental AddOns</b>
                      <hr className="heading-underline" />
                    </div>

                    <div className="driver-details-form-container">
                      <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <div className=" form-group pl-4 pr-4">
                            <Row className="d-flex">
                              {addOnsValuesData.map((AddOnsDataValues) => (
                                <Col
                                  lg={5}
                                  md={12}
                                  sm={12}
                                  xs={12}
                                  className="add-on-container"
                                  key={AddOnsDataValues?.chargesTypeId}
                                >
                                  <Form.Group
                                    controlId={`formKeyword_${AddOnsDataValues?.chargesTypeId}`}
                                  >
                                    <div className="row d-flex align-items-center">
                                      <Col lg={1} md={2} sm={2} xs={2}>
                                        <BsFileEarmarkArrowUp className="mr-2 heading-icon" />
                                      </Col>
                                      <Col lg={8} md={7} sm={7} xs={7}>
                                        <div className="add-ons-label-name p-2">
                                          <label className="add-ons-label">
                                            <b>
                                              {
                                                AddOnsDataValues?.chargesType
                                                  ?.name
                                              }
                                              {AddOnsDataValues?.chargesTypeId}
                                            </b>
                                            <br />
                                            <span>
                                              AED{" "}
                                              {AddOnsDataValues?.rateType?.name}
                                            </span>
                                            <br />
                                            <a
                                              href={`#${AddOnsDataValues?.chargesTypeId}`}
                                              onClick={() =>
                                                handleViewDetails(
                                                  AddOnsDataValues
                                                )
                                              }
                                              className="add-ons-view-details"
                                            >
                                              View Details
                                            </a>
                                          </label>
                                        </div>
                                      </Col>
                                      <Col lg={3} md={3} sm={3} xs={3}>
                                        <div className="form-check form-switch form-switch-md float-end">
                                          <input
                                            className="form-check-input add-ons-toggle-input"
                                            type="checkbox"
                                            id={`flexSwitchCheckDefault_${AddOnsDataValues?.chargesTypeId}`}
                                            onChange={() =>
                                              handleCheckBoxChange(
                                                AddOnsDataValues?.chargesType
                                                  ?.id
                                              )
                                            }
                                          />
                                        </div>
                                      </Col>
                                    </div>
                                  </Form.Group>
                                </Col>
                              ))}
                            </Row>
                          </div>
                        </Col>

                        <Col lg={11} md={11} sm={12} xs={12}>
                          <div className="total-addons-price text-right">
                            <div>
                              <span className="fs-4 fw-medium"> Total:</span>{" "}
                              <span>AED</span>{" "}
                              <span className="total-addons-value fs-3 fw-semibold">
                                {totalAddOnsPriceSimple()}
                              </span>{" "}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    centered
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>View Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {selectedAddOn && (
                        <>
                          <p>{selectedAddOn.addOnsDetail}</p>
                        </>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <br />
                <div className="step1-car-details p-4">
                  <div className="location-label">
                    <div className="styled-label">
                      <BsFileEarmarkArrowUp className="mr-2 heading-icon" />
                      <b>Documents Upload</b>
                      <hr className="heading-underline" />
                    </div>
                    <div className="driver-details-form-container">
                      <div className=" form-group pl-4 pr-4">
                        <div className="">
                          <Row>
                            <Col xxl={2} lg={1}></Col>

                            <Col xxl={3} lg={4} md={5} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Driver's Driving Lisence</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-fname p-2 col-12"
                                  required
                                  type="file"
                                  placeholder="driving license"
                                  value={driverDrivingLicense}
                                  onChange={(e) =>
                                    setDriverDrivingLicense(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={1} lg={1} md={1}></Col>

                            <Col xxl={3} lg={4} md={5} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Driver's Passport</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-lname p-2 col-12"
                                  required
                                  type="file"
                                  placeholder="passport number"
                                  value={driverPassport}
                                  onChange={(e) =>
                                    setDriverPassport(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={2} lg={2}></Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking-button-main-div-step1 d-flex justify-content-center pb-2 pt-3">
                  <Col lg={3} md={4} sm={6} xs={8} className="d-flex just">
                    <div className="button-container">
                      <button
                        className="animated-button booking-text action-button next"
                        onClick={handleNextStep}
                      >
                        {" "}
                        <span className="button-text-span">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">Book & Pay</span>
                        </span>
                      </button>
                    </div>
                  </Col>
                </div>
              </div>
            </form>
          </>
        </Container>
      </div>
    </div>
  );
};

export default AddOnsDocuments;
