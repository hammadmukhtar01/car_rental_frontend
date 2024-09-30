import React from "react";
import { Container } from "react-bootstrap";

const TextualDataHomePage = () => {
  return (
    <>
      <Container>
        <section>
          <h2 className="styled-label text-center">Car Rental in Dubai</h2>
          <p>
            Welcome to Milele, your trusted partner for car rental in Dubai,
            offering an extensive fleet of vehicles suitable for both personal
            enjoyment and professional use. From the sleek luxury of a Nissan to
            the practical economy of Suzuki and Toyota models, we have a vehicle
            to meet every need and budget. Our rental services are designed to
            be flexible, accommodating customers who need a vehicle for a short
            day trip or a longer-term arrangement, perfectly suiting both
            tourists and residents across the UAE. <br /> <br />
            Our service areas cover several key locations across Dubai, making
            it convenient to rent a car in Dubai no matter where you are
            located. Notable areas include Downtown Dubai, Al Barsha, Ras Al
            Khor, Dubai Marina, Festival City, Dubai Silicon Oasis, Bur Dubai,
            Al Warqa, Jumeirah Lake Towers, and many more. Each location is
            catered to with the same high standard of service, ensuring a
            seamless car rental experience in Dubai. <br />
            <br />
            Milele Car Rental is committed to making rent a car simple and
            stress-free. Our transparent pricing policy means no hidden costs,
            allowing our customers to plan their expenses accurately. All our
            vehicles are meticulously maintained and sanitized to ensure your
            safety and comfort. Whether you need a vehicle for a quick trip
            around Business Bay or daily commuting from Downtown Dubai, Milele
            is here to help. Contact us today to secure your ideal rental car in
            Dubai and enjoy unmatched convenience and service.
          </p>
          <br />
        </section>
        <section>
          <span>
            <h2 className="styled-label text-center">
              {" "}
              Document Required for Renting a Car in Dubai
            </h2>
            <p>
              At Milele Car Rental, we aim to make your rental process as
              straightforward as possible with clear and simple document
              requirements.
            </p>
            <strong> For UAE Residents: </strong> If you are a resident of the
            UAE, you need to provide the following documents:
            <ul>
              <li>
                <strong> One copy of your passport:</strong> This is used to
                verify your identity and residency status.
              </li>
              <li>
                <strong> A valid UAE driving license:</strong> Ensure your
                license is current and has not expired.{" "}
              </li>
              <li>
                <strong> One copy of your Emirates ID:</strong> This is
                necessary for additional verification and to comply with local
                regulations.
              </li>
            </ul>
            <br />
            <p>
              {" "}
              <strong>For Tourists Visiting the UAE:</strong> Tourists will need
              to provide a slightly different set of documents:{" "}
            </p>
            <ul>
              <li>
                <strong>A valid international driving license:</strong> Make
                sure your license is recognized internationally and valid for
                use in the UAE.
              </li>
              <li>
                {" "}
                <strong>One copy of your passport:</strong> As with residents,
                this is essential for identity verification.
              </li>
              <li>
                {" "}
                <strong>One copy of your visit visa:</strong> This confirms your
                legal status as a visitor in the UAE.
              </li>
            </ul>
          </span>
        </section>
      </Container>
    </>
  );
};

export default TextualDataHomePage;
