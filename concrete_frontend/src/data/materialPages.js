/* ============================================================
   Dedicated per-material SEO landing pages (spokes) that support the
   main /tikinti-materiallari hub. Rendered by the shared <ServiceDetail/>
   template. Each targets a single product's search intent with unique,
   non-duplicated Azerbaijani content.

   Content rules: only business-confirmed facts (Novxanı plant, Bakı &
   Abşeron delivery, wholesale + retail, supply to individuals /
   contractors / concrete plants, 7/24). No invented fractions, prices,
   minimum order quantities or technical specifications.

   i18n: every user-visible string is a trilingual object { az, en, ru }
   resolved by the shared t() helper. Slugs and structure unchanged.
   ============================================================ */
import imgQum from '../app/Pages/img/material-qum.webp';
import imgAtsep from '../app/Pages/img/material-atsep.webp';
import imgSeben from '../app/Pages/img/material-seben.webp';

export const MATERIAL_PAGES = [
  {
    slug: '/qum-satisi',
    seo: {
      title: {
        az: 'Qum Satışı və Çatdırılması Bakıda | NOVXANI BETON',
        en: 'Sand for Sale and Delivery in Baku | NOVXANI BETON',
        ru: 'Продажа и доставка песка в Баку | NOVXANI BETON',
      },
      description: {
        az: 'Bakı və Abşeronda tikinti qumunun satışı və çatdırılması. Beton, suvaq və hörgü işləri üçün qum — fərdi və topdan sifariş. NOVXANI BETON-dan fərdi qiymət təklifi alın.',
        en: 'Sale and delivery of construction sand across Baku and Absheron. Sand for concrete, plastering and masonry work — retail and wholesale orders. Get a personal quote from NOVXANI BETON.',
        ru: 'Продажа и доставка строительного песка по Баку и Абшерону. Песок для бетона, штукатурных и кладочных работ — розничные и оптовые заказы. Получите индивидуальное предложение от NOVXANI BETON.',
      },
    },
    crumb: { az: 'Qum Satışı', en: 'Sand for Sale', ru: 'Продажа песка' },
    h1: { az: 'Qum Satışı', en: 'Sand for Sale', ru: 'Продажа песка' },
    tagline: {
      az: 'Beton, suvaq və hörgü işləri üçün tikinti qumu — Bakı və Abşeron üzrə çatdırılma ilə, topdan və pərakəndə.',
      en: 'Construction sand for concrete, plastering and masonry work — with delivery across Baku and Absheron, wholesale and retail.',
      ru: 'Строительный песок для бетона, штукатурных и кладочных работ — с доставкой по Баку и Абшерону, оптом и в розницу.',
    },
    hero: {
      image: imgQum,
      alt: {
        az: 'NOVXANI BETON qum satışı — tikinti qumunun yaxın planı',
        en: 'NOVXANI BETON sand for sale — close-up of construction sand',
        ru: 'Продажа песка NOVXANI BETON — крупный план строительного песка',
      },
    },
    intro: [
      {
        az: 'Qum tikintinin bünövrə materialıdır — beton və məhlul qarışıqlarından tutmuş suvaq, hörgü və abadlıq işlərinə qədər demək olar ki, hər mərhələdə istifadə olunur. NOVXANI BETON öz beton istehsalında işlətdiyi keyfiyyətli qumu birbaşa Novxanı zavodundan satışa çıxarır.',
        en: 'Sand is the foundation material of construction — it is used at almost every stage, from concrete and mortar mixes to plastering, masonry and landscaping work. NOVXANI BETON sells the same quality sand it uses in its own concrete production, straight from the Novkhani plant.',
        ru: 'Песок — базовый материал строительства: он используется практически на каждом этапе, от бетонных и растворных смесей до штукатурки, кладки и благоустройства. NOVXANI BETON продаёт тот же качественный песок, который использует в собственном производстве бетона, напрямую с завода в Новханы.',
      },
      {
        az: 'Qum satışını həm pərakəndə (fərdi ev tikənlər və ustalar üçün bir-iki maşın), həm də topdan (tikinti şirkətləri və beton zavodları üçün davamlı təchizat) qaydasında həyata keçiririk. Hər sifarişin qiyməti həcmə və çatdırılma ünvanına görə fərdi hesablanır.',
        en: 'We sell sand both retail (one or two truckloads for private house builders and craftsmen) and wholesale (continuous supply for construction companies and concrete plants). The price of every order is calculated individually based on the volume and delivery address.',
        ru: 'Мы продаём песок как в розницу (одна-две машины для частных застройщиков и мастеров), так и оптом (постоянные поставки строительным компаниям и бетонным заводам). Цена каждого заказа рассчитывается индивидуально в зависимости от объёма и адреса доставки.',
      },
    ],
    benefitsTitle: {
      az: 'Qum satışında üstünlüklərimiz',
      en: 'Why buy sand from us',
      ru: 'Наши преимущества в продаже песка',
    },
    benefits: [
      {
        title: { az: 'Birbaşa zavoddan', en: 'Straight from the plant', ru: 'Напрямую с завода' },
        text: {
          az: 'Vasitəçi yoxdur — qum Novxanı zavodundan yüklənir.',
          en: 'No middlemen — the sand is loaded at the Novkhani plant.',
          ru: 'Без посредников — песок отгружается с завода в Новханы.',
        },
      },
      {
        title: { az: 'Topdan və pərakəndə', en: 'Wholesale and retail', ru: 'Опт и розница' },
        text: {
          az: 'Bir maşından davamlı iri həcmli təchizata qədər.',
          en: 'From a single truckload to continuous large-volume supply.',
          ru: 'От одной машины до постоянных крупных поставок.',
        },
      },
      {
        title: { az: 'Operativ çatdırılma', en: 'Prompt delivery', ru: 'Оперативная доставка' },
        text: {
          az: 'Bakı və Abşeron üzrə ünvana, dəqiq qrafiklə.',
          en: 'To your address across Baku and Absheron, on a precise schedule.',
          ru: 'По адресу по Баку и Абшерону, точно по графику.',
        },
      },
      {
        title: { az: 'Fərdi qiymət', en: 'Personal pricing', ru: 'Индивидуальная цена' },
        text: {
          az: 'Həcmə görə sərfəli, şəffaf qiymət təklifi.',
          en: 'A transparent, competitive quote based on the volume.',
          ru: 'Выгодное и прозрачное предложение с учётом объёма.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'Qum hansı işlərdə istifadə olunur?',
          en: 'What is sand used for?',
          ru: 'Для каких работ используется песок?',
        },
        a: {
          az: 'Qum beton və sement məhlullarının hazırlanmasında, hörgü və suvaq işlərində, özül altı yastıq qatının salınmasında və abadlıq işlərində istifadə olunur. Konkret işiniz üçün hansı qumun uyğun olduğunu bizimlə məsləhətləşə bilərsiniz.',
          en: 'Sand is used for preparing concrete and cement mortars, in masonry and plastering work, for laying the bedding layer under foundations and in landscaping. You can consult us about which sand suits your specific job.',
          ru: 'Песок используется для приготовления бетонных и цементных растворов, в кладочных и штукатурных работах, при устройстве подушки под фундамент и в благоустройстве. Какой песок подходит для вашей конкретной задачи — можно уточнить у нас.',
        },
      },
      {
        q: {
          az: 'Qumu topdan sifariş etmək olarmı?',
          en: 'Can I order sand wholesale?',
          ru: 'Можно ли заказать песок оптом?',
        },
        a: {
          az: 'Bəli. Tikinti şirkətləri, podratçılar və beton zavodları üçün böyük həcmli, davamlı qum təchizatı təşkil edirik. Daimi əməkdaşlıqda həcmə uyğun xüsusi şərtlər müəyyən olunur.',
          en: 'Yes. We arrange large-volume, continuous sand supply for construction companies, contractors and concrete plants. For ongoing cooperation, special terms are set based on the volume.',
          ru: 'Да. Для строительных компаний, подрядчиков и бетонных заводов мы организуем крупные постоянные поставки песка. При постоянном сотрудничестве действуют специальные условия в зависимости от объёма.',
        },
      },
      {
        q: {
          az: 'Qumu Bakının və Abşeronun hansı ərazilərinə çatdırırsınız?',
          en: 'Which areas of Baku and Absheron do you deliver sand to?',
          ru: 'В какие районы Баку и Абшерона вы доставляете песок?',
        },
        a: {
          az: 'Bakı və bütün Abşeron yarımadası üzrə çatdırılma edirik. Zavodumuz Novxanıda yerləşdiyi üçün Abşeron zonasına xüsusilə operativ çatırıq. Konkret ünvanınız üçün bizimlə əlaqə saxlayın.',
          en: 'We deliver across Baku and the entire Absheron peninsula. Since our plant is located in Novkhani, delivery to the Absheron zone is especially fast. Contact us about your specific address.',
          ru: 'Мы доставляем по Баку и всему Абшеронскому полуострову. Наш завод находится в Новханы, поэтому в зону Абшерона доставка особенно оперативна. По конкретному адресу свяжитесь с нами.',
        },
      },
      {
        q: {
          az: 'Qum satışının qiyməti necə müəyyən olunur?',
          en: 'How is the price of sand determined?',
          ru: 'Как формируется цена на песок?',
        },
        a: {
          az: 'Qiymət sifariş həcmindən və çatdırılma məsafəsindən asılıdır. Buna görə hər sifariş üçün fərdi təklif hazırlayırıq — sorğu göndərmək pulsuzdur və heç bir öhdəlik yaratmır.',
          en: 'The price depends on the order volume and the delivery distance. That is why we prepare a personal quote for every order — sending a request is free and creates no obligation.',
          ru: 'Цена зависит от объёма заказа и расстояния доставки. Поэтому для каждого заказа мы готовим индивидуальное предложение — отправить запрос можно бесплатно и без каких-либо обязательств.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Qum satışı üçün qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a quote for sand.',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на песок.',
    },
  },

  {
    slug: '/atsep-satisi',
    seo: {
      title: {
        az: 'Atsep Satışı və Sifarişi Bakıda | NOVXANI BETON',
        en: 'Gravel Mix (Atsep) for Sale in Baku | NOVXANI BETON',
        ru: 'Продажа и заказ ПГС в Баку | NOVXANI BETON',
      },
      description: {
        az: 'Bakı və Abşeronda atsep (qum-çınqıl qarışığı) satışı. Beton istehsalı, yol əsası və dolğu işləri üçün atsep — topdan sifariş və çatdırılma. NOVXANI BETON-dan qiymət alın.',
        en: 'Gravel mix (atsep, sand-gravel mix) for sale across Baku and Absheron. Atsep for concrete production, road bases and backfilling — wholesale orders and delivery. Get a quote from NOVXANI BETON.',
        ru: 'Продажа ПГС (песчано-гравийной смеси) по Баку и Абшерону. ПГС для производства бетона, оснований дорог и отсыпки — оптовые заказы и доставка. Узнайте цену в NOVXANI BETON.',
      },
    },
    crumb: { az: 'Atsep Satışı', en: 'Gravel Mix for Sale', ru: 'Продажа ПГС' },
    h1: { az: 'Atsep Satışı', en: 'Gravel Mix for Sale', ru: 'Продажа ПГС' },
    tagline: {
      az: 'Beton istehsalı, yol əsası və dolğu işləri üçün atsep (qum-çınqıl qarışığı) — topdan təchizat və çatdırılma ilə.',
      en: 'Gravel mix (atsep) for concrete production, road bases and backfilling — with wholesale supply and delivery.',
      ru: 'ПГС (песчано-гравийная смесь) для производства бетона, оснований дорог и отсыпки — с оптовыми поставками и доставкой.',
    },
    hero: {
      image: imgAtsep,
      alt: {
        az: 'NOVXANI BETON atsep satışı — qum-çınqıl qarışığının yaxın planı',
        en: 'NOVXANI BETON gravel mix for sale — close-up of a sand-gravel mix',
        ru: 'Продажа ПГС NOVXANI BETON — крупный план песчано-гравийной смеси',
      },
    },
    intro: [
      {
        az: 'Atsep (bəzən “otsev” kimi də deyilir) təbii qum-çınqıl qarışığıdır və tikintidə çoxməqsədli material kimi geniş istifadə olunur. Beton istehsalında doldurucu, yol və meydança əsaslarının salınmasında, dolğu və hamarlama işlərində əvəzsizdir.',
        en: 'Atsep (sometimes also called “otsev”) is a natural sand-gravel mix widely used in construction as a multi-purpose material. It is indispensable as a filler in concrete production, for building road and site bases, and in backfilling and levelling work.',
        ru: 'Атсеп (иногда называют «отсев») — природная песчано-гравийная смесь, широко применяемая в строительстве как универсальный материал. Она незаменима как заполнитель в производстве бетона, при устройстве оснований дорог и площадок, в отсыпке и выравнивании.',
      },
      {
        az: 'NOVXANI BETON atsepi həm iri həcmli topdan, həm də pərakəndə qaydada satır. Xüsusilə beton zavodları və yol-tikinti şirkətləri üçün davamlı, stabil təchizat imkanı yaradırıq — sifariş həcminə uyğun fərdi qiymət təklifi ilə.',
        en: 'NOVXANI BETON sells atsep both in large wholesale volumes and retail. We create a continuous, stable supply channel especially for concrete plants and road-construction companies — with a personal quote based on the order volume.',
        ru: 'NOVXANI BETON продаёт ПГС как крупным оптом, так и в розницу. Прежде всего для бетонных заводов и дорожно-строительных компаний мы обеспечиваем постоянные, стабильные поставки — с индивидуальным ценовым предложением по объёму заказа.',
      },
    ],
    benefitsTitle: {
      az: 'Atsep təchizatında üstünlüklərimiz',
      en: 'Why source gravel mix from us',
      ru: 'Наши преимущества в поставках ПГС',
    },
    benefits: [
      {
        title: { az: 'Beton zavodlarına təchizat', en: 'Supply to concrete plants', ru: 'Поставки бетонным заводам' },
        text: {
          az: 'İstehsal üçün davamlı və stabil atsep axını.',
          en: 'A continuous, stable flow of gravel mix for production.',
          ru: 'Постоянный и стабильный поток ПГС для производства.',
        },
      },
      {
        title: { az: 'Böyük həcm imkanı', en: 'Large-volume capacity', ru: 'Возможность больших объёмов' },
        text: {
          az: 'İri sifarişlərin operativ qəbulu və yüklənməsi.',
          en: 'Prompt acceptance and loading of large orders.',
          ru: 'Оперативный приём и отгрузка крупных заказов.',
        },
      },
      {
        title: { az: 'Operativ logistika', en: 'Efficient logistics', ru: 'Оперативная логистика' },
        text: {
          az: 'Bakı və Abşeron üzrə vaxtında çatdırılma.',
          en: 'On-time delivery across Baku and Absheron.',
          ru: 'Своевременная доставка по Баку и Абшерону.',
        },
      },
      {
        title: { az: 'Fərdi qiymət', en: 'Personal pricing', ru: 'Индивидуальная цена' },
        text: {
          az: 'Həcmə uyğun sərfəli kommersiya şərtləri.',
          en: 'Competitive commercial terms based on the volume.',
          ru: 'Выгодные коммерческие условия с учётом объёма.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'Atsep nədir və nə üçün istifadə olunur?',
          en: 'What is atsep and what is it used for?',
          ru: 'Что такое ПГС и для чего она используется?',
        },
        a: {
          az: 'Atsep — təbii qum-çınqıl qarışığıdır. Beton istehsalında doldurucu material kimi, yol və meydança əsaslarında, ərazi dolğusunda, drenaj və altqurum işlərində istifadə olunur.',
          en: 'Atsep is a natural sand-gravel mix. It is used as a filler material in concrete production, in road and site bases, in area backfilling, and in drainage and substructure work.',
          ru: 'ПГС (атсеп) — природная песчано-гравийная смесь. Используется как заполнитель в производстве бетона, в основаниях дорог и площадок, при отсыпке территории, в дренажных работах и подготовке оснований.',
        },
      },
      {
        q: {
          az: 'Beton zavodları üçün atsep təchizatı mümkündürmü?',
          en: 'Do you supply gravel mix to concrete plants?',
          ru: 'Возможны ли поставки ПГС бетонным заводам?',
        },
        a: {
          az: 'Bəli. Beton istehsalı ilə məşğul olan zavodlar üçün böyük həcmli, davamlı atsep təchizatı təklif edirik. Daimi əməkdaşlıqda fərdi kommersiya şərtləri razılaşdırılır.',
          en: 'Yes. We offer large-volume, continuous atsep supply for plants engaged in concrete production. For ongoing cooperation, individual commercial terms are agreed.',
          ru: 'Да. Заводам, занимающимся производством бетона, мы предлагаем крупные постоянные поставки ПГС. При постоянном сотрудничестве согласовываются индивидуальные коммерческие условия.',
        },
      },
      {
        q: {
          az: 'Atsepi böyük həcmdə sifariş etmək olarmı?',
          en: 'Can I order gravel mix in large volumes?',
          ru: 'Можно ли заказать ПГС в больших объёмах?',
        },
        a: {
          az: 'Bəli, iri həcmli sifarişlər bizim əsas istiqamətlərimizdəndir. Tikinti və yol şirkətləri, podratçılar üçün davamlı təchizat və operativ logistika təşkil edirik.',
          en: 'Yes, large-volume orders are one of our core lines of business. We arrange continuous supply and efficient logistics for construction and road companies and contractors.',
          ru: 'Да, крупные заказы — одно из наших основных направлений. Для строительных и дорожных компаний и подрядчиков мы организуем постоянные поставки и оперативную логистику.',
        },
      },
      {
        q: {
          az: 'Atsep çatdırılması hansı əraziləri əhatə edir?',
          en: 'Which areas does gravel mix delivery cover?',
          ru: 'Какие районы охватывает доставка ПГС?',
        },
        a: {
          az: 'Bakı və Abşeron yarımadası üzrə çatdırılma edirik. Novxanıdakı zavodumuz Abşeron zonasına yaxın olduğu üçün çatdırılma operativdir.',
          en: 'We deliver across Baku and the Absheron peninsula. Our plant in Novkhani is close to the Absheron zone, so delivery is fast.',
          ru: 'Мы доставляем по Баку и Абшеронскому полуострову. Наш завод в Новханы находится рядом с зоной Абшерона, поэтому доставка оперативна.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Atsep satışı üçün qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a quote for gravel mix (atsep).',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на ПГС.',
    },
  },

  {
    slug: '/seben-satisi',
    seo: {
      title: {
        az: 'Şeben Satışı və Çatdırılması Bakıda | NOVXANI BETON',
        en: 'Crushed Stone for Sale and Delivery in Baku | NOVXANI BETON',
        ru: 'Продажа и доставка щебня в Баку | NOVXANI BETON',
      },
      description: {
        az: 'Bakı və Abşeronda şeben (qırma daş) satışı. Beton, özül və yol işləri üçün şeben — topdan və pərakəndə sifariş, operativ çatdırılma. NOVXANI BETON-dan qiymət alın.',
        en: 'Crushed stone for sale across Baku and Absheron. Crushed stone for concrete, foundation and road work — wholesale and retail orders, prompt delivery. Get a quote from NOVXANI BETON.',
        ru: 'Продажа щебня по Баку и Абшерону. Щебень для бетона, фундаментных и дорожных работ — оптовые и розничные заказы, оперативная доставка. Узнайте цену в NOVXANI BETON.',
      },
    },
    crumb: { az: 'Şeben Satışı', en: 'Crushed Stone for Sale', ru: 'Продажа щебня' },
    h1: { az: 'Şeben Satışı', en: 'Crushed Stone for Sale', ru: 'Продажа щебня' },
    tagline: {
      az: 'Beton, özül və yol işləri üçün şeben (qırma daş / çınqıl) — Bakı və Abşeron üzrə operativ çatdırılma ilə.',
      en: 'Crushed stone (gravel) for concrete, foundation and road work — with prompt delivery across Baku and Absheron.',
      ru: 'Щебень (дроблёный камень) для бетона, фундаментных и дорожных работ — с оперативной доставкой по Баку и Абшерону.',
    },
    hero: {
      image: imgSeben,
      alt: {
        az: 'NOVXANI BETON şeben satışı — boz qırma daş yığını',
        en: 'NOVXANI BETON crushed stone for sale — a pile of grey crushed rock',
        ru: 'Продажа щебня NOVXANI BETON — куча серого дроблёного камня',
      },
    },
    intro: [
      {
        az: 'Şeben (qırma daş; danışıqda “çınqıl” və ya “qırmadaş” da deyilir) betonun möhkəmliyini təmin edən əsas iri doldurucudur. Betondan başqa özül tökmələrində, yol örtüyünün əsasında, drenaj sistemlərində və abadlıq işlərində geniş istifadə olunur.',
        en: 'Crushed stone (in everyday speech also called “gravel” or “crushed rock”) is the main coarse aggregate that gives concrete its strength. Beyond concrete, it is widely used in foundation pours, road pavement bases, drainage systems and landscaping.',
        ru: 'Щебень (в разговорной речи также «гравий» или «дроблёный камень») — основной крупный заполнитель, обеспечивающий прочность бетона. Помимо бетона, он широко используется при заливке фундаментов, в основаниях дорожного покрытия, дренажных системах и благоустройстве.',
      },
      {
        az: 'NOVXANI BETON şebeni öz istehsalında işlədir və eyni keyfiyyətli materialı fərdi sifarişçilərə, tikinti şirkətlərinə və beton zavodlarına satır. Topdan və pərakəndə satış, Bakı və Abşeron üzrə operativ çatdırılma ilə — qiymət həcmə uyğun fərdi hesablanır.',
        en: 'NOVXANI BETON uses this crushed stone in its own production and sells the same quality material to private customers, construction companies and concrete plants. Wholesale and retail sales, with prompt delivery across Baku and Absheron — the price is calculated individually based on the volume.',
        ru: 'NOVXANI BETON использует этот щебень в собственном производстве и продаёт тот же качественный материал частным заказчикам, строительным компаниям и бетонным заводам. Опт и розница, с оперативной доставкой по Баку и Абшерону — цена рассчитывается индивидуально в зависимости от объёма.',
      },
    ],
    benefitsTitle: {
      az: 'Şeben satışında üstünlüklərimiz',
      en: 'Why buy crushed stone from us',
      ru: 'Наши преимущества в продаже щебня',
    },
    benefits: [
      {
        title: { az: 'Birbaşa zavoddan', en: 'Straight from the plant', ru: 'Напрямую с завода' },
        text: {
          az: 'Beton istehsalımızda işlətdiyimiz eyni şeben.',
          en: 'The same crushed stone we use in our own concrete production.',
          ru: 'Тот же щебень, который мы используем в собственном производстве бетона.',
        },
      },
      {
        title: { az: 'Topdan və pərakəndə', en: 'Wholesale and retail', ru: 'Опт и розница' },
        text: {
          az: 'Fərdi tikintidən zavod təchizatına qədər.',
          en: 'From private builds to plant-scale supply.',
          ru: 'От частной стройки до снабжения заводов.',
        },
      },
      {
        title: { az: 'Operativ çatdırılma', en: 'Prompt delivery', ru: 'Оперативная доставка' },
        text: {
          az: 'Bakı və Abşeron üzrə vaxtında, ünvana.',
          en: 'On time, to your address across Baku and Absheron.',
          ru: 'Вовремя и по адресу, по Баку и Абшерону.',
        },
      },
      {
        title: { az: 'Fərdi qiymət', en: 'Personal pricing', ru: 'Индивидуальная цена' },
        text: {
          az: 'Həcmə görə şəffaf və sərfəli təklif.',
          en: 'A transparent, competitive quote based on the volume.',
          ru: 'Прозрачное и выгодное предложение с учётом объёма.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'Şeben nədir?',
          en: 'What is crushed stone?',
          ru: 'Что такое щебень?',
        },
        a: {
          az: 'Şeben — qırma daşdır (danışıqda çınqıl və ya qırmadaş da adlandırılır). Beton və dəmir-beton konstruksiyalarında əsas iri doldurucu kimi istifadə olunur.',
          en: 'Crushed stone is crushed rock (in everyday speech also called gravel). It is used as the main coarse aggregate in concrete and reinforced-concrete structures.',
          ru: 'Щебень — это дроблёный камень (в разговорной речи также называют гравием). Используется как основной крупный заполнитель в бетонных и железобетонных конструкциях.',
        },
      },
      {
        q: {
          az: 'Şeben betonda nə üçün lazımdır?',
          en: 'Why does concrete need crushed stone?',
          ru: 'Зачем щебень нужен в бетоне?',
        },
        a: {
          az: 'Şeben betonun daşıyıcı skeletini yaradır və möhkəmliyini artırır. Özül, monolit tökmə, yol əsası və drenaj işlərində də əvəzsizdir.',
          en: 'Crushed stone forms the load-bearing skeleton of concrete and increases its strength. It is also indispensable in foundations, monolithic pours, road bases and drainage work.',
          ru: 'Щебень образует несущий скелет бетона и повышает его прочность. Он также незаменим в фундаментах, монолитной заливке, основаниях дорог и дренажных работах.',
        },
      },
      {
        q: {
          az: 'Şebeni topdan almaq olarmı?',
          en: 'Can I buy crushed stone wholesale?',
          ru: 'Можно ли купить щебень оптом?',
        },
        a: {
          az: 'Bəli. Beton zavodları, tikinti və yol şirkətləri üçün böyük həcmli, davamlı şeben təchizatı təşkil edirik. Daimi sifarişçilər üçün fərdi şərtlər tətbiq olunur.',
          en: 'Yes. We arrange large-volume, continuous crushed stone supply for concrete plants and construction and road companies. Regular customers get individual terms.',
          ru: 'Да. Для бетонных заводов, строительных и дорожных компаний мы организуем крупные постоянные поставки щебня. Для постоянных заказчиков действуют индивидуальные условия.',
        },
      },
      {
        q: {
          az: 'Şeben çatdırılması hara edilir?',
          en: 'Where do you deliver crushed stone?',
          ru: 'Куда осуществляется доставка щебня?',
        },
        a: {
          az: 'Bakı və Abşeron yarımadası üzrə. Zavodumuz Novxanıda olduğundan Abşeron istiqamətinə çatdırılma xüsusilə operativdir. Ünvanınızı bildirin — qrafiki dəqiqləşdirək.',
          en: 'Across Baku and the Absheron peninsula. Since our plant is in Novkhani, delivery towards Absheron is especially fast. Tell us your address and we will agree on a schedule.',
          ru: 'По Баку и Абшеронскому полуострову. Наш завод находится в Новханы, поэтому доставка в направлении Абшерона особенно оперативна. Сообщите ваш адрес — согласуем график.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Şeben satışı üçün qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a quote for crushed stone.',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на щебень.',
    },
  },
];

export const getMaterialPage = (slug) => MATERIAL_PAGES.find((p) => p.slug === slug);
