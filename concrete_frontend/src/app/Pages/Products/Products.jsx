import React, { useState } from 'react';
import { Gauge, Layers, ArrowRight, Calculator, RotateCcw, CheckCircle2 } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import { CONCRETE_GRADES, materialsPerM3, ratioLabel, hasMixData } from '../../../data/concreteGrades';
import { useT, LocaleLink } from '../../../i18n/i18n';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import Faq from '../../../Components/Faq/Faq';
import './Products.css';

const PRODUCT_FAQS = [
  {
    q: {
      az: 'M və B hərfləri nə deməkdir?',
      en: 'What do the letters M and B mean?',
      ru: 'Что означают буквы M и B?',
    },
    a: {
      az: 'M — betonun möhkəmlik markasıdır (kqq/sm² ilə), B — möhkəmlik sinfidir (MPa ilə). Məsələn, M300 markası B22.5 sinfinə uyğundur və 22.5 MPa möhkəmlik göstəricisinə malikdir. M500–M600 yüksək möhkəmlikli markaları üzrə sinif göstəriciləri layihə tələbinə əsasən dəqiqləşdirilir.',
      en: 'M is the concrete strength grade (in kgf/cm²), B is the strength class (in MPa). For example, grade M300 corresponds to class B22.5 and has a strength of 22.5 MPa. For the high-strength grades M500–M600, the class figures are confirmed according to the project requirements.',
      ru: 'M — марка прочности бетона (в кгс/см²), B — класс прочности (в МПа). Например, марка M300 соответствует классу B22.5 и имеет прочность 22.5 МПа. Для высокопрочных марок M500–M600 показатели класса уточняются согласно требованиям проекта.',
    },
  },
  {
    q: {
      az: 'Layihəm üçün hansı markanı seçməliyəm?',
      en: 'Which grade should I choose for my project?',
      ru: 'Какую марку выбрать для моего проекта?',
    },
    a: {
      az: 'Marka konstruksiyanın yükündən asılıdır: hamarlama və altlıq üçün M100–M150, döşəmə və ümumi işlər üçün M200, zolaq təməl və daşıyıcı divar üçün M250, monolit təməl, plitə və sütunlar üçün M300, çoxmərtəbəli karkas üçün M350 və yuxarı, yüksək yükdaşıma qabiliyyəti tələb olunan sənaye, infrastruktur və xüsusi layihələr üçün isə M500–M600 yüksək möhkəmlikli betonlar. Əmin deyilsinizsə, mütəxəssislərimiz pulsuz məsləhət verir.',
      en: 'The grade depends on the structural load: M100–M150 for levelling and blinding, M200 for floor slabs and general work, M250 for strip foundations and load-bearing walls, M300 for monolithic foundations, slabs and columns, M350 and above for multi-storey frames, and the high-strength grades M500–M600 for industrial, infrastructure and special projects requiring high load-bearing capacity. If you are unsure, our specialists provide free advice.',
      ru: 'Марка зависит от нагрузки на конструкцию: M100–M150 для выравнивания и подбетонки, M200 для полов и общих работ, M250 для ленточного фундамента и несущих стен, M300 для монолитного фундамента, плит и колонн, M350 и выше для многоэтажного каркаса, а высокопрочные марки M500–M600 — для промышленных, инфраструктурных и специальных проектов с высокими требованиями к несущей способности. Если вы не уверены, наши специалисты бесплатно проконсультируют.',
    },
  },
  {
    q: {
      az: 'Betonun keyfiyyətinə necə zəmanət verilir?',
      en: 'How is concrete quality guaranteed?',
      ru: 'Как гарантируется качество бетона?',
    },
    a: {
      az: 'Bütün markalar GOST 26633 tələblərinə uyğun, laboratoriya nəzarəti altında istehsal olunur və 28 günlük möhkəmlik sınağından keçirilir.',
      en: 'All grades are produced under laboratory control in accordance with GOST 26633 and undergo 28-day strength testing.',
      ru: 'Все марки производятся в соответствии с требованиями ГОСТ 26633 под лабораторным контролем и проходят испытание на прочность через 28 суток.',
    },
  },
  {
    q: {
      az: 'Texniki məlumatdakı miqdarlar nə dərəcədə dəqiqdir?',
      en: 'How accurate are the quantities in the technical data?',
      ru: 'Насколько точны количества в технических данных?',
    },
    a: {
      az: 'Kartlardakı sement, qum, çınqıl və su miqdarları nominal qarışıq əsasında təxmini planlaşdırma dəyərləridir. Hər layihənin yekun qarışıq dizaynı laboratoriyada, layihə tələblərinə uyğun təyin olunur.',
      en: 'The cement, sand, gravel and water quantities on the cards are approximate planning values based on a nominal mix. The final mix design for each project is determined in the laboratory according to project requirements.',
      ru: 'Количества цемента, песка, щебня и воды на карточках — приблизительные плановые значения на основе номинальной смеси. Окончательный состав смеси для каждого проекта определяется в лаборатории согласно требованиям проекта.',
    },
  },
];

const MPA = { az: 'MPa', en: 'MPa', ru: 'МПа' };
const TECH_LABEL = { az: 'Texniki məlumat', en: 'Technical data', ru: 'Технические данные' };
const CALC_WITH_GRADE = { az: 'Bu marka ilə hesabla', en: 'Calculate with this grade', ru: 'Рассчитать с этой маркой' };

const Products = () => {
  useScrollReveal();
  const t = useT();
  // Two-sided cards: "Texniki məlumat" flips a card to its technical
  // back face (fixed size — no accordion growth / layout shift).
  // Each card flips independently.
  const [flipped, setFlipped] = useState(() => new Set());
  const toggleFlip = (id) =>
    setFlipped((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className="products-section">
      <Seo page="products" />
      <div className="page-hero-products">
        <div className="page-hero-overlay"></div>
        <div className="hero-content-center">
          <h1 className="page-title-center">
            {t({ az: 'Beton Markaları', en: 'Concrete Grades', ru: 'Марки бетона' })}
          </h1>
          <p className="page-subtitle-center">
            {t({
              az: 'Hər layihə üçün doğru möhkəmlik sinfi',
              en: 'The right strength class for every project',
              ru: 'Правильный класс прочности для каждого проекта',
            })}
          </p>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          <Breadcrumbs current={t({ az: 'Beton Markaları', en: 'Concrete Grades', ru: 'Марки бетона' })} />
          <div className="section-head reveal">
            <span className="section-subtitle">
              {t({ az: 'Məhsul kataloqu', en: 'Product catalogue', ru: 'Каталог продукции' })}
            </span>
            <h2 className="section-title">
              {t({
                az: 'Standart Beton Markalarımız',
                en: 'Our Standard Concrete Grades',
                ru: 'Наши стандартные марки бетона',
              })}
            </h2>
            <p className="products-trust">
              {t({
                az: 'M100–M600 markaları GOST 26633 tələblərinə uyğun istehsal olunur və 28 günlük möhkəmlik sınağından keçirilir.',
                en: 'Grades M100–M600 are produced in accordance with GOST 26633 requirements and undergo 28-day strength testing.',
                ru: 'Марки M100–M600 производятся в соответствии с требованиями ГОСТ 26633 и проходят испытание на прочность через 28 суток.',
              })}
            </p>
          </div>

          <div className="products-grid">
            {CONCRETE_GRADES.map((grade, index) => {
              // High-strength grades (M500–M600) have no confirmed mix data
              // yet — no technical back face, no per-m³ material figures.
              const m = hasMixData(grade) ? materialsPerM3(grade) : null;
              return (
                <article
                  key={grade.id}
                  id={`grade-${grade.id}`}
                  className="product-card reveal"
                  style={{ transitionDelay: `${(index % 4) * 0.07}s` }}
                >
                  <div className={`card-flip ${flipped.has(grade.id) ? 'is-flipped' : ''}`}>
                    {/* ── Front face ──
                        Hidden face uses `inert` (not aria-hidden): it also blocks
                        focus, so the flip button never keeps focus inside a hidden
                        subtree (Chrome blocks aria-hidden around focused nodes).
                        React 18: '' sets the attribute, undefined removes it. */}
                    <div className="card-face card-front" inert={flipped.has(grade.id) ? '' : undefined}>
                      <div className="product-card-head">
                        <div className="product-grade">
                          <span className="grade-id">{grade.id}</span>
                          {grade.bClass && <span className="grade-class">{grade.bClass}</span>}
                        </div>
                        {grade.strength != null && (
                          <div
                            className="product-strength"
                            title={t({ az: 'Möhkəmlik', en: 'Strength', ru: 'Прочность' })}
                          >
                            <Gauge size={18} aria-hidden="true" />
                            {grade.strength} {t(MPA)}
                          </div>
                        )}
                      </div>

                      <h3 className="product-name">{t(grade.name)}</h3>
                      {/* Use areas as a checklist — fills the face without
                          growing it past the technical back face's height */}
                      <ul className="product-uses">
                        {t(grade.use).split(', ').map((u) => (
                          <li key={u}>
                            <CheckCircle2 size={14} aria-hidden="true" />
                            {u.charAt(0).toUpperCase() + u.slice(1)}
                          </li>
                        ))}
                      </ul>
                      <LocaleLink to={`/${grade.id.toLowerCase()}-beton`} className="product-more">
                        {t({
                          az: `${grade.id} beton haqqında ətraflı`,
                          en: `More about ${grade.id} concrete`,
                          ru: `Подробнее о бетоне ${grade.id}`,
                        })}
                        <ArrowRight size={14} aria-hidden="true" />
                      </LocaleLink>

                      {m && (
                        <button type="button" className="flip-btn" onClick={() => toggleFlip(grade.id)}>
                          <Layers size={15} aria-hidden="true" />
                          {t(TECH_LABEL)}
                          <RotateCcw size={14} aria-hidden="true" className="flip-btn-hint" />
                        </button>
                      )}

                      {m ? (
                        <LocaleLink to={`/calculator?grade=${grade.id}`} className="product-cta">
                          <Calculator size={16} aria-hidden="true" />
                          {t(CALC_WITH_GRADE)}
                          <ArrowRight size={16} aria-hidden="true" />
                        </LocaleLink>
                      ) : (
                        <LocaleLink to="/contact" className="product-cta">
                          {t({ az: 'Fərdi təklif alın', en: 'Request a quote', ru: 'Получить предложение' })}
                          <ArrowRight size={16} aria-hidden="true" />
                        </LocaleLink>
                      )}
                    </div>

                    {/* ── Back face (technical data) ── */}
                    {m && (
                    <div className="card-face card-back" inert={flipped.has(grade.id) ? undefined : ''}>
                      <div className="product-card-head">
                        <div className="product-grade">
                          <span className="grade-id">{grade.id}</span>
                          <span className="grade-class">{grade.bClass}</span>
                        </div>
                        <span className="back-face-label">{t(TECH_LABEL)}</span>
                      </div>

                      <div className="product-mix">
                        <span className="mix-label">
                          {t({ az: 'Qarışıq (S:Q:Ç)', en: 'Mix (C:S:G)', ru: 'Смесь (Ц:П:Щ)' })}
                        </span>
                        <span className="mix-value">{ratioLabel(grade)}</span>
                      </div>
                      <ul className="product-stats">
                        <li>
                          <span>{t({ az: 'Sement', en: 'Cement', ru: 'Цемент' })}</span>
                          <strong>
                            {Math.round(m.cementKg)} {t({ az: 'kq/m³', en: 'kg/m³', ru: 'кг/м³' })}
                          </strong>
                        </li>
                        <li>
                          <span>{t({ az: 'Qum', en: 'Sand', ru: 'Песок' })}</span>
                          <strong>{m.sandVol.toFixed(2)} m³/m³</strong>
                        </li>
                        <li>
                          <span>{t({ az: 'Çınqıl', en: 'Gravel', ru: 'Щебень' })}</span>
                          <strong>{m.gravelVol.toFixed(2)} m³/m³</strong>
                        </li>
                        <li>
                          <span>{t({ az: 'Su', en: 'Water', ru: 'Вода' })}</span>
                          <strong>
                            {Math.round(m.waterL)} {t({ az: 'L/m³', en: 'L/m³', ru: 'л/м³' })}
                          </strong>
                        </li>
                      </ul>
                      <p className="tech-disclaimer">
                        {t({
                          az: 'Nominal qarışıq əsasında təxmini planlaşdırma dəyərləri. Yekun qarışıq dizaynı layihəyə uyğun laboratoriyada təyin olunur.',
                          en: 'Approximate planning values based on a nominal mix. The final mix design is determined in the laboratory according to the project.',
                          ru: 'Приблизительные плановые значения на основе номинальной смеси. Окончательный состав смеси определяется в лаборатории согласно проекту.',
                        })}
                      </p>

                      <button type="button" className="flip-btn flip-btn--return" onClick={() => toggleFlip(grade.id)}>
                        <RotateCcw size={15} aria-hidden="true" />
                        {t({ az: 'Geri qayıt', en: 'Go back', ru: 'Назад' })}
                      </button>
                    </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <p className="products-note">
            {t({
              az: '* "Texniki məlumat" bölməsindəki miqdarlar nominal qarışıq əsasında təxmini planlaşdırma dəyərləridir — hər layihənin yekun qarışıq dizaynı (mix design) laboratoriya nəzarəti ilə hazırlanır. Qiymət təklifi üçün bizimlə əlaqə saxlayın.',
              en: '* The quantities in the "Technical data" section are approximate planning values based on a nominal mix — the final mix design for each project is prepared under laboratory control. Contact us for a price quote.',
              ru: '* Количества в разделе «Технические данные» — приблизительные плановые значения на основе номинальной смеси; окончательный состав смеси (mix design) для каждого проекта разрабатывается под лабораторным контролем. Свяжитесь с нами для расчёта цены.',
            })}
          </p>

          <Faq
            items={PRODUCT_FAQS}
            subtitle={{ az: 'Marka seçimi', en: 'Choosing a grade', ru: 'Выбор марки' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
