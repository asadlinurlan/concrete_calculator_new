/* ============================================================
   Per-grade SEO landing pages (spokes) supporting the /products hub.
   Targets the strongest commercial keyword cluster: "M300 beton",
   "M300 beton qiyməti", "B22.5 beton", "M300 beton harada istifadə
   olunur" və s. Rendered by the shared <ServiceDetail/> template.

   Content rules: only business-confirmed facts (GOST 26633, 28-day
   cube testing, lab control, Novxanı plant, Bakı & Abşeron delivery,
   7/24, M100–M450 range). No prices — pricing is always an individual
   quote. Every page has UNIQUE intro/benefits/FAQ copy — no
   boilerplate duplication across grades (keyword-stuffing yoxdur).

   i18n: every user-visible string is a { az, en, ru } object resolved
   by the shared t() helper at render time.
   ============================================================ */
import { CONCRETE_GRADES } from './concreteGrades';
import imgHazirBeton from '../app/Pages/img/service-1.png';
import imgConcrete from '../app/Pages/img/concrete.jpeg';
import imgQiymet from '../app/Pages/img/d-c-rnqRdfYyywM-unsplash.jpg';
import imgPour from '../app/Pages/img/claus-grunstaudl-1_DvZyR3dRk-unsplash.jpg';
import imgSite from '../app/Pages/img/workers-construction-site.jpg';

const orderSteps = [
  {
    title: {
      az: 'Həcmi dəqiqləşdirin',
      en: 'Determine the volume',
      ru: 'Определите объём',
    },
    text: {
      az: 'Beton kalkulyatoru ilə lazımi m³-ü hesablayın və ya ölçüləri bizə göndərin.',
      en: 'Calculate the required m³ with our concrete calculator or send us your dimensions.',
      ru: 'Рассчитайте нужный объём в м³ с помощью калькулятора бетона или пришлите нам размеры.',
    },
  },
  {
    title: {
      az: 'Sorğu göndərin',
      en: 'Send a request',
      ru: 'Отправьте заявку',
    },
    text: {
      az: 'Zəng və ya WhatsApp ilə markanı, həcmi və ünvanı bildirin.',
      en: 'Tell us the grade, volume and address by phone or WhatsApp.',
      ru: 'Сообщите марку, объём и адрес по телефону или в WhatsApp.',
    },
  },
  {
    title: {
      az: 'Fərdi təklif alın',
      en: 'Get a personalized offer',
      ru: 'Получите индивидуальное предложение',
    },
    text: {
      az: 'Marka, həcm və məsafəyə uyğun qiymət təklifi — pulsuz və öhdəliksiz.',
      en: 'A price quote based on grade, volume and distance — free and with no obligation.',
      ru: 'Ценовое предложение с учётом марки, объёма и расстояния — бесплатно и без обязательств.',
    },
  },
  {
    title: {
      az: 'Çatdırılma və tökmə',
      en: 'Delivery and pouring',
      ru: 'Доставка и заливка',
    },
    text: {
      az: 'Beton laboratoriya nəzarəti ilə istehsal olunub mikserlə ünvana çatdırılır.',
      en: 'The concrete is produced under laboratory control and delivered to your site by mixer truck.',
      ru: 'Бетон производится под лабораторным контролем и доставляется миксером на объект.',
    },
  },
];

// Per-grade unique editorial content. Merged below with the technical
// reference data (bClass, strength) from concreteGrades.js. The `use`
// field mirrors the lowercased AZ use text from concreteGrades.js so the
// generated SEO strings stay self-contained and fully trilingual.
const GRADE_CONTENT = {
  M100: {
    hero: imgConcrete,
    use: {
      az: 'altlıq, döşəmə altı, hamarlama qatı',
      en: 'blinding, sub-floor base, leveling layer',
      ru: 'подбетонка, основание под полы, выравнивающий слой',
    },
    tagline: {
      az: 'Hazırlıq işləri, altlıq və hamarlama qatı üçün qənaətcil beton markası',
      en: 'An economical concrete grade for preparatory work, blinding and leveling layers',
      ru: 'Экономичная марка бетона для подготовительных работ, подбетонки и выравнивающего слоя',
    },
    intro: [
      {
        az: 'M100 (B7.5 sinfi) — ən yüngül yüklər üçün nəzərdə tutulmuş beton markasıdır. Əsas vəzifəsi daşıyıcı konstruksiya olmaq deyil, hazırlıq qatı yaratmaqdır: təməl altına tökülən hamarlayıcı altlıq, döşəmə altı hazırlıq qatı və bordür yatağı üçün ən çox seçilən markadır.',
        en: 'M100 (class B7.5) is a concrete grade intended for the lightest loads. Its main role is not to act as a load-bearing structure but to create a preparatory layer: it is the most common choice for a leveling blinding layer under foundations, a sub-floor preparation layer and curb bedding.',
        ru: 'M100 (класс B7.5) — марка бетона, рассчитанная на самые лёгкие нагрузки. Её основная задача — не несущая конструкция, а подготовительный слой: это самый востребованный вариант для выравнивающей подбетонки под фундамент, подготовительного слоя под полы и основания под бордюры.',
      },
      {
        az: 'Novxanı Beton M100 markasını GOST 26633 tələblərinə uyğun, laboratoriya nəzarəti ilə istehsal edir və Bakı, Abşeron üzrə mikserlə ünvana çatdırır. Sement payı az olduğu üçün M100 marka xəttimizin ən sərfəli betonudur — hazırlıq işlərində artıq pul ödəməyə ehtiyac yoxdur.',
        en: 'Novxani Beton produces the M100 grade to GOST 26633 requirements under laboratory control and delivers it by mixer truck across Baku and Absheron. Thanks to its low cement content, M100 is the most economical concrete in our range — no need to overpay for preparatory work.',
        ru: 'Novxani Beton производит марку M100 по требованиям ГОСТ 26633 под лабораторным контролем и доставляет её миксерами по Баку и Абшерону. Благодаря низкому расходу цемента M100 — самый выгодный бетон нашей линейки: переплачивать за подготовительные работы не придётся.',
      },
    ],
    benefits: [
      {
        title: {
          az: 'Təməl altı hazırlıq qatı',
          en: 'Blinding layer under foundations',
          ru: 'Подготовительный слой под фундамент',
        },
        text: {
          az: 'Qazıntının dibini hamarlayır, əsas təməli torpaqdan ayırır.',
          en: 'Levels the bottom of the excavation and separates the main foundation from the soil.',
          ru: 'Выравнивает дно котлована и отделяет основной фундамент от грунта.',
        },
      },
      {
        title: {
          az: 'Döşəmə altı altlıq',
          en: 'Sub-floor base',
          ru: 'Основание под полы',
        },
        text: {
          az: 'Döşəmə tökülməzdən əvvəl bərabər, təmiz iş səthi yaradır.',
          en: 'Creates an even, clean working surface before the floor is poured.',
          ru: 'Создаёт ровную, чистую рабочую поверхность перед заливкой пола.',
        },
      },
      {
        title: {
          az: 'Səki və bordür yatağı',
          en: 'Sidewalk and curb bedding',
          ru: 'Основание под тротуары и бордюры',
        },
        text: {
          az: 'Bordürlərin oturdulması və yüngül abadlıq işləri üçün.',
          en: 'For setting curbs and light landscaping work.',
          ru: 'Для установки бордюров и лёгких работ по благоустройству.',
        },
      },
      {
        title: {
          az: 'Ən qənaətcil marka',
          en: 'The most economical grade',
          ru: 'Самая экономичная марка',
        },
        text: {
          az: 'Aşağı sement payı — hazırlıq işlərində minimal xərc.',
          en: 'Low cement content — minimal cost for preparatory work.',
          ru: 'Низкий расход цемента — минимальные затраты на подготовительные работы.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'M100 beton harada istifadə olunur?',
          en: 'Where is M100 concrete used?',
          ru: 'Где используется бетон M100?',
        },
        a: {
          az: 'M100 daşıyıcı olmayan işlərdə istifadə olunur: təməl altına hamarlayıcı altlıq, döşəmə altı hazırlıq qatı, bordür yatağı və yüngül abadlıq tökmələri. Daşıyıcı təməl və divarlar üçün ən azı M250–M300 tövsiyə olunur.',
          en: 'M100 is used for non-load-bearing work: a leveling blinding layer under foundations, a sub-floor preparation layer, curb bedding and light landscaping pours. For load-bearing foundations and walls, at least M250–M300 is recommended.',
          ru: 'M100 применяется в ненесущих работах: выравнивающая подбетонка под фундамент, подготовительный слой под полы, основание под бордюры и лёгкие заливки при благоустройстве. Для несущих фундаментов и стен рекомендуется минимум M250–M300.',
        },
      },
      {
        q: {
          az: 'M100 betonun qiyməti nə qədərdir?',
          en: 'How much does M100 concrete cost?',
          ru: 'Сколько стоит бетон M100?',
        },
        a: {
          az: 'M100 sement payı ən az olan marka olduğu üçün xəttimizin ən sərfəli betonudur. Dəqiq qiymət həcmdən və çatdırılma ünvanından asılıdır — WhatsApp və ya zənglə bir neçə dəqiqəyə fərdi təklif alın.',
          en: 'As the grade with the lowest cement content, M100 is the most economical concrete in our range. The exact price depends on the volume and delivery address — get a personalized quote within minutes via WhatsApp or by phone.',
          ru: 'Поскольку в M100 самая низкая доля цемента, это самый выгодный бетон нашей линейки. Точная цена зависит от объёма и адреса доставки — получите индивидуальное предложение за несколько минут в WhatsApp или по телефону.',
        },
      },
      {
        q: {
          az: 'B7.5 beton nə deməkdir?',
          en: 'What does B7.5 concrete mean?',
          ru: 'Что означает бетон B7.5?',
        },
        a: {
          az: 'B7.5 — M100 markasının möhkəmlik sinfidir və 7.5 MPa təzyiqə davamlılıq deməkdir. M (marka) və B (sinif) eyni betonun iki fərqli işarələnməsidir.',
          en: 'B7.5 is the strength class of the M100 grade and means resistance to a pressure of 7.5 MPa. M (grade) and B (class) are two different designations of the same concrete.',
          ru: 'B7.5 — класс прочности марки M100, означающий стойкость к давлению 7.5 МПа. M (марка) и B (класс) — два разных обозначения одного и того же бетона.',
        },
      },
      {
        q: {
          az: 'Təməl altına niyə M100 tökülür?',
          en: 'Why is M100 poured under foundations?',
          ru: 'Почему под фундамент заливают M100?',
        },
        a: {
          az: 'Hamarlayıcı altlıq qazıntının dibini bərabərləşdirir, armaturu torpaqdan qoruyur və əsas təməlin dəqiq ölçüdə tökülməsinə imkan verir. Bu qat daşıyıcı olmadığı üçün M100 kifayətdir — daha yüksək marka istifadə etmək sadəcə artıq xərcdir.',
          en: 'The blinding layer evens out the bottom of the excavation, protects the reinforcement from the soil and allows the main foundation to be poured to exact dimensions. Since this layer is not load-bearing, M100 is sufficient — using a higher grade is simply an extra expense.',
          ru: 'Выравнивающая подбетонка выравнивает дно котлована, защищает арматуру от грунта и позволяет залить основной фундамент точно по размерам. Этот слой не является несущим, поэтому M100 достаточно — более высокая марка была бы лишней тратой.',
        },
      },
    ],
  },
  M150: {
    hero: imgSite,
    use: {
      az: 'səki, bordür, yüngül döşəmə',
      en: 'sidewalks, curbs, light floors',
      ru: 'тротуары, бордюры, лёгкие полы',
    },
    tagline: {
      az: 'Səki, bordür və yüngül döşəmə tökmələri üçün beton markası',
      en: 'A concrete grade for sidewalks, curbs and light floor pours',
      ru: 'Марка бетона для тротуаров, бордюров и лёгких заливок полов',
    },
    intro: [
      {
        az: 'M150 (B10–B12.5 sinfi) hazırlıq betonu ilə konstruktiv beton arasında keçid markasıdır. Piyada səkiləri, bordürlər, yüngül yüklü həyət döşəmələri və birmərtəbəli yardımçı tikililərin sadə özülləri üçün optimal seçimdir.',
        en: 'M150 (class B10–B12.5) is a transitional grade between blinding and structural concrete. It is the optimal choice for pedestrian sidewalks, curbs, lightly loaded yard floors and simple footings of single-storey auxiliary buildings.',
        ru: 'M150 (класс B10–B12.5) — переходная марка между подготовительным и конструкционным бетоном. Оптимальный выбор для пешеходных тротуаров, бордюров, слабонагруженных дворовых полов и простых оснований одноэтажных хозяйственных построек.',
      },
      {
        az: 'Marka Novxanı zavodumuzda GOST 26633 üzrə istehsal olunur, hər partiya laboratoriya nəzarətindən keçir. Bakı və Abşeron üzrə mikserlə çatdırılma, ehtiyac olduqda nasosla tökmə də təşkil edirik.',
        en: 'The grade is produced at our Novkhani plant per GOST 26633, and every batch passes laboratory control. We deliver by mixer truck across Baku and Absheron and can also arrange pump placement when needed.',
        ru: 'Марка производится на нашем заводе в Новханы по ГОСТ 26633, каждая партия проходит лабораторный контроль. Доставляем миксерами по Баку и Абшерону, при необходимости организуем подачу бетононасосом.',
      },
    ],
    benefits: [
      {
        title: {
          az: 'Səki və cığırlar',
          en: 'Sidewalks and paths',
          ru: 'Тротуары и дорожки',
        },
        text: {
          az: 'Piyada yükü üçün kifayət qədər möhkəm, sərfəli həll.',
          en: 'Strong enough for pedestrian loads, at an economical price.',
          ru: 'Достаточная прочность для пешеходной нагрузки по выгодной цене.',
        },
      },
      {
        title: {
          az: 'Bordür işləri',
          en: 'Curb work',
          ru: 'Бордюрные работы',
        },
        text: {
          az: 'Bordürlərin oturdulması və bərkidilməsi üçün standart marka.',
          en: 'The standard grade for setting and fixing curbs.',
          ru: 'Стандартная марка для установки и закрепления бордюров.',
        },
      },
      {
        title: {
          az: 'Yüngül döşəmələr',
          en: 'Light floors',
          ru: 'Лёгкие полы',
        },
        text: {
          az: 'Həyət və yardımçı sahələrdə az yüklü döşəmə tökmələri.',
          en: 'Lightly loaded floor pours in yards and auxiliary areas.',
          ru: 'Слабонагруженные заливки полов во дворах и подсобных зонах.',
        },
      },
      {
        title: {
          az: 'Kiçik özüllər',
          en: 'Small footings',
          ru: 'Небольшие основания',
        },
        text: {
          az: 'Hasar və yüngül tikililərin sadə özül işləri.',
          en: 'Simple footing work for fences and light structures.',
          ru: 'Простые фундаментные работы для заборов и лёгких построек.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'M150 beton harada istifadə olunur?',
          en: 'Where is M150 concrete used?',
          ru: 'Где используется бетон M150?',
        },
        a: {
          az: 'Səkilər, bordürlər, yüngül yüklü həyət döşəmələri, hasar dirəklərinin bərkidilməsi və yardımçı tikililərin kiçik özülləri üçün. Yaşayış evinin daşıyıcı təməli üçün isə M250–M300 seçilməlidir.',
          en: 'For sidewalks, curbs, lightly loaded yard floors, fixing fence posts and small footings of auxiliary buildings. For the load-bearing foundation of a house, M250–M300 should be chosen instead.',
          ru: 'Для тротуаров, бордюров, слабонагруженных дворовых полов, закрепления столбов забора и небольших оснований хозяйственных построек. Для несущего фундамента жилого дома следует выбирать M250–M300.',
        },
      },
      {
        q: {
          az: 'Həyətə beton tökmək üçün M150 kifayətdir?',
          en: 'Is M150 enough for paving a yard?',
          ru: 'Достаточно ли M150 для заливки двора?',
        },
        a: {
          az: 'Yalnız piyada gəzintisi olan sahələr üçün bəli. Üzərindən avtomobil keçəcəksə, M200 və qalınlığın artırılması tövsiyə olunur. Dəqiq seçim üçün pulsuz məsləhət verə bilərik.',
          en: 'Yes — but only for areas with pedestrian traffic. If cars will drive over it, M200 and a greater thickness are recommended. We can advise you free of charge on the exact choice.',
          ru: 'Да — но только для зон с пешеходным движением. Если по покрытию будет проезжать автомобиль, рекомендуются M200 и увеличенная толщина. Для точного выбора можем бесплатно проконсультировать.',
        },
      },
      {
        q: {
          az: 'M150 ilə M100-ün fərqi nədir?',
          en: 'What is the difference between M150 and M100?',
          ru: 'В чём разница между M150 и M100?',
        },
        a: {
          az: 'M150 daha möhkəmdir (10 MPa, M100-də 7.5 MPa) və yüngül konstruktiv işlərdə istifadə oluna bilir; M100 isə yalnız hazırlıq qatları üçündür.',
          en: 'M150 is stronger (10 MPa versus 7.5 MPa for M100) and can be used for light structural work, while M100 is intended for preparatory layers only.',
          ru: 'M150 прочнее (10 МПа против 7.5 МПа у M100) и может применяться в лёгких конструкционных работах, тогда как M100 предназначен только для подготовительных слоёв.',
        },
      },
      {
        q: {
          az: 'M150 betonun kub qiyməti neçəyədir?',
          en: 'How much does a cubic meter of M150 cost?',
          ru: 'Сколько стоит куб бетона M150?',
        },
        a: {
          az: 'Qiymət sifariş həcmindən və çatdırılma məsafəsindən asılı olaraq fərdi hesablanır. Kalkulyatorla həcmi dəqiqləşdirin və WhatsApp ilə göndərin — qısa zamanda təklif alacaqsınız.',
          en: 'The price is calculated individually based on order volume and delivery distance. Work out the volume with our calculator and send it via WhatsApp — you will receive an offer shortly.',
          ru: 'Цена рассчитывается индивидуально в зависимости от объёма заказа и расстояния доставки. Определите объём с помощью калькулятора и отправьте его в WhatsApp — вы быстро получите предложение.',
        },
      },
    ],
  },
  M200: {
    hero: imgPour,
    use: {
      az: 'döşəmə, cığır, ümumi məqsədli',
      en: 'floors, walkways, general-purpose work',
      ru: 'полы, дорожки, работы общего назначения',
    },
    tagline: {
      az: 'Döşəmə, cığır və ümumi tikinti işləri üçün ən çox satılan markalardan biri',
      en: 'One of our best-selling grades for floors, walkways and general construction work',
      ru: 'Одна из самых продаваемых марок для полов, дорожек и общестроительных работ',
    },
    intro: [
      {
        az: 'M200 (B15 sinfi) fərdi tikintidə ən çox soruşulan markalardan biridir: ev döşəmələri, qaraj döşəməsi, üzərindən minik avtomobili keçən həyət betonlaması və yüngül birmərtəbəli tikililərin özülləri üçün standart seçimdir.',
        en: 'M200 (class B15) is one of the most requested grades in private construction: the standard choice for house floors, garage floors, yard paving that carries passenger cars, and footings of light single-storey buildings.',
        ru: 'M200 (класс B15) — одна из самых востребованных марок в частном строительстве: стандартный выбор для полов в доме, пола гаража, бетонирования двора под легковой автомобиль и оснований лёгких одноэтажных построек.',
      },
      {
        az: 'Möhkəmlik və qiymət balansına görə M200 “ümumi məqsədli” beton sayılır. Novxanı Beton bu markanı laboratoriya nəzarəti ilə istehsal edir; Bakı və Abşeronun istənilən nöqtəsinə mikserlə çatdırırıq, həcmə uyğun fərdi qiymət təklif edirik.',
        en: 'Thanks to its balance of strength and price, M200 is considered a "general-purpose" concrete. Novxani Beton produces this grade under laboratory control; we deliver by mixer truck to any point in Baku and Absheron and offer a personalized price based on volume.',
        ru: 'Благодаря балансу прочности и цены M200 считается бетоном «общего назначения». Novxani Beton производит эту марку под лабораторным контролем; доставляем миксерами в любую точку Баку и Абшерона и предлагаем индивидуальную цену в зависимости от объёма.',
      },
    ],
    benefits: [
      {
        title: {
          az: 'Ev və qaraj döşəməsi',
          en: 'House and garage floors',
          ru: 'Полы дома и гаража',
        },
        text: {
          az: 'Yaşayış sahələrində standart döşəmə tökmələri üçün.',
          en: 'For standard floor pours in residential spaces.',
          ru: 'Для стандартных заливок полов в жилых помещениях.',
        },
      },
      {
        title: {
          az: 'Həyət betonlaması',
          en: 'Yard paving',
          ru: 'Бетонирование двора',
        },
        text: {
          az: 'Minik avtomobili yükünə davamlı həyət örtüyü.',
          en: 'A yard surface that withstands passenger-car loads.',
          ru: 'Покрытие двора, выдерживающее нагрузку легкового автомобиля.',
        },
      },
      {
        title: {
          az: 'Yüngül özüllər',
          en: 'Light footings',
          ru: 'Лёгкие основания',
        },
        text: {
          az: 'Birmərtəbəli, yüngül konstruksiyalı tikililərin özülü.',
          en: 'Footings for single-storey, lightweight structures.',
          ru: 'Фундаменты одноэтажных построек лёгкой конструкции.',
        },
      },
      {
        title: {
          az: 'Pilləkən və meydança',
          en: 'Stairs and platforms',
          ru: 'Лестницы и площадки',
        },
        text: {
          az: 'Ümumi məqsədli monolit tökmə işləri.',
          en: 'General-purpose monolithic pours.',
          ru: 'Монолитные заливки общего назначения.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'M200 beton harada istifadə olunur?',
          en: 'Where is M200 concrete used?',
          ru: 'Где используется бетон M200?',
        },
        a: {
          az: 'Ev və qaraj döşəmələri, həyət betonlaması, pilləkənlər, yüngül tikililərin özülləri və ümumi məqsədli tökmələr. Çoxmərtəbəli və ya monolit təməl işləri üçün M300 və yuxarı markalara baxın.',
          en: 'House and garage floors, yard paving, stairs, footings of light structures and general-purpose pours. For multi-storey or monolithic foundation work, look at grades M300 and above.',
          ru: 'Полы дома и гаража, бетонирование двора, лестницы, основания лёгких построек и заливки общего назначения. Для многоэтажных или монолитных фундаментных работ рассмотрите марки M300 и выше.',
        },
      },
      {
        q: {
          az: 'M200 beton neçə manatdır?',
          en: 'How much does M200 concrete cost?',
          ru: 'Сколько стоит бетон M200?',
        },
        a: {
          az: 'Saytda sabit qiymət yazmırıq, çünki qiymət həcmdən, çatdırılma məsafəsindən və nasos ehtiyacından asılı dəyişir. Sorğu göndərin — layihənizə uyğun dəqiq rəqəmi qısa zamanda təqdim edək.',
          en: 'We do not publish fixed prices on the site, because the price varies with volume, delivery distance and whether a pump is needed. Send us a request — we will quickly provide an exact figure for your project.',
          ru: 'Мы не публикуем фиксированные цены на сайте, потому что цена зависит от объёма, расстояния доставки и необходимости насоса. Отправьте заявку — мы быстро подготовим точную цифру для вашего проекта.',
        },
      },
      {
        q: {
          az: 'Həyətə neçə santimetr M200 beton tökülməlidir?',
          en: 'How thick should an M200 yard slab be?',
          ru: 'Какой толщины должен быть слой M200 во дворе?',
        },
        a: {
          az: 'Piyada sahələr üçün adətən 8–10 sm, minik avtomobili keçən sahələr üçün 10–15 sm tövsiyə olunur. Sahəni və qalınlığı beton kalkulyatorumuza yazın — lazımi m³ avtomatik hesablanacaq.',
          en: 'Usually 8–10 cm for pedestrian areas and 10–15 cm for areas used by passenger cars. Enter the area and thickness into our concrete calculator — the required m³ is computed automatically.',
          ru: 'Обычно 8–10 см для пешеходных зон и 10–15 см для участков, по которым проезжает легковой автомобиль. Введите площадь и толщину в наш калькулятор бетона — нужный объём в м³ рассчитается автоматически.',
        },
      },
      {
        q: {
          az: 'B15 beton M200-ün eynisidir?',
          en: 'Is B15 concrete the same as M200?',
          ru: 'Бетон B15 — это то же самое, что M200?',
        },
        a: {
          az: 'Bəli. B15 — M200 markasının möhkəmlik sinfidir (15 MPa). Layihə sənədlərində hər iki işarələnmə ilə rastlaşa bilərsiniz.',
          en: 'Yes. B15 is the strength class of the M200 grade (15 MPa). You may encounter both designations in project documentation.',
          ru: 'Да. B15 — класс прочности марки M200 (15 МПа). В проектной документации могут встречаться оба обозначения.',
        },
      },
    ],
  },
  M250: {
    hero: imgHazirBeton,
    use: {
      az: 'zolaq təməl, daşıyıcı divar',
      en: 'strip foundations, load-bearing walls',
      ru: 'ленточные фундаменты, несущие стены',
    },
    tagline: {
      az: 'Zolaq təməl və daşıyıcı divarlar üçün etibarlı orta sinif marka',
      en: 'A reliable mid-range grade for strip foundations and load-bearing walls',
      ru: 'Надёжная марка среднего класса для ленточных фундаментов и несущих стен',
    },
    intro: [
      {
        az: 'M250 (B20 sinfi) fərdi yaşayış evlərinin zolaq təməlləri, daşıyıcı divarlar və orta yüklü monolit elementlər üçün nəzərdə tutulub. M200-dən möhkəm, M300-dən sərfəli olduğu üçün 1–2 mərtəbəli ev tikintisində tez-tez optimal nöqtə məhz M250 olur.',
        en: 'M250 (class B20) is intended for strip foundations of private houses, load-bearing walls and moderately loaded monolithic elements. Stronger than M200 and more economical than M300, M250 is often the optimal choice for 1–2 storey house construction.',
        ru: 'M250 (класс B20) предназначен для ленточных фундаментов частных жилых домов, несущих стен и умеренно нагруженных монолитных элементов. Прочнее M200 и выгоднее M300 — поэтому при строительстве домов в 1–2 этажа оптимальной точкой часто оказывается именно M250.',
      },
      {
        az: 'İstehsal Novxanı zavodumuzda GOST 26633 üzrə aparılır; hər partiya laboratoriyada yoxlanılır və 28 günlük kub sınağından keçirilir. Təməl tökmə qrafikinizə uyğun mikser axını planlaşdırır, ehtiyac olduqda nasos xidməti də təşkil edirik.',
        en: 'Production takes place at our Novkhani plant per GOST 26633; every batch is checked in the laboratory and passes the 28-day cube test. We plan the mixer-truck flow to match your foundation pour schedule and arrange pump service when needed.',
        ru: 'Производство ведётся на нашем заводе в Новханы по ГОСТ 26633; каждая партия проверяется в лаборатории и проходит испытание кубиков на 28-е сутки. Планируем поток миксеров под ваш график заливки фундамента, при необходимости организуем услуги бетононасоса.',
      },
    ],
    benefits: [
      {
        title: {
          az: 'Zolaq təməllər',
          en: 'Strip foundations',
          ru: 'Ленточные фундаменты',
        },
        text: {
          az: '1–2 mərtəbəli evlərin lent tipli özül tökmələri üçün.',
          en: 'For strip-type foundation pours of 1–2 storey houses.',
          ru: 'Для заливки ленточных фундаментов домов в 1–2 этажа.',
        },
      },
      {
        title: {
          az: 'Daşıyıcı divarlar',
          en: 'Load-bearing walls',
          ru: 'Несущие стены',
        },
        text: {
          az: 'Monolit daşıyıcı divar və dayaq elementləri.',
          en: 'Monolithic load-bearing walls and support elements.',
          ru: 'Монолитные несущие стены и опорные элементы.',
        },
      },
      {
        title: {
          az: 'Hasar özülləri',
          en: 'Fence foundations',
          ru: 'Фундаменты заборов',
        },
        text: {
          az: 'Ağır hasar və dayaq divarlarının bünövrəsi.',
          en: 'Footings for heavy fences and retaining walls.',
          ru: 'Основания тяжёлых заборов и подпорных стен.',
        },
      },
      {
        title: {
          az: 'Orta yüklü plitələr',
          en: 'Moderately loaded slabs',
          ru: 'Плиты средней нагрузки',
        },
        text: {
          az: 'Yardımçı tikililərin monolit örtük plitələri.',
          en: 'Monolithic roof slabs of auxiliary buildings.',
          ru: 'Монолитные плиты перекрытия хозяйственных построек.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'M250 beton harada istifadə olunur?',
          en: 'Where is M250 concrete used?',
          ru: 'Где используется бетон M250?',
        },
        a: {
          az: 'Fərdi evlərin zolaq təməlləri, daşıyıcı divarlar, dayaq divarları, ağır hasar özülləri və orta yüklü monolit plitələr. Ağır və çoxmərtəbəli konstruksiyalarda M300+ seçilməlidir.',
          en: 'Strip foundations of private houses, load-bearing walls, retaining walls, footings for heavy fences and moderately loaded monolithic slabs. For heavy and multi-storey structures, M300+ should be chosen.',
          ru: 'Ленточные фундаменты частных домов, несущие стены, подпорные стены, основания тяжёлых заборов и умеренно нагруженные монолитные плиты. Для тяжёлых и многоэтажных конструкций следует выбирать M300+.',
        },
      },
      {
        q: {
          az: 'Ev təməli üçün M250 yoxsa M300 seçim?',
          en: 'M250 or M300 for a house foundation?',
          ru: 'M250 или M300 для фундамента дома?',
        },
        a: {
          az: 'Yüngül konstruksiyalı 1–2 mərtəbəli evlərdə zolaq təməl üçün M250 çox vaxt kifayətdir; monolit plitə təməl, zəif qrunt və ya 2+ mərtəbə olduqda M300 tövsiyə olunur. Layihəni yazın — pulsuz dəqiqləşdirək.',
          en: 'For light 1–2 storey houses, M250 is often sufficient for a strip foundation; with a monolithic slab foundation, weak soil or 2+ storeys, M300 is recommended. Send us your project details — we will clarify for free.',
          ru: 'Для лёгких домов в 1–2 этажа M250 часто достаточно для ленточного фундамента; при монолитной фундаментной плите, слабом грунте или 2+ этажах рекомендуется M300. Опишите проект — бесплатно уточним.',
        },
      },
      {
        q: {
          az: 'M250 betonun qiyməti M200-dən nə qədər fərqlənir?',
          en: 'How does the price of M250 differ from M200?',
          ru: 'Насколько цена M250 отличается от M200?',
        },
        a: {
          az: 'M250-də sement payı daha yüksəkdir, ona görə qiyməti bir qədər çoxdur. Dəqiq fərq cari xammal qiymətlərindən asılıdır — hər iki marka üçün eyni sorğuda müqayisəli təklif verə bilərik.',
          en: 'M250 has a higher cement content, so it costs somewhat more. The exact difference depends on current raw-material prices — we can give you a comparative offer for both grades in a single request.',
          ru: 'В M250 доля цемента выше, поэтому он стоит немного дороже. Точная разница зависит от текущих цен на сырьё — по одному запросу мы можем дать сравнительное предложение по обеим маркам.',
        },
      },
      {
        q: {
          az: 'B20 sinfi nə deməkdir?',
          en: 'What does class B20 mean?',
          ru: 'Что означает класс B20?',
        },
        a: {
          az: 'B20 — M250 markasına uyğun möhkəmlik sinfidir və betonun 20 MPa təzyiqə davam gətirdiyini göstərir.',
          en: 'B20 is the strength class corresponding to the M250 grade and indicates that the concrete withstands a pressure of 20 MPa.',
          ru: 'B20 — класс прочности, соответствующий марке M250; он показывает, что бетон выдерживает давление 20 МПа.',
        },
      },
    ],
  },
  M300: {
    hero: imgHazirBeton,
    use: {
      az: 'monolit təməl, plitə, sütun',
      en: 'monolithic foundations, slabs, columns',
      ru: 'монолитные фундаменты, плиты, колонны',
    },
    tagline: {
      az: 'Monolit təməl, plitə və sütunlar üçün ən çox sifariş olunan konstruktiv marka',
      en: 'The most-ordered structural grade for monolithic foundations, slabs and columns',
      ru: 'Самая заказываемая конструкционная марка для монолитных фундаментов, плит и колонн',
    },
    intro: [
      {
        az: 'M300 (B22.5 sinfi) Azərbaycanda fərdi və aşağımərtəbəli tikintinin “qızıl standartı” sayılır: monolit təməllər, özül plitələri, sütunlar, riqellər və mərtəbəarası örtüklər üçün ən çox sifariş olunan markadır. Möhkəmliyi (22.5 MPa) əksər yaşayış layihələrinin yükünü rahat qarşılayır.',
        en: 'M300 (class B22.5) is considered the "gold standard" of private and low-rise construction in Azerbaijan: the most-ordered grade for monolithic foundations, foundation slabs, columns, beams and floor slabs. Its strength (22.5 MPa) comfortably handles the loads of most residential projects.',
        ru: 'M300 (класс B22.5) считается «золотым стандартом» частного и малоэтажного строительства в Азербайджане: самая заказываемая марка для монолитных фундаментов, фундаментных плит, колонн, ригелей и межэтажных перекрытий. Прочность (22.5 МПа) уверенно покрывает нагрузки большинства жилых проектов.',
      },
      {
        az: 'Novxanı Beton M300-ü GOST 26633 tələblərinə uyğun istehsal edir — hər partiya laboratoriya nəzarətindən və 28 günlük möhkəmlik sınağından keçir. Bakı və Abşeron üzrə mikserlə çatdırılma, böyük tökmələrdə fasiləsiz mikser axını və nasos xidməti təşkil olunur.',
        en: 'Novxani Beton produces M300 to GOST 26633 requirements — every batch passes laboratory control and the 28-day strength test. We arrange mixer-truck delivery across Baku and Absheron, with an uninterrupted mixer flow and pump service for large pours.',
        ru: 'Novxani Beton производит M300 по требованиям ГОСТ 26633 — каждая партия проходит лабораторный контроль и испытание прочности на 28-е сутки. Организуем доставку миксерами по Баку и Абшерону, а при больших заливках — непрерывный поток миксеров и услуги бетононасоса.',
      },
    ],
    benefits: [
      {
        title: {
          az: 'Monolit təməllər',
          en: 'Monolithic foundations',
          ru: 'Монолитные фундаменты',
        },
        text: {
          az: 'Plitə və zolaq təməllərin əsas markası — yaşayış tikintisinin standartı.',
          en: 'The core grade for slab and strip foundations — the standard of residential construction.',
          ru: 'Основная марка для плитных и ленточных фундаментов — стандарт жилищного строительства.',
        },
      },
      {
        title: {
          az: 'Sütun və riqellər',
          en: 'Columns and beams',
          ru: 'Колонны и ригели',
        },
        text: {
          az: 'Karkas binaların daşıyıcı elementləri üçün kifayət qədər möhkəm.',
          en: 'Strong enough for the load-bearing elements of frame buildings.',
          ru: 'Достаточная прочность для несущих элементов каркасных зданий.',
        },
      },
      {
        title: {
          az: 'Mərtəbəarası örtüklər',
          en: 'Floor slabs',
          ru: 'Межэтажные перекрытия',
        },
        text: {
          az: 'Monolit plitə və örtük tökmələrində geniş istifadə.',
          en: 'Widely used for monolithic slab and deck pours.',
          ru: 'Широко применяется при заливке монолитных плит и перекрытий.',
        },
      },
      {
        title: {
          az: 'Hovuz və su qurğuları',
          en: 'Pools and water structures',
          ru: 'Бассейны и водные сооружения',
        },
        text: {
          az: 'Sıx strukturu su qurğularının tökülməsində üstünlük verir.',
          en: 'Its dense structure is an advantage when pouring water-retaining structures.',
          ru: 'Плотная структура даёт преимущество при заливке водных сооружений.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'M300 beton harada istifadə olunur?',
          en: 'Where is M300 concrete used?',
          ru: 'Где используется бетон M300?',
        },
        a: {
          az: 'Monolit təməllər (plitə və zolaq), sütunlar, riqellər, mərtəbəarası örtüklər, monolit divarlar, pilləkənlər və hovuz tökmələri — M300 fərdi və aşağımərtəbəli tikintinin ən universal konstruktiv markasıdır.',
          en: 'Monolithic foundations (slab and strip), columns, beams, floor slabs, monolithic walls, stairs and pool pours — M300 is the most universal structural grade for private and low-rise construction.',
          ru: 'Монолитные фундаменты (плитные и ленточные), колонны, ригели, межэтажные перекрытия, монолитные стены, лестницы и заливка бассейнов — M300 — самая универсальная конструкционная марка частного и малоэтажного строительства.',
        },
      },
      {
        q: {
          az: 'M300 və M400 betonun fərqi nədir?',
          en: 'What is the difference between M300 and M400 concrete?',
          ru: 'В чём разница между бетоном M300 и M400?',
        },
        a: {
          az: 'M300 (B22.5) 22.5 MPa, M400 (B30) 30 MPa möhkəmliyə malikdir. M400-də sement payı daha yüksəkdir — körpü, hidrotexniki qurğular və yüksək yüklü konstruksiyalar üçündür. Adi yaşayış tikintisində M300 adətən kifayətdir və daha sərfəlidir.',
          en: 'M300 (B22.5) has a strength of 22.5 MPa, M400 (B30) — 30 MPa. M400 has a higher cement content and is intended for bridges, hydraulic structures and heavily loaded elements. For ordinary residential construction, M300 is usually sufficient and more economical.',
          ru: 'M300 (B22.5) имеет прочность 22.5 МПа, M400 (B30) — 30 МПа. В M400 выше доля цемента — он предназначен для мостов, гидротехнических сооружений и высоконагруженных конструкций. В обычном жилищном строительстве M300, как правило, достаточно, и он выгоднее.',
        },
      },
      {
        q: {
          az: '1 kub M300 beton neçə manatdır?',
          en: 'How much does 1 m³ of M300 concrete cost?',
          ru: 'Сколько стоит 1 куб бетона M300?',
        },
        a: {
          az: 'Qiymət sifariş həcmindən, çatdırılma məsafəsindən və nasos ehtiyacından asılı olaraq dəyişir, ona görə fərdi təklif veririk. Həcmi kalkulyatorla hesablayıb WhatsApp-la göndərin — dəqiq qiyməti qısa zamanda alacaqsınız.',
          en: 'The price varies with order volume, delivery distance and pump requirements, so we provide personalized quotes. Calculate the volume with our calculator and send it via WhatsApp — you will get the exact price shortly.',
          ru: 'Цена зависит от объёма заказа, расстояния доставки и необходимости насоса, поэтому мы делаем индивидуальные предложения. Рассчитайте объём калькулятором и отправьте в WhatsApp — точную цену вы получите в кратчайшие сроки.',
        },
      },
      {
        q: {
          az: 'Fundament üçün hansı beton lazımdır?',
          en: 'Which concrete do I need for a foundation?',
          ru: 'Какой бетон нужен для фундамента?',
        },
        a: {
          az: 'Monolit plitə təməl və 2+ mərtəbəli evlər üçün standart tövsiyə M300-dür. Yüngül 1–2 mərtəbəli evlərin zolaq təməlində M250 da yetərli ola bilər. Layihənizə görə pulsuz məsləhət veririk.',
          en: 'The standard recommendation for monolithic slab foundations and houses of 2+ storeys is M300. For strip foundations of light 1–2 storey houses, M250 may also be sufficient. We advise free of charge based on your project.',
          ru: 'Стандартная рекомендация для монолитной фундаментной плиты и домов от 2 этажей — M300. Для ленточного фундамента лёгкого дома в 1–2 этажа может быть достаточно и M250. Бесплатно консультируем по вашему проекту.',
        },
      },
    ],
  },
  M350: {
    hero: imgPour,
    use: {
      az: 'karkas, riqel, çoxmərtəbəli bina',
      en: 'frame structures, beams, multi-storey buildings',
      ru: 'каркасы, ригели, многоэтажные здания',
    },
    tagline: {
      az: 'Çoxmərtəbəli karkas binalar və yüksək yüklü konstruksiyalar üçün marka',
      en: 'A grade for multi-storey frame buildings and heavily loaded structures',
      ru: 'Марка для многоэтажных каркасных зданий и высоконагруженных конструкций',
    },
    intro: [
      {
        az: 'M350 (B25 sinfi) çoxmərtəbəli binaların karkas elementləri — sütunlar, riqellər, diafraqmalar və yüksək yüklü örtük plitələri üçün nəzərdə tutulmuş markadır. 25 MPa möhkəmliyi onu layihə mühəndislərinin çoxmərtəbəli yaşayış və kommersiya obyektlərində standart seçiminə çevirir.',
        en: 'M350 (class B25) is intended for the frame elements of multi-storey buildings — columns, beams, shear walls and heavily loaded floor slabs. Its 25 MPa strength makes it the standard choice of design engineers for multi-storey residential and commercial projects.',
        ru: 'M350 (класс B25) предназначен для каркасных элементов многоэтажных зданий — колонн, ригелей, диафрагм жёсткости и высоконагруженных плит перекрытий. Прочность 25 МПа делает его стандартным выбором проектировщиков для многоэтажных жилых и коммерческих объектов.',
      },
      {
        az: 'Tikinti şirkətləri üçün M350 təchizatını qrafik üzrə, fasiləsiz mikser axını ilə təşkil edirik — beton tökmə növbələriniz dayanmır. İstehsal GOST 26633 üzrə, laboratoriya nəzarəti və 28 günlük kub sınağı ilə aparılır.',
        en: 'For construction companies we organize M350 supply on schedule, with an uninterrupted mixer flow — your pour shifts never stop. Production follows GOST 26633, with laboratory control and 28-day cube testing.',
        ru: 'Для строительных компаний организуем поставку M350 по графику, с непрерывным потоком миксеров — ваши смены заливки не останавливаются. Производство ведётся по ГОСТ 26633, с лабораторным контролем и испытанием кубиков на 28-е сутки.',
      },
    ],
    benefits: [
      {
        title: {
          az: 'Çoxmərtəbəli karkas',
          en: 'Multi-storey frames',
          ru: 'Многоэтажный каркас',
        },
        text: {
          az: 'Sütun, riqel və diafraqmaların layihə standartı.',
          en: 'The design standard for columns, beams and shear walls.',
          ru: 'Проектный стандарт для колонн, ригелей и диафрагм.',
        },
      },
      {
        title: {
          az: 'Yüksək yüklü örtüklər',
          en: 'Heavily loaded slabs',
          ru: 'Высоконагруженные перекрытия',
        },
        text: {
          az: 'Böyük aşırımlı monolit plitələr üçün etibarlı möhkəmlik.',
          en: 'Reliable strength for long-span monolithic slabs.',
          ru: 'Надёжная прочность для монолитных плит с большими пролётами.',
        },
      },
      {
        title: {
          az: 'Kommersiya obyektləri',
          en: 'Commercial projects',
          ru: 'Коммерческие объекты',
        },
        text: {
          az: 'Ticarət mərkəzləri və inzibati binaların monolit işləri.',
          en: 'Monolithic work for shopping centers and office buildings.',
          ru: 'Монолитные работы торговых центров и административных зданий.',
        },
      },
      {
        title: {
          az: 'Davamlı təchizat',
          en: 'Continuous supply',
          ru: 'Непрерывные поставки',
        },
        text: {
          az: 'Layihə boyu qrafikli, fasiləsiz beton axını.',
          en: 'A scheduled, uninterrupted concrete flow throughout the project.',
          ru: 'Плановый, бесперебойный поток бетона на протяжении всего проекта.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'M350 beton harada istifadə olunur?',
          en: 'Where is M350 concrete used?',
          ru: 'Где используется бетон M350?',
        },
        a: {
          az: 'Çoxmərtəbəli binaların karkası (sütun, riqel, diafraqma), yüksək yüklü mərtəbəarası örtüklər, böyük aşırımlı plitələr və kommersiya obyektlərinin monolit konstruksiyaları.',
          en: 'Frames of multi-storey buildings (columns, beams, shear walls), heavily loaded floor slabs, long-span slabs and monolithic structures of commercial projects.',
          ru: 'Каркасы многоэтажных зданий (колонны, ригели, диафрагмы), высоконагруженные межэтажные перекрытия, плиты с большими пролётами и монолитные конструкции коммерческих объектов.',
        },
      },
      {
        q: {
          az: 'M350 ilə M300-ün fərqi nədir?',
          en: 'What is the difference between M350 and M300?',
          ru: 'В чём разница между M350 и M300?',
        },
        a: {
          az: 'M350 (B25, 25 MPa) M300-dən (B22.5, 22.5 MPa) daha möhkəmdir və layihədə yük daha çox olduqda seçilir. Hansının lazım olduğunu layihə konstruktoru müəyyən edir — layihəniz yoxdursa, obyekt barədə məlumat verin, məsləhətləşək.',
          en: 'M350 (B25, 25 MPa) is stronger than M300 (B22.5, 22.5 MPa) and is chosen when the design loads are higher. The structural engineer determines which one is required — if you have no design, tell us about the project and we will advise you.',
          ru: 'M350 (B25, 25 МПа) прочнее M300 (B22.5, 22.5 МПа) и выбирается при более высоких проектных нагрузках. Какая марка нужна, определяет конструктор проекта — если проекта нет, расскажите об объекте, и мы проконсультируем.',
        },
      },
      {
        q: {
          az: 'Böyük həcmli M350 sifarişində şərtlər necədir?',
          en: 'What are the terms for large-volume M350 orders?',
          ru: 'Какие условия при крупных заказах M350?',
        },
        a: {
          az: 'Çoxmərtəbəli layihələr üçün davamlı təchizat qrafiki qurulur və həcmə uyğun xüsusi kommersiya şərtləri təklif olunur. Layihənin ümumi həcmini bildirin — müqavilə əsaslı təklif hazırlayaq.',
          en: 'For multi-storey projects we set up a continuous supply schedule and offer special commercial terms based on volume. Tell us the total volume of the project — we will prepare a contract-based offer.',
          ru: 'Для многоэтажных проектов выстраивается график непрерывных поставок и предлагаются специальные коммерческие условия в зависимости от объёма. Сообщите общий объём проекта — подготовим предложение на договорной основе.',
        },
      },
      {
        q: {
          az: 'M350 nasosla vurula bilərmi?',
          en: 'Can M350 be placed with a pump?',
          ru: 'Можно ли подавать M350 бетононасосом?',
        },
        a: {
          az: 'Bəli, M350 qarışığı nasoslamaya uyğun hazırlanır — hündür mərtəbələrə tökmə üçün nasos xidmətini betonla birlikdə sifariş edə bilərsiniz.',
          en: 'Yes, the M350 mix is prepared to be pumpable — for pouring at height you can order pump service together with the concrete.',
          ru: 'Да, смесь M350 готовится с учётом подачи насосом — для заливки на высоте услуги бетононасоса можно заказать вместе с бетоном.',
        },
      },
    ],
  },
  M400: {
    hero: imgQiymet,
    use: {
      az: 'körpü, hidrotexniki, yüksək yük',
      en: 'bridges, hydraulic structures, heavy loads',
      ru: 'мосты, гидротехнические сооружения, высокие нагрузки',
    },
    tagline: {
      az: 'Körpü, hidrotexniki qurğular və xüsusi yüklü konstruksiyalar üçün yüksək markalı beton',
      en: 'High-grade concrete for bridges, hydraulic structures and specially loaded elements',
      ru: 'Бетон высокой марки для мостов, гидротехнических сооружений и особо нагруженных конструкций',
    },
    intro: [
      {
        az: 'M400 (B30 sinfi) yüksək möhkəmlikli betondur: körpülər, hidrotexniki qurğular, sənaye obyektlərinin ağır yüklü konstruksiyaları və xüsusi mühəndis layihələri üçün nəzərdə tutulub. 30 MPa möhkəmlik və sıx struktur ona həm yük, həm də aqressiv mühit davamlılığı verir.',
        en: 'M400 (class B30) is a high-strength concrete intended for bridges, hydraulic structures, heavily loaded industrial structures and special engineering projects. Its 30 MPa strength and dense structure give it resistance both to load and to aggressive environments.',
        ru: 'M400 (класс B30) — бетон высокой прочности: он предназначен для мостов, гидротехнических сооружений, тяжело нагруженных конструкций промышленных объектов и специальных инженерных проектов. Прочность 30 МПа и плотная структура обеспечивают стойкость как к нагрузкам, так и к агрессивной среде.',
      },
      {
        az: 'M400 istehsalında sement payı yüksəkdir və qarışıq daha ciddi nəzarət tələb edir — hər partiya laboratoriyamızda yoxlanılır, 28 günlük kub sınağından keçirilir. İnfrastruktur və sənaye layihələri üçün qrafikli təchizat təşkil edirik.',
        en: 'M400 has a high cement content and its mix requires stricter control — every batch is checked in our laboratory and passes the 28-day cube test. For infrastructure and industrial projects we organize scheduled supply.',
        ru: 'В M400 высокая доля цемента, и смесь требует более строгого контроля — каждая партия проверяется в нашей лаборатории и проходит испытание кубиков на 28-е сутки. Для инфраструктурных и промышленных проектов организуем поставки по графику.',
      },
    ],
    benefits: [
      {
        title: {
          az: 'Körpü və yol qurğuları',
          en: 'Bridges and road structures',
          ru: 'Мосты и дорожные сооружения',
        },
        text: {
          az: 'İnfrastruktur obyektlərinin daşıyıcı konstruksiyaları.',
          en: 'Load-bearing structures of infrastructure projects.',
          ru: 'Несущие конструкции инфраструктурных объектов.',
        },
      },
      {
        title: {
          az: 'Hidrotexniki qurğular',
          en: 'Hydraulic structures',
          ru: 'Гидротехнические сооружения',
        },
        text: {
          az: 'Su ilə təmasda olan konstruksiyalar üçün sıx struktur.',
          en: 'A dense structure for elements in contact with water.',
          ru: 'Плотная структура для конструкций, контактирующих с водой.',
        },
      },
      {
        title: {
          az: 'Sənaye konstruksiyaları',
          en: 'Industrial structures',
          ru: 'Промышленные конструкции',
        },
        text: {
          az: 'Ağır avadanlıq özülləri və sənaye döşəmələri.',
          en: 'Foundations for heavy equipment and industrial floors.',
          ru: 'Фундаменты под тяжёлое оборудование и промышленные полы.',
        },
      },
      {
        title: {
          az: 'Yüksək mərtəbəli binalar',
          en: 'High-rise buildings',
          ru: 'Высотные здания',
        },
        text: {
          az: 'Aşağı mərtəbələrin yüksək yüklü daşıyıcı elementləri.',
          en: 'Heavily loaded structural elements of the lower floors.',
          ru: 'Высоконагруженные несущие элементы нижних этажей.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'M400 beton harada istifadə olunur?',
          en: 'Where is M400 concrete used?',
          ru: 'Где используется бетон M400?',
        },
        a: {
          az: 'Körpülər, hidrotexniki qurğular, sənaye obyektlərinin ağır yüklü özülləri, yüksəkmərtəbəli binaların aşağı mərtəbə daşıyıcıları və xüsusi mühəndis konstruksiyaları. Adi yaşayış tikintisi üçün adətən M300–M350 kifayətdir.',
          en: 'Bridges, hydraulic structures, heavily loaded industrial foundations, load-bearing elements of the lower floors of high-rise buildings and special engineering structures. For ordinary residential construction, M300–M350 is usually sufficient.',
          ru: 'Мосты, гидротехнические сооружения, тяжело нагруженные фундаменты промышленных объектов, несущие элементы нижних этажей высотных зданий и специальные инженерные конструкции. Для обычного жилищного строительства обычно достаточно M300–M350.',
        },
      },
      {
        q: {
          az: 'M400 betonun qiyməti niyə yüksəkdir?',
          en: 'Why is M400 concrete more expensive?',
          ru: 'Почему бетон M400 стоит дороже?',
        },
        a: {
          az: 'M400-də sement payı marka xəttinin ən yüksəklərindəndir və istehsal nəzarəti daha ciddidir. Dəqiq qiymət həcm və ünvana görə fərdi hesablanır — sorğu göndərin, müqayisəli təklif verək.',
          en: 'M400 has one of the highest cement contents in the range, and production control is stricter. The exact price is calculated individually by volume and address — send a request and we will give you a comparative offer.',
          ru: 'В M400 одна из самых высоких долей цемента в линейке, а контроль производства строже. Точная цена рассчитывается индивидуально по объёму и адресу — отправьте запрос, и мы дадим сравнительное предложение.',
        },
      },
      {
        q: {
          az: 'B30 beton nədir?',
          en: 'What is B30 concrete?',
          ru: 'Что такое бетон B30?',
        },
        a: {
          az: 'B30 — M400 markasının möhkəmlik sinfidir: 30 MPa təzyiqə davamlılıq. Layihələrdə M400 və B30 eyni betonu ifadə edir.',
          en: 'B30 is the strength class of the M400 grade: resistance to a pressure of 30 MPa. In projects, M400 and B30 refer to the same concrete.',
          ru: 'B30 — класс прочности марки M400: стойкость к давлению 30 МПа. В проектах M400 и B30 обозначают один и тот же бетон.',
        },
      },
      {
        q: {
          az: 'Fərdi ev tikintisində M400 lazımdırmı?',
          en: 'Do I need M400 for a private house?',
          ru: 'Нужен ли M400 при строительстве частного дома?',
        },
        a: {
          az: 'Əksər hallarda yox — bu, artıq xərcdir. M400 layihədə xüsusi tələb olduqda seçilir. Layihəsiz sifarişlərdə obyekt barədə məlumat verin, düzgün markanı birlikdə seçək.',
          en: 'In most cases no — it would be an unnecessary expense. M400 is chosen when the design specifically requires it. If you are ordering without a design, tell us about the project and we will choose the right grade together.',
          ru: 'В большинстве случаев нет — это лишние расходы. M400 выбирают, когда в проекте есть особое требование. Если заказываете без проекта, расскажите об объекте — вместе подберём правильную марку.',
        },
      },
    ],
  },
  M450: {
    hero: imgSite,
    use: {
      az: 'xüsusi mühəndis konstruksiyaları',
      en: 'special engineering structures',
      ru: 'специальные инженерные конструкции',
    },
    tagline: {
      az: 'Xüsusi mühəndis konstruksiyaları üçün xəttimizin ən yüksək möhkəmlikli markası',
      en: 'The highest-strength grade in our range, for special engineering structures',
      ru: 'Марка с самой высокой прочностью в нашей линейке — для специальных инженерных конструкций',
    },
    intro: [
      {
        az: 'M450 (B35 sinfi) istehsal xəttimizin ən yüksək markasıdır — 35 MPa möhkəmlik. Xüsusi mühəndis konstruksiyaları, hərtərəfli yüksək yük daşıyan elementlər və layihədə açıq şəkildə B35 tələb olunan obyektlər üçün istehsal olunur.',
        en: 'M450 (class B35) is the highest grade in our production range — 35 MPa strength. It is produced for special engineering structures, elements carrying exceptionally high loads and projects where B35 is explicitly required by the design.',
        ru: 'M450 (класс B35) — самая высокая марка нашей производственной линейки: прочность 35 МПа. Производится для специальных инженерных конструкций, элементов с особо высокими нагрузками и объектов, где в проекте прямо указан класс B35.',
      },
      {
        az: 'Bu səviyyəli beton dəqiq resept və ciddi istehsal nəzarəti tələb edir: qarışıq laboratoriyada layihə tələbinə uyğun hazırlanır, hər partiya sınaqdan keçirilir və sənədləşdirilir. M450 sifarişləri adətən layihə sənədləri əsasında, əvvəlcədən razılaşdırılmış qrafiklə yerinə yetirilir.',
        en: 'Concrete of this level requires a precise mix design and strict production control: the mix is prepared in the laboratory to the design requirements, and every batch is tested and documented. M450 orders are usually fulfilled on the basis of design documents, on a pre-agreed schedule.',
        ru: 'Бетон такого уровня требует точной рецептуры и строгого производственного контроля: смесь готовится в лаборатории по требованиям проекта, каждая партия испытывается и документируется. Заказы M450 обычно выполняются на основании проектной документации, по заранее согласованному графику.',
      },
    ],
    benefits: [
      {
        title: {
          az: 'Xüsusi konstruksiyalar',
          en: 'Special structures',
          ru: 'Специальные конструкции',
        },
        text: {
          az: 'Layihədə B35 tələb olunan mühəndis obyektləri.',
          en: 'Engineering projects where the design requires B35.',
          ru: 'Инженерные объекты, где проект требует B35.',
        },
      },
      {
        title: {
          az: 'Maksimal möhkəmlik',
          en: 'Maximum strength',
          ru: 'Максимальная прочность',
        },
        text: {
          az: 'Xəttimizin ən yüksək göstəricisi — 35 MPa.',
          en: 'The highest figure in our range — 35 MPa.',
          ru: 'Самый высокий показатель нашей линейки — 35 МПа.',
        },
      },
      {
        title: {
          az: 'Layihə əsaslı istehsal',
          en: 'Design-based production',
          ru: 'Производство по проекту',
        },
        text: {
          az: 'Qarışıq layihə tələbinə uyğun laboratoriyada hazırlanır.',
          en: 'The mix is prepared in the laboratory to the design requirements.',
          ru: 'Смесь готовится в лаборатории по требованиям проекта.',
        },
      },
      {
        title: {
          az: 'Sənədli keyfiyyət',
          en: 'Documented quality',
          ru: 'Документированное качество',
        },
        text: {
          az: 'Hər partiya sınaq nəticələri ilə sənədləşdirilir.',
          en: 'Every batch is documented with test results.',
          ru: 'Каждая партия документируется с результатами испытаний.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'M450 beton hansı işlərdə tələb olunur?',
          en: 'For which work is M450 concrete required?',
          ru: 'В каких работах требуется бетон M450?',
        },
        a: {
          az: 'Xüsusi mühəndis konstruksiyaları, çox yüksək yüklü daşıyıcı elementlər və layihə sənədlərində B35 sinfi açıq göstərilən obyektlər üçün. Adi tikintidə bu markaya ehtiyac yaranmır.',
          en: 'Special engineering structures, extremely heavily loaded load-bearing elements and projects where class B35 is explicitly specified in the design documents. Ordinary construction does not call for this grade.',
          ru: 'Специальные инженерные конструкции, особо высоконагруженные несущие элементы и объекты, где класс B35 прямо указан в проектной документации. В обычном строительстве потребность в этой марке не возникает.',
        },
      },
      {
        q: {
          az: 'M450 sifarişi necə verilir?',
          en: 'How do I order M450?',
          ru: 'Как заказать M450?',
        },
        a: {
          az: 'Layihə tələblərini (sinif, həcm, tökmə qrafiki) bizə göndərin — qarışıq laboratoriyada layihəyə uyğun hazırlanır və istehsal qrafiki əvvəlcədən razılaşdırılır.',
          en: 'Send us the design requirements (class, volume, pour schedule) — the mix is prepared in the laboratory to match the design and the production schedule is agreed in advance.',
          ru: 'Отправьте нам требования проекта (класс, объём, график заливки) — смесь готовится в лаборатории по проекту, а график производства согласуется заранее.',
        },
      },
      {
        q: {
          az: 'M450-dən yuxarı marka istehsal edirsiniz?',
          en: 'Do you produce grades above M450?',
          ru: 'Производите ли вы марки выше M450?',
        },
        a: {
          az: 'Standart xəttimiz M100–M450 aralığını əhatə edir. Layihənizdə daha yüksək sinif tələb olunursa, əlaqə saxlayın — imkanları birlikdə dəyərləndirək.',
          en: 'Our standard range covers M100–M450. If your project requires a higher class, contact us — we will evaluate the possibilities together.',
          ru: 'Наша стандартная линейка охватывает диапазон M100–M450. Если в вашем проекте требуется более высокий класс, свяжитесь с нами — вместе оценим возможности.',
        },
      },
      {
        q: {
          az: 'M450 betonun keyfiyyəti necə təsdiqlənir?',
          en: 'How is the quality of M450 confirmed?',
          ru: 'Как подтверждается качество бетона M450?',
        },
        a: {
          az: 'İstehsal GOST 26633 üzrə aparılır, hər partiya laboratoriya nəzarətindən keçir, 28 günlük kub sınağı ilə yoxlanılır və nəticələr sənədlə təqdim olunur.',
          en: 'Production follows GOST 26633, every batch passes laboratory control, is verified by the 28-day cube test, and the results are provided in writing.',
          ru: 'Производство ведётся по ГОСТ 26633, каждая партия проходит лабораторный контроль, проверяется испытанием кубиков на 28-е сутки, а результаты предоставляются документально.',
        },
      },
    ],
  },
};

// Neighbour-grade related links: previous/next grade + always-useful pages.
const buildRelated = (id) => {
  const idx = CONCRETE_GRADES.findIndex((g) => g.id === id);
  const rel = [
    {
      to: `/calculator?grade=${id}`,
      label: {
        az: `${id} ilə həcmi hesabla`,
        en: `Calculate the volume with ${id}`,
        ru: `Рассчитать объём с ${id}`,
      },
    },
    {
      to: '/beton-qiymetleri',
      label: {
        az: 'Qiymət necə formalaşır?',
        en: 'How is the price formed?',
        ru: 'Как формируется цена?',
      },
    },
  ];
  const prev = CONCRETE_GRADES[idx - 1];
  const next = CONCRETE_GRADES[idx + 1];
  if (prev) {
    rel.push({
      to: `/${prev.id.toLowerCase()}-beton`,
      label: {
        az: `${prev.id} beton (${prev.bClass})`,
        en: `${prev.id} concrete (${prev.bClass})`,
        ru: `Бетон ${prev.id} (${prev.bClass})`,
      },
    });
  }
  if (next) {
    rel.push({
      to: `/${next.id.toLowerCase()}-beton`,
      label: {
        az: `${next.id} beton (${next.bClass})`,
        en: `${next.id} concrete (${next.bClass})`,
        ru: `Бетон ${next.id} (${next.bClass})`,
      },
    });
  }
  rel.push({
    to: '/products',
    label: {
      az: 'Bütün beton markaları',
      en: 'All concrete grades',
      ru: 'Все марки бетона',
    },
  });
  return rel;
};

export const GRADE_PAGES = CONCRETE_GRADES.map((g) => {
  const c = GRADE_CONTENT[g.id];
  return {
    slug: `/${g.id.toLowerCase()}-beton`,
    seo: {
      title: {
        az: `${g.id} Beton (${g.bClass}) — Qiyməti, İstifadə Sahələri və Sifariş | NOVXANI BETON`,
        en: `${g.id} Concrete (${g.bClass}) — Price, Applications and Ordering | NOVXANI BETON`,
        ru: `Бетон ${g.id} (${g.bClass}) — цена, применение и заказ | NOVXANI BETON`,
      },
      description: {
        az: `${g.id} beton (${g.bClass} sinfi, ${g.strength} MPa): ${c.use.az} üçün. GOST 26633 üzrə laboratoriya nəzarətli istehsal, Bakı və Abşeron üzrə çatdırılma. Fərdi qiymət təklifi alın.`,
        en: `${g.id} concrete (class ${g.bClass}, ${g.strength} MPa): for ${c.use.en}. Lab-controlled production per GOST 26633, delivery across Baku and Absheron. Request a personalized quote.`,
        ru: `Бетон ${g.id} (класс ${g.bClass}, ${g.strength} МПа): ${c.use.ru}. Производство по ГОСТ 26633 с лабораторным контролем, доставка по Баку и Абшерону. Получите индивидуальное предложение.`,
      },
    },
    crumb: {
      az: `${g.id} Beton`,
      en: `${g.id} Concrete`,
      ru: `Бетон ${g.id}`,
    },
    parentCrumb: {
      to: '/products',
      label: {
        az: 'Beton Markaları',
        en: 'Concrete Grades',
        ru: 'Марки бетона',
      },
    },
    h1: {
      az: `${g.id} Beton (${g.bClass})`,
      en: `${g.id} Concrete (${g.bClass})`,
      ru: `Бетон ${g.id} (${g.bClass})`,
    },
    tagline: c.tagline,
    hero: {
      image: c.hero,
      alt: {
        az: `${g.id} beton — ${c.use.az}`,
        en: `${g.id} concrete — ${c.use.en}`,
        ru: `бетон ${g.id} — ${c.use.ru}`,
      },
    },
    intro: c.intro,
    benefitsTitle: {
      az: 'İstifadə sahələri',
      en: 'Applications',
      ru: 'Области применения',
    },
    benefits: c.benefits,
    showGrades: true,
    currentGrade: g.id,
    stepsTitle: {
      az: `${g.id} beton sifarişi necə verilir`,
      en: `How to order ${g.id} concrete`,
      ru: `Как заказать бетон ${g.id}`,
    },
    steps: orderSteps,
    faqs: c.faqs,
    related: buildRelated(g.id),
    whatsappText: {
      az: `Salam! ${g.id} beton üçün qiymət təklifi almaq istəyirəm.`,
      en: `Hello! I would like to get a quote for ${g.id} concrete.`,
      ru: `Здравствуйте! Хочу получить предложение по цене на бетон ${g.id}.`,
    },
  };
});

export const getGradePage = (slug) => GRADE_PAGES.find((p) => p.slug === slug);
