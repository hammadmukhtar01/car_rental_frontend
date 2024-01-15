import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const FixedNumLocButtons = () => {
  const latitude = 25.177316;
  const longitude = 55.376264;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="contact-buttons-container">
      <Link to="/contactus" className="contact-button">
        <FaPhone />
      </Link>
      <a href={mapLink} target="_blank" className="contact-button" rel="noreferrer">
        <FaMapMarkerAlt />
      </a>
    </div>
  );
};

export default FixedNumLocButtons;
