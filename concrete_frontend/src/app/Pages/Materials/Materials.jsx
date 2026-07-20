import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Factory,
  Truck,
  Scale,
  Handshake,
  Layers,
  Clock,
  BadgeCheck,
} from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import WhatsAppButton from '../../../Components/WhatsAppButton/WhatsAppButton';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import Seo from '../../../Components/Seo/Seo';
import { SITE_URL, PAGES } from '../../../seo/seoConfig';
import { MATERIALS } from '../../../data/materials';
import MaterialQuoteForm from './MaterialQuoteForm';
import heroImg from '../img/materials-hero.webp';
import b2bImg from '../img/materials-b2b.webp';
import './Materials.css';

const WA_DEFAULT = 'Salam! Qum, atsep və ya şeben sifarişi üçün qiymət təklifi almaq istəyirəm.';
const WA_B2B =
  'Salam! Şirkətimiz üçün davamlı material təchizatı (qum, atsep, şeben) üzrə topdan satış təklifi almaq istəyirəm.';

const WHY_US = [
  { Icon: Factory, title: 'Birbaşa zavoddan satış', text: 'Vasitəçi yoxdur — material birbaşa Novxanı zavodundan yüklənir.' },
  { Icon: BadgeCheck, title: 'Keyfiyyətə nəzarət', text: 'Öz beton istehsalımızda istifadə etdiyimiz materialları satırıq.' },
  { Icon: Scale, title: 'Topdan və pərakəndə', text: 'Bir maşından davamlı iri həcmli təchizata qədər istənilən sifariş.' },
  { Icon: Truck, title: 'Operativ çatdırılma', text: 'Bakı və Abşeron üzrə ünvana çatdırılma, dəqiq qrafiklə.' },
  { Icon: Handshake, title: 'Fərdi və korporativ', text: 'Fiziki şəxslər, şirkətlər və beton zavodları ilə işləyirik.' },
  { Icon: Layers, title: 'Hər şey bir ünvandan', text: 'Beton və tikinti materiallarını eyni şirkətdən alın — vaxta qənaət edin.' },
  { Icon: Clock, title: '7/24 müraciət', text: 'Zavod 7/24 fəaliyyət göstərir — sorğunuzu istənilən vaxt göndərin.' },
];

const B2B_POINTS = [
  'Böyük həcmli sifarişlərin qəbulu',
  'Davamlı və stabil material təchizatı',
  'Korporativ müştərilər üçün xüsusi şərtlər',
  'Operativ logistika və çatdırılma',
  'Uzunmüddətli əməkdaşlıq imkanı',
  'Həcmə uyğun fərdi qiymətləndirmə',
];

const STEPS = [
  { title: 'Materialı seçin', text: 'Qum, atsep, şeben — və ya bir neçə material birlikdə.' },
  { title: 'Həcmi bildirin', text: 'Materialın növünü və təxmini həcmini (ton, m³ və ya maşın) qeyd edin.' },
  { title: 'Ünvanı göndərin', text: 'Çatdırılma ünvanını və əlaqə məlumatlarınızı yazın.' },
  { title: 'Təklifi təsdiqləyin', text: 'Həcmə uyğun qiymət təklifini alın və sifarişi təsdiqləyin.' },
];

const FAQS = [
  {
    q: 'Hansı tikinti materiallarını satırsınız?',
    a: 'Qum, atsep və şeben satışı həyata keçiririk. Materiallar həm pərakəndə (fərdi tikinti üçün), həm də topdan (şirkətlər və beton zavodları üçün) qaydada təqdim olunur.',
  },
  {
    q: 'Çatdırılma hansı əraziləri əhatə edir?',
    a: 'Bakı və Abşeron yarımadası üzrə çatdırılma edirik. Zavodumuz Novxanıda yerləşir, ona görə Abşeron zonasına xüsusilə operativ çatırıq. Konkret ünvan üçün bizimlə əlaqə saxlayın.',
  },
  {
    q: 'Qiymətlər necə müəyyən olunur?',
    a: 'Qiymət materialın növündən, sifariş həcmindən və çatdırılma məsafəsindən asılıdır. Buna görə hər sifariş üçün fərdi təklif hazırlayırıq — sorğu göndərmək pulsuzdur və heç bir öhdəlik yaratmır.',
  },
  {
    q: 'Beton zavodları üçün davamlı təchizat mümkündürmü?',
    a: 'Bəli. Beton istehsalı ilə məşğul olan zavodlar və iri tikinti şirkətləri üçün qum, atsep və şeben üzrə davamlı, böyük həcmli təchizat təklif edirik. Daimi əməkdaşlıq üçün fərdi kommersiya şərtləri müəyyən olunur.',
  },
];

/**
 * SEO landing page for the construction-materials line of business:
 * qum / atsep / şeben satışı. Hero, detailed product sections, B2B
 * supply block, trust points, ordering steps, quote form and FAQ
 * (+Product ItemList, Service & FAQPage JSON-LD).
 */
const Materials = () => {
  const { hash } = useLocation();
  useScrollReveal([]);

  // Smooth-scroll to #qum / #atsep / #seben / #teklif anchors on arrival
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) {
      // Let the route-level scroll-to-top settle first
      const t = setTimeout(() => {
        // Move keyboard/AT focus with the viewport, and respect reduced motion
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }, 60);
      return () => clearTimeout(t);
    }
  }, [hash]);

  const cfg = PAGES.materials;
  const pageUrl = SITE_URL + cfg.path;

  // Flat ListItem entries only — a nested Product without offers/price would
  // just generate "missing offers" errors in Search Console (prices are
  // intentionally not published; each order is quoted individually).
  const productListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tikinti materialları — qum, atsep və şeben satışı',
    itemListElement: MATERIALS.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${m.name} satışı`,
      url: `${pageUrl}#${m.id}`,
    })),
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tikinti materiallarının satışı və təchizatı',
    description:
      'Qum, atsep və şeben məhsullarının topdan və pərakəndə satışı, Bakı və Abşeron üzrə çatdırılma. Beton zavodları və tikinti şirkətləri üçün davamlı material təchizatı.',
    url: pageUrl,
    areaServed: ['Bakı', 'Abşeron', 'Novxanı'],
    provider: {
      '@type': 'LocalBusiness',
      name: 'Novxanı Beton',
      telephone: '+994506209584',
      url: SITE_URL + '/',
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="mt-page">
      <Seo page="materials" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(productListLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      {/* ── Hero ── */}
      <div className="mt-hero">
        <img
          className="mt-hero-img"
          src={heroImg}
          alt="Yük maşını tikinti qumunu ünvana boşaldır — qum, atsep və şeben çatdırılması"
          width="1600"
          height="900"
          fetchpriority="high"
        />
        <div className="mt-hero-shade" aria-hidden="true"></div>
        <div className="container mt-hero-content">
          <h1 className="mt-title">Qum, Atsep və Şeben Satışı</h1>
          <p className="mt-tagline">
            Fərdi tikinti layihələri, tikinti şirkətləri və beton zavodları üçün keyfiyyətli
            materialların topdan və pərakəndə satışı — Bakı və Abşeron üzrə çatdırılma ilə.
          </p>
          <div className="mt-hero-actions">
            <a href="#teklif" className="btn btn-accent">
              Qiymət təklifi al
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <WhatsAppButton text={WA_DEFAULT} label="WhatsApp ilə sifariş et" />
          </div>
        </div>
      </div>

      <div className="mt-body">
        <div className="container">
          <Breadcrumbs current="Tikinti Materialları" />

          {/* ── Intro ── */}
          <section className="mt-intro reveal">
            <p>
              Novxanı Beton artıq yalnız hazır beton deyil, tikintinin əsas materiallarını da bir
              ünvandan təqdim edir. Öz istehsalımızda istifadə etdiyimiz qum, atsep və şebeni
              birbaşa zavoddan — fərdi sifarişçilərə, tikinti şirkətlərinə və digər beton
              zavodlarına satırıq. Həcmindən asılı olmayaraq hər sifariş üçün fərdi qiymət təklifi
              hazırlanır.
            </p>
          </section>

          {/* ── Products ── */}
          <section className="mt-products" aria-label="Məhsullar">
            {MATERIALS.map((m, i) => (
              <article className="mt-product reveal" id={m.id} key={m.id}>
                <div className="mt-product-media">
                  <img src={m.image} alt={m.alt} width="900" height="600" loading="lazy" />
                </div>
                <div className="mt-product-info">
                  <h2>{m.name}</h2>
                  <p className="mt-product-intro">{m.intro}</p>
                  <h3>İstifadə sahələri</h3>
                  <ul className="mt-uses">
                    {m.uses.map((u) => (
                      <li key={u}>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        {u}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-audience">
                    <strong>Kimlər üçün:</strong> {m.audience}
                  </p>
                  <div className="mt-product-tags">
                    <span>Topdan satış</span>
                    <span>Pərakəndə satış</span>
                    <span>Çatdırılma ilə</span>
                  </div>
                  <div className="mt-product-actions">
                    <a href="#teklif" className="btn btn-primary">
                      {m.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    <Link to={`/${m.id}-satisi`} className="mt-detail-link">
                      {m.name} satışı haqqında ətraflı
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>

        {/* ── B2B supply ── */}
        <section className="mt-b2b" id="topdan-satis">
          <div className="container mt-b2b-inner">
            <div className="mt-b2b-text reveal">
              <span className="section-subtitle">Beton zavodları və şirkətlər üçün</span>
              <h2>İstehsalınız üçün davamlı material təchizatı</h2>
              <p>
                Beton zavodları və tikinti şirkətləri üçün qum, atsep və şeben məhsullarının stabil
                və böyük həcmli təchizatını təklif edirik. Daimi əməkdaşlıq və iri sifarişlər üçün
                fərdi qiymət təklifi təqdim olunur.
              </p>
              <ul className="mt-b2b-points">
                {B2B_POINTS.map((p) => (
                  <li key={p}>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-b2b-actions">
                <a href="#teklif" className="btn btn-accent">
                  Topdan satış təklifi al
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <WhatsAppButton text={WA_B2B} label="WhatsApp ilə əlaqə saxla" />
              </div>
            </div>
            <div className="mt-b2b-media reveal">
              <img
                src={b2bImg}
                alt="Yükləyici texnika şeben yığınının yanında yük maşınını doldurur — topdan material təchizatı"
                width="1200"
                height="800"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <div className="container">
          {/* ── Why us ── */}
          <section className="mt-why reveal" aria-label="Niyə Novxanı Beton">
            <div className="section-head">
              <span className="section-subtitle">Niyə Novxanı Beton?</span>
              <h2 className="mt-h2">Etibarlı təchizatçı ilə işləyin</h2>
            </div>
            <div className="mt-why-grid">
              {WHY_US.map(({ Icon, title, text }) => (
                <div className="mt-why-card" key={title}>
                  <span className="mt-why-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Steps ── */}
          <section className="mt-steps-section reveal" aria-label="Sifariş prosesi">
            <div className="section-head">
              <span className="section-subtitle">Sifariş prosesi</span>
              <h2 className="mt-h2">4 sadə addımda sifariş</h2>
            </div>
            <ol className="mt-steps">
              {STEPS.map((s, i) => (
                <li className="mt-step" key={s.title}>
                  <span className="mt-step-num">{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Quote form ── */}
          <section className="mt-form-section reveal" id="teklif" aria-label="Qiymət təklifi forması">
            <div className="mt-form-card">
              <div className="mt-form-head">
                <h2>Qiymət təklifi alın</h2>
                <p>
                  Məlumatları doldurun — həcmə və ünvana uyğun fərdi təklifi hazırlayıb sizinlə
                  əlaqə saxlayaq. Sorğu pulsuzdur və heç bir öhdəlik yaratmır.
                </p>
              </div>
              <MaterialQuoteForm />
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="mt-faq-section reveal" aria-label="Tez-tez verilən suallar">
            <div className="section-head">
              <span className="section-subtitle">Suallarınız var?</span>
              <h2 className="mt-h2">Tez-tez verilən suallar</h2>
            </div>
            <div className="mt-faq">
              {FAQS.map((f) => (
                <details className="mt-faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-related">
              Həmçinin baxın:{' '}
              <Link to="/hazir-beton-satisi">Hazır beton satışı</Link> ·{' '}
              <Link to="/beton-catdirilmasi">Beton çatdırılması</Link> ·{' '}
              <Link to="/calculator">Beton kalkulyatoru</Link> ·{' '}
              <Link to="/contact">Əlaqə</Link>
            </p>
          </section>
        </div>

        {/* ── Bottom CTA band ── */}
        <div className="mt-cta-band">
          <div className="container mt-cta-inner">
            <div>
              <h2>Materiala ehtiyacınız var?</h2>
              <p>Həcmi və ünvanı yazın — qalanını biz edək. Beton və materiallar bir ünvandan.</p>
            </div>
            <div className="mt-cta-actions">
              <WhatsAppButton text={WA_DEFAULT} />
              <a href="tel:+994506209584" className="btn btn-ghost mt-ghost">
                <Phone size={18} aria-hidden="true" />
                Zəng et
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Materials;
