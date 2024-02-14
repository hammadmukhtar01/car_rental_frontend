import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import BookingDetails from "./components/Pages/Booking/bookingDetails";
import PaymentPage from "./components/Pages/multipleStepsForm/paymentPage";
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
import MainNavbar from "./components/Pages/navbar/mainNavbar";
import ForgotPasswordPage from "./components/authentication/forgotPassword";
import ResetPasswordPage from "./components/authentication/resetPasswordPage";
import VehicleDetails from "./components/Pages/multipleStepsForm/vehicleDetails";
import AddOnsDocuments from "./components/Pages/multipleStepsForm/addOnsDocuments";
import ErrorPage from "./components/Pages/OtherPages/errorPage";
import QuickLeaseVehicles from "./components/Pages/vehicle/quickleaseVehicles";

function App() {
  return (
    <>
      <div className="App">
        <div className="">
          <MainNavbar />
        </div>
        <div className="top-page-horizontal-line">
          <span className="top-horizontal-line-text">
            Milele Motors, Car Rental System
          </span>
        </div>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/home" exact element={<HomePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/quicklease" element={<QuickLeaseVehicles />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/aboutus" element={<AboutusPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/contactus" element={<ContactusPage />} />
          <Route path="/myProfile/:id" element={<ContactusPage />} />
          <Route path="/myBookings/:id" element={<CustomerBookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
          <Route path="/bookingPage/:step" element={<VerificationForm />} />
          <Route path="/bookingPage2" element={<AddOnsDocuments />} />
          <Route path="/bookingPage3" element={<PaymentPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {/* <Footer /> */}
        <FixedNumLocButtons />
      </div>
    </>
  );
}

export default App;
