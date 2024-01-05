import React from 'react';

const ProgressBar = ({ step }) => {
  const steps = ['Car Details & Location', 'AddOns & Documents', 'Payments'];

  return (
   <div className="main-bar-div">
     <ul id="progressbar" className='text-center'>
      {steps.map((title, index) => (
        <li key={index} className={index + 1 <= step ? 'active' : ''}>
          {title}
        </li>
      ))}
    </ul>
   </div>
  );
};

export default ProgressBar;
