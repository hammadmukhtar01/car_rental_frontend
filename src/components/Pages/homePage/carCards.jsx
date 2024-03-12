/* eslint-disable no-unused-vars */
import React from "react";
import Car1 from "../../images/suv-car-fleet-1.png";
import Car2 from "../../images/sedan-car-fleet-2.png";
import Car3 from "../../images/economy-car-fleet-3.png";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { BsPersonCircle } from "react-icons/bs";
import LargeBanner1 from "../../images/mainBanner.jpg";
import SmallBanner2 from "../../images/small-banner.jpeg";

const cars = [
  {
    name: "Car name 1",
    image: Car1,
    discount: 90,
  },
  {
    name: "Car name 2",
    image: Car2,
    discount: 15,
  },
  {
    name: "Car name 3",
    image: Car3,
    discount: 25,
  },
  {
    name: "Car name 4",
    image: Car1,
    discount: 25,
  },
  {
    name: "Car name 5",
    image: Car2,
    discount: 25,
  },
  {
    name: "Car name 6",
    image: Car3,
    discount: 25,
  },
];

const LargeBanner = LargeBanner1;
const SmallBanner = SmallBanner2;

const changeBanner = () => {
  const bannerImg = document.getElementById("banner-img");
  if (bannerImg) {
    if (window.innerWidth <= 767) {
      bannerImg.src = SmallBanner;
    } else {
      bannerImg.src = LargeBanner;
    }
  } else {
    console.log("Banner image element not found.");
  }
};

document.addEventListener("DOMContentLoaded", changeBanner);
window.addEventListener("resize", changeBanner);

const Carousel = () => {
  const navigate = useNavigate();

  const offersPageBookNowButton = () => {
    console.log("In offers page book now");
    navigate("/vehicles");
  };

  const responsive = {
    0: { items: 1 },
    676: { items: 2 },
    1024: { items: 3 },
  };

  const generateTestimonialItem = (car) => (
    <div key={car.name} className="item container">
      <MDBContainer className="p-2">
        <MDBRow className="text-center offers-car-container-row">
          <MDBCol className="offers-car-div pb-4">
            <div className="offer-car-item p-3">
              {/* <div id={`hr-value-tag-1`}></div>
              <div className="tilted-car-price">
                <b>{car.discount}% Off</b>
              </div>
              <div id={`hr-value-tag-2`}></div> */}
              <div className="car-image-container ">
                <a href="/vehicles">
                  <img
                    src={car.image}
                    alt={`${car.name} car`}
                    className="car-image"
                  />
                </a>
                <div className="car-image-overlay"></div>
              </div>
              {/* <hr className="discount-line" /> */}
              <div className="car-details">
                <p className="car-name">
                  {" "}
                  <b>{car.name}</b>{" "}
                </p>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <div className="button-container">
                  <button
                    className="animated-button"
                    onClick={offersPageBookNowButton}
                  >
                    <span className="button-text-span">
                      <span className="transition"></span>
                      <span className="gradient"></span>
                      <span className="label">Rent Now</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );

  return (
    <div className="testimonial-container pt-4 offer-car-main-section">
      <div className="offers-car-container">
        <div className="container">
          <div className="styled-label">
            <div className="heading-icon-container-div">
              <BsPersonCircle className="mr-2 home-page-heading-icon" />
              <span>
                <b className="fs-3">Offers:</b>
              </span>
            </div>
            <hr className="home-page-heading-underline col-2" />
          </div>
          {/* <AliceCarousel
            mouseTracking
            items={cars.map(generateTestimonialItem)}
            responsive={responsive}
            controlsStrategy="alternate"
            infinite
            autoPlay
            autoPlayInterval="2000"
            animationDuration="1500"
          /> */}
          <div className="main-banner-img-container">
            <img
              className="main-banner-img"
              id="banner-img"
              src={LargeBanner}
              alt="banner"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="pt-3 offer-car-main-section">
  //     <div className="offers-car-container">
  //
  //     </div>
  //   </div>
  // );
};

export default Carousel;
