/* eslint-disable no-unused-vars */
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
  SiCachet,
  SiAbstract,
} from "react-icons/si";

const aboutUsParagraphs = [
  {
    heading: "Our Legacy",
    description:
      "As part of Milele Corporations, we inherit a rich legacy built on a foundation of trust, innovation, and customer satisfaction. Our parent company stands as one of the foremost players in the import and export of new cars worldwide, solidifying its reputation as an industry powerhouse.",
  },

  {
    heading: "Unrivalled Fleet",
    description:
      "Experience the epitome of comfort, style, and performance with our extensive fleet of vehicles. From sleek city cars to Crossover SUVs, we offer a meticulously curated selection to ensure that every drive is a statement in luxury and reliability",
  },

  {
    heading: "Commitment to Quality",
    description:
      "At Milele Car Rental, quality is not just a standard; it's a promise. Our vehicles undergo rigorous maintenance checks to ensure they meet the highest safety and performance standards. Your safetyand satisfaction are our top priorities.",
  },

  {
    heading: "Customer-Centric Approach",
    description:
      "We take pride in our customer-centric philosophy. Whether you're a seasoned traveller, a business professional, or a family embarking on a vacation, our dedicated team is committed to making your car rental experience seamless, enjoyable, and hassle-free",
  },

  {
    heading: "Innovation and Sustainability",
    description:
      " As part of the Milele family, we embrace innovation and sustainability. Our commitment to eco-friendly practices is reflected in our efforts to incorporate fuel-efficient vehicles into our fleet, contributing to a greener and more sustainable future.",
  },

  {
    heading: "Your Journey, Our Priority",
    description:
      " Embark on your journey with the confidence that Milele Car Rental is dedicated to turning every drive into a memorable experience. With Milele Corporations' enduring legacy supporting us, we stand as your trusted partner for all your car rental needs.",
  },
  {
    heading: "Global Expertise, Local Excellence",
    description:
      "Benefiting from the global expertise of Milele Corporations, Milele Car Rental blends international standards with a deep understanding of local markets. Our approach is rooted in the belief that every journey deserves to be exceptional, and our services are tailored to meet the diverse needs of our valued clients",
  },
];

const AboutusPage = () => {
  // const { loading } = useReload();

  // if (loading) {
  //   return <ReloadingComponent />;
  // }

  return (
    <>
      <div id="main">
        {/* <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            <MainNavbar />
          </div>
        </div> */}
        <div className="container mt-4 mb-4">
          <section className="about-us-main-section-1 pt-3 pb-3">
            <div className="about-us-section-1">
              <div className="styled-label text-center">
                <span className="about-us-headings ">
                  <b className="fs-3">About Us</b>
                </span>
              </div>
              {/* <div className="about-us-section-1-container">
                <div className="row p-4 d-flex align-items-center">
                  <h4 className="about-us-main-heading pb-4">
                    Milele Car Rental - A Milele Corporations Subsidiary
                  </h4>
                  <div className="about-us-text-col col-lg-6 col-md-7 col-sm-12">
                    <p className="text-justify">
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
              </div> */}

              <div className="about-us-main-heading-1">
                <h2>
                  <strong>
                    Milele{" "}
                    <span className="about-us-main-heading-span">
                      Car Rental
                    </span>
                  </strong>
                </h2>
                <p>
                  Welcome to Milele Car Rental, a proud subsidiary of Milele
                  Corporations, a global leader with over 35 years of
                  unparalleled experience in the automotive industry. Nestled
                  under the esteemed Milele umbrella, we bring you a legacy of
                  excellence, reliability, and a commitment to providing
                  exceptional car rental services.
                </p>
              </div>
              <div className="about-us-mapped-data-container">
                {aboutUsParagraphs.map((aboutUsData, index) => (
                  <div className="about-us-all-heading" key={index}>
                    <h4>
                      {aboutUsData.heading}
                    </h4>
                    <p>{aboutUsData.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* <section className="about-us-main-section-2 mt-5 pt-3 pb-3">
            <div className="about-us-section-1">
              <div className="styled-label text-center">
                <span className="about-us-headings ">
                  <b className="fs-3">Why Us</b>
                </span>
              </div>
              <div className="about-us-section-1-container">
                <div className="why-us-row-main-div row p-4">
                  {reasons.map((reason, index) => (
                    <div
                      className="why-us-text-col col-lg-4 col-md-6 text-justify"
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
                          <div className="legacy-description ">
                            <p>{reason.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </>
  );
};

export default AboutusPage;
