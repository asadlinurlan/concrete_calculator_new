/* ============================================================
   Central FAQ page content — targets question-form searches
   ("betonun kubu neçəyədir", "fundament üçün hansı beton",
   "atsep nədir" və s.). Grouped by topic; the page emits ONE
   combined FAQPage JSON-LD for all groups.

   Content rules: only business-confirmed facts. No prices, no
   invented specs — pricing questions always resolve to the
   individual-quote flow.
   ============================================================ */

export const FAQ_GROUPS = [
  {
    title: 'Sifariş və çatdırılma',
    items: [
      {
        q: 'Beton sifarişi necə verilir?',
        a: 'Üç sadə addım: həcmi beton kalkulyatoru ilə dəqiqləşdirin, zəng (+994 50 620 95 84) və ya WhatsApp ilə marka, həcm və ünvanı bildirin, fərdi qiymət təklifini təsdiqləyin. Beton razılaşdırılmış vaxtda mikserlə ünvana çatdırılır.',
      },
      {
        q: 'Hansı ərazilərə beton çatdırırsınız?',
        a: 'Bakı və bütün Abşeron yarımadası üzrə çatdırılma edirik. Zavodumuz Novxanıda yerləşdiyi üçün Abşeron zonasına — Novxanı, Masazır, Xırdalan, Sumqayıt istiqamətlərinə xüsusilə operativ çatırıq.',
      },
      {
        q: 'Betonun qiymətinə çatdırılma daxildirmi?',
        a: 'Təklifdə beton və çatdırılma ayrıca, şəffaf göstərilir və ünvanınıza görə dəqiq hesablanır — gizli xərc yoxdur.',
      },
      {
        q: 'Gecə və həftəsonu beton sifariş etmək olar?',
        a: 'Bəli, 7/24 fəaliyyət göstəririk. Gecə tökmələri və təcili sifarişlər üçün qrafiki əvvəlcədən razılaşdırmaq kifayətdir.',
      },
      {
        q: 'Beton sifarişi üçün minimum həcm nə qədərdir?',
        a: 'Sabit minimum hədd qoymuruq — şərtlər həcmə görə müəyyən olunur. Kiçik həcmli sifarişlər üçün də əlaqə saxlayın, sizin üçün optimal variantı təklif edək.',
      },
    ],
  },
  {
    title: 'Marka seçimi',
    items: [
      {
        q: 'Fundament üçün hansı beton markası lazımdır?',
        a: 'Yüngül 1–2 mərtəbəli evlərin zolaq təməli üçün adətən M250, monolit plitə təməl və 2+ mərtəbəli evlər üçün M300 tövsiyə olunur. Dəqiq seçim layihədən və qrunt şəraitindən asılıdır — pulsuz məsləhət veririk.',
      },
      {
        q: 'M300 və M400 betonun fərqi nədir?',
        a: 'M300 (B22.5) 22.5 MPa, M400 (B30) 30 MPa möhkəmliyə malikdir. M400 körpü, hidrotexniki və xüsusi yüklü konstruksiyalar üçündür; adi yaşayış tikintisində M300 adətən kifayətdir və daha sərfəlidir.',
      },
      {
        q: 'M və B hərfləri nə deməkdir?',
        a: 'M — betonun möhkəmlik markasıdır (kqq/sm²), B — möhkəmlik sinfidir (MPa). Məsələn, M300 = B22.5 = 22.5 MPa. Hər iki işarələnmə eyni betonu ifadə edir.',
      },
      {
        q: 'Ev tikintisi üçün hansı beton markası seçilməlidir?',
        a: 'Tipik bölgü belədir: hazırlıq qatları M100, döşəmə və həyət M150–M200, zolaq təməl M250, monolit təməl, sütun və örtüklər M300, çoxmərtəbəli karkas M350. Betonun istifadə sahələri səhifəmizdə ətraflı bölgü var.',
      },
    ],
  },
  {
    title: 'Hesablama',
    items: [
      {
        q: 'Beton kubu necə hesablanır?',
        a: 'Həcm = uzunluq × en × qalınlıq (metrlə). Məsələn, 10 m × 10 m sahəyə 15 sm qalınlıqda beton üçün: 10 × 10 × 0.15 = 15 m³. Saytdakı beton kalkulyatoru bunu plitə, zolaq təməl və sütunlar üçün avtomatik hesablayır.',
      },
      {
        q: '100 kvadrat sahəyə neçə kub beton gedir?',
        a: 'Qalınlıqdan asılıdır: 10 sm-də 10 m³, 15 sm-də 15 m³, 20 sm-də 20 m³. Ehtiyat üçün adətən 5–10% əlavə nəzərdə tutulur.',
      },
      {
        q: '1 kub beton neçə tondur?',
        a: 'Adi armaturlu beton təxminən 2,4 ton/m³-dür. Yəni 10 m³ sifariş ≈ 24 ton deməkdir.',
      },
      {
        q: 'Bir mikser neçə kub beton aparır?',
        a: 'Standart mikserlərin tutumu adətən 7–10 m³ aralığındadır. Kalkulyatorumuz həcmlə birlikdə lazımi mikser sayını da göstərir.',
      },
    ],
  },
  {
    title: 'Keyfiyyət və tökmə',
    items: [
      {
        q: 'Betonun keyfiyyəti necə yoxlanılır?',
        a: 'İstehsal GOST 26633 üzrə aparılır: hər partiya laboratoriya nəzarətindən keçir, nümunə kublar 28 günlük möhkəmlik sınağı ilə yoxlanılır. Tələb olunduqda nəticələr sənədlə təqdim olunur.',
      },
      {
        q: 'Beton neçə günə bərkiyir?',
        a: 'Beton ilk günlərdə sürətlə möhkəmlənir və 28-ci gündə layihə möhkəmliyinin standart göstəricisinə çatır. Qəlibin açılması və yükləmə vaxtı konstruksiyadan və hava şəraitindən asılıdır.',
      },
      {
        q: 'Beton yolda nə qədər qala bilər?',
        a: 'Hazır qarışıq adətən istehsaldan sonra 1,5–2 saat ərzində tökülməlidir (hava şəraitindən asılı). Buna görə marşrut və tökmə qrafikini əvvəlcədən planlaşdırırıq.',
      },
      {
        q: 'Qışda və yağışda beton tökmək olar?',
        a: 'Mümkündür, lakin əlavə tədbirlər tələb edir: soyuqda müvafiq qarışıq və qoruma, yağışda təzə səthin örtülməsi. Tökmə tarixini planlaşdırarkən bizimlə məsləhətləşin.',
      },
      {
        q: 'Beton pompası nə üçün lazımdır?',
        a: 'Mikser tökmə nöqtəsinə birbaşa yaxınlaşa bilmirsə — hündür mərtəbələr, dar həyətlər, binanın arxası — nasos betonu borularla birbaşa nöqtəyə ötürür. Böyük plitələrin fasiləsiz tökülməsində də üstünlükdür.',
      },
    ],
  },
  {
    title: 'Tikinti materialları',
    items: [
      {
        q: 'Atsep nədir və harada istifadə olunur?',
        a: 'Atsep (bəzən “otsev” deyilir) — təbii qum-çınqıl qarışığıdır. Beton istehsalında doldurucu, yol və meydança əsaslarında, ərazi dolğusunda və drenaj işlərində istifadə olunur.',
      },
      {
        q: 'Çınqıl və şeben eyni şeydir?',
        a: 'Gündəlik danışıqda çox vaxt eyni mənada işlədilir. Şeben qırma daşdır (süni xırdalanmış), çınqıl isə təbii dairəvi daş dənələridir. Betonda əsas iri doldurucu kimi şeben istifadə olunur.',
      },
      {
        q: 'Beton üçün hansı qum istifadə olunur?',
        a: 'Beton qarışığı üçün gil qatışığı az olan, təmiz tikinti qumu tələb olunur. Öz istehsalımızda işlətdiyimiz keyfiyyətli qumu satışa da çıxarırıq — beton, suvaq və hörgü işləri üçün.',
      },
      {
        q: 'Qum, atsep və şebeni topdan almaq olar?',
        a: 'Bəli. Tikinti şirkətləri, podratçılar və beton zavodları üçün davamlı topdan təchizat təşkil edirik — Bakı və Abşeron üzrə çatdırılma ilə. Həcmə uyğun fərdi kommersiya şərtləri tətbiq olunur.',
      },
    ],
  },
];

export const ALL_FAQ_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);
