/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import "./ourClients.css";
import { useInView } from "react-intersection-observer";

const clientLogos = [
  "https://cdn.ayroui.com/1.0/images/client-logo/graygrids.svg",
  "https://cdn.ayroui.com/1.0/images/client-logo/uideck.svg",
  "https://cdn.ayroui.com/1.0/images/client-logo/ayroui.svg",
  "https://cdn.ayroui.com/1.0/images/client-logo/lineicons.svg",
];

const ClientLogoSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <section className="client-logo-area client-logo-one" ref={ref}>
      <div className="section-title-two">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={`content ${inView ? "in-view" : ""}`}>
                <span> Our Partners </span>
                <div className="animated-text ">
                  <h2 className="fw-bold">Our Awesome Clients</h2>
                </div>
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
          {clientLogos?.map((logo, index) => (
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
