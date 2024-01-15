import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Car1 from "../../images/car1.jpg";
import { useNavigate } from "react-router-dom";

const CarCards = () => {
  const navigate = useNavigate();

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
  ];

  const offersPageBookNowButton = () => {
    console.log("In offers page book now");
    navigate("/vehicles");
  };

  return (
    <div className="pt-3 offer-car-main-section">
      <div className="offers-car-container">
        <Container>
          <h2 className="offer-heading pt-2 pb-2">OFFERS</h2>
          <Row className="offers-car-container-row">
            {cars.map((car, index) => (
              <Col
                key={index}
                lg={4}
                md={6}
                sm={12}
                className="offers-car-div pb-4"
              >
                <div className="offer-car-item p-3">
                  <div id={`hr-value-tag-1`}></div>
                  <div className="tilted-car-price">
                    <b>{car.discount}% Off</b>
                  </div>
                  <div id={`hr-value-tag-2`}></div>
                  <div className="car-image-container ">
                    <a href="/vehicles">
                      <img
                        src={car.image}
                        alt={`Car ${index + 1}`}
                        className="car-image m-4"
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
                    <div className="discount-container"></div>
                  </div>
                  <div className="car-offers-container-submit-button d-flex justify-content-center">
                    <div className="col-xxl-6 col-lg-10 col-md-8 col-sm-6 col-6">
                      <Button
                        variant="primary"
                        className="offer-button"
                        onClick={offersPageBookNowButton}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CarCards;
