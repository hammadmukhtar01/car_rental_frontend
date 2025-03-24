/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import "./App.css";
import HomePage from "./components/Pages/homePage/homePage";
import VehiclesPage from "./components/Pages/vehicle/allVehiclesPage";
import FaqsPage from "./components/Pages/OtherPages/faqsPage";
import ContactusPage from "./components/Pages/OtherPages/contactusPage";
import AboutusPage from "./components/Pages/OtherPages/aboutusPage";
import CustomerBookingPage from "./components/customerDashboard/myBookingDetails";
import VerificationForm from "./components/Pages/multipleStepsForm/multipleStepsForm";
import ResetPasswordPage from "./components/authentication/resetPasswordPage";
import PageNotFound from "./components/Pages/OtherPages/pageNotFound";
import LeaseToOwnVehicles from "./components/Pages/vehicle/leaseToOwn";
import TermsConditionsPage from "./components/Pages/OtherPages/termsConditionsPage";
import BlogPage1 from "./components/Pages/Blog/blogPage1";
import BlogPage2 from "./components/Pages/Blog/blogPage2";
import BlogPage3 from "./components/Pages/Blog/blogPage3";
import GlobalLoader from "./components/PrivateComponents/globalLoader";
import UpdatePasswordPage from "./components/authentication/updatePassword";
import PrivateComponent from "./components/PrivateComponents/privateComponent";
import CustomerProfilePage from "./components/customerDashboard/myProfilePage";
import Map from "./Map";
import ToasterWrapper from "./components/Pages/Utils/toastWrapper";
import EventCalculation from "./components/Pages/Utils/eventCalculation";
import { AuthModalProvider } from "./components/Pages/Utils/AuthContext";
import RentCarInSharjah from "./components/Pages/Blog/additionalBlogs/rentACarInSharjah";
import BlogPage4 from "./components/Pages/Blog/blogPage4";
const LazyAbout = React.lazy(() =>
  import("./components/Pages/OtherPages/aboutusPage")
);

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
        <AuthModalProvider>
          <div className="App">
            <ToasterWrapper />
            <Routes>
              <Route
                path="/"
                exact
                title="home-page-link"
                element={<HomePage />}
              />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route
                path="/about-us"
                element={
                  <React.Suspense fallback="loading about us...">
                    <LazyAbout />
                  </React.Suspense>
                }
              />
              {/* <Route path="/faqs" element={<FaqsPage />} /> */}
              <Route
                path="/terms-and-conditions"
                element={<TermsConditionsPage />}
              />
              <Route path="/contact-us" element={<ContactusPage />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
              />
              <Route
                path="/booking-page/:step"
                element={<VerificationForm />}
              />
              <Route
                path="/difference-between-car-rental-and-lease"
                element={<BlogPage1 />}
              />
              <Route path="/things-to-do-in-dubai" element={<BlogPage2 />} />
              <Route
                path="/top-apps-that-help-you-to-navigate-in-dubai"
                element={<BlogPage3 />}
              />
              <Route
                path="/milele-partners-with-oneClickDrive-to-elevate-your-car-rental-experience"
                element={<BlogPage4 />}
              />
              <Route path="log/things-to-do-in-dubai" element={<BlogPage2 />} />
              <Route path="/map" element={<Map />} />
              <Route
                path="/expense-calculator"
                element={<EventCalculation />}
              />

              <Route
                path="/rent-a-car-in-sharjah"
                element={<RentCarInSharjah />}
              />
              <Route element={<PrivateComponent />}>
                <Route
                  path="/my-profile/:id"
                  element={<CustomerProfilePage />}
                />
                <Route
                  path="/my-bookings/:id"
                  element={<CustomerBookingPage />}
                />
                <Route
                  path="/update-password"
                  element={<UpdatePasswordPage />}
                />
              </Route>
              <Route path="*" element={<PageNotFound />} status={404} />
            </Routes>
          </div>
        </AuthModalProvider>
      </GlobalLoader>
    </>
  );
};

export default App;
