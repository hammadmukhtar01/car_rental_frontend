/* eslint-disable no-unused-vars */
import React from "react";
import SearchBox from "./searchBox";
import CarCards from "./carCards";
import AnimatedCarSection from "./animatedCarSection";
import OurBlogs from "../Blog/ourBlogs";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";
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
import FaqsData from "../OtherPages/faqsData";
import TextualDataHomePage from "./textualDataHomePage";
import BannerSection from "./bannerSection";

const HomePage = () => {
  const rentalExpDataArr = [
    {
      id: 1,
      iconName: ZeroSecuirtyDepositImg,
      webPIcon: ZeroSecuirtyDepositWebPImg,
      headingName: "Rent a Car Without Deposit",
      rentalExpDetail:
        "Enjoy a hassle-free experience without the need for upfront collateral.",
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
      rentalExpDetail: "From compact to luxury Sedans and spacious SUVs.",
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
              <h1 className="home-page-horizontal-line-2-text">Rent A Car In Dubai</h1>
            </div>
          </div>

          <Container>
            <br />
            <section>
              {/* <h2 className="styled-label text-center">
                {" "}
                Rent, Drive And Explore Dubai
              </h2> */}

              <p>
                Welcome to Milele, your trusted partner for car rental in Dubai,
                offering an extensive fleet of vehicles suitable for both
                personal enjoyment and professional use. From the sleek luxury
                of a Nissan to the practical economy of Suzuki and Toyota
                models, we have a vehicle to meet every need and budget. Our
                rental services are designed to be flexible, accommodating
                customers who need a vehicle for a short day trip or a
                longer-term arrangement, perfectly suiting both tourists and
                residents across the UAE. <br /> <br />
                Our service areas cover several key locations across Dubai,
                making it convenient to rent a car in Dubai no matter where you
                are located. Notable areas include Downtown Dubai, Al Barsha,
                Ras Al Khor, Dubai Marina, Festival City, Dubai Silicon Oasis,
                Bur Dubai, Al Warqa, Jumeirah Lake Towers, and many more. Each
                location is catered to with the same high standard of service,
                ensuring a seamless car rental experience in Dubai. <br />
                <br />
                Milele Car Rental is committed to making rent a car simple and
                stress-free. Our transparent pricing policy means no hidden
                costs, allowing our customers to plan their expenses accurately.
                All our vehicles are meticulously maintained and sanitized to
                ensure your safety and comfort. Whether you need a vehicle for a
                quick trip around Business Bay or daily commuting from Downtown
                Dubai, Milele is here to help. Contact us today to secure your
                ideal rental car in Dubai and enjoy unmatched convenience and
                service.
              </p>
            </section>
            <section>
              <div className="home-page-rental-exp-container ">
                <div className="rental-exp-heading">
                  <h2>
                    <strong>
                      We are ensuring <br />
                      the best rental experience in dubai
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

          {/* <CarCards /> */}
          <BannerSection />
          <TextualDataHomePage />

          <br />
          <AnimatedCarSection />
          <br />

          <div className="stepper-component-home-container">
            <StepperComponent />
          </div>
          <br />
          <br />

          <OurBlogs />

          <FaqsData />

          <FreeConsultationForm />
        </div>
      </div>

      <FooterCombination />
    </HelmetProvider>
  );
};

export default HomePage;
