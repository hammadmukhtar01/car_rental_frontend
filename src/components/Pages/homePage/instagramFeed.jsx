/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import LazyLoad from 'react-lazyload';
import "./instagramFeed.css";

const InstagramFeed = () => {
  useEffect(() => {

      const setLimitByScreenSize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 992) {
          return 8;
        } else if (screenWidth >= 768) {
          return 9;
        } else {
          return 9;
        }
      };
  
      const limit = setLimitByScreenSize();

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/stevenschobert/instafeed.js@2.0.0rc1/src/instafeed.min.js";
    script.async = true;

    script.onload = () => {
      if (window.Instafeed) {
        const userFeed = new window.Instafeed({
          get: "user",
          resolution: "low_resolution",
          limit: limit,
          accessToken: process.env.REACT_APP_INSTAGRAM_TOKEN_KEY,
          target: "instafeed-container",
          template:
            `<div class="col-lg-3 col-md-4 col-sm-4 col-4 text-center insta-feed-template-div">
              <a title="instagram-feed" href="{{link}}" target="_blank">
                <LazyLoad height={200} offset={100}>
                  <img src="{{image}}" alt="{{caption}}" title="instagram-feeds" class="img-fluid" />
                </LazyLoad>
              </a>
            </div>`,
          error: (error) => {
            const container = document.getElementById("instafeed-container");
            if (container) {
              container.innerHTML = "<p>Unable to load Instagram feed. Please try again later.</p>";
            }
          },
        });

        try {
          userFeed.run();
        } catch (error) {
          console.error("Error running Instafeed:", error);
          const container = document.getElementById("instafeed-container");
          if (container) {
            container.innerHTML = "<p>Unable to load Instagram feed. Please try again later.</p>";
          }
        }
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="testimonial-container pt-3 pb-3">
      <div id="instafeed-container" className="instagram-feed-div"></div>
    </div>
  );
};

export default InstagramFeed;
