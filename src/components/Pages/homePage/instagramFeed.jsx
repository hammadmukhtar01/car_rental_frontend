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
          target: "instafeed-container",
          resolution: "low_resolution",
          limit: 8,
          accessToken: process.env.REACT_APP_INSTAGRAM_TOKEN_KEY,
          template:
            '<div class="col-lg-3 col-md-4 col-sm-4 col-4 text-center insta-feed-tempelate-div"><a title="instagram-feed" href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}" title="instagram-feeds" class="img-fluid" /></a></div>',
          error: (error) => {
            console.error("Error loading Instagram feed:", error);
            document.getElementById("instafeed-container").innerHTML = "<p>Unable to load Instagram feed. Please try again later.</p>";
          },
        });

        userFeed.run();
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
