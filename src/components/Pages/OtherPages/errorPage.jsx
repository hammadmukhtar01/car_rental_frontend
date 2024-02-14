import React from "react";
import "./errorPage.css";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
  const errorPageBackButton = () => {
    navigate("/");
  };
  return (
    <div className="container1">
      <div className="container-star">
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-1"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
        <div className="star-2"></div>
      </div>
      <div className="container container-bird">
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="bird bird-anim">
          <div className="bird-container">
            <div className="wing wing-left">
              <div className="wing-left-top"></div>
            </div>
            <div className="wing wing-right">
              <div className="wing-right-top"></div>
            </div>
          </div>
        </div>
        <div className="container-title">
          <div className="err-page-title">
            <div className="number-value">4</div>
            <div className="moon">
              <div className="face">
                <div className="mouth"></div>
                <div className="eyes">
                  <div className="eye-left"></div>
                  <div className="eye-right"></div>
                </div>
              </div>
            </div>
            <div className="number-value">4</div>
          </div>
          <div className="subtitle">
            oops. The page you are looking for doesn't exist.
          </div>
          <button className="go-back-error-page-button" onClick={errorPageBackButton}>Go back</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
