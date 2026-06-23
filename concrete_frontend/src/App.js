// App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import useScrollReveal from "./hooks/useScrollReveal";
import Header from "./app/Pages/Header/Header";
import HeroSection from "./app/Pages/HeroSection/HeroSection";
import Features from "./app/Pages/Features/Features";
import About from "./app/Pages/About/About";
import Services from "./app/Pages/Services/Services";
import Contact from "./app/Pages/Contact/Contact";
import Footer from "./app/Pages/Footer/Footer";
import Calculator from "./Components/Calculator/Calculator";
import Products from "./app/Pages/Products/Products";
import Gallery from "./app/Pages/Gallery/Gallery";

// Scrolls to top on navigation and (re)wires scroll-reveal for the new page.
function RouteManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  useScrollReveal([pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <Features />
      <About />
      <Services />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <RouteManager />
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services fullPage />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About fullPage />} />
            <Route path="/contact" element={<Contact fullPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
