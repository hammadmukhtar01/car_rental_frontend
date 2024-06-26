/* eslint-disable no-unused-vars */
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./blogPage.css";
import blog1MainImg1 from "../../images/blog-images/blog1-main-Img1.jpg";
import blog2MainImg1 from "../../images/blog-images/blog2-main-Img1.jpg";
import blog3MainImg1 from "../../images/blog-images/blog3-main-Img1.jpg";

const OurBlogs = () => {
  const blogsData = [
    {
      id: 1,
      imageUrl: blog1MainImg1,
      title: "What's the Difference b/w a Car Rental and Lease?",
      date: "Mar 23, 2021",
      text: "More and more consumers are choosing automobile leases and car rentals for their convenience and numerous benefits. These options have become preferred over buying a vehicle outright and dealing with monthly payments. But what's the difference between a car lease and car rental? They're separate services offered by rental firms in places like the Emirate. Despite the popularity of car rentals in Abu Dhabi, many people are unsure about the distinctions between leasing and renting. Here's a list to help you decide which option is best for you. ",
    },

    {
      id: 2,
      imageUrl: blog2MainImg1,
      title: "Things to do in Dubai for the Ultimate Vacation",
      date: "Apr 23, 2022",
      text: "Standing 828m high, the Burj Khalifa is the tallest building in the world and one of Dubai's must-visit attractions. The majestic building is located in the heart of the city and is a hub of activity day and night. Just looking up in awe at the sheer scale of this magnificent structure is memorable in itself, but it's definitely worth venturing inside too. You can capture perfect views of the city from the observation deck at levels 124 and 125, or have a bite to eat in the At The Top Sky Lounge. For special occasions, treat yourself to a sunset session at The Lounge, Burj Khalifa, the highest lounge in the world at 585m. .",
    },

    {
      id: 3,
      imageUrl: blog3MainImg1,
      title: "Top Apps that help You Navigate Dubai",
      date: "Dec 06, 2023",
      text: "A cool thing about living in the UAE is get in your car, put on your favourite song and drive. Driving can be fun - if you know where you are going and have a trusty navigation app (you don't want to get lost along the way). In Dubai, five apps can make a difference when on the road; Google Maps, Apple Maps, Waze, Yango Maps, Cafu and RTA Smart Drive.",
    },
  ];

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.substring(0, maxLength) + "...";
  };

  const generateBlogItem = (blogData) => (
    <a
      key={blogData?.id}
      className="blog-item"
      title={`${blogData?.title}`}
      href={`/blogPage${blogData?.id}/${blogData?.id}`}
    >
      <div className="container">
        <div className="single-blog blog-style-one" id={`${blogData?.title} title`}>
          <div className="blog-image pb-3">
            <img
              src={blogData?.imageUrl}
              title={`${blogData?.title}`}
              alt={blogsData?.title ? blogsData.title : "Featured Blog Post"}
            />
          </div>
          <div className="blog-content">
            <h5 className="blog-title">
              <div className="blog-title">{blogData?.title}</div>
            </h5>
            <span className="blog-date">
              <i className="lni lni-calendar"></i> {blogData?.date}
            </span>
            <p className="text">{truncateText(blogData?.text, 210)}</p>

            <div
              href={`/blogPage${blogData?.id}/${blogData?.id}`}
              className="read-more"
            >
              READ MORE
            </div>
          </div>
        </div>
      </div>
    </a>
  );

  return (
    <div>
      <section className="blog-area mt-4">
        <div className="container">
          <div className="styled-label text-center">
            <div className="blogs-heading-icon-container-div">
              <span>
                <h2>
                  <b className="fs-3">Blogs</b>
                </h2>
              </span>
            </div>
          </div>
          <br />
          <AliceCarousel
            mouseTracking
            items={blogsData?.map(generateBlogItem)}
            responsive={responsive}
            controlsStrategy="alternate"
            infinite
            disableDotsControls
            autoPlay
            autoPlayInterval="2000"
            animationDuration="1500"
          />
        </div>
      </section>
    </div>
  );
};

export default OurBlogs;
