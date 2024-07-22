import React from "react";
import BannerImg1PNG from "../../images/banner-slider-img1.jpg";
import BannerImg2PNG from "../../images/banner-slider-img2.jpg";
import BannerImg3PNG from "../../images/banner-slider-img3.jpg";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const Carousel = () => {
  const imagesData = [BannerImg1PNG, BannerImg2PNG, BannerImg3PNG];

  return (
    <div className="testimonial-container pt-4 offer-car-main-section">
      <div className="offers-car-container">
        <div className="container">
          <br />

          <Slide
            scale={0.7}
            duration={2000}
            transitionDuration={1000}
            arrows
            autoplay={false}
          >
            {imagesData.map((image, index) => (
              <div className="each-slide-effect" key={index}>
                <img
                  src={image}
                  alt={`Milele Car Rental Banner ${index + 1}`}
                  className="banner-cards-images"
                  title={`Mille Car Rental Banner`}
                />
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
