/* ============================================================
   Static locale content for the Google Ads landing pages
   /en/concrete and /ru/concrete.

   These pages are an EXACT clone of the Azerbaijani homepage —
   same sections, same layout, same icons — with every visible
   string translated 1:1 from the original Azerbaijani copy.
   The brand name and proper nouns stay as-is. No Azerbaijani
   strings may be added.
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
      logoAriaLabel: 'Novxani Beton home page',
      langSwitchAriaLabel: 'Site language',
      phoneAriaLabel: 'Call: +994 50 620 95 84',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      nav: [
        { to: '/en/concrete', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/services', label: 'Services' },
        { to: '/tikinti-materiallari', label: 'Materials' },
        { to: '/calculator', label: 'Calculator' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
      ],
    },
    hero: {
      titleLine1: 'Concrete and Building Materials',
      titleAccent: 'Your Trusted Source',
      eyebrow: 'Reliable partner since 2018',
      desc:
        'Quality ready-mix concrete, sand, gravel mix and crushed stone — fast delivery and competitive offers for private and corporate customers. Plan your project precisely with our professional calculator.',
      ctaCalc: 'Use the Calculator',
      ctaMaterials: 'Order Sand, Gravel Mix, Crushed Stone',
      ctaQuote: 'Request a Quote',
      imgAlt: 'Ready-mix concrete being poured at a construction site in Baku — Novxani Beton',
      badges: [
        { icon: 'shield', label: 'Certified quality' },
        { icon: 'layers', label: 'Sand, gravel mix and crushed stone' },
        { icon: 'truck', label: 'On-time delivery' },
        { icon: 'award', label: '8+ years of experience' },
      ],
    },
    features: [
      {
        icon: 'layers',
        title: 'High-Quality Materials',
        description: 'Premium-grade concrete and certified raw materials for durability.',
      },
      {
        icon: 'badge',
        title: 'Certified Specialists',
        description: 'A professional team with years of industry experience.',
      },
      {
        icon: 'chart',
        title: 'Transparent Pricing',
        description: 'No hidden costs — clear and competitive prices.',
      },
      {
        icon: 'truck',
        title: 'On-Time Delivery',
        description: 'Mixer delivery on a precise schedule across Baku and Absheron.',
      },
    ],
    about: {
      imgAlt: 'A Novxani Beton worker smoothing a concrete surface at a construction site',
      badgeNumber: '8+',
      badgeText: 'Years of Experience',
      subtitle: 'About Us',
      title: 'Premium Concrete Solutions for Every Project',
      p1: 'With more than 8 years of experience, Novxani Beton is known for high-quality concrete products and exceptional customer service.',
      p2: 'We provide comprehensive concrete solutions for every type of project, from residential buildings to commercial developments.',
      checks: [
        'Premium Quality Materials',
        'On-Time Delivery',
        'Expert Advice',
        'Competitive Prices',
      ],
      cta: 'Contact us about your project',
    },
    services: {
      subtitle: 'What we offer',
      title: 'Professional Concrete Services',
      detailSuffix: 'details',
      cards: [
        {
          img: 'hazir',
          alt: 'Ready-mix concrete being poured at a construction site — Novxani Beton',
          title: 'Ready-Mix Concrete',
          description: 'High-quality ready-mix concrete delivered to your construction site on time.',
          to: '/hazir-beton-satisi',
        },
        {
          img: 'nasos',
          alt: 'A concrete pump placing concrete on a construction site',
          title: 'Concrete Pumping',
          description: 'Professional pumping services for hard-to-reach areas and high-rise buildings.',
          to: '/beton-nasoslama',
        },
        {
          img: 'terezi',
          alt: 'A mixer truck being weighed on a truck weighbridge',
          title: 'Weighbridge Service',
          description: 'Fast and accurate weighing of loads on a truck weighbridge.',
          to: '/terezi-xidmeti',
        },
      ],
    },
    materials: {
      ariaLabel: 'Building materials',
      subtitle: 'Building materials',
      title: 'Sand, Gravel Mix and Crushed Stone',
      lead:
        'Concrete and building materials from one address: we offer the same materials we use in our own production — wholesale and retail, with delivery.',
      tagWholesale: 'Wholesale',
      tagRetail: 'Retail',
      tagDelivery: 'Delivery',
      cards: [
        {
          id: 'qum',
          name: 'Sand',
          alt: 'Close-up texture of construction sand — sand sales, Novxani Beton',
          short:
            'Quality construction sand for concrete, masonry and plastering work. Wholesale and retail, with delivery to your address.',
          btn: 'Sand sales',
        },
        {
          id: 'atsep',
          name: 'Gravel Mix',
          alt: 'Close-up view of sand-gravel mix — gravel mix sales, Novxani Beton',
          short:
            'Sand-gravel mix for concrete production, road bases and backfill work. Large-volume orders and supply to concrete plants.',
          btn: 'Gravel mix sales',
        },
        {
          id: 'seben',
          name: 'Crushed Stone',
          alt: 'Pile of grey crushed stone — crushed stone sales, Novxani Beton',
          short:
            'Crushed stone for concrete and reinforced-concrete structures. Wholesale sales with fast delivery.',
          btn: 'Crushed stone sales',
        },
      ],
      b2bTitle: 'For concrete plants and construction companies',
      b2bText: 'Continuous, large-volume material supply with individual volume-based pricing.',
      b2bBtn: 'Get a wholesale offer',
    },
    contact: {
      title: 'Contact Us',
      desc: 'Tell us about your project. Our professional team is ready to provide you with the best concrete solutions.',
      infoAddress: 'Address',
      infoAddressValue: 'Novkhani, Baku, Azerbaijan',
      infoPhone: 'Phone',
      infoEmail: 'Email',
      infoHours: 'Working Hours',
      infoHoursValue: 'Mon–Sun — open 24/7',
      mapTitle: 'Novxani Beton plant on the map',
      mapHl: 'en',
      formTitle: 'Send a Message',
      formNote:
        'Fill in the details — our team will get back to you as soon as possible. The request is free and non-binding.',
      labels: {
        fullName: 'Full name',
        phone: 'Phone number',
        email: 'Email',
        message: 'Your message',
      },
      placeholders: {
        fullName: 'e.g. John Smith',
        phone: '+994 XX XXX XX XX',
        email: 'example@gmail.com',
        message: 'Write details about your project or order',
      },
      errors: {
        fullName: 'Please enter your full name',
        phone: 'Please enter your phone number',
        phoneInvalid: 'Please enter a valid phone number',
        email: 'Please enter your email address',
        emailInvalid: 'Please enter a valid email address',
        message: 'Please write your message',
      },
      submit: 'Send',
      sending: 'Sending…',
      successTitle: 'Thank you, your message has been sent!',
      successText:
        'Our team will contact you shortly (usually within one business day). If it is urgent, you can message or call us directly:',
      successCall: 'Call',
      error:
        'The message could not be sent. Please try again or contact us directly at +994 50 620 95 84.',
    },
    footer: {
      about:
        'Your reliable partner for residential, commercial and industrial projects with high-quality concrete solutions. Building solid foundations since 2018.',
      linksTitle: 'Links',
      links: [
        { to: '/en/concrete', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/services', label: 'Services' },
        { to: '/tikinti-materiallari', label: 'Building Materials' },
        { to: '/calculator', label: 'Calculator' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/betonun-istifade-saheleri', label: 'Applications' },
        { to: '/faq', label: 'FAQ' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
      ],
      servicesTitle: 'Services',
      services: [
        { to: '/hazir-beton-satisi', label: 'Ready-Mix Concrete Sales' },
        { to: '/beton-catdirilmasi', label: 'Concrete Delivery' },
        { to: '/beton-nasoslama', label: 'Concrete Pumping' },
        { to: '/terezi-xidmeti', label: 'Weighbridge Service' },
        { to: '/beton-qiymetleri', label: 'Concrete Prices' },
        { to: '/beton-laboratoriyasi', label: 'Concrete Laboratory' },
        { to: '/topdan-beton-satisi', label: 'Wholesale Concrete Sales' },
        { to: '/tikinti-materiallari', label: 'Sand, Gravel Mix and Crushed Stone' },
      ],
      gradesTitle: 'Concrete Grades',
      gradeLabel: (id) => `${id} Concrete`,
      contactTitle: 'Contact',
      addressValue: 'Novkhani, Baku, Azerbaijan',
      hoursValue: 'Mon–Sun — open 24/7',
      copyright: '© 2026 Novxani Beton. All rights reserved.',
    },
    sticky: {
      ariaLabel: 'Quick contact',
      call: 'Call',
      quote: 'Get Quote',
    },
    whatsappAriaLabel: 'Chat on WhatsApp',
    whatsappText: 'Hello! I would like to request a concrete quote.',
    web3forms: {
      subject: 'New concrete quote request (EN landing) — novxanibeton.az',
      fromName: 'Novxani Beton site — EN concrete landing',
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
      logoAriaLabel: 'Главная страница Novxani Beton',
      langSwitchAriaLabel: 'Язык сайта',
      phoneAriaLabel: 'Позвонить: +994 50 620 95 84',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      nav: [
        { to: '/ru/concrete', label: 'Главная' },
        { to: '/products', label: 'Продукция' },
        { to: '/services', label: 'Услуги' },
        { to: '/tikinti-materiallari', label: 'Материалы' },
        { to: '/calculator', label: 'Калькулятор' },
        { to: '/gallery', label: 'Галерея' },
        { to: '/about', label: 'О нас' },
        { to: '/contact', label: 'Контакты' },
      ],
    },
    hero: {
      titleLine1: 'Бетон и строительные материалы',
      titleAccent: 'Ваш надежный адрес',
      eyebrow: 'Надежный партнер с 2018 года',
      desc:
        'Качественный товарный бетон, песок, ПГС и щебень — оперативная доставка и выгодные предложения для частных и корпоративных клиентов. Точно спланируйте свой проект с помощью нашего профессионального калькулятора.',
      ctaCalc: 'Открыть калькулятор',
      ctaMaterials: 'Заказать песок, ПГС, щебень',
      ctaQuote: 'Получить предложение',
      imgAlt: 'Заливка товарного бетона на строительной площадке в Баку — Novxani Beton',
      badges: [
        { icon: 'shield', label: 'Сертифицированное качество' },
        { icon: 'layers', label: 'Песок, ПГС и щебень' },
        { icon: 'truck', label: 'Доставка вовремя' },
        { icon: 'award', label: 'Более 8 лет опыта' },
      ],
    },
    features: [
      {
        icon: 'layers',
        title: 'Высококачественные материалы',
        description: 'Бетон премиум-класса и сертифицированное сырье для долговечности.',
      },
      {
        icon: 'badge',
        title: 'Сертифицированные специалисты',
        description: 'Профессиональная команда с многолетним отраслевым опытом.',
      },
      {
        icon: 'chart',
        title: 'Прозрачное ценообразование',
        description: 'Никаких скрытых расходов — понятные и конкурентные цены.',
      },
      {
        icon: 'truck',
        title: 'Доставка вовремя',
        description: 'Доставка миксерами по точному графику по Баку и Абшерону.',
      },
    ],
    about: {
      imgAlt: 'Работник Novxani Beton выравнивает бетонную поверхность на строительной площадке',
      badgeNumber: '8+',
      badgeText: 'Лет опыта',
      subtitle: 'О нас',
      title: 'Премиальные бетонные решения для любого проекта',
      p1: 'Компания Novxani Beton с более чем 8-летним опытом известна высококачественной бетонной продукцией и безупречным сервисом для клиентов.',
      p2: 'Мы предлагаем комплексные бетонные решения для любых проектов — от жилых зданий до коммерческих объектов.',
      checks: [
        'Материалы премиального качества',
        'Доставка вовремя',
        'Экспертная консультация',
        'Конкурентные цены',
      ],
      cta: 'Свяжитесь с нами по вашему проекту',
    },
    services: {
      subtitle: 'Что мы предлагаем',
      title: 'Профессиональные бетонные услуги',
      detailSuffix: 'подробнее',
      cards: [
        {
          img: 'hazir',
          alt: 'Заливка товарного бетона на строительной площадке — Novxani Beton',
          title: 'Товарный бетон',
          description: 'Высококачественный товарный бетон с доставкой на объект точно в срок.',
          to: '/hazir-beton-satisi',
        },
        {
          img: 'nasos',
          alt: 'Бетононасос подает бетон на строительной площадке',
          title: 'Услуги бетононасоса',
          description: 'Профессиональные услуги бетононасоса для труднодоступных участков и высотных зданий.',
          to: '/beton-nasoslama',
        },
        {
          img: 'terezi',
          alt: 'Миксер взвешивается на автомобильных весах',
          title: 'Автомобильные весы',
          description: 'Точное и быстрое взвешивание грузов на автомобильных весах.',
          to: '/terezi-xidmeti',
        },
      ],
    },
    materials: {
      ariaLabel: 'Строительные материалы',
      subtitle: 'Строительные материалы',
      title: 'Продажа песка, ПГС и щебня',
      lead:
        'Бетон и стройматериалы теперь из одних рук: предлагаем материалы, которые используем в собственном производстве, — оптом и в розницу, с доставкой.',
      tagWholesale: 'Опт',
      tagRetail: 'Розница',
      tagDelivery: 'Доставка',
      cards: [
        {
          id: 'qum',
          name: 'Песок',
          alt: 'Текстура строительного песка крупным планом — продажа песка, Novxani Beton',
          short:
            'Качественный строительный песок для бетона, кладки и штукатурных работ. Оптом и в розницу, с доставкой на адрес.',
          btn: 'Продажа песка',
        },
        {
          id: 'atsep',
          name: 'ПГС',
          alt: 'Песчано-гравийная смесь крупным планом — продажа ПГС, Novxani Beton',
          short:
            'ПГС для производства бетона, дорожных оснований и засыпки. Крупные заказы и поставки бетонным заводам.',
          btn: 'Продажа ПГС',
        },
        {
          id: 'seben',
          name: 'Щебень',
          alt: 'Куча серого щебня — продажа щебня, Novxani Beton',
          short:
            'Щебень для бетонных и железобетонных конструкций. Оптовая продажа с оперативной доставкой.',
          btn: 'Продажа щебня',
        },
      ],
      b2bTitle: 'Для бетонных заводов и строительных компаний',
      b2bText: 'Стабильные крупнообъемные поставки материалов и индивидуальные цены в зависимости от объема.',
      b2bBtn: 'Получить оптовое предложение',
    },
    contact: {
      title: 'Свяжитесь с нами',
      desc: 'Расскажите нам о вашем проекте. Наша профессиональная команда готова предложить вам лучшие бетонные решения.',
      infoAddress: 'Адрес',
      infoAddressValue: 'Новханы, Баку, Азербайджан',
      infoPhone: 'Телефон',
      infoEmail: 'Email',
      infoHours: 'Часы работы',
      infoHoursValue: 'Пн–Вс — работаем 24/7',
      mapTitle: 'Завод Novxani Beton на карте',
      mapHl: 'ru',
      formTitle: 'Отправить сообщение',
      formNote:
        'Заполните данные — наша команда свяжется с вами в ближайшее время. Запрос бесплатный и ни к чему не обязывает.',
      labels: {
        fullName: 'Имя и фамилия',
        phone: 'Номер телефона',
        email: 'Email',
        message: 'Ваше сообщение',
      },
      placeholders: {
        fullName: 'напр., Эльвин Мамедов',
        phone: '+994 XX XXX XX XX',
        email: 'example@gmail.com',
        message: 'Напишите информацию о вашем проекте или заказе',
      },
      errors: {
        fullName: 'Укажите имя и фамилию',
        phone: 'Укажите номер телефона',
        phoneInvalid: 'Укажите корректный номер телефона',
        email: 'Укажите адрес электронной почты',
        emailInvalid: 'Укажите корректный адрес электронной почты',
        message: 'Напишите ваше сообщение',
      },
      submit: 'Отправить',
      sending: 'Отправка…',
      successTitle: 'Спасибо, ваше сообщение отправлено!',
      successText:
        'Наша команда свяжется с вами в ближайшее время (обычно в течение рабочего дня). Если срочно, вы можете написать или позвонить нам напрямую:',
      successCall: 'Позвонить',
      error:
        'Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую: +994 50 620 95 84.',
    },
    footer: {
      about:
        'Ваш надежный партнер по жилым, коммерческим и промышленным проектам с высококачественными бетонными решениями. Строим прочный фундамент с 2018 года.',
      linksTitle: 'Ссылки',
      links: [
        { to: '/ru/concrete', label: 'Главная' },
        { to: '/products', label: 'Продукция' },
        { to: '/services', label: 'Услуги' },
        { to: '/tikinti-materiallari', label: 'Стройматериалы' },
        { to: '/calculator', label: 'Калькулятор' },
        { to: '/gallery', label: 'Галерея' },
        { to: '/betonun-istifade-saheleri', label: 'Области применения' },
        { to: '/faq', label: 'Частые вопросы' },
        { to: '/about', label: 'О нас' },
        { to: '/contact', label: 'Контакты' },
      ],
      servicesTitle: 'Услуги',
      services: [
        { to: '/hazir-beton-satisi', label: 'Продажа товарного бетона' },
        { to: '/beton-catdirilmasi', label: 'Доставка бетона' },
        { to: '/beton-nasoslama', label: 'Услуги бетононасоса' },
        { to: '/terezi-xidmeti', label: 'Автомобильные весы' },
        { to: '/beton-qiymetleri', label: 'Цены на бетон' },
        { to: '/beton-laboratoriyasi', label: 'Бетонная лаборатория' },
        { to: '/topdan-beton-satisi', label: 'Оптовая продажа бетона' },
        { to: '/tikinti-materiallari', label: 'Песок, ПГС и щебень' },
      ],
      gradesTitle: 'Марки бетона',
      gradeLabel: (id) => `Бетон ${id}`,
      contactTitle: 'Контакты',
      addressValue: 'Новханы, Баку, Азербайджан',
      hoursValue: 'Пн–Вс — работаем 24/7',
      copyright: '© 2026 Novxani Beton. Все права защищены.',
    },
    sticky: {
      ariaLabel: 'Быстрая связь',
      call: 'Позвонить',
      quote: 'Заявка',
    },
    whatsappAriaLabel: 'Написать в WhatsApp',
    whatsappText: 'Здравствуйте! Хочу получить предложение на бетон.',
    web3forms: {
      subject: 'New concrete quote request (RU landing) — novxanibeton.az',
      fromName: 'Novxani Beton site — RU concrete landing',
      language: 'Russian',
    },
  },
};
