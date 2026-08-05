import React from 'react';
import { useT, LocaleLink } from '../../../i18n/i18n';
import './Footer.css';

const Footer = () => {
  const t = useT();
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
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    )
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <LocaleLink to="/" className="footer-logo">
                <img src="/NOVKHANI.svg" alt="Novxani Beton" className="footer-logo-svg" />
              </LocaleLink>
              <p className="footer-description">
                {t({
                  az: 'Yüksək keyfiyyətli beton həlləri ilə yaşayış, kommersiya və sənaye layihələri üçün etibarlı tərəfdaşınız. 2018-ci ildən bəri möhkəm təməllər qururuq.',
                  en: 'Your reliable partner for residential, commercial and industrial projects with high-quality concrete solutions. Building solid foundations since 2018.',
                  ru: 'Ваш надежный партнер по жилым, коммерческим и промышленным проектам с высококачественными бетонными решениями. Строим прочный фундамент с 2018 года.',
                })}
              </p>
              <div className="footer-social">
                <a href="https://www.instagram.com/novxanibeton/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">{icons.instagram}</a>
                <a href="https://www.tiktok.com/@novxanibeton" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TikTok">{icons.tiktok}</a>
              </div>
            </div>
            <div className="footer-links">
              <h3>{t({ az: 'Keçidlər', en: 'Links', ru: 'Ссылки' })}</h3>
              <ul>
                <li><LocaleLink to="/">{t({ az: 'Ana Səhifə', en: 'Home', ru: 'Главная' })}</LocaleLink></li>
                <li><LocaleLink to="/products">{t({ az: 'Məhsullar', en: 'Products', ru: 'Продукция' })}</LocaleLink></li>
                <li><LocaleLink to="/services">{t({ az: 'Xidmətlər', en: 'Services', ru: 'Услуги' })}</LocaleLink></li>
                <li><LocaleLink to="/tikinti-materiallari">{t({ az: 'Tikinti Materialları', en: 'Building Materials', ru: 'Стройматериалы' })}</LocaleLink></li>
                <li><LocaleLink to="/calculator">{t({ az: 'Kalkulyator', en: 'Calculator', ru: 'Калькулятор' })}</LocaleLink></li>
                <li><LocaleLink to="/betonun-istifade-saheleri">{t({ az: 'İstifadə Sahələri', en: 'Applications', ru: 'Области применения' })}</LocaleLink></li>
                <li><LocaleLink to="/faq">{t({ az: 'Tez-tez Verilən Suallar', en: 'FAQ', ru: 'Частые вопросы' })}</LocaleLink></li>
                <li><LocaleLink to="/about">{t({ az: 'Haqqımızda', en: 'About Us', ru: 'О нас' })}</LocaleLink></li>
                <li><LocaleLink to="/contact">{t({ az: 'Əlaqə', en: 'Contact', ru: 'Контакты' })}</LocaleLink></li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>{t({ az: 'Xidmətlər', en: 'Services', ru: 'Услуги' })}</h3>
              <ul>
                <li><LocaleLink to="/hazir-beton-satisi">{t({ az: 'Hazır Beton Satışı', en: 'Ready-Mix Concrete Sales', ru: 'Продажа товарного бетона' })}</LocaleLink></li>
                <li><LocaleLink to="/beton-catdirilmasi">{t({ az: 'Beton Çatdırılması', en: 'Concrete Delivery', ru: 'Доставка бетона' })}</LocaleLink></li>
                <li><LocaleLink to="/beton-nasoslama">{t({ az: 'Beton Nasoslama', en: 'Concrete Pumping', ru: 'Услуги бетононасоса' })}</LocaleLink></li>
                <li><LocaleLink to="/terezi-xidmeti">{t({ az: 'Tərəzi Xidməti', en: 'Weighbridge Service', ru: 'Автомобильные весы' })}</LocaleLink></li>
                <li><LocaleLink to="/beton-qiymetleri">{t({ az: 'Beton Qiymətləri', en: 'Concrete Prices', ru: 'Цены на бетон' })}</LocaleLink></li>
                <li><LocaleLink to="/beton-laboratoriyasi">{t({ az: 'Beton Laboratoriyası', en: 'Concrete Laboratory', ru: 'Бетонная лаборатория' })}</LocaleLink></li>
                <li><LocaleLink to="/topdan-beton-satisi">{t({ az: 'Topdan Beton Satışı', en: 'Wholesale Concrete Sales', ru: 'Оптовая продажа бетона' })}</LocaleLink></li>
                <li><LocaleLink to="/tikinti-materiallari">{t({ az: 'Qum, Atsep və Şeben Satışı', en: 'Sand, Gravel Mix and Crushed Stone', ru: 'Песок, ПГС и щебень' })}</LocaleLink></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>{t({ az: 'Əlaqə', en: 'Contact', ru: 'Контакты' })}</h3>
              <ul>
                <li>
                  <span className="contact-icon">{icons.location}</span>
                  <span>{t({ az: 'Novxanı, Bakı, Azərbaycan', en: 'Novkhani, Baku, Azerbaijan', ru: 'Новханы, Баку, Азербайджан' })}</span>
                </li>
                <li>
                  <span className="contact-icon">{icons.phone}</span>
                  <span>+994 50 326 03 43</span>
                </li>
                <li>
                  <span className="contact-icon">{icons.email}</span>
                  <span>info@novxanibeton.az</span>
                </li>
                <li>
                  <span className="contact-icon">{icons.clock}</span>
                  <span>{t({ az: 'B.e - B 7/24 fəaliyyətdəyik', en: 'Mon–Sun — open 24/7', ru: 'Пн–Вс — работаем 24/7' })}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>{t({
            az: '© 2026 Novxanı Beton. Bütün hüquqlar qorunur.',
            en: '© 2026 Novxani Beton. All rights reserved.',
            ru: '© 2026 Novxani Beton. Все права защищены.',
          })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;