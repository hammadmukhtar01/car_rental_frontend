import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import blog2_MainImg1 from "../../images/blog Images/blog2_main_Img1.png";
import MainNavbar from "../navbar/navbar";

const BlogPage2 = () => {
  const blogsData = {
    id: 2,
    imageUrl: blog2_MainImg1,
    category: "Entertainment",
    title: "Things to do in Dubai for the Ultimate Vacation",
    date: "Apr 23, 2022",
    text: "Standing 828m high, the Burj Khalifa is the tallest building in the world and one of Dubai's must-visit attractions. The majestic building is located in the heart of the city and is a hub of activity day and night. Just looking up in awe at the sheer scale of this magnificent structure is memorable in itself, but it's definitely worth venturing inside too. You can capture perfect views of the city from the observation deck at levels 124 and 125, or have a bite to eat in the At The Top Sky Lounge. For special occasions, treat yourself to a sunset session at The Lounge, Burj Khalifa, the highest lounge in the world at 585m. .",
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

export default BlogPage2;
