/* eslint-disable no-unused-vars */
const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { Readable } = require("stream");
const axios = require("axios");


async function fetchData() {
  const usersResponse = await axios.get("https://api.example.com/users");
  const tokensResponse = await axios.get("https://api.example.com/tokens");

  const userIds = usersResponse.data.map(user => user.id);
  const tokens = tokensResponse.data.map(token => token.token);

  return { userIds, tokens };
}

async function generateSitemap() {
  const { userIds, tokens } = await fetchData();

  const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/login", changefreq: "daily", priority: 1.0 },
    { url: "/signup", changefreq: "daily", priority: 1.0 },
    { url: "/vehicles", changefreq: "monthly", priority: 0.8 },
    { url: "/aboutus", changefreq: "monthly", priority: 0.5 },
    { url: "/faqs", changefreq: "monthly", priority: 0.5 },
    { url: "/terms&Conditions", changefreq: "monthly", priority: 0.5 },
    { url: "/contactus", changefreq: "monthly", priority: 0.5 },
    { url: "/bookingPage/1", changefreq: "monthly", priority: 0.5 },
    { url: "/bookingPage/2", changefreq: "monthly", priority: 0.5 },
    {
      url: "/bookingPage/3&booking-success",
      changefreq: "monthly",
      priority: 0.5,
    },
    // ...userIds.map(id => ({ url: `/myProfile/${id}`, changefreq: "monthly", priority: 0.5 })),
    // ...userIds.map(id => ({ url: `/myBookings/${id}`, changefreq: "monthly", priority: 0.5 })),
    // ...tokens.map(token => ({ url: `/resetpassword/${token}`, changefreq: "monthly", priority: 0.5 })),
    { url: "/forgotpassword", changefreq: "monthly", priority: 0.5 },
  ];

  const hostname = "https://www.milelecarrental.com";

  const stream = new SitemapStream({ hostname });

  const writeStream = createWriteStream("./public/sitemap.xml");

  streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
    writeStream.write(data.toString());
    console.log("Sitemap written to ./public/sitemap.xml");
  });

  writeStream.on("finish", () => {
    console.log("Sitemap generation complete.");
  });
}

generateSitemap().catch((error) => {
  console.error("Error generating sitemap:", error);
});
