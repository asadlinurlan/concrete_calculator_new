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
import LocalizedConcreteLanding from "./app/Pages/LocalizedLanding/LocalizedConcreteLanding";
import { SERVICE_PAGES } from "./data/servicePages";
import { MATERIAL_PAGES } from "./data/materialPages";
import { GRADE_PAGES } from "./data/gradePages";
import Seo from "./Components/Seo/Seo";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
import WhatsAppFab from "./Components/WhatsAppFab/WhatsAppFab";
import StickyContactBar from "./Components/StickyContactBar/StickyContactBar";
import { trackPageView, attachAutoTracking } from "./lib/analytics";

// Scrolls to top on navigation, (re)wires scroll-reveal and reports SPA
// page views + auto-tracks contact-link clicks for analytics.
function RouteManager() {
  const { pathname } = useLocation();

  // One-time: delegated click tracking for tel/whatsapp/email/directions links.
  useEffect(() => {
    attachAutoTracking();
  }, []);

  useEffect(() => {
    // Honour #anchor deep links (e.g. Ads sitelinks to /en/concrete#grades):
    // the fresh render replaces the DOM node the browser scrolled to natively.
    const { hash } = window.location;
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
    else window.scrollTo({ top: 0, behavior: "auto" });
    // Defer a tick so react-helmet has updated document.title for this route.
    const t = setTimeout(() => trackPageView(pathname), 50);
    return () => clearTimeout(t);
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

// Fully localized Google Ads landing pages — self-contained chrome, so the
// Azerbaijani header/footer/FAB/sticky bar must not render on these routes.
const LOCALIZED_LANDING_PATHS = ["/en/concrete", "/ru/concrete"];

function AppShell() {
  const { pathname } = useLocation();
  const localizedLanding = LOCALIZED_LANDING_PATHS.includes(pathname);

  const routes = (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/services" element={<Services fullPage />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/tikinti-materiallari" element={<Materials />} />
      <Route path="/about" element={<About fullPage />} />
      <Route path="/contact" element={<Contact fullPage />} />
      {/* key forces a remount on EN↔RU switch: form state and the
          one-shot contact_form_start guard must not carry across locales */}
      <Route path="/en/concrete" element={<LocalizedConcreteLanding key="en" locale="en" />} />
      <Route path="/ru/concrete" element={<LocalizedConcreteLanding key="ru" locale="ru" />} />
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
  );

  return (
    <div className="App">
      {!localizedLanding && <Header />}
      {/* The localized landing supplies its own header/main/footer landmarks —
          wrapping it in another <main> would nest main elements. */}
      {localizedLanding ? routes : <main>{routes}</main>}
      {!localizedLanding && <Footer />}
      {!localizedLanding && <ScrollTop />}
      {!localizedLanding && <WhatsAppFab />}
      {!localizedLanding && <StickyContactBar />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <RouteManager />
      <AppShell />
    </Router>
  );
}

export default App;
