import React, { useEffect } from "react";

const Celebration = () => {
  useEffect(() => {
    let canvas, ctx;
    let fireworks = [];
    let particles = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setup = () => {
      canvas = document.getElementById("canvas");
      setSize(canvas);
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
      fireworks.push(new Firework(Math.random() * (width - 200) + 100));
      window.addEventListener("resize", windowResized);
      document.addEventListener("click", onClick);
    };

    setTimeout(setup, 1);

    const loop = () => {
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      for (let i = 0; i < fireworks.length; i++) {
        let done = fireworks[i].update();
        fireworks[i].draw();
        if (done) fireworks.splice(i, 1);
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].lifetime > 80) particles.splice(i, 1);
      }

      if (Math.random() < 1 / 60)
        fireworks.push(new Firework(Math.random() * (width - 200) + 100));
    };

    setInterval(loop, 1 / 60);

    class Particle {
      constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.vel = randomVec(2);
        this.lifetime = 0;
      }

      update() {
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.vel.y += 0.02;
        this.vel.x *= 0.99;
        this.vel.y *= 0.99;
        this.lifetime++;
      }

      draw() {
        ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0);
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 2, 2);
      }
    }

    class Firework {
      constructor(x) {
        this.x = x;
        this.y = height;
        this.isBlown = false;
        this.col = randomCol();
      }

      update() {
        this.y -= 3;
        if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
          this.isBlown = true;
          for (let i = 0; i < 60; i++) {
            particles.push(new Particle(this.x, this.y, this.col));
          }
        }
        return this.isBlown;
      }

      draw() {
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 2, 2);
      }
    }

    const randomCol = () => {
      var letter = "0123456789ABCDEF";
      var nums = [];

      for (var i = 0; i < 3; i++) {
        nums[i] = Math.floor(Math.random() * 256);
      }

      let brightest = 0;
      for (var j = 0; j < 3; j++) {
        if (brightest < nums[j]) brightest = nums[j];
      }

      brightest /= 255;
      for (var k = 0; k < 3; k++) {
        nums[k] /= brightest;
      }

      let color = "#";
      for (var z = 0; z < 3; z++) {
        color += letter[Math.floor(nums[z] / 16)];
        color += letter[Math.floor(nums[z] % 16)];
      }
      return color;
    };

    const randomVec = (max) => {
      let dir = Math.random() * Math.PI * 2;
      let spd = Math.random() * max;
      return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
    };

    const setSize = (canv) => {
      canv.style.width = width + "px";
      canv.style.height = height + "px";
      canv.width = width * window.devicePixelRatio;
      canv.height = height * window.devicePixelRatio;
      canvas
        .getContext("2d")
        .scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const onClick = (e) => {
      fireworks.push(new Firework(e.clientX));
    };

    const windowResized = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      setSize(canvas);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
    };

    return () => {
      window.removeEventListener("resize", windowResized);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas id="canvas"></canvas>;
};

export default Celebration;
