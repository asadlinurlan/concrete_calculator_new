import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { useT, useLocale, localePath, LocaleLink } from '../../../i18n/i18n';
import MaterialQuoteForm from './MaterialQuoteForm';
import heroImg from '../img/materials-hero.webp';
import b2bImg from '../img/materials-b2b.webp';
import './Materials.css';

const WA_DEFAULT = {
  az: 'Salam! Qum, atsep və ya şeben sifarişi üçün qiymət təklifi almaq istəyirəm.',
  en: 'Hello! I would like to get a quote for a sand, gravel mix or crushed stone order.',
  ru: 'Здравствуйте! Хочу получить предложение по цене на заказ песка, ПГС или щебня.',
};
const WA_B2B = {
  az: 'Salam! Şirkətimiz üçün davamlı material təchizatı (qum, atsep, şeben) üzrə topdan satış təklifi almaq istəyirəm.',
  en: 'Hello! I would like to get a wholesale offer for continuous material supply (sand, gravel mix, crushed stone) for our company.',
  ru: 'Здравствуйте! Хочу получить оптовое предложение на постоянные поставки материалов (песок, ПГС, щебень) для нашей компании.',
};

const PAGE_TITLE = {
  az: 'Qum, Atsep və Şeben Satışı | NOVXANI BETON',
  en: 'Sand, Gravel Mix and Crushed Stone Sales | NOVXANI BETON',
  ru: 'Продажа песка, ПГС и щебня | NOVXANI BETON',
};
const PAGE_DESCRIPTION = {
  az: 'NOVXANI BETON fərdi şəxslər, tikinti şirkətləri və beton zavodları üçün qum, atsep və şeben satışı, topdan sifariş və operativ çatdırılma xidməti təklif edir.',
  en: 'NOVXANI BETON offers sand, gravel mix and crushed stone sales for individuals, construction companies and concrete plants, with wholesale orders and fast delivery.',
  ru: 'NOVXANI BETON предлагает продажу песка, ПГС и щебня для частных лиц, строительных компаний и бетонных заводов — оптовые заказы и оперативная доставка.',
};

const WHY_US = [
  {
    Icon: Factory,
    title: { az: 'Birbaşa zavoddan satış', en: 'Direct from the plant', ru: 'Продажа напрямую с завода' },
    text: {
      az: 'Vasitəçi yoxdur — material birbaşa Novxanı zavodundan yüklənir.',
      en: 'No middlemen — materials are loaded directly at the Novkhani plant.',
      ru: 'Без посредников — материал отгружается напрямую с завода в Новханы.',
    },
  },
  {
    Icon: BadgeCheck,
    title: { az: 'Keyfiyyətə nəzarət', en: 'Quality control', ru: 'Контроль качества' },
    text: {
      az: 'Öz beton istehsalımızda istifadə etdiyimiz materialları satırıq.',
      en: 'We sell the same materials we use in our own concrete production.',
      ru: 'Мы продаём те же материалы, которые используем в собственном производстве бетона.',
    },
  },
  {
    Icon: Scale,
    title: { az: 'Topdan və pərakəndə', en: 'Wholesale and retail', ru: 'Опт и розница' },
    text: {
      az: 'Bir maşından davamlı iri həcmli təchizata qədər istənilən sifariş.',
      en: 'Any order — from a single truckload to continuous large-volume supply.',
      ru: 'Любой заказ — от одной машины до постоянных крупных поставок.',
    },
  },
  {
    Icon: Truck,
    title: { az: 'Operativ çatdırılma', en: 'Fast delivery', ru: 'Оперативная доставка' },
    text: {
      az: 'Bakı və Abşeron üzrə ünvana çatdırılma, dəqiq qrafiklə.',
      en: 'Delivery to your address across Baku and Absheron, on a precise schedule.',
      ru: 'Доставка по адресу по Баку и Абшерону, точно по графику.',
    },
  },
  {
    Icon: Handshake,
    title: { az: 'Fərdi və korporativ', en: 'Individuals and businesses', ru: 'Частным и корпоративным' },
    text: {
      az: 'Fiziki şəxslər, şirkətlər və beton zavodları ilə işləyirik.',
      en: 'We work with individuals, companies and concrete plants.',
      ru: 'Работаем с частными лицами, компаниями и бетонными заводами.',
    },
  },
  {
    Icon: Layers,
    title: { az: 'Hər şey bir ünvandan', en: 'Everything from one place', ru: 'Всё из одних рук' },
    text: {
      az: 'Beton və tikinti materiallarını eyni şirkətdən alın — vaxta qənaət edin.',
      en: 'Buy concrete and building materials from the same company — save time.',
      ru: 'Покупайте бетон и стройматериалы у одной компании — экономьте время.',
    },
  },
  {
    Icon: Clock,
    title: { az: '7/24 müraciət', en: '24/7 requests', ru: 'Обращения 24/7' },
    text: {
      az: 'Zavod 7/24 fəaliyyət göstərir — sorğunuzu istənilən vaxt göndərin.',
      en: 'The plant operates 24/7 — send your request at any time.',
      ru: 'Завод работает круглосуточно — отправляйте запрос в любое время.',
    },
  },
];

const B2B_POINTS = [
  {
    az: 'Böyük həcmli sifarişlərin qəbulu',
    en: 'Acceptance of large-volume orders',
    ru: 'Приём крупных заказов',
  },
  {
    az: 'Davamlı və stabil material təchizatı',
    en: 'Continuous and stable material supply',
    ru: 'Постоянные и стабильные поставки материалов',
  },
  {
    az: 'Korporativ müştərilər üçün xüsusi şərtlər',
    en: 'Special terms for corporate clients',
    ru: 'Особые условия для корпоративных клиентов',
  },
  {
    az: 'Operativ logistika və çatdırılma',
    en: 'Fast logistics and delivery',
    ru: 'Оперативная логистика и доставка',
  },
  {
    az: 'Uzunmüddətli əməkdaşlıq imkanı',
    en: 'Opportunity for long-term cooperation',
    ru: 'Возможность долгосрочного сотрудничества',
  },
  {
    az: 'Həcmə uyğun fərdi qiymətləndirmə',
    en: 'Individual pricing based on volume',
    ru: 'Индивидуальная оценка в зависимости от объёма',
  },
];

const STEPS = [
  {
    title: { az: 'Materialı seçin', en: 'Choose the material', ru: 'Выберите материал' },
    text: {
      az: 'Qum, atsep, şeben — və ya bir neçə material birlikdə.',
      en: 'Sand, gravel mix, crushed stone — or several materials together.',
      ru: 'Песок, ПГС, щебень — или несколько материалов сразу.',
    },
  },
  {
    title: { az: 'Həcmi bildirin', en: 'Specify the volume', ru: 'Укажите объём' },
    text: {
      az: 'Materialın növünü və təxmini həcmini (ton, m³ və ya maşın) qeyd edin.',
      en: 'State the material type and approximate volume (tons, m³ or truckloads).',
      ru: 'Укажите вид материала и примерный объём (тонны, м³ или машины).',
    },
  },
  {
    title: { az: 'Ünvanı göndərin', en: 'Send the address', ru: 'Отправьте адрес' },
    text: {
      az: 'Çatdırılma ünvanını və əlaqə məlumatlarınızı yazın.',
      en: 'Write the delivery address and your contact details.',
      ru: 'Напишите адрес доставки и ваши контактные данные.',
    },
  },
  {
    title: { az: 'Təklifi təsdiqləyin', en: 'Confirm the offer', ru: 'Подтвердите предложение' },
    text: {
      az: 'Həcmə uyğun qiymət təklifini alın və sifarişi təsdiqləyin.',
      en: 'Receive a quote based on the volume and confirm the order.',
      ru: 'Получите ценовое предложение по объёму и подтвердите заказ.',
    },
  },
];

const FAQS = [
  {
    q: {
      az: 'Hansı tikinti materiallarını satırsınız?',
      en: 'Which building materials do you sell?',
      ru: 'Какие стройматериалы вы продаёте?',
    },
    a: {
      az: 'Qum, atsep və şeben satışı həyata keçiririk. Materiallar həm pərakəndə (fərdi tikinti üçün), həm də topdan (şirkətlər və beton zavodları üçün) qaydada təqdim olunur.',
      en: 'We sell sand, gravel mix (sand-gravel mix) and crushed stone. Materials are available both retail (for individual construction) and wholesale (for companies and concrete plants).',
      ru: 'Мы продаём песок, ПГС (песчано-гравийную смесь) и щебень. Материалы отпускаются как в розницу (для частного строительства), так и оптом (для компаний и бетонных заводов).',
    },
  },
  {
    q: {
      az: 'Çatdırılma hansı əraziləri əhatə edir?',
      en: 'Which areas do you deliver to?',
      ru: 'Какие районы охватывает доставка?',
    },
    a: {
      az: 'Bakı və Abşeron yarımadası üzrə çatdırılma edirik. Zavodumuz Novxanıda yerləşir, ona görə Abşeron zonasına xüsusilə operativ çatırıq. Konkret ünvan üçün bizimlə əlaqə saxlayın.',
      en: 'We deliver across Baku and the Absheron peninsula. Our plant is located in Novkhani, so we are especially fast in the Absheron area. Contact us about your specific address.',
      ru: 'Мы доставляем по Баку и Абшеронскому полуострову. Наш завод находится в Новханы, поэтому в зоне Абшерона мы работаем особенно оперативно. По конкретному адресу свяжитесь с нами.',
    },
  },
  {
    q: {
      az: 'Qiymətlər necə müəyyən olunur?',
      en: 'How are prices determined?',
      ru: 'Как формируются цены?',
    },
    a: {
      az: 'Qiymət materialın növündən, sifariş həcmindən və çatdırılma məsafəsindən asılıdır. Buna görə hər sifariş üçün fərdi təklif hazırlayırıq — sorğu göndərmək pulsuzdur və heç bir öhdəlik yaratmır.',
      en: 'The price depends on the material type, order volume and delivery distance. That is why we prepare an individual offer for each order — sending a request is free and involves no obligation.',
      ru: 'Цена зависит от вида материала, объёма заказа и расстояния доставки. Поэтому для каждого заказа мы готовим индивидуальное предложение — запрос бесплатный и ни к чему не обязывает.',
    },
  },
  {
    q: {
      az: 'Beton zavodları üçün davamlı təchizat mümkündürmü?',
      en: 'Is continuous supply available for concrete plants?',
      ru: 'Возможны ли постоянные поставки для бетонных заводов?',
    },
    a: {
      az: 'Bəli. Beton istehsalı ilə məşğul olan zavodlar və iri tikinti şirkətləri üçün qum, atsep və şeben üzrə davamlı, böyük həcmli təchizat təklif edirik. Daimi əməkdaşlıq üçün fərdi kommersiya şərtləri müəyyən olunur.',
      en: 'Yes. For concrete producers and large construction companies we offer continuous, large-volume supply of sand, gravel mix and crushed stone. Individual commercial terms are set for ongoing cooperation.',
      ru: 'Да. Для бетонных заводов и крупных строительных компаний мы предлагаем постоянные крупнообъёмные поставки песка, ПГС и щебня. Для регулярного сотрудничества устанавливаются индивидуальные коммерческие условия.',
    },
  },
];

/**
 * SEO landing page for the construction-materials line of business:
 * qum / atsep / şeben satışı. Hero, detailed product sections, B2B
 * supply block, trust points, ordering steps, quote form and FAQ
 * (+Product ItemList, Service & FAQPage JSON-LD).
 */
const Materials = () => {
  const t = useT();
  const locale = useLocale();
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
  const pageUrl = SITE_URL + localePath(locale, cfg.path);

  // Flat ListItem entries only — a nested Product without offers/price would
  // just generate "missing offers" errors in Search Console (prices are
  // intentionally not published; each order is quoted individually).
  const productListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t({
      az: 'Tikinti materialları — qum, atsep və şeben satışı',
      en: 'Building materials — sand, gravel mix and crushed stone for sale',
      ru: 'Стройматериалы — продажа песка, ПГС и щебня',
    }),
    itemListElement: MATERIALS.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t({
        az: `${t(m.name)} satışı`,
        en: `${t(m.name)} for sale`,
        ru: `${t(m.name)} — продажа`,
      }),
      url: `${pageUrl}#${m.id}`,
    })),
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t({
      az: 'Tikinti materiallarının satışı və təchizatı',
      en: 'Sale and supply of building materials',
      ru: 'Продажа и поставка стройматериалов',
    }),
    description: t({
      az: 'Qum, atsep və şeben məhsullarının topdan və pərakəndə satışı, Bakı və Abşeron üzrə çatdırılma. Beton zavodları və tikinti şirkətləri üçün davamlı material təchizatı.',
      en: 'Wholesale and retail sale of sand, gravel mix and crushed stone with delivery across Baku and Absheron. Continuous material supply for concrete plants and construction companies.',
      ru: 'Оптовая и розничная продажа песка, ПГС и щебня с доставкой по Баку и Абшерону. Постоянные поставки материалов для бетонных заводов и строительных компаний.',
    }),
    url: pageUrl,
    areaServed: ['Bakı', 'Abşeron', 'Novxanı'],
    provider: {
      '@type': 'LocalBusiness',
      name: t({ az: 'Novxanı Beton', en: 'Novxani Beton', ru: 'Novxani Beton' }),
      telephone: '+994506209584',
      url: SITE_URL + '/',
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: t(f.q),
      acceptedAnswer: { '@type': 'Answer', text: t(f.a) },
    })),
  };

  return (
    <div className="mt-page">
      <Seo page="materials" />
      <Helmet>
        <title>{t(PAGE_TITLE)}</title>
        <meta name="description" content={t(PAGE_DESCRIPTION)} />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="az" href={SITE_URL + cfg.path} />
        <link rel="alternate" hrefLang="en" href={SITE_URL + localePath('en', cfg.path)} />
        <link rel="alternate" hrefLang="ru" href={SITE_URL + localePath('ru', cfg.path)} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL + cfg.path} />
        <meta property="og:title" content={t(PAGE_TITLE)} />
        <meta property="og:description" content={t(PAGE_DESCRIPTION)} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:title" content={t(PAGE_TITLE)} />
        <meta name="twitter:description" content={t(PAGE_DESCRIPTION)} />
        <script type="application/ld+json">{JSON.stringify(productListLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      {/* ── Hero ── */}
      <div className="mt-hero">
        <img
          className="mt-hero-img"
          src={heroImg}
          alt={t({
            az: 'Yük maşını tikinti qumunu ünvana boşaldır — qum, atsep və şeben çatdırılması',
            en: 'A dump truck unloading construction sand on site — sand, gravel mix and crushed stone delivery',
            ru: 'Грузовик выгружает строительный песок на объекте — доставка песка, ПГС и щебня',
          })}
          width="1600"
          height="900"
          fetchpriority="high"
        />
        <div className="mt-hero-shade" aria-hidden="true"></div>
        <div className="container mt-hero-content">
          <h1 className="mt-title">
            {t({
              az: 'Qum, Atsep və Şeben Satışı',
              en: 'Sand, Gravel Mix and Crushed Stone Sales',
              ru: 'Продажа песка, ПГС и щебня',
            })}
          </h1>
          <p className="mt-tagline">
            {t({
              az: 'Fərdi tikinti layihələri, tikinti şirkətləri və beton zavodları üçün keyfiyyətli materialların topdan və pərakəndə satışı — Bakı və Abşeron üzrə çatdırılma ilə.',
              en: 'Wholesale and retail sales of quality materials for private construction projects, construction companies and concrete plants — with delivery across Baku and Absheron.',
              ru: 'Оптовая и розничная продажа качественных материалов для частных строительных проектов, строительных компаний и бетонных заводов — с доставкой по Баку и Абшерону.',
            })}
          </p>
          <div className="mt-hero-actions">
            <a href="#teklif" className="btn btn-accent">
              {t({ az: 'Qiymət təklifi al', en: 'Request a Quote', ru: 'Получить предложение' })}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <WhatsAppButton
              text={t(WA_DEFAULT)}
              label={t({ az: 'WhatsApp ilə sifariş et', en: 'Order on WhatsApp', ru: 'Заказать в WhatsApp' })}
            />
          </div>
        </div>
      </div>

      <div className="mt-body">
        <div className="container">
          <Breadcrumbs
            current={t({ az: 'Tikinti Materialları', en: 'Building Materials', ru: 'Стройматериалы' })}
          />

          {/* ── Intro ── */}
          <section className="mt-intro reveal">
            <p>
              {t({
                az: 'Novxanı Beton artıq yalnız hazır beton deyil, tikintinin əsas materiallarını da bir ünvandan təqdim edir. Öz istehsalımızda istifadə etdiyimiz qum, atsep və şebeni birbaşa zavoddan — fərdi sifarişçilərə, tikinti şirkətlərinə və digər beton zavodlarına satırıq. Həcmindən asılı olmayaraq hər sifariş üçün fərdi qiymət təklifi hazırlanır.',
                en: 'Novxani Beton now offers not only ready-mix concrete but also the core construction materials from one place. We sell the sand, gravel mix and crushed stone used in our own production directly from the plant — to individual customers, construction companies and other concrete plants. An individual quote is prepared for every order, whatever the volume.',
                ru: 'Novxani Beton теперь предлагает не только готовый бетон, но и основные строительные материалы из одних рук. Песок, ПГС и щебень, которые мы используем в собственном производстве, мы продаём напрямую с завода — частным заказчикам, строительным компаниям и другим бетонным заводам. Индивидуальное ценовое предложение готовится для каждого заказа независимо от объёма.',
              })}
            </p>
          </section>

          {/* ── Products ── */}
          <section
            className="mt-products"
            aria-label={t({ az: 'Məhsullar', en: 'Products', ru: 'Продукция' })}
          >
            {MATERIALS.map((m, i) => (
              <article className="mt-product reveal" id={m.id} key={m.id}>
                <div className="mt-product-media">
                  <img src={m.image} alt={t(m.alt)} width="900" height="600" loading="lazy" />
                </div>
                <div className="mt-product-info">
                  <h2>{t(m.name)}</h2>
                  <p className="mt-product-intro">{t(m.intro)}</p>
                  <h3>{t({ az: 'İstifadə sahələri', en: 'Areas of use', ru: 'Области применения' })}</h3>
                  <ul className="mt-uses">
                    {m.uses.map((u) => (
                      <li key={u.az || u}>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        {t(u)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-audience">
                    <strong>{t({ az: 'Kimlər üçün:', en: 'Who it is for:', ru: 'Для кого:' })}</strong>{' '}
                    {t(m.audience)}
                  </p>
                  <div className="mt-product-tags">
                    <span>{t({ az: 'Topdan satış', en: 'Wholesale', ru: 'Опт' })}</span>
                    <span>{t({ az: 'Pərakəndə satış', en: 'Retail', ru: 'Розница' })}</span>
                    <span>{t({ az: 'Çatdırılma ilə', en: 'With delivery', ru: 'С доставкой' })}</span>
                  </div>
                  <div className="mt-product-actions">
                    <a href="#teklif" className="btn btn-primary">
                      {t(m.cta)}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    <LocaleLink to={`/${m.id}-satisi`} className="mt-detail-link">
                      {t({
                        az: `${t(m.name)} satışı haqqında ətraflı`,
                        en: `${t(m.name)} — more details`,
                        ru: `${t(m.name)} — подробнее`,
                      })}
                      <ArrowRight size={16} aria-hidden="true" />
                    </LocaleLink>
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
              <span className="section-subtitle">
                {t({
                  az: 'Beton zavodları və şirkətlər üçün',
                  en: 'For concrete plants and companies',
                  ru: 'Для бетонных заводов и компаний',
                })}
              </span>
              <h2>
                {t({
                  az: 'İstehsalınız üçün davamlı material təchizatı',
                  en: 'Continuous material supply for your production',
                  ru: 'Постоянные поставки материалов для вашего производства',
                })}
              </h2>
              <p>
                {t({
                  az: 'Beton zavodları və tikinti şirkətləri üçün qum, atsep və şeben məhsullarının stabil və böyük həcmli təchizatını təklif edirik. Daimi əməkdaşlıq və iri sifarişlər üçün fərdi qiymət təklifi təqdim olunur.',
                  en: 'We offer stable, large-volume supply of sand, gravel mix and crushed stone for concrete plants and construction companies. An individual quote is provided for ongoing cooperation and large orders.',
                  ru: 'Мы предлагаем стабильные крупнообъёмные поставки песка, ПГС и щебня для бетонных заводов и строительных компаний. Для постоянного сотрудничества и крупных заказов предоставляется индивидуальное ценовое предложение.',
                })}
              </p>
              <ul className="mt-b2b-points">
                {B2B_POINTS.map((p) => (
                  <li key={p.az}>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    {t(p)}
                  </li>
                ))}
              </ul>
              <div className="mt-b2b-actions">
                <a href="#teklif" className="btn btn-accent">
                  {t({
                    az: 'Topdan satış təklifi al',
                    en: 'Get a wholesale offer',
                    ru: 'Получить оптовое предложение',
                  })}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <WhatsAppButton
                  text={t(WA_B2B)}
                  label={t({
                    az: 'WhatsApp ilə əlaqə saxla',
                    en: 'Contact us on WhatsApp',
                    ru: 'Связаться в WhatsApp',
                  })}
                />
              </div>
            </div>
            <div className="mt-b2b-media reveal">
              <img
                src={b2bImg}
                alt={t({
                  az: 'Yükləyici texnika şeben yığınının yanında yük maşınını doldurur — topdan material təchizatı',
                  en: 'A loader filling a truck next to a crushed stone pile — wholesale material supply',
                  ru: 'Погрузчик загружает грузовик у кучи щебня — оптовые поставки материалов',
                })}
                width="1200"
                height="800"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <div className="container">
          {/* ── Why us ── */}
          <section
            className="mt-why reveal"
            aria-label={t({ az: 'Niyə Novxanı Beton', en: 'Why Novxani Beton', ru: 'Почему Novxani Beton' })}
          >
            <div className="section-head">
              <span className="section-subtitle">
                {t({ az: 'Niyə Novxanı Beton?', en: 'Why Novxani Beton?', ru: 'Почему Novxani Beton?' })}
              </span>
              <h2 className="mt-h2">
                {t({
                  az: 'Etibarlı təchizatçı ilə işləyin',
                  en: 'Work with a reliable supplier',
                  ru: 'Работайте с надёжным поставщиком',
                })}
              </h2>
            </div>
            <div className="mt-why-grid">
              {WHY_US.map(({ Icon, title, text }) => (
                <div className="mt-why-card" key={title.az}>
                  <span className="mt-why-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Steps ── */}
          <section
            className="mt-steps-section reveal"
            aria-label={t({ az: 'Sifariş prosesi', en: 'Ordering process', ru: 'Процесс заказа' })}
          >
            <div className="section-head">
              <span className="section-subtitle">
                {t({ az: 'Sifariş prosesi', en: 'Ordering process', ru: 'Процесс заказа' })}
              </span>
              <h2 className="mt-h2">
                {t({
                  az: '4 sadə addımda sifariş',
                  en: 'Order in 4 simple steps',
                  ru: 'Заказ в 4 простых шага',
                })}
              </h2>
            </div>
            <ol className="mt-steps">
              {STEPS.map((s, i) => (
                <li className="mt-step" key={s.title.az}>
                  <span className="mt-step-num">{i + 1}</span>
                  <div>
                    <h3>{t(s.title)}</h3>
                    <p>{t(s.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Quote form ── */}
          <section
            className="mt-form-section reveal"
            id="teklif"
            aria-label={t({ az: 'Qiymət təklifi forması', en: 'Quote request form', ru: 'Форма запроса цены' })}
          >
            <div className="mt-form-card">
              <div className="mt-form-head">
                <h2>{t({ az: 'Qiymət təklifi alın', en: 'Get a quote', ru: 'Получите ценовое предложение' })}</h2>
                <p>
                  {t({
                    az: 'Məlumatları doldurun — həcmə və ünvana uyğun fərdi təklifi hazırlayıb sizinlə əlaqə saxlayaq. Sorğu pulsuzdur və heç bir öhdəlik yaratmır.',
                    en: 'Fill in the details — we will prepare an individual offer based on your volume and address and get back to you. The request is free and involves no obligation.',
                    ru: 'Заполните данные — мы подготовим индивидуальное предложение с учётом объёма и адреса и свяжемся с вами. Запрос бесплатный и ни к чему не обязывает.',
                  })}
                </p>
              </div>
              <MaterialQuoteForm />
            </div>
          </section>

          {/* ── FAQ ── */}
          <section
            className="mt-faq-section reveal"
            aria-label={t({
              az: 'Tez-tez verilən suallar',
              en: 'Frequently Asked Questions',
              ru: 'Часто задаваемые вопросы',
            })}
          >
            <div className="section-head">
              <span className="section-subtitle">
                {t({ az: 'Suallarınız var?', en: 'Have questions?', ru: 'Есть вопросы?' })}
              </span>
              <h2 className="mt-h2">
                {t({
                  az: 'Tez-tez verilən suallar',
                  en: 'Frequently Asked Questions',
                  ru: 'Часто задаваемые вопросы',
                })}
              </h2>
            </div>
            <div className="mt-faq">
              {FAQS.map((f) => (
                <details className="mt-faq-item" key={f.q.az}>
                  <summary>{t(f.q)}</summary>
                  <p>{t(f.a)}</p>
                </details>
              ))}
            </div>
            <p className="mt-related">
              {t({ az: 'Həmçinin baxın:', en: 'See also:', ru: 'Смотрите также:' })}{' '}
              <LocaleLink to="/hazir-beton-satisi">
                {t({ az: 'Hazır beton satışı', en: 'Ready-mix concrete sales', ru: 'Продажа готового бетона' })}
              </LocaleLink>{' '}
              ·{' '}
              <LocaleLink to="/beton-catdirilmasi">
                {t({ az: 'Beton çatdırılması', en: 'Concrete delivery', ru: 'Доставка бетона' })}
              </LocaleLink>{' '}
              ·{' '}
              <LocaleLink to="/calculator">
                {t({ az: 'Beton kalkulyatoru', en: 'Concrete calculator', ru: 'Калькулятор бетона' })}
              </LocaleLink>{' '}
              ·{' '}
              <LocaleLink to="/contact">{t({ az: 'Əlaqə', en: 'Contact', ru: 'Контакты' })}</LocaleLink>
            </p>
          </section>
        </div>

        {/* ── Bottom CTA band ── */}
        <div className="mt-cta-band">
          <div className="container mt-cta-inner">
            <div>
              <h2>{t({ az: 'Materiala ehtiyacınız var?', en: 'Need materials?', ru: 'Нужны материалы?' })}</h2>
              <p>
                {t({
                  az: 'Həcmi və ünvanı yazın — qalanını biz edək. Beton və materiallar bir ünvandan.',
                  en: 'Send the volume and address — we will handle the rest. Concrete and materials from one place.',
                  ru: 'Напишите объём и адрес — остальное мы сделаем сами. Бетон и материалы из одних рук.',
                })}
              </p>
            </div>
            <div className="mt-cta-actions">
              <WhatsAppButton
                text={t(WA_DEFAULT)}
                label={t({
                  az: 'WhatsApp ilə qiymət al',
                  en: 'Get a quote on WhatsApp',
                  ru: 'Узнать цену в WhatsApp',
                })}
              />
              <a href="tel:+994506209584" className="btn btn-ghost mt-ghost">
                <Phone size={18} aria-hidden="true" />
                {t({ az: 'Zəng et', en: 'Call', ru: 'Позвонить' })}
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Materials;
