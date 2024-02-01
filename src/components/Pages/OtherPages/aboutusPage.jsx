import React from "react";
import MainNavbar from "../navbar/mainNavbar";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "./../../PrivateComponents/reloadingComponent";
import HashLoader from "react-spinners/ClipLoader";
import AboutUsImg from "../../images/bgImg3-removebg-preview.png";
import {
  SiLegacygames,
  Si4Chan,
  SiAbbrobotstudio,
  SiAbbott,
  SiAbletonlive,
} from "react-icons/si";

const reasons = [
  {
    icon: <SiLegacygames className="legacy-icon" />,
    heading: "Legacy 1",
    description:
      "As part of Milele Corporations, we inherit a rich legacy built on a foundation of trust, innovation, and customer satisfaction. Our parent company stands as one of the foremost players in the import and export of new cars worldwide, solidifying its reputation as an industry powerhouse.",
  },
  {
    icon: <Si4Chan className="legacy-icon" />,
    heading: "Legacy 2",
    description:
      "As part of Milele Corporations, we inherit a rich legacy built on a foundation of trust, innovation, and customer satisfaction. Our parent company stands as one of the foremost players in the import and export of new cars worldwide, solidifying its reputation as an industry powerhouse.",
  },
  {
    icon: <SiAbbrobotstudio className="legacy-icon" />,
    heading: "Legacy 3",
    description:
      "As part of Milele Corporations, we inherit a rich legacy built on a foundation of trust, innovation, and customer satisfaction. Our parent company stands as one of the foremost players in the import and export of new cars worldwide, solidifying its reputation as an industry powerhouse.",
  },
  {
    icon: <SiAbbott className="legacy-icon" />,
    heading: "Legacy 4",
    description:
      "As part of Milele Corporations, we inherit a rich legacy built on a foundation of trust, innovation, and customer satisfaction. Our parent company stands as one of the foremost players in the import and export of new cars worldwide, solidifying its reputation as an industry powerhouse.",
  },
  {
    icon: <SiAbletonlive className="legacy-icon" />,
    heading: "Legacy 5",
    description:
      "As part of Milele Corporations, we inherit a rich legacy built on a foundation of trust, innovation, and customer satisfaction. Our parent company stands as one of the foremost players in the import and export of new cars worldwide, solidifying its reputation as an industry powerhouse.",
  },
];

const AboutusPage = () => {
  const { loading } = useReload();

  if (loading) {
    return <ReloadingComponent />;
  }

  return (
    <>
      <div id="main">
        <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            <MainNavbar />
          </div>
        </div>
        <div className="container mt-4 mb-4">
          <section className="about-us-main-section-1 pt-3 pb-3">
            <div className="about-us-section-1">
              {/* <div className="about-us-section-heading text-center">
                <h3>
                  <b>About US</b>
                </h3>
              </div> */}
              <div className="styled-label text-center">
                <span>
                  <b className="fs-3">About Us</b>
                </span>
                <hr className="aboutUs-heading-underline col-2 text-center" />
              </div>
              <br />
              <div className="about-us-section-1-container">
                <div className="row p-4 d-flex align-items-center">
                  <div className="about-us-text-col col-lg-6 col-md-7 col-sm-12">
                    <p>
                      Welcome to Milele Car Rental, a proud subsidiary of Milele
                      Corporations, a global leader with over 35 years of
                      unparalleled experience in the automotive industry.
                      Nestled under the esteemed Milele umbrella, we bring you a
                      legacy of excellence, reliability, and a commitment to
                      providing exceptional car rental services.
                    </p>
                  </div>
                  <div className="about-us-img-col col-lg-6 col-md-5 col-sm-12">
                    <div className="border-div-img">
                      <img src={AboutUsImg} alt="about-us-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-us-main-section-2 mt-5 pt-3 pb-3">
            <div className="about-us-section-1">
              <div className="styled-label text-center">
                <span>
                  <b className="fs-3">Why Us</b>
                </span>
                <hr className="aboutUs-heading-underline col-2 text-center" />
              </div>
              <div className="about-us-section-1-container">
                <div className="why-us-row-main-div row p-4">
                  {reasons.map((reason, index) => (
                    <div
                      className="why-us-text-col col-lg-4 col-md-6"
                      key={index}
                    >
                      <div className="row">
                        <div className=" why-us-single-container">
                          <div className="why-us-icon-div">{reason.icon}</div>
                          <div className="legacy-heading mt-2 mb-2">
                            <h5>
                              <b>{reason.heading}</b>
                            </h5>
                          </div>
                          <div className="legacy-description">
                            <p>{reason.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutusPage;
