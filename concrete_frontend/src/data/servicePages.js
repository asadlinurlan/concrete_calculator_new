/* ============================================================
   Service landing pages — single source of truth.
   Each entry drives a full SEO page rendered by <ServiceDetail/>:
   hero, intro, benefits, FAQ (+FAQPage JSON-LD) and per-page metadata.

   Content rules: only claims confirmed by the business are stated
   (GOST 26633, 28-day testing, M100–M600, 7/24, Novxanı plant,
   Bakı & Abşeron delivery). No invented specs or prices.

   i18n: every user-visible string is a { az, en, ru } object;
   consumers resolve the active language via t().
   ============================================================ */
import imgHazirBeton from '../app/Pages/img/service-1.png';
import imgCatdirilma from '../app/Pages/img/claus-grunstaudl-1_DvZyR3dRk-unsplash.jpg';
import imgNasoslama from '../app/Pages/img/service-2.webp';
import imgTerezi from '../app/Pages/img/service-terezi-home.jpg';
import imgQiymet from '../app/Pages/img/d-c-rnqRdfYyywM-unsplash.jpg';
import imgLab from '../app/Pages/img/concrete.jpeg';
import imgUsage from '../app/Pages/img/workers-construction-site.jpg';
import imgB2b from '../app/Pages/img/materials-b2b.webp';

export const SERVICE_PAGES = [
  {
    slug: '/hazir-beton-satisi',
    seo: {
      title: {
        az: 'Hazır Beton Satışı — M100–M600 Markaları | NOVXANI BETON',
        en: 'Ready-Mix Concrete Sales — Grades M100–M600 | NOVXANI BETON',
        ru: 'Продажа товарного бетона — марки M100–M600 | NOVXANI BETON',
      },
      description: {
        az: 'Bakı və Abşeronda laboratoriya nəzarətli hazır beton satışı. M100–M600 markaları GOST 26633 üzrə istehsal olunur, mikserlərlə ünvana çatdırılır. Fərdi qiymət təklifi alın.',
        en: 'Laboratory-controlled ready-mix concrete sales in Baku and Absheron. Grades M100–M600 are produced to GOST 26633 and delivered to your site by mixer trucks. Request a personalized quote.',
        ru: 'Продажа товарного бетона с лабораторным контролем в Баку и на Абшероне. Марки M100–M600 производятся по ГОСТ 26633 и доставляются миксерами на объект. Получите индивидуальное предложение.',
      },
    },
    crumb: {
      az: 'Hazır Beton Satışı',
      en: 'Ready-Mix Concrete Sales',
      ru: 'Продажа товарного бетона',
    },
    h1: {
      az: 'Hazır Beton Satışı',
      en: 'Ready-Mix Concrete Sales',
      ru: 'Продажа товарного бетона',
    },
    tagline: {
      az: 'M100–M600 markalı, laboratoriya nəzarətli hazır beton — Bakı və Abşeron üzrə çatdırılma ilə',
      en: 'Laboratory-controlled ready-mix concrete in grades M100–M600 — with delivery across Baku and Absheron',
      ru: 'Товарный бетон марок M100–M600 с лабораторным контролем — с доставкой по Баку и Абшерону',
    },
    hero: {
      image: imgHazirBeton,
      alt: {
        az: 'Tikinti sahəsində hazır betonun tökülməsi',
        en: 'Ready-mix concrete being poured at a construction site',
        ru: 'Заливка товарного бетона на строительной площадке',
      },
    },
    intro: [
      {
        az: 'Novxanı Beton 2018-ci ildən Bakı və Abşeron ərazisində tikinti şirkətləri və fərdi sifarişçilər üçün hazır beton istehsal edir. Bütün markalar müasir zavodda, laboratoriya nəzarəti altında hazırlanır və GOST 26633 tələblərinə uyğun 28 günlük möhkəmlik sınağından keçirilir.',
        en: 'Since 2018, Novxani Beton has been producing ready-mix concrete for construction companies and private clients across Baku and Absheron. Every grade is produced at a modern plant under laboratory control and undergoes 28-day strength testing in accordance with GOST 26633.',
        ru: 'С 2018 года Novxani Beton производит товарный бетон для строительных компаний и частных заказчиков в Баку и на Абшероне. Все марки выпускаются на современном заводе под лабораторным контролем и проходят 28-суточные испытания на прочность по ГОСТ 26633.',
      },
      {
        az: 'NOVXANI BETON olaraq M100-dən M600-ə qədər müxtəlif markalarda hazır beton istehsalı, çatdırılması və beton nasoslanması xidmətləri təqdim edirik. Hər növ layihə üçün doğru markanı seçməyinizə kömək edirik: hamarlama qatı üçün M100, monolit təməl və plitələr üçün M300, xüsusi mühəndis konstruksiyaları üçün M450, yüksək yükdaşıma qabiliyyəti tələb olunan sənaye və infrastruktur layihələri üçün isə M500–M600 yüksək möhkəmlikli betonlar. Hansı markanın lazım olduğuna əmin deyilsinizsə, mütəxəssislərimiz pulsuz məsləhət verir.',
        en: 'At NOVXANI BETON we provide ready-mix concrete production, delivery and concrete pumping services in grades from M100 to M600. We help you choose the right grade for any project: M100 for levelling layers, M300 for monolithic foundations and slabs, M450 for specialized engineering structures, and the high-strength grades M500–M600 for industrial and infrastructure projects requiring high load-bearing capacity. Not sure which grade you need? Our specialists provide free advice.',
        ru: 'NOVXANI BETON предоставляет услуги производства, доставки и перекачки товарного бетона в марках от M100 до M600. Мы поможем подобрать подходящую марку для любого проекта: M100 для выравнивающих слоёв, M300 для монолитных фундаментов и плит, M450 для специальных инженерных конструкций, а высокопрочные марки M500–M600 — для промышленных и инфраструктурных проектов с высокими требованиями к несущей способности. Не уверены, какая марка нужна? Наши специалисты бесплатно проконсультируют вас.',
      },
    ],
    showGrades: true,
    faqs: [
      {
        q: {
          az: 'Hansı beton markası mənə lazımdır?',
          en: 'Which concrete grade do I need?',
          ru: 'Какая марка бетона мне нужна?',
        },
        a: {
          az: 'Marka konstruksiyanın yükündən asılıdır: hamarlama və altlıq üçün M100–M150, döşəmə və ümumi işlər üçün M200, monolit təməl, plitə və sütunlar üçün M300, çoxmərtəbəli karkas üçün M350 və yuxarı. Dəqiq seçim üçün Beton Markaları səhifəmizə baxın və ya bizimlə məsləhətləşin.',
          en: 'The grade depends on the structural load: M100–M150 for levelling and blinding layers, M200 for floors and general work, M300 for monolithic foundations, slabs and columns, M350 and above for multi-storey frames. For an exact choice, see our Concrete Grades page or consult us.',
          ru: 'Марка зависит от нагрузки на конструкцию: M100–M150 для выравнивающих и подготовительных слоёв, M200 для полов и общих работ, M300 для монолитных фундаментов, плит и колонн, M350 и выше для многоэтажного каркаса. Для точного выбора смотрите страницу «Марки бетона» или проконсультируйтесь с нами.',
        },
      },
      {
        q: {
          az: '1 m³ beton neçə tondur?',
          en: 'How many tons does 1 m³ of concrete weigh?',
          ru: 'Сколько тонн весит 1 м³ бетона?',
        },
        a: {
          az: 'Adi armaturlu beton təxminən 2,4 ton/m³-dür. Layihəniz üçün lazımi həcmi və çəkini saytdakı pulsuz beton kalkulyatoru ilə bir dəqiqəyə hesablaya bilərsiniz.',
          en: 'Standard reinforced concrete weighs approximately 2.4 t/m³. You can calculate the volume and weight your project needs in one minute with the free concrete calculator on our website.',
          ru: 'Обычный армированный бетон весит примерно 2,4 т/м³. Необходимый объём и вес для вашего проекта можно рассчитать за минуту с помощью бесплатного калькулятора бетона на сайте.',
        },
      },
      {
        q: {
          az: 'Betonun keyfiyyətinə necə zəmanət verilir?',
          en: 'How is concrete quality guaranteed?',
          ru: 'Как гарантируется качество бетона?',
        },
        a: {
          az: 'İstehsal GOST 26633 tələblərinə uyğun aparılır, markalar 28 günlük möhkəmlik sınağından keçirilir və laboratoriya nəzarəti altında buraxılır.',
          en: 'Production follows the requirements of GOST 26633, every grade undergoes 28-day strength testing, and batches are released under laboratory control.',
          ru: 'Производство ведётся по требованиям ГОСТ 26633, марки проходят 28-суточные испытания на прочность, а партии выпускаются под лабораторным контролем.',
        },
      },
      {
        q: {
          az: 'Qiymətlər nə üçün saytda göstərilmir?',
          en: 'Why are prices not listed on the website?',
          ru: 'Почему цены не указаны на сайте?',
        },
        a: {
          az: 'Beton qiyməti marka, həcm, çatdırılma məsafəsi və nasos ehtiyacından asılı olaraq dəyişir. Buna görə hər layihə üçün fərdi təklif hazırlayırıq — bu, əksər halda sizin üçün daha sərfəlidir. Ətraflı məlumat üçün Beton Qiymətləri səhifəsinə baxın.',
          en: 'The price of concrete varies with grade, volume, delivery distance and pumping needs. That is why we prepare a personalized offer for each project — in most cases this works out cheaper for you. See the Concrete Prices page for details.',
          ru: 'Цена бетона зависит от марки, объёма, расстояния доставки и необходимости бетононасоса. Поэтому для каждого проекта мы готовим индивидуальное предложение — в большинстве случаев это выгоднее для вас. Подробнее — на странице «Цены на бетон».',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Hazır beton sifarişi üçün qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a price quote for a ready-mix concrete order.',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на заказ товарного бетона.',
    },
  },

  {
    slug: '/beton-catdirilmasi',
    seo: {
      title: {
        az: 'Beton Çatdırılması — Bakı və Abşeron | NOVXANI BETON',
        en: 'Concrete Delivery — Baku and Absheron | NOVXANI BETON',
        ru: 'Доставка бетона — Баку и Абшерон | NOVXANI BETON',
      },
      description: {
        az: 'Mikserlərlə ünvana beton çatdırılması: Bakı, Abşeron və Novxanı üzrə. 7/24 iş rejimi, dəqiq qrafik, tökmə vaxtına uyğun marşrut planlaşdırması. Sifariş üçün əlaqə saxlayın.',
        en: 'Concrete delivered to your site by mixer trucks across Baku, Absheron and Novkhani. 24/7 operation, precise scheduling and routes planned around your pouring time. Contact us to order.',
        ru: 'Доставка бетона миксерами на объект по Баку, Абшерону и Новханы. Работа 24/7, точный график, планирование маршрута под время заливки. Свяжитесь с нами для заказа.',
      },
    },
    crumb: {
      az: 'Beton Çatdırılması',
      en: 'Concrete Delivery',
      ru: 'Доставка бетона',
    },
    h1: {
      az: 'Beton Çatdırılması',
      en: 'Concrete Delivery',
      ru: 'Доставка бетона',
    },
    tagline: {
      az: 'Bakı və Abşeron üzrə mikserlərlə dəqiq qrafikli çatdırılma — 7/24',
      en: 'Precisely scheduled mixer-truck delivery across Baku and Absheron — 24/7',
      ru: 'Доставка миксерами по точному графику по Баку и Абшерону — 24/7',
    },
    hero: {
      image: imgCatdirilma,
      alt: {
        az: 'Beton mikserləri çatdırılma üçün hazır vəziyyətdə',
        en: 'Concrete mixer trucks ready for delivery',
        ru: 'Автобетоносмесители готовы к доставке',
      },
    },
    intro: [
      {
        az: 'Betonun keyfiyyəti yalnız zavodda deyil, yolda da qorunmalıdır. Hazır qarışıq müəyyən vaxt ərzində tökülməlidir — gecikmə möhkəmliyə birbaşa təsir edir. Buna görə hər çatdırılmanı marşrut və qrafik üzrə dəqiq planlaşdırırıq.',
        en: 'Concrete quality must be protected not only at the plant but also on the road. A ready mix has to be poured within a set time — any delay directly affects strength. That is why we plan every delivery precisely, by route and by schedule.',
        ru: 'Качество бетона нужно сохранять не только на заводе, но и в пути. Готовую смесь необходимо уложить в течение определённого времени — задержка напрямую влияет на прочность. Поэтому мы точно планируем каждую доставку по маршруту и графику.',
      },
      {
        az: 'Zavodumuz Novxanıda yerləşir — Bakı və Abşeronun əksər tikinti zonalarına qısa müddətdə çatırıq. Böyük həcmli tökmələrdə mikserlərin ardıcıl axını təşkil olunur ki, işiniz fasiləsiz davam etsin.',
        en: 'Our plant is located in Novkhani, so we reach most construction zones of Baku and Absheron in a short time. For large pours, a continuous flow of mixer trucks is organized so your work never stops.',
        ru: 'Наш завод находится в Новханы — до большинства строительных зон Баку и Абшерона мы добираемся быстро. При больших заливках организуется непрерывный поток миксеров, чтобы работа шла без остановок.',
      },
    ],
    benefitsTitle: {
      az: 'Çatdırılma üstünlüklərimiz',
      en: 'Our delivery advantages',
      ru: 'Наши преимущества доставки',
    },
    benefits: [
      {
        title: { az: '7/24 çatdırılma', en: '24/7 delivery', ru: 'Доставка 24/7' },
        text: {
          az: 'Gecə tökmələri və təcili sifarişlər üçün də işləyirik.',
          en: 'We also handle night pours and urgent orders.',
          ru: 'Работаем и на ночных заливках, и по срочным заказам.',
        },
      },
      {
        title: { az: 'Dəqiq qrafik', en: 'Precise scheduling', ru: 'Точный график' },
        text: {
          az: 'Mikserlər razılaşdırılmış vaxt aralığında obyektdə olur.',
          en: 'Mixer trucks arrive on site within the agreed time window.',
          ru: 'Миксеры прибывают на объект в согласованный интервал времени.',
        },
      },
      {
        title: { az: 'Ardıcıl axın', en: 'Continuous flow', ru: 'Непрерывный поток' },
        text: {
          az: 'Böyük tökmələrdə fasiləsiz beton axını planlaşdırılır.',
          en: 'For large pours, an uninterrupted flow of concrete is planned.',
          ru: 'При больших заливках планируется бесперебойная подача бетона.',
        },
      },
      {
        title: { az: 'Yaxın məsafə', en: 'Short distances', ru: 'Близкое расположение' },
        text: {
          az: 'Novxanı zavodundan Abşeronun əsas zonalarına sürətli çatış.',
          en: 'Fast delivery from the Novkhani plant to the main zones of Absheron.',
          ru: 'Быстрая доставка с завода в Новханы до основных зон Абшерона.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'Hansı ərazilərə çatdırırsınız?',
          en: 'Which areas do you deliver to?',
          ru: 'В какие районы вы доставляете?',
        },
        a: {
          az: 'Bakı və Abşeron yarımadası üzrə çatdırılma edirik. Zavodumuz Novxanıda yerləşdiyi üçün Abşeron zonasına xüsusilə sürətli çatırıq. Konkret ünvanınız üçün bizimlə əlaqə saxlayın.',
          en: 'We deliver across Baku and the Absheron peninsula. Since our plant is in Novkhani, delivery to the Absheron zone is especially fast. Contact us about your specific address.',
          ru: 'Мы доставляем по Баку и Абшеронскому полуострову. Поскольку завод находится в Новханы, в зону Абшерона доставляем особенно быстро. Свяжитесь с нами по вашему конкретному адресу.',
        },
      },
      {
        q: {
          az: 'Beton yolda nə qədər qala bilər?',
          en: 'How long can concrete stay in transit?',
          ru: 'Сколько бетон может находиться в пути?',
        },
        a: {
          az: 'Hazır qarışıq adətən istehsaldan sonra 1,5–2 saat ərzində tökülməlidir (hava şəraitindən asılı olaraq). Marşrut və qrafiki məhz buna görə əvvəlcədən planlaşdırırıq.',
          en: 'A ready mix should normally be poured within 1.5–2 hours of production (depending on weather conditions). That is exactly why we plan the route and schedule in advance.',
          ru: 'Готовую смесь обычно нужно уложить в течение 1,5–2 часов после производства (в зависимости от погодных условий). Именно поэтому мы заранее планируем маршрут и график.',
        },
      },
      {
        q: {
          az: 'Bir mikserdə nə qədər beton gəlir?',
          en: 'How much concrete does one mixer truck carry?',
          ru: 'Сколько бетона привозит один миксер?',
        },
        a: {
          az: 'Standart mikserlərin tutumu adətən 7–10 m³ aralığındadır. Layihəniz üçün lazımi mikser sayını saytdakı beton kalkulyatoru avtomatik hesablayır.',
          en: 'Standard mixer trucks usually hold 7–10 m³. The concrete calculator on our website automatically works out how many mixer trucks your project needs.',
          ru: 'Вместимость стандартных миксеров обычно составляет 7–10 м³. Калькулятор бетона на сайте автоматически рассчитает нужное количество миксеров для вашего проекта.',
        },
      },
      {
        q: {
          az: 'Gecə və həftəsonu çatdırılma mümkündürmü?',
          en: 'Is delivery available at night and on weekends?',
          ru: 'Возможна ли доставка ночью и в выходные?',
        },
        a: {
          az: 'Bəli, 7/24 fəaliyyət göstəririk — qrafiki əvvəlcədən razılaşdırmaq kifayətdir.',
          en: 'Yes, we operate 24/7 — you only need to agree on the schedule in advance.',
          ru: 'Да, мы работаем 24/7 — достаточно заранее согласовать график.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Beton çatdırılması üçün qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a price quote for concrete delivery.',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на доставку бетона.',
    },
  },

  {
    slug: '/beton-nasoslama',
    seo: {
      title: {
        az: 'Beton Nasoslama Xidməti — Hündür və Çətin Sahələr | NOVXANI BETON',
        en: 'Concrete Pumping Service — High-Rise and Hard-to-Reach Sites | NOVXANI BETON',
        ru: 'Услуги бетононасоса — высотные и труднодоступные участки | NOVXANI BETON',
      },
      description: {
        az: 'Beton nasosu ilə hündürmərtəbəli binalara və çətin əlçatan sahələrə beton tökülməsi. Sürətli, təmiz və bərabər tökmə. Bakı və Abşeron üzrə xidmət.',
        en: 'Concrete pumping for high-rise buildings and hard-to-reach areas. Fast, clean and even pouring. Serving Baku and Absheron.',
        ru: 'Подача бетона бетононасосом на высотные здания и труднодоступные участки. Быстрая, чистая и равномерная заливка. Работаем по Баку и Абшерону.',
      },
    },
    crumb: {
      az: 'Beton Nasoslama',
      en: 'Concrete Pumping',
      ru: 'Услуги бетононасоса',
    },
    h1: {
      az: 'Beton Nasoslama Xidməti',
      en: 'Concrete Pumping Service',
      ru: 'Услуги бетононасоса',
    },
    tagline: {
      az: 'Hündür mərtəbələrə və çətin əlçatan sahələrə sürətli, fasiləsiz beton tökülməsi',
      en: 'Fast, continuous concrete pouring to upper floors and hard-to-reach areas',
      ru: 'Быстрая и непрерывная подача бетона на верхние этажи и труднодоступные участки',
    },
    hero: {
      image: imgNasoslama,
      alt: {
        az: 'Beton nasosu tikinti meydançasında işləyir',
        en: 'Concrete pump operating at a construction site',
        ru: 'Бетононасос работает на строительной площадке',
      },
    },
    intro: [
      {
        az: 'Mikserin birbaşa yaxınlaşa bilmədiyi obyektlərdə — hündür mərtəbələr, dar həyətlər, binanın arxa hissəsi — beton nasosu ən səmərəli həlldir. Nasos betonu borular vasitəsilə birbaşa tökmə nöqtəsinə ötürür.',
        en: 'On sites a mixer truck cannot reach directly — upper floors, narrow courtyards, the rear of a building — a concrete pump is the most efficient solution. The pump delivers concrete through pipes straight to the pouring point.',
        ru: 'На объектах, куда миксер не может подъехать вплотную — верхние этажи, узкие дворы, задняя часть здания — бетононасос является самым эффективным решением. Насос подаёт бетон по трубам прямо к точке заливки.',
      },
      {
        az: 'Nasosla tökmə həm sürətlidir, həm də keyfiyyətlidir: beton fasiləsiz axınla, bərabər paylanır; əl daşımalarında yaranan itki və ləngimələr aradan qalxır. Layihənizə uyğun nasos növünü birlikdə müəyyən edirik.',
        en: 'Pump pouring is both fast and high quality: the concrete flows continuously and is distributed evenly, eliminating the losses and delays of manual handling. We will help you determine the right pump type for your project.',
        ru: 'Заливка насосом — это и скорость, и качество: бетон подаётся непрерывным потоком и распределяется равномерно, а потери и задержки, характерные для ручной переноски, исключаются. Тип насоса под ваш проект подберём вместе.',
      },
    ],
    benefitsTitle: {
      az: 'Nasosla tökmənin üstünlükləri',
      en: 'Advantages of pump pouring',
      ru: 'Преимущества заливки насосом',
    },
    benefits: [
      {
        title: { az: 'Hündürlüyə tökmə', en: 'Pouring at height', ru: 'Подача на высоту' },
        text: {
          az: 'Çoxmərtəbəli binaların yuxarı mərtəbələrinə birbaşa çatdırılma.',
          en: 'Direct delivery to the upper floors of multi-storey buildings.',
          ru: 'Прямая подача на верхние этажи многоэтажных зданий.',
        },
      },
      {
        title: { az: 'Çətin sahələrə çıxış', en: 'Access to difficult areas', ru: 'Доступ к сложным участкам' },
        text: {
          az: 'Mikserin girə bilmədiyi dar və uzaq nöqtələrə tökmə.',
          en: 'Pouring into narrow and distant spots a mixer truck cannot reach.',
          ru: 'Заливка в узкие и удалённые точки, куда миксер не может проехать.',
        },
      },
      {
        title: { az: 'Sürətli, fasiləsiz axın', en: 'Fast, continuous flow', ru: 'Быстрый непрерывный поток' },
        text: {
          az: 'Böyük həcmlər qısa vaxtda, soyuq tikiş riski olmadan tökülür.',
          en: 'Large volumes are poured in a short time, without the risk of cold joints.',
          ru: 'Большие объёмы заливаются за короткое время, без риска холодных швов.',
        },
      },
      {
        title: { az: 'Az itki, təmiz sahə', en: 'Less waste, cleaner site', ru: 'Меньше потерь, чистая площадка' },
        text: {
          az: 'Material itkisi və meydança çirklənməsi minimuma enir.',
          en: 'Material loss and site contamination are kept to a minimum.',
          ru: 'Потери материала и загрязнение площадки сводятся к минимуму.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'Nasos nə vaxt lazımdır?',
          en: 'When is a pump needed?',
          ru: 'Когда нужен бетононасос?',
        },
        a: {
          az: 'Yuxarı mərtəbələrə tökmələrdə, mikserin obyektə yaxınlaşa bilmədiyi hallarda və böyük sahəli plitələrin fasiləsiz tökülməsində nasos tövsiyə olunur.',
          en: 'A pump is recommended for pouring on upper floors, when a mixer truck cannot get close to the site, and for the continuous pouring of large-area slabs.',
          ru: 'Насос рекомендуется при заливке верхних этажей, когда миксер не может подъехать к объекту, а также при непрерывной заливке плит большой площади.',
        },
      },
      {
        q: {
          az: 'Nasos xidməti ayrıca sifariş oluna bilərmi?',
          en: 'Can the pumping service be ordered separately?',
          ru: 'Можно ли заказать услугу насоса отдельно?',
        },
        a: {
          az: 'Bəli, beton sifarişi ilə birlikdə və ya ayrıca təşkil oluna bilər. Qiymət obyektin şərtlərindən (hündürlük, məsafə, həcm) asılıdır.',
          en: 'Yes, it can be arranged together with a concrete order or on its own. The price depends on the site conditions (height, distance, volume).',
          ru: 'Да, услугу можно организовать вместе с заказом бетона или отдельно. Цена зависит от условий объекта (высота, расстояние, объём).',
        },
      },
      {
        q: {
          az: 'Hansı hündürlüyə beton vurmaq olur?',
          en: 'To what height can concrete be pumped?',
          ru: 'На какую высоту можно подавать бетон?',
        },
        a: {
          az: 'Bu, seçilən nasosun növündən asılıdır. Obyektiniz haqqında məlumat verin — layihənizə uyğun texnikanı təklif edək.',
          en: 'It depends on the type of pump selected. Tell us about your site and we will suggest the right equipment for your project.',
          ru: 'Это зависит от типа выбранного насоса. Расскажите о вашем объекте — мы предложим технику под ваш проект.',
        },
      },
      {
        q: {
          az: 'Nasosla hansı markaları vurmaq olar?',
          en: 'Which grades can be pumped?',
          ru: 'Какие марки можно подавать насосом?',
        },
        a: {
          az: 'İstehsal etdiyimiz bütün markalar (M100–M600) nasosla tökülə bilər — qarışıq nasoslamaya uyğun hazırlanır.',
          en: 'All the grades we produce (M100–M600) can be pump-poured — the mix is prepared to be pumpable.',
          ru: 'Все производимые нами марки (M100–M600) можно заливать насосом — смесь готовится с учётом перекачивания.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Beton nasoslama xidməti üçün qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a price quote for the concrete pumping service.',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на услуги бетононасоса.',
    },
  },

  {
    slug: '/terezi-xidmeti',
    seo: {
      title: {
        az: 'Tərəzi Xidməti — Avtomobil Körpü Tərəzisi | NOVXANI BETON',
        en: 'Weighbridge Service — Truck Weighbridge | NOVXANI BETON',
        ru: 'Услуги автомобильных весов — взвешивание грузовиков | NOVXANI BETON',
      },
      description: {
        az: 'Novxanıda avtomobil körpü tərəzisi ilə yük maşınlarının dəqiq çəkilməsi. Tikinti və logistika şirkətləri üçün sürətli, sənədləşdirilmiş çəki xidməti — 7/24.',
        en: 'Accurate truck weighing on a truck weighbridge in Novkhani. Fast, documented weighing service for construction and logistics companies — 24/7.',
        ru: 'Точное взвешивание грузовиков на автомобильных весах в Новханы. Быстрая, документально оформленная услуга взвешивания для строительных и логистических компаний — 24/7.',
      },
    },
    crumb: {
      az: 'Tərəzi Xidməti',
      en: 'Weighbridge Service',
      ru: 'Услуги автомобильных весов',
    },
    h1: {
      az: 'Tərəzi (Çəki) Xidməti',
      en: 'Weighbridge (Weighing) Service',
      ru: 'Услуги взвешивания (автомобильные весы)',
    },
    tagline: {
      az: 'Avtomobil körpü tərəzisi ilə yüklərin dəqiq və sənədli ölçülməsi — Novxanı, 7/24',
      en: 'Accurate, documented weighing of loads on a truck weighbridge — Novkhani, 24/7',
      ru: 'Точное и документально оформленное взвешивание грузов на автомобильных весах — Новханы, 24/7',
    },
    hero: {
      image: imgTerezi,
      alt: {
        az: 'Mikser avtomobil körpü tərəzisində çəkilir',
        en: 'A mixer truck being weighed on a truck weighbridge',
        ru: 'Миксер взвешивается на автомобильных весах',
      },
    },
    intro: [
      {
        az: 'Novxanı zavodumuzda yerləşən avtomobil körpü tərəzisi ilə yük maşınlarının və qoşquların dəqiq çəkisini ölçürük. Xidmət həm öz sifarişçilərimiz, həm də kənar tikinti, logistika və istehsalat şirkətləri üçün açıqdır.',
        en: 'With the truck weighbridge located at our Novkhani plant, we measure the exact weight of trucks and trailers. The service is open both to our own customers and to third-party construction, logistics and manufacturing companies.',
        ru: 'На автомобильных весах, расположенных на нашем заводе в Новханы, мы точно измеряем вес грузовиков и прицепов. Услуга доступна как нашим заказчикам, так и сторонним строительным, логистическим и производственным компаниям.',
      },
      {
        az: 'Dəqiq çəki — artıq yük cərimələrindən qorunmaq, materialın düzgün uçotu və şəffaf hesablaşma üçün vacibdir. Ölçmə bir neçə dəqiqə çəkir, nəticə sənədlə təqdim olunur.',
        en: 'Accurate weighing matters: it protects you from overload fines, ensures correct material accounting and keeps settlements transparent. Weighing takes just a few minutes and the result is issued as a document.',
        ru: 'Точный вес важен для защиты от штрафов за перегруз, правильного учёта материалов и прозрачных расчётов. Взвешивание занимает несколько минут, результат оформляется документально.',
      },
    ],
    benefitsTitle: {
      az: 'Xidmətin üstünlükləri',
      en: 'Advantages of the service',
      ru: 'Преимущества услуги',
    },
    benefits: [
      {
        title: { az: 'Dəqiq ölçüm', en: 'Accurate measurement', ru: 'Точное измерение' },
        text: {
          az: 'Körpü tərəzisi ağır və uzun bazalı nəqliyyat üçün nəzərdə tutulub.',
          en: 'The weighbridge is designed for heavy and long-wheelbase vehicles.',
          ru: 'Весы рассчитаны на тяжёлый и длиннобазный транспорт.',
        },
      },
      {
        title: { az: 'Sürətli xidmət', en: 'Fast service', ru: 'Быстрое обслуживание' },
        text: {
          az: 'Çəkilmə prosesi cəmi bir neçə dəqiqə vaxt alır.',
          en: 'The weighing process takes only a few minutes.',
          ru: 'Процесс взвешивания занимает всего несколько минут.',
        },
      },
      {
        title: { az: 'Sənədləşdirmə', en: 'Documentation', ru: 'Документальное оформление' },
        text: {
          az: 'Nəticə çəki qəbzi ilə rəsmiləşdirilir.',
          en: 'The result is formalized with a weight ticket.',
          ru: 'Результат оформляется весовой квитанцией.',
        },
      },
      {
        title: { az: 'Əlverişli yerləşmə', en: 'Convenient location', ru: 'Удобное расположение' },
        text: {
          az: 'Novxanıda, əsas marşrutlara yaxın — 7/24 açıq.',
          en: 'In Novkhani, close to the main routes — open 24/7.',
          ru: 'В Новханы, рядом с основными маршрутами — открыто 24/7.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'Hansı nəqliyyat vasitələri çəkilə bilər?',
          en: 'Which vehicles can be weighed?',
          ru: 'Какие транспортные средства можно взвешивать?',
        },
        a: {
          az: 'Yük maşınları, mikserlər, qoşqulu TIR-lar və digər ağır texnika — körpü tərəzisi uzun bazalı nəqliyyat üçün nəzərdə tutulub.',
          en: 'Trucks, mixer trucks, articulated lorries with trailers and other heavy vehicles — the weighbridge is designed for long-wheelbase transport.',
          ru: 'Грузовики, миксеры, фуры с прицепами и другая тяжёлая техника — весы рассчитаны на длиннобазный транспорт.',
        },
      },
      {
        q: {
          az: 'Nəticə sənədlə verilirmi?',
          en: 'Is the result issued as a document?',
          ru: 'Выдаётся ли результат в виде документа?',
        },
        a: {
          az: 'Bəli, ölçmənin nəticəsi çəki qəbzi ilə rəsmiləşdirilir.',
          en: 'Yes, the weighing result is formalized with a weight ticket.',
          ru: 'Да, результат взвешивания оформляется весовой квитанцией.',
        },
      },
      {
        q: {
          az: 'Xidmətdən kimlər istifadə edə bilər?',
          en: 'Who can use the service?',
          ru: 'Кто может воспользоваться услугой?',
        },
        a: {
          az: 'Hər kəs — bizim müştərimiz olmayan şirkətlər və fərdi sürücülər də tərəzi xidmətindən istifadə edə bilər.',
          en: 'Anyone — companies that are not our customers and individual drivers can also use the weighbridge service.',
          ru: 'Все желающие — компании, не являющиеся нашими клиентами, и частные водители также могут воспользоваться услугой взвешивания.',
        },
      },
      {
        q: {
          az: 'İş saatları necədir?',
          en: 'What are the working hours?',
          ru: 'Какой режим работы?',
        },
        a: {
          az: 'Zavod 7/24 fəaliyyət göstərir; gəlişdən əvvəl zəng etməyiniz gözləməni minimuma endirir.',
          en: 'The plant operates 24/7; calling before arrival keeps waiting to a minimum.',
          ru: 'Завод работает 24/7; звонок перед приездом сводит ожидание к минимуму.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Tərəzi (çəki) xidməti haqqında məlumat almaq istəyirəm.',
      en: 'Hello! I would like to get information about the weighbridge service.',
      ru: 'Здравствуйте! Хочу получить информацию об услуге взвешивания.',
    },
  },

  {
    slug: '/beton-qiymetleri',
    seo: {
      title: {
        az: 'Beton Qiymətləri — Fərdi Təklif Alın | NOVXANI BETON',
        en: 'Concrete Prices — Request a Personalized Quote | NOVXANI BETON',
        ru: 'Цены на бетон — получите индивидуальное предложение | NOVXANI BETON',
      },
      description: {
        az: 'Beton qiyməti nədən asılıdır: marka, həcm, çatdırılma məsafəsi və nasos ehtiyacı. Layihəniz üçün pulsuz fərdi qiymət təklifi alın — WhatsApp və ya zənglə.',
        en: 'What determines the price of concrete: grade, volume, delivery distance and pumping needs. Get a free personalized quote for your project — via WhatsApp or a call.',
        ru: 'От чего зависит цена бетона: марка, объём, расстояние доставки и необходимость насоса. Получите бесплатное индивидуальное предложение для вашего проекта — в WhatsApp или по телефону.',
      },
    },
    crumb: {
      az: 'Beton Qiymətləri',
      en: 'Concrete Prices',
      ru: 'Цены на бетон',
    },
    h1: {
      az: 'Beton Qiymətləri',
      en: 'Concrete Prices',
      ru: 'Цены на бетон',
    },
    tagline: {
      az: 'Layihənizə uyğun fərdi qiymət təklifi — pulsuz və öhdəliksiz',
      en: 'A personalized quote tailored to your project — free and with no obligation',
      ru: 'Индивидуальное ценовое предложение под ваш проект — бесплатно и без обязательств',
    },
    hero: {
      image: imgQiymet,
      alt: {
        az: 'Hazır beton qarışığı yaxın planda',
        en: 'Close-up of a ready-mix concrete mixture',
        ru: 'Готовая бетонная смесь крупным планом',
      },
    },
    intro: [
      {
        az: 'Beton qiyməti sabit rəqəm deyil — marka (M100–M600), sifariş həcmi, çatdırılma məsafəsi, nasos ehtiyacı və tökmə qrafiki qiymətə birbaşa təsir edir. Xammal bazarı da mütəmadi dəyişir.',
        en: 'The price of concrete is not a fixed number — the grade (M100–M600), order volume, delivery distance, pumping needs and pouring schedule all directly affect it. The raw materials market also changes regularly.',
        ru: 'Цена бетона — не фиксированная цифра: марка (M100–M600), объём заказа, расстояние доставки, необходимость насоса и график заливки напрямую влияют на неё. Рынок сырья также регулярно меняется.',
      },
      {
        az: 'Buna görə saytda “hamı üçün bir qiymət” yazmaq əvəzinə, hər layihə üçün fərdi təklif hazırlayırıq — beləcə artıq xərc ödəmirsiniz, yalnız öz layihənizə uyğun real qiyməti alırsınız. Təklif almaq pulsuzdur və heç bir öhdəlik yaratmır.',
        en: 'That is why, instead of posting “one price for everyone” on the website, we prepare a personalized offer for each project — so you never overpay and only get the real price for your own project. Requesting a quote is free and creates no obligation.',
        ru: 'Поэтому вместо «одной цены для всех» на сайте мы готовим индивидуальное предложение для каждого проекта — так вы не переплачиваете и получаете реальную цену именно вашего проекта. Запрос предложения бесплатен и ни к чему не обязывает.',
      },
    ],
    benefitsTitle: {
      az: 'Qiymətə nə təsir edir?',
      en: 'What affects the price?',
      ru: 'Что влияет на цену?',
    },
    benefits: [
      {
        title: { az: 'Beton markası', en: 'Concrete grade', ru: 'Марка бетона' },
        text: {
          az: 'Möhkəmlik sinfi artdıqca qarışıqda sement payı artır.',
          en: 'The higher the strength class, the more cement the mix contains.',
          ru: 'Чем выше класс прочности, тем больше доля цемента в смеси.',
        },
      },
      {
        title: { az: 'Sifariş həcmi', en: 'Order volume', ru: 'Объём заказа' },
        text: {
          az: 'Böyük həcmli sifarişlərdə daha sərfəli şərtlər mümkündür.',
          en: 'Better terms are available for large-volume orders.',
          ru: 'Для крупных заказов возможны более выгодные условия.',
        },
      },
      {
        title: { az: 'Çatdırılma məsafəsi', en: 'Delivery distance', ru: 'Расстояние доставки' },
        text: {
          az: 'Obyektin zavoddan uzaqlığı nəqliyyat xərcinə təsir edir.',
          en: 'The distance from the plant to your site affects the transport cost.',
          ru: 'Удалённость объекта от завода влияет на транспортные расходы.',
        },
      },
      {
        title: { az: 'Nasos və qrafik', en: 'Pump and schedule', ru: 'Насос и график' },
        text: {
          az: 'Xüsusi texnika ehtiyacı və gecə tökmələri ayrıca hesablanır.',
          en: 'Special equipment needs and night pours are calculated separately.',
          ru: 'Потребность в спецтехнике и ночные заливки рассчитываются отдельно.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'Qiymətə çatdırılma daxildirmi?',
          en: 'Is delivery included in the price?',
          ru: 'Включена ли доставка в цену?',
        },
        a: {
          az: 'Təklifdə beton və çatdırılma ayrıca, şəffaf şəkildə göstərilir — ünvanınıza görə dəqiq hesablanır.',
          en: 'In the offer, the concrete and the delivery are shown separately and transparently — calculated exactly for your address.',
          ru: 'В предложении бетон и доставка указываются отдельно и прозрачно — с точным расчётом по вашему адресу.',
        },
      },
      {
        q: {
          az: 'Böyük həcmli sifarişlərə endirim varmı?',
          en: 'Are there discounts for large orders?',
          ru: 'Есть ли скидки на крупные заказы?',
        },
        a: {
          az: 'Bəli, böyük həcmli və davamlı layihələr üçün xüsusi şərtlər təklif olunur.',
          en: 'Yes, special terms are offered for large-volume and ongoing projects.',
          ru: 'Да, для крупных и долгосрочных проектов предлагаются специальные условия.',
        },
      },
      {
        q: {
          az: 'Təklif almaq nə qədər vaxt aparır?',
          en: 'How long does it take to get a quote?',
          ru: 'Сколько времени занимает получение предложения?',
        },
        a: {
          az: 'Ən sürətli yol WhatsApp-dır — sorğulara qısa zamanda cavab veririk.',
          en: 'The fastest way is WhatsApp — we respond to inquiries promptly.',
          ru: 'Самый быстрый способ — WhatsApp: мы отвечаем на запросы в кратчайшие сроки.',
        },
      },
      {
        q: {
          az: 'Ödəniş şərtləri necədir?',
          en: 'What are the payment terms?',
          ru: 'Каковы условия оплаты?',
        },
        a: {
          az: 'Ödəniş qaydaları (nağd, nağdsız, mərhələli) təklif zamanı razılaşdırılır.',
          en: 'Payment arrangements (cash, bank transfer, staged payments) are agreed when the offer is made.',
          ru: 'Порядок оплаты (наличный, безналичный, поэтапный) согласовывается при подготовке предложения.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Layihəm üçün beton qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a concrete price quote for my project.',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на бетон для моего проекта.',
    },
  },

  {
    slug: '/beton-laboratoriyasi',
    seo: {
      title: {
        az: 'Beton Laboratoriyası — Keyfiyyət Nəzarəti və Sınaqlar | NOVXANI BETON',
        en: 'Concrete Laboratory — Quality Control and Testing | NOVXANI BETON',
        ru: 'Бетонная лаборатория — контроль качества и испытания | NOVXANI BETON',
      },
      description: {
        az: 'Betonun keyfiyyəti necə yoxlanılır: laboratoriya nəzarəti, 28 günlük kub sınağı və GOST 26633 üzrə istehsal. Novxanı Beton zavodunda hər partiya sınaqdan keçirilir.',
        en: 'How concrete quality is verified: laboratory control, 28-day cube testing and production to GOST 26633. Every batch at the Novxani Beton plant is tested.',
        ru: 'Как проверяется качество бетона: лабораторный контроль, 28-суточные испытания кубиков и производство по ГОСТ 26633. На заводе Novxani Beton испытывается каждая партия.',
      },
    },
    crumb: {
      az: 'Beton Laboratoriyası',
      en: 'Concrete Laboratory',
      ru: 'Бетонная лаборатория',
    },
    h1: {
      az: 'Beton Laboratoriyası və Keyfiyyət Nəzarəti',
      en: 'Concrete Laboratory and Quality Control',
      ru: 'Бетонная лаборатория и контроль качества',
    },
    tagline: {
      az: 'Hər partiya laboratoriya nəzarəti ilə istehsal olunur və 28 günlük möhkəmlik sınağından keçirilir',
      en: 'Every batch is produced under laboratory control and undergoes 28-day strength testing',
      ru: 'Каждая партия производится под лабораторным контролем и проходит 28-суточные испытания на прочность',
    },
    hero: {
      image: imgLab,
      alt: {
        az: 'Laboratoriya nəzarətli beton qarışığı yaxın planda',
        en: 'Close-up of a laboratory-controlled concrete mix',
        ru: 'Бетонная смесь под лабораторным контролем крупным планом',
      },
    },
    intro: [
      {
        az: 'Betonun keyfiyyəti gözlə görünmür — o, yalnız laboratoriya sınağı ilə təsdiqlənir. Novxanı Beton zavodunda istehsal GOST 26633 tələblərinə uyğun aparılır: qarışığın resepti laboratoriyada təyin olunur, hər partiya istehsal zamanı yoxlanılır və nümunələr 28 günlük kub sınağından keçirilir.',
        en: 'Concrete quality cannot be seen with the naked eye — it can only be confirmed by laboratory testing. At the Novxani Beton plant, production follows the requirements of GOST 26633: the mix design is set in the laboratory, every batch is checked during production, and samples undergo 28-day cube testing.',
        ru: 'Качество бетона не видно на глаз — его подтверждают только лабораторные испытания. На заводе Novxani Beton производство ведётся по требованиям ГОСТ 26633: рецептура смеси определяется в лаборатории, каждая партия проверяется в процессе производства, а образцы проходят 28-суточные испытания кубиков.',
      },
      {
        az: 'Bu nəzarət sizin üçün konkret zəmanət deməkdir: sifariş etdiyiniz marka (məsələn, M300 / B22.5) real olaraq həmin möhkəmliyi verir. Layihə tələb etdikdə sınaq nəticələri sənədlə təqdim olunur — tikinti nəzarəti və texniki sənədləşmə üçün.',
        en: 'For you, this control means a tangible guarantee: the grade you order (for example, M300 / B22.5) actually delivers that strength. When the project requires it, test results are provided in documented form — for construction supervision and technical records.',
        ru: 'Для вас этот контроль означает конкретную гарантию: заказанная марка (например, M300 / B22.5) действительно обеспечивает заявленную прочность. Если проект того требует, результаты испытаний предоставляются документально — для строительного надзора и технической документации.',
      },
    ],
    benefitsTitle: {
      az: 'Keyfiyyət necə təmin olunur',
      en: 'How quality is ensured',
      ru: 'Как обеспечивается качество',
    },
    benefits: [
      {
        title: { az: 'GOST 26633 üzrə istehsal', en: 'Production to GOST 26633', ru: 'Производство по ГОСТ 26633' },
        text: {
          az: 'Bütün markalar standartın tələblərinə uyğun hazırlanır.',
          en: 'All grades are produced in accordance with the requirements of the standard.',
          ru: 'Все марки изготавливаются в соответствии с требованиями стандарта.',
        },
      },
      {
        title: { az: '28 günlük kub sınağı', en: '28-day cube testing', ru: '28-суточные испытания кубиков' },
        text: {
          az: 'Nümunə kublar standart müddətdə möhkəmliyə yoxlanılır.',
          en: 'Sample cubes are strength-tested over the standard period.',
          ru: 'Образцы-кубики проверяются на прочность в течение стандартного срока.',
        },
      },
      {
        title: { az: 'Partiya nəzarəti', en: 'Batch control', ru: 'Контроль партий' },
        text: {
          az: 'Hər istehsal partiyası buraxılışdan əvvəl yoxlanılır.',
          en: 'Every production batch is checked before release.',
          ru: 'Каждая производственная партия проверяется перед выпуском.',
        },
      },
      {
        title: { az: 'Layihəyə uyğun resept', en: 'Project-specific mix design', ru: 'Рецептура под проект' },
        text: {
          az: 'Yekun qarışıq dizaynı laboratoriyada, layihə tələbinə görə təyin olunur.',
          en: 'The final mix design is set in the laboratory according to project requirements.',
          ru: 'Итоговый состав смеси определяется в лаборатории с учётом требований проекта.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'Betonun keyfiyyəti necə yoxlanılır?',
          en: 'How is concrete quality tested?',
          ru: 'Как проверяется качество бетона?',
        },
        a: {
          az: 'Standart üsul kub sınağıdır: istehsal zamanı götürülən nümunə kublar 28 gün saxlanılır və press altında möhkəmliyə yoxlanılır. Nəticə markanın (məsələn, M300 üçün 22.5 MPa) təmin olunduğunu təsdiqləyir.',
          en: 'The standard method is cube testing: sample cubes taken during production are cured for 28 days and then checked for strength under a press. The result confirms that the grade (for example, 22.5 MPa for M300) is achieved.',
          ru: 'Стандартный метод — испытание кубиков: образцы, отобранные во время производства, выдерживаются 28 суток и проверяются на прочность под прессом. Результат подтверждает, что марка (например, 22,5 МПа для M300) обеспечена.',
        },
      },
      {
        q: {
          az: 'Beton neçə günə bərkiyir?',
          en: 'How long does concrete take to harden?',
          ru: 'Сколько дней твердеет бетон?',
        },
        a: {
          az: 'Beton töküldükdən sonra ilk günlərdə sürətlə möhkəmlənir və 28-ci gündə layihə möhkəmliyinin standart göstəricisinə çatır — buna görə sınaqlar məhz 28 günlük aparılır. Hava şəraiti prosesin sürətinə təsir edir.',
          en: 'Concrete gains strength rapidly in the first days after pouring and reaches the standard indicator of its design strength on day 28 — which is exactly why the tests run for 28 days. Weather conditions affect the speed of the process.',
          ru: 'После заливки бетон быстро набирает прочность в первые дни и на 28-е сутки достигает стандартного показателя проектной прочности — именно поэтому испытания длятся 28 суток. Погодные условия влияют на скорость процесса.',
        },
      },
      {
        q: {
          az: 'Sınaq nəticələrini sənədlə ala bilərəmmi?',
          en: 'Can I receive the test results as a document?',
          ru: 'Могу ли я получить результаты испытаний документально?',
        },
        a: {
          az: 'Bəli, layihə və tikinti nəzarəti tələb etdikdə partiya üzrə sınaq nəticələri sənədlə təqdim olunur.',
          en: 'Yes, when the project and construction supervision require it, batch test results are provided in documented form.',
          ru: 'Да, если этого требуют проект и строительный надзор, результаты испытаний по партии предоставляются документально.',
        },
      },
      {
        q: {
          az: 'Hazır beton yaxşıdır, yoxsa yerində qarışdırılan?',
          en: 'Which is better: ready-mix or site-mixed concrete?',
          ru: 'Что лучше: товарный бетон или замешанный на месте?',
        },
        a: {
          az: 'Zavod betonunda resept laboratoriyada təyin olunur, dozalama avtomatik aparılır və hər partiya yoxlanılır — yerində əl ilə qarışdırmada isə nisbətlər gözəyarı olur və möhkəmlik nəzarətsiz qalır. Konstruktiv işlərdə zavod betonu etibarlı seçimdir.',
          en: 'With plant-produced concrete, the mix design is set in the laboratory, batching is automated and every batch is checked — with manual mixing on site, proportions are done by eye and strength goes unchecked. For structural work, plant concrete is the reliable choice.',
          ru: 'В заводском бетоне рецептура определяется в лаборатории, дозирование выполняется автоматически и каждая партия проверяется — при ручном замесе на месте пропорции определяются на глаз, а прочность остаётся без контроля. Для конструктивных работ заводской бетон — надёжный выбор.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Betonun keyfiyyət nəzarəti və sınaq sənədləri haqqında məlumat almaq istəyirəm.',
      en: 'Hello! I would like to get information about concrete quality control and test documentation.',
      ru: 'Здравствуйте! Хочу получить информацию о контроле качества бетона и документах испытаний.',
    },
  },

  {
    slug: '/betonun-istifade-saheleri',
    seo: {
      title: {
        az: 'Betonun İstifadə Sahələri — Fundament, Döşəmə, Həyət, Yol | NOVXANI BETON',
        en: 'Applications of Concrete — Foundations, Floors, Yards, Roads | NOVXANI BETON',
        ru: 'Области применения бетона — фундамент, полы, двор, дороги | NOVXANI BETON',
      },
      description: {
        az: 'Hansı iş üçün hansı beton lazımdır: fundament, döşəmə, həyət betonlaması, yol, qaraj, hovuz və monolit işlər üzrə marka tövsiyələri (M100–M600). Pulsuz məsləhət və fərdi qiymət.',
        en: 'Which concrete you need for which job: grade recommendations (M100–M600) for foundations, floors, yard concreting, roads, garages, pools and monolithic work. Free advice and a personalized price.',
        ru: 'Какой бетон нужен для какой работы: рекомендации по маркам (M100–M600) для фундамента, полов, бетонирования двора, дорог, гаража, бассейна и монолитных работ. Бесплатная консультация и индивидуальная цена.',
      },
    },
    crumb: {
      az: 'Betonun İstifadə Sahələri',
      en: 'Applications of Concrete',
      ru: 'Области применения бетона',
    },
    h1: {
      az: 'Betonun İstifadə Sahələri',
      en: 'Applications of Concrete',
      ru: 'Области применения бетона',
    },
    tagline: {
      az: 'Fundamentdən hovuza qədər — hər iş üçün doğru beton markasının seçimi',
      en: 'From foundations to pools — choosing the right concrete grade for every job',
      ru: 'От фундамента до бассейна — правильный выбор марки бетона для каждой работы',
    },
    hero: {
      image: imgUsage,
      alt: {
        az: 'Tikinti sahəsində beton tökmə işləri',
        en: 'Concrete pouring work at a construction site',
        ru: 'Работы по заливке бетона на строительной площадке',
      },
    },
    intro: [
      {
        az: 'Müştərilərimiz çox vaxt marka ilə deyil, gördükləri işlə müraciət edirlər: “həyətə beton tökəcəyəm”, “fundament üçün beton lazımdır”, “qaraj döşəməsi tökülməlidir”. Bu səhifədə ən çox rast gəlinən istifadə sahələrini və hər biri üçün tövsiyə olunan markanı bir yerdə topladıq.',
        en: 'Customers often come to us not with a grade but with a job: “I am going to concrete my yard”, “I need concrete for a foundation”, “a garage floor needs pouring”. On this page we have gathered the most common applications and the recommended grade for each.',
        ru: 'Клиенты часто обращаются не с маркой, а с задачей: «нужно забетонировать двор», «нужен бетон для фундамента», «надо залить пол в гараже». На этой странице мы собрали самые распространённые области применения и рекомендуемую марку для каждой.',
      },
      {
        az: 'Ümumi qayda sadədir: yük artdıqca marka da artır. Hazırlıq qatları üçün M100 kifayətdirsə, monolit təməl M300, çoxmərtəbəli karkas isə M350 tələb edir. Aşağıdakı bölmələr ilkin istiqamət üçündür — dəqiq seçimi layihəniz və ya pulsuz məsləhətimizlə dəqiqləşdirin.',
        en: 'The general rule is simple: the greater the load, the higher the grade. Where M100 is enough for preparation layers, a monolithic foundation calls for M300 and a multi-storey frame for M350. The sections below give initial guidance — confirm the exact choice with your project documentation or our free consultation.',
        ru: 'Общее правило простое: чем больше нагрузка, тем выше марка. Если для подготовительных слоёв достаточно M100, то монолитный фундамент требует M300, а многоэтажный каркас — M350. Разделы ниже дают первичный ориентир — точный выбор уточняйте по проекту или на нашей бесплатной консультации.',
      },
    ],
    benefitsTitle: {
      az: 'İşə görə marka tövsiyələri',
      en: 'Grade recommendations by job',
      ru: 'Рекомендации марок по видам работ',
    },
    benefits: [
      {
        title: { az: 'Fundament və özül — M250–M300', en: 'Foundations and footings — M250–M300', ru: 'Фундамент и основание — M250–M300' },
        text: {
          az: 'Zolaq təməl üçün M250, monolit plitə təməl üçün M300 standart seçimdir.',
          en: 'M250 for strip foundations and M300 for monolithic slab foundations are the standard choices.',
          ru: 'M250 для ленточного фундамента и M300 для монолитного плитного фундамента — стандартный выбор.',
        },
      },
      {
        title: { az: 'Döşəmə və qaraj — M200', en: 'Floors and garages — M200', ru: 'Полы и гараж — M200' },
        text: {
          az: 'Ev, qaraj və anbar döşəmələri üçün möhkəmlik-qiymət balansı.',
          en: 'The strength-to-price balance for house, garage and warehouse floors.',
          ru: 'Баланс прочности и цены для полов дома, гаража и склада.',
        },
      },
      {
        title: { az: 'Həyət betonlaması — M150–M200', en: 'Yard concreting — M150–M200', ru: 'Бетонирование двора — M150–M200' },
        text: {
          az: 'Piyada sahələrə M150, avtomobil keçən sahələrə M200.',
          en: 'M150 for pedestrian areas, M200 for areas with car traffic.',
          ru: 'M150 для пешеходных зон, M200 для участков с проездом автомобилей.',
        },
      },
      {
        title: { az: 'Yol və meydança — M200–M300', en: 'Roads and hardstandings — M200–M300', ru: 'Дороги и площадки — M200–M300' },
        text: {
          az: 'Yükdən asılı olaraq: yüngül örtüklər M200, ağır texnika M300.',
          en: 'Depending on the load: M200 for light pavements, M300 for heavy machinery.',
          ru: 'В зависимости от нагрузки: M200 для лёгких покрытий, M300 для тяжёлой техники.',
        },
      },
      {
        title: { az: 'Sütun və örtük — M300–M350', en: 'Columns and slabs — M300–M350', ru: 'Колонны и перекрытия — M300–M350' },
        text: {
          az: 'Monolit karkas elementləri və mərtəbəarası plitələr.',
          en: 'Monolithic frame elements and floor slabs.',
          ru: 'Элементы монолитного каркаса и межэтажные плиты.',
        },
      },
      {
        title: { az: 'Hovuz — M300', en: 'Pools — M300', ru: 'Бассейн — M300' },
        text: {
          az: 'Sıx strukturlu qarışıq su qurğuları üçün üstünlükdür.',
          en: 'A dense-structure mix is preferable for water-retaining structures.',
          ru: 'Смесь плотной структуры предпочтительна для гидротехнических сооружений.',
        },
      },
      {
        title: { az: 'Pilləkən və səki — M150–M200', en: 'Stairs and sidewalks — M150–M200', ru: 'Лестницы и тротуары — M150–M200' },
        text: {
          az: 'Yükə görə seçim; bordür yatağı üçün M100–M150.',
          en: 'Chosen by load; M100–M150 for kerb bedding.',
          ru: 'Выбор по нагрузке; для основания под бордюр — M100–M150.',
        },
      },
      {
        title: { az: 'Körpü və xüsusi işlər — M400–M600', en: 'Bridges and special works — M400–M600', ru: 'Мосты и специальные работы — M400–M600' },
        text: {
          az: 'İnfrastruktur və xüsusi mühəndis konstruksiyaları; ən yüksək yük tələbləri üçün M500–M600 yüksək möhkəmlikli betonlar.',
          en: 'Infrastructure and specialized engineering structures; the high-strength grades M500–M600 for the highest load requirements.',
          ru: 'Инфраструктура и специальные инженерные конструкции; для самых высоких нагрузок — высокопрочные марки M500–M600.',
        },
      },
    ],
    showGrades: true,
    faqs: [
      {
        q: {
          az: 'Fundament üçün hansı beton markası lazımdır?',
          en: 'Which concrete grade is needed for a foundation?',
          ru: 'Какая марка бетона нужна для фундамента?',
        },
        a: {
          az: 'Yüngül 1–2 mərtəbəli evlərin zolaq təməli üçün adətən M250, monolit plitə təməl və 2+ mərtəbə üçün M300 tövsiyə olunur. Zəif qruntda və böyük yüklərdə layihə üzrə daha yüksək marka tələb oluna bilər.',
          en: 'For the strip foundation of light 1–2 storey houses, M250 is usually recommended; for monolithic slab foundations and buildings of 2+ storeys, M300. On weak soil or under heavy loads, the project may require a higher grade.',
          ru: 'Для ленточного фундамента лёгких домов в 1–2 этажа обычно рекомендуется M250, для монолитного плитного фундамента и зданий от 2 этажей — M300. На слабых грунтах и при больших нагрузках проект может требовать более высокую марку.',
        },
      },
      {
        q: {
          az: 'Həyətə beton tökmək üçün hansı marka və qalınlıq lazımdır?',
          en: 'What grade and thickness are needed to concrete a yard?',
          ru: 'Какая марка и толщина нужны для бетонирования двора?',
        },
        a: {
          az: 'Piyada sahələr üçün M150 (8–10 sm), minik avtomobili keçən sahələr üçün M200 (10–15 sm) standart tövsiyədir. Sahəni kalkulyatora yazın — lazımi m³ dərhal hesablanacaq.',
          en: 'The standard recommendation is M150 (8–10 cm) for pedestrian areas and M200 (10–15 cm) for areas where passenger cars drive. Enter your area into the calculator — the required m³ is worked out instantly.',
          ru: 'Стандартная рекомендация: M150 (8–10 см) для пешеходных зон и M200 (10–15 см) для участков с проездом легковых автомобилей. Введите площадь в калькулятор — необходимые м³ будут рассчитаны сразу.',
        },
      },
      {
        q: {
          az: '100 kvadrat sahəyə neçə kub beton gedir?',
          en: 'How many cubic meters of concrete for a 100-square-meter area?',
          ru: 'Сколько кубов бетона нужно на 100 квадратных метров?',
        },
        a: {
          az: 'Bu, qalınlıqdan asılıdır: 10 sm qalınlıqda 100 m² üçün 10 m³, 15 sm-də 15 m³, 20 sm-də 20 m³ beton lazımdır. Dəqiq hesablama üçün beton kalkulyatorumuzdan istifadə edin.',
          en: 'It depends on the thickness: for 100 m² you need 10 m³ of concrete at 10 cm thickness, 15 m³ at 15 cm and 20 m³ at 20 cm. Use our concrete calculator for an exact figure.',
          ru: 'Это зависит от толщины: на 100 м² при толщине 10 см нужно 10 м³ бетона, при 15 см — 15 м³, при 20 см — 20 м³. Для точного расчёта воспользуйтесь нашим калькулятором бетона.',
        },
      },
      {
        q: {
          az: 'Qışda və ya yağışda beton tökmək olar?',
          en: 'Can concrete be poured in winter or in the rain?',
          ru: 'Можно ли заливать бетон зимой или в дождь?',
        },
        a: {
          az: 'Soyuq və yağışlı havada tökmə mümkündür, lakin əlavə tədbirlər tələb edir (səthin qorunması, müvafiq qarışıq). Tökmə tarixini planlaşdırarkən bizimlə məsləhətləşin — hava şəraitinə uyğun tövsiyə verək.',
          en: 'Pouring in cold or rainy weather is possible but requires extra measures (surface protection, a suitable mix). Consult us when planning your pouring date — we will advise you based on the weather conditions.',
          ru: 'Заливка в холодную и дождливую погоду возможна, но требует дополнительных мер (защита поверхности, соответствующая смесь). Планируя дату заливки, посоветуйтесь с нами — дадим рекомендации с учётом погодных условий.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Görəcəyim iş üçün hansı beton markasının uyğun olduğunu öyrənmək istəyirəm.',
      en: 'Hello! I would like to find out which concrete grade suits the job I am planning.',
      ru: 'Здравствуйте! Хочу узнать, какая марка бетона подходит для планируемой работы.',
    },
  },

  {
    slug: '/topdan-beton-satisi',
    seo: {
      title: {
        az: 'Topdan Beton Satışı — Tikinti Şirkətləri üçün Təchizat | NOVXANI BETON',
        en: 'Wholesale Concrete Sales — Supply for Construction Companies | NOVXANI BETON',
        ru: 'Оптовая продажа бетона — снабжение строительных компаний | NOVXANI BETON',
      },
      description: {
        az: 'Tikinti şirkətləri və podratçılar üçün topdan beton satışı: davamlı təchizat qrafiki, fasiləsiz mikser axını, müqavilə əsaslı əməkdaşlıq. Bakı və Abşeron üzrə. Kommersiya təklifi alın.',
        en: 'Wholesale concrete sales for construction companies and contractors: a steady supply schedule, continuous mixer-truck flow and contract-based cooperation. Across Baku and Absheron. Request a commercial offer.',
        ru: 'Оптовая продажа бетона для строительных компаний и подрядчиков: стабильный график поставок, непрерывный поток миксеров, сотрудничество на договорной основе. По Баку и Абшерону. Получите коммерческое предложение.',
      },
    },
    crumb: {
      az: 'Topdan Beton Satışı',
      en: 'Wholesale Concrete Sales',
      ru: 'Оптовая продажа бетона',
    },
    h1: {
      az: 'Topdan Beton Satışı — Tikinti Şirkətləri üçün',
      en: 'Wholesale Concrete Sales — for Construction Companies',
      ru: 'Оптовая продажа бетона — для строительных компаний',
    },
    tagline: {
      az: 'Böyük layihələr üçün davamlı, qrafikli beton təchizatı — müqavilə əsaslı əməkdaşlıq',
      en: 'Steady, scheduled concrete supply for large projects — contract-based cooperation',
      ru: 'Стабильные поставки бетона по графику для крупных проектов — сотрудничество на договорной основе',
    },
    hero: {
      image: imgB2b,
      alt: {
        az: 'Böyük tikinti layihəsi üçün material təchizatı',
        en: 'Material supply for a large construction project',
        ru: 'Поставка материалов для крупного строительного проекта',
      },
    },
    intro: [
      {
        az: 'Böyük layihədə beton təchizatı bir maşın sifarişindən fərqli məsələdir: tökmə qrafiki, fasiləsiz mikser axını, sabit keyfiyyət və proqnozlaşdırıla bilən şərtlər tələb olunur. Novxanı Beton tikinti şirkətləri, podratçılar və layihə qrupları ilə məhz bu formatda işləyir.',
        en: 'Supplying concrete to a large project is a different matter from ordering a single truck: it requires a pouring schedule, a continuous flow of mixer trucks, consistent quality and predictable terms. Novxani Beton works with construction companies, contractors and project teams in exactly this format.',
        ru: 'Снабжение бетоном крупного проекта — это не разовый заказ машины: требуются график заливки, непрерывный поток миксеров, стабильное качество и предсказуемые условия. Novxani Beton работает со строительными компаниями, подрядчиками и проектными командами именно в таком формате.',
      },
      {
        az: 'Layihənin ümumi həcminə və müddətinə uyğun kommersiya təklifi hazırlayırıq: razılaşdırılmış qrafik üzrə gündəlik təchizat, gecə tökmələri daxil 7/24 iş rejimi, nasos xidməti və hər partiya üzrə laboratoriya nəzarəti. Zavodumuz Novxanıda yerləşir — Abşeron zonasındakı obyektlərə logistika xüsusilə operativdir.',
        en: 'We prepare a commercial offer based on the total volume and duration of your project: daily supply on an agreed schedule, 24/7 operation including night pours, pumping service and laboratory control of every batch. Our plant is located in Novkhani — logistics to sites in the Absheron zone is especially efficient.',
        ru: 'Мы готовим коммерческое предложение с учётом общего объёма и сроков проекта: ежедневные поставки по согласованному графику, режим работы 24/7, включая ночные заливки, услуги бетононасоса и лабораторный контроль каждой партии. Завод находится в Новханы — логистика до объектов Абшеронской зоны особенно оперативна.',
      },
    ],
    benefitsTitle: {
      az: 'B2B əməkdaşlığın üstünlükləri',
      en: 'Advantages of B2B cooperation',
      ru: 'Преимущества B2B-сотрудничества',
    },
    benefits: [
      {
        title: { az: 'Davamlı təchizat', en: 'Continuous supply', ru: 'Непрерывное снабжение' },
        text: {
          az: 'Layihə boyu razılaşdırılmış qrafik üzrə gündəlik beton axını.',
          en: 'A daily flow of concrete on an agreed schedule throughout the project.',
          ru: 'Ежедневная подача бетона по согласованному графику на протяжении всего проекта.',
        },
      },
      {
        title: { az: 'Həcmə görə şərtlər', en: 'Volume-based terms', ru: 'Условия по объёму' },
        text: {
          az: 'Böyük və davamlı sifarişlər üçün xüsusi kommersiya şərtləri.',
          en: 'Special commercial terms for large and ongoing orders.',
          ru: 'Специальные коммерческие условия для крупных и постоянных заказов.',
        },
      },
      {
        title: { az: 'Sabit keyfiyyət', en: 'Consistent quality', ru: 'Стабильное качество' },
        text: {
          az: 'Hər partiya laboratoriya nəzarətindən keçir, sənədləşdirilir.',
          en: 'Every batch passes laboratory control and is documented.',
          ru: 'Каждая партия проходит лабораторный контроль и оформляется документально.',
        },
      },
      {
        title: { az: 'Tam xidmət paketi', en: 'Full service package', ru: 'Полный пакет услуг' },
        text: {
          az: 'Beton + çatdırılma + nasos + tərəzi bir təchizatçıdan.',
          en: 'Concrete + delivery + pump + weighbridge from a single supplier.',
          ru: 'Бетон + доставка + насос + весы от одного поставщика.',
        },
      },
    ],
    faqs: [
      {
        q: {
          az: 'Hansı həcmdən topdan şərtlər tətbiq olunur?',
          en: 'From what volume do wholesale terms apply?',
          ru: 'С какого объёма действуют оптовые условия?',
        },
        a: {
          az: 'Sabit hədd yoxdur — şərtlər layihənin ümumi həcminə və müddətinə görə müəyyən olunur. Layihə məlumatını göndərin, konkret təklif hazırlayaq.',
          en: 'There is no fixed threshold — terms are set according to the total volume and duration of the project. Send us your project details and we will prepare a specific offer.',
          ru: 'Фиксированного порога нет — условия определяются общим объёмом и сроками проекта. Пришлите данные проекта, и мы подготовим конкретное предложение.',
        },
      },
      {
        q: {
          az: 'Tender və layihə sənədləri üçün məlumat verirsinizmi?',
          en: 'Do you provide information for tenders and project documentation?',
          ru: 'Предоставляете ли вы информацию для тендеров и проектной документации?',
        },
        a: {
          az: 'Bəli, tələb olunduqda markalar üzrə texniki məlumat və sınaq nəticələri sənədlə təqdim olunur.',
          en: 'Yes, on request we provide documented technical information and test results for each grade.',
          ru: 'Да, при необходимости мы документально предоставляем техническую информацию по маркам и результаты испытаний.',
        },
      },
      {
        q: {
          az: 'Eyni gündə bir neçə obyektə təchizat mümkündürmü?',
          en: 'Can you supply several sites on the same day?',
          ru: 'Возможны ли поставки на несколько объектов в один день?',
        },
        a: {
          az: 'Bəli, qrafiklər əvvəlcədən razılaşdırılmaqla paralel obyektlərə təchizat planlaşdırılır.',
          en: 'Yes, with schedules agreed in advance, supply to parallel sites is planned.',
          ru: 'Да, при заблаговременном согласовании графиков планируются поставки на параллельные объекты.',
        },
      },
      {
        q: {
          az: 'Materialları (qum, atsep, şeben) da topdan alaq bilərikmi?',
          en: 'Can we also buy materials (sand, screenings, crushed stone) wholesale?',
          ru: 'Можно ли также покупать оптом материалы (песок, отсев, щебень)?',
        },
        a: {
          az: 'Bəli, beton zavodları və tikinti şirkətləri üçün qum, atsep və şeben üzrə davamlı topdan təchizat da təşkil edirik — ayrıca və ya betonla birlikdə.',
          en: 'Yes, we also organize ongoing wholesale supply of sand, screenings and crushed stone for concrete plants and construction companies — separately or together with concrete.',
          ru: 'Да, для бетонных заводов и строительных компаний мы также организуем постоянные оптовые поставки песка, отсева и щебня — отдельно или вместе с бетоном.',
        },
      },
    ],
    whatsappText: {
      az: 'Salam! Layihəmiz üçün topdan beton təchizatı üzrə kommersiya təklifi almaq istəyirəm.',
      en: 'Hello! I would like to receive a commercial offer for wholesale concrete supply for our project.',
      ru: 'Здравствуйте! Хочу получить коммерческое предложение на оптовые поставки бетона для нашего проекта.',
    },
  },
];

export const getServicePage = (slug) => SERVICE_PAGES.find((p) => p.slug === slug);
