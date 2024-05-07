import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import blog1_MainImg1 from "../../images/blog-images/blog1_main_Img1.png";
import blog2_MainImg1 from "../../images/blog-images/blog2_main_Img1.png";
import blog3_MainImg1 from "../../images/blog-images/blog3_main_Img1.png";
import blog4_MainImg1 from "../../images/blog-images/blog4_main_Img1.png";
import MainNavbar from "../navbar/navbar";

const BlogPage4 = ({ blogData }) => {
  const blogNumInUrl = useLocation();
  const queryParams = new URLSearchParams(blogNumInUrl.search);
  const blogNumberParam = queryParams.get("blogID");

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

  console.log("Blog data is: ----", blogNumberParam);

  const selectedBlog = blogsData.find(
    (blog) => blog.id === parseInt(blogNumberParam)
  );

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
        {/* <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            <MainNavbar />
          </div>
        </div> */}

        <Container>
          <div className="blog-details-page">
            <h2>{selectedBlog?.title}</h2>
            <div className="blog-details-image-container">
              <img src={selectedBlog?.imageUrl} className="blog-details-image" alt="Blog" />
            </div>
            <p>{selectedBlog?.text}</p>
          </div>
        </Container>
      </>
    </div>
  );
};

export default BlogPage4;
