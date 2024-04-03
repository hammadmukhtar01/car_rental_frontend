/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SearchBox from "./searchBox";
import CarCards from "./carCards";
import AnimatedCarSection from "./animatedCarSection";
import TestimonialSlider from "./testimonialSlider";
import NissanLogo from "../../images/nissanLogo.png";
import PeugeotLogo from "../../images/peugeotLogo.jpg";
import KiaLogo from "../../images/kiaLogo.png";
import HyundaiLogo from "../../images/hyundaiLogo.jpg";
import CheveroletLogo from "../../images/CheveroletLogo.png";
import OurBlogs from "../Blog/ourBlogs";
import ClientLogoSection from "./ourClients";
import "./ourClients.css";
import { BsPersonCircle } from "react-icons/bs";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "../../PrivateComponents/reloadingComponent";
// import SpinTheWheel from "../spinTheWheel/spinTheWheel";
import { RxColorWheel } from "react-icons/rx";
import { ImSpinner4 } from "react-icons/im";
import { Modal } from "react-bootstrap";
import GoogleMapAPI from "../../GoogleMap/googleMapAPI";
import SearchLocationInput from "../../GoogleMap/googleAutoCompleteAPI";
import MapComponent from "../../GoogleMap/googleMapAPI";
import TestAutoComInput from "../../GoogleMap/testSearchInput";
import BannerMain from "../../images/no-car-bg-home-banner.png";
import OnlyCar from "../../images/only-car-bg-home-banner.png";
import testCar from "../../images/no-car-bg-home-banner-1.jpg";
import InstagramFeed from "./instagramFeed";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLocationss, setSelectedLocationss] = useState(null);

  const carBrands = [
    { name: "hyundai", logo: HyundaiLogo, title: "Hyundai" },
    { name: "chevrolet", logo: CheveroletLogo, title: "Cheverolet" },
    { name: "kia", logo: KiaLogo, title: "Kia" },
    { name: "peugeot", logo: PeugeotLogo, title: "Peugeot" },
    { name: "nissan", logo: NissanLogo, title: "Nissan" },
  ];

  const handleMouseEnter = () => {
    const slider = document.querySelector(".car-brands-slider");
    slider.classList.add("paused");
  };

  const handleMouseLeave = () => {
    const slider = document.querySelector(".car-brands-slider");
    slider.classList.remove("paused");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const openMapModal = () => {
    setShowModal(true);
  };

  // const { loading } = useReload();

  // if (loading) {
  //   return (
  //     <>
  //       <ReloadingComponent />
  //     </>
  //   );
  // }
  // const [selectedLocationss, setSelectedLocationss] = useState({
  //   lat: 28.7041,
  //   lng: 77.1025,
  // });

  return (
    <div className="">
      <div id="main">
        <div className="homepage-main">
          <div className="search-box-home-page-container">
            <div className="bg-img-banner-main">
              <div className="banner-container" />
              <img
                className="only-car-banner-container"
                src={OnlyCar}
                alt="test"
              />
            </div>
            <div className="search-box-home-page mt-3">
              <SearchBox />
            </div>
            <div className="home-page-horizontal-line-2">
              <h1 className="home-page-horizontal-line-2-text">
                Rent, Drive, Explore Dubai
              </h1>
            </div>
          </div>

          <CarCards />

          {/* <Celebration/> */}
          {/* <div className="spin-wheel-buttons-container">
            <a
              href="#spin-the-wheel"
              onClick={openMapModal}
              className="contact-button spin-the-wheel-link"
            >
              <ImSpinner4 className="rotate" />
            </a>
          </div> */}

          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Spin The Wheel</Modal.Title>
            </Modal.Header>
            <Modal.Body>{/* <SpinTheWheel /> */}</Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
            </Modal.Footer>
          </Modal>

          <div className="container pt-4 pb-4">
            <div className="car-brands-icons-container p-3">
              <div className="styled-label">
                <div className="heading-icon-container-div">
                  <BsPersonCircle className="mr-2 home-page-heading-icon" />
                  <span>
                    <b className="fs-3">Collaborated Top Brands:</b>
                  </span>
                </div>
                <hr className="home-page-heading-underline " />
              </div>

              <div
                className="car-brands-slider-container"
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              >
                <div className={`car-brands-slider`}>
                  {carBrands.map((brand, index) => (
                    <div
                      key={index}
                      className={`car-brand animated-logo`}
                      style={{ background: "white" }}
                    >
                      <img
                        src={brand.logo}
                        className="brands-logo-images"
                        title={brand.title}
                        alt="Logo"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* <GoogleMapAPI/> */}

          {/* <ClientLogoSection /> */}
          <AnimatedCarSection />

          <OurBlogs />
          {/* <TestimonialSlider /> */}
          <div className="instagram-feed-home-container container">
            <div className="styled-label ml-4">
              <div className="heading-icon-container-div">
                <BsPersonCircle className="mr-2 home-page-heading-icon" />
                <span>
                  <b className="fs-3">Testimonials</b>
                </span>
              </div>
              <hr className="home-page-heading-underline col-2" />
            </div>
            <InstagramFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
