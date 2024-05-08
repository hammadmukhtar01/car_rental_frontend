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
import HomePageTopBar from "./components/Pages/navbar/homePageTopBar";
import HomePageBottomBar from "./components/Pages/navbar/homePageBottomBar";

function App() {
  return (
    <>
      <div className="App">
        <HomePageTopBar />
        <div className="navbar-div-container">
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
          <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
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
        <HomePageBottomBar />
        <FixedNumLocButtons />
      </div>
    </>
  );
}

export default App;
