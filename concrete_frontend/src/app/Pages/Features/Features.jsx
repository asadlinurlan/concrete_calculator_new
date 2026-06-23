import React from 'react';
import { Layers, BadgeCheck, BarChart3, Truck } from 'lucide-react';
import './Features.css';

const features = [
  {
    Icon: Layers,
    title: 'Yüksək Keyfiyyətli Material',
    description: 'Davamlılıq üçün premium dərəcəli beton və sertifikatlı xammal.',
  },
  {
    Icon: BadgeCheck,
    title: 'Sertifikatlı Mütəxəssislər',
    description: 'İllərlə sənaye təcrübəsinə malik peşəkar komanda.',
  },
  {
    Icon: BarChart3,
    title: 'Şəffaf Qiymətləndirmə',
    description: 'Gizli xərclər yoxdur — aydın və rəqabətqabiliyyətli qiymətlər.',
  },
  {
    Icon: Truck,
    title: 'Vaxtında Çatdırılma',
    description: 'Bakı və Abşeron üzrə dəqiq qrafiklə mikser çatdırılması.',
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {features.map(({ Icon, title, description }, index) => (
            <div
              key={title}
              className="feature-card reveal"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="feature-icon" aria-hidden="true">
                <Icon size={28} strokeWidth={1.75} />
              </div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-description">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
