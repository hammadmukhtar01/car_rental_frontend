import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import BookingDetails from './components/Pages/Booking/bookingDetails';
import PaymentPage from './components/Pages/multipleStepsForm/paymentPage';
import Footer from './components/Pages/footer/footer';
import HomePage from './components/Pages/homePage/homePage';
import VehicleDetailsPage from './components/Pages/vehicle/oldVehicleDetailsPage';
import VehiclesPage from './components/Pages/vehicle/vehiclesPage';
import LoginPage from './components/authentication/loginPage';
import FaqsPage from './components/Pages/OtherPages/faqsPage';
import ContactusPage from './components/Pages/OtherPages/contactusPage';
import SignupPage from './components/authentication/signupPage';
import AboutusPage from './components/Pages/OtherPages/aboutusPage';
import MainNavbar from './components/Pages/navbar/mainNavbar';
import CustomerBookingPage from './components/customerDashboard/myBookingDetails';
// import VehicleDetails from './components/Pages/multipleStepsForm/vehicleDetails';
import VerificationForm from './components/Pages/multipleStepsForm/multipleStepsForm';

function App() {
  return (
    <>
      <div className="App">
        
        <MainNavbar/>
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/vehicles" element={<VehiclesPage/>} />
          <Route path="/vehicleDetails/:id" element={<VehicleDetailsPage/>} />
          <Route path="/booking/:id" element={<BookingDetails/>} />
          <Route path="/payment/:id" element={<PaymentPage/>} />
          <Route path="/aboutus" element={<AboutusPage/>} />
          <Route path="/faqs" element={<FaqsPage/>} />
          <Route path="/contactus" element={<ContactusPage/>} />
          <Route path="/myProfile/:id" element={<ContactusPage/>} />
          <Route path="/myBookings/:id" element={<CustomerBookingPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/test" element={<VerificationForm/>} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
