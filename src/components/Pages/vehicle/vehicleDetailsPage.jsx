/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./vehicleDetails.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import Review from "../review/review";

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const [carsData, setCarsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [simpleFeaturesIcons, setSimpleFeaturesIcons] = useState([]);
  const [complexFeaturesIcons, setComplexFeaturesIcons] = useState([]);
  const navigate = useNavigate();
  console.log("Props in VehicleDetailsPage:", id);
  const latitude = 25.177236;
  const longitude = 55.376324;
  const durations = ["Day", "Week", "Month"];
  const durationValues = [1, 7, 30];
  const [data, setData] = useState([]);

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const fetchSimpleFeaturesIcons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/simpleFeature/all"
      );
      console.log("Simple Icons Data : ", response.data);
      setSimpleFeaturesIcons(response.data.simpleFeaturesData);
    } catch (error) {
      console.error("Error fetching simple features icons:", error);
    }
  };

  const fetchComplexFeaturesIcons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/complexFeature/all"
      );
      console.log("Complex Icons Data : ", response.data);
      setComplexFeaturesIcons(response.data.complexFeaturesData);
    } catch (error) {
      console.error("Error fetching complex features icons:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/car/getSingleCar/${id}`
        );
        console.log("Vehicles Page data is: ", response.data);
        setData(response.data.data);
        fetchSimpleFeaturesIcons();
        fetchComplexFeaturesIcons();
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData();
  }, [id]);

  const calculateTotalPrice = () => {
    if (data && data.additionalCharges) {
      return data.additionalCharges.reduce(
        (total, charge) => total + charge.value,
        0
      );
    }
    return 0;
  };

  const handleBooking = (id) => {
    navigate(`/booking/${id}`);
  };

  const images = [
    {
      id: "12",
      author: "Paul Jarvis",
      width: 250,
      height: 167,
      url: "https://unsplash.com/photos/I_9ILwtsl_k",
      download_url: "https://picsum.photos/id/12/2500/1667",
    },
    {
      id: "13",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/3MtiSMdnoCo",
      download_url: "https://picsum.photos/id/13/2500/1667",
    },
    {
      id: "14",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/IQ1kOQTJrOQ",
      download_url: "https://picsum.photos/id/14/2500/1667",
    },
    {
      id: "15",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/NYDo21ssGao",
      download_url: "https://picsum.photos/id/15/2500/1667",
    },

    {
      id: "15",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/NYDo21ssGao",
      download_url: "https://picsum.photos/id/15/2500/1667",
    },
    {
      id: "14",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/IQ1kOQTJrOQ",
      download_url: "https://picsum.photos/id/14/2500/1667",
    },
  ];

  const buttonShown = "available";

  return (
    <div>
      <div
        className="vehicelDetail-main-container"
      >
        <div className="main-container p-4">
          <section className="wpb-content-wrapper">
            <div className="row">
              <div className="stm-vc-single-car-content-left wpb_column vc_column_container col-lg-12 col-md-12 col-sm-12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <h2 className="title stm_listing_title  vc_custom_1686213543067">
                          {data.carName}
                        </h2>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div
                          className="stm_social_buttons_wrap  vc_custom_1641548377760 vc_column_container whatsapp-container"
                          style={{
                            width: "51%",
                            float: "right",
                            paddingRight: "0px!important",
                            marginTop: "1px !important",
                            marginBottom: "10px !important",
                            border: "1px solid #edecec",
                            padding: "10px",
                          }}
                        >
                          <div className="whatsapp">
                            <a
                              href="https://wa.me/971544519432"
                              target="_blank"
                              className="external"
                              rel="nofollow noreferrer"
                            >
                              <div
                                className="whatsapp-btn heading-font "
                                id="social_button_78492"
                                style={{
                                  fontSize: "larger",
                                  padding: "5px",
                                }}
                              >
                                <i className="stm-icon-whatsapp"></i>
                                <b>Chat via WhatsApp</b>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-8 col-md-12">
                        <div className="carousel-container">
                          <Carousel className="crsl">
                            {images.map((image) => (
                              <img
                                key={image.id}
                                src={image.download_url}
                                alt={image.author}
                              ></img>
                            ))}
                          </Carousel>
                        </div>
                      </div>
                      <div className="col-lg-4 car-detail-price-main-div">
                        <div className="">
                          {durations.map((duration, index) => (
                            <div
                              key={index}
                              className="col-lg-4 col-md-4 col-sm-4 single-price-div-carDetails"
                            >
                              <div className="card">
                                <div className="card-body price-day-div">
                                  <div className="card-text">
                                    <p style={{ color: "gray" }}>
                                      Per {duration}
                                    </p>
                                    <del
                                      style={{
                                        textDecorationColor: "red",
                                        color: "#cc6119",
                                      }}
                                    >
                                      {data.originalPrice *
                                        durationValues[index]}{" "}
                                      AED
                                    </del>{" "}
                                    <p style={{ color: "green" }}>
                                      {data.salePrice * durationValues[index]}{" "}
                                      AED{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>






                        <div className="price-booking-button-div col-lg-12">
                        <div className="">
                          <div className="booking-price-evaluation">
                            {data && data.additionalCharges && (
                              <>
                                {data.additionalCharges.map((charge) => (
                                  <div
                                    key={charge._id}
                                    className="price-row"
                                    style={{ lineHeight: "300%" }}
                                  >
                                    <span className="price-label">
                                      {charge.name}:
                                    </span>
                                    <span className="price-value">
                                      AED | {`${charge.value}`}
                                    </span>
                                  </div>
                                ))}
                                <hr />
                              </>
                            )}
                            <div
                              className="total-price-row"
                              style={{ lineHeight: "100%", fontSize: "16px" }}
                            >
                              <span className="price-label">Total Price:</span>
                              <span className="price-value">
                                <b>AED | {calculateTotalPrice()}</b>
                              </span>{" "}
                            </div>
                            <hr />
                          </div>

                          <div className="booking-wishlist-button">
                            {buttonShown === "available" ? (
                              <div className="col-lg-12 col-md-12">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleBooking(data.id)}
                                >
                                 Started Booking{" "}
                                  <span className="fas fa-arrow-right ps-2"></span>
                                </button>
                              </div>
                            ) : (
                              <div className="col-lg-12 col-md-12">
                                <Link
                                  to="/wishlist"
                                  className="btn btn-primary"
                                >
                                  <b>Add to Wishlist</b>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>


                        
                      </div>
                      <br />

                     
                    </div>

                    <div
                      className="wpb_tabs wpb_content_element"
                      data-interval="0"
                    >
                      <div className="wpb_wrapper wpb_tour_tabs_wrapper ui-tabs stm_tabs_style_1 vc_clearfix ui-corner-all ui-widget ui-widget-content">
                        <div
                          id="tab-90676444-d4f2-8"
                          className="wpb_tab ui-tabs-panel wpb_ui-tabs-hide vc_clearfix ui-corner-bottom ui-widget-content"
                          aria-labelledby="ui-id-1"
                          role="tabpanel"
                          aria-hidden="false"
                          style={{ display: "block" }}
                        >
                          <h4
                            style={{ textAlign: "left" }}
                            className="vc_custom_heading vc_custom_1448521543990"
                          >
                            {" "}
                            FEATURES
                          </h4>
                          <div className="wpb_text_column wpb_content_element ">
                            <div className="simple-icon-main-div">
                              <div className="row">
                                {simpleFeaturesIcons.map(
                                  (simple_icon, index) => (
                                    <div
                                      key={index}
                                      className="col-lg-4 col-md-6 col-sm-12"
                                    >
                                      <div className="d-flex align-items-center mb-3">
                                        <div className="col-lg-2 col-md-6 ">
                                          <img
                                            src={`data:${
                                              simple_icon.icon.contentType
                                            };base64,${btoa(
                                              String.fromCharCode(
                                                ...new Uint8Array(
                                                  simple_icon.icon.iconData.data
                                                )
                                              )
                                            )}`}
                                            alt={simple_icon.icon.filename}
                                            className="features-icon-detailPage"
                                          />
                                        </div>
                                        <div className="col-lg-8 col-md-6">
                                          <p
                                            style={{ color: "gray", margin: 0 }}
                                          >
                                            {simple_icon.name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            <br />
                            <br />

                            <div className="complex-icon-main-div">
                              <div className="row">
                                {complexFeaturesIcons.map(
                                  (complex_icon, index) => (
                                    <div
                                      key={index}
                                      className="col-lg-4 col-md-6 col-sm-12"
                                    >
                                      <div className="d-flex align-items-center mb-3">
                                        <div className="col-lg-2 col-md-6">
                                          <img
                                            src={`data:${
                                              complex_icon.icon.contentType
                                            };base64,${btoa(
                                              String.fromCharCode(
                                                ...new Uint8Array(
                                                  complex_icon.icon.iconData.data
                                                )
                                              )
                                            )}`}
                                            alt={complex_icon.icon.filename}
                                            className="features-icon-detailPage"
                                          />
                                        </div>
                                        <div className="col-lg-8 col-md-6">
                                          <p
                                            style={{ color: "gray", margin: 0 }}
                                          >
                                            {complex_icon.value}{" "}
                                            {complex_icon.name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
<br />
                    <div>
                      <h2>Location</h2>
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapContainer
                          center={[latitude, longitude]}
                          zoom={13}
                          style={{ height: "300px", width: "100%" }}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <Marker position={[latitude, longitude]}>
                            <Popup>Your location</Popup>
                          </Marker>
                        </MapContainer>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Review />
    </div>
  );
};

export default VehicleDetailsPage;
