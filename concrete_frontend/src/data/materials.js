/* ============================================================
   Tikinti materialları (qum, atsep, şeben) — single source of truth.
   Drives the /tikinti-materiallari page sections, the home-page
   "Tikinti materialları" cards and the quote form product options.

   Content rules: only claims confirmed by the business are stated
   (Novxanı plant, Bakı & Abşeron delivery, wholesale + retail sales,
   supply to individuals, contractors and other concrete plants, 7/24).
   No invented fractions, technical specs or prices — those fields
   are added here when the company provides them.

   i18n: every user-visible string is a trilingual object
   { az, en, ru } resolved by the shared t() helper. `id` values
   stay unchanged — they build URLs like `/${id}-satisi`.
   ============================================================ */
import imgQum from '../app/Pages/img/material-qum.webp';
import imgAtsep from '../app/Pages/img/material-atsep.webp';
import imgSeben from '../app/Pages/img/material-seben.webp';

export const MATERIALS = [
  {
    id: 'qum',
    name: { az: 'Qum', en: 'Sand', ru: 'Песок' },
    image: imgQum,
    alt: {
      az: 'Tikinti üçün qumun yaxın planda teksturası — qum satışı, Novxanı Beton',
      en: 'Close-up texture of construction sand — sand for sale, Novxani Beton',
      ru: 'Крупный план текстуры строительного песка — продажа песка, Novxani Beton',
    },
    // Home-page card copy
    short: {
      az: 'Beton, hörgü və suvaq işləri üçün keyfiyyətli tikinti qumu. Topdan və pərakəndə satış, ünvana çatdırılma ilə.',
      en: 'Quality construction sand for concrete, masonry and plastering work. Wholesale and retail sales with delivery to your address.',
      ru: 'Качественный строительный песок для бетона, кладочных и штукатурных работ. Опт и розница, с доставкой по адресу.',
    },
    // Detailed page copy
    intro: {
      az: 'Qum tikintinin ən çox istifadə olunan materialıdır — beton qarışığından suvaq işlərinə qədər demək olar ki, hər mərhələdə lazım olur. Novxanı Beton öz istehsalında istifadə etdiyi keyfiyyətli qumu həm fərdi sifarişçilərə, həm də şirkətlərə təqdim edir.',
      en: 'Sand is the most widely used construction material — it is needed at almost every stage, from concrete mixes to plastering. Novxani Beton supplies the quality sand it uses in its own production to both private customers and companies.',
      ru: 'Песок — самый востребованный строительный материал: он нужен практически на каждом этапе, от бетонной смеси до штукатурных работ. Novxani Beton предлагает качественный песок, используемый в собственном производстве, как частным заказчикам, так и компаниям.',
    },
    uses: [
      {
        az: 'Beton və sement qarışıqlarının hazırlanması',
        en: 'Preparation of concrete and cement mixes',
        ru: 'Приготовление бетонных и цементных смесей',
      },
      {
        az: 'Hörgü və suvaq işləri',
        en: 'Masonry and plastering work',
        ru: 'Кладочные и штукатурные работы',
      },
      {
        az: 'Özül altı yastıq qatının salınması',
        en: 'Laying the bedding layer under foundations',
        ru: 'Устройство подушки под фундамент',
      },
      {
        az: 'Abadlıq və landşaft işləri',
        en: 'Landscaping and site improvement work',
        ru: 'Благоустройство и ландшафтные работы',
      },
    ],
    audience: {
      az: 'Fərdi ev tikənlər, ustalar və briqadalar, tikinti şirkətləri, beton istehsalçıları.',
      en: 'Private house builders, craftsmen and crews, construction companies, concrete producers.',
      ru: 'Частные застройщики, мастера и бригады, строительные компании, производители бетона.',
    },
    cta: { az: 'Sifariş et', en: 'Order now', ru: 'Заказать' },
    whatsappText: {
      az: 'Salam! Qum sifarişi üçün qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a quote for a sand order.',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на заказ песка.',
    },
  },
  {
    id: 'atsep',
    name: { az: 'Atsep', en: 'Gravel mix', ru: 'ПГС' },
    image: imgAtsep,
    alt: {
      az: 'Atsep — qum-çınqıl qarışığının yaxın planda görünüşü — atsep satışı, Novxanı Beton',
      en: 'Atsep — close-up view of a sand-gravel mix — gravel mix for sale, Novxani Beton',
      ru: 'Атсеп — крупный план песчано-гравийной смеси — продажа ПГС, Novxani Beton',
    },
    short: {
      az: 'Beton istehsalı, yol əsası və dolğu işləri üçün atsep. Böyük həcmli sifarişlər və beton zavodlarına təchizat.',
      en: 'Gravel mix (atsep) for concrete production, road bases and backfilling. Large-volume orders and supply to concrete plants.',
      ru: 'ПГС для производства бетона, оснований дорог и отсыпки. Крупные объёмы и поставки бетонным заводам.',
    },
    intro: {
      az: 'Atsep (qum-çınqıl qarışığı) beton istehsalında, yol və meydança əsaslarında, dolğu və hamarlama işlərində geniş istifadə olunur. Böyük həcmli sifarişlər üçün davamlı təchizat imkanı yaradırıq — digər beton zavodları da daxil olmaqla.',
      en: 'Atsep (sand-gravel mix) is widely used in concrete production, in road and site bases, and in filling and levelling work. We provide continuous supply for large-volume orders — including other concrete plants.',
      ru: 'Атсеп (песчано-гравийная смесь, ПГС) широко используется в производстве бетона, в основаниях дорог и площадок, при отсыпке и выравнивании. Для крупных заказов мы обеспечиваем постоянные поставки — в том числе другим бетонным заводам.',
    },
    uses: [
      {
        az: 'Beton istehsalı üçün doldurucu material',
        en: 'Filler material for concrete production',
        ru: 'Заполнитель для производства бетона',
      },
      {
        az: 'Yol və meydança əsaslarının salınması',
        en: 'Building road and site bases',
        ru: 'Устройство оснований дорог и площадок',
      },
      {
        az: 'Ərazi dolğusu və hamarlama işləri',
        en: 'Area backfilling and levelling work',
        ru: 'Отсыпка территории и выравнивание',
      },
      {
        az: 'Drenaj və altqurum işləri',
        en: 'Drainage and substructure work',
        ru: 'Дренажные работы и подготовка оснований',
      },
    ],
    audience: {
      az: 'Tikinti və yol şirkətləri, podratçılar, beton zavodları, iri həcmli dolğu işləri aparan sifarişçilər.',
      en: 'Construction and road companies, contractors, concrete plants, customers carrying out large-volume backfilling work.',
      ru: 'Строительные и дорожные компании, подрядчики, бетонные заводы, заказчики крупных объёмов отсыпки.',
    },
    cta: { az: 'Qiymət al', en: 'Get a quote', ru: 'Узнать цену' },
    whatsappText: {
      az: 'Salam! Atsep sifarişi üçün qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a quote for a gravel mix (atsep) order.',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на заказ ПГС.',
    },
  },
  {
    id: 'seben',
    name: { az: 'Şeben', en: 'Crushed stone', ru: 'Щебень' },
    image: imgSeben,
    alt: {
      az: 'Şeben — boz qırma daş yığını — şeben satışı, Novxanı Beton',
      en: 'Crushed stone — a pile of grey crushed rock — crushed stone for sale, Novxani Beton',
      ru: 'Щебень — куча серого дроблёного камня — продажа щебня, Novxani Beton',
    },
    short: {
      az: 'Beton və dəmir-beton konstruksiyalar üçün şeben. Topdan satış və operativ çatdırılma ilə.',
      en: 'Crushed stone for concrete and reinforced-concrete structures. Wholesale sales with prompt delivery.',
      ru: 'Щебень для бетонных и железобетонных конструкций. Оптовая продажа с оперативной доставкой.',
    },
    intro: {
      az: 'Şeben (qırma daş) betonun möhkəmliyini təmin edən əsas doldurucudur; yol əsaslarında və drenaj işlərində də əvəzolunmazdır. Zavodumuz şebeni topdan və pərakəndə qaydada satır, Bakı və Abşeron üzrə operativ çatdırılma təşkil edir.',
      en: 'Crushed stone is the main aggregate that gives concrete its strength; it is also indispensable in road bases and drainage work. Our plant sells crushed stone wholesale and retail, with prompt delivery across Baku and Absheron.',
      ru: 'Щебень — основной заполнитель, обеспечивающий прочность бетона; он также незаменим в основаниях дорог и дренажных работах. Наш завод продаёт щебень оптом и в розницу, организуя оперативную доставку по Баку и Абшерону.',
    },
    uses: [
      {
        az: 'Beton və dəmir-beton konstruksiyaların istehsalı',
        en: 'Production of concrete and reinforced-concrete structures',
        ru: 'Производство бетонных и железобетонных конструкций',
      },
      {
        az: 'Özül və monolit tökmə işləri',
        en: 'Foundation and monolithic pouring work',
        ru: 'Фундаментные и монолитные работы',
      },
      {
        az: 'Yol örtüyü əsasının salınması',
        en: 'Laying road pavement bases',
        ru: 'Устройство оснований дорожного покрытия',
      },
      {
        az: 'Drenaj sistemləri və abadlıq işləri',
        en: 'Drainage systems and landscaping work',
        ru: 'Дренажные системы и благоустройство',
      },
    ],
    audience: {
      az: 'Beton istehsalçıları, tikinti və yol şirkətləri, fərdi tikinti aparan sifarişçilər.',
      en: 'Concrete producers, construction and road companies, private builders.',
      ru: 'Производители бетона, строительные и дорожные компании, частные застройщики.',
    },
    cta: { az: 'Sifariş et', en: 'Order now', ru: 'Заказать' },
    whatsappText: {
      az: 'Salam! Şeben sifarişi üçün qiymət təklifi almaq istəyirəm.',
      en: 'Hello! I would like to get a quote for a crushed stone order.',
      ru: 'Здравствуйте! Хочу получить ценовое предложение на заказ щебня.',
    },
  },
];

export const getMaterial = (id) => MATERIALS.find((m) => m.id === id);
