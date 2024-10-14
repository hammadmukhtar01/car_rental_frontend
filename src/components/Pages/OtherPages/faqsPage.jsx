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
import FaqsData from "./faqsData";

const FaqsPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>FAQs | Know more About Car Rentals | Milele Car Rental</title>
        <meta
          name="description"
          content="Get all the information you need to a smooth car rental experience. Uncover all the answers you are looking for with Milele Car Rental. "
        />
        <meta name="keywords" content="keywords" />
      </Helmet>
      <HeaderCombination />
      <FaqsData />
      <FooterCombination />
    </HelmetProvider>
  );
};

export default FaqsPage;
