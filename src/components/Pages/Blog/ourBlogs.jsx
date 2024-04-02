import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BsPersonCircle } from "react-icons/bs";
import "./blogPage.css";
import blog1_MainImg1 from "../../images/blog-images/blog1_main_Img1.png";
import blog2_MainImg1 from "../../images/blog-images/blog2_main_Img1.png";
import blog3_MainImg1 from "../../images/blog-images/blog3_main_Img1.png";
import blog4_MainImg1 from "../../images/blog-images/blog4_main_Img1.png";

const OurBlogs = () => {
  const blogsData = [
    {
      id: 1,
      imageUrl: blog1_MainImg1,
      category: "Difference",
      title: "What's the Difference b/w a Car Rental and Lease?",
      date: "Mar 23, 2021",
      text: "More and more consumers are choosing automobile leases and car rentals for their convenience and numerous benefits. These options have become preferred over buying a vehicle outright and dealing with monthly payments. But what's the difference between a car lease and car rental? They're separate services offered by rental firms in places like the Emirate. Despite the popularity of car rentals in Abu Dhabi, many people are unsure about the distinctions between leasing and renting. Here's a list to help you decide which option is best for you. ",
    },

    {
      id: 2,
      imageUrl: blog2_MainImg1,
      category: "Entertainment",
      title: "Things to do in Dubai for the Ultimate Vacation",
      date: "Apr 23, 2022",
      text: "Standing 828m high, the Burj Khalifa is the tallest building in the world and one of Dubai's must-visit attractions. The majestic building is located in the heart of the city and is a hub of activity day and night. Just looking up in awe at the sheer scale of this magnificent structure is memorable in itself, but it's definitely worth venturing inside too. You can capture perfect views of the city from the observation deck at levels 124 and 125, or have a bite to eat in the At The Top Sky Lounge. For special occasions, treat yourself to a sunset session at The Lounge, Burj Khalifa, the highest lounge in the world at 585m. .",
    },

    {
      id: 3,
      imageUrl: blog3_MainImg1,
      category: "Business Trip",
      title: "Top Apps that help You Navigate Dubai",
      date: "Aug 23, 2023",
      text: "A cool thing about living in the UAE is get in your car, put on your favourite song and drive. Driving can be fun - if you know where you are going and have a trusty navigation app (you don't want to get lost along the way). In Dubai, five apps can make a difference when on the road; Google Maps, Apple Maps, Waze, Yango Maps, Cafu and RTA Smart Drive.",
    },

    {
      id: 4,
      imageUrl: blog4_MainImg1,
      category: "Rent A Car",
      title: "Why Rent A Car From Milele? Click here!",
      date: "Aug 23, 2023",
      text: "Are you tired of compromising on your travel experience due to lifeless car rental services? Look no further than Milele Car Rental, where we redefine excellence in the automotive industry. As a subsidiary of Milele Corporations, a global leader with over 35 years of experience, we bring you a legacy of trust, innovation, and customer satisfaction. ",
    },
  ];

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const generateBlogItem = (blogData) => (
    <a
      key={blogData.id}
      className="blog-item"
      href={`/blogPage${blogData.id}/${blogData.id}`}
    >
      <div className="container">
        <div className="single-blog blog-style-one">
          <div className="blog-image pb-3">
            <img src={blogData.imageUrl} alt="Blog" />
            <span className="category ">{blogData.category}</span>
          </div>
          <div className="blog-content">
            <h5 className="blog-title">
              <div className="blog-title">{blogData.title}</div>
            </h5>
            <span className="blog-date">
              <i className="lni lni-calendar"></i> {blogData.date}
            </span>
            <p className="text">{truncateText(blogData.text, 210)}</p>

            <div href={`/blogPage${blogData.id}/${blogData.id}`} className="more">
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
          <div className="styled-label ml-4">
            <div className="heading-icon-container-div">
              <BsPersonCircle className="mr-2 home-page-heading-icon" />
              <span>
                <b className="fs-3">Our Blogs</b>
              </span>
            </div>
            <hr className="home-page-heading-underline col-2" />
          </div>
          <AliceCarousel
            mouseTracking
            items={blogsData.map(generateBlogItem)}
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
