import React, { useState, useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
import LargeBanner1 from "../../images/web-offer-banner-2.jpg";
import SmallBanner2 from "../../images/web-offer-banner.jpg";

const LargeBanner = LargeBanner1;
const SmallBanner = SmallBanner2;

const Carousel = () => {
  const [bannerImg, setBannerImg] = useState(LargeBanner);

  const changeBanner = () => {
    if (window.innerWidth <= 767) {
      setBannerImg(SmallBanner);
    } else {
      setBannerImg(LargeBanner);
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
          <div className="styled-label">
            <div className="heading-icon-container-div">
              <BsPersonCircle className="mr-2 home-page-heading-icon" />
              <span>
                <b className="fs-3">Offers:</b>
              </span>
            </div>
            <hr className="home-page-heading-underline col-2" />
          </div>
          <div className="main-banner-img-container">
            <img
              className="main-banner-img"
              id="banner-img"
              src={bannerImg}
              alt="banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
