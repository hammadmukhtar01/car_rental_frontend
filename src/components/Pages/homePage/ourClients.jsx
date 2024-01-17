import React from "react";
import './ourClients.css';

const clientLogos = [
  "https://cdn.ayroui.com/1.0/images/client-logo/graygrids.svg",
  "https://cdn.ayroui.com/1.0/images/client-logo/uideck.svg",
  "https://cdn.ayroui.com/1.0/images/client-logo/ayroui.svg",
  "https://cdn.ayroui.com/1.0/images/client-logo/lineicons.svg",
];

const ClientLogoSection = () => {
  return (
    <section className="client-logo-area client-logo-one">
      <div className="section-title-two">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <span> Our Partners </span>
                <h2 className="fw-bold">Our Awesome Clients</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                  do eiusmod tempor incididunt ut labore aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {clientLogos.map((logo, index) => (
            <div className="col-md-3 col-6" key={index}>
              <div className="single-client text-center">
                <img src={logo} alt={`Logo ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogoSection;
