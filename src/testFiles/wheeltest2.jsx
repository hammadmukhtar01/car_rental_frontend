import "../page2.css";
import spinner from "../images/Group 801.png";
import union from "../images/Union.png";
import spinSound from "../sounds/spinSound.mp3";
import React, { useState } from "react";
// import Confetti from "react-confetti";
import { useHistory } from "react-router-dom";
const Page2 = (props) => {
  // useHistory function to take user to next page
  let history = useHistory();
  // array "links" for all the possible outcomes of the spin wheel
  const links = [
    "30% sitewide off",
    "Buy 1 get 1 free",
    "free coffee mug on a purchase OF 100+",
    "buy 2 effervescents tablets & get 1 free",
    "free 50g tea on purchase of 500",
    "hot chocolate free with tea",
  ];
  // "codes" array for coupon codes to respective "links"
  const codes = [
    "30OFF",
    "BUY1GET1",
    "FREE100",
    "EFFERV2",
    "50G500",
    "100CHOCO",
  ];
  const audio = new Audio(spinSound);
  const [showConfetti, setShowConfetti] = useState(false);

  const startRotation = () => {
    audio.play();
    // sectorDecider gives the value to how many sectors will the first sector  "30% sitewide off" moove
    const sectorDecider = Math.floor(Math.random() * 6 + 1);
    // "turns" to give the random number of turns the spinner spins
    const turns = Math.floor(Math.random() * 10 + 1) + 0.16667 * sectorDecider;
    // number of sectors =6 (six possible outcomes)
    // outcome after spinning= total number of the sectors- how many sectors did the 1st sector move
    const res = 6 - sectorDecider;
    const image = document.getElementById("spinImage");
    image.style.transition = `all 3s`;
    image.style.transform = `rotate(${turns}turn)`;
    // show where the wheel stopped  and confetti for 3 seconds
    setTimeout(() => {
      audio.pause();
      setShowConfetti(true);
      setTimeout(() => {
        // move to the next page after 5 seconds
        // send path and props
        history.push({
          // pathname: "/page3",
          state: { result: links[res], code: codes[res] },
        });
      }, 5000);
    }, 3000);
  };

  return (
    <div className="div-wrapper">
      <div className="spinWheel">
        <img className="needle" src={union} alt="needle"></img>
        <img
          className="spinner"
          id="spinImage"
          src={spinner}
          alt="spinner"
        ></img>
      </div>
      <div className="btn">
        <button
          onClick={() => {
            startRotation();
          }}
        >
          SPIN
        </button>
      </div>
      {/* {showConfetti && <Confetti className="confetti" />} */}
    </div>
  );
};

export default Page2;
