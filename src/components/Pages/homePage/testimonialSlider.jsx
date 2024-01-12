/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

const TestimonialSlider = () => {
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
    // Add more testimonials as needed
  ];

  return (
    <div className="testimonial-main-dv container">
      <div className="testimonial-heading-container pb-5">
        <h2 className="testimonial-heading">Customer Reviews</h2>
      </div>
      <MDBCarousel showControls dark>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={index === 0 ? "active" : ""}>
            <MDBCarouselItem>
              <MDBContainer>
                <MDBRow className="text-center">
                  <MDBCol lg="4" className="mb-5 mb-md-0">
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
            </MDBCarouselItem>
            <MDBCarouselItem>
              <MDBContainer>
                <MDBRow className="text-center">
                  <MDBCol lg="4" className="mb-5 mb-md-0">
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
            </MDBCarouselItem>
            <MDBCarouselItem>
              <MDBContainer>
                <MDBRow className="text-center">
                  <MDBCol lg="4" className="mb-5 mb-md-0">
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
            </MDBCarouselItem>
          </div>
        ))}
      </MDBCarousel>
    </div>
  );
};

export default TestimonialSlider;
