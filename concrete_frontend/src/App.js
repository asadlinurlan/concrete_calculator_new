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
import NotFound from "./app/Pages/NotFound/NotFound";
import ServiceDetail from "./app/Pages/ServiceDetail/ServiceDetail";
import Materials from "./app/Pages/Materials/Materials";
import MaterialsHome from "./app/Pages/Materials/MaterialsHome";
import FaqPage from "./app/Pages/FaqPage/FaqPage";
import { SERVICE_PAGES } from "./data/servicePages";
import { MATERIAL_PAGES } from "./data/materialPages";
import { GRADE_PAGES } from "./data/gradePages";
import Seo from "./Components/Seo/Seo";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
import WhatsAppFab from "./Components/WhatsAppFab/WhatsAppFab";
import StickyContactBar from "./Components/StickyContactBar/StickyContactBar";

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
      <Seo page="home" />
      <HeroSection />
      <Features />
      <About />
      <Services />
      <MaterialsHome />
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
            <Route path="/tikinti-materiallari" element={<Materials />} />
            <Route path="/about" element={<About fullPage />} />
            <Route path="/contact" element={<Contact fullPage />} />
            {SERVICE_PAGES.map((p) => (
              <Route key={p.slug} path={p.slug} element={<ServiceDetail page={p} />} />
            ))}
            {MATERIAL_PAGES.map((p) => (
              <Route key={p.slug} path={p.slug} element={<ServiceDetail page={p} />} />
            ))}
            {GRADE_PAGES.map((p) => (
              <Route key={p.slug} path={p.slug} element={<ServiceDetail page={p} />} />
            ))}
            <Route path="/faq" element={<FaqPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ScrollTop />
        <WhatsAppFab />
        <StickyContactBar />
      </div>
    </Router>
  );
}

export default App;
