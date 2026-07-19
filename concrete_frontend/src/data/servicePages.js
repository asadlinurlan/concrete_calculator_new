/* ============================================================
   Service landing pages — single source of truth.
   Each entry drives a full SEO page rendered by <ServiceDetail/>:
   hero, intro, benefits, ordering steps, FAQ (+FAQPage JSON-LD),
   related internal links and per-page metadata.

   Content rules: only claims confirmed by the business are stated
   (GOST 26633, 28-day testing, M100–M450, 7/24, Novxanı plant,
   Bakı & Abşeron delivery). No invented specs or prices.
   ============================================================ */
import imgHazirBeton from '../app/Pages/img/service-1.png';
import imgCatdirilma from '../app/Pages/img/claus-grunstaudl-1_DvZyR3dRk-unsplash.jpg';
import imgNasoslama from '../app/Pages/img/service-2.webp';
import imgTerezi from '../app/Pages/img/service-terezi-home.jpg';
import imgQiymet from '../app/Pages/img/d-c-rnqRdfYyywM-unsplash.jpg';

export const SERVICE_PAGES = [
  {
    slug: '/hazir-beton-satisi',
    seo: {
      title: 'Hazır Beton Satışı — M100–M450 Markaları | NOVXANI BETON',
      description:
        'Bakı və Abşeronda laboratoriya nəzarətli hazır beton satışı. M100–M450 markaları GOST 26633 üzrə istehsal olunur, mikserlərlə ünvana çatdırılır. Fərdi qiymət təklifi alın.',
    },
    crumb: 'Hazır Beton Satışı',
    h1: 'Hazır Beton Satışı',
    tagline:
      'M100–M450 markalı, laboratoriya nəzarətli hazır beton — Bakı və Abşeron üzrə çatdırılma ilə',
    hero: { image: imgHazirBeton, alt: 'Tikinti sahəsində hazır betonun tökülməsi' },
    intro: [
      'Novxanı Beton 2018-ci ildən Bakı və Abşeron ərazisində tikinti şirkətləri və fərdi sifarişçilər üçün hazır beton istehsal edir. Bütün markalar müasir zavodda, laboratoriya nəzarəti altında hazırlanır və GOST 26633 tələblərinə uyğun 28 günlük möhkəmlik sınağından keçirilir.',
      'Təməldən çoxmərtəbəli binaya qədər hər növ layihə üçün doğru markanı seçməyinizə kömək edirik: hamarlama qatı üçün M100, monolit təməl və plitələr üçün M300, xüsusi mühəndis konstruksiyaları üçün M450. Hansı markanın lazım olduğuna əmin deyilsinizsə, mütəxəssislərimiz pulsuz məsləhət verir.',
    ],
    benefitsTitle: 'Niyə Novxanı Beton?',
    benefits: [
      { title: 'Laboratoriya nəzarəti', text: 'Hər partiya istehsal zamanı yoxlanılır, 28 günlük kub sınağı aparılır.' },
      { title: 'Tam marka xətti', text: 'M100-dən M450-yə qədər bütün möhkəmlik sinifləri bir zavoddan.' },
      { title: 'Vaxtında çatdırılma', text: '7/24 iş rejimi — beton tökmə qrafikiniz pozulmur.' },
      { title: 'Texniki məsləhət', text: 'Layihənizə uyğun marka seçimində pulsuz peşəkar dəstək.' },
    ],
    showGrades: true,
    stepsTitle: 'Sifariş prosesi',
    steps: [
      { title: 'Əlaqə və məsləhət', text: 'Zəng edin və ya WhatsApp-la yazın — həcmi və markanı birlikdə dəqiqləşdirək.' },
      { title: 'Qiymət təklifi', text: 'Həcm, marka və ünvana görə fərdi təklif alırsınız.' },
      { title: 'İstehsal', text: 'Beton sifarişinizə uyğun, laboratoriya nəzarəti ilə hazırlanır.' },
      { title: 'Çatdırılma və tökmə', text: 'Mikserlər razılaşdırılmış vaxtda obyektə çatır; ehtiyac olduqda nasos xidməti təşkil olunur.' },
    ],
    faqs: [
      {
        q: 'Hansı beton markası mənə lazımdır?',
        a: 'Marka konstruksiyanın yükündən asılıdır: hamarlama və altlıq üçün M100–M150, döşəmə və ümumi işlər üçün M200, monolit təməl, plitə və sütunlar üçün M300, çoxmərtəbəli karkas üçün M350 və yuxarı. Dəqiq seçim üçün Beton Markaları səhifəmizə baxın və ya bizimlə məsləhətləşin.',
      },
      {
        q: '1 m³ beton neçə tondur?',
        a: 'Adi armaturlu beton təxminən 2,4 ton/m³-dür. Layihəniz üçün lazımi həcmi və çəkini saytdakı pulsuz beton kalkulyatoru ilə bir dəqiqəyə hesablaya bilərsiniz.',
      },
      {
        q: 'Betonun keyfiyyətinə necə zəmanət verilir?',
        a: 'İstehsal GOST 26633 tələblərinə uyğun aparılır, markalar 28 günlük möhkəmlik sınağından keçirilir və laboratoriya nəzarəti altında buraxılır.',
      },
      {
        q: 'Qiymətlər nə üçün saytda göstərilmir?',
        a: 'Beton qiyməti marka, həcm, çatdırılma məsafəsi və nasos ehtiyacından asılı olaraq dəyişir. Buna görə hər layihə üçün fərdi təklif hazırlayırıq — bu, əksər halda sizin üçün daha sərfəlidir. Ətraflı məlumat üçün Beton Qiymətləri səhifəsinə baxın.',
      },
    ],
    related: [
      { to: '/calculator', label: 'Beton miqdarını hesabla' },
      { to: '/products', label: 'Beton markalarına bax (M100–M450)' },
      { to: '/beton-catdirilmasi', label: 'Beton çatdırılması haqqında' },
      { to: '/beton-qiymetleri', label: 'Qiymət necə formalaşır?' },
      { to: '/tikinti-materiallari', label: 'Qum, atsep və şeben satışı' },
    ],
    whatsappText: 'Salam! Hazır beton sifarişi üçün qiymət təklifi almaq istəyirəm.',
  },

  {
    slug: '/beton-catdirilmasi',
    seo: {
      title: 'Beton Çatdırılması — Bakı və Abşeron | NOVXANI BETON',
      description:
        'Mikserlərlə ünvana beton çatdırılması: Bakı, Abşeron və Novxanı üzrə. 7/24 iş rejimi, dəqiq qrafik, tökmə vaxtına uyğun marşrut planlaşdırması. Sifariş üçün əlaqə saxlayın.',
    },
    crumb: 'Beton Çatdırılması',
    h1: 'Beton Çatdırılması',
    tagline: 'Bakı və Abşeron üzrə mikserlərlə dəqiq qrafikli çatdırılma — 7/24',
    hero: { image: imgCatdirilma, alt: 'Beton mikserləri çatdırılma üçün hazır vəziyyətdə' },
    intro: [
      'Betonun keyfiyyəti yalnız zavodda deyil, yolda da qorunmalıdır. Hazır qarışıq müəyyən vaxt ərzində tökülməlidir — gecikmə möhkəmliyə birbaşa təsir edir. Buna görə hər çatdırılmanı marşrut və qrafik üzrə dəqiq planlaşdırırıq.',
      'Zavodumuz Novxanıda yerləşir — Bakı və Abşeronun əksər tikinti zonalarına qısa müddətdə çatırıq. Böyük həcmli tökmələrdə mikserlərin ardıcıl axını təşkil olunur ki, işiniz fasiləsiz davam etsin.',
    ],
    benefitsTitle: 'Çatdırılma üstünlüklərimiz',
    benefits: [
      { title: '7/24 çatdırılma', text: 'Gecə tökmələri və təcili sifarişlər üçün də işləyirik.' },
      { title: 'Dəqiq qrafik', text: 'Mikserlər razılaşdırılmış vaxt aralığında obyektdə olur.' },
      { title: 'Ardıcıl axın', text: 'Böyük tökmələrdə fasiləsiz beton axını planlaşdırılır.' },
      { title: 'Yaxın məsafə', text: 'Novxanı zavodundan Abşeronun əsas zonalarına sürətli çatış.' },
    ],
    stepsTitle: 'Çatdırılma necə işləyir',
    steps: [
      { title: 'Sifariş', text: 'Həcm, marka və ünvanı bildirirsiniz — telefon və ya WhatsApp ilə.' },
      { title: 'Qrafik razılaşması', text: 'Tökmə vaxtına uyğun çatdırılma qrafiki müəyyən olunur.' },
      { title: 'İstehsal və yüklənmə', text: 'Beton çatdırılma vaxtına uyğunlaşdırılaraq hazırlanır.' },
      { title: 'Obyektdə boşaltma', text: 'Mikser təyin olunan vaxtda çatır; ehtiyac olduqda nasosla tökmə təşkil olunur.' },
    ],
    faqs: [
      {
        q: 'Hansı ərazilərə çatdırırsınız?',
        a: 'Bakı və Abşeron yarımadası üzrə çatdırılma edirik. Zavodumuz Novxanıda yerləşdiyi üçün Abşeron zonasına xüsusilə sürətli çatırıq. Konkret ünvanınız üçün bizimlə əlaqə saxlayın.',
      },
      {
        q: 'Beton yolda nə qədər qala bilər?',
        a: 'Hazır qarışıq adətən istehsaldan sonra 1,5–2 saat ərzində tökülməlidir (hava şəraitindən asılı olaraq). Marşrut və qrafiki məhz buna görə əvvəlcədən planlaşdırırıq.',
      },
      {
        q: 'Bir mikserdə nə qədər beton gəlir?',
        a: 'Standart mikserlərin tutumu adətən 7–10 m³ aralığındadır. Layihəniz üçün lazımi mikser sayını saytdakı beton kalkulyatoru avtomatik hesablayır.',
      },
      {
        q: 'Gecə və həftəsonu çatdırılma mümkündürmü?',
        a: 'Bəli, 7/24 fəaliyyət göstəririk — qrafiki əvvəlcədən razılaşdırmaq kifayətdir.',
      },
    ],
    related: [
      { to: '/hazir-beton-satisi', label: 'Hazır beton satışı haqqında' },
      { to: '/beton-nasoslama', label: 'Beton nasoslama xidməti' },
      { to: '/calculator', label: 'Neçə mikser lazımdır? Hesabla' },
      { to: '/contact', label: 'Çatdırılma üçün əlaqə saxla' },
    ],
    whatsappText: 'Salam! Beton çatdırılması üçün qiymət təklifi almaq istəyirəm.',
  },

  {
    slug: '/beton-nasoslama',
    seo: {
      title: 'Beton Nasoslama Xidməti — Hündür və Çətin Sahələr | NOVXANI BETON',
      description:
        'Beton nasosu ilə hündürmərtəbəli binalara və çətin əlçatan sahələrə beton tökülməsi. Sürətli, təmiz və bərabər tökmə. Bakı və Abşeron üzrə xidmət.',
    },
    crumb: 'Beton Nasoslama',
    h1: 'Beton Nasoslama Xidməti',
    tagline: 'Hündür mərtəbələrə və çətin əlçatan sahələrə sürətli, fasiləsiz beton tökülməsi',
    hero: { image: imgNasoslama, alt: 'Beton nasosu tikinti meydançasında işləyir' },
    intro: [
      'Mikserin birbaşa yaxınlaşa bilmədiyi obyektlərdə — hündür mərtəbələr, dar həyətlər, binanın arxa hissəsi — beton nasosu ən səmərəli həlldir. Nasos betonu borular vasitəsilə birbaşa tökmə nöqtəsinə ötürür.',
      'Nasosla tökmə həm sürətlidir, həm də keyfiyyətlidir: beton fasiləsiz axınla, bərabər paylanır; əl daşımalarında yaranan itki və ləngimələr aradan qalxır. Layihənizə uyğun nasos növünü birlikdə müəyyən edirik.',
    ],
    benefitsTitle: 'Nasosla tökmənin üstünlükləri',
    benefits: [
      { title: 'Hündürlüyə tökmə', text: 'Çoxmərtəbəli binaların yuxarı mərtəbələrinə birbaşa çatdırılma.' },
      { title: 'Çətin sahələrə çıxış', text: 'Mikserin girə bilmədiyi dar və uzaq nöqtələrə tökmə.' },
      { title: 'Sürətli, fasiləsiz axın', text: 'Böyük həcmlər qısa vaxtda, soyuq tikiş riski olmadan tökülür.' },
      { title: 'Az itki, təmiz sahə', text: 'Material itkisi və meydança çirklənməsi minimuma enir.' },
    ],
    stepsTitle: 'Xidmət necə təşkil olunur',
    steps: [
      { title: 'Obyekt məlumatı', text: 'Mərtəbə sayı, məsafə və tökmə həcmi haqqında məlumat verirsiniz.' },
      { title: 'Nasos seçimi və təklif', text: 'Obyektə uyğun texnika müəyyən olunur, fərdi qiymət təqdim edilir.' },
      { title: 'Quraşdırma', text: 'Nasos razılaşdırılmış vaxtda obyektdə qurulur.' },
      { title: 'Tökmə və yığışdırma', text: 'Beton fasiləsiz vurulur; iş bitdikdən sonra sahə təhvil verilir.' },
    ],
    faqs: [
      {
        q: 'Nasos nə vaxt lazımdır?',
        a: 'Yuxarı mərtəbələrə tökmələrdə, mikserin obyektə yaxınlaşa bilmədiyi hallarda və böyük sahəli plitələrin fasiləsiz tökülməsində nasos tövsiyə olunur.',
      },
      {
        q: 'Nasos xidməti ayrıca sifariş oluna bilərmi?',
        a: 'Bəli, beton sifarişi ilə birlikdə və ya ayrıca təşkil oluna bilər. Qiymət obyektin şərtlərindən (hündürlük, məsafə, həcm) asılıdır.',
      },
      {
        q: 'Hansı hündürlüyə beton vurmaq olur?',
        a: 'Bu, seçilən nasosun növündən asılıdır. Obyektiniz haqqında məlumat verin — layihənizə uyğun texnikanı təklif edək.',
      },
      {
        q: 'Nasosla hansı markaları vurmaq olar?',
        a: 'İstehsal etdiyimiz bütün markalar (M100–M450) nasosla tökülə bilər — qarışıq nasoslamaya uyğun hazırlanır.',
      },
    ],
    related: [
      { to: '/hazir-beton-satisi', label: 'Hazır beton satışı haqqında' },
      { to: '/beton-catdirilmasi', label: 'Çatdırılma necə işləyir?' },
      { to: '/calculator', label: 'Tökmə həcmini hesabla' },
      { to: '/beton-qiymetleri', label: 'Qiymətə nə təsir edir?' },
    ],
    whatsappText: 'Salam! Beton nasoslama xidməti üçün qiymət təklifi almaq istəyirəm.',
  },

  {
    slug: '/terezi-xidmeti',
    seo: {
      title: 'Tərəzi Xidməti — Avtomobil Körpü Tərəzisi | NOVXANI BETON',
      description:
        'Novxanıda avtomobil körpü tərəzisi ilə yük maşınlarının dəqiq çəkilməsi. Tikinti və logistika şirkətləri üçün sürətli, sənədləşdirilmiş çəki xidməti — 7/24.',
    },
    crumb: 'Tərəzi Xidməti',
    h1: 'Tərəzi (Çəki) Xidməti',
    tagline: 'Avtomobil körpü tərəzisi ilə yüklərin dəqiq və sənədli ölçülməsi — Novxanı, 7/24',
    hero: { image: imgTerezi, alt: 'Mikser avtomobil körpü tərəzisində çəkilir' },
    intro: [
      'Novxanı zavodumuzda yerləşən avtomobil körpü tərəzisi ilə yük maşınlarının və qoşquların dəqiq çəkisini ölçürük. Xidmət həm öz sifarişçilərimiz, həm də kənar tikinti, logistika və istehsalat şirkətləri üçün açıqdır.',
      'Dəqiq çəki — artıq yük cərimələrindən qorunmaq, materialın düzgün uçotu və şəffaf hesablaşma üçün vacibdir. Ölçmə bir neçə dəqiqə çəkir, nəticə sənədlə təqdim olunur.',
    ],
    benefitsTitle: 'Xidmətin üstünlükləri',
    benefits: [
      { title: 'Dəqiq ölçüm', text: 'Körpü tərəzisi ağır və uzun bazalı nəqliyyat üçün nəzərdə tutulub.' },
      { title: 'Sürətli xidmət', text: 'Çəkilmə prosesi cəmi bir neçə dəqiqə vaxt alır.' },
      { title: 'Sənədləşdirmə', text: 'Nəticə çəki qəbzi ilə rəsmiləşdirilir.' },
      { title: 'Əlverişli yerləşmə', text: 'Novxanıda, əsas marşrutlara yaxın — 7/24 açıq.' },
    ],
    stepsTitle: 'Necə işləyir',
    steps: [
      { title: 'Gəliş', text: 'Zavoda yaxınlaşırsınız (əvvəlcədən zəng etməyiniz gözləməni azaldır).' },
      { title: 'Dolu çəki', text: 'Yüklü nəqliyyat vasitəsi tərəzidə ölçülür.' },
      { title: 'Boş çəki (tara)', text: 'Boşaldıqdan sonra təkrar ölçmə ilə xalis yük müəyyən olunur.' },
      { title: 'Qəbz və hesablaşma', text: 'Nəticə sənədləşdirilir və təqdim olunur.' },
    ],
    faqs: [
      {
        q: 'Hansı nəqliyyat vasitələri çəkilə bilər?',
        a: 'Yük maşınları, mikserlər, qoşqulu TIR-lar və digər ağır texnika — körpü tərəzisi uzun bazalı nəqliyyat üçün nəzərdə tutulub.',
      },
      {
        q: 'Nəticə sənədlə verilirmi?',
        a: 'Bəli, ölçmənin nəticəsi çəki qəbzi ilə rəsmiləşdirilir.',
      },
      {
        q: 'Xidmətdən kimlər istifadə edə bilər?',
        a: 'Hər kəs — bizim müştərimiz olmayan şirkətlər və fərdi sürücülər də tərəzi xidmətindən istifadə edə bilər.',
      },
      {
        q: 'İş saatları necədir?',
        a: 'Zavod 7/24 fəaliyyət göstərir; gəlişdən əvvəl zəng etməyiniz gözləməni minimuma endirir.',
      },
    ],
    related: [
      { to: '/hazir-beton-satisi', label: 'Hazır beton satışı haqqında' },
      { to: '/services', label: 'Bütün xidmətlərimiz' },
      { to: '/contact', label: 'Ünvan və əlaqə məlumatları' },
    ],
    whatsappText: 'Salam! Tərəzi (çəki) xidməti haqqında məlumat almaq istəyirəm.',
  },

  {
    slug: '/beton-qiymetleri',
    seo: {
      title: 'Beton Qiymətləri — Fərdi Təklif Alın | NOVXANI BETON',
      description:
        'Beton qiyməti nədən asılıdır: marka, həcm, çatdırılma məsafəsi və nasos ehtiyacı. Layihəniz üçün pulsuz fərdi qiymət təklifi alın — WhatsApp və ya zənglə.',
    },
    crumb: 'Beton Qiymətləri',
    h1: 'Beton Qiymətləri',
    tagline: 'Layihənizə uyğun fərdi qiymət təklifi — pulsuz və öhdəliksiz',
    hero: { image: imgQiymet, alt: 'Hazır beton qarışığı yaxın planda' },
    intro: [
      'Beton qiyməti sabit rəqəm deyil — marka (M100–M450), sifariş həcmi, çatdırılma məsafəsi, nasos ehtiyacı və tökmə qrafiki qiymətə birbaşa təsir edir. Xammal bazarı da mütəmadi dəyişir.',
      'Buna görə saytda “hamı üçün bir qiymət” yazmaq əvəzinə, hər layihə üçün fərdi təklif hazırlayırıq — beləcə artıq xərc ödəmirsiniz, yalnız öz layihənizə uyğun real qiyməti alırsınız. Təklif almaq pulsuzdur və heç bir öhdəlik yaratmır.',
    ],
    benefitsTitle: 'Qiymətə nə təsir edir?',
    benefits: [
      { title: 'Beton markası', text: 'Möhkəmlik sinfi artdıqca qarışıqda sement payı artır.' },
      { title: 'Sifariş həcmi', text: 'Böyük həcmli sifarişlərdə daha sərfəli şərtlər mümkündür.' },
      { title: 'Çatdırılma məsafəsi', text: 'Obyektin zavoddan uzaqlığı nəqliyyat xərcinə təsir edir.' },
      { title: 'Nasos və qrafik', text: 'Xüsusi texnika ehtiyacı və gecə tökmələri ayrıca hesablanır.' },
    ],
    stepsTitle: '3 addıma qiymət alın',
    steps: [
      { title: 'Həcmi hesablayın', text: 'Pulsuz beton kalkulyatoru ilə layihənizə lazım olan m³-ü dəqiqləşdirin.' },
      { title: 'Bizə göndərin', text: 'Kalkulyatordakı WhatsApp düyməsi hesablamanı avtomatik mesaja çevirir.' },
      { title: 'Fərdi təklif alın', text: 'Marka, həcm və ünvana uyğun dəqiq qiymət təklifi sizə göndərilir.' },
    ],
    faqs: [
      {
        q: 'Qiymətə çatdırılma daxildirmi?',
        a: 'Təklifdə beton və çatdırılma ayrıca, şəffaf şəkildə göstərilir — ünvanınıza görə dəqiq hesablanır.',
      },
      {
        q: 'Böyük həcmli sifarişlərə endirim varmı?',
        a: 'Bəli, böyük həcmli və davamlı layihələr üçün xüsusi şərtlər təklif olunur.',
      },
      {
        q: 'Təklif almaq nə qədər vaxt aparır?',
        a: 'Ən sürətli yol WhatsApp-dır — sorğulara qısa zamanda cavab veririk.',
      },
      {
        q: 'Ödəniş şərtləri necədir?',
        a: 'Ödəniş qaydaları (nağd, nağdsız, mərhələli) təklif zamanı razılaşdırılır.',
      },
    ],
    related: [
      { to: '/calculator', label: 'Beton miqdarını hesabla' },
      { to: '/products', label: 'Beton markalarına bax' },
      { to: '/hazir-beton-satisi', label: 'Hazır beton satışı haqqında' },
      { to: '/contact', label: 'Birbaşa əlaqə saxla' },
    ],
    whatsappText: 'Salam! Layihəm üçün beton qiymət təklifi almaq istəyirəm.',
  },
];

export const getServicePage = (slug) => SERVICE_PAGES.find((p) => p.slug === slug);
