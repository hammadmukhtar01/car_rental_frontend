import React from 'react';
import './stepsStyling.css';
import './multipleStepsForm.css'

const ProgressBar = ({ step }) => {
  const steps = ['Car Details & Location', 'Booking & Documents', 'Payments'];

  return (
   <div className="main-bar-div">
     <ul id="progressbar" className='text-center'>
      {steps.map((title, index) => (
        <li key={index} className={index + 1 <= step ? 'active' : ''}>
          <b>{title}</b>
        </li>
      ))}
    </ul>
   </div>
  );
};

export default ProgressBar;
