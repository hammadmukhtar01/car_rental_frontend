/* eslint-disable no-unused-vars */
import React from "react";
import SearchBox from "./searchBox";
import CarCards from "./carCards";
import AnimatedCarSection from "./animatedCarSection";
import OurBlogs from "../Blog/ourBlogs";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";
import InstagramFeed from "./instagramFeed";
import FreeConsultationForm from "../Blog/freeConsultationBlogForm";
import HomePageTopBar from "../navbar/homePageTopBar";
import MainNavbar from "../navbar/mainNavbar";
import FooterCombination from "../../PrivateComponents/footerCombination";
import ZeroSecuirtyDepositImg from "../../images/zero-deposit.svg";
import TabbytImg from "../../images/tabby.svg";
import MoreVehiclesImg from "../../images/vehicles.svg";
import StepperComponent from "./stepperComponent";

import ZeroSecuirtyDepositWebPImg from "../../images/zero-deposit.webp";
import TabbytWebPImg from "../../images/tabby.webp";
import MoreVehiclesWebPImg from "../../images/vehicles.webp";

const HomePage = () => {
  const rentalExpDataArr = [
    {
      id: 1,
      iconName: ZeroSecuirtyDepositImg,
      webPIcon: ZeroSecuirtyDepositWebPImg,
      headingName: "Zero Security Deposit",
      rentalExpDetail:
        "Enjoy a hassle-free experience without the need for upfront callateral.",
    },

    {
      id: 2,
      iconName: TabbytImg,
      webPIcon: TabbytWebPImg,
      headingName: "Pay in Installments with Tabby",
      rentalExpDetail:
        "Enjoy payment flexibility by spreading the cost of your rental over time with Tabby.",
    },

    {
      id: 3,
      iconName: MoreVehiclesImg,
      webPIcon: MoreVehiclesWebPImg,
      headingName: "Wide Selection of Vehicles",
      rentalExpDetail: "From compace to luxury Sedans and spacious SUVs.",
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Rent a Car Dubai | Car Rental without Deposit</title>
        <meta
          name="description"
          content="Discover the best car rental service in Dubai with zero deposit and flexible payment options. Choose from a wide range of vehicles at Milele Car Rental. Rent now and enjoy special offers!"
        />
        <meta name="keywords" content="keywords" />
        <link rel="canonical" href="https://www.milelecarrental.com/" />
      </Helmet>

      <HomePageTopBar />
      <div className="navbar-div-container">
        <MainNavbar />
      </div>

      <div id="main">
        <div className="homepage-main">
          <div className="search-box-home-page-container">
            <div className="bg-img-banner-main"></div>
            <div className="search-box-home-page mt-3">
              <SearchBox />
            </div>
            <div className="home-page-horizontal-line-2">
              <h1 className="home-page-horizontal-line-2-text">
                Rent, Drive & Explore Dubai
              </h1>
            </div>
          </div>

          <Container>
            <section>
              <div className="home-page-rental-exp-container ">
                <div className="rental-exp-heading">
                  <h2>
                    <strong>
                      We are ensuring <br />
                      the best rental eperience.
                    </strong>
                  </h2>
                </div>
                <div className="rental-exp-data">
                  <Row>
                    {rentalExpDataArr?.map((rentalExpData) => (
                      <Col
                        xxl={4}
                        lg={4}
                        md={12}
                        sm={12}
                        xs={12}
                        className="rental-exp-icon-text-container"
                        key={rentalExpData?.id}
                      >
                        {" "}
                        <div className="rent-exp-pic-container">
                          <picture className="rent-exp-pic-container">
                            <source
                              srcSet={rentalExpData?.webPIcon}
                              type="image/webp"
                            />
                            <img
                              src={rentalExpData?.iconName}
                              alt={rentalExpData?.headingName}
                              className="rental-exp-icon"
                              title="rental-exp"
                            />{" "}
                          </picture>
                          <Row>
                            <div className="rental-exp-sub-headings">
                              <b>{rentalExpData?.headingName}</b>
                            </div>{" "}
                            <div className="rental-exp-detail">
                              {rentalExpData?.rentalExpDetail}
                            </div>
                          </Row>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </section>
          </Container>

          <CarCards />
          <br />
          <br />
          <br />
          <AnimatedCarSection />
          <br />
          <div className="stepper-component-home-container">
            <StepperComponent />
          </div>
          <br />
          <br />

          <div className="instagram-feed-home-container container">
            <div className="styled-label text-center">
              <h2 className="our-fleet-heading-home-page text-center">
                <span>
                  <b className="fs-1">INSTAGRAM FEED</b>
                </span>
              </h2>
            </div>
            <InstagramFeed />
          </div>
          <OurBlogs />

          <FreeConsultationForm />
        </div>
      </div>

      <FooterCombination />
    </HelmetProvider>
  );
};

export default HomePage;
