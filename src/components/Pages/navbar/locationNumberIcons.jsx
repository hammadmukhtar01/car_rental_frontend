import React, { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const FixedNumLocButtons = () => {
  const phoneNumber = "+971508805974";
  // const latitude = 25.177316;
  // const longitude = 55.376264;
  // const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const openMapModal = () => {
    setShowModal(true);
  };

  // const handleMapClick = () => {
  //   window.open(mapLink, "_blank");
  // };

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  // const center = {
  //   lat: latitude,
  //   lng: longitude,
  // };

  return (
    <div className="contact-buttons-container">
      <a href={`tel:${phoneNumber}`} className="contact-button phone-call-link">
        <FaPhone />
      </a>
      <a
        href={whatsappLink}
        target="_blank"
        className="contact-button whatsapp-link"
        rel="noreferrer"
      >
        <FaWhatsapp />
      </a>

      <a
        href="#map"
        onClick={openMapModal}
        className="contact-button map-link location-link"
      >
        <FaMapMarkerAlt />
      </a>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View location Details:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.852700403415!2d55.36611197620153!3d25.174451077725763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f675b5b792571%3A0x8dd25798a287aa87!2sMilele%20Showroom%2093!5e0!3m2!1sen!2sae!4v1695724496789!5m2!1sen!2sae"
            width="100%"
            height="550px"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="#"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FixedNumLocButtons;
