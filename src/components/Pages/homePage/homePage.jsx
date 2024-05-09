/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SearchBox from "./searchBox";
import CarCards from "./carCards";
import AnimatedCarSection from "./animatedCarSection";
import NissanLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 7.png";
import PeugeotLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 23.png";
import KiaLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 10.png";
import HyundaiLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 11.png";
import CheveroletLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 22.png";
import OurBlogs from "../Blog/ourBlogs";
import "./ourClients.css";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "../../PrivateComponents/reloadingComponent";
// import SpinTheWheel from "../spinTheWheel/spinTheWheel";
import { ImSpinner4 } from "react-icons/im";
import { Modal } from "react-bootstrap";
import OnlyCar from "../../images/only-car-bg-home-banner.png";
import InstagramFeed from "./instagramFeed";
import FreeConsultationForm from "../Blog/freeConsultationBlogForm";

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
                className="only-car-banner-container-2"
                src={OnlyCar}
                alt="test"
              />
            </div>
            <div className="search-box-home-page mt-3">
              <SearchBox />
            </div>
            <div className="home-page-horizontal-line-2">
              <h1 className="home-page-horizontal-line-2-text">
                <div className="rent-drive-explore-div1">Rent </div>
                <div className="rent-drive-explore-div2">
                  ,
                  <span className="rent-drive-explore-span">
                    {" "}
                    Drive, Explore Dubai
                  </span>
                </div>
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
                  <span className="text-center">
                    <b className="fs-3">Collaborated Brands</b>
                  </span>
                </div>
                <hr className="home-page-heading-underline " />
              </div>

              <section className="lto-dealing-brands mt-3">
                <div className="lto-our-brand-div">
                  <div className="lto-brand-icons">
                    {carBrands.map((carBrandsName, index) => (
                      <img
                        key={index}
                        src={carBrandsName.logo}
                        className="home-page-single-brand-class"
                        alt={`Icon ${index}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* <div
                className="car-brands-slider-container"
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
              </div> */}
            </div>
          </div>

          {/* <GoogleMapAPI/> */}

          {/* <ClientLogoSection /> */}
          <AnimatedCarSection />

          <OurBlogs />

          <div className="instagram-feed-home-container container">
            <div className="styled-label text-center">
              <div className="insta-testimonial-heading-icon-container-div">
                <span>
                  <b className="fs-3">Instagram Feed</b>
                </span>
              </div>
            </div>
            <InstagramFeed />
          </div>
          <FreeConsultationForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
