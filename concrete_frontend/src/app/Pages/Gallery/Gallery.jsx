import React, { useState, useCallback } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { ZoomIn } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import './Gallery.css';

// Project gallery — swap these URLs with your own plant/project photos later.
const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80', title: 'Hazır beton istehsalı' },
  { src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', title: 'Beton nasoslama' },
  { src: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80', title: 'Tikinti sahəsi' },
  { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80', title: 'İnfrastruktur layihəsi' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80', title: 'Sənaye tikintisi' },
  { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80', title: 'Monolit konstruksiya' },
  { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80', title: 'Mühəndis komandası' },
  { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80', title: 'Tamamlanmış obyekt' },
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
