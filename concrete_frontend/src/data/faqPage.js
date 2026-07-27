/* ============================================================
   Central FAQ page content — targets question-form searches
   ("betonun kubu neçəyədir", "fundament üçün hansı beton",
   "atsep nədir" və s.). Grouped by topic; the page emits ONE
   combined FAQPage JSON-LD for all groups.

   Content rules: only business-confirmed facts. No prices, no
   invented specs — pricing questions always resolve to the
   individual-quote flow.

   i18n: every user-visible string is a trilingual object
   { az, en, ru } resolved by the shared t() helper.
   ============================================================ */

export const FAQ_GROUPS = [
  {
    title: {
      az: 'Sifariş və çatdırılma',
      en: 'Ordering and delivery',
      ru: 'Заказ и доставка',
    },
    items: [
      {
        q: {
          az: 'Beton sifarişi necə verilir?',
          en: 'How do I order concrete?',
          ru: 'Как заказать бетон?',
        },
        a: {
          az: 'Üç sadə addım: həcmi beton kalkulyatoru ilə dəqiqləşdirin, zəng (+994 50 620 95 84) və ya WhatsApp ilə marka, həcm və ünvanı bildirin, fərdi qiymət təklifini təsdiqləyin. Beton razılaşdırılmış vaxtda mikserlə ünvana çatdırılır.',
          en: 'Three simple steps: confirm the volume with the concrete calculator, tell us the grade, volume and address by phone (+994 50 620 95 84) or WhatsApp, and approve the individual quote. The concrete is delivered to your address by mixer truck at the agreed time.',
          ru: 'Три простых шага: уточните объём с помощью бетонного калькулятора, сообщите марку, объём и адрес по телефону (+994 50 620 95 84) или в WhatsApp и подтвердите индивидуальное ценовое предложение. Бетон доставляется миксером по адресу в согласованное время.',
        },
      },
      {
        q: {
          az: 'Hansı ərazilərə beton çatdırırsınız?',
          en: 'Which areas do you deliver concrete to?',
          ru: 'В какие районы вы доставляете бетон?',
        },
        a: {
          az: 'Bakı və bütün Abşeron yarımadası üzrə çatdırılma edirik. Zavodumuz Novxanıda yerləşdiyi üçün Abşeron zonasına — Novxanı, Masazır, Xırdalan, Sumqayıt istiqamətlərinə xüsusilə operativ çatırıq.',
          en: 'We deliver across Baku and the entire Absheron peninsula. Since our plant is located in Novkhani, we are especially quick to reach the Absheron zone — the Novkhani, Masazir, Khirdalan and Sumgait directions.',
          ru: 'Осуществляем доставку по Баку и всему Абшеронскому полуострову. Поскольку наш завод находится в Новханы, в зону Абшерона — в направлениях Новханы, Масазыр, Хырдалан, Сумгаит — доставляем особенно оперативно.',
        },
      },
      {
        q: {
          az: 'Betonun qiymətinə çatdırılma daxildirmi?',
          en: 'Is delivery included in the concrete price?',
          ru: 'Входит ли доставка в цену бетона?',
        },
        a: {
          az: 'Təklifdə beton və çatdırılma ayrıca, şəffaf göstərilir və ünvanınıza görə dəqiq hesablanır — gizli xərc yoxdur.',
          en: 'In the quote, concrete and delivery are shown separately and transparently, calculated precisely for your address — no hidden costs.',
          ru: 'В предложении бетон и доставка указываются отдельно и прозрачно, с точным расчётом по вашему адресу — без скрытых расходов.',
        },
      },
      {
        q: {
          az: 'Gecə və həftəsonu beton sifariş etmək olar?',
          en: 'Can I order concrete at night or on weekends?',
          ru: 'Можно ли заказать бетон ночью или в выходные?',
        },
        a: {
          az: 'Bəli, 7/24 fəaliyyət göstəririk. Gecə tökmələri və təcili sifarişlər üçün qrafiki əvvəlcədən razılaşdırmaq kifayətdir.',
          en: 'Yes, we operate 24/7. For night pours and urgent orders it is enough to agree on the schedule in advance.',
          ru: 'Да, мы работаем 24/7. Для ночных заливок и срочных заказов достаточно заранее согласовать график.',
        },
      },
      {
        q: {
          az: 'Beton sifarişi üçün minimum həcm nə qədərdir?',
          en: 'What is the minimum volume for a concrete order?',
          ru: 'Каков минимальный объём заказа бетона?',
        },
        a: {
          az: 'Sabit minimum hədd qoymuruq — şərtlər həcmə görə müəyyən olunur. Kiçik həcmli sifarişlər üçün də əlaqə saxlayın, sizin üçün optimal variantı təklif edək.',
          en: 'We do not set a fixed minimum — terms are determined by volume. Contact us even for small orders and we will offer the optimal option for you.',
          ru: 'Фиксированного минимума мы не устанавливаем — условия определяются объёмом. Свяжитесь с нами даже при небольших объёмах, и мы предложим оптимальный вариант.',
        },
      },
    ],
  },
  {
    title: {
      az: 'Marka seçimi',
      en: 'Choosing a grade',
      ru: 'Выбор марки',
    },
    items: [
      {
        q: {
          az: 'Fundament üçün hansı beton markası lazımdır?',
          en: 'Which concrete grade do I need for a foundation?',
          ru: 'Какая марка бетона нужна для фундамента?',
        },
        a: {
          az: 'Yüngül 1–2 mərtəbəli evlərin zolaq təməli üçün adətən M250, monolit plitə təməl və 2+ mərtəbəli evlər üçün M300 tövsiyə olunur. Dəqiq seçim layihədən və qrunt şəraitindən asılıdır — pulsuz məsləhət veririk.',
          en: 'For strip foundations of light 1–2 storey houses M250 is usually used; for monolithic slab foundations and houses of 2+ storeys M300 is recommended. The exact choice depends on the design and soil conditions — we provide free advice.',
          ru: 'Для ленточного фундамента лёгких домов в 1–2 этажа обычно используется М250, для монолитного плитного фундамента и домов от 2 этажей рекомендуется М300. Точный выбор зависит от проекта и грунтовых условий — мы бесплатно консультируем.',
        },
      },
      {
        q: {
          az: 'M300 və M400 betonun fərqi nədir?',
          en: 'What is the difference between M300 and M400 concrete?',
          ru: 'В чём разница между бетоном М300 и М400?',
        },
        a: {
          az: 'M300 (B22.5) 22.5 MPa, M400 (B30) 30 MPa möhkəmliyə malikdir. M400 körpü, hidrotexniki və xüsusi yüklü konstruksiyalar üçündür; adi yaşayış tikintisində M300 adətən kifayətdir və daha sərfəlidir.',
          en: 'M300 (B22.5) has a strength of 22.5 MPa, M400 (B30) — 30 MPa. M400 is intended for bridges, hydraulic structures and specially loaded structures; in ordinary residential construction M300 is usually sufficient and more economical.',
          ru: 'М300 (B22.5) имеет прочность 22,5 МПа, М400 (B30) — 30 МПа. М400 предназначен для мостов, гидротехнических сооружений и особо нагруженных конструкций; в обычном жилищном строительстве, как правило, достаточно М300 — и это экономичнее.',
        },
      },
      {
        q: {
          az: 'M və B hərfləri nə deməkdir?',
          en: 'What do the letters M and B mean?',
          ru: 'Что означают буквы М и B?',
        },
        a: {
          az: 'M — betonun möhkəmlik markasıdır (kqq/sm²), B — möhkəmlik sinfidir (MPa). Məsələn, M300 = B22.5 = 22.5 MPa. Hər iki işarələnmə eyni betonu ifadə edir.',
          en: 'M is the concrete strength grade (kgf/cm²), B is the strength class (MPa). For example, M300 = B22.5 = 22.5 MPa. Both designations describe the same concrete.',
          ru: 'М — марка бетона по прочности (кгс/см²), B — класс прочности (МПа). Например, М300 = B22.5 = 22,5 МПа. Оба обозначения описывают один и тот же бетон.',
        },
      },
      {
        q: {
          az: 'Ev tikintisi üçün hansı beton markası seçilməlidir?',
          en: 'Which concrete grade should be chosen for house construction?',
          ru: 'Какую марку бетона выбрать для строительства дома?',
        },
        a: {
          az: 'Tipik bölgü belədir: hazırlıq qatları M100, döşəmə və həyət M150–M200, zolaq təməl M250, monolit təməl, sütun və örtüklər M300, çoxmərtəbəli karkas M350. Betonun istifadə sahələri səhifəmizdə ətraflı bölgü var.',
          en: 'The typical breakdown: preparation layers M100, floors and yards M150–M200, strip foundations M250, monolithic foundations, columns and slabs M300, multi-storey frames M350. Our concrete applications page has a detailed breakdown.',
          ru: 'Типичное распределение: подготовительные слои — М100, полы и двор — М150–М200, ленточный фундамент — М250, монолитный фундамент, колонны и перекрытия — М300, многоэтажный каркас — М350. Подробная разбивка — на нашей странице областей применения бетона.',
        },
      },
    ],
  },
  {
    title: {
      az: 'Hesablama',
      en: 'Calculation',
      ru: 'Расчёт',
    },
    items: [
      {
        q: {
          az: 'Beton kubu necə hesablanır?',
          en: 'How is concrete volume calculated?',
          ru: 'Как рассчитать кубатуру бетона?',
        },
        a: {
          az: 'Həcm = uzunluq × en × qalınlıq (metrlə). Məsələn, 10 m × 10 m sahəyə 15 sm qalınlıqda beton üçün: 10 × 10 × 0.15 = 15 m³. Saytdakı beton kalkulyatoru bunu plitə, zolaq təməl və sütunlar üçün avtomatik hesablayır.',
          en: 'Volume = length × width × thickness (in metres). For example, for a 10 m × 10 m area with a 15 cm concrete layer: 10 × 10 × 0.15 = 15 m³. The concrete calculator on our site does this automatically for slabs, strip foundations and columns.',
          ru: 'Объём = длина × ширина × толщина (в метрах). Например, для площадки 10 м × 10 м при толщине бетона 15 см: 10 × 10 × 0,15 = 15 м³. Бетонный калькулятор на сайте автоматически рассчитывает это для плит, ленточных фундаментов и колонн.',
        },
      },
      {
        q: {
          az: '100 kvadrat sahəyə neçə kub beton gedir?',
          en: 'How many cubic metres of concrete does a 100 m² area need?',
          ru: 'Сколько кубов бетона нужно на 100 квадратных метров?',
        },
        a: {
          az: 'Qalınlıqdan asılıdır: 10 sm-də 10 m³, 15 sm-də 15 m³, 20 sm-də 20 m³. Ehtiyat üçün adətən 5–10% əlavə nəzərdə tutulur.',
          en: 'It depends on the thickness: 10 m³ at 10 cm, 15 m³ at 15 cm, 20 m³ at 20 cm. A reserve of 5–10% is usually added.',
          ru: 'Зависит от толщины: при 10 см — 10 м³, при 15 см — 15 м³, при 20 см — 20 м³. Обычно закладывают запас 5–10%.',
        },
      },
      {
        q: {
          az: '1 kub beton neçə tondur?',
          en: 'How many tonnes is 1 m³ of concrete?',
          ru: 'Сколько тонн весит 1 куб бетона?',
        },
        a: {
          az: 'Adi armaturlu beton təxminən 2,4 ton/m³-dür. Yəni 10 m³ sifariş ≈ 24 ton deməkdir.',
          en: 'Normal reinforced concrete weighs about 2.4 t/m³. So a 10 m³ order means roughly 24 tonnes.',
          ru: 'Обычный армированный бетон весит примерно 2,4 т/м³. То есть заказ 10 м³ — это около 24 тонн.',
        },
      },
      {
        q: {
          az: 'Bir mikser neçə kub beton aparır?',
          en: 'How many cubic metres does one mixer truck carry?',
          ru: 'Сколько кубов бетона везёт один миксер?',
        },
        a: {
          az: 'Standart mikserlərin tutumu adətən 7–10 m³ aralığındadır. Kalkulyatorumuz həcmlə birlikdə lazımi mikser sayını da göstərir.',
          en: 'Standard mixer trucks usually hold 7–10 m³. Along with the volume, our calculator also shows the number of mixers required.',
          ru: 'Вместимость стандартных миксеров обычно составляет 7–10 м³. Наш калькулятор вместе с объёмом показывает и необходимое количество миксеров.',
        },
      },
    ],
  },
  {
    title: {
      az: 'Keyfiyyət və tökmə',
      en: 'Quality and pouring',
      ru: 'Качество и заливка',
    },
    items: [
      {
        q: {
          az: 'Betonun keyfiyyəti necə yoxlanılır?',
          en: 'How is concrete quality checked?',
          ru: 'Как проверяется качество бетона?',
        },
        a: {
          az: 'İstehsal GOST 26633 üzrə aparılır: hər partiya laboratoriya nəzarətindən keçir, nümunə kublar 28 günlük möhkəmlik sınağı ilə yoxlanılır. Tələb olunduqda nəticələr sənədlə təqdim olunur.',
          en: 'Production follows GOST 26633: every batch passes laboratory control, and sample cubes are tested for 28-day strength. Results are provided with documentation on request.',
          ru: 'Производство ведётся по ГОСТ 26633: каждая партия проходит лабораторный контроль, контрольные кубики испытываются на прочность в возрасте 28 суток. По требованию результаты предоставляются документально.',
        },
      },
      {
        q: {
          az: 'Beton neçə günə bərkiyir?',
          en: 'How many days does concrete take to harden?',
          ru: 'За сколько дней твердеет бетон?',
        },
        a: {
          az: 'Beton ilk günlərdə sürətlə möhkəmlənir və 28-ci gündə layihə möhkəmliyinin standart göstəricisinə çatır. Qəlibin açılması və yükləmə vaxtı konstruksiyadan və hava şəraitindən asılıdır.',
          en: 'Concrete gains strength quickly in the first days and reaches its standard design strength on day 28. Formwork removal and loading times depend on the structure and weather conditions.',
          ru: 'Бетон быстро набирает прочность в первые дни и на 28-й день достигает нормативной проектной прочности. Сроки распалубки и нагружения зависят от конструкции и погодных условий.',
        },
      },
      {
        q: {
          az: 'Beton yolda nə qədər qala bilər?',
          en: 'How long can concrete stay in transit?',
          ru: 'Сколько бетон может находиться в пути?',
        },
        a: {
          az: 'Hazır qarışıq adətən istehsaldan sonra 1,5–2 saat ərzində tökülməlidir (hava şəraitindən asılı). Buna görə marşrut və tökmə qrafikini əvvəlcədən planlaşdırırıq.',
          en: 'A ready mix should normally be poured within 1.5–2 hours of production (depending on the weather). That is why we plan the route and pouring schedule in advance.',
          ru: 'Готовую смесь обычно нужно уложить в течение 1,5–2 часов после производства (в зависимости от погоды). Поэтому маршрут и график заливки мы планируем заранее.',
        },
      },
      {
        q: {
          az: 'Qışda və yağışda beton tökmək olar?',
          en: 'Can concrete be poured in winter or in rain?',
          ru: 'Можно ли заливать бетон зимой и в дождь?',
        },
        a: {
          az: 'Mümkündür, lakin əlavə tədbirlər tələb edir: soyuqda müvafiq qarışıq və qoruma, yağışda təzə səthin örtülməsi. Tökmə tarixini planlaşdırarkən bizimlə məsləhətləşin.',
          en: 'It is possible, but requires extra measures: a suitable mix and protection in cold weather, covering the fresh surface in rain. Consult us when planning the pouring date.',
          ru: 'Возможно, но требует дополнительных мер: в холод — соответствующая смесь и защита, в дождь — укрытие свежей поверхности. При планировании даты заливки проконсультируйтесь с нами.',
        },
      },
      {
        q: {
          az: 'Beton pompası nə üçün lazımdır?',
          en: 'What is a concrete pump needed for?',
          ru: 'Для чего нужен бетононасос?',
        },
        a: {
          az: 'Mikser tökmə nöqtəsinə birbaşa yaxınlaşa bilmirsə — hündür mərtəbələr, dar həyətlər, binanın arxası — nasos betonu borularla birbaşa nöqtəyə ötürür. Böyük plitələrin fasiləsiz tökülməsində də üstünlükdür.',
          en: 'If the mixer cannot get directly to the pouring point — upper floors, narrow yards, the back of a building — the pump delivers concrete straight to the point through pipes. It is also an advantage for continuous pouring of large slabs.',
          ru: 'Если миксер не может подъехать непосредственно к месту заливки — верхние этажи, узкие дворы, задняя часть здания — насос подаёт бетон по трубам прямо в точку. Он также даёт преимущество при непрерывной заливке больших плит.',
        },
      },
    ],
  },
  {
    title: {
      az: 'Tikinti materialları',
      en: 'Construction materials',
      ru: 'Строительные материалы',
    },
    items: [
      {
        q: {
          az: 'Atsep nədir və harada istifadə olunur?',
          en: 'What is gravel mix (atsep) and where is it used?',
          ru: 'Что такое ПГС (атсеп) и где она используется?',
        },
        a: {
          az: 'Atsep (bəzən “otsev” deyilir) — təbii qum-çınqıl qarışığıdır. Beton istehsalında doldurucu, yol və meydança əsaslarında, ərazi dolğusunda və drenaj işlərində istifadə olunur.',
          en: '“Atsep” (sometimes called “otsev”) is a natural sand-gravel mix. It is used as a filler in concrete production, in road and site bases, in area backfilling and in drainage work.',
          ru: 'Атсеп (иногда говорят «отсев») — это природная песчано-гравийная смесь (ПГС). Используется как заполнитель при производстве бетона, в основаниях дорог и площадок, при отсыпке территории и в дренажных работах.',
        },
      },
      {
        q: {
          az: 'Çınqıl və şeben eyni şeydir?',
          en: 'Are gravel and crushed stone the same thing?',
          ru: 'Гравий и щебень — это одно и то же?',
        },
        a: {
          az: 'Gündəlik danışıqda çox vaxt eyni mənada işlədilir. Şeben qırma daşdır (süni xırdalanmış), çınqıl isə təbii dairəvi daş dənələridir. Betonda əsas iri doldurucu kimi şeben istifadə olunur.',
          en: 'In everyday speech they are often used interchangeably. Crushed stone is artificially crushed rock, while gravel consists of naturally rounded stone grains. In concrete, crushed stone is used as the main coarse aggregate.',
          ru: 'В повседневной речи их часто употребляют как синонимы. Щебень — это искусственно дроблёный камень, а гравий — природные окатанные каменные зёрна. В бетоне в качестве основного крупного заполнителя используется щебень.',
        },
      },
      {
        q: {
          az: 'Beton üçün hansı qum istifadə olunur?',
          en: 'What kind of sand is used for concrete?',
          ru: 'Какой песок используется для бетона?',
        },
        a: {
          az: 'Beton qarışığı üçün gil qatışığı az olan, təmiz tikinti qumu tələb olunur. Öz istehsalımızda işlətdiyimiz keyfiyyətli qumu satışa da çıxarırıq — beton, suvaq və hörgü işləri üçün.',
          en: 'A concrete mix requires clean construction sand with a low clay content. The quality sand we use in our own production is also available for sale — for concrete, plastering and masonry work.',
          ru: 'Для бетонной смеси нужен чистый строительный песок с низким содержанием глины. Качественный песок, который мы используем в собственном производстве, также продаём — для бетона, штукатурных и кладочных работ.',
        },
      },
      {
        q: {
          az: 'Qum, atsep və şebeni topdan almaq olar?',
          en: 'Can sand, gravel mix and crushed stone be bought wholesale?',
          ru: 'Можно ли купить песок, ПГС и щебень оптом?',
        },
        a: {
          az: 'Bəli. Tikinti şirkətləri, podratçılar və beton zavodları üçün davamlı topdan təchizat təşkil edirik — Bakı və Abşeron üzrə çatdırılma ilə. Həcmə uyğun fərdi kommersiya şərtləri tətbiq olunur.',
          en: 'Yes. We organise continuous wholesale supply for construction companies, contractors and concrete plants — with delivery across Baku and Absheron. Individual commercial terms apply depending on volume.',
          ru: 'Да. Мы организуем постоянные оптовые поставки для строительных компаний, подрядчиков и бетонных заводов — с доставкой по Баку и Абшерону. В зависимости от объёма действуют индивидуальные коммерческие условия.',
        },
      },
    ],
  },
];

export const ALL_FAQ_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);
