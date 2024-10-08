import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import blog3MainImg1 from "../../images/blog-images/blog3-main-Img1.jpg";
import blog3MainImg1WebP from "../../images/blog-images/blog3-main-Img1.webp";
import FreeConsultationForm from "./freeConsultationBlogForm";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";

const BlogPage3 = ({ blogData }) => {
  const blogNumInUrl = useLocation();
  const queryParams = new URLSearchParams(blogNumInUrl?.search);
  const blogNumberParam = queryParams?.get("blogID");

  const blogsData = {
    id: 3,
    imageUrl: blog3MainImg1,
    imageUrlWebP: blog3MainImg1WebP,
    title: "Top Apps that help You Navigate Dubai",
    date: "Aug 23, 2024",
    text: "A cool thing about living in the UAE is get in your car, put on your favourite song and drive. Driving can be fun - if you know where you are going and have a trusty navigation app (you don't want to get lost along the way). In Dubai, five apps can make a difference when on the road; Google Maps, Apple Maps, Waze, Yango Maps, Cafu and RTA Smart Drive.",
  };

  console.log("Blog data is: ----", blogNumberParam);

  return (
    <HelmetProvider id="main">
      <>
        <Helmet>
          <title>
            Navigate easily in Dubai: Top Dubai apps that will make your life
            easier
          </title>
          <meta
            name="description"
            content="Experience smooth and enjoyable driving in the UAE with the best navigation apps. Discover Google Maps, Apple Maps, Waze, Yango Maps, CAFU, and RTA Smart Drive for accurate directions, real-time updates, and convenient features. Download now for a seamless road trip. "
          />
          <meta name="keywords" content="keywords" />
          <link
            rel="canonical"
            href="https://www.milelecarrental.com/top-apps-that-help-you-to-navigate-in-dubai"
            title={blogsData?.title}
          />
        </Helmet>
        <HeaderCombination />
        <Container>
          <br />
          <div className="blog-details-page">
            <h1 className="blog3-main-heading mb-3"> {blogsData?.title}</h1>
            <div className="blog-details-image-container">
              <picture>
                <source srcSet={blogsData?.imageUrlWebP} type="image/webp" />
                <source srcSet={blogsData?.imageUrl} type="image/png" />

                <img
                  src={blogsData?.imageUrl}
                  className="blog-details-image"
                  title={blogsData?.title ? blogsData.title : "Blogs Data"}
                  alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                />
              </picture>
            </div>
            <p className="mt-4">{blogsData?.text}</p>
            <br />
            <h3 className="blog3-navigation-app-heading">Apple Maps App</h3>
            <p>
              Now use your Apple Maps app to get places. You can use it on your
              iPhone, iPad, Mac and Apple Watch and in the car with CarPlay.
              Whether you want to use your car or go walking, you'll get the
              right directions. You can also share a list of your favourite
              locations using this app. Besides offering real-time updates and
              routes to follow, Apple Maps can also share ETA with friends and
              give them updates if you are stuck in traffic and if a delay is
              expected. Apple Maps App is available in both Arabic and English.
            </p>

            <h3 className="blog3-navigation-app-heading">Google Maps</h3>

            <p>
              Perhaps the best-known and most-used app is Google Maps, which has
              adaptive tech, in case you get lost, it will point out a new route
              to your destination. Visual and spoken cues help guide your way.
              It also points out if you are on a busy road and allows you to
              share your live location with others. Google Maps is available in
              many languages, and has the bonus of offering aerial and satellite
              views of most locations.{" "}
            </p>

            <h3 className="blog3-navigation-app-heading">Waze </h3>

            <p>
              One of the most commonly used apps is Waze, which will lead you
              from road to road, zooming in on turns and calling out the
              direction you need to take. It's a community-driven navigation
              app. What that means is, thanks to the number of drivers using the
              app, real-time data is being collected, aggregated, and analysed
              by it, so when it gives you updates on a road, it's quite current.
              It'll tell you if you are headed to a congested area, the tolls
              you may be subject to on your route and even where you can stop
              for a quick fuel up. If you are speeding, the app will give you a
              warning, helping you cut down on those road fines. Waze is
              available in several languages besides English, but it's not yet
              available in Arabic. Get Waze on Google Play or Apple Store.{" "}
            </p>

            <h3 className="blog3-navigation-app-heading">CAFU </h3>

            <p>
              CAFU is the UAE's own & the world's leading digital platform for
              vehicle services. Whether you're looking to save time by avoiding
              the petrol queues, give your car a much-needed wash, get a second
              pair of eyes for maintenance or get yourself a new one, you can
              book it all through the CAFU app.{" "}
            </p>

            <h3 className="blog3-navigation-app-heading">RTA Smart Drive </h3>

            <p>
              No internet? No problem. With RTA Smart Drive you can plan,
              explore and find your way without having to spend that precious
              data. It will give you turn-by-turn directions via voice and
              visual instructions. If there's a busy road or accidents, the Live
              Traffic Option (this requires connectivity) will reroute you
              automatically, ensuring you get to where you want to go on time.
              The app also shows you the key landmarks such as the metro, tram
              and bus stations, and will keep you from speeding thanks to its
              alerts. It's available in both English and Arabic in Dubai.{" "}
            </p>

            <h3 className="blog3-navigation-app-heading">Yango Maps </h3>

            <p>
              More than 3,000km of roads in Dubai have been mapped out in high
              detail for Yango Maps, which is a recent addition to the app
              navigation scene. Using this option will not only get you the
              quickest route but also a different route should some traffic
              occur in real-time. The app also zooms in on complicated turns to
              help drivers navigate them safely. One of the best features of
              Yango Map is that it suggests convenient parking spots nearby.
              Yango Maps is available in both English and Arabic. Get Yango on
              Google Play or Apple Store.{" "}
            </p>
          </div>
        </Container>

        <FreeConsultationForm />
        <FooterCombination />
      </>
    </HelmetProvider>
  );
};

export default BlogPage3;
