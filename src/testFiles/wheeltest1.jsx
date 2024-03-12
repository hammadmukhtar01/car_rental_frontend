/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Pinn from '../../images/spinTheWheel/pin.png'
import Wheel from '../../images/spinTheWheel/wheel.png'
import Stand from '../../images/spinTheWheel/stand.png'
import Buttons from '../../images/spinTheWheel/button.png'
import './spinTheWheel.css'

const SpinTheWheel = () => {
  const [deg, setDeg] = useState(0);
  const [pieces, setPieces] = useState([]);
  const numberOfPieces = 100;
  let lastUpdateTime = Date.now();
  const canvasRef = useRef(null);

  const update = () => {
    let now = Date.now();
    let dt = now - lastUpdateTime;

    let updatedPieces = pieces.map(p => {
      if (p.y > canvasRef.current.height) {
        return null;
      }
      return {
        ...p,
        y: p.y + p.gravity * dt,
        rotation: p.rotation + p.rotationSpeed * dt
      };
    }).filter(Boolean);

    while (updatedPieces.length < numberOfPieces) {
      updatedPieces.push(new Piece(Math.random() * canvasRef.current.width, -20));
    }

    setPieces(updatedPieces);
    lastUpdateTime = now;
  };

  const draw = () => {
    let ctx = canvasRef.current.getContext('2d');
  
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
      pieces.forEach(function (p) {
        ctx.save();
  
        ctx.fillStyle = p.color;
  
        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        ctx.rotate(p.rotation);
  
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
  
      requestAnimationFrame(draw);
    } else {
      // Handle the case when the context is not available yet
    }
  };
  

  const randomColor = () => {
    let colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  function Piece(x, y) {
    this.x = x;
    this.y = y;
    this.size = (Math.random() * 0.5 + 0.75) * 15;
    this.gravity = (Math.random() * 0.5 + 0.75) * 0.03;
    this.rotation = (Math.PI * 2) * Math.random();
    this.rotationSpeed = (Math.PI * 2) * Math.random() * 0.0001;
    this.color = randomColor();
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 1320;

      while (pieces.length < numberOfPieces) {
        pieces.push(new Piece(Math.random() * canvas.width, Math.random() * canvas.height));
      }

      const updateInterval = setInterval(update, 1);

      return () => clearInterval(updateInterval);
    }
  }, [pieces]);

  const handleStartClick = () => {
    const startButton = document.querySelector('.spin-button');
    console.log("startButton", startButton)

    startButton.style.pointerEvents = 'none';
    setDeg(Math.floor(5000 + Math.random() * 5000));
    const wheel = document.querySelector('.wheel');
    console.log("wheel", wheel)

    wheel.style.transition = 'all 10s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.classList.add('blur');
  };

  const handleTransitionEnd = () => {
    const wheel = document.querySelector('.wheel');
    wheel.classList.remove('blur');
    const startButton = document.querySelector('.spin-button');
    startButton.style.pointerEvents = 'none';
    wheel.style.transition = 'none';
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    const arrow = document.querySelector('.pin');
    arrow.classList.add('bounce');
    update();
    draw();
  };

  return (
    <div>
      <canvas id="confetti" ref={canvasRef}></canvas>
      <div id="game">
        <img alt='#1' className="pin" src={Pinn} />
        <img alt='#2' className="wheel" src={Wheel} onTransitionEnd={handleTransitionEnd} />
        {/* <img alt='#3' className="stand" src={Stand} /> */}
        <img alt='#4' className="spin-button" id="disable" src={Buttons} onClick={handleStartClick} />
      </div>
    </div>
  );
};

export default SpinTheWheel;
