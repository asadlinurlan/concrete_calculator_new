/* ============================================================
   Tikinti materialları (qum, atsep, şeben) — single source of truth.
   Drives the /tikinti-materiallari page sections, the home-page
   "Tikinti materialları" cards and the quote form product options.

   Content rules: only claims confirmed by the business are stated
   (Novxanı plant, Bakı & Abşeron delivery, wholesale + retail sales,
   supply to individuals, contractors and other concrete plants, 7/24).
   No invented fractions, technical specs or prices — those fields
   are added here when the company provides them.
   ============================================================ */
import imgQum from '../app/Pages/img/material-qum.webp';
import imgAtsep from '../app/Pages/img/material-atsep.webp';
import imgSeben from '../app/Pages/img/material-seben.webp';

export const MATERIALS = [
  {
    id: 'qum',
    name: 'Qum',
    image: imgQum,
    alt: 'Tikinti üçün qumun yaxın planda teksturası — qum satışı, Novxanı Beton',
    // Home-page card copy
    short:
      'Beton, hörgü və suvaq işləri üçün keyfiyyətli tikinti qumu. Topdan və pərakəndə satış, ünvana çatdırılma ilə.',
    // Detailed page copy
    intro:
      'Qum tikintinin ən çox istifadə olunan materialıdır — beton qarışığından suvaq işlərinə qədər demək olar ki, hər mərhələdə lazım olur. Novxanı Beton öz istehsalında istifadə etdiyi keyfiyyətli qumu həm fərdi sifarişçilərə, həm də şirkətlərə təqdim edir.',
    uses: [
      'Beton və sement qarışıqlarının hazırlanması',
      'Hörgü və suvaq işləri',
      'Özül altı yastıq qatının salınması',
      'Abadlıq və landşaft işləri',
    ],
    audience:
      'Fərdi ev tikənlər, ustalar və briqadalar, tikinti şirkətləri, beton istehsalçıları.',
    cta: 'Sifariş et',
    whatsappText: 'Salam! Qum sifarişi üçün qiymət təklifi almaq istəyirəm.',
  },
  {
    id: 'atsep',
    name: 'Atsep',
    image: imgAtsep,
    alt: 'Atsep — qum-çınqıl qarışığının yaxın planda görünüşü — atsep satışı, Novxanı Beton',
    short:
      'Beton istehsalı, yol əsası və dolğu işləri üçün atsep. Böyük həcmli sifarişlər və beton zavodlarına təchizat.',
    intro:
      'Atsep (qum-çınqıl qarışığı) beton istehsalında, yol və meydança əsaslarında, dolğu və hamarlama işlərində geniş istifadə olunur. Böyük həcmli sifarişlər üçün davamlı təchizat imkanı yaradırıq — digər beton zavodları da daxil olmaqla.',
    uses: [
      'Beton istehsalı üçün doldurucu material',
      'Yol və meydança əsaslarının salınması',
      'Ərazi dolğusu və hamarlama işləri',
      'Drenaj və altqurum işləri',
    ],
    audience:
      'Tikinti və yol şirkətləri, podratçılar, beton zavodları, iri həcmli dolğu işləri aparan sifarişçilər.',
    cta: 'Qiymət al',
    whatsappText: 'Salam! Atsep sifarişi üçün qiymət təklifi almaq istəyirəm.',
  },
  {
    id: 'seben',
    name: 'Şeben',
    image: imgSeben,
    alt: 'Şeben — boz qırma daş yığını — şeben satışı, Novxanı Beton',
    short:
      'Beton və dəmir-beton konstruksiyalar üçün şeben. Topdan satış və operativ çatdırılma ilə.',
    intro:
      'Şeben (qırma daş) betonun möhkəmliyini təmin edən əsas doldurucudur; yol əsaslarında və drenaj işlərində də əvəzolunmazdır. Zavodumuz şebeni topdan və pərakəndə qaydada satır, Bakı və Abşeron üzrə operativ çatdırılma təşkil edir.',
    uses: [
      'Beton və dəmir-beton konstruksiyaların istehsalı',
      'Özül və monolit tökmə işləri',
      'Yol örtüyü əsasının salınması',
      'Drenaj sistemləri və abadlıq işləri',
    ],
    audience:
      'Beton istehsalçıları, tikinti və yol şirkətləri, fərdi tikinti aparan sifarişçilər.',
    cta: 'Sifariş et',
    whatsappText: 'Salam! Şeben sifarişi üçün qiymət təklifi almaq istəyirəm.',
  },
];

export const getMaterial = (id) => MATERIALS.find((m) => m.id === id);
