import React from 'react';
import './stepsStyling.css'
const Modals = ({ isOpen, onClose, imageSrc, alt }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <img src={imageSrc} alt={alt} />
      </div>
    </div>
  );
};

export default Modals;
