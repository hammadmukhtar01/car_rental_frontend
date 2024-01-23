import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BsPersonCircle } from "react-icons/bs";
import "./blogPage.css";

const OurBlogs = () => {
  
  const blogsData = [
    {
      id: 1,
      imageUrl:
        "https://d9s1543upwp3n.cloudfront.net/wp-content/uploads/2022/07/shutterstock_664061974.jpeg",
      category: "SUV Trip",
      title: "Budget-Friendly Design Ideas to Transform Your Office",
      date: "Mar 23, 2021",
      text: "Create a workspace your team will love with these money-saving interior Ui/Ux design tips Learn how People.",
    },

    {
      id: 2,
      imageUrl:
        "https://www.abcmoon.com/wp-content/uploads/2017/11/happy-driver.jpg",
      category: "Picanto",
      title: "Budget-Friendly Design Ideas to Transform Your Office",
      date: "Apr 23, 2022",
      text: "Create a workspace your team will love with these money-saving interior Ui/Ux design tips Learn how People.",
    },

    {
      id: 3,
      imageUrl:
        "https://www.experian.com/content/dam/experian/imagery-photography/secondary-brand-imagery/AdobeStock_306805636.jpeg/_jcr_content/renditions/AdobeStock_306805636_1024_scaled.jpeg",
      category: "Business Trip",
      title: "Budget-Friendly Design Ideas to Transform Your Office",
      date: "Aug 23, 2023",
      text: "Create a workspace your team will love with these money-saving interior Ui/Ux design tips Learn how People.",
    },
  ];

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const generateBlogItem = (blogData) => (
    <div key={blogData.id} className="item">
      <div className="container">
      <div className="single-blog blog-style-one ">
        <div className="blog-image">
          <a href={`##${blogData.id}`}>
            <img src={blogData.imageUrl} alt="Blog" />
          </a>
          <a href={`##${blogData.id}`} className="category ">
            {blogData.category}
          </a>
        </div>
        <div className="blog-content">
          <h5 className="blog-title">
            <a href={`##${blogData.id}`}>{blogData.title}</a>
          </h5>
          <span>
            <i className="lni lni-calendar"></i> {blogData.date}
          </span>
          <p className="text">{blogData.text}</p>
          <a className="more" href={`##${blogData.id}`}>
            READ MORE
          </a>
        </div>
      </div>
      </div>
    </div>
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
