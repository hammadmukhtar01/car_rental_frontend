/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import BookingDetails from "./components/Pages/Booking/bookingDetails";
import AfterBookingPage from "./components/Pages/multipleStepsForm/afterBookingPage";
import Footer from "./components/Pages/footer/footer";
import HomePage from "./components/Pages/homePage/homePage";
import VehiclesPage from "./components/Pages/vehicle/allVehiclesPage";
import LoginPage from "./components/authentication/loginPage";
import FaqsPage from "./components/Pages/OtherPages/faqsPage";
import ContactusPage from "./components/Pages/OtherPages/contactusPage";
import SignupPage from "./components/authentication/signupPage";
import AboutusPage from "./components/Pages/OtherPages/aboutusPage";
import CustomerBookingPage from "./components/customerDashboard/myBookingDetails";
import VerificationForm from "./components/Pages/multipleStepsForm/multipleStepsForm";
import FixedNumLocButtons from "./components/Pages/navbar/locationNumberIcons";
import ForgotPasswordPage from "./components/authentication/forgotPassword";
import ResetPasswordPage from "./components/authentication/resetPasswordPage";
import VehicleDetails from "./components/Pages/multipleStepsForm/vehicleDetails";
import AddOnsDocuments from "./components/Pages/multipleStepsForm/documentsAndBooking";
import MainNavbar from "./components/Pages/navbar/mainNavbar";
import ErrorPage from "./components/Pages/OtherPages/errorPage";
import LeaseToOwnVehicles from "./components/Pages/vehicle/leaseToOwn";
import TermsConditionsPage from "./components/Pages/OtherPages/termsConditionsPage";
import BlogPage1 from "./components/Pages/Blog/blogPage1";
import BlogPage2 from "./components/Pages/Blog/blogPage2";
import BlogPage3 from "./components/Pages/Blog/blogPage3";
import BlogPage4 from "./components/Pages/Blog/blogPage4";
import { BiPhone, BiMailSend } from "react-icons/bi";
import { FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import { Row, Col } from "react-bootstrap";
import { HeightProvider } from "./components/Pages/homePage/HeightContext";

function App() {
  const phoneNumber = "+971544519432";
  const email = "info@milelecarrental.com";

  return (
    <>
      <div className="App">
        <div className="top-page-horizontal-line">
          <Row className="justify-content-center">
            <Col className="left-content col-lg-6 col pl-4">
              <Tooltip title="email us">
                <a
                  href={`mailto:${email}`}
                  className="top-contact-button top-email-link"
                >
                  <BiMailSend />
                  <span>{email}</span>
                </a>
              </Tooltip>
              <Tooltip title="call us">
                <a
                  href={`tel:${phoneNumber}`}
                  className="top-contact-button top-phone-call-link"
                >
                  <BiPhone />
                  <span>{phoneNumber}</span>
                </a>
              </Tooltip>
            </Col>

            <Col className="right-content col-lg-6 col text-right">
              <Tooltip title="Facebook">
                <a
                  href="https://www.facebook.com/milelecarrental/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="social-media-icons-top-bar" />
                </a>
              </Tooltip>
              <Tooltip title="Instagram">
                <a
                  href="https://www.instagram.com/milelecarrentals/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="social-media-icons-top-bar" />
                </a>
              </Tooltip>
              <Tooltip title="Twitter">
                <a
                  href="https://twitter.com/milelecarrental"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTwitterX className="social-media-icons-top-bar" />
                </a>
              </Tooltip>
              <Tooltip title="YouTube">
                <a
                  href="https://www.youtube.com/channel/UCGZsbfATcMxEBbz1PWAKt0A"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="social-media-icons-top-bar" />
                </a>
              </Tooltip>
            </Col>
          </Row>
        </div>
        <div className="">
          <MainNavbar />
        </div>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/home" exact element={<HomePage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/leaseToOwn" element={<LeaseToOwnVehicles />} />
            <Route path="/booking/:id" element={<BookingDetails />} />
            <Route path="/afterpayment/:id" element={<AfterBookingPage />} />
            <Route path="/aboutus" element={<AboutusPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/terms&Conditions" element={<TermsConditionsPage />} />
            <Route path="/contactus" element={<ContactusPage />} />
            <Route path="/myProfile/:id" element={<ContactusPage />} />
            <Route path="/myBookings/:id" element={<CustomerBookingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route
              path="/resetpassword/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/bookingPage/:step" element={<VerificationForm />} />
            {/* <Route path="/bookingPage/2" element={<AddOnsDocuments />} /> */}
            {/* <Route path="/bookingPage/3" element={<PaymentPage />} /> */}
            <Route path="/blogPage1/1" element={<BlogPage1 />} />
            <Route path="/blogPage2/2" element={<BlogPage2 />} />
            <Route path="/blogPage3/3" element={<BlogPage3 />} />
            <Route path="/blogPage4/4" element={<BlogPage4 />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        <Footer />
        <FixedNumLocButtons />
      </div>
    </>
  );
}

export default App;
