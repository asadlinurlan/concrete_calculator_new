import React, { useState, useCallback, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import { useT } from '../../../i18n/i18n';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import CtaBand from '../../../Components/CtaBand/CtaBand';
import './Gallery.css';
import img1 from '../img/beatriz-novaes-1-Rf38Y1QHk-unsplash.jpg';
import img2 from '../img/claus-grunstaudl-1_DvZyR3dRk-unsplash.jpg';
import img3 from '../img/d-c-rnqRdfYyywM-unsplash.jpg';
import img4 from '../img/mostafa-meraji-Vs4eK-qQwDA-unsplash.jpg';
import img5 from '../img/the-jd-darshan-solanki-fPySdxQ1kFg-unsplash.jpg';
import img6 from '../img/samuel-cruz-m7JngCMSQvc-unsplash.jpg';
import img7 from '../img/ravigopal-kesari-gKVPRBa7Td8-unsplash.jpg';

const IMAGES = [
  {
    src: img1,
    title: {
      az: 'Mikser vasitəsilə beton tökümü',
      en: 'Concrete pouring with a mixer truck',
      ru: 'Заливка бетона с помощью миксера',
    },
  },
  {
    src: img2,
    title: {
      az: 'Yük maşınları üçün parkinq',
      en: 'Parking area for trucks',
      ru: 'Парковка для грузовиков',
    },
  },
  {
    src: img3,
    title: { az: 'Hazır beton', en: 'Ready-mix concrete', ru: 'Готовый бетон' },
  },
  {
    src: img4,
    title: { az: 'Layihə prosesi', en: 'Project in progress', ru: 'Процесс работы над проектом' },
  },
  {
    src: img5,
    title: { az: 'Tikinti sahəsi', en: 'Construction site', ru: 'Стройплощадка' },
  },
  {
    src: img6,
    title: { az: 'Beton döşəmə', en: 'Concrete floor', ru: 'Бетонный пол' },
  },
  {
    src: img7,
    title: {
      az: 'Hündür mərtəbələrə beton tökümü',
      en: 'Concrete pouring at high floors',
      ru: 'Заливка бетона на высоких этажах',
    },
  },
];

const Gallery = () => {
  useScrollReveal();
  const t = useT();
  const [index, setIndex] = useState(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const movePrev = useCallback(
    () => setIndex((i) => (i + IMAGES.length - 1) % IMAGES.length),
    []
  );
  const moveNext = useCallback(
    () => setIndex((i) => (i + 1) % IMAGES.length),
    []
  );

  // Keyboard navigation + body scroll lock while the lightbox is open
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') movePrev();
      else if (e.key === 'ArrowRight') moveNext();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, movePrev, moveNext]);

  return (
    <section className="gallery-section">
      <Seo page="gallery" />
      <div className="page-hero-gallery">
        <div className="page-hero-overlay"></div>
        <div className="hero-content-center">
          <h1 className="page-title-center">
            {t({ az: 'Qalereya', en: 'Gallery', ru: 'Галерея' })}
          </h1>
          <p className="page-subtitle-center">
            {t({
              az: 'Layihələrimiz və istehsal prosesimiz',
              en: 'Our projects and production process',
              ru: 'Наши проекты и производственный процесс',
            })}
          </p>
        </div>
      </div>

      <div className="gallery-content">
        <div className="container">
          <Breadcrumbs current={t({ az: 'Qalereya', en: 'Gallery', ru: 'Галерея' })} />
          <div className="gallery-grid">
            {IMAGES.map((img, i) => (
              <button
                key={img.src}
                className="gallery-item reveal"
                style={{ transitionDelay: `${(i % 4) * 0.06}s` }}
                onClick={() => setIndex(i)}
                aria-label={`${t(img.title)} — ${t({ az: 'böyüt', en: 'zoom in', ru: 'увеличить' })}`}
              >
                <img src={img.src} alt={t(img.title)} loading="lazy" />
                <span className="gallery-overlay">
                  <ZoomIn size={26} aria-hidden="true" />
                  <span className="gallery-caption">{t(img.title)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <CtaBand
        title={{
          az: 'Layihənizi birlikdə həyata keçirək',
          en: "Let's bring your project to life together",
          ru: 'Реализуем ваш проект вместе',
        }}
        text={{
          az: 'Gördüyünüz işlər kimi — layihəniz üçün beton və tikinti materiallarını bir ünvandan alın.',
          en: 'Just like the projects you see — get concrete and construction materials for your project from one place.',
          ru: 'Как и работы, которые вы видите, — получите бетон и стройматериалы для вашего проекта в одном месте.',
        }}
        whatsappText={{
          az: 'Salam! Layihəm üçün qiymət təklifi almaq istəyirəm.',
          en: 'Hello! I would like to get a price quote for my project.',
          ru: 'Здравствуйте! Хочу получить ценовое предложение для моего проекта.',
        }}
      />

      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t(IMAGES[index].title)}
          onClick={close}
        >
          <button
            className="lightbox-close"
            onClick={close}
            aria-label={t({ az: 'Bağla', en: 'Close', ru: 'Закрыть' })}
          >
            <X size={30} aria-hidden="true" />
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); movePrev(); }}
            aria-label={t({ az: 'Əvvəlki', en: 'Previous', ru: 'Предыдущее' })}
          >
            <ChevronLeft size={40} aria-hidden="true" />
          </button>

          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img
              className="lightbox-image"
              src={IMAGES[index].src}
              alt={t(IMAGES[index].title)}
            />
            <figcaption className="lightbox-caption">{t(IMAGES[index].title)}</figcaption>
          </figure>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); moveNext(); }}
            aria-label={t({ az: 'Növbəti', en: 'Next', ru: 'Следующее' })}
          >
            <ChevronRight size={40} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
