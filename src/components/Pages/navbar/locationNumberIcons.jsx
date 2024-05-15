import React, { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { Modal } from "react-bootstrap";

const FixedNumLocButtons = () => {
  const phoneNumber = "+971563298330";
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const openMapModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="contact-buttons-container">
        <a
          href={`tel:${phoneNumber}`}
          className="contact-button phone-call-link"
        >
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
    </>
  );
};

export default FixedNumLocButtons;
