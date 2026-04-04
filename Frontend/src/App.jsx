import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import BecomeDriver from "./pages/BecomeDriver";
import PassengerDashboard from "./pages/passengerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import RideTracking from "./pages/ridetracking";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import DriverHistory from "./pages/DriverHistory";


const hideNavOn = ["/", "/login", "/signup"];

const Layout = ({ children }) => {
  const location = useLocation();
  const showNav = !hideNavOn.includes(location.pathname);
  return (
    <>
      {showNav && <Navbar />}
      <div style={{ paddingTop: showNav ? "60px" : "0" }}>
        {children}
      </div>
    </>
  );
};

function App() {
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/driver-details" element={<BecomeDriver />} />
          <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/ride-tracking" element={<RideTracking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/driver-history" element={<DriverHistory />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;