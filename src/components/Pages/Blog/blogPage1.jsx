import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import blog1_MainImg1 from "../../images/blog Images/blog1_main_Img1.png";
import MainNavbar from "../navbar/navbar";

const BlogPage1 = () => {
  const blogsData = {
    id: 1,
    imageUrl: blog1_MainImg1,
    category: "Difference",
    title: "What's the Difference b/w a Car Rental and Lease?",
    date: "Mar 23, 2021",
    text: "More and more consumers are choosing automobile leases and car rentals for their convenience and numerous benefits. These options have become preferred over buying a vehicle outright and dealing with monthly payments. But what's the difference between a car lease and car rental? They're separate services offered by rental firms in places like the Emirate. Despite the popularity of car rentals in Abu Dhabi, many people are unsure about the distinctions between leasing and renting. Here's a list to help you decide which option is best for you. ",
  };

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
            <p className="mt-4">{blogsData?.text}</p>
            <br />
            <h3 className="blog1-diff-carrental-lease-heading">
              There's a Factor of Ownership
            </h3>
            <p>
              Leasing indicates that the customer will eventually have full
              ownership of the car. Car rentals, on the other hand, imply that
              the vehicle is rented for a definite and agreed-upon period of
              time. In addition, regardless of whether you're on a lease or a
              rental plan, you must pay a certain sum for the period of the
              vehicle's use. In simple terms, automobile leasing is a convenient
              way to buy a car without having to pay a deposit like you would
              with a traditional lender.
            </p>

            <h3 className="blog1-diff-carrental-lease-heading">
              Contractual Conditions Vary
            </h3>

            <p>
              Rental agreements are more suited to shorter-term commitments. Car
              leasing, on the other hand, is for a longer period of time and has
              additional benefits as well as cost-cutting provisions. This,
              however, is largely contingent on your needs. If you're only in
              Dubai for a short time, you might want to consider renting a car
              for the duration of your stay. If you require a vehicle for a
              prolonged period of time, firms such as Quick Lease have a variety
              of choices to fulfill your needs.{" "}
            </p>

            <h3 className="blog1-diff-carrental-lease-heading">
              Insurance Requirements Could Vary{" "}
            </h3>

            <p>
              In most cases, insurance is required; however, some car rental
              firms may provide you with the alternative of not paying for
              insurance. Depending on the employer, different insurance packages
              are available. Check with your automobile rental agency or car
              dealership to be sure you understand your insurance provider.
              Insurance coverage is typically recommended by rental providers.
              You are covered in the event of an emergency or an accident, with
              no major and unexpected costs. For this reason, both automobile
              rental firms and car dealerships recommend insurance coverage.{" "}
            </p>
          </div>

          <div className="consultation-main-div"></div>
        </Container>
      </>
    </div>
  );
};

export default BlogPage1;
