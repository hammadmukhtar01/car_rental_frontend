import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import blog2MainImg1WebP from "../../images/blog-images/blog2-main-Img1.webp";
import BurjKhalifaImgWebP from "../../images/blog-images/blog2-Img1.webp";
import PalmJumeirahImgWebP from "../../images/blog-images/blog2-Img2.webp";
import DubaiCreekImgWebP from "../../images/blog-images/blog2-Img3.webp";
import DubaiMallImgWebP from "../../images/blog-images/blog2-Img4.webp";
import SkydiveDubaiImgWebP from "../../images/blog-images/blog2-Img5.webp";
import DubaiFrameImgWebP from "../../images/blog-images/blog2-Img6.webp";
import KiteBeachImgWebP from "../../images/blog-images/blog2-Img7.webp";
import CityWalkImgWebP from "../../images/blog-images/blog2-Img8.webp";
import DubaiMarinaImgWebP from "../../images/blog-images/blog2-Img9.webp";
import DeepDiveDubaiImgWebP from "../../images/blog-images/blog2-Img10.webp";
import BurjAlArabImgWebP from "../../images/blog-images/blog2-Img11.webp";
import MuseumoftheFutureImgWebP from "../../images/blog-images/blog2-Img12.webp";
import ExpoCityDubaiImgWebP from "../../images/blog-images/blog2-Img13.webp";

import blog2MainImg1 from "../../images/blog-images/blog2-main-Img1.jpg";
import BurjKhalifaImg from "../../images/blog-images/blog2-Img1.jpg";
import PalmJumeirahImg from "../../images/blog-images/blog2-Img2.jpg";
import DubaiCreekImg from "../../images/blog-images/blog2-Img3.jpg";
import DubaiMallImg from "../../images/blog-images/blog2-Img4.jpg";
import SkydiveDubaiImg from "../../images/blog-images/blog2-Img5.jpg";
import DubaiFrameImg from "../../images/blog-images/blog2-Img6.jpg";
import KiteBeachImg from "../../images/blog-images/blog2-Img7.jpg";
import CityWalkImg from "../../images/blog-images/blog2-Img8.jpg";
import DubaiMarinaImg from "../../images/blog-images/blog2-Img9.jpg";
import DeepDiveDubaiImg from "../../images/blog-images/blog2-Img10.jpg";
import BurjAlArabImg from "../../images/blog-images/blog2-Img11.jpg";
import MuseumoftheFutureImg from "../../images/blog-images/blog2-Img12.jpg";
import ExpoCityDubaiImg from "../../images/blog-images/blog2-Img13.jpg";
import "react-phone-input-2/lib/style.css";
import "../homePage/homepage.css";
import FreeConsultationForm from "./freeConsultationBlogForm";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";

const BlogPage2 = () => {
  const blogsData = {
    id: 2,
    imageUrl: blog2MainImg1,
    imageUrlWebP: blog2MainImg1WebP,
    category: "Entertainment",
    title: "Things to do in Dubai for the Ultimate Vacation",
    date: "Apr 23, 2022",
    text: "Standing 828m high, the Burj Khalifa is the tallest building in the world and one of Dubai's must-visit attractions. The majestic building is located in the heart of the city and is a hub of activity day and night. Just looking up in awe at the sheer scale of this magnificent structure is memorable in itself, but it's definitely worth venturing inside too. You can capture perfect views of the city from the observation deck at levels 124 and 125, or have a bite to eat in the At The Top Sky Lounge. For special occasions, treat yourself to a sunset session at The Lounge, Burj Khalifa, the highest lounge in the world at 585m. .",
  };

  return (
    <HelmetProvider id="main">
      <>
        <Helmet>
          <title>
            Top 14 Things to Do in Dubai | Attraction and Activities
          </title>
          <meta
            name="description"
            content="Uncover the most exciting activities and attractions in Dubai with Milele Car Rental's blog. Explore top events, adventures, and hidden gems for an unforgettable Dubai experience. Plan your fun-filled trip today!"
          />
          <meta name="keywords" content="keywords" />
          <link
            rel="canonical"
            href="https://www.milelecarrental.com/blogPage2/2"
            title={blogsData?.title}
          />
        </Helmet>
        <HeaderCombination />
        <Container>
          <br />
          <div className="blog2-details-page">
            <div className="blog-details-image-container">
              <h1 className="blog2-main-heading mb-3"> {blogsData?.title}</h1>

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
            <Row>
              <Col>
                <div className="blog-details-page">
                  <Row>
                    <h3 className="blog2-things-todo-inDubai-heading mb-3">
                      Burj Khalifa :
                    </h3>
                    <p>
                      Standing 828m high, the Burj Khalifa is the tallest
                      building in the world and one of Dubai's must-visit
                      attractions. The majestic building is located in the heart
                      of the city and is a hub of activity day and night. Just
                      looking up in awe at the sheer scale of this magnificent
                      structure is memorable in itself, but it's definitely
                      worth venturing inside too. You can capture perfect views
                      of the city from the observation deck at levels 124 and
                      125, or have a bite to eat in the At The Top Sky Lounge.
                      For special occasions, treat yourself to a sunset session
                      at The Lounge, Burj Khalifa, the highest lounge in the
                      world at 585m.
                    </p>
                    <div className="blog2-extra-imgs-div">
                      <picture>
                        <source srcSet={BurjKhalifaImgWebP} type="image/webp" />
                        <source srcSet={BurjKhalifaImg} type="image/png" />
                        <img
                          src={BurjKhalifaImg}
                          title="Burj Khalifa"
                          className="blog2-all-images pb-4"
                          alt={
                            blogsData?.title ? blogsData.title : "Blogs Data"
                          }
                        />
                      </picture>
                    </div>

                    <h3 className="blog2-things-todo-inDubai-heading mb-3">
                      The Dubai Fountain :
                    </h3>

                    <p>
                      Located at the base of Burj Khalifa is one of the world's
                      largest choreographed fountain displays, where powerful
                      jet streams soar as high as 150m in the air and sway in
                      time to musical numbers. Stop by in the evening when
                      displays begin at sundown and take place every 30 minutes,
                      until the final song plays at 11pm. Diners can also sit
                      back and enjoy the show at an array of restaurants at
                      Dubai Mall or Souk Al Bahar, both commanding prime
                      positions near the fountain arena.{" "}
                    </p>
                  </Row>

                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Palm Jumeirah :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={PalmJumeirahImgWebP} type="image/webp" />
                      <source srcSet={PalmJumeirahImg} type="image/png" />
                      <img
                        src={PalmJumeirahImg}
                        title="Palm Jumeirah"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    Palm Jumeirah is one of the largest manmade islands in the
                    world and a triumph of human ingenuity. Locals and tourists
                    alike flock to its vast array of high-end hotels - Waldorf
                    Astoria, Fairmont, One&Only, Jumeirah Zabeel Saray and,
                    perhaps most notably, Atlantis, The Palm. Getting here is
                    simple, thanks to the monorail running down the 'trunk',
                    which connects to the mainland's tram system.{" "}
                  </p>

                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Dubai Creek :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={DubaiCreekImgWebP} type="image/webp" />
                      <source srcSet={DubaiCreekImg} type="image/png" />
                      <img
                        src={DubaiCreekImg}
                        title="Dubai Creek"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    The city has a rich culture to explore. Modern developments
                    have added a contemporary touch to old establishments, of
                    which Dubai Creek is a fine example. Located in the heart of
                    the city, this saltwater estuary is the original site where
                    the Bani Yas tribe established their first settlement. While
                    at the Creek, a traditional abra ride is a must. At an
                    unbelievable AED 1 per ticket, it's easily the best value
                    tourist attraction in the city. Afterwards, visit the
                    labyrinthine alleyways of the gold, spice and textile souks,
                    to experience Dubai like a local.{" "}
                  </p>
                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Dubai Mall :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={DubaiMallImgWebP} type="image/webp" />
                      <source srcSet={DubaiMallImg} type="image/png" />
                      <img
                        src={DubaiMallImg}
                        title="Dubai Mall"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    Dubai Mall is the world's largest destination for shopping,
                    entertainment and leisure, located next to the world's
                    tallest building, the Burj Khalifa. Featuring over 1,200
                    retail stores, two major department stores and hundreds of
                    food and beverage outlets, Dubai Mall covers more than 1
                    million sqm - an area equivalent to 200 football pitches.
                    Even an entire day spent here is not enough to see it all.
                    Along with its 1,200-plus shops and 150 restaurants, the
                    venue is home to a range of other fun attractions.{" "}
                  </p>
                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Skydive Dubai :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={SkydiveDubaiImgWebP} type="image/webp" />
                      <source srcSet={SkydiveDubaiImg} type="image/png" />
                      <img
                        src={SkydiveDubaiImg}
                        title="Skydive Dubai"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    If there's one thing every adventure-seeker must sign up
                    for, it's a skydiving experience. Skydive Dubai provides
                    tandem skydive opportunities, supervised by trained
                    professionals. You'll have to book well in advance to secure
                    a spot, but it's worth it as you dive through the clouds
                    from 13,000 feet and take in views of the landmark Palm
                    Jumeirah or rolling dunes of the desert. And you can keep
                    reliving the epic experience thanks to perfectly-captured
                    videos by the Skydive Dubai team. It's one for every
                    braveheart's bucket list.{" "}
                  </p>
                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Dubai Frame :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={DubaiFrameImgWebP} type="image/webp" />
                      <source srcSet={DubaiFrameImg} type="image/png" />
                      <img
                        src={DubaiFrameImg}
                        title="Dubai Frame"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    Since opening in 2018, Dubai Frame has become a cultural
                    landmark that connects the Dubai's past with its present and
                    represents a remarkable engineering feat. Located within
                    Dubai's famous Zabeel Park, this attraction lets you
                    experience the transition between Old and New Dubai thanks
                    to sweeping panoramic views of the city from 150m high. One
                    of its striking features is the state-of-the-art clear glass
                    bridge walkway, which connects parallel vertical towers so
                    that, from the outside, the structure perfectly resembles a
                    giant picture frame.{" "}
                  </p>
                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Kite Beach :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={KiteBeachImgWebP} type="image/webp" />
                      <source srcSet={KiteBeachImg} type="image/png" />
                      <img
                        src={KiteBeachImg}
                        title="Kite Beach"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    The aptly-named Kite Beach is the perfect place to test out
                    your watersports skills, although there's plenty to do out
                    of the water at this popular spot too. Grab a smoothie from
                    one of the many open-air cafes and restaurants, watch bikers
                    and skaters fly by at the skate park, or enjoy a game of
                    volleyball with friends on the sand. With plenty of beach
                    activities, plus an incredible view of Burj Al Arab in the
                    distance, you can easily spend a whole day here.{" "}
                  </p>
                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    City Walk :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={CityWalkImgWebP} type="image/webp" />
                      <source srcSet={CityWalkImg} type="image/png" />
                      <img
                        src={CityWalkImg}
                        title="City Walk"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    City Walk offers European-style pedestrian streets alongside
                    a host of shopping and entertainment options - perfect for a
                    pleasant day out. Take a walk along tree-lined avenues with
                    shops and restaurants and spot artwork etched by some of the
                    world's finest urban artists. Afterwards, treat your family
                    to an afternoon of fun and head over to The Green Planet to
                    see real wildlife in an indoor tropical rainforest setting.
                    You can also catch a concert, live sports or a comedy show
                    at the nearby Coca-Cola Arena, the Middle East's largest
                    indoor arena.{" "}
                  </p>
                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Dubai Marina :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={DubaiMarinaImgWebP} type="image/webp" />
                      <source srcSet={DubaiMarinaImg} type="image/png" />
                      <img
                        src={DubaiMarinaImg}
                        title="Dubai Marina"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    One of the city's liveliest and most happening
                    neighbourhoods is Dubai Marina. Marvel at iconic buildings
                    as you stroll along Marina Walk or see the sights on a
                    traditional dhow cruise. This Dubai hotspot is a priority on
                    most visitors' holiday itineraries for good reason. With an
                    array of waterside restaurants, buzzing lounges and
                    irresistible retail therapy at Dubai Marina Mall, it's easy
                    to while away the hours here. Feeling brave? Pump up the
                    adrenaline at XLine, the world's longest urban zipline.{" "}
                  </p>
                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Deep Dive Dubai :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={DeepDiveDubaiImgWebP} type="image/webp" />
                      <source srcSet={DeepDiveDubaiImg} type="image/png" />
                      <img
                        src={DeepDiveDubaiImg}
                        title="Deep Dive Dubai"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    The latest addition to the city's thriving sports and
                    adventure activities scene, Deep Dive Dubai is the place to
                    be for all aqua enthusiasts. The recreational centre's
                    60.02m-deep pool is certified by Guinness World Records as
                    the world's deepest swimming pool for diving. Aside from its
                    remarkable depth, the pool features other unrivalled
                    underwater additions, such as a 'sunken city', alongside
                    year-round freediving and scuba diving courses and guided
                    experiences.{" "}
                  </p>
                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Burj Al Arab :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={BurjAlArabImgWebP} type="image/webp" />
                      <source srcSet={BurjAlArabImg} type="image/png" />
                      <img
                        src={BurjAlArabImg}
                        title="Burj Al Arab"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    For the first time since its launch, Dubai's famed Burj Al
                    Arab has opened its doors to visitors, granting access to
                    the hotel's ultra-luxurious interiors on an immersive
                    90-minute tour. Not only will you get to explore the
                    landmark's gilded suites, and enjoy its incomparable views
                    of the city, but you'll also uncover the hotel's history and
                    wealth of untold stories. You can also delve deeper and make
                    the most of your experience with tour customisations.{" "}
                  </p>

                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Museum of the Future :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source
                        srcSet={MuseumoftheFutureImgWebP}
                        type="image/webp"
                      />
                      <source srcSet={MuseumoftheFutureImg} type="image/png" />
                      <img
                        src={MuseumoftheFutureImg}
                        title="Museum of the Future"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    One of Dubai's most famous architectural landmarks, the
                    Museum of the Future takes pride of place along the city's
                    superhighway, Sheikh Zayed Road. Founded by the Dubai Future
                    Foundation, the museum explores how society could evolve in
                    the coming decades using science and technology. Termed a
                    'living museum', it incorporates elements of traditional
                    exhibitions, immersive theatre and themed attractions, so
                    visitors can look beyond the present and towards the
                    future's limitless possibilities.{" "}
                  </p>

                  <h3 className="blog2-things-todo-inDubai-heading mb-3">
                    Expo City Dubai :{" "}
                  </h3>
                  <div className="blog2-extra-imgs-div">
                    <picture>
                      <source srcSet={ExpoCityDubaiImgWebP} type="image/webp" />
                      <source srcSet={ExpoCityDubaiImg} type="image/png" />

                      <img
                        src={ExpoCityDubaiImg}
                        title="Expo City Dubai"
                        className="blog2-all-images pb-4"
                        alt={blogsData?.title ? blogsData.title : "Blogs Data"}
                      />
                    </picture>
                  </div>
                  <p>
                    Building on the legacy of Expo 2020 Dubai, which welcomed
                    192 nations and more than 24 million visitors, is the
                    future-centric Expo City Dubai. Explore popular country
                    pavilions including the falcon-inspired UAE Pavilion,
                    award-winning Kingdom of Saudi Arabia Pavilion and reworked
                    spaces for Luxembourg, Pakistan and Australia. Alif - the
                    Mobility Pavilion and Terra - the Sustainability Pavilion
                    have been transformed into interactive educational
                    experiences, while the Opportunity Pavilion is now the Expo
                    2020 Dubai Museum. Al Wasl Plaza, the Dubai Exhibition
                    Centre, the Garden in the Sky observation tower and the
                    Surreal water feature also remain at Expo City Dubai, which
                    has its own metro station.{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <FreeConsultationForm />
        <FooterCombination />
      </>
    </HelmetProvider>
  );
};

export default BlogPage2;
