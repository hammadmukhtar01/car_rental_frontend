/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import "./App.css";
import AfterBookingPage from "./components/Pages/multipleStepsForm/afterBookingPage";
import HomePage from "./components/Pages/homePage/homePage";
import VehiclesPage from "./components/Pages/vehicle/allVehiclesPage";
import LoginPage from "./components/authentication/loginPage";
import FaqsPage from "./components/Pages/OtherPages/faqsPage";
import ContactusPage from "./components/Pages/OtherPages/contactusPage";
import SignupPage from "./components/authentication/signupPage";
import AboutusPage from "./components/Pages/OtherPages/aboutusPage";
import CustomerBookingPage from "./components/customerDashboard/myBookingDetails";
import VerificationForm from "./components/Pages/multipleStepsForm/multipleStepsForm";
import ForgotPasswordPage from "./components/authentication/forgotPassword";
import ResetPasswordPage from "./components/authentication/resetPasswordPage";
import VehicleDetails from "./components/Pages/multipleStepsForm/vehicleDetails";
import AddOnsDocuments from "./components/Pages/multipleStepsForm/documentsAndBooking";
import PageNotFound from "./components/Pages/OtherPages/pageNotFound";
import LeaseToOwnVehicles from "./components/Pages/vehicle/leaseToOwn";
import TermsConditionsPage from "./components/Pages/OtherPages/termsConditionsPage";
import BlogPage1 from "./components/Pages/Blog/blogPage1";
import BlogPage2 from "./components/Pages/Blog/blogPage2";
import BlogPage3 from "./components/Pages/Blog/blogPage3";
import GlobalLoader from "./components/PrivateComponents/globalLoader";
import UpdatePasswordPage from "./components/authentication/updatePassword";
import PrivateComponent from "./components/PrivateComponents/privateComponent";
import Map from "./Map";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.initialize("G-LFDEE3CFEV");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <>
      <GlobalLoader>
        <div className="App">
          <Routes>
            <Route
              path="/"
              exact
              title="home-page-link"
              element={<HomePage />}
            />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/aboutus" element={<AboutusPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/terms&Conditions" element={<TermsConditionsPage />} />
            <Route path="/contactus" element={<ContactusPage />} />
            <Route
              path="/resetpassword/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/bookingPage/:step" element={<VerificationForm />} />
            <Route path="/blogPage1/1" element={<BlogPage1 />} />
            <Route path="/blogPage2/2" element={<BlogPage2 />} />
            <Route path="/blogPage3/3" element={<BlogPage3 />} />
            <Route path="/blogPage4/4" element={<BlogPage2 />} />
            <Route path="/map" element={<Map />} />

            <Route element={<PrivateComponent />}>
              <Route path="/myProfile/:id" element={<ContactusPage />} />
              <Route path="/myBookings/:id" element={<CustomerBookingPage />} />
              <Route path="/updatepassword" element={<UpdatePasswordPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} status={404} />
          </Routes>
        </div>
      </GlobalLoader>
    </>
  );
};

export default App;
