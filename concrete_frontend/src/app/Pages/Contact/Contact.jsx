import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import './Contact.css';

// Web3Forms access key — get a free one in ~1 min at https://web3forms.com
// (enter info@novxanibeton.az, the key is emailed instantly). Paste it below.
const WEB3FORMS_ACCESS_KEY = 'e1ffd016-dd39-419f-aa5c-382ee00c412d';

const Contact = ({ fullPage }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [botField, setBotField] = useState(''); // honeypot — real users leave it empty

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (botField) return; // spam bot filled the hidden field — silently drop
    setStatus('sending');
    try {
      // FormData (not JSON) → a CORS "simple request", so no preflight — this
      // is Web3Forms' officially supported method and avoids the 403/CORS block.
      const fd = new FormData();
      fd.append('access_key', WEB3FORMS_ACCESS_KEY);
      fd.append('subject', 'Yeni əlaqə mesajı — novxanibeton.az');
      fd.append('from_name', 'Novxanı Beton sayt');
      fd.append('name', formData.fullName);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone);
      fd.append('message', formData.message);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const contactItems = [
    { Icon: MapPin, title: 'Ünvan', value: 'Novxanı, Bakı, Azərbaycan', href: 'https://maps.app.goo.gl/uKEuWDVuWqoAccEZA' },
    { Icon: Phone, title: 'Telefon', value: '+994 50 620 95 84', href: 'tel:+994506209584' },
    { Icon: Mail, title: 'Email', value: 'info@novxanibeton.az', href: 'mailto:info@novxanibeton.az' },
    { Icon: Clock, title: 'İş Saatları', value: 'B.e - B 7/24 fəaliyyətdəyik' },
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
                {/* Honeypot: hidden from users, bots tend to fill it */}
                <input
                  type="text"
                  name="botcheck"
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  aria-hidden="true"
                />
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
                <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Göndərilir…' : 'Göndər'}
                </button>
                {status === 'sent' && (
                  <div className="form-success" role="status">
                    <CheckCircle2 size={22} aria-hidden="true" />
                    <div className="form-success-body">
                      <strong>Təşəkkürlər, mesajınız göndərildi!</strong>
                      <span>Komandamız ən qısa zamanda (adətən iş günü ərzində) sizinlə əlaqə saxlayacaq. Təcili haldırsa, birbaşa yaza və ya zəng edə bilərsiniz:</span>
                      <div className="form-success-actions">
                        <a
                          href="https://wa.me/994503260343"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="fs-wa"
                        >
                          WhatsApp
                        </a>
                        <a href="tel:+994506209584" className="fs-call">Zəng et</a>
                      </div>
                    </div>
                  </div>
                )}
                {status === 'error' && (
                  <div className="form-error" role="alert">
                    Mesaj göndərilmədi. Zəhmət olmasa yenidən cəhd edin və ya birbaşa +994 50 620 95 84 ilə əlaqə saxlayın.
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
