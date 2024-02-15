import React, { useState } from "react";
import "./spinTheWheel.css";
import WheelComponent from "react-wheel-of-prizes";
import { Modal } from "react-bootstrap";

export default function SpinTheWheel() {
  const [showModal, setShowModal] = useState(false);

  const segments = [
    "Try Again",
    "Better Luck Next Time",
    "Win 100kms",
    "Win 300kms",
    "Win 500kms",
    "Win 1000kms",
    "Win an iPhone",
    "Goodie Bag",
    "10% Discount",
  ];
  const segColors = [
    "blue",
    "green",
    "purple",
    "orange",
    "gray",
    "green",
    "purple",
    "orange",
    "gray",
  ];

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const onFinished = (winner) => {
    console.log(winner);
    setResult(winner);
    setShowResult(true);
    openMapModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const openMapModal = () => {
    setShowModal(true);
  };

  return (
    <div className="container">
      {/* Background Celebration Animation */}
      <div className="celebration-animation"></div>

      {/* Spin Wheel Container */}
      <div className="spin-wheel-main-container">
        <div className="d-flex">
          <WheelComponent
            className="spin-wheel-component-class row"
            segments={segments}
            segColors={segColors}
            onFinished={(winner) => onFinished(winner)}
            primaryColor=""
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={false}
            size={290}
            upDuration={200}
            downDuration={900}
          />
        </div>
      </div>

      {/* Modal or Toast for showing the result */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Spin The Wheel Result:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showResult && (
            <div className="result-modal">
              <div className="result-content">
                <h2>Congratulations!</h2>
                <p>You won: {result}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
