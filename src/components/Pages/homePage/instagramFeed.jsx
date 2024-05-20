import React, { useEffect } from "react";
import "./instagramFeed.css";

const InstagramFeed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/stevenschobert/instafeed.js@2.0.0rc1/src/instafeed.min.js";
    script.async = true;

    script.onload = () => {
      if (window.Instafeed) {
        var userFeed = new window.Instafeed({
          get: "user",
          target: "instafeed-container",
          resolution: "low_resolution",
          limit: 8,
          //   sort: "most recent",
          accessToken: process.env.REACT_APP_INSTAGRAM_TOKEN_KEY,
          template:
            '<div class="col-lg-3 col-md-4 col-sm-4 col-4 text-center insta-feed-tempelate-div"><a href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid" /></a></div>',
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
