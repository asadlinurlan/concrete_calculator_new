import React, { useState, useCallback, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import './Gallery.css';
import img1 from '../img/beatriz-novaes-1-Rf38Y1QHk-unsplash.jpg';
import img2 from '../img/claus-grunstaudl-1_DvZyR3dRk-unsplash.jpg';
import img3 from '../img/d-c-rnqRdfYyywM-unsplash.jpg';
import img4 from '../img/mostafa-meraji-Vs4eK-qQwDA-unsplash.jpg';
import img5 from '../img/the-jd-darshan-solanki-fPySdxQ1kFg-unsplash.jpg';
import img6 from '../img/samuel-cruz-m7JngCMSQvc-unsplash.jpg';
import img7 from '../img/ravigopal-kesari-gKVPRBa7Td8-unsplash.jpg';

const IMAGES = [
  { src: img1, title: 'Mikser vasitəsilə beton tökümü' },
  { src: img2, title: 'Yük maşınları üçün parkinq' },
  { src: img3, title: 'Hazır beton' },
  { src: img4, title: 'Layihə prosesi' },
  { src: img5, title: 'Tikinti sahəsi' },
  { src: img6, title: 'Beton döşəmə' },
  { src: img7, title: 'Hündür mərtəbələrə beton tökümü' },
];

const Gallery = () => {
  useScrollReveal();
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
          <h1 className="page-title-center">Qalereya</h1>
          <p className="page-subtitle-center">Layihələrimiz və istehsal prosesimiz</p>
        </div>
      </div>

      <div className="gallery-content">
        <div className="container">
          <Breadcrumbs current="Qalereya" />
          <div className="gallery-grid">
            {IMAGES.map((img, i) => (
              <button
                key={img.src}
                className="gallery-item reveal"
                style={{ transitionDelay: `${(i % 4) * 0.06}s` }}
                onClick={() => setIndex(i)}
                aria-label={`${img.title} — böyüt`}
              >
                <img src={img.src} alt={img.title} loading="lazy" />
                <span className="gallery-overlay">
                  <ZoomIn size={26} aria-hidden="true" />
                  <span className="gallery-caption">{img.title}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={IMAGES[index].title}
          onClick={close}
        >
          <button className="lightbox-close" onClick={close} aria-label="Bağla">
            <X size={30} aria-hidden="true" />
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); movePrev(); }}
            aria-label="Əvvəlki"
          >
            <ChevronLeft size={40} aria-hidden="true" />
          </button>

          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img
              className="lightbox-image"
              src={IMAGES[index].src}
              alt={IMAGES[index].title}
            />
            <figcaption className="lightbox-caption">{IMAGES[index].title}</figcaption>
          </figure>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); moveNext(); }}
            aria-label="Növbəti"
          >
            <ChevronRight size={40} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
