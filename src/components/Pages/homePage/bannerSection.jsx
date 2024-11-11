/* eslint-disable no-unused-vars */
import React from "react";
import LargeBanner1 from "../../images/web-offer-banner.jpg";
import LargeBanner1WebP from "../../images/web-offer-banner.webp";

const BannerSection = () => {
  return (
    <div className="container pt-4 offer-car-main-section">
      <div className="offers-car-container">
        <div className="container">
          <br />
          <div className="main-banner-img-container">
            <picture>
              <source srcSet={LargeBanner1WebP} type="image/webp" />
              <source srcSet={LargeBanner1} type="image/jpg" />
              <img
                className="main-banner-img"
                id="banner-img"
                title={`Milele Car Rental Banner`}
                src={LargeBanner1}
                alt="Milele Car Rental Banner"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
