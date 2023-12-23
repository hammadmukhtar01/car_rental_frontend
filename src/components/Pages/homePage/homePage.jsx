/* eslint-disable react/style-prop-object */
import React from "react";
import VehiclesPage from "../vehicle/vehiclesPage";

const HomePage = () => {
  const slidesData = [
    {
      key: "rs-1",
      thumb: "https://milelecarrental.com/Sliders/B1.png",
      image: "Sliders/B1.png",
      alt: "(LHD) HYUNDAI ACCENT 1.4P AT MY2023 - WHITE",
      duration: 3000,
    },
    {
      key: "rs-2",
      thumb: "Sliders/B2.png",
      image: "Sliders/B2.png",
      alt: "(LHD) KIA PICANTO 1.2P AT MY2023 – SPARKLING SILVER",
      duration: 4000,
    },
    // Add more slide data as needed
  ];

  return (
    <div>
      <div id="main">
        <div className="container">
          <div
            data-elementor-type="wp-page"
            data-elementor-id="3091"
            className="elementor elementor-3091"
          >
            {/* <section
              className="elementor-section elementor-top-section elementor-element elementor-element-c31469c elementor-section-boxed elementor-section-height-default elementor-section-height-default"
              data-id="c31469c"
              data-element_type="section"
            >
              <div className="elementor-container elementor-column-gap-no">
                <div
                  className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-bde34a8"
                  data-id="bde34a8"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-0882a80 elementor-widget elementor-widget-slider_revolution"
                      data-id="0882a80"
                      data-element_type="widget"
                      data-widget_type="slider_revolution.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="wp-block-themepunch-revslider">
                          <p className="rs-p-wp-fix"></p>
                          <rs-module-wrap
                            id="rev_slider_1_1_wrapper"
                            data-source="gallery"
                            style={{
                              visibility: "hidden",
                              background: "transparent",
                              padding: 0,
                              margin: "0px",
                              marginBottom: 0,
                            }}
                          >
                            <rs-module
                              id="rev_slider_1_1"
                              style={{}}
                              data-version="6.6.14"
                            >
                              <rs-slides
                                style={{
                                  overflow: "hidden",
                                  position: "absolute",
                                }}
                              >
                                {slidesData.map((slide) => (
                                  <rs-slide
                                    key={slide.key}
                                    className="responsiveClass"
                                    style={{ position: "absolute" }}
                                    data-key={slide.key}
                                    data-title="Slide"
                                    data-thumb={slide.thumb}
                                    data-duration={`${slide.duration}ms`}
                                    data-in="o:0;"
                                    data-out="a:false;"
                                  >
                                    <img
                                      decoding="async"
                                      src={slide.image}
                                      alt={slide.alt}
                                      title="Home"
                                      className="rev-slidebg tp-rs-img rs-lazyload"
                                      data-lazyload={slide.image}
                                      data-panzoom="d:10000;ss:100%;se:120%;"
                                      data-no-retina
                                    />
                                  </rs-slide>
                                ))}
                              </rs-slides>
                            </rs-module>
                          </rs-module-wrap>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
            <VehiclesPage />
            <section
              className="elementor-section elementor-top-section elementor-element elementor-element-64ac772 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default"
              data-id="64ac772"
              data-element_type="section"
              data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
            >
              <div className="elementor-container elementor-column-gap-default">
                <div
                  className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-2230996"
                  data-id="2230996"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-2160b2b elementor-widget elementor-widget-motors-listings-carousel"
                      data-id="2160b2b"
                      data-element_type="widget"
                      data-widget_type="motors-listings-carousel.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="stm-elementor_listings_carousel view_type_carousel style_1">
                          <div className="title heading-font">LEASING</div>
                          <div className="colored-separator">
                            <div className="first-long stm-base-background-color"></div>
                            <div className="last-short stm-base-background-color"></div>
                          </div>
                          <div
                            style={{ color: "white" }}
                            className="listing-car-items-units swiper-container items-per-view-3"
                            id="selc-24085"
                          >
                            <span style={{ color: "#cc761a" }}>MILELE</span> Car
                            Rental company strives to offer clients affordable
                            corporate and individual long term lease solutions,
                            which takes away all the administrative hassles. No
                            matter if you are a small or medium-sized business,
                            or an individual looking for a personal vehicle. We
                            provide efficient solutions that are both flexible
                            and customizable at a cost-effective price. The
                            biggest up-side of leasing is that you do not have
                            to worry about maintenance, servicing, insurance,
                            and renewals. Our friendly, experienced, and
                            professional team can tailor make a solution that
                            fits your needs and is not heavy on the pocket.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
