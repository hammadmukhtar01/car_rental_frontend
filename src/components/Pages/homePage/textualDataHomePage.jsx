import React from "react";
import { Container } from "react-bootstrap";

const TextualDataHomePage = () => {
  return (
    <>
      <Container>
     
        <section>
          <span>
            <h2 className="styled-label text-center document-required-home-page-heading">
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
