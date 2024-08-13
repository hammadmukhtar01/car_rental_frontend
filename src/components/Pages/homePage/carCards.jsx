/* eslint-disable no-unused-vars */
import React from "react";
import BannerImg1WebP from "../../images/banner-slider-img1.webp";
import BannerImg2WebP from "../../images/banner-slider-img2.webp";
import BannerImg3WebP from "../../images/banner-slider-img3.webp";

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

  const imagesData = [
    {
      BannerImgPng: BannerImg1PNG,
      BannerImgWebP: BannerImg1WebP,
    },

    {
      BannerImgPng: BannerImg2PNG,
      BannerImgWebP: BannerImg2WebP,
    },

    {
      BannerImgPng: BannerImg3PNG,
      BannerImgWebP: BannerImg3WebP,
    },
  ];
  const imagesDataWebP = [BannerImg1WebP, BannerImg2WebP, BannerImg3WebP];

  return (
    <div className="testimonial-container pt-4 offer-car-main-section">
      <div
        className={`offers-car-container ${
          screenWidth > 992 ? "container" : ""
        }`}
      >
        <br />

        <Slider {...settings}>
          {imagesData.map((image, index) => (
            <div key={index} className="each-slide-effect p-1">
              <picture className="rent-exp-pic-container">
                <source srcSet={image?.BannerImgWebP} type="image/webp" />
                <img
                  src={image?.BannerImgPng}
                  alt={"offers-banner"}
                  className="banner-cards-images"
                  title={`Milele-car-rental-offers`}
                  aria-label={`offers-${index}`}
                  id={`home-page-offers-card-${index}`}
                />
              </picture>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
