import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Loginpage from "./components/login/Loginpage";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="gap"></div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
