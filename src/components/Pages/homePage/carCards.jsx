import React, { useState, useEffect } from "react";
import LargeBanner1PNG from "../../images/web-offer-banner-3.png";
import LargeBanner1WebP from "../../images/web-offer-banner-3.webp";
// import SmallBanner2 from "../../images/web-offer-banner-3.jpg";

const LargeBannerPNG = LargeBanner1PNG;
const SmallBanner = LargeBanner1PNG;

const Carousel = () => {
  const [bannerImgWebP, setBannerImgWebP] = useState(LargeBanner1WebP);
  const [bannerImgPNG, setBannerImgPNG] = useState(LargeBannerPNG);

  const changeBanner = () => {
    if (window.innerWidth <= 767) {
      setBannerImgPNG(SmallBanner);
    } else {
      setBannerImgWebP(LargeBanner1WebP);
      setBannerImgPNG(LargeBannerPNG);
    }
  };

  useEffect(() => {
    changeBanner();

    window.addEventListener("resize", changeBanner);

    return () => {
      window.removeEventListener("resize", changeBanner);
    };
  }, []);

  return (
    <div className="testimonial-container pt-4 offer-car-main-section">
      <div className="offers-car-container">
        <div className="container">
          <br />
          <div className="main-banner-img-container">
            <picture>
              <source srcSet={bannerImgWebP} type="image/webp" />
              <source srcSet={bannerImgPNG} type="image/png" />
              <img
                className="main-banner-img"
                id="banner-img"
                title={`Mille Car Rental Banner`}
                src={bannerImgPNG}
                alt="Milele Car Rental Banner"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
