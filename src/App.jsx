import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flights from "./pages/Flights";
import { useEffect } from "react";
import { messaging } from "../firebase.js";
import { getToken } from "firebase/messaging";
import FlightInfo from "./pages/FlightInfo.jsx";
import LocomotiveScroll from 'locomotive-scroll';

function App() {

  const locomotiveScroll = new LocomotiveScroll();

  async function requirePermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      //Do Something
      const token = await getToken(messaging, {
        vapidKey:
          "BKBX8FyfqMG6UtUgkTt5hYr2RbxynUbHLK4s4zPsdrzKsk3RCi1BXUM11BaUVnc9it8tzmKnfbzjkcZSp5q-1Zg",
      });
      console.log("Generated Token: ", token);
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }
  useEffect(() => {
    requirePermission();
  }, []);
  return (
    <Router>
      <Header />

      <Routes>
        {/* UnProtected Routes */}
        <Route path="" element={<Hero />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/info/:id" element={<FlightInfo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
