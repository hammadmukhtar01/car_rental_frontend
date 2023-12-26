import React from "react";

const VehiclesAnimation = () => {
  // eslint-disable-next-line no-unused-vars
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
    <div id="main">
      <div className="container">
        <div
          data-elementor-type="wp-page"
          data-elementor-id="3091"
          className="elementor elementor-3091"
        >
          <section
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
                          style={{visibility:"hidden", background:"transparent", padding:"0", margin:"0px auto", marginTop:"0", marginBottom:"0"}}
                        >
                          <rs-module
                            id="rev_slider_1_1"
                            data-version="6.6.14"
                          >
                            <rs-slides style={{overflow: "hidden", position: "absolute"}}>
                              <rs-slide
                                className="responsiveClass"
                                style={{position: "absolute"}}
                                data-key="rs-1"
                                data-title="Slide"
                                data-thumb="https://milelecarrental.com/Sliders/B1.png"
                                data-duration="3000ms"
                                data-in="o:0;"
                                data-out="a:false;"
                              >
                                <img
                                  decoding="async"
                                  src="Sliders/B1.png"
                                  alt="(LHD) HYUNDAI ACCENT 1.4P AT MY2023 - WHITE"
                                  title="Home"
                                  className="rev-slidebg tp-rs-img rs-lazyload"
                                  data-lazyload="Sliders/B1.png"
                                  data-panzoom="d:10000;ss:100;se:120%;"
                                  data-no-retina
                                />
                              </rs-slide>
                              <rs-slide
                                className="responsiveClass"
                                style={{position: "absolute"}}
                                data-key="rs-2"
                                data-title="Slide"
                                data-thumb="Sliders/B2.png"
                                data-duration="4000ms"
                                data-in="o:0;"
                                data-out="a:false;"
                              >
                                <img
                                  decoding="async"
                                  src="Sliders/B2.png"
                                  alt="(LHD) KIA PICANTO 1.2P AT MY2023 – SPARKLING SILVER"
                                  title="Home"
                                  className="rev-slidebg tp-rs-img rs-lazyload"
                                  data-lazyload="Sliders/B2.png"
                                  data-panzoom="d:10000;ss:100%;se:120%;"
                                  data-no-retina
                                />
                              </rs-slide>
                              <rs-slide
                                className="responsiveClass"
                                style={{position: "absolute"}}
                                data-key="rs-3"
                                data-title="Slide"
                                data-thumb="Sliders/B3.png"
                                data-duration="4000ms"
                                data-in="o:0;"
                                data-out="a:false;"
                              >
                                <img
                                  decoding="async"
                                  src="Sliders/B3.png"
                                  alt="(LHD) KIA K5 2.0P AT MY2023 – WHITE"
                                  title="Home"
                                  className="rev-slidebg tp-rs-img rs-lazyload"
                                  data-lazyload="Sliders/B3.png"
                                  data-panzoom="d:10000;ss:100%;se:120%;"
                                  data-no-retina
                                />
                              </rs-slide>
                              <rs-slide
                                className="responsiveClass"
                                style={{position: "absolute"}}
                                data-key="rs-4"
                                data-title="Slide"
                                data-thumb="Sliders/B4.png"
                                data-duration="4000ms"
                                data-in="o:0;"
                                data-out="a:false;"
                              >
                                <img
                                  decoding="async"
                                  src="Sliders/B4.png"
                                  alt="(LHD) NISSAN KICKS 1.6P AT MY2022 - BLACK"
                                  title="Home"
                                  className="rev-slidebg tp-rs-img rs-lazyload"
                                  data-lazyload="Sliders/B4.png"
                                  data-panzoom="d:10000;ss:100%;se:120%;"
                                  data-no-retina
                                />
                              </rs-slide>
                              <rs-slide
                                className="responsiveClass"
                                style={{position: "absolute"}}
                                data-key="rs-5"
                                data-title="Slide"
                                data-thumb="Sliders/B5.png"
                                data-duration="4000ms"
                                data-in="o:0;"
                                data-out="a:false;"
                              >
                                <img
                                  decoding="async"
                                  src="Sliders/B5.png"
                                  alt="(LHD) CHEVROLET CAPTIVA PREMIER 7-SEATER 1.5P AT MY2023"
                                  title="Home"
                                  className="rev-slidebg tp-rs-img rs-lazyload"
                                  data-lazyload="Sliders/B5.png"
                                  data-panzoom="d:10000;ss:100%;se:120%;"
                                  data-no-retina
                                />
                              </rs-slide>
                            </rs-slides>
                          </rs-module>
                        </rs-module-wrap>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VehiclesAnimation;
