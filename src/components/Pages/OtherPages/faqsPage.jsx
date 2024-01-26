import React from "react";
import "./otherPages.css";
import MainNavbar from "../navbar/mainNavbar";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const FaqsPage = () => {
  const faqItems = [
    {
      id: 1,
      question: "1- What is Milele Car Rental App",
      answer: `This is the first item's accordion body. It is <code>.accordion-body</code>, though the transition does limit overflow.`,
    },
    {
      id: 2,
      question: "2- How Renting System Works?",
      answer:
        "This is the second item's accordion body. It is <code>.accordion-body</code>, though the transition does limit overflow.",
    },
    {
      id: 3,
      question: "3- What is the refund Policy?",
      answer:
        "This is the third item's accordion body. It is <code>.accordion-body</code>, though the transition does limit overflow.",
    },
    {
      id: 4,
      question: "4- What if we got fine from RTA?",
      answer:
        "This is the forth item's accordion body. It is <code>.accordion-body</code>, though the transition does limit overflow.",
    },
    {
      id: 5,
      question: "5- Why to choose Milele Car Rental?",
      answer:
        "This is the fifth item's accordion body. It is <code>.accordion-body</code>, though the transition does limit overflow.",
    },
    {
      id: 6,
      question: "6- Best Experience with Milele Car Rental team?",
      answer:
        "This is the sixth item's accordion body. It is <code>.accordion-body</code>, though the transition does limit overflow.",
    },
  ];

  return (
    <>
      <div className="navbar-bg-img-container">
        <div className="booking-page-banner-navbar">
          {" "}
          <MainNavbar />
        </div>
      </div>
      <div className="container pt-4 pb-5">
        <div className="faq-heading text-center">
          <h2>
            <b>Frequently Asked Questions!</b>
          </h2>
        </div>
        <div className="faqs-main-div">
          <MDBContainer className="mt-4">
            <MDBRow>
              {faqItems.map((faqItem) => (
                <MDBCol
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  key={faqItem.id}
                  className="pb-4 single-faq-main-div"
                >
                  <MDBAccordion>
                    <MDBAccordionItem
                      collapseId={faqItem.id}
                      headerTitle={faqItem.question}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: faqItem.answer }}
                      />
                    </MDBAccordionItem>
                  </MDBAccordion>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </>
  );
};

export default FaqsPage;
