/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { Modal } from "react-bootstrap";

const FixedNumLocButtons = () => {
  const phoneNumber = "0563298330";
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const openMapModal = () => {
    setShowModal(true);
  };

  const handlePhoneClick = (e) => {
    e.preventDefault();
    window.dataLayer.push({
      event: "conversion",
      send_to: "AW-11403132105/qF1YCJP11LYZEMn5t70q",
    });
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsappClick = (e) => {
    e.preventDefault();
    window.dataLayer.push({
      event: "conversion",
      send_to: "AW-11403132105/OOTfCN_b2bYZEMn5t70q",
    });
    window.open(whatsappLink, "_blank");
  };

  return (
    <>
      <div className="contact-buttons-container">
        <a
          href={`tel:${phoneNumber}`}
          title={"phone Number"}
          className="contact-button phone-call-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePhoneClick}
        >
          <FaPhone />
        </a>

        <a
          href={whatsappLink}
          title={"whatsapp"}
          className="contact-button whatsapp-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsappClick}
        >
          <FaWhatsapp />
        </a>

        <a
          href="#map"
          title="Find Our Location"
          onClick={openMapModal}
          className="contact-button map-link location-link"
        >
          <FaMapMarkerAlt />
        </a>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <span className="modal-heading">View location Details:</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=milele showroom 11&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              width="100%"
              height="550px"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Milele Location"
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default FixedNumLocButtons;
