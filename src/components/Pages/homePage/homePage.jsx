import React from "react";
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
import SpinTheWheel from "../spinTheWheel/spinTheWheel";
import Celebration from "../spinTheWheel/celebration";

const HomePage = () => {
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

  const { loading } = useReload();

  if (loading) {
    return (
      <>
        <ReloadingComponent />
      </>
    );
  }

  return (
    <div className="">
      <div id="main">
        <div className="homepage-main">
          <div className="search-box-home-page-container">
            <div className="search-box-home-page">
              <SearchBox />
            </div>
            {/* <div className="x1 animate-logos">
              <SiBmw className="y1 animated-img logo1" />
            </div>
            <div className="x2 animate-logos">
              <SiBmw className="y2 animated-img logo2" />
            </div>
            <div className="x3 animate-logos">
              <SiBmw className="y3 animated-img logo3" />
            </div>
            <div className="x4 animate-logos">
              <SiBmw className="y4 animated-img logo4" />
            </div> */}
          </div>
          {/* <div className="tag-line-heading-home-page">
            <h1 className="tag-line-heading-text">
              Drive Luxury Cars In Dubai <br /> Afforable Cars
            </h1>
          </div> */}

          {/* <div className="car-movement tag-line-heading-home-page">
            <div className="car">
              <img
                src={AnimatedCarImg}
                alt="aboutUs"
                className="animated-car-banner"
              />
            </div>
          </div> */}
          {/* <SpinTheWheel /> */}
          <CarCards />
          {/* <Celebration/> */}

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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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

          <ClientLogoSection />
          <AnimatedCarSection />

          <OurBlogs />
          <TestimonialSlider />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
