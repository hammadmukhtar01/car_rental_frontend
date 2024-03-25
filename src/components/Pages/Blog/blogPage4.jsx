import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import blog4_MainImg1 from "../../images/blog Images/blog4_main_Img1.png";
import MainNavbar from "../navbar/navbar";

const BlogPage4 = ({ blogData }) => {
  const blogNumInUrl = useLocation();
  const queryParams = new URLSearchParams(blogNumInUrl.search);
  const blogNumberParam = queryParams.get("blogID");

  const blogsData = {
    id: 4,
    imageUrl: blog4_MainImg1,
    category: "Rent A Car",
    title: "Why Rent A Car From Milele? Click here!",
    date: "Aug 23, 2023",
    text: "Are you tired of compromising on your travel experience due to lifeless car rental services? Look no further than Milele Car Rental, where we redefine excellence in the automotive industry. As a subsidiary of Milele Corporations, a global leader with over 35 years of experience, we bring you a legacy of trust, innovation, and customer satisfaction. ",
  };

  console.log("Blog data is: ----", blogNumberParam);

  // const { loading } = useReload();

  // if (loading) {
  //   return (
  //     <>
  //       <ReloadingComponent />
  //     </>
  //   );
  // }

  return (
    <div id="main" className="pb-2 ">
      <>
        <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            <MainNavbar />
          </div>
        </div>

        <Container>
          <div className="blog-details-page">
            <h2>{blogsData?.title}</h2>
            <div className="blog-details-image-container">
              <img
                src={blogsData?.imageUrl}
                className="blog-details-image"
                alt="Blog"
              />
            </div>
            <p className="mt-4">
              Are you tired of compromising on your travel experience due to
              lifeless car rental services? Look no further than Milele Car
              Rental, where we redefine excellence in the automotive industry.
              As a subsidiary of Milele Corporations, a global leader with over
              35 years of experience, we bring you a legacy of trust,
              innovation, and customer satisfaction.
              <br />
              <br /> At Milele Car Rental, we inherit a legacy deeply rooted in
              trust and customer satisfaction. With Milele Corporations'
              decades-long expertise in the automotive industry, we stand
              proudly as a testament to excellence and reliability.
              <br />
              <br />
              Benefitting from the global expertise of Milele Corporations, we
              blend international standards with a deep understanding of local
              markets. Our commitment is to ensure that every journey you embark
              on with us is nothing short of exceptional.
              <br />
              <br />
              Experience comfort, style, and performance with our extensive
              fleet of vehicles. Whether you prefer sleek city cars or spacious
              Crossover SUVs, we offer a meticulously curated selection to cater
              to your diverse needs.
              <br />
              <br />
              Quality isn't just a standard at Milele Car Rental; it's a
              promise. Our vehicles undergo rigorous maintenance checks to
              ensure they meet the highest safety and performance standards.
              Your safety and satisfaction are our top priorities.
              <br />
              <br />
              As part of the Milele family, we embrace innovation and
              sustainability. We are dedicated to incorporating fuel-efficient
              vehicles into our fleet, contributing to a greener and more
              sustainable future for all. Milele Car Rental is dedicated to
              turning every drive into a memorable experience. With Milele
              Corporations' enduring legacy supporting us, we stand as your
              trusted partner for all your car rental needs.
              <br />
              <br />
              So why should you choose Milele Car Rental for your next
              adventure? Because we don't just offer cars; we offer excellence,
              comfort, and reliability. Elevate your travels with Milele Car
              Rental and experience a journey like never before. Your
              satisfaction is our guarantee.
            </p>
          </div>

          <div className="consultation-main-div"></div>
        </Container>
      </>
    </div>
  );
};

export default BlogPage4;
