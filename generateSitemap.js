const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/vehicles', changefreq: 'monthly', priority: 0.8 },
  { url: '/aboutus', changefreq: 'monthly', priority: 0.5 },
  { url: '/faqs', changefreq: 'monthly', priority: 0.5 },
  { url: '/terms&Conditions', changefreq: 'monthly', priority: 0.5 },
  { url: '/contactus', changefreq: 'monthly', priority: 0.5 },
  { url: '/bookingPage/1', changefreq: 'monthly', priority: 0.5 },
  { url: '/bookingPage/2', changefreq: 'monthly', priority: 0.5 },
  { url: '/blogPage1/1', changefreq: 'monthly', priority: 0.5 },
  { url: '/blogPage2/2', changefreq: 'monthly', priority: 0.5 },
  { url: '/blogPage3/3', changefreq: 'monthly', priority: 0.5 },
];

const hostname = 'https://www.milelecarrental.com';

const stream = new SitemapStream({ hostname });

const writeStream = createWriteStream('./public/sitemap.xml');

streamToPromise(Readable.from(links).pipe(stream)).then(data => {
  writeStream.write(data.toString());
  console.log('Sitemap written to ./public/sitemap.xml');
});

writeStream.on('finish', () => {
  console.log('Sitemap generation complete.');
});
