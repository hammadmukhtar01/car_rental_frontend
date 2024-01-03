/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./review.css";
import { FaUser, FaStar } from "react-icons/fa";

const Review = () => {
  const backendRating = 4;
  const avgRating = 3.9;
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const renderStarButton = (index, filled, fillPercentage) => (
    <p
      key={index}
      type="button"
      className={`btn btn-${filled ? "warning" : "default"} btn-xs`}
      aria-label="Left Align"
      style={{
        boxShadow: "none",
        margin: "1px",
        background: filled
          ? "#f0ad4e"
          : `linear-gradient(90deg, #f0ad4e ${fillPercentage}%, white ${fillPercentage}%)`,
        color: "black",
      }}
      onMouseEnter={() => setHoveredRating(index + 1)}
      onMouseLeave={() => setHoveredRating(0)}
      onClick={() => setUserRating(index + 1)}
    >
      <FaStar color={filled ? "white" : "#929292"} />
    </p>
  );

  const generateRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;

    const stars = Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) {
        return renderStarButton(index, true, 100);
      } else if (index === fullStars && decimalPart > 0) {
        const fillPercentage = Math.round(decimalPart * 100);
        return renderStarButton(index, false, fillPercentage);
      } else {
        return renderStarButton(index, false, 0);
      }
    });

    return stars;
  };

  const ratingData = [
    {
      rating: 5,
      progressClass: "progress-bar-success",
      progressValue: 100,
      count: 1,
    },
    {
      rating: 4,
      progressClass: "progress-bar-primary",
      progressValue: 80,
      count: 1,
    },
    {
      rating: 3,
      progressClass: "progress-bar-info",
      progressValue: 60,
      count: 0,
    },
    {
      rating: 2,
      progressClass: "progress-bar-warning",
      progressValue: 40,
      count: 0,
    },
    {
      rating: 1,
      progressClass: "progress-bar-danger",
      progressValue: 20,
      count: 0,
    },
  ];

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the submission logic (e.g., send data to the backend)
    console.log("User Rating:", userRating);
    console.log("Comment:", comment);
  };

  return (
    <div>
      <div className="review-container p-4">
        <div className="row">
          <div className="col-sm-4">
            <div className="rating-block">
              <h4>Average user rating</h4>
              <h2 className="bold padding-bottom-7">
                {avgRating} <small>/ 5</small>
              </h2>
              {generateRatingStars(avgRating)}
            </div>
          </div>
          <div className="col-sm-6">
            <h4>Rating breakdown</h4>
            {ratingData.map((item, index) => (
              <div key={index} className="pull-left">
                <div
                  className="pull-left"
                  style={{ width: "60px", lineHeight: "1" }}
                >
                  <div style={{ height: "12px", margin: "5px 0" }}>
                    {item.rating}{" "}
                    <span className="glyphicon glyphicon-star"></span>
                  </div>
                </div>
                <div className="pull-left" style={{ width: "280px" }}>
                  <div
                    className="progress"
                    style={{ height: "9px", margin: "8px 0" }}
                  >
                    <div
                      className={`progress-bar ${item.progressClass}`}
                      role="progressbar"
                      aria-valuenow={item.rating}
                      aria-valuemin="0"
                      aria-valuemax="5"
                      style={{ width: `${item.progressValue}%` }}
                    >
                      <span className="sr-only">
                        {item.progressValue}% Complete (danger)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pull-right" style={{ marginLeft: "10px" }}>
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="row" style={{ padding: "20px" }}>
          <div className="col-12">
            <hr />
            <div className="review-block">
              <div className="row">
                <div className="col-sm-3" style={{ textAlign: "center" }}>
                  <div
                    className="customer-review-icon"
                    style={{ textAlign: "center" }}
                  >
                    <FaUser className="icon-person" />
                  </div>
                  <div className="review-block-name">
                    <b>Customer Name</b>
                  </div>
                  <div className="review-block-date">
                    January 29, 2016
                    <br />1 day ago
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="review-block-rate">
                    {generateRatingStars(backendRating)}
                  </div>
                  <div className="review-block-description">
                    this was nice in buy. this was nice in buy. this was nice in
                    buy. this was nice in buy this was nice in buy this was nice
                    in buy this was nice in buy this was nice in buy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="enter-review-container p-3">
          <div className="row" style={{ padding: "1px" }}>
            <div className="col-12">
              <hr />
              <div className="add-review-block">
                <h4>Add Your Review</h4>
                <div className="rating-block">
                  {generateRatingStars(userRating)}
                </div>
                <br />
                <textarea
                  rows="4"
                  cols="50"
                  placeholder="Write your comments here..."
                  value={comment}
                  onChange={handleCommentChange}
                  className="form-control-1"
                  style={{backgroundColor: "white", borderRadius: "5px"}}
                ></textarea>
              </div>
            </div>
            <br />
            <div className="col-lg-3 offset-lg-4">
              <div className="row m-0 pt-4">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  Submit Review{" "}
                </button>
              </div>
            </div>
          </div>
            <br />
        </div>
      </div>
    </div>
  );
};

export default Review;
