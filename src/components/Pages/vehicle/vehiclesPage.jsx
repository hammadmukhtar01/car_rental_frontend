import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  BsGeoAltFill,
  BsGeoAlt,
  BsCalendar2Check,
  BsCalendar4Week,
} from "react-icons/bs";
import $ from "jquery";
import "./vehicleDetails.css";
import Car1 from "../../images/car1.jpg";

const VehiclesPage = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState("");
  const [dropoffDateTime, setDropoffDateTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  // const [selectedCarModel, setSelectedCarModel] = useState("");
  // const [selectedCarYear, setSelectedCarYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [offersFilter, setOffersFilter] = useState(false);
  const [sortBy, setSortBy] = useState("Recommended");

  useEffect(() => {
    // Initialize Select2 for Sort By dropdown
    $("#sortBySelect").select2();
  }, []);

  const cars = [
    {
      name: "Car name 1",
      image: Car1,
      discount: 90,
    },
    {
      name: "Car name 2",
      image:
        "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
      discount: 15,
    },
    {
      name: "Car name 3",
      image:
        "https://www.dkeng.co.uk/sales_images/1593558000/large_1594227296_murcielagosv_57.jpg",
      discount: 25,
    },
    {
      name: "Car name 4",
      image: Car1,
      discount: 90,
    },
    {
      name: "Car name 2",
      image:
        "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
      discount: 15,
    },
    {
      name: "Car name 5",
      image: Car1,
      discount: 90,
    },
    {
      name: "Car name 6",
      image:
        "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
      discount: 15,
    },
  ];

  useEffect(() => {
    if (pickupDateTime && dropoffDateTime) {
      const pickupDate = new Date(pickupDateTime);
      const dropoffDate = new Date(dropoffDateTime);
      const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setNumberOfDays(daysDifference);
    }
  }, [pickupDateTime, dropoffDateTime]);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString().slice(0, -8);
    return isoDateString;
  };

  const carModels = ["Model A", "Model B", "Model C"];
  const carYears = ["2020", "2021", "2022"];

  useEffect(() => {
    // Initialize Select2 for Car Model dropdown
    $("#carModelSelect").select2({
      placeholder: "Select Model",
      data: carModels.map((model) => ({ id: model, text: model })),
    });

    // Initialize Select2 for Car Year dropdown
    $("#carYearSelect").select2({
      placeholder: "Select Year",
      data: carYears.map((year) => ({ id: year, text: year })),
    });
  }, [carModels, carYears]);

  return (
    <div id="main" className="p-2">
      <div>
        <>
          <Container fluid>
            <Row>
              <div className="vehicles-page-main-container">
                <div className="searchbox-container">
                  <div className=" form-group pb-4 pt-4">
                    <div className="search-box-container">
                      <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <Row>
                            <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <BsGeoAlt className="mr-2" />
                                    <b>Pickup Location</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-location mt-2 col-12"
                                  type="text"
                                  placeholder="Enter pickup location"
                                  value={pickupLocation}
                                  onChange={(e) =>
                                    setPickupLocation(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formLocation">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <BsGeoAltFill className="mr-2" />
                                    <b>DropOff Location</b>
                                  </label>
                                </div>
                                <input
                                  className=" form-control-location mt-2 col-12"
                                  type="text"
                                  placeholder="Enter dropoff location"
                                  value={dropoffLocation}
                                  onChange={(e) =>
                                    setDropoffLocation(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formPickupDateTime">
                                <div className="date-label">
                                  <label className="styled-label">
                                    <BsCalendar2Check className="mr-2" />
                                    <b>Pickup Date & Time</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-date mt-2 col-12"
                                  type="datetime-local"
                                  min={getCurrentDateTime()}
                                  value={pickupDateTime}
                                  onChange={(e) =>
                                    setPickupDateTime(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formDropoffDateTime">
                                <div className="date-label">
                                  <label className="styled-label">
                                    <BsCalendar4Week className="mr-2" />
                                    <b>Dropoff Date & Time</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-date mt-2 col-12"
                                  type="datetime-local"
                                  min={pickupDateTime}
                                  value={dropoffDateTime}
                                  onChange={(e) =>
                                    setDropoffDateTime(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formCarModel">
                                <Form.Label>
                                  <div className="location-label">
                                    <label className="styled-label mt-2">
                                      <BsGeoAlt className="mr-2" />
                                      <b>Car Model</b>
                                    </label>
                                  </div>
                                </Form.Label>
                                <select
                                  id="carModelSelect"
                                  className="form-select"
                                >
                                  {/* Options will be dynamically added using Select2 */}
                                </select>
                              </Form.Group>
                            </Col>

                            <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formCarYear">
                                <Form.Label>
                                  <div className="location-label mt-2">
                                    <label className="styled-label">
                                      <BsGeoAlt className="mr-2" />
                                      <b>Car Year</b>
                                    </label>
                                  </div>
                                </Form.Label>
                                <select
                                  id="carYearSelect"
                                  className="form-select"
                                >
                                  {/* Options will be dynamically added using Select2 */}
                                </select>
                              </Form.Group>
                            </Col>

                            <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formMinMaxPrice">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <BsGeoAlt className="mr-2" />
                                    <b>Price Range</b>
                                  </label>
                                </div>
                                <Row>
                                  <Col
                                    xxl={5}
                                    lg={5}
                                    md={5}
                                    sm={6}
                                    xs={12}
                                    className="min-price-input"
                                  >
                                    <Form.Control
                                      type="number"
                                      placeholder="Min Price"
                                      value={minPrice}
                                      onChange={(e) =>
                                        setMinPrice(e.target.value)
                                      }
                                    />
                                  </Col>{" "}
                                  <Col
                                    xxl={5}
                                    lg={5}
                                    md={5}
                                    sm={6}
                                    xs={12}
                                    className="max-price-input"
                                  >
                                    <Form.Control
                                      type="number"
                                      placeholder="Max Price"
                                      value={maxPrice}
                                      onChange={(e) =>
                                        setMaxPrice(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>

                            <Col xxl={3} lg={5} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formOffersFilter">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <BsGeoAlt className="mr-2" />
                                    <b>Offers</b>
                                  </label>
                                </div>
                                <Row>
                                  <Col xxl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Form.Check
                                      type="checkbox"
                                      label="With Offers"
                                      checked={offersFilter}
                                      onChange={() =>
                                        setOffersFilter(!offersFilter)
                                      }
                                    />
                                  </Col>
                                  <Col xxl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Form.Check
                                      type="checkbox"
                                      label="Without Offers"
                                      checked={!offersFilter}
                                      onChange={() =>
                                        setOffersFilter(!offersFilter)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={2} md={3} sm={6} xs={12} className="p-4">
                          <Button variant="primary">Apply Filters</Button>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="mt-2">
                          {numberOfDays > 0 && (
                            <span className="fs-5">
                              Number of days:{" "}
                              <span className="total-days">{numberOfDays}</span>
                            </span>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </>

        <>
          <Container fluid className="all-cars-container pb-4">
            <Row>
              {/* All Cars Section */}
              <Col lg={12} md={12} sm={12}>
                <div className="all-cars-section p-5">
                <div className="sort-by-dropdown">
                <Row className="sort-by-row justify-content-between align-items-center mb-4">
          <Col xxl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Group controlId="formSortBy">
              <Form.Label className="styled-label mt-2">
                <b>Sort By:</b>
              </Form.Label>
              <select
                id="sortBySelect"
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="LowToHigh">Low to High</option>
                <option value="HighToLow">High to Low</option>
                <option value="Recommended">Recommended</option>
              </select>
            </Form.Group>
          </Col>
        </Row>
                </div>
                  <>
                    <Row className="offers-car-container-row">
                      {cars.map((car, index) => (
                        <Col
                          key={index}
                          xxl={3}
                          lg={4}
                          md={6}
                          sm={12}
                          className="offers-car-div pb-5"
                        >
                          <div className="all-offer-cars p-3">
                            <div id={`hr-value-allcars-1`}></div>
                            <div className="offer-car-price">
                              <b>{car.discount}% Off</b>
                            </div>
                            <div id={`hr-value-allcars-2`}></div>
                            <div className="car-image-container ">
                              <img
                                src={car.image}
                                alt={`Car ${index + 1}`}
                                className="car-image m-4"
                              />
                              <div className="car-image-overlay"></div>
                            </div>
                            <hr className="discount-line" />
                            <div className="car-details">
                              <p className="car-name">
                                {" "}
                                <b>{car.name}</b>{" "}
                              </p>
                              <div className="discount-container"></div>
                            </div>
                            <div className="col-lg-10">
                              {/* <Button
                                variant="primary"
                                className="book-now-button"
                              >
                                Book Now
                              </Button> */}

                              <Button
                                variant="primary"
                                className="pay-now-button"
                              >
                                Pay Now | AED: 300 | 3 days
                              </Button>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      </div>
    </div>
  );
};

export default VehiclesPage;
