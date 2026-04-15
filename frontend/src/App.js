// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./app/Pages/Header/Header";
import HeroSection from "./app/Pages/HeroSection/HeroSection";
import Features from "./app/Pages/Features/Features";
import About from "./app/Pages/About/About";
import Services from "./app/Pages/Services/Services";
import Contact from "./app/Pages/Contact/Contact";
import Footer from "./app/Pages/Footer/Footer";
import Calculator from "./Components/Calculator/Calculator";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <Features />
              <About />
              <Services />
              <Contact />
            </>
          } />
          <Route path="/about" element={<About fullPage />} />
          <Route path="/services" element={<Services fullPage />} />
          <Route path="/contact" element={<Contact fullPage />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;