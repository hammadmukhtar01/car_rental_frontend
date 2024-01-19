import React from "react";
import "./blogPage.css";
import { BsPersonCircle } from "react-icons/bs";

const OurBlogs = () => {
  return (
    <div>
      <section className="blog-area mt-4">
        <div className="container">
        <div className="styled-label">
          <div className="heading-icon-container-div">
            <BsPersonCircle className="mr-2 home-page-heading-icon" />
            <span>
              <b className="fs-3">Our Blogs</b>
            </span>
          </div>
          <hr className="home-page-heading-underline col-2" />
        </div>
          <div className="row justify-content-center all-blogs-container p-3">
            <div className="col-lg-4 col-md-8 col-sm-10">
              <div className="single-blog blog-style-one">
                <div className="blog-image">
                  <a href="##1">
                    <img
                      src="https://d9s1543upwp3n.cloudfront.net/wp-content/uploads/2022/07/shutterstock_664061974.jpeg"
                      alt="Blog"
                    />
                  </a>
                  <a href="##1" className="category">
                    SUV Trip
                  </a>
                </div>
                <div className="blog-content">
                  <h5 className="blog-title">
                    <a href="##1">
                      Budget-Friendly Design Ideas to Transform Your Office
                    </a>
                  </h5>
                  <span>
                    <i className="lni lni-calendar"></i> Mar 23, 2022
                  </span>
                  <p className="text">
                    Create a workspace your team will love with these
                    money-saving interior Ui/Ux design tips Learn how People.
                  </p>
                  <a className="more" href="##1">
                    READ MORE
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8 col-sm-10">
              <div className="single-blog blog-style-one">
                <div className="blog-image">
                  <a href="##1">
                    <img
                      src="https://www.abcmoon.com/wp-content/uploads/2017/11/happy-driver.jpg"
                      alt="Blog"
                    />
                  </a>
                  <a href="##1" className="category">
                    First Experience
                  </a>
                </div>
                <div className="blog-content">
                  <h5 className="blog-title">
                    <a href="##1">
                      Budget-Friendly Design Ideas to Transform Your Office
                    </a>
                  </h5>
                  <span>
                    <i className="lni lni-calendar"></i> Mar 23, 2022
                  </span>
                  <p className="text">
                    Create a workspace your team will love with these
                    money-saving interior Ui/Ux design tips Learn how People.
                  </p>
                  <a className="more" href="##1">
                    READ MORE
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8 col-sm-10">
              <div className="single-blog blog-style-one">
                <div className="blog-image">
                  <a href="##1">
                    <img
                      src="https://www.experian.com/content/dam/experian/imagery-photography/secondary-brand-imagery/AdobeStock_306805636.jpeg/_jcr_content/renditions/AdobeStock_306805636_1024_scaled.jpeg"
                      alt="Blog"
                    />
                  </a>
                  <a href="##1" className="category">
                    Family
                  </a>
                </div>
                <div className="blog-content">
                  <h5 className="blog-title">
                    <a href="##1">
                      Budget-Friendly Design Ideas to Transform Your Office
                    </a>
                  </h5>
                  <span>
                    <i className="lni lni-calendar"></i> Mar 23, 2022
                  </span>
                  <p className="text">
                    Create a workspace your team will love with these
                    money-saving interior Ui/Ux design tips Learn how People.
                  </p>
                  <a className="more" href="##1">
                    READ MORE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurBlogs;
