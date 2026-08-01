import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { trackEvent } from '../../../lib/analytics';
import { useLocale, useT } from '../../../i18n/i18n';
import './Contact.css';

// Web3Forms access key — get a free one in ~1 min at https://web3forms.com
// (enter info@novxanibeton.az, the key is emailed instantly). Paste it below.
const WEB3FORMS_ACCESS_KEY = 'e1ffd016-dd39-419f-aa5c-382ee00c412d';

// Google Ads conversion tracking distinguishes the localized forms.
const FORM_NAMES = { az: 'contact', en: 'english_quote_form', ru: 'russian_quote_form' };

const TXT = {
  pageTitle: { az: 'Əlaqə', en: 'Contact', ru: 'Контакты' },
  mainTitle: { az: 'Bizimlə Əlaqə', en: 'Contact Us', ru: 'Свяжитесь с нами' },
  description: {
    az: 'Layihəniz haqqında bizimlə danışın. Peşəkar komandamız sizə ən yaxşı beton həllərini təqdim etmək üçün hazırdır.',
    en: 'Tell us about your project. Our professional team is ready to provide you with the best concrete solutions.',
    ru: 'Расскажите нам о вашем проекте. Наша профессиональная команда готова предложить вам лучшие бетонные решения.',
  },
  address: { az: 'Ünvan', en: 'Address', ru: 'Адрес' },
  addressValue: { az: 'Novxanı, Bakı, Azərbaycan', en: 'Novkhani, Baku, Azerbaijan', ru: 'Новханы, Баку, Азербайджан' },
  phone: { az: 'Telefon', en: 'Phone', ru: 'Телефон' },
  email: { az: 'Email', en: 'Email', ru: 'Email' },
  hours: { az: 'İş Saatları', en: 'Working Hours', ru: 'Часы работы' },
  hoursValue: { az: 'B.e - B 7/24 fəaliyyətdəyik', en: 'Mon–Sun — open 24/7', ru: 'Пн–Вс — работаем 24/7' },
  mapTitle: { az: 'Novxanı Beton zavodu xəritədə', en: 'Novxani Beton plant on the map', ru: 'Завод Novxani Beton на карте' },
  formTitle: { az: 'Mesaj göndərin', en: 'Send a Message', ru: 'Отправить сообщение' },
  formNote: {
    az: 'Məlumatları doldurun — komandamız ən qısa zamanda sizinlə əlaqə saxlayacaq. Sorğu pulsuzdur və heç bir öhdəlik yaratmır.',
    en: 'Fill in the details — our team will get back to you as soon as possible. The request is free and non-binding.',
    ru: 'Заполните данные — наша команда свяжется с вами в ближайшее время. Запрос бесплатный и ни к чему не обязывает.',
  },
  lblName: { az: 'Ad və soyad', en: 'Full name', ru: 'Имя и фамилия' },
  lblPhone: { az: 'Telefon nömrəsi', en: 'Phone number', ru: 'Номер телефона' },
  lblEmail: { az: 'Email', en: 'Email', ru: 'Email' },
  lblMessage: { az: 'Mesajınız', en: 'Your message', ru: 'Ваше сообщение' },
  phName: { az: 'Məs.: Elvin Məmmədov', en: 'e.g. John Smith', ru: 'напр., Эльвин Мамедов' },
  phPhone: { az: '+994 XX XXX XX XX', en: '+994 XX XXX XX XX', ru: '+994 XX XXX XX XX' },
  phEmail: { az: 'ornek@gmail.com', en: 'example@gmail.com', ru: 'example@gmail.com' },
  phMessage: {
    az: 'Layihəniz və ya sifarişinizlə bağlı məlumat yazın',
    en: 'Write details about your project or order',
    ru: 'Напишите информацию о вашем проекте или заказе',
  },
  errName: { az: 'Ad və soyadınızı yazın', en: 'Please enter your full name', ru: 'Укажите имя и фамилию' },
  errPhone: { az: 'Telefon nömrənizi yazın', en: 'Please enter your phone number', ru: 'Укажите номер телефона' },
  errPhoneFormat: {
    az: 'Telefon nömrəsini düzgün formatda yazın',
    en: 'Please enter a valid phone number',
    ru: 'Укажите корректный номер телефона',
  },
  errEmail: { az: 'Email ünvanınızı yazın', en: 'Please enter your email address', ru: 'Укажите адрес электронной почты' },
  errEmailFormat: {
    az: 'Email ünvanını düzgün formatda yazın',
    en: 'Please enter a valid email address',
    ru: 'Укажите корректный адрес электронной почты',
  },
  errMessage: { az: 'Mesajınızı yazın', en: 'Please write your message', ru: 'Напишите ваше сообщение' },
  submit: { az: 'Göndər', en: 'Send', ru: 'Отправить' },
  sending: { az: 'Göndərilir…', en: 'Sending…', ru: 'Отправка…' },
  successTitle: {
    az: 'Təşəkkürlər, mesajınız göndərildi!',
    en: 'Thank you, your message has been sent!',
    ru: 'Спасибо, ваше сообщение отправлено!',
  },
  successText: {
    az: 'Komandamız ən qısa zamanda (adətən iş günü ərzində) sizinlə əlaqə saxlayacaq. Təcili haldırsa, birbaşa yaza və ya zəng edə bilərsiniz:',
    en: 'Our team will contact you shortly (usually within one business day). If it is urgent, you can message or call us directly:',
    ru: 'Наша команда свяжется с вами в ближайшее время (обычно в течение рабочего дня). Если срочно, вы можете написать или позвонить нам напрямую:',
  },
  successCall: { az: 'Zəng et', en: 'Call', ru: 'Позвонить' },
  errorMsg: {
    az: 'Mesaj göndərilmədi. Zəhmət olmasa yenidən cəhd edin və ya birbaşa +994 50 326 03 43 ilə əlaqə saxlayın.',
    en: 'The message could not be sent. Please try again or contact us directly at +994 50 326 03 43.',
    ru: 'Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую: +994 50 326 03 43.',
  },
  waText: {
    az: 'Salam! Qiymət təklifi almaq istəyirəm.',
    en: 'Hello! I would like to request a quote.',
    ru: 'Здравствуйте! Хочу получить предложение.',
  },
  mapHl: { az: 'az', en: 'en', ru: 'ru' },
};

const Contact = ({ fullPage }) => {
  const locale = useLocale();
  const t = useT();
  const formName = FORM_NAMES[locale] || 'contact';

  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [botField, setBotField] = useState(''); // honeypot — real users leave it empty
  const startedRef = useRef(false); // analytics: fire form_start only once

  const handleChange = (e) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('contact_form_start', { page_path: window.location.pathname, form_name: formName });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  // Essential fields are required: name, phone, email and message
  const validate = () => {
    const er = {};
    if (!formData.fullName.trim()) er.fullName = t(TXT.errName);
    if (!formData.phone.trim()) {
      er.phone = t(TXT.errPhone);
    } else if (!/^[+()\d\s-]{9,20}$/.test(formData.phone.trim())) {
      er.phone = t(TXT.errPhoneFormat);
    }
    if (!formData.email.trim()) {
      er.email = t(TXT.errEmail);
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      er.email = t(TXT.errEmailFormat);
    }
    if (!formData.message.trim()) er.message = t(TXT.errMessage);
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return; // guard against double submission
    if (botField) return; // spam bot filled the hidden field — silently drop
    const er = validate();
    if (Object.keys(er).length > 0) {
      setErrors(er);
      const el = document.getElementById(Object.keys(er)[0]);
      if (el) el.focus();
      return;
    }
    setStatus('sending');
    try {
      // FormData (not JSON) → a CORS "simple request", so no preflight — this
      // is Web3Forms' officially supported method and avoids the 403/CORS block.
      const fd = new FormData();
      fd.append('access_key', WEB3FORMS_ACCESS_KEY);
      fd.append('subject', 'Yeni əlaqə mesajı — novxanibeton.az');
      fd.append('from_name', 'Novxanı Beton sayt');
      fd.append('form_name', formName);
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
        trackEvent('contact_form_submit', { page_path: window.location.pathname, form_name: formName });
      } else {
        setStatus('error');
        trackEvent('contact_form_error', { page_path: window.location.pathname, form_name: formName });
      }
    } catch {
      setStatus('error');
      trackEvent('contact_form_error', { page_path: window.location.pathname, form_name: formName });
    }
  };

  const contactItems = [
    { Icon: MapPin, title: t(TXT.address), value: t(TXT.addressValue), href: 'https://maps.app.goo.gl/uKEuWDVuWqoAccEZA' },
    { Icon: Phone, title: t(TXT.phone), value: '+994 50 326 03 43', href: 'tel:+994506209584' },
    { Icon: Mail, title: t(TXT.email), value: 'info@novxanibeton.az', href: 'mailto:info@novxanibeton.az' },
    { Icon: Clock, title: t(TXT.hours), value: t(TXT.hoursValue) },
  ];

  return (
    <section className={`contact-section ${fullPage ? 'full-page' : ''}`}>
      {fullPage && <Seo page="contact" />}
      {fullPage && (
        <div className="page-hero-contact">
          <div className="page-hero-overlay"></div>
          <div className="hero-content-center">
            <h1 className="page-title-center">{t(TXT.pageTitle)}</h1>
          </div>
        </div>
      )}
      <div className="contact-content">
        <div className="container">
          {fullPage && <Breadcrumbs current={TXT.pageTitle} />}
          <div className="contact-grid">
            <div className="contact-info-side reveal">
              <h2 className="contact-main-title">{t(TXT.mainTitle)}</h2>
              <p className="contact-description">{t(TXT.description)}</p>

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
                  title={t(TXT.mapTitle)}
                  src={`https://www.google.com/maps?q=40.4858529,49.8294278&z=16&hl=${t(TXT.mapHl)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="contact-form-container reveal">
              <div className="contact-form-head">
                <h3>{t(TXT.formTitle)}</h3>
                <p>{t(TXT.formNote)}</p>
              </div>
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
                    <label htmlFor="fullName">{t(TXT.lblName)} *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      placeholder={t(TXT.phName)}
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-err' : undefined}
                      required
                    />
                    {errors.fullName && <span className="form-err" id="fullName-err" role="alert">{errors.fullName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t(TXT.lblPhone)} *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      placeholder={t(TXT.phPhone)}
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-err' : undefined}
                      required
                    />
                    {errors.phone && <span className="form-err" id="phone-err" role="alert">{errors.phone}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t(TXT.lblEmail)} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t(TXT.phEmail)}
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-err' : undefined}
                    required
                  />
                  {errors.email && <span className="form-err" id="email-err" role="alert">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t(TXT.lblMessage)} *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t(TXT.phMessage)}
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-err' : undefined}
                    required
                  ></textarea>
                  {errors.message && <span className="form-err" id="message-err" role="alert">{errors.message}</span>}
                </div>
                <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? t(TXT.sending) : t(TXT.submit)}
                </button>
                {status === 'sent' && (
                  <div className="form-success" role="status">
                    <CheckCircle2 size={22} aria-hidden="true" />
                    <div className="form-success-body">
                      <strong>{t(TXT.successTitle)}</strong>
                      <span>{t(TXT.successText)}</span>
                      <div className="form-success-actions">
                        <a
                          href={`https://wa.me/994503260343?text=${encodeURIComponent(t(TXT.waText))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="fs-wa"
                        >
                          <MessageCircle size={15} aria-hidden="true" />
                          WhatsApp
                        </a>
                        <a href="tel:+994506209584" className="fs-call">{t(TXT.successCall)}</a>
                      </div>
                    </div>
                  </div>
                )}
                {status === 'error' && (
                  <div className="form-error" role="alert">
                    {t(TXT.errorMsg)}
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
