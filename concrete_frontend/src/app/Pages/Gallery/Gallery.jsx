import React, { useState, useCallback } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { ZoomIn } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import './Gallery.css';
import img1 from '../img/beatriz-novaes-1-Rf38Y1QHk-unsplash.jpg';
import img2 from '../img/claus-grunstaudl-1_DvZyR3dRk-unsplash.jpg';
import img3 from '../img/d-c-rnqRdfYyywM-unsplash.jpg';
import img4 from '../img/mostafa-meraji-Vs4eK-qQwDA-unsplash.jpg';
import img5 from '../img/the-jd-darshan-solanki-fPySdxQ1kFg-unsplash.jpg';
import img6 from '../img/samuel-cruz-m7JngCMSQvc-unsplash.jpg';
import img7 from '../img/ravigopal-kesari-gKVPRBa7Td8-unsplash.jpg';
import img8 from '../img/jesse-orrico-P6IqUKhatuM-unsplash.jpg';

const IMAGES = [
  { src: img1, title: 'Mikser vasitəsilə beton tökümü' },
  { src: img2, title: 'Tikinti sahəsi' },
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
  const movePrev = useCallback(() => setIndex((i) => (i + IMAGES.length - 1) % IMAGES.length), []);
  const moveNext = useCallback(() => setIndex((i) => (i + 1) % IMAGES.length), []);

  return (
    <section className="gallery-section">
      <div className="page-hero-gallery">
        <div className="page-hero-overlay"></div>
        <div className="hero-content-center">
          <h1 className="page-title-center">Qalereya</h1>
          <p className="page-subtitle-center">Layihələrimiz və istehsal prosesimiz</p>
        </div>
      </div>

      <div className="gallery-content">
        <div className="container">
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
        <Lightbox
          mainSrc={IMAGES[index].src}
          nextSrc={IMAGES[(index + 1) % IMAGES.length].src}
          prevSrc={IMAGES[(index + IMAGES.length - 1) % IMAGES.length].src}
          imageTitle={IMAGES[index].title}
          onCloseRequest={close}
          onMovePrevRequest={movePrev}
          onMoveNextRequest={moveNext}
        />
      )}
    </section>
  );
};

export default Gallery;
