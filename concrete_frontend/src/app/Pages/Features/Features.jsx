import React from 'react';
import { Layers, BadgeCheck, BarChart3, Truck } from 'lucide-react';
import { useT } from '../../../i18n/i18n';
import './Features.css';

const features = [
  {
    Icon: Layers,
    title: {
      az: 'Yüksək Keyfiyyətli Material',
      en: 'High-Quality Materials',
      ru: 'Высококачественные материалы',
    },
    description: {
      az: 'Davamlılıq üçün premium dərəcəli beton və sertifikatlı xammal.',
      en: 'Premium-grade concrete and certified raw materials for durability.',
      ru: 'Бетон премиум-класса и сертифицированное сырье для долговечности.',
    },
  },
  {
    Icon: BadgeCheck,
    title: {
      az: 'Sertifikatlı Mütəxəssislər',
      en: 'Certified Specialists',
      ru: 'Сертифицированные специалисты',
    },
    description: {
      az: 'İllərlə sənaye təcrübəsinə malik peşəkar komanda.',
      en: 'A professional team with years of industry experience.',
      ru: 'Профессиональная команда с многолетним отраслевым опытом.',
    },
  },
  {
    Icon: BarChart3,
    title: {
      az: 'Şəffaf Qiymətləndirmə',
      en: 'Transparent Pricing',
      ru: 'Прозрачное ценообразование',
    },
    description: {
      az: 'Gizli xərclər yoxdur — aydın və rəqabətqabiliyyətli qiymətlər.',
      en: 'No hidden costs — clear and competitive prices.',
      ru: 'Никаких скрытых расходов — понятные и конкурентные цены.',
    },
  },
  {
    Icon: Truck,
    title: {
      az: 'Vaxtında Çatdırılma',
      en: 'On-Time Delivery',
      ru: 'Доставка вовремя',
    },
    description: {
      az: 'Bakı və Abşeron üzrə dəqiq qrafiklə mikser çatdırılması.',
      en: 'Mixer delivery on a precise schedule across Baku and Absheron.',
      ru: 'Доставка миксерами по точному графику по Баку и Абшерону.',
    },
  },
];

const Features = () => {
  const t = useT();
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {features.map(({ Icon, title, description }, index) => (
            <div
              key={title.az}
              className="feature-card reveal"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="feature-icon" aria-hidden="true">
                <Icon size={28} strokeWidth={1.75} />
              </div>
              <h3 className="feature-title">{t(title)}</h3>
              <p className="feature-description">{t(description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
