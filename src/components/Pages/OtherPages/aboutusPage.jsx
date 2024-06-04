/* eslint-disable no-unused-vars */
import React from "react";
import HashLoader from "react-spinners/ClipLoader";
import FreeConsultationForm from "../Blog/freeConsultationBlogForm";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet } from "react-helmet";

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
  return (
    <>
      <Helmet>
        <title>About Us - Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        <link
          rel="canonical"
          href="https://milelecarrental.com/aboutus"
          title={`about-us`}
        />
      </Helmet>
      <div id="main">
        <HeaderCombination />
        <div className="container mt-4 mb-4">
          <section className="about-us-main-section-1 pb-3">
            <div className="about-us-section-1">
              <div className="styled-label text-center mb-3">
                <span className="about-us-headings ">
                  <h1>
                    {" "}
                    <b className="fs-3">About Us</b>
                  </h1>
                </span>
              </div>
              <div className="about-us-main-heading-1">
                <h2>
                  <strong>
                    Milele{" "}
                    <span className="about-us-main-heading-span">
                      Car Rental
                    </span>
                  </strong>
                </h2>
                <p className="about-us-description">
                  Welcome to Milele Car Rental, a proud subsidiary of Milele
                  Corporations, a global leader with over 35 years of
                  unparalleled experience in the automotive industry. Nestled
                  under the esteemed Milele umbrella, we bring you a legacy of
                  excellence, reliability, and a commitment to providing
                  exceptional car rental services.
                </p>
              </div>
              <div className="about-us-mapped-data-container">
                {aboutUsParagraphs?.map((aboutUsData, index) => (
                  <div className="about-us-all-heading" key={index}>
                    <h5 className="pt-1 pb-1">
                      <b> {aboutUsData?.heading}:</b>{" "}
                    </h5>
                    <p className="about-us-description">
                      {aboutUsData?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <FreeConsultationForm />
        <FooterCombination />
      </div>
    </>
  );
};

export default AboutusPage;
