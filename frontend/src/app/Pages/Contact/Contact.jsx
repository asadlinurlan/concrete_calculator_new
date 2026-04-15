import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = ({ fullPage }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });

  const icons = {
    location: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    email: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    )
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mesajınız göndərildi!');
    setFormData({ fullName: '', email: '', phone: '', message: '' });
  };

  return (
    <section className={`contact-section ${fullPage ? 'full-page' : ''}`}>
      {fullPage && (
        <div className="page-hero-contact">
          <div className="page-hero-overlay"></div>
          <div className="hero-content-center">
            <h1 className="page-title-center">Contact</h1>
          </div>
        </div>
      )}
      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-side">
              <h2 className="contact-main-title">Bizimlə Əlaqə</h2>
              <p className="contact-description">
                Layihəniz haqqında bizimlə danışın. Peşəkar komandamız sizə ən yaxşı 
                beton həllərini təqdim etmək üçün hazırdır.
              </p>
              
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="info-icon">{icons.location}</div>
                  <div className="info-content">
                    <h4>Ünvan</h4>
                    <p>Novxanı, Bakı, Azərbaycan</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="info-icon">{icons.phone}</div>
                  <div className="info-content">
                    <h4>Telefon</h4>
                    <p>+994 50 123 45 67</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="info-icon">{icons.email}</div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>info@novkhanibeton.az</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="info-icon">{icons.clock}</div>
                  <div className="info-content">
                    <h4>İş Saatları</h4>
                    <p>Bazar ertəsi - Şənbə: 08:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" id="fullName" name="fullName" placeholder="Ad Soyad" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <input type="tel" id="phone" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <textarea id="message" name="message" placeholder="Mesajınız" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn-submit">Göndər</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;