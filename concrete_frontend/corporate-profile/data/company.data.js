/**
 * NOVXANI BETON — korporativ profil MƏZMUN FAYLI.
 *
 * Bütün mətn, əlaqə məlumatları və şəkil seçimi burada saxlanılır —
 * dizaynı dəyişmədən yeniləmək üçün yalnız bu faylı redaktə edin və
 * `node corporate-profile/generate.js` əmrini yenidən işə salın.
 *
 * Qayda: [[ikiqat mötərizə]] içindəki mətnlər PLACEHOLDER-dir — şirkət
 * faktiki məlumatı təqdim edəndə əvəz olunmalıdır. generate.js hər buraxılışda
 * qalan placeholder-lərin siyahısını çap edir.
 *
 * Mənbə: bütün faktlar novxanibeton.az saytının öz məzmunundan götürülüb.
 * Uydurma statistika, sertifikat, layihə və ya müştəri adı ƏLAVƏ ETMƏYİN.
 */
module.exports = {
  meta: {
    docTitle: 'NOVXANI BETON — Korporativ Profil',
    docLang: 'az',
  },

  output: {
    pdfFileName: 'NOVXANI-BETON-korporativ-profil.pdf',
  },

  company: {
    name: 'NOVXANI BETON',
    // Üz qabığı üçün istənilən şüar (sifarişçinin tələbi ilə).
    // Qeyd: saytın hero şüarı "Beton və Tikinti Materiallarının Etibarlı Ünvanı"dır.
    tagline: 'Möhkəm təməlin etibarlı ünvanı',
    // Şüarın sonunda vurğulanan (kəhrəba rəngli, ayrıca sətir) hissə.
    taglineAccent: 'etibarlı ünvanı',
    coverSubtitle:
      'Hazır beton istehsalı və tikinti materiallarının təchizatı — 2018-ci ildən Bakı və Abşeron üzrə',
    foundedYear: '2018',
    location: 'Novxanı, Bakı',
  },

  contacts: {
    phoneDisplay: '+994 50 620 95 84',
    phoneHref: 'tel:+994506209584',
    email: 'info@novxanibeton.az',
    emailHref: 'mailto:info@novxanibeton.az',
    websiteDisplay: 'novxanibeton.az',
    websiteUrl: 'https://novxanibeton.az',
    whatsappDisplay: '+994 50 326 03 43',
    whatsappUrl: 'https://wa.me/994503260343',
    addressLine: 'Novxanı, Bakı, Azərbaycan',
    addressExtra: '[[Dəqiq küçə ünvanı — şirkət təqdim edəndə əlavə olunacaq]]',
    mapUrl: 'https://maps.app.goo.gl/uKEuWDVuWqoAccEZA',
  },

  qr: {
    websiteUrl: 'https://novxanibeton.az',
    whatsappUrl: 'https://wa.me/994503260343',
    darkColor: '#12161f',
  },

  /**
   * Şəkillər: yeganə təsdiqlənmiş REAL şirkət fotosu slider4.jpg-dir
   * (Novxanı zavodu, qürub işığında). Profil bilərəkdən yalnız həmin fotonun
   * müxtəlif kadrlarından istifadə edir — stok foto İŞLƏDİLMİR.
   * crop dəyərləri orijinal şəklin hissələridir (0..1).
   */
  images: [
    {
      source: 'src/app/Pages/Slider/img/slider4.jpg',
      output: 'cover.jpg',
      crop: { left: 0.42, top: 0, width: 0.53, height: 1 },
      width: 1500,
      quality: 80,
    },
    {
      source: 'src/app/Pages/Slider/img/slider4.jpg',
      output: 'plant-wide.jpg',
      crop: { left: 0, top: 0.3, width: 1, height: 0.7 },
      width: 1600,
      quality: 78,
    },
    {
      source: 'src/app/Pages/Slider/img/slider4.jpg',
      output: 'materials-bins.jpg',
      crop: { left: 0, top: 0.62, width: 0.55, height: 0.38 },
      width: 1200,
      quality: 78,
    },
    {
      source: 'src/app/Pages/Slider/img/slider4.jpg',
      output: 'silos.jpg',
      crop: { left: 0.56, top: 0.42, width: 0.36, height: 0.58 },
      width: 1000,
      quality: 78,
    },
  ],

  pages: {
    /* ------------------------------------------------ Səhifə 1 — Üz qabığı */
    cover: {
      eyebrow: 'Korporativ profil',
      photoCaption: 'Novxanı istehsal sahəsi',
    },

    /* ------------------------------------------------ Səhifə 2 — Haqqımızda */
    about: {
      eyebrow: 'Haqqımızda',
      title: 'NOVXANI BETON haqqında',
      paragraphs: [
        'NOVXANI BETON 2018-ci ildən Bakının Novxanı qəsəbəsində fəaliyyət göstərən hazır beton istehsalçısı və tikinti materialları təchizatçısıdır. Müasir zavodda, laboratoriya nəzarəti altında M100–M450 markalı betonlar istehsal edirik, qum, atsep və şeben təchizatını həyata keçiririk.',
        'Həm fərdi sifarişçilərlə, həm də tikinti şirkətləri və podratçılarla işləyirik: kiçik həyət tökmələrindən çoxmərtəbəli binaların davamlı beton təchizatına qədər. Çatdırılma, nasoslama və tərəzi xidməti daxil olmaqla tam xidmət paketini bir ünvandan təqdim edirik.',
      ],
      facts: [
        { value: '2018', label: 'fəaliyyətə başlama ili' },
        { value: 'Novxanı', label: 'istehsal sahəsi — Bakı' },
        { value: 'M100–M450', label: 'beton istehsal xətti' },
        { value: '7/24', label: 'iş rejimi, gecə tökmələri daxil' },
      ],
      segmentsTitle: 'Kimlərlə işləyirik',
      segments: [
        {
          name: 'Fərdi sifarişçilər',
          text: 'Ev, həyət və kiçik obyekt tikintisi üçün beton və material sifarişləri.',
        },
        {
          name: 'Tikinti şirkətləri və podratçılar',
          text: 'Yaşayış, kommersiya və sənaye layihələri üçün qrafik üzrə davamlı təchizat.',
        },
        {
          name: 'Beton zavodları',
          text: 'Qum, atsep və şeben üzrə böyük həcmli, sabit material təchizatı.',
        },
      ],
      serviceAreaTitle: 'Xidmət ərazisi',
      serviceAreaText:
        'Bakı və bütün Abşeron yarımadası — Novxanı, Masazır, Xırdalan və Sumqayıt istiqamətlərinə xüsusilə operativ çatdırılma.',
    },

    /* ------------------------------------------------ Səhifə 3 — Beton məhsulları */
    products: {
      eyebrow: 'Beton məhsulları',
      title: 'M100–M450 beton markaları',
      intro:
        'Bütün markalar GOST 26633 tələblərinə uyğun, avtomatik dozalama və laboratoriya nəzarəti altında istehsal olunur. Qarışığın resepti layihə tələbinə əsasən təyin edilir.',
      grades: [
        {
          grade: 'M100',
          cls: 'B7.5',
          use: 'Hazırlıq betonu — təməlaltı hamarlayıcı qat, döşəməaltı hazırlıq qatı və bordür yatağı üçün sərfəli seçim.',
        },
        {
          grade: 'M150',
          cls: 'B10',
          use: 'Hazırlıq və yüngül konstruktiv işlər — piyada səkiləri, bordürlər, yüngül yüklü həyət döşəmələri və kiçik özüllər.',
        },
        {
          grade: 'M200',
          cls: 'B15',
          use: 'Ümumi məqsədli marka — ev və qaraj döşəmələri, həyət betonlaması, yüngül birmərtəbəli tikililərin özülləri.',
        },
        {
          grade: 'M250',
          cls: 'B20',
          use: 'Orta yüklü konstruksiyalar — fərdi evlərin zolaq təməlləri, daşıyıcı divarlar və orta yüklü monolit elementlər.',
        },
        {
          grade: 'M300',
          cls: 'B22.5',
          use: 'Fərdi tikintidə ən çox sifariş olunan konstruktiv marka — monolit təməllər, plitələr, sütunlar və mərtəbəarası örtüklər.',
        },
        {
          grade: 'M350',
          cls: 'B25',
          use: 'Çoxmərtəbəli binaların karkas elementləri — sütunlar, riqellər, diafraqmalar və yüksək yüklü örtük plitələri.',
        },
        {
          grade: 'M400',
          cls: 'B30',
          use: 'Yüksək möhkəmlikli beton — körpülər, hidrotexniki qurğular və sənaye obyektlərinin ağır yüklü konstruksiyaları.',
        },
        {
          grade: 'M450',
          cls: 'B35',
          use: 'Xəttin ən yüksək markası — layihədə B35 tələb olunan xüsusi mühəndis konstruksiyaları; hər partiya sınaqla müşayiət olunur.',
        },
      ],
      footnote:
        'Marka seçimində texniki məsləhət pulsuzdur — layihə sənədlərinə əsasən düzgün markanı birlikdə müəyyən edirik.',
    },

    /* ------------------------------------------------ Səhifə 4 — Xidmətlər */
    services: {
      eyebrow: 'Xidmətlər',
      title: 'Tam xidmət paketi — bir ünvandan',
      intro:
        'İstehsaldan tökmə nöqtəsinə qədər bütün prosesi öz üzərimizə götürürük: beton, çatdırılma, nasos və sənədləşmə bir təchizatçıdan.',
      items: [
        {
          icon: 'plant',
          name: 'Hazır beton istehsalı',
          text: 'M100–M450 markalı betonların müasir zavodda, avtomatik dozalama və laboratoriya nəzarəti ilə istehsalı.',
        },
        {
          icon: 'truck',
          name: 'Beton çatdırılması',
          text: 'Bakı və Abşeron üzrə mikserlərlə dəqiq qrafik üzrə çatdırılma — marşrut tökmə vaxtına uyğun planlaşdırılır.',
        },
        {
          icon: 'pump',
          name: 'Beton nasoslanması',
          text: 'Yuxarı mərtəbələrə və mikserin yaxınlaşa bilmədiyi sahələrə fasiləsiz tökmə; betonla birlikdə və ya ayrıca sifariş olunur.',
        },
        {
          icon: 'schedule',
          name: 'Qrafik üzrə fasiləsiz təchizat',
          text: 'Böyük tökmələrdə fasiləsiz mikser axını — razılaşdırılmış qrafik üzrə gündəlik təchizat.',
        },
        {
          icon: 'night',
          name: 'Gecə beton tökmələri',
          text: '7/24 iş rejimi — gecə tökmələri və təcili sifarişlər üçün istehsal və çatdırılma.',
        },
        {
          icon: 'scale',
          name: 'Tərəzi xidməti',
          text: 'Körpü tipli avtomobil tərəzisində dəqiq çəkmə və çəki qəbzi ilə sənədləşmə — kənar şirkətlər və fərdi sürücülər üçün də açıqdır.',
        },
        {
          icon: 'advice',
          name: 'Texniki məsləhət',
          text: 'Layihəyə uyğun beton markasının seçimində pulsuz peşəkar dəstək — həcm, nasos ehtiyacı və qrafik üzrə tövsiyələr.',
        },
      ],
      techNotes: {
        title: 'Faydalı texniki qeydlər',
        items: [
          'Standart mikserin tutumu adətən 7–10 m³ olur.',
          'Hazır qarışıq istehsaldan sonra adətən 1,5–2 saat ərzində tökülməlidir — marşrut və qrafik buna uyğun planlaşdırılır.',
          'Adi armaturlu betonun çəkisi təqribən 2,4 t/m³ təşkil edir.',
        ],
      },
    },

    /* ------------------------------------------------ Səhifə 5 — Tikinti materialları */
    materials: {
      eyebrow: 'Tikinti materialları',
      title: 'Qum, atsep və şeben',
      intro:
        'Öz istehsalımızda istifadə etdiyimiz keyfiyyətdə materialları birbaşa Novxanı zavodundan təqdim edirik — topdan və pərakəndə.',
      items: [
        {
          name: 'Qum',
          text: 'Beton və sement qarışıqları, hörgü və suvaq işləri, özülaltı yastıq qatı və abadlıq işləri üçün tikinti qumu.',
          spec: '[[Fraksiya və texniki göstəricilər — şirkət təqdim edəndə əlavə olunacaq]]',
        },
        {
          name: 'Atsep',
          text: 'Təbii qum-çınqıl qarışığı — beton istehsalında doldurucu, yol və meydança əsasları, ərazi dolğusu və drenaj işləri üçün.',
          spec: '[[Fraksiya və texniki göstəricilər — şirkət təqdim edəndə əlavə olunacaq]]',
        },
        {
          name: 'Şeben (qırmadaş)',
          text: 'Betonun iri doldurucusu — dəmir-beton konstruksiyalar, özül və monolit tökmələr, yol əsasları və drenaj sistemləri üçün.',
          spec: '[[Fraksiya və texniki göstəricilər — şirkət təqdim edəndə əlavə olunacaq]]',
        },
      ],
      supplyTitle: 'Təchizat modeli',
      supplyPoints: [
        'Topdan və pərakəndə satış — sabit minimum sifariş həddi qoyulmur, şərtlər həcmə görə müəyyən olunur.',
        'Bakı və Abşeron üzrə operativ çatdırılma.',
        'Beton zavodları və tikinti şirkətləri üçün davamlı, sabit material axını.',
      ],
      photoCaption: 'Zavodun doldurucu bunkerləri — Novxanı istehsal sahəsi',
      note: 'Digər beton zavodlarına atsep və başqa materiallar üzrə davamlı təchizat mümkündür — şərtlər həcmə uyğun fərdi razılaşdırılır.',
    },

    /* ------------------------------------------------ Səhifə 6 — Keyfiyyətə nəzarət */
    quality: {
      eyebrow: 'Keyfiyyətə nəzarət',
      title: 'Laboratoriya nəzarəti və sənədləşmə',
      intro:
        'Keyfiyyət təsadüfə buraxılmır: resept laboratoriyada təyin olunur, hər partiya istehsal zamanı yoxlanılır, möhkəmlik isə normativ qaydada sınaqdan keçirilir.',
      steps: [
        {
          name: 'Resept',
          text: 'Qarışığın tərkibi laboratoriyada, layihə tələbinə uyğun təyin olunur.',
        },
        {
          name: 'İstehsal nəzarəti',
          text: 'Avtomatik dozalama; hər partiya buraxılışdan əvvəl yoxlanılır.',
        },
        {
          name: 'Nümunə götürülməsi',
          text: 'İstehsal olunan betondan kub nümunələri hazırlanır.',
        },
        {
          name: '28 günlük sınaq',
          text: 'Kub nümunələri 28-ci gündə pres altında sınaqdan keçirilir — layihə möhkəmliyinə uyğunluq yoxlanılır.',
        },
        {
          name: 'Sənədləşmə',
          text: 'Sınaq nəticələri layihə və tikinti nəzarəti üçün sənədlə təqdim olunur.',
        },
      ],
      points: [
        'İstehsal GOST 26633 tələblərinə uyğun aparılır.',
        'Hər partiya laboratoriya nəzarətindən keçir və sənədləşdirilir.',
        'Sınaq nəticələri və markalar üzrə texniki məlumat sorğu əsasında sənədlə təqdim olunur.',
        'Tender və layihə sənədləri üçün lazım olan texniki məlumat təqdim olunur.',
      ],
      note: '[[Sertifikat adları və nömrələri — şirkət sənədləri təqdim edəndə əlavə olunacaq]]',
      docsNote:
        'Sınaq nəticələri layihə və tikinti nəzarəti tələb etdikdə partiya üzrə sənədlə təqdim olunur; tərəzi xidmətində hər ölçmə çəki qəbzi ilə rəsmiləşdirilir.',
    },

    /* ------------------------------------------------ Səhifə 7 — B2B əməkdaşlıq */
    b2b: {
      eyebrow: 'B2B əməkdaşlıq',
      title: 'Tikinti şirkətləri üçün müqavilə əsaslı təchizat',
      intro:
        'Layihənin həcminə və müddətinə uyğun kommersiya təklifi hazırlayır, razılaşdırılmış qrafik üzrə davamlı təchizatı təmin edirik.',
      points: [
        {
          name: 'Müqavilə əsaslı əməkdaşlıq',
          text: 'Layihənin ümumi həcminə və müddətinə uyğun rəsmiləşdirilmiş şərtlər.',
        },
        {
          name: 'Layihəyə uyğun kommersiya şərtləri',
          text: 'Marka, həcm, məsafə və nasos ehtiyacına görə fərdi hesablanmış təklif.',
        },
        {
          name: 'Qrafik üzrə gündəlik təchizat',
          text: 'Razılaşdırılmış qrafik üzrə gündəlik təchizat; eyni gündə paralel obyektlərə çatdırılmanı planlaşdırmaq mümkündür.',
        },
        {
          name: 'Həcmə əsaslanan təkliflər',
          text: 'Böyük həcmli və davamlı layihələr üçün xüsusi kommersiya şərtləri.',
        },
        {
          name: 'Hər şey bir təchizatçıdan',
          text: 'Beton, çatdırılma, nasoslama və tikinti materialları — vahid məsuliyyət, vahid əlaqə nöqtəsi.',
        },
      ],
      processTitle: 'Əməkdaşlıq prosesi',
      process: [
        {
          name: 'Layihə məlumatı',
          text: 'Marka, təxmini həcm, ünvan və qrafik barədə məlumatı bizə göndərirsiniz.',
        },
        {
          name: 'Qiymət təklifi',
          text: 'Pulsuz və öhdəliksiz fərdi təklif — beton və çatdırılma ayrıca və şəffaf şəkildə göstərilir.',
        },
        {
          name: 'Müqavilə və qrafik',
          text: 'Şərtlər rəsmiləşdirilir, təchizat qrafiki obyekt üzrə razılaşdırılır.',
        },
        {
          name: 'Davamlı təchizat',
          text: 'Qrafik üzrə fasiləsiz təchizat və hər partiya üzrə laboratoriya nəzarəti.',
        },
      ],
    },

    /* ------------------------------------------------ Səhifə 8 — Əlaqə */
    contact: {
      eyebrow: 'Əlaqə',
      ctaTitle: 'Layihəniz üçün fərdi qiymət təklifi alın',
      ctaText:
        'Marka, təxmini həcm və çatdırılma ünvanını bildirin — qısa müddətdə pulsuz və öhdəliksiz təklif hazırlayarıq.',
      qrWebsiteLabel: 'Veb-sayt',
      qrWebsiteHint: 'novxanibeton.az',
      qrWhatsappLabel: 'WhatsApp',
      qrWhatsappHint: 'Birbaşa yazışma üçün skan edin',
      workingHours: '7/24 fəaliyyətdəyik — gecə tökmələri daxil',
    },
  },
};
