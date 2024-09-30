/* eslint-disable no-unused-vars */
const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { Readable } = require("stream");

async function generateSitemap() {
  const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/vehicles", changefreq: "monthly", priority: 0.8 },
    { url: "/about-us", changefreq: "monthly", priority: 0.5 },
    { url: "/faqs", changefreq: "monthly", priority: 0.5 },
    { url: "/terms-and-conditions", changefreq: "monthly", priority: 0.5 },
    { url: "/contact-us", changefreq: "monthly", priority: 0.5 },
    {
      url: "/difference-between-car-rental-and-lease",
      changefreq: "monthly",
      priority: 0.5,
    },
    {
      url: "/things-to-do-in-dubai",
      changefreq: "monthly",
      priority: 0.5,
    },
    {
      url: "/top-apps-that-help-you-to-navigate-in-dubai",
      changefreq: "monthly",
      priority: 0.5,
    },
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
