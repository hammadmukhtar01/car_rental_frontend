import React, { useEffect } from "react";
import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "owl.carousel/dist/owl.carousel.min.js";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
import { BsPersonCircle } from "react-icons/bs";

const AnimatedCarSection = () => {
  useEffect(() => {
    window.$(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      autoplaySpeed: 3000,
      center: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 3,
        },
      },
    });
  }, []);

  const imagesData = [
    {
      url: "https://th.bing.com/th/id/R.272d670b7d1630746a2b7e462b2ce0fd?rik=PJL2qomwCTIveA&riu=http%3a%2f%2fwww.car-revs-daily.com%2fwp-content%2fuploads%2f2015%2f11%2f2017-Lamborghini-Huracan-LP580-2-5.jpg&ehk=E8NDHruM3yujOmrD7hoWEVSjSIy3c7Bly%2b77bI7%2fJpI%3d&risl=&pid=ImgRaw&r=0",
      type: "Family Car",
    },
    {
      url: "https://www.dkeng.co.uk/sales_images/1593558000/large_1594227296_murcielagosv_57.jpg",
      type: "Type 2",
    },
    {
      url: "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
      type: "Intermediate",
    },
    {
      url: "https://www.dkeng.co.uk/sales_images/1593558000/large_1594227296_murcielagosv_57.jpg",
      type: "Type 2",
    },
    {
      url: "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
      type: "Intermediate",
    },
  ];

  return (
    <div>
      <section id="slider" className="pt-5">
        <div className="container">
          <div className="bg-white">
            <h2 className="offer-heading pl-3 bg-white">
              <div className="location-label">
                <div className="styled-label">
                  <BsPersonCircle className="mr-2 home-page-heading-icon" />
                  <b>Our Fleet Cars:</b>
                  <hr className="home-page-heading-underline col-3" />
                </div>
              </div>
            </h2>
            <div className="slider-container">
              <div className="slider">
                <div className="owl-carousel owl-carousel-main-container">
                  {imagesData.map((data, index) => (
                    <div className="animated-imgs-container" key={index}>
                      <div className="slider-card slider-imgs">
                        <h2 className="text-center pt-3">{data.type}</h2>
                        <div className="d-flex justify-content-center align-items-center mb-4">
                          <a href="/vehicles">
                            <img
                              src={data.url}
                              alt={`Slide ${index + 1}`}
                              className="img-fluid slider-item pl-4"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedCarSection;
