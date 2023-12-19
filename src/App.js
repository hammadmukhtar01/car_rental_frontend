import "./App.css";
import BookingDetails from "./components/Pages/Booking/bookingDetails";
import PaymentPage from "./components/Pages/Booking/paymentPage";
import Footer from "./components/Pages/homePage/footer/footer";
import Navbar from "./components/Pages/header/header";
import HomePage from "./components/Pages/homePage/homePage";
import VehicleDetailsPage from "./components/Pages/vehicle/vehicleDetailsPage";
import VehiclesPage from "./components/Pages/vehicle/vehiclesPage";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div style={{marginTop: "70px"}}></div>
      {/* <HomePage /> */}
      {/* <VehiclesPage/> */}
      <VehicleDetailsPage/>
      <BookingDetails/>
      {/* <PaymentPage/> */}
      <Footer/>
    </div>
  );
}

export default App;
