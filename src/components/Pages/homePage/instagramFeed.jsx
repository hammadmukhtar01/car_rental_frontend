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
          accessToken:
            "IGQWRQLTVnRUxkTUlhMW5lb29KYXdwRG5iQ19hWEJaelg5SVZAqb3hGQjdrRG9kYXU1REEtR2VDclBSamgzQ0ZAPRG50SFF0TmhELVZAvZAmJJR0t6NTdodjBYaF9UZA2ZAKZA2JCQlBYdHhJVkljY3RCODcxaEJfMjkzb0EZD",
            template: '<div class="col-lg-3 col-md-4 col-sm-6 col-12 text-center"><a href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid" /></a></div>',
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
