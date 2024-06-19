/* eslint-disable no-unused-vars */
import React from "react";
import "./otherPages.css";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";

const FaqsPage = () => {
  const faqItems = [
    {
      id: 1,
      question: "What is Salik?",
      answer: `Salik is an electronic toll system in the UAE, it uses RFID technology and is built to automatically deduct a fee when a vehicle crosses a toll gate. Toll gate crossing (Salik) is charged at [actual price + 25% administration fee] + VAT.`,
    },
    {
      id: 2,
      question: "What is Darb toll gate system?",
      answer:
        "Darb is an integrated toll system in the Abu Dhabi, it is built to automatically deduct a fee when a vehicle crosses a darb toll gate. Darb Toll gate crossing is charged at [actual price + 25% administration fee] + VAT.",
    },
    {
      id: 3,
      question: "What is authorisation?",
      answer:
        "At the time of rental, a pre-authorisation hold is secured on the credit card provided (debit cards are not allowed), to cover the estimated rental charges and any additional charges that may be incurred. A Pre-Authorisation is a blocked amount on the card limit, which may appear as a debit and will not be available for your use. The Pre-Authorisation amount is reduced from the total credit limit on your credit card but is not released to us. The pre-authorisation is released in the normal course as pre-defined by your respective banks. Additional pre-authorisations (holds) are be obtained if the vehicle is not returned on the date/time noted on the rental agreement or if the original terms of the rental change, which result in additional charges. A request for releasing a block on a credit card is forwarded by us as applicable but may take up to 21 working days to process in your account unless it is automatically released as per the set time period by your bank.",
    },
    {
      id: 4,
      question:
        "Who can rent from Milele and what is the minimum period of rental?",
      answer:
        "Hirers should be at least 21 years of age and should hold a valid UAE driving license (at least for 6 months) for UAE Residence holders. For Tourist Permits, we require an International Driver's License. The minimum rental period is 24 hours from the time of renting.",
    },
    {
      id: 5,
      question: "Is parking available and are there any procedures?",
      answer:
        "Parking in UAE is readily available. Parking along the roadside is paid depending on the zone you are parked in. You can get parking tickets via parking meters that are installed all over the UAE. You can also park your car by SMS-ing to the designated numbers based on your location ‘[Number plate] [Area code] [number of parking hours]’ to ‘7275’.",
    },
    {
      id: 6,
      question: "How does the deposit refund process work?",
      answer:
        "Debit card deposit is processed after 40 calendar days from date of vehicle return, there is a 2% service fee + VAT charged by the bank.",
    },
    {
      id: 7,
      question: "Can I be charged even after I return the vehicle?",
      answer:
        "Yes, any salik tolls and traffic fines updated pertaining to the car hire can be charged on the credit card even after the vehicle returns.",
    },
    {
      id: 8,
      question: "What about traffic violations?",
      answer:
        "Most roads in the U.A.E. are radar controlled and it is in your interest to adhere to the speed limits which are clearly highlighted on road signs. All traffic violations will be charged to the renter alongwith a service fee and VAT.",
    },
    {
      id: 9,
      question: "What do we do in the case of a breakdown or accidents?",
      answer:
        "In any unforeseen circumstances, should your vehicle be involved in an accident please note that the vehicle should not be moved from the point of the accident or damage, except in the case where the damage is minor and the vehicle is causing an obstruction to the traffic. Kindly call the police (Dial 999) and remain with the vehicle in order to obtain a police report to be submitted to Milele Car Rental to claim insurance.",
    },
    {
      id: 10,
      question:
        "What kind of a driver's license is required to drive in the UAE and does it have to be an international license?",
      answer:
        "For UAE Resident Visa Holders: A valid UAE Driving License. For Visitors (on visit/transit visa) from GCC Countries: A valid GCC country driving license. For visitors from all other countries other than GCC countries (on visit/transit) : a valid international driving license. Non GCC Nationals with GCC Driving License also need to provide a valid residence visa of the country from where the license was issued.",
    },
    {
      id: 11,
      question: "Can I take the seats out of a Milele Van?",
      answer: "Sorry, all seats must remain in the van.",
    },
    {
      id: 12,
      question: "Can I tow with a Milele Car?",
      answer:
        "No. Towing is a violation of the rental agreement and is not permitted under any circumstances.",
    },
    {
      id: 13,
      question: "Can anyone other than me drive the car?",
      answer:
        "Yes, an additional drive can be added on with a minimal charge. The counter staff is to be informed at the time of the rental and documents such as passport and valid driving license to be submitted.",
    },
    {
      id: 14,
      question:
        "What happens if I drop the car at a different location than where I indicated?",
      answer:
        "When you change the return location outside the city limits, a location based charge may apply.",
    },
    {
      id: 15,
      question: "What happens if I return the car late?",
      answer:
        "A grace period of 2 hours is provided, which converts to one full day rental if exceeded.",
    },
    {
      id: 16,
      question: "What is the policy on off-road driving?",
      answer:
        "Off-road use is a violation of the rental agreement and is not allowed.",
    },
    {
      id: 17,
      question: "Who is eligible to take Collision Damage Waiver (CDW)?",
      answer:
        "Any customer who has a valid UAE Driving License which is minimum 1 year old or above.",
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>FAQs | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        <link rel="canonical" href="https://www.milelecarrental.com/faqs" />
      </Helmet>
      <HeaderCombination />
      <div className="container pt-4 pb-5">
        <div className="styled-label text-center">
          <span className="faqs-main-heading">
            <h1>
              {" "}
              <b className="fs-3"> Frequently Asked Questions!</b>
            </h1>
          </span>
        </div>
        <div className="faqs-main-div">
          <MDBContainer className="mt-4">
            <MDBRow>
              {faqItems?.map((faqItem) => (
                <MDBCol
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  key={faqItem?.id}
                  className="pb-4 single-faq-main-div"
                >
                  <MDBAccordion>
                    <MDBAccordionItem
                      collapseId={faqItem?.id}
                      headerTitle={faqItem?.question}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: faqItem?.answer }}
                      />
                    </MDBAccordionItem>
                  </MDBAccordion>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
      <FooterCombination />
    </HelmetProvider>
  );
};

export default FaqsPage;
