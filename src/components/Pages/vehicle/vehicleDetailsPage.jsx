import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./vehicleDetails.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import Review from "../review/review";

const VehicleDetailsPage = () => {
  const latitude = 25.177236;
  const longitude = 55.376324;

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const images = [
    {
      id: "8",
      author: "Alejandro Escamilla",
      width: 5000,
      height: 3333,
      url: "https://unsplash.com/photos/xII7efH1G6o",
      download_url: "https://picsum.photos/id/8/5000/3333",
    },
    {
      id: "9",
      author: "Alejandro Escamilla",
      width: 5000,
      height: 3269,
      url: "https://unsplash.com/photos/ABDTiLqDhJA",
      download_url: "https://picsum.photos/id/9/5000/3269",
    },
    {
      id: "10",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/6J--NXulQCs",
      download_url: "https://picsum.photos/id/10/2500/1667",
    },
    {
      id: "11",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/Cm7oKel-X2Q",
      download_url: "https://picsum.photos/id/11/2500/1667",
    },
    {
      id: "12",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
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
    <div >
      <div
        className="stm-single-car-page single-listings-template"
        style={{ backgroundPosition: "0px 200px" }}
      >
        <div className="container">
          <section className="wpb-content-wrapper">
            <div className="row">
              <div className="stm-vc-single-car-content-left wpb_column vc_column_container col-lg-12 col-md-12 col-sm-12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <h2 className="title stm_listing_title  vc_custom_1686213543067">
                          KIA PICANTO - 2023
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
                      <div className="col-lg-9 col-md-12">
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

                      <div className="price-booking-button-div col-lg-3 col-md-12">
                        <div className="">
                          <div className="booking-price-evaluation">
                            <div
                              className="price-row"
                              style={{ lineHeight: "300%" }}
                            >
                              <span className="price-label">Actual Price:</span>
                              <span className="price-value">$100</span>{" "}
                            </div>

                            <div
                              className="price-row"
                              style={{ lineHeight: "300%" }}
                            >
                              <span className="price-label">
                                Discount Price:
                              </span>
                              <span className="price-value">$80</span>{" "}
                            </div>

                            <hr />

                            <div
                              className="total-price-row"
                              style={{ lineHeight: "100%", fontSize: "16px" }}
                            >
                              <span className="price-label">Total Price:</span>
                              <span className="price-value">
                                <b>$80</b>
                              </span>{" "}
                            </div>
                            <hr />
                          </div>

                          <div className="booking-wishlist-button">
                            {buttonShown === "available" ? (
                              <div className="col-lg-12 col-md-12">
                                <Link to="/booking" className="btn btn-primary">
                                  <b>Started Booking</b>{" "}
                                  <span className="fas fa-arrow-right ps-2"></span>
                                </Link>
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
                            <div className="wpb_wrapper">
                              <div className="lists-inline">
                                <ul
                                  className="list-style-2"
                                  style={{ fontSize: "13px" }}
                                >
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Abs
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Metal Paint
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      USB (1 Port)
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Chrome Coating
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Radio+ Rds (Compact)
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Rear Type ; Separated
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Seat Back Pocket (Passenger)
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Ash Tray; Front 1Ea (Portable)
                                    </span>
                                  </li>
                                </ul>
                                <ul
                                  className="list-style-2"
                                  style={{ fontSize: "13px" }}
                                >
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Net
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Luggage Board
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Outside Mirror
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Halogen Lamps(2Mfr)
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Manual Tilt (Lower)
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Front Type; Projection
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Depowered(Driver & Passenger)
                                    </span>
                                  </li>
                                  <li>
                                    <span style={{ color: "#232628" }}>
                                      Vanity Mirror (Driver) - Glass
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

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
