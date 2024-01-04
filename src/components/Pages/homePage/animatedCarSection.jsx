import React from "react";

const AnimatedCarSection = () => {
  const imagesData = [
    { url: "https://th.bing.com/th/id/R.272d670b7d1630746a2b7e462b2ce0fd?rik=PJL2qomwCTIveA&riu=http%3a%2f%2fwww.car-revs-daily.com%2fwp-content%2fuploads%2f2015%2f11%2f2017-Lamborghini-Huracan-LP580-2-5.jpg&ehk=E8NDHruM3yujOmrD7hoWEVSjSIy3c7Bly%2b77bI7%2fJpI%3d&risl=&pid=ImgRaw&r=0", type: "Family Car" },
    { url: "https://www.dkeng.co.uk/sales_images/1593558000/large_1594227296_murcielagosv_57.jpg", type: "Type 2" },
    { url: "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0", type: "Intermediate" },
    { url: "https://www.dkeng.co.uk/sales_images/1593558000/large_1594227296_murcielagosv_57.jpg", type: "Type 2" },
    { url: "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0", type: "Intermediate" }
  ];

  return (
    <div>
      <section id="slider" className="pt-5">
      <h2 className="offer-heading pl-3">OUR FLEET CARS: </h2>
        <div className="container">
          <div className="slider">
            <div className="owl-carousel">
              {imagesData.map((data, index) => (
                <div className="slider-card" key={index}>
                  <h2 className="text-center pt-3">{data.type}</h2>
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <img
                      src={data.url}
                      alt={`Slide ${index + 1}`}
                      className="img-fluid slider-item"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedCarSection;
