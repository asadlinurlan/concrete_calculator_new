import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, ArrowRight } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import { useT, LocaleLink } from '../../../i18n/i18n';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import Faq from '../../../Components/Faq/Faq';
import CtaBand from '../../../Components/CtaBand/CtaBand';
import { FAQ_GROUPS, ALL_FAQ_ITEMS } from '../../../data/faqPage';
import './FaqPage.css';

/**
 * Central FAQ page targeting question-form searches. Renders topic
 * groups with the shared <Faq/> accordion; emits ONE combined
 * FAQPage JSON-LD for all groups (individual groups have LD off).
 */
const FaqPage = () => {
  useScrollReveal();
  const t = useT();

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: t(f.q),
      acceptedAnswer: { '@type': 'Answer', text: t(f.a) },
    })),
  };

  return (
    <section className="faqpage-section">
      <Seo
        custom={{
          path: '/faq',
          title: t({
            az: 'Tez-tez Verilən Suallar — Beton, Qiymət, Çatdırılma | NOVXANI BETON',
            en: 'Frequently Asked Questions — Concrete, Prices, Delivery | NOVXANI BETON',
            ru: 'Часто задаваемые вопросы — бетон, цены, доставка | NOVXANI BETON',
          }),
          description: t({
            az: 'Beton haqqında ən çox verilən suallar: kub necə hesablanır, hansı marka lazımdır, beton neçə günə bərkiyir, atsep nədir? Sifariş, çatdırılma və keyfiyyət üzrə cavablar.',
            en: 'The most common questions about concrete: how to calculate cubic metres, which grade you need, how long concrete takes to cure, what a mixer truck is. Answers on ordering, delivery and quality.',
            ru: 'Самые частые вопросы о бетоне: как рассчитать кубатуру, какая марка нужна, сколько дней твердеет бетон, что такое миксер? Ответы по заказу, доставке и качеству.',
          }),
          crumb: t({ az: 'Suallar', en: 'FAQ', ru: 'Вопросы' }),
        }}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="container faqpage-content">
        <Breadcrumbs
          current={t({
            az: 'Tez-tez verilən suallar',
            en: 'Frequently asked questions',
            ru: 'Часто задаваемые вопросы',
          })}
        />

        <header className="section-head reveal">
          <span className="section-subtitle">
            {t({ az: 'Sual-cavab', en: 'Q&A', ru: 'Вопросы и ответы' })}
          </span>
          <h1 className="section-title">
            {t({
              az: 'Tez-tez Verilən Suallar',
              en: 'Frequently Asked Questions',
              ru: 'Часто задаваемые вопросы',
            })}
          </h1>
          <p className="faqpage-lead">
            {t({
              az: 'Beton sifarişi, marka seçimi, hesablama, keyfiyyət və tikinti materialları üzrə ən çox soruşulan sualların cavabları. Sualınızın cavabını tapmadınızsa, bizə yazın — pulsuz məsləhət veririk.',
              en: 'Answers to the most frequently asked questions about ordering concrete, choosing a grade, calculations, quality and construction materials. If you did not find your answer, write to us — we provide free advice.',
              ru: 'Ответы на самые частые вопросы о заказе бетона, выборе марки, расчётах, качестве и стройматериалах. Если вы не нашли ответ на свой вопрос, напишите нам — мы бесплатно проконсультируем.',
            })}
          </p>
        </header>

        {FAQ_GROUPS.map((group) => (
          <Faq
            key={t(group.title)}
            items={group.items}
            subtitle={{ az: 'Mövzu', en: 'Topic', ru: 'Тема' }}
            title={group.title}
            withLd={false}
          />
        ))}

        <div className="faqpage-calc reveal">
          <Calculator size={26} aria-hidden="true" />
          <div>
            <h2>
              {t({
                az: 'Həcmi özünüz hesablayın',
                en: 'Calculate the volume yourself',
                ru: 'Рассчитайте объём сами',
              })}
            </h2>
            <p>
              {t({
                az: 'Ölçüləri yazın — lazımi m³, material və mikser sayını dərhal görün.',
                en: 'Enter the dimensions — instantly see the required m³, materials and number of mixer trucks.',
                ru: 'Введите размеры — сразу увидите необходимые м³, материалы и количество миксеров.',
              })}
            </p>
          </div>
          <LocaleLink to="/calculator" className="btn btn-primary">
            {t({ az: 'Beton kalkulyatoru', en: 'Concrete calculator', ru: 'Калькулятор бетона' })}
            <ArrowRight size={16} aria-hidden="true" />
          </LocaleLink>
        </div>
      </div>

      <CtaBand
        title={{
          az: 'Sualınız cavabsız qaldı?',
          en: 'Still have a question?',
          ru: 'Ваш вопрос остался без ответа?',
        }}
        text={{
          az: 'Layihənizi yazın — mütəxəssislərimiz pulsuz məsləhət və fərdi qiymət təklifi versin.',
          en: 'Tell us about your project — our specialists will provide free advice and an individual price quote.',
          ru: 'Напишите о вашем проекте — наши специалисты бесплатно проконсультируют и подготовят индивидуальное ценовое предложение.',
        }}
        whatsappText={{
          az: 'Salam! Beton sifarişi ilə bağlı sualım var.',
          en: 'Hello! I have a question about ordering concrete.',
          ru: 'Здравствуйте! У меня вопрос по заказу бетона.',
        }}
      />
    </section>
  );
};

export default FaqPage;
