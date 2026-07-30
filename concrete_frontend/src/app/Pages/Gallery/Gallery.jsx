import React, { useState, useCallback, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useT } from '../../../i18n/i18n';
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

/**
 * Photo gallery section with a lightbox. Rendered as part of the
 * combined "Haqqımızda" page (the old standalone /gallery route now
 * redirects there).
 */
const Gallery = () => {
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
    <section
      className="gallery-section"
      aria-label={t({ az: 'Qalereya', en: 'Gallery', ru: 'Галерея' })}
    >
      <div className="container">
        <div className="section-head gallery-head reveal">
          <span className="section-subtitle">
            {t({ az: 'Qalereya', en: 'Gallery', ru: 'Галерея' })}
          </span>
          <h2 className="section-title">
            {t({
              az: 'Layihələrimiz və istehsal prosesimiz',
              en: 'Our projects and production process',
              ru: 'Наши проекты и производственный процесс',
            })}
          </h2>
        </div>
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
