import React from "react";

const HomePageBanner = () => {
  return (
    <div>
      HomePageBanner
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://th.bing.com/th/id/R.5d3ad73c6c3cce63073a26502511d419?rik=ztAT5KsLQoBrug&pid=ImgRaw&r=0"
                alt="First slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>heading 1</h5>
                <p>.paragraph 1..</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://www.motortrend.com/uploads/sites/11/2020/03/Koenigsegg-Gemera-11.jpg?fit=around%7C875:492"
                alt="Second slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>..heading 2.</h5>
                <p>..paragraph 2.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://www.supercartribe.com/wp-content/uploads/2020/06/Koenigsegg-Gemera-0003-BR-768x363.jpg"
                alt="Third slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>.heading 3..</h5>
                <p>..paragraph 3.</p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePageBanner;
