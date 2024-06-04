/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import SearchBox from "./searchBox";
import CarCards from "./carCards";
import AnimatedCarSection from "./animatedCarSection";
import NissanLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 7.png";
import CheveroletLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 22.png";
import PeugeotLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 10.png";
// import KiaLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 10.png";
// import HyundaiLogo from "../../images/lto-images/lto-our-brands-all-icons/Artboard 11.png";
import OurBlogs from "../Blog/ourBlogs";
import { Helmet } from "react-helmet";
// import SpinTheWheel from "../spinTheWheel/spinTheWheel";

// Imp TestAutoComInput import for google map locations responsiveness
import TestAutoComInput from "../../GoogleMap/testSearchInput";
import { ImSpinner4 } from "react-icons/im";
import { Modal } from "react-bootstrap";
import OnlyCar from "../../images/only-car-bg-home-banner.png";
import InstagramFeed from "./instagramFeed";
import FreeConsultationForm from "../Blog/freeConsultationBlogForm";
import HomePageTopBar from "../navbar/homePageTopBar";
import MainNavbar from "../navbar/mainNavbar";
import FooterCombination from "../../PrivateComponents/footerCombination";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLocationss, setSelectedLocationss] = useState(null);

  const carBrands = [
    // { name: "hyundai", logo: HyundaiLogo, title: "Hyundai" },
    { name: "chevrolet", logo: CheveroletLogo, title: "Cheverolet" },
    // { name: "kia", logo: KiaLogo, title: "Kia" },
    { name: "peugeot", logo: PeugeotLogo, title: "Peugeot" },
    { name: "nissan", logo: NissanLogo, title: "Nissan" },
  ];

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Helmet>
        <title>Home - Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        <link rel="canonical" href="https://milelecarrental.com/" />
      </Helmet>

      <HomePageTopBar />
      <div className="navbar-div-container">
        <MainNavbar />
      </div>

      <div id="main">
        <div className="homepage-main">
          <div className="search-box-home-page-container">
            <div className="bg-img-banner-main">
              <div className="banner-container" />
              <img
                className="only-car-banner-container-2"
                src={OnlyCar}
                title="car-banner"
                alt="home page top banner "
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
          <div className="text-center pt-2 pb-2 d-none">
            <h1>Welcome to Milele Car Rental Service</h1>
            <h2>Affordable Car Rentals</h2>
            <p>
              We offer the best car rental deals. Choose from our wide range of
              rental vehicles to suit your needs.
            </p>
          </div>
          {/* <CarCards /> */}

          <div className="container pt-4 pb-4">
            <div className="car-brands-icons-container p-3">
              <div className="styled-label">
                <div className="heading-icon-container-div">
                  <span className="text-center">
                    <h2>
                      <b className="fs-3">Collaborated Brands</b>
                    </h2>
                  </span>
                </div>
                <hr className="home-page-heading-underline " />
              </div>

              <section className="lto-dealing-brands mt-3">
                <div className="lto-our-brand-div">
                  <div className="home-page-lto-brand-icons">
                    {carBrands?.map((carBrandsName, index) => (
                      <img
                        key={index}
                        src={carBrandsName?.logo}
                        className="home-page-single-brand-class"
                        title={`${carBrandsName?.name}`}
                        alt={`${carBrandsName?.name} brand icon`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          <AnimatedCarSection />

          <OurBlogs />

          <div className="instagram-feed-home-container container">
            <div className="styled-label text-center">
              <div className="insta-testimonial-heading-icon-container-div">
                <span>
                  <h2>
                    {" "}
                    <b className="fs-3">Instagram Feed</b>
                  </h2>
                </span>
              </div>
            </div>
            <InstagramFeed />
          </div>
          <FreeConsultationForm />
        </div>
      </div>

      <FooterCombination />
    </div>
  );
};

export default HomePage;
