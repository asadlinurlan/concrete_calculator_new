import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { MATERIALS } from '../../../data/materials';

// Web3Forms — same access key as the main contact form.
const WEB3FORMS_ACCESS_KEY = 'e1ffd016-dd39-419f-aa5c-382ee00c412d';

const CUSTOMER_TYPES = ['Fiziki şəxs', 'Şirkət', 'Beton zavodu'];
const UNITS = ['ton', 'm³', 'maşın (yük)'];

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

  const setField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const toggleProduct = (id) => {
    setProducts((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    setErrors((er) => ({ ...er, products: undefined }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const validate = () => {
    const er = {};
    if (!form.fullName.trim()) er.fullName = 'Ad və soyadınızı yazın';
    if (!form.phone.trim()) {
      er.phone = 'Telefon nömrənizi yazın';
    } else if (!/^[+()\d\s-]{9,20}$/.test(form.phone.trim())) {
      er.phone = 'Telefon nömrəsini düzgün formatda yazın';
    }
    if (!form.customerType) er.customerType = 'Müştəri növünü seçin';
    if (products.length === 0) er.products = 'Ən azı bir məhsul seçin';
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
      const productNames = products
        .map((id) => MATERIALS.find((m) => m.id === id)?.name)
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
        setForm(INITIAL);
        setProducts([]);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
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
          <label htmlFor="mqf-fullName">Ad və soyad *</label>
          <input
            type="text"
            id="mqf-fullName"
            name="fullName"
            autoComplete="name"
            placeholder="Məs.: Elvin Məmmədov"
            value={form.fullName}
            onChange={setField}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'mqf-fullName-err' : undefined}
            required
          />
          {errors.fullName && <span className="mqf-err" id="mqf-fullName-err" role="alert">{errors.fullName}</span>}
        </div>
        <div className="mqf-group">
          <label htmlFor="mqf-phone">Telefon nömrəsi *</label>
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
          <label htmlFor="mqf-customerType">Müştəri növü *</label>
          <select
            id="mqf-customerType"
            name="customerType"
            value={form.customerType}
            onChange={setField}
            aria-invalid={!!errors.customerType}
            aria-describedby={errors.customerType ? 'mqf-customerType-err' : undefined}
            required
          >
            <option value="" disabled>Seçin…</option>
            {CUSTOMER_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.customerType && (
            <span className="mqf-err" id="mqf-customerType-err" role="alert">{errors.customerType}</span>
          )}
        </div>
        <div className="mqf-group">
          <span className="mqf-label" id="mqf-products-label">Məhsul * <small>(bir neçəsini seçmək olar)</small></span>
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
                {m.name}
              </label>
            ))}
          </div>
          {errors.products && <span className="mqf-err" id="mqf-products-err" role="alert">{errors.products}</span>}
        </div>
      </div>

      <div className="mqf-row">
        <div className="mqf-group">
          <label htmlFor="mqf-volume">Təxmini həcm</label>
          <input
            type="number"
            id="mqf-volume"
            name="volume"
            min="0"
            step="any"
            inputMode="decimal"
            placeholder="Məs.: 20"
            value={form.volume}
            onChange={setField}
          />
        </div>
        <div className="mqf-group">
          <label htmlFor="mqf-unit">Ölçü vahidi</label>
          <select id="mqf-unit" name="unit" value={form.unit} onChange={setField}>
            {UNITS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mqf-row">
        <div className="mqf-group">
          <label htmlFor="mqf-address">Çatdırılma ünvanı</label>
          <input
            type="text"
            id="mqf-address"
            name="address"
            autoComplete="street-address"
            placeholder="Rayon / qəsəbə / obyekt ünvanı"
            value={form.address}
            onChange={setField}
          />
        </div>
        <div className="mqf-group">
          <span className="mqf-label" id="mqf-delivery-label">Çatdırılma tələb olunur?</span>
          <div className="mqf-checks" role="radiogroup" aria-labelledby="mqf-delivery-label">
            {['Bəli', 'Xeyr'].map((v) => (
              <label key={v} className={`mqf-check ${form.delivery === v ? 'checked' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  value={v}
                  checked={form.delivery === v}
                  onChange={setField}
                />
                {v}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mqf-group">
        <label htmlFor="mqf-note">Əlavə qeyd</label>
        <textarea
          id="mqf-note"
          name="note"
          rows="3"
          placeholder="Layihəniz və ya sifarişinizlə bağlı əlavə məlumat"
          value={form.note}
          onChange={setField}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-accent btn-lg mqf-submit" disabled={status === 'sending'}>
        <Send size={18} aria-hidden="true" />
        {status === 'sending' ? 'Göndərilir…' : 'Qiymət təklifi al'}
      </button>

      {status === 'sent' && (
        <div className="mqf-success" role="status">
          <CheckCircle2 size={22} aria-hidden="true" />
          <div>
            <strong>Sorğunuz qəbul olundu!</strong>
            <span>
              Komandamız həcmə və ünvana uyğun qiymət təklifini hazırlayıb ən qısa zamanda sizinlə
              əlaqə saxlayacaq. Təcili sifariş üçün birbaşa zəng edə bilərsiniz:{' '}
              <a href="tel:+994506209584">+994 50 620 95 84</a>
            </span>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="mqf-error" role="alert">
          Sorğu göndərilmədi. Zəhmət olmasa yenidən cəhd edin və ya birbaşa{' '}
          <a href="tel:+994506209584">+994 50 620 95 84</a> nömrəsi ilə əlaqə saxlayın.
        </div>
      )}
    </form>
  );
};

export default MaterialQuoteForm;
