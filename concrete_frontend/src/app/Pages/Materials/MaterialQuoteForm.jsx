import React, { useState, useRef } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { MATERIALS } from '../../../data/materials';
import { trackEvent } from '../../../lib/analytics';
import { useT } from '../../../i18n/i18n';

// Web3Forms — same access key as the main contact form.
const WEB3FORMS_ACCESS_KEY = 'e1ffd016-dd39-419f-aa5c-382ee00c412d';

// The `az` string is the canonical form value (kept in state and sent in
// the email), the visible <option> text is localized via t().
const CUSTOMER_TYPES = [
  { az: 'Fiziki şəxs', en: 'Individual', ru: 'Частное лицо' },
  { az: 'Şirkət', en: 'Company', ru: 'Компания' },
  { az: 'Beton zavodu', en: 'Concrete plant', ru: 'Бетонный завод' },
];
const UNITS = [
  { az: 'ton', en: 't', ru: 'т' },
  { az: 'm³', en: 'm³', ru: 'м³' },
  { az: 'maşın (yük)', en: 'truckload', ru: 'машина (рейс)' },
];
const DELIVERY_OPTIONS = [
  { az: 'Bəli', en: 'Yes', ru: 'Да' },
  { az: 'Xeyr', en: 'No', ru: 'Нет' },
];

const INITIAL = {
  fullName: '',
  phone: '',
  customerType: '',
  volume: '',
  unit: 'ton',
  address: '',
  delivery: 'Bəli',
  note: '',
};

/**
 * Conversion-focused quote request form for construction materials
 * (qum / atsep / şeben). Client-side validation + honeypot, sends
 * through Web3Forms like the main contact form, with full
 * loading / success / error states.
 */
const MaterialQuoteForm = () => {
  const [form, setForm] = useState(INITIAL);
  const [products, setProducts] = useState([]); // material ids
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [botField, setBotField] = useState(''); // honeypot
  const startedRef = useRef(false); // analytics: fire form_start only once
  const t = useT();

  const trackStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('quote_form_start', { page_path: window.location.pathname, form_name: 'material_quote' });
  };

  const setField = (e) => {
    trackStart();
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const toggleProduct = (id) => {
    trackStart();
    setProducts((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    setErrors((er) => ({ ...er, products: undefined }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const validate = () => {
    const er = {};
    if (!form.fullName.trim()) er.fullName = t({ az: 'Ad və soyadınızı yazın', en: 'Enter your full name', ru: 'Укажите имя и фамилию' });
    if (!form.phone.trim()) {
      er.phone = t({ az: 'Telefon nömrənizi yazın', en: 'Enter your phone number', ru: 'Укажите номер телефона' });
    } else if (!/^[+()\d\s-]{9,20}$/.test(form.phone.trim())) {
      er.phone = t({ az: 'Telefon nömrəsini düzgün formatda yazın', en: 'Enter the phone number in a valid format', ru: 'Укажите номер телефона в правильном формате' });
    }
    if (!form.customerType) er.customerType = t({ az: 'Müştəri növünü seçin', en: 'Select your customer type', ru: 'Выберите тип клиента' });
    if (products.length === 0) er.products = t({ az: 'Ən azı bir məhsul seçin', en: 'Select at least one product', ru: 'Выберите хотя бы один продукт' });
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (botField) return; // spam bot filled the hidden field — silently drop
    const er = validate();
    if (Object.keys(er).length > 0) {
      setErrors(er);
      // Move focus to the first invalid field for keyboard/AT users
      const first = Object.keys(er)[0];
      const el = document.getElementById(first === 'products' ? 'mqf-product-qum' : `mqf-${first}`);
      if (el) el.focus();
      return;
    }

    setStatus('sending');
    try {
      // Canonical AZ names — keeps the notification email and analytics
      // params consistent regardless of the visitor's locale.
      const productNames = products
        .map((id) => MATERIALS.find((m) => m.id === id)?.name?.az)
        .filter(Boolean)
        .join(', ');

      // FormData (not JSON) → CORS "simple request", no preflight —
      // same officially supported Web3Forms method as the contact form.
      const fd = new FormData();
      fd.append('access_key', WEB3FORMS_ACCESS_KEY);
      fd.append('subject', 'Yeni material sifarişi (qum/atsep/şeben) — novxanibeton.az');
      fd.append('from_name', 'Novxanı Beton sayt — Tikinti materialları');
      fd.append('name', form.fullName);
      fd.append('phone', form.phone);
      fd.append('Müştəri növü', form.customerType);
      fd.append('Məhsul', productNames);
      fd.append('Təxmini həcm', form.volume ? `${form.volume} ${form.unit}` : 'Qeyd olunmayıb');
      fd.append('Çatdırılma ünvanı', form.address || 'Qeyd olunmayıb');
      fd.append('Çatdırılma tələb olunur', form.delivery);
      fd.append('Əlavə qeyd', form.note || '—');

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        trackEvent('quote_request', {
          page_path: window.location.pathname,
          form_name: 'material_quote',
          products: productNames,
          customer_type: form.customerType,
        });
        setForm(INITIAL);
        setProducts([]);
      } else {
        setStatus('error');
        trackEvent('quote_form_error', { page_path: window.location.pathname, form_name: 'material_quote' });
      }
    } catch {
      setStatus('error');
      trackEvent('quote_form_error', { page_path: window.location.pathname, form_name: 'material_quote' });
    }
  };

  return (
    <form className="mqf-form" onSubmit={handleSubmit} noValidate>
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

      <div className="mqf-row">
        <div className="mqf-group">
          <label htmlFor="mqf-fullName">{t({ az: 'Ad və soyad', en: 'Full name', ru: 'Имя и фамилия' })} *</label>
          <input
            type="text"
            id="mqf-fullName"
            name="fullName"
            autoComplete="name"
            placeholder={t({ az: 'Məs.: Elvin Məmmədov', en: 'E.g. Elvin Mammadov', ru: 'Напр.: Эльвин Мамедов' })}
            value={form.fullName}
            onChange={setField}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'mqf-fullName-err' : undefined}
            required
          />
          {errors.fullName && <span className="mqf-err" id="mqf-fullName-err" role="alert">{errors.fullName}</span>}
        </div>
        <div className="mqf-group">
          <label htmlFor="mqf-phone">{t({ az: 'Telefon nömrəsi', en: 'Phone number', ru: 'Номер телефона' })} *</label>
          <input
            type="tel"
            id="mqf-phone"
            name="phone"
            autoComplete="tel"
            placeholder="+994 XX XXX XX XX"
            value={form.phone}
            onChange={setField}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'mqf-phone-err' : undefined}
            required
          />
          {errors.phone && <span className="mqf-err" id="mqf-phone-err" role="alert">{errors.phone}</span>}
        </div>
      </div>

      <div className="mqf-row">
        <div className="mqf-group">
          <label htmlFor="mqf-customerType">{t({ az: 'Müştəri növü', en: 'Customer type', ru: 'Тип клиента' })} *</label>
          <select
            id="mqf-customerType"
            name="customerType"
            value={form.customerType}
            onChange={setField}
            aria-invalid={!!errors.customerType}
            aria-describedby={errors.customerType ? 'mqf-customerType-err' : undefined}
            required
          >
            <option value="" disabled>{t({ az: 'Seçin…', en: 'Select…', ru: 'Выберите…' })}</option>
            {CUSTOMER_TYPES.map((opt) => (
              <option key={opt.az} value={opt.az}>{t(opt)}</option>
            ))}
          </select>
          {errors.customerType && (
            <span className="mqf-err" id="mqf-customerType-err" role="alert">{errors.customerType}</span>
          )}
        </div>
        <div className="mqf-group">
          <span className="mqf-label" id="mqf-products-label">{t({ az: 'Məhsul', en: 'Product', ru: 'Продукт' })} * <small>({t({ az: 'bir neçəsini seçmək olar', en: 'you can select several', ru: 'можно выбрать несколько' })})</small></span>
          <div
            className="mqf-checks"
            role="group"
            aria-labelledby="mqf-products-label"
            aria-describedby={errors.products ? 'mqf-products-err' : undefined}
          >
            {MATERIALS.map((m) => (
              <label key={m.id} className={`mqf-check ${products.includes(m.id) ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  id={`mqf-product-${m.id}`}
                  checked={products.includes(m.id)}
                  onChange={() => toggleProduct(m.id)}
                />
                {t(m.name)}
              </label>
            ))}
          </div>
          {errors.products && <span className="mqf-err" id="mqf-products-err" role="alert">{errors.products}</span>}
        </div>
      </div>

      <div className="mqf-row">
        <div className="mqf-group">
          <label htmlFor="mqf-volume">{t({ az: 'Təxmini həcm', en: 'Approximate volume', ru: 'Примерный объём' })}</label>
          <input
            type="number"
            id="mqf-volume"
            name="volume"
            min="0"
            step="any"
            inputMode="decimal"
            placeholder={t({ az: 'Məs.: 20', en: 'E.g. 20', ru: 'Напр.: 20' })}
            value={form.volume}
            onChange={setField}
          />
        </div>
        <div className="mqf-group">
          <label htmlFor="mqf-unit">{t({ az: 'Ölçü vahidi', en: 'Unit', ru: 'Единица измерения' })}</label>
          <select id="mqf-unit" name="unit" value={form.unit} onChange={setField}>
            {UNITS.map((u) => (
              <option key={u.az} value={u.az}>{t(u)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mqf-row">
        <div className="mqf-group">
          <label htmlFor="mqf-address">{t({ az: 'Çatdırılma ünvanı', en: 'Delivery address', ru: 'Адрес доставки' })}</label>
          <input
            type="text"
            id="mqf-address"
            name="address"
            autoComplete="street-address"
            placeholder={t({ az: 'Rayon / qəsəbə / obyekt ünvanı', en: 'District / settlement / site address', ru: 'Район / посёлок / адрес объекта' })}
            value={form.address}
            onChange={setField}
          />
        </div>
        <div className="mqf-group">
          <span className="mqf-label" id="mqf-delivery-label">{t({ az: 'Çatdırılma tələb olunur?', en: 'Is delivery required?', ru: 'Нужна ли доставка?' })}</span>
          <div className="mqf-checks" role="radiogroup" aria-labelledby="mqf-delivery-label">
            {DELIVERY_OPTIONS.map((opt) => (
              <label key={opt.az} className={`mqf-check ${form.delivery === opt.az ? 'checked' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  value={opt.az}
                  checked={form.delivery === opt.az}
                  onChange={setField}
                />
                {t(opt)}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mqf-group">
        <label htmlFor="mqf-note">{t({ az: 'Əlavə qeyd', en: 'Additional note', ru: 'Дополнительный комментарий' })}</label>
        <textarea
          id="mqf-note"
          name="note"
          rows="3"
          placeholder={t({ az: 'Layihəniz və ya sifarişinizlə bağlı əlavə məlumat', en: 'Additional details about your project or order', ru: 'Дополнительная информация о вашем проекте или заказе' })}
          value={form.note}
          onChange={setField}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-accent btn-lg mqf-submit" disabled={status === 'sending'}>
        <Send size={18} aria-hidden="true" />
        {status === 'sending'
          ? t({ az: 'Göndərilir…', en: 'Sending…', ru: 'Отправка…' })
          : t({ az: 'Qiymət təklifi al', en: 'Request a Quote', ru: 'Получить предложение' })}
      </button>

      {status === 'sent' && (
        <div className="mqf-success" role="status">
          <CheckCircle2 size={22} aria-hidden="true" />
          <div>
            <strong>{t({ az: 'Sorğunuz qəbul olundu!', en: 'Your request has been received!', ru: 'Ваша заявка принята!' })}</strong>
            <span>
              {t({
                az: 'Komandamız həcmə və ünvana uyğun qiymət təklifini hazırlayıb ən qısa zamanda sizinlə əlaqə saxlayacaq. Təcili sifariş üçün birbaşa zəng edə bilərsiniz:',
                en: 'Our team will prepare a quote based on the volume and address and contact you as soon as possible. For urgent orders you can call us directly:',
                ru: 'Наша команда подготовит ценовое предложение с учётом объёма и адреса и свяжется с вами в ближайшее время. Для срочного заказа можно позвонить напрямую:',
              })}{' '}
              <a href="tel:+994506209584">+994 50 326 03 43</a>
            </span>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="mqf-error" role="alert">
          {t({
            az: 'Sorğu göndərilmədi. Zəhmət olmasa yenidən cəhd edin və ya birbaşa',
            en: 'The request could not be sent. Please try again or call us directly at',
            ru: 'Заявка не отправлена. Пожалуйста, попробуйте ещё раз или позвоните напрямую по номеру',
          })}{' '}
          <a href="tel:+994506209584">+994 50 326 03 43</a>
          {t({ az: ' nömrəsi ilə əlaqə saxlayın.', en: '.', ru: '.' })}
        </div>
      )}
    </form>
  );
};

export default MaterialQuoteForm;
