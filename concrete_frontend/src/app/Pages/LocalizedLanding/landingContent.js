/* ============================================================
   Static locale content for the Google Ads landing pages
   /en/concrete and /ru/concrete.

   Every visible UI string for these routes lives here — the pages
   must contain ONLY English / ONLY Russian text (Google Ads rejects
   mixed-language landing pages). The brand name "NOVXANI BETON" and
   proper nouns stay as-is. No Azerbaijani strings may be added.
   ============================================================ */

export const LANDING_CONTENT = {
  en: {
    locale: 'en',
    path: '/en/concrete',
    ogLocale: 'en_US',
    formName: 'english_quote_form',
    seo: {
      title: 'Ready Mix Concrete in Baku | NOVXANI BETON',
      description:
        'Ready-mix concrete delivery in Baku and Absheron. M300, M350 and M400 concrete, pumping service and professional support.',
      ogTitle: 'Ready Mix Concrete in Baku | NOVXANI BETON',
      ogDescription:
        'Reliable ready-mix concrete production, delivery and pumping services across Baku and Absheron.',
    },
    structuredData: {
      description:
        'Ready-mix concrete production, delivery and concrete pumping services across Baku and Absheron.',
      addressLocality: 'Novkhani',
      addressRegion: 'Baku',
      areaServed: ['Baku', 'Absheron'],
    },
    header: {
      navAriaLabel: 'Main navigation',
      logoAriaLabel: 'NOVXANI BETON — ready-mix concrete in Baku',
      langSwitchAriaLabel: 'Site language',
      phoneAriaLabel: 'Call us: +994 50 620 95 84',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      nav: [
        { href: '#services', label: 'Services' },
        { href: '#grades', label: 'Concrete Grades' },
        { href: '#delivery', label: 'Delivery' },
        { href: '#pumping', label: 'Pumping' },
        { href: '#quote', label: 'Request a Quote' },
        { href: '#contact', label: 'Contact' },
      ],
    },
    hero: {
      h1Line1: 'Ready-Mix Concrete',
      h1Accent: 'Delivery in Baku',
      eyebrow: 'Reliable partner since 2018',
      text: 'Reliable ready-mix concrete production, delivery and pumping services across Baku and Absheron.',
      ctaQuote: 'Request a Quote',
      ctaCall: 'Call Us',
      ctaWhatsApp: 'WhatsApp',
      imgAlt: 'Ready-mix concrete being poured at a construction site in Baku — NOVXANI BETON',
      badges: [
        { icon: 'shield', label: 'Certified quality' },
        { icon: 'layers', label: 'Grades M100–M450' },
        { icon: 'truck', label: 'On-time delivery' },
        { icon: 'award', label: '8+ years of experience' },
      ],
    },
    whatsappAriaLabel: 'Chat on WhatsApp',
    whatsappText: 'Hello! I would like to request a concrete quote.',
    services: {
      subtitle: 'What we offer',
      title: 'Concrete Solutions for Every Project',
      items: [
        { icon: 'factory', title: 'Ready-Mix Concrete Production', text: 'In-house production with quality control of every batch.' },
        { icon: 'truck', title: 'Concrete Delivery', text: 'Mixer trucks deliver concrete right on schedule.' },
        { icon: 'gauge', title: 'Concrete Pumping Service', text: 'Concrete placement at height and in hard-to-reach areas.' },
        { icon: 'home', title: 'Residential and Commercial Projects', text: 'From private houses to large commercial developments.' },
        { icon: 'mappin', title: 'Service Across Baku and Absheron', text: 'Fast coordination wherever your site is located.' },
        { icon: 'handshake', title: 'Professional Support', text: 'Our team will help you choose the right concrete grade for your project.' },
      ],
    },
    grades: {
      subtitle: 'Our products',
      title: 'Concrete Grades',
      text: 'We supply concrete grades suitable for residential, commercial and infrastructure projects, including M300, M350 and M400.',
      listAriaLabel: 'Available concrete grades',
      unit: 'MPa',
    },
    delivery: {
      title: 'Reliable Concrete Delivery',
      text: 'Our team coordinates production and delivery to help concrete arrive at the project site at the required time.',
      imgAlt: 'Workers placing ready-mix concrete at a construction site',
      linkAriaLabel: 'Concrete delivery — request a quote',
    },
    pumping: {
      title: 'Concrete Pumping Service',
      text: 'Professional concrete pumping service is available for projects across Baku and Absheron.',
      imgAlt: 'Concrete pump placing concrete on a construction site',
      linkAriaLabel: 'Concrete pumping — request a quote',
    },
    quote: {
      title: 'Request a Concrete Quote',
      intro: 'Send your project details and our team will contact you with availability and pricing information.',
      formTitle: 'Send your request',
      formNote: 'Fill in the form — our team will contact you shortly. The request is free and non-binding.',
      mapTitle: 'NOVXANI BETON plant on the map',
      mapHl: 'en',
      labels: {
        fullName: 'Full Name',
        phone: 'Phone Number',
        grade: 'Concrete Grade',
        volume: 'Required Volume',
        address: 'Delivery Address',
        note: 'Additional Information',
      },
      placeholders: {
        fullName: 'Your full name',
        phone: '+994 XX XXX XX XX',
        volume: 'e.g. 20 m³',
        address: 'District / settlement / site address',
        note: 'Additional details about your project',
      },
      gradePlaceholder: 'Select a concrete grade…',
      submit: 'Send Request',
      submitting: 'Sending...',
      success: 'Your request has been sent successfully. Our team will contact you shortly.',
      error: 'Your request could not be sent. Please try again or contact us by phone.',
      requiredFields: 'Please complete the required fields.',
      fieldErrors: {
        fullName: 'Please enter your full name.',
        phone: 'Please enter your phone number.',
        phoneInvalid: 'Please enter a valid phone number.',
      },
    },
    footer: {
      description:
        'Reliable ready-mix concrete production, delivery and pumping for residential and commercial projects across Baku and Absheron.',
      quickTitle: 'Quick Links',
      contactTitle: 'Contact',
      labels: { call: 'Call', whatsapp: 'WhatsApp', email: 'Email', address: 'Address' },
      addressValue: 'Novkhani, Baku, Azerbaijan',
      copyright: '© 2026 NOVXANI BETON. All rights reserved.',
    },
    sticky: {
      ariaLabel: 'Quick contact',
      call: 'Call',
      quote: 'Get Quote',
    },
    web3forms: {
      subject: 'New concrete quote request (EN landing) — novxanibeton.az',
      fromName: 'NOVXANI BETON site — EN concrete landing',
      language: 'English',
    },
  },

  ru: {
    locale: 'ru',
    path: '/ru/concrete',
    ogLocale: 'ru_RU',
    formName: 'russian_quote_form',
    seo: {
      title: 'Товарный бетон в Баку | NOVXANI BETON',
      description:
        'Производство и доставка товарного бетона по Баку и Абшерону. Бетон М300, М350 и М400, услуги бетононасоса и профессиональная поддержка.',
      ogTitle: 'Товарный бетон в Баку | NOVXANI BETON',
      ogDescription:
        'Надежное производство, доставка товарного бетона и услуги бетононасоса по Баку и Абшерону.',
    },
    structuredData: {
      description:
        'Производство и доставка товарного бетона, услуги бетононасоса по Баку и Абшерону.',
      addressLocality: 'Новханы',
      addressRegion: 'Баку',
      areaServed: ['Баку', 'Абшерон'],
    },
    header: {
      navAriaLabel: 'Основная навигация',
      logoAriaLabel: 'NOVXANI BETON — товарный бетон в Баку',
      langSwitchAriaLabel: 'Язык сайта',
      phoneAriaLabel: 'Позвонить: +994 50 620 95 84',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      nav: [
        { href: '#services', label: 'Услуги' },
        { href: '#grades', label: 'Марки бетона' },
        { href: '#delivery', label: 'Доставка' },
        { href: '#pumping', label: 'Бетононасос' },
        { href: '#quote', label: 'Получить предложение' },
        { href: '#contact', label: 'Контакты' },
      ],
    },
    hero: {
      h1Line1: 'Доставка товарного бетона',
      h1Accent: 'в Баку',
      eyebrow: 'Надежный партнер с 2018 года',
      text: 'Производство и доставка товарного бетона, а также услуги бетононасоса по Баку и Абшерону.',
      ctaQuote: 'Получить предложение',
      ctaCall: 'Позвонить',
      ctaWhatsApp: 'WhatsApp',
      imgAlt: 'Заливка товарного бетона на строительной площадке в Баку — NOVXANI BETON',
      badges: [
        { icon: 'shield', label: 'Сертифицированное качество' },
        { icon: 'layers', label: 'Марки M100–M450' },
        { icon: 'truck', label: 'Доставка вовремя' },
        { icon: 'award', label: 'Более 8 лет опыта' },
      ],
    },
    whatsappAriaLabel: 'Написать в WhatsApp',
    whatsappText: 'Здравствуйте! Хочу получить предложение на бетон.',
    services: {
      subtitle: 'Что мы предлагаем',
      title: 'Бетонные решения для любого проекта',
      items: [
        { icon: 'factory', title: 'Производство товарного бетона', text: 'Собственное производство с контролем качества каждой партии.' },
        { icon: 'truck', title: 'Доставка бетона', text: 'Миксеры доставляют бетон точно в согласованное время.' },
        { icon: 'gauge', title: 'Услуги бетононасоса', text: 'Подача бетона на высоту и в труднодоступные места.' },
        { icon: 'home', title: 'Жилые и коммерческие проекты', text: 'От частных домов до крупных коммерческих объектов.' },
        { icon: 'mappin', title: 'Обслуживание по Баку и Абшерону', text: 'Оперативная координация, где бы ни находился ваш объект.' },
        { icon: 'handshake', title: 'Профессиональная поддержка', text: 'Наша команда поможет подобрать марку бетона для вашего проекта.' },
      ],
    },
    grades: {
      subtitle: 'Наша продукция',
      title: 'Марки бетона',
      text: 'Мы поставляем бетон для жилых, коммерческих и инфраструктурных проектов, включая марки М300, М350 и М400.',
      listAriaLabel: 'Доступные марки бетона',
      unit: 'МПа',
    },
    delivery: {
      title: 'Надежная доставка бетона',
      text: 'Наша команда координирует производство и доставку, чтобы бетон прибыл на объект в согласованное время.',
      imgAlt: 'Рабочие укладывают товарный бетон на строительной площадке',
      linkAriaLabel: 'Доставка бетона — получить предложение',
    },
    pumping: {
      title: 'Услуги бетононасоса',
      text: 'Профессиональные услуги бетононасоса доступны для объектов по Баку и Абшерону.',
      imgAlt: 'Бетононасос подает бетон на строительной площадке',
      linkAriaLabel: 'Бетононасос — получить предложение',
    },
    quote: {
      title: 'Получить предложение на бетон',
      intro: 'Отправьте информацию о проекте, и наша команда свяжется с вами для уточнения стоимости и доступности.',
      formTitle: 'Отправьте заявку',
      formNote: 'Заполните форму — наша команда свяжется с вами в ближайшее время. Запрос бесплатный и ни к чему не обязывает.',
      mapTitle: 'Завод NOVXANI BETON на карте',
      mapHl: 'ru',
      labels: {
        fullName: 'Имя и фамилия',
        phone: 'Номер телефона',
        grade: 'Марка бетона',
        volume: 'Необходимый объем',
        address: 'Адрес доставки',
        note: 'Дополнительная информация',
      },
      placeholders: {
        fullName: 'Ваше имя и фамилия',
        phone: '+994 XX XXX XX XX',
        volume: 'напр., 20 м³',
        address: 'Район / посёлок / адрес объекта',
        note: 'Дополнительные сведения о проекте',
      },
      gradePlaceholder: 'Выберите марку бетона…',
      submit: 'Отправить запрос',
      submitting: 'Отправка...',
      success: 'Ваш запрос успешно отправлен. Наша команда свяжется с вами в ближайшее время.',
      error: 'Не удалось отправить запрос. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.',
      requiredFields: 'Пожалуйста, заполните обязательные поля.',
      fieldErrors: {
        fullName: 'Пожалуйста, укажите имя и фамилию.',
        phone: 'Пожалуйста, укажите номер телефона.',
        phoneInvalid: 'Пожалуйста, укажите корректный номер телефона.',
      },
    },
    footer: {
      description:
        'Надежное производство, доставка товарного бетона и услуги бетононасоса для жилых и коммерческих проектов по Баку и Абшерону.',
      quickTitle: 'Разделы',
      contactTitle: 'Контакты',
      labels: { call: 'Телефон', whatsapp: 'WhatsApp', email: 'Электронная почта', address: 'Адрес' },
      addressValue: 'Новханы, Баку, Азербайджан',
      copyright: '© 2026 NOVXANI BETON. Все права защищены.',
    },
    sticky: {
      ariaLabel: 'Быстрая связь',
      call: 'Звонок',
      quote: 'Предложение',
    },
    web3forms: {
      subject: 'New concrete quote request (RU landing) — novxanibeton.az',
      fromName: 'NOVXANI BETON site — RU concrete landing',
      language: 'Russian',
    },
  },
};
