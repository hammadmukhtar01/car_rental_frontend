import React from "react";
import { Button } from "react-bootstrap";
import Car1 from "../../images/car1.jpg";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { BsPersonCircle } from "react-icons/bs";

const cars = [
  {
    name: "Car name 1",
    image: Car1,
    discount: 90,
  },
  {
    name: "Car name 2",
    image:
      "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
    discount: 15,
  },
  {
    name: "Car name 3",
    image:
      "https://www.dkeng.co.uk/sales_images/1593558000/large_1594227296_murcielagosv_57.jpg",
    discount: 25,
  },
  {
    name: "Car name 4",
    image:
      "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
    discount: 25,
  },
  {
    name: "Car name 5",
    image: Car1,
    discount: 25,
  },
  {
    name: "Car name 6",
    image:
      "https://www.dkeng.co.uk/sales_images/1593558000/large_1594227296_murcielagosv_57.jpg",
    discount: 25,
  },
];

const Carousel = () => {
  const navigate = useNavigate();

  const offersPageBookNowButton = () => {
    console.log("In offers page book now");
    navigate("/vehicles");
  };

  const responsive = {
    0: { items: 1 },
    676: { items: 2 },
    1024: { items: 3 },
  };

  const generateTestimonialItem = (car) => (
    <div key={car.name} className="item container">
      <MDBContainer className="p-2">
        <MDBRow className="text-center offers-car-container-row">
          <MDBCol className="offers-car-div pb-4">
            <div className="offer-car-item p-3">
              {/* <div id={`hr-value-tag-1`}></div>
              <div className="tilted-car-price">
                <b>{car.discount}% Off</b>
              </div>
              <div id={`hr-value-tag-2`}></div> */}
              <div className="car-image-container ">
                <a href="/vehicles">
                  <img
                    src={car.image}
                    alt={`${car.name} car`}
                    className="car-image"
                  />
                </a>
                <div className="car-image-overlay"></div>
              </div>
              <hr className="discount-line" />
              <div className="car-details">
                <p className="car-name">
                  {" "}
                  <b>{car.name}</b>{" "}
                </p>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <div className="button-container">
                  <button
                    className="animated-button"
                    onClick={offersPageBookNowButton}
                  >
                    <span className="button-text-span">
                      <span className="transition"></span>
                      <span className="gradient"></span>
                      <span className="label">Rent Now</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );

  return (
    <div className="testimonial-container pt-4 offer-car-main-section">
      <div className="offers-car-container">
        <div className="container">
          <div className="styled-label">
            <div className="heading-icon-container-div">
              <BsPersonCircle className="mr-2 home-page-heading-icon" />
              <span>
                <b className="fs-3">Offers Cars:</b>
              </span>
            </div>
            <hr className="home-page-heading-underline col-2" />
          </div>
          <AliceCarousel
            mouseTracking
            items={cars.map(generateTestimonialItem)}
            responsive={responsive}
            controlsStrategy="alternate"
            infinite
            autoPlay
            autoPlayInterval="2000"
            animationDuration="1500"
          />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="pt-3 offer-car-main-section">
  //     <div className="offers-car-container">
  //
  //     </div>
  //   </div>
  // );
};

export default Carousel;
