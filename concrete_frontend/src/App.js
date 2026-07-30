// App.js
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { trackPageView, attachAutoTracking } from "./lib/analytics";
import { LOCALES, LocaleProvider, localePath, splitPath } from "./i18n/i18n";

// Scrolls to top on navigation, (re)wires scroll-reveal and reports SPA
// page views + auto-tracks contact-link clicks for analytics.
function RouteManager() {
  const location = useLocation();
  const { pathname } = location;
  // Language switches navigate with state.keepScroll — the user stays where
  // they are instead of being thrown back to the top of the page.
  const keepScroll = Boolean(location.state && location.state.keepScroll);

  // One-time: delegated click tracking for tel/whatsapp/email/directions links.
  useEffect(() => {
    attachAutoTracking();
  }, []);

  useEffect(() => {
    if (!keepScroll) {
      // Honour #anchor deep links (e.g. Ads sitelinks to /en/concrete#grades):
      // the fresh render replaces the DOM node the browser scrolled to natively.
      const { hash } = window.location;
      const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
      else window.scrollTo({ top: 0, behavior: "auto" });
    }
    // Defer a tick so react-helmet has updated document.title for this route.
    const t = setTimeout(() => trackPageView(pathname), 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useScrollReveal([pathname]);
  return null;
}

// concreteAlias: the Google Ads landing URLs (/en/concrete, /ru/concrete) —
// the localized homepage served at a stable URL with its own SEO config.
function HomePage({ concreteAlias }) {
  return (
    <>
      <Seo page={concreteAlias ? "concreteLanding" : "home"} />
      <HeroSection />
      <Features />
      <About />
      <Services />
      <MaterialsHome />
      <Contact />
    </>
  );
}

// The old standalone gallery page was merged into /about — redirect,
// keeping the visitor's locale (server-side 301s live in public/_redirects).
function GalleryRedirect() {
  const { pathname } = useLocation();
  const { locale } = splitPath(pathname);
  return <Navigate to={localePath(locale, "/about")} replace />;
}

// az-relative route table — rendered once per locale ('', /en, /ru).
const PAGE_ROUTES = [
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <Products /> },
  { path: "/services", element: <Services fullPage /> },
  { path: "/calculator", element: <Calculator /> },
  { path: "/gallery", element: <GalleryRedirect /> },
  { path: "/tikinti-materiallari", element: <Materials /> },
  { path: "/about", element: <About fullPage /> },
  { path: "/contact", element: <Contact fullPage /> },
  ...SERVICE_PAGES.map((p) => ({ path: p.slug, element: <ServiceDetail page={p} /> })),
  ...MATERIAL_PAGES.map((p) => ({ path: p.slug, element: <ServiceDetail page={p} /> })),
  ...GRADE_PAGES.map((p) => ({ path: p.slug, element: <ServiceDetail page={p} /> })),
  { path: "/faq", element: <FaqPage /> },
];

function AppShell() {
  const { pathname } = useLocation();
  const { locale } = splitPath(pathname);

  return (
    <LocaleProvider value={locale}>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {LOCALES.map((loc) =>
              PAGE_ROUTES.map((r) => (
                <Route key={`${loc}:${r.path}`} path={localePath(loc, r.path)} element={r.element} />
              ))
            )}
            {/* Google Ads landing aliases — localized homepage at stable URLs */}
            <Route path="/en/concrete" element={<HomePage concreteAlias />} />
            <Route path="/ru/concrete" element={<HomePage concreteAlias />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ScrollTop />
        <WhatsAppFab />
      </div>
    </LocaleProvider>
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
