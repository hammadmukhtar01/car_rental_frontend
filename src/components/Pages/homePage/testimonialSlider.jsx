import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";

const testimonials = [
  {
    name: "Anna Deynah 1",
    avatar:
      "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/61-1024.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    rating: 5,
  },
  {
    name: "John Doe 2",
    avatar: "https://www.wbw.org/wp-content/uploads/2016/03/Male-Avatar.png",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.",
    rating: 4.5,
  },
  {
    name: "Maria Kate 3",
    avatar:
      "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/61-1024.png",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    rating: 4,
  },
  {
    name: "Joe Kate 4",
    avatar: "https://www.wbw.org/wp-content/uploads/2016/03/Male-Avatar.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    rating: 2,
  },
];
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const Carousel = () => {
  const generateTestimonialItem = (testimonial) => (
    <div key={testimonial.name} className="item">
      <MDBContainer>
        <MDBRow className="text-center">
          <MDBCol>
            <div className="d-flex justify-content-center mb-4">
              <img
                src={testimonial.avatar}
                className="rounded-circle shadow-1-strong"
                width="150"
                height="150"
                alt={`Avatar of ${testimonial.name}`}
              />
            </div>
            <h5 className="mb-3">{testimonial.name}</h5>
            <p className="px-xl-3">
              <MDBIcon fas icon="quote-left" className="pe-2" />
              {testimonial.text}
            </p>
            <MDBTypography
              listUnStyled
              className="d-flex justify-content-center mb-0"
            >
              {Array.from(
                { length: Math.floor(testimonial.rating) },
                (_, i) => (
                  <li key={i}>
                    <MDBIcon
                      fas
                      icon="star"
                      size="sm"
                      className="text-warning"
                    />
                  </li>
                )
              )}
              {testimonial.rating % 1 !== 0 && (
                <li>
                  <MDBIcon
                    fas
                    icon="star-half-alt"
                    size="sm"
                    className="text-warning"
                  />
                </li>
              )}
            </MDBTypography>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );

  return (
    <div className="testimonial-container pt-5">
      <div className="container">
        <h2 className="offer-heading pb-1">
          What Our Clients Say?
          <hr className="col-3" style={{ border: "1px solid gray" }} />
        </h2>
        <AliceCarousel
          mouseTracking
          items={testimonials.map(generateTestimonialItem)}
          responsive={responsive}
          controlsStrategy="alternate"
          infinite
          disableDotsControls
          autoPlay
          autoPlayInterval="2000"
          animationDuration="1500"
        />
      </div>
    </div>
  );
};

export default Carousel;
