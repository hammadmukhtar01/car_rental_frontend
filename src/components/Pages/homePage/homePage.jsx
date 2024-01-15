import React from "react";
import SearchBox from "./searchBox";
import CarCards from "./carCards";
import AnimatedCarSection from "./animatedCarSection";
import TestimonialSlider from "./testimonialSlider";

const HomePage = () => {
  return (
    <div className="">
      <div id="main">
        <div className="homepage-main">
          <div className="search-box-home-page">
            <SearchBox />
          </div>

          <div className="tag-line-heading-home-page p-4">
            <h1 className="tag-line-heading-text">
              Drive Luxury Cars In Dubai
            </h1>
            <h1 className="tag-line-heading-text">Afforable Cars</h1>
          </div>
          <CarCards />

          <AnimatedCarSection />

          <section
            className=" elementor-element elementor-element-64ac772 leasing-milele-car-heading"
            data-id="64ac772"
            data-element_type="section"
            data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
          >
            <div className="elementor-container container">
              <div
                className="elementor-column "
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
                        <div className="leasing-title heading-font">
                          LEASING
                        </div>
                        <div className="colored-separator">
                          <div className="first-long stm-base-background-color"></div>
                          <div className="last-short stm-base-background-color"></div>
                        </div>
                        <div
                          style={{ color: "white" }}
                          className="swiper-container items-per-view-3"
                          id="selc-24085"
                        >
                          <span style={{ color: "#cc761a" }}>MILELE</span> Car
                          Rental company strives to offer clients affordable
                          corporate and individual long term lease solutions,
                          which takes away all the administrative hassles. No
                          matter if you are a small or medium-sized business, or
                          an individual looking for a personal vehicle. We
                          provide efficient solutions that are both flexible and
                          customizable at a cost-effective price. The biggest
                          up-side of leasing is that you do not have to worry
                          about maintenance, servicing, insurance, and renewals.
                          Our friendly, experienced, and professional team can
                          tailor make a solution that fits your needs and is not
                          heavy on the pocket.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <TestimonialSlider />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
