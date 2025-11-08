import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Loginpage from "./components/login/Loginpage";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import DashboardLayout from "./components/dashboard/layout/DashboardLayout";
import PriceList from "./components/dashboard/pricelist/PriceList";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="gap"></div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <main className="main-content">
              <Loginpage />
            </main>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <PriceList />
            </DashboardLayout>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <div className="gap"></div>
              <main className="main-content">
                <About />
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
