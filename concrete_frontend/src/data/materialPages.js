/* ============================================================
   Dedicated per-material SEO landing pages (spokes) that support the
   main /tikinti-materiallari hub. Rendered by the shared <ServiceDetail/>
   template. Each targets a single product's search intent with unique,
   non-duplicated Azerbaijani content.

   Content rules: only business-confirmed facts (Novxanı plant, Bakı &
   Abşeron delivery, wholesale + retail, supply to individuals /
   contractors / concrete plants, 7/24). No invented fractions, prices,
   minimum order quantities or technical specifications.
   ============================================================ */
import imgQum from '../app/Pages/img/material-qum.webp';
import imgAtsep from '../app/Pages/img/material-atsep.webp';
import imgSeben from '../app/Pages/img/material-seben.webp';

const orderSteps = [
  { title: 'Materialı seçin', text: 'Ehtiyacınız olan materialı və təxmini həcmi (ton, m³ və ya maşın sayı) müəyyənləşdirin.' },
  { title: 'Sorğu göndərin', text: 'Zəng, WhatsApp və ya sayt forması ilə həcmi və çatdırılma ünvanını bildirin.' },
  { title: 'Fərdi təklif alın', text: 'Həcmə və məsafəyə uyğun qiymət təklifini alırsınız — pulsuz və öhdəliksiz.' },
  { title: 'Çatdırılma', text: 'Razılaşdırılmış vaxtda material ünvanınıza çatdırılır.' },
];

export const MATERIAL_PAGES = [
  {
    slug: '/qum-satisi',
    seo: {
      title: 'Qum Satışı və Çatdırılması Bakıda | NOVXANI BETON',
      description:
        'Bakı və Abşeronda tikinti qumunun satışı və çatdırılması. Beton, suvaq və hörgü işləri üçün qum — fərdi və topdan sifariş. NOVXANI BETON-dan fərdi qiymət təklifi alın.',
    },
    crumb: 'Qum Satışı',
    h1: 'Qum Satışı',
    tagline:
      'Beton, suvaq və hörgü işləri üçün tikinti qumu — Bakı və Abşeron üzrə çatdırılma ilə, topdan və pərakəndə.',
    hero: { image: imgQum, alt: 'NOVXANI BETON qum satışı — tikinti qumunun yaxın planı' },
    intro: [
      'Qum tikintinin bünövrə materialıdır — beton və məhlul qarışıqlarından tutmuş suvaq, hörgü və abadlıq işlərinə qədər demək olar ki, hər mərhələdə istifadə olunur. NOVXANI BETON öz beton istehsalında işlətdiyi keyfiyyətli qumu birbaşa Novxanı zavodundan satışa çıxarır.',
      'Qum satışını həm pərakəndə (fərdi ev tikənlər və ustalar üçün bir-iki maşın), həm də topdan (tikinti şirkətləri və beton zavodları üçün davamlı təchizat) qaydasında həyata keçiririk. Hər sifarişin qiyməti həcmə və çatdırılma ünvanına görə fərdi hesablanır.',
    ],
    benefitsTitle: 'Qum satışında üstünlüklərimiz',
    benefits: [
      { title: 'Birbaşa zavoddan', text: 'Vasitəçi yoxdur — qum Novxanı zavodundan yüklənir.' },
      { title: 'Topdan və pərakəndə', text: 'Bir maşından davamlı iri həcmli təchizata qədər.' },
      { title: 'Operativ çatdırılma', text: 'Bakı və Abşeron üzrə ünvana, dəqiq qrafiklə.' },
      { title: 'Fərdi qiymət', text: 'Həcmə görə sərfəli, şəffaf qiymət təklifi.' },
    ],
    stepsTitle: 'Qum sifarişi necə verilir',
    steps: orderSteps,
    faqs: [
      {
        q: 'Qum hansı işlərdə istifadə olunur?',
        a: 'Qum beton və sement məhlullarının hazırlanmasında, hörgü və suvaq işlərində, özül altı yastıq qatının salınmasında və abadlıq işlərində istifadə olunur. Konkret işiniz üçün hansı qumun uyğun olduğunu bizimlə məsləhətləşə bilərsiniz.',
      },
      {
        q: 'Qumu topdan sifariş etmək olarmı?',
        a: 'Bəli. Tikinti şirkətləri, podratçılar və beton zavodları üçün böyük həcmli, davamlı qum təchizatı təşkil edirik. Daimi əməkdaşlıqda həcmə uyğun xüsusi şərtlər müəyyən olunur.',
      },
      {
        q: 'Qumu Bakının və Abşeronun hansı ərazilərinə çatdırırsınız?',
        a: 'Bakı və bütün Abşeron yarımadası üzrə çatdırılma edirik. Zavodumuz Novxanıda yerləşdiyi üçün Abşeron zonasına xüsusilə operativ çatırıq. Konkret ünvanınız üçün bizimlə əlaqə saxlayın.',
      },
      {
        q: 'Qum satışının qiyməti necə müəyyən olunur?',
        a: 'Qiymət sifariş həcmindən və çatdırılma məsafəsindən asılıdır. Buna görə hər sifariş üçün fərdi təklif hazırlayırıq — sorğu göndərmək pulsuzdur və heç bir öhdəlik yaratmır.',
      },
    ],
    related: [
      { to: '/tikinti-materiallari', label: 'Bütün tikinti materialları' },
      { to: '/seben-satisi', label: 'Şeben satışı' },
      { to: '/atsep-satisi', label: 'Atsep satışı' },
      { to: '/hazir-beton-satisi', label: 'Hazır beton satışı' },
      { to: '/calculator', label: 'Beton miqdarını hesabla' },
    ],
    whatsappText: 'Salam! Qum satışı üçün qiymət təklifi almaq istəyirəm.',
  },

  {
    slug: '/atsep-satisi',
    seo: {
      title: 'Atsep Satışı və Sifarişi Bakıda | NOVXANI BETON',
      description:
        'Bakı və Abşeronda atsep (qum-çınqıl qarışığı) satışı. Beton istehsalı, yol əsası və dolğu işləri üçün atsep — topdan sifariş və çatdırılma. NOVXANI BETON-dan qiymət alın.',
    },
    crumb: 'Atsep Satışı',
    h1: 'Atsep Satışı',
    tagline:
      'Beton istehsalı, yol əsası və dolğu işləri üçün atsep (qum-çınqıl qarışığı) — topdan təchizat və çatdırılma ilə.',
    hero: { image: imgAtsep, alt: 'NOVXANI BETON atsep satışı — qum-çınqıl qarışığının yaxın planı' },
    intro: [
      'Atsep (bəzən “otsev” kimi də deyilir) təbii qum-çınqıl qarışığıdır və tikintidə çoxməqsədli material kimi geniş istifadə olunur. Beton istehsalında doldurucu, yol və meydança əsaslarının salınmasında, dolğu və hamarlama işlərində əvəzsizdir.',
      'NOVXANI BETON atsepi həm iri həcmli topdan, həm də pərakəndə qaydada satır. Xüsusilə beton zavodları və yol-tikinti şirkətləri üçün davamlı, stabil təchizat imkanı yaradırıq — sifariş həcminə uyğun fərdi qiymət təklifi ilə.',
    ],
    benefitsTitle: 'Atsep təchizatında üstünlüklərimiz',
    benefits: [
      { title: 'Beton zavodlarına təchizat', text: 'İstehsal üçün davamlı və stabil atsep axını.' },
      { title: 'Böyük həcm imkanı', text: 'İri sifarişlərin operativ qəbulu və yüklənməsi.' },
      { title: 'Operativ logistika', text: 'Bakı və Abşeron üzrə vaxtında çatdırılma.' },
      { title: 'Fərdi qiymət', text: 'Həcmə uyğun sərfəli kommersiya şərtləri.' },
    ],
    stepsTitle: 'Atsep sifarişi necə verilir',
    steps: orderSteps,
    faqs: [
      {
        q: 'Atsep nədir və nə üçün istifadə olunur?',
        a: 'Atsep — təbii qum-çınqıl qarışığıdır. Beton istehsalında doldurucu material kimi, yol və meydança əsaslarında, ərazi dolğusunda, drenaj və altqurum işlərində istifadə olunur.',
      },
      {
        q: 'Beton zavodları üçün atsep təchizatı mümkündürmü?',
        a: 'Bəli. Beton istehsalı ilə məşğul olan zavodlar üçün böyük həcmli, davamlı atsep təchizatı təklif edirik. Daimi əməkdaşlıqda fərdi kommersiya şərtləri razılaşdırılır.',
      },
      {
        q: 'Atsepi böyük həcmdə sifariş etmək olarmı?',
        a: 'Bəli, iri həcmli sifarişlər bizim əsas istiqamətlərimizdəndir. Tikinti və yol şirkətləri, podratçılar üçün davamlı təchizat və operativ logistika təşkil edirik.',
      },
      {
        q: 'Atsep çatdırılması hansı əraziləri əhatə edir?',
        a: 'Bakı və Abşeron yarımadası üzrə çatdırılma edirik. Novxanıdakı zavodumuz Abşeron zonasına yaxın olduğu üçün çatdırılma operativdir.',
      },
    ],
    related: [
      { to: '/tikinti-materiallari', label: 'Bütün tikinti materialları' },
      { to: '/qum-satisi', label: 'Qum satışı' },
      { to: '/seben-satisi', label: 'Şeben satışı' },
      { to: '/hazir-beton-satisi', label: 'Hazır beton satışı' },
      { to: '/contact', label: 'Topdan təchizat üçün əlaqə' },
    ],
    whatsappText: 'Salam! Atsep satışı üçün qiymət təklifi almaq istəyirəm.',
  },

  {
    slug: '/seben-satisi',
    seo: {
      title: 'Şeben Satışı və Çatdırılması Bakıda | NOVXANI BETON',
      description:
        'Bakı və Abşeronda şeben (qırma daş) satışı. Beton, özül və yol işləri üçün şeben — topdan və pərakəndə sifariş, operativ çatdırılma. NOVXANI BETON-dan qiymət alın.',
    },
    crumb: 'Şeben Satışı',
    h1: 'Şeben Satışı',
    tagline:
      'Beton, özül və yol işləri üçün şeben (qırma daş / çınqıl) — Bakı və Abşeron üzrə operativ çatdırılma ilə.',
    hero: { image: imgSeben, alt: 'NOVXANI BETON şeben satışı — boz qırma daş yığını' },
    intro: [
      'Şeben (qırma daş; danışıqda “çınqıl” və ya “qırmadaş” da deyilir) betonun möhkəmliyini təmin edən əsas iri doldurucudur. Betondan başqa özül tökmələrində, yol örtüyünün əsasında, drenaj sistemlərində və abadlıq işlərində geniş istifadə olunur.',
      'NOVXANI BETON şebeni öz istehsalında işlədir və eyni keyfiyyətli materialı fərdi sifarişçilərə, tikinti şirkətlərinə və beton zavodlarına satır. Topdan və pərakəndə satış, Bakı və Abşeron üzrə operativ çatdırılma ilə — qiymət həcmə uyğun fərdi hesablanır.',
    ],
    benefitsTitle: 'Şeben satışında üstünlüklərimiz',
    benefits: [
      { title: 'Birbaşa zavoddan', text: 'Beton istehsalımızda işlətdiyimiz eyni şeben.' },
      { title: 'Topdan və pərakəndə', text: 'Fərdi tikintidən zavod təchizatına qədər.' },
      { title: 'Operativ çatdırılma', text: 'Bakı və Abşeron üzrə vaxtında, ünvana.' },
      { title: 'Fərdi qiymət', text: 'Həcmə görə şəffaf və sərfəli təklif.' },
    ],
    stepsTitle: 'Şeben sifarişi necə verilir',
    steps: orderSteps,
    faqs: [
      {
        q: 'Şeben nədir?',
        a: 'Şeben — qırma daşdır (danışıqda çınqıl və ya qırmadaş da adlandırılır). Beton və dəmir-beton konstruksiyalarında əsas iri doldurucu kimi istifadə olunur.',
      },
      {
        q: 'Şeben betonda nə üçün lazımdır?',
        a: 'Şeben betonun daşıyıcı skeletini yaradır və möhkəmliyini artırır. Özül, monolit tökmə, yol əsası və drenaj işlərində də əvəzsizdir.',
      },
      {
        q: 'Şebeni topdan almaq olarmı?',
        a: 'Bəli. Beton zavodları, tikinti və yol şirkətləri üçün böyük həcmli, davamlı şeben təchizatı təşkil edirik. Daimi sifarişçilər üçün fərdi şərtlər tətbiq olunur.',
      },
      {
        q: 'Şeben çatdırılması hara edilir?',
        a: 'Bakı və Abşeron yarımadası üzrə. Zavodumuz Novxanıda olduğundan Abşeron istiqamətinə çatdırılma xüsusilə operativdir. Ünvanınızı bildirin — qrafiki dəqiqləşdirək.',
      },
    ],
    related: [
      { to: '/tikinti-materiallari', label: 'Bütün tikinti materialları' },
      { to: '/qum-satisi', label: 'Qum satışı' },
      { to: '/atsep-satisi', label: 'Atsep satışı' },
      { to: '/hazir-beton-satisi', label: 'Hazır beton satışı' },
      { to: '/calculator', label: 'Beton miqdarını hesabla' },
    ],
    whatsappText: 'Salam! Şeben satışı üçün qiymət təklifi almaq istəyirəm.',
  },
];

export const getMaterialPage = (slug) => MATERIAL_PAGES.find((p) => p.slug === slug);
