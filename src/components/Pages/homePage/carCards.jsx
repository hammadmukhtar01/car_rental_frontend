/* eslint-disable no-unused-vars */
import React from "react";
import BannerImg1PNG from "../../images/banner-slider-img1.jpg";
import BannerImg2PNG from "../../images/banner-slider-img2.jpg";
import BannerImg3PNG from "../../images/banner-slider-img3.jpg";
import "react-slideshow-image/dist/styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const screenWidth = window.innerWidth;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const imagesData = [BannerImg1PNG, BannerImg2PNG, BannerImg3PNG];

  return (
    <div className="testimonial-container pt-4 offer-car-main-section">
      <div className={`offers-car-container ${screenWidth > 992 ? "container" : ""}`}>
          <br />

          <Slider {...settings}>
            {imagesData.map((image, index) => (
              <div key={index} className="each-slide-effect p-1">
                <img
                  src={image}
                  alt={`${image}`}
                  className="banner-cards-images"
                  title={`Milele-car-rental-offers`}
                  aria-label={`offers-${index}`}
                  id={`home-page-offers-card-${index}`}
                />
              </div>
            ))}
          </Slider>
      </div>
    </div>
  );
};

export default Carousel;
