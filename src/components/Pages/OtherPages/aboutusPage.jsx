import React from "react";
import MainNavbar from "../navbar/mainNavbar";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "./../../PrivateComponents/reloadingComponent";
import HashLoader from "react-spinners/ClipLoader";
import AboutUsImg from "../../images/bgImg3.jpg";
import AboutUsImg2 from "../../images/bgImg2.jpg";
import { SiLegacygames } from "react-icons/si";

const AboutusPage = () => {
  const { loading } = useReload();

  if (loading) {
    return (
      // <div className="loader-container-main">
      //   <HashLoader
      //     color="#cc6119"
      //     loading={loading}
      //     size={100}
      //     speedMultiplier={0.5}
      //     aria-label="Loading Spinner"
      //     data-testid="loader"
      //   />
      // </div>

      // <>
      //   <div className="loader-container">
      //     <div className="loader">
      //       <span></span>
      //     </div>
      //     <div className="loader">
      //       <span></span>
      //     </div>
      //     <div className="loader">
      //       <i></i>
      //     </div>
      //     <div className="loader">
      //       <i></i>
      //     </div>
      //   </div>
      // </>

      <>
        <ReloadingComponent />
      </>
    );
  }

  return (
    <>
      <div id="main">
        <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            <MainNavbar />
          </div>
        </div>
        <div className="container mt-4 mb-4">
          <section className="about-us-main-section-1">
            <div className="about-us-section-1">
              <div className="about-us-section-heading text-center">
                <h3>
                  <b>About US</b>
                </h3>
              </div>
              <div className="about-us-section-1-container">
                <div className="row p-4 d-flex align-items-center">
                  <div className="about-us-text-col col-6">
                    <p>
                      Welcome to Milele Car Rental, a proud subsidiary of Milele
                      Corporations, a global leader with over 35 years of
                      unparalleled experience in the automotive industry.
                      Nestled under the esteemed Milele umbrella, we bring you a
                      legacy of excellence, reliability, and a commitment to
                      providing exceptional car rental services.
                    </p>
                  </div>
                  <div className="about-us-img-col col-6">
                    <img src={AboutUsImg} alt="about-us-img" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-us-main-section-1">
            <div className="about-us-section-1">
              <div className="about-us-section-heading text-center">
                <h3>
                  <b>Why US?</b>
                </h3>
              </div>
              <div className="about-us-section-1-container">
                <div className="row p-4 ">
                  {/* <div className="about-us-img-col col-6">
                    <img src={AboutUsImg2} alt="about-us-img" />
                  </div> */}

                  <div className="about-us-text-col col-4">
                    <div className="row ">
                      <div className="col-12 why-us-single-container">
                        <SiLegacygames className="legacy-icon" />
                        <div className="legacy-heading mt-2 mb-2">
                          <h5>
                            <b>Legacy</b>
                          </h5>
                        </div>
                        <div className="legacy-description">
                          <p>
                            {" "}
                            As part of Milele Corporations, we inherit a rich
                            legacy built on a foundation of trust, innovation,
                            and customer satisfaction. Our parent company stands
                            as one of the foremost players in the import and
                            export of new cars worldwide, solidifying its
                            reputation as an industry powerhouse.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="about-us-text-col col-4">
                    <div className="row">
                      <div className="col-12 why-us-single-container">
                        <SiLegacygames className="legacy-icon" />
                        <div className="legacy-heading mt-2 mb-2">
                          <h5>
                            <b>Legacy</b>
                          </h5>
                        </div>
                        <div className="legacy-description">
                          <p>
                            {" "}
                            As part of Milele Corporations, we inherit a rich
                            legacy built on a foundation of trust, innovation,
                            and customer satisfaction. Our parent company stands
                            as one of the foremost players in the import and
                            export of new cars worldwide, solidifying its
                            reputation as an industry powerhouse.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="about-us-text-col col-4">
                    <div className="row">
                      <div className="col-12 why-us-single-container">
                        <SiLegacygames className="legacy-icon" />
                        <div className="legacy-heading mt-2 mb-2">
                          <h5>
                            <b>Legacy</b>
                          </h5>
                        </div>
                        <div className="legacy-description">
                          <p>
                            {" "}
                            As part of Milele Corporations, we inherit a rich
                            legacy built on a foundation of trust, innovation,
                            and customer satisfaction. Our parent company stands
                            as one of the foremost players in the import and
                            export of new cars worldwide, solidifying its
                            reputation as an industry powerhouse.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
