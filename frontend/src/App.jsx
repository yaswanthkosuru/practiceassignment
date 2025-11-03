import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Loginpage from "./components/login/Loginpage";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Navbar />
      <div className="gap"></div>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
