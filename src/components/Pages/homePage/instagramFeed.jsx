import React, { useEffect } from "react";
import "./instagramFeed.css";

const InstagramFeed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/stevenschobert/instafeed.js@2.0.0rc1/src/instafeed.min.js";
    script.async = true;

    script.onload = () => {
      if (window.Instafeed) {
        const userFeed = new window.Instafeed({
          get: "user",
          resolution: "low_resolution",
          limit: 8,
          accessToken: process.env.REACT_APP_INSTAGRAM_TOKEN_KEY,
          target: "instafeed-container",
          template:
            '<div class="col-lg-3 col-md-4 col-sm-4 col-4 text-center insta-feed-template-div"><a title="instagram-feed" href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}" title="instagram-feeds" class="img-fluid" /></a></div>',
          error: (error) => {
            console.error("Error loading Instagram feed:", error);
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
