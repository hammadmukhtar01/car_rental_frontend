import React from "react";
import { FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const FixedNumLocButtons = () => {
  const phoneNumber = "+971508805974";
  const latitude = 25.177316;
  const longitude = 55.376264;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

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
        href={mapLink}
        target="_blank"
        className="contact-button map-link"
        rel="noreferrer"
      >
        <FaMapMarkerAlt />
      </a>
    </div>
  );
};

export default FixedNumLocButtons;
