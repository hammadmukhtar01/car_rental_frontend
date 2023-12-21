import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import BookingDetails from './components/Pages/Booking/bookingDetails';
import PaymentPage from './components/Pages/Booking/paymentPage';
import Footer from './components/Pages/footer/footer';
import Navbar from './components/Pages/navbar/navbar';
import HomePage from './components/Pages/homePage/homePage';
import VehicleDetailsPage from './components/Pages/vehicle/vehicleDetailsPage';
import VehiclesPage from './components/Pages/vehicle/vehiclesPage';
import LoginPage from './components/authentication/loginPage';
import AboutusPage from './components/Pages/OtherPages/aboutusPage';
import FaqsPage from './components/Pages/OtherPages/faqsPage';
import ContactusPage from './components/Pages/OtherPages/contactusPage';
import SignupPage from './components/authentication/signupPage';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <div style={{ marginTop: '80px' }}></div>
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/vehicles" element={<VehiclesPage/>} />
          <Route path="/vehicleDetails" element={<VehicleDetailsPage/>} />
          <Route path="/booking" element={<BookingDetails/>} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/aboutus" element={<AboutusPage/>} />
          <Route path="/faqs" element={<FaqsPage/>} />
          <Route path="/contactus" element={<ContactusPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
