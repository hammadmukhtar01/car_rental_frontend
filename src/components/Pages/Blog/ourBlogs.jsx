/* eslint-disable no-unused-vars */
import React from "react";
import "./blogPage.css";
import blog1MainImg1WebP from "../../images/blog-images/blog1-main-Img1.webp";
import blog2MainImg1WebP from "../../images/blog-images/blog2-main-Img1.webp";
import blog3MainImg1WebP from "../../images/blog-images/blog3-main-Img1.webp";

import blog1MainImg1 from "../../images/blog-images/blog1-main-Img1.jpg";
import blog2MainImg1 from "../../images/blog-images/blog2-main-Img1.jpg";
import blog3MainImg1 from "../../images/blog-images/blog3-main-Img1.jpg";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const OurBlogs = () => {
  const navigate = useNavigate();

  const blogsData = [
    {
      id: 1,
      urlTitle: "difference-between-car-rental-and-lease",
      imageUrl: blog1MainImg1,
      imageUrlWebP: blog1MainImg1WebP,
      title: "What's the Difference b/w a Car Rental and Lease?",
    },
    {
      id: 2,
      urlTitle: "things-to-do-in-dubai",
      imageUrl: blog2MainImg1,
      imageUrlWebP: blog2MainImg1WebP,
      title: "Things to do in Dubai for the Ultimate Vacation",
    },
    {
      id: 3,
      urlTitle: "top-apps-that-help-you-to-navigate-in-dubai",
      imageUrl: blog3MainImg1,
      imageUrlWebP: blog3MainImg1WebP,
      title: "Top Apps that help You To Navigate Dubai",
    },
    {
      id: 4,
      urlTitle: "things-to-do-in-dubai",
      imageUrl: blog2MainImg1,
      imageUrlWebP: blog2MainImg1WebP,
      title: "Things to do in Dubai for the Ultimate Vacation",
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleImageClick = (blogId) => {
    const nextUrl = `/${blogId}`;
    navigate(nextUrl);
  };

  return (
    <>
      <div className="pt-4 blogs-main-div pb-5">
        <Container>
          <div className="pb-3">
            <div>
              <h2 className="blogs-heading-home-page text-center">
                <span>
                  <b className="fs-1">BLOGS</b>
                </span>
              </h2>

              <Slider {...settings}>
                {blogsData.map((blogData) => (
                  <div key={blogData?.id} className="each-slide-effect p-3">
                    <div className="blog-image-container">
                      <picture>
                        <source
                          srcSet={blogData?.imageUrlWebP}
                          type="image/webp"
                        />
                        <img
                          src={blogData?.imageUrl}
                          alt={blogData?.title}
                          className="blogs-images"
                          title={blogData?.title}
                          aria-label={blogData?.title}
                          id={`home-page-blog-${blogData?.id}`}
                          onClick={() => handleImageClick(blogData?.urlTitle)}
                        />
                      </picture>
                      <div className="blog-title-container">
                        <h4 className="blog-title">{blogData?.title}</h4>
                        <div className="text-end">
                          <button
                            className="read-more-button"
                            onClick={() => handleImageClick(blogData?.urlTitle)}
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default OurBlogs;
