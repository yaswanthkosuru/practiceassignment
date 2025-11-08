import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Loginpage from "./components/login/Loginpage";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import About from "./components/About";
import Terms from "./components/Terms";
import Home from "./components/Home";
import DashboardLayout from "./components/dashboard/layout/DashboardLayout";
import PriceList from "./components/dashboard/pricelist/PriceList";

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <main className="main-content">
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
          <Route path="/login" element={<Loginpage />} />
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
                <About />
              </>
            }
          />
          <Route
            path="/terms"
            element={
              <>
                <Navbar />
                <div className="gap"></div>
                <Terms />
              </>
            }
          />
        </Routes>
      </main>
      {location.pathname !== '/terms' && <Footer />}
    </div>
  );
}

export default App;
