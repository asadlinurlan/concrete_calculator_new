import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import './Contact.css';

const Contact = ({ fullPage }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (sent) setSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: front-end demo only — wire this to a real endpoint/email service later.
    setSent(true);
    setFormData({ fullName: '', email: '', phone: '', message: '' });
  };

  const contactItems = [
    { Icon: MapPin, title: 'Ünvan', value: 'Novxanı, Bakı, Azərbaycan', href: 'https://maps.app.goo.gl/uKEuWDVuWqoAccEZA' },
    { Icon: Phone, title: 'Telefon', value: '+994 50 620 95 84', href: 'tel:+994506209584' },
    { Icon: Mail, title: 'Email', value: 'info@novkhanibeton.az', href: 'mailto:info@novkhanibeton.az' },
    { Icon: Clock, title: 'İş Saatları', value: 'B.e - Şənbə: 08:00 - 18:00' },
  ];

  return (
    <section className={`contact-section ${fullPage ? 'full-page' : ''}`}>
      {fullPage && (
        <div className="page-hero-contact">
          <div className="page-hero-overlay"></div>
          <div className="hero-content-center">
            <h1 className="page-title-center">Əlaqə</h1>
          </div>
        </div>
      )}
      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-side reveal">
              <h2 className="contact-main-title">Bizimlə Əlaqə</h2>
              <p className="contact-description">
                Layihəniz haqqında bizimlə danışın. Peşəkar komandamız sizə ən yaxşı
                beton həllərini təqdim etmək üçün hazırdır.
              </p>

              <div className="contact-info-list">
                {contactItems.map(({ Icon, title, value, href }) => (
                  <div className="contact-info-item" key={title}>
                    <div className="info-icon" aria-hidden="true"><Icon size={22} /></div>
                    <div className="info-content">
                      <h4>{title}</h4>
                      {href ? (
                        <p>
                          <a
                            href={href}
                            className="info-link"
                            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {value}
                          </a>
                        </p>
                      ) : (
                        <p>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-map">
                <iframe
                  title="Novxanı Beton zavodu xəritədə"
                  src="https://www.google.com/maps?q=40.4858529,49.8294278&z=16&hl=az&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="contact-form-container reveal">
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName" className="sr-only">Ad Soyad</label>
                    <input type="text" id="fullName" name="fullName" placeholder="Ad Soyad" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="sr-only">Telefon</label>
                  <input type="tel" id="phone" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="sr-only">Mesajınız</label>
                  <textarea id="message" name="message" placeholder="Mesajınız" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn-submit">Göndər</button>
                {sent && (
                  <div className="form-success" role="status">
                    <CheckCircle2 size={20} aria-hidden="true" />
                    Mesajınız göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
