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
   ============================================================ */
import { CONCRETE_GRADES } from './concreteGrades';
import imgHazirBeton from '../app/Pages/img/service-1.png';
import imgConcrete from '../app/Pages/img/concrete.jpeg';
import imgQiymet from '../app/Pages/img/d-c-rnqRdfYyywM-unsplash.jpg';
import imgPour from '../app/Pages/img/claus-grunstaudl-1_DvZyR3dRk-unsplash.jpg';
import imgSite from '../app/Pages/img/workers-construction-site.jpg';

const orderSteps = [
  { title: 'Həcmi dəqiqləşdirin', text: 'Beton kalkulyatoru ilə lazımi m³-ü hesablayın və ya ölçüləri bizə göndərin.' },
  { title: 'Sorğu göndərin', text: 'Zəng və ya WhatsApp ilə markanı, həcmi və ünvanı bildirin.' },
  { title: 'Fərdi təklif alın', text: 'Marka, həcm və məsafəyə uyğun qiymət təklifi — pulsuz və öhdəliksiz.' },
  { title: 'Çatdırılma və tökmə', text: 'Beton laboratoriya nəzarəti ilə istehsal olunub mikserlə ünvana çatdırılır.' },
];

// Per-grade unique editorial content. Merged below with the technical
// reference data (bClass, strength, use) from concreteGrades.js.
const GRADE_CONTENT = {
  M100: {
    hero: imgConcrete,
    tagline: 'Hazırlıq işləri, altlıq və hamarlama qatı üçün qənaətcil beton markası',
    intro: [
      'M100 (B7.5 sinfi) — ən yüngül yüklər üçün nəzərdə tutulmuş beton markasıdır. Əsas vəzifəsi daşıyıcı konstruksiya olmaq deyil, hazırlıq qatı yaratmaqdır: təməl altına tökülən hamarlayıcı altlıq, döşəmə altı hazırlıq qatı və bordür yatağı üçün ən çox seçilən markadır.',
      'Novxanı Beton M100 markasını GOST 26633 tələblərinə uyğun, laboratoriya nəzarəti ilə istehsal edir və Bakı, Abşeron üzrə mikserlə ünvana çatdırır. Sement payı az olduğu üçün M100 marka xəttimizin ən sərfəli betonudur — hazırlıq işlərində artıq pul ödəməyə ehtiyac yoxdur.',
    ],
    benefits: [
      { title: 'Təməl altı hazırlıq qatı', text: 'Qazıntının dibini hamarlayır, əsas təməli torpaqdan ayırır.' },
      { title: 'Döşəmə altı altlıq', text: 'Döşəmə tökülməzdən əvvəl bərabər, təmiz iş səthi yaradır.' },
      { title: 'Səki və bordür yatağı', text: 'Bordürlərin oturdulması və yüngül abadlıq işləri üçün.' },
      { title: 'Ən qənaətcil marka', text: 'Aşağı sement payı — hazırlıq işlərində minimal xərc.' },
    ],
    faqs: [
      { q: 'M100 beton harada istifadə olunur?', a: 'M100 daşıyıcı olmayan işlərdə istifadə olunur: təməl altına hamarlayıcı altlıq, döşəmə altı hazırlıq qatı, bordür yatağı və yüngül abadlıq tökmələri. Daşıyıcı təməl və divarlar üçün ən azı M250–M300 tövsiyə olunur.' },
      { q: 'M100 betonun qiyməti nə qədərdir?', a: 'M100 sement payı ən az olan marka olduğu üçün xəttimizin ən sərfəli betonudur. Dəqiq qiymət həcmdən və çatdırılma ünvanından asılıdır — WhatsApp və ya zənglə bir neçə dəqiqəyə fərdi təklif alın.' },
      { q: 'B7.5 beton nə deməkdir?', a: 'B7.5 — M100 markasının möhkəmlik sinfidir və 7.5 MPa təzyiqə davamlılıq deməkdir. M (marka) və B (sinif) eyni betonun iki fərqli işarələnməsidir.' },
      { q: 'Təməl altına niyə M100 tökülür?', a: 'Hamarlayıcı altlıq qazıntının dibini bərabərləşdirir, armaturu torpaqdan qoruyur və əsas təməlin dəqiq ölçüdə tökülməsinə imkan verir. Bu qat daşıyıcı olmadığı üçün M100 kifayətdir — daha yüksək marka istifadə etmək sadəcə artıq xərcdir.' },
    ],
  },
  M150: {
    hero: imgSite,
    tagline: 'Səki, bordür və yüngül döşəmə tökmələri üçün beton markası',
    intro: [
      'M150 (B10–B12.5 sinfi) hazırlıq betonu ilə konstruktiv beton arasında keçid markasıdır. Piyada səkiləri, bordürlər, yüngül yüklü həyət döşəmələri və birmərtəbəli yardımçı tikililərin sadə özülləri üçün optimal seçimdir.',
      'Marka Novxanı zavodumuzda GOST 26633 üzrə istehsal olunur, hər partiya laboratoriya nəzarətindən keçir. Bakı və Abşeron üzrə mikserlə çatdırılma, ehtiyac olduqda nasosla tökmə də təşkil edirik.',
    ],
    benefits: [
      { title: 'Səki və cığırlar', text: 'Piyada yükü üçün kifayət qədər möhkəm, sərfəli həll.' },
      { title: 'Bordür işləri', text: 'Bordürlərin oturdulması və bərkidilməsi üçün standart marka.' },
      { title: 'Yüngül döşəmələr', text: 'Həyət və yardımçı sahələrdə az yüklü döşəmə tökmələri.' },
      { title: 'Kiçik özüllər', text: 'Hasar və yüngül tikililərin sadə özül işləri.' },
    ],
    faqs: [
      { q: 'M150 beton harada istifadə olunur?', a: 'Səkilər, bordürlər, yüngül yüklü həyət döşəmələri, hasar dirəklərinin bərkidilməsi və yardımçı tikililərin kiçik özülləri üçün. Yaşayış evinin daşıyıcı təməli üçün isə M250–M300 seçilməlidir.' },
      { q: 'Həyətə beton tökmək üçün M150 kifayətdir?', a: 'Yalnız piyada gəzintisi olan sahələr üçün bəli. Üzərindən avtomobil keçəcəksə, M200 və qalınlığın artırılması tövsiyə olunur. Dəqiq seçim üçün pulsuz məsləhət verə bilərik.' },
      { q: 'M150 ilə M100-ün fərqi nədir?', a: 'M150 daha möhkəmdir (10 MPa, M100-də 7.5 MPa) və yüngül konstruktiv işlərdə istifadə oluna bilir; M100 isə yalnız hazırlıq qatları üçündür.' },
      { q: 'M150 betonun kub qiyməti neçəyədir?', a: 'Qiymət sifariş həcmindən və çatdırılma məsafəsindən asılı olaraq fərdi hesablanır. Kalkulyatorla həcmi dəqiqləşdirin və WhatsApp ilə göndərin — qısa zamanda təklif alacaqsınız.' },
    ],
  },
  M200: {
    hero: imgPour,
    tagline: 'Döşəmə, cığır və ümumi tikinti işləri üçün ən çox satılan markalardan biri',
    intro: [
      'M200 (B15 sinfi) fərdi tikintidə ən çox soruşulan markalardan biridir: ev döşəmələri, qaraj döşəməsi, üzərindən minik avtomobili keçən həyət betonlaması və yüngül birmərtəbəli tikililərin özülləri üçün standart seçimdir.',
      'Möhkəmlik və qiymət balansına görə M200 “ümumi məqsədli” beton sayılır. Novxanı Beton bu markanı laboratoriya nəzarəti ilə istehsal edir; Bakı və Abşeronun istənilən nöqtəsinə mikserlə çatdırırıq, həcmə uyğun fərdi qiymət təklif edirik.',
    ],
    benefits: [
      { title: 'Ev və qaraj döşəməsi', text: 'Yaşayış sahələrində standart döşəmə tökmələri üçün.' },
      { title: 'Həyət betonlaması', text: 'Minik avtomobili yükünə davamlı həyət örtüyü.' },
      { title: 'Yüngül özüllər', text: 'Birmərtəbəli, yüngül konstruksiyalı tikililərin özülü.' },
      { title: 'Pilləkən və meydança', text: 'Ümumi məqsədli monolit tökmə işləri.' },
    ],
    faqs: [
      { q: 'M200 beton harada istifadə olunur?', a: 'Ev və qaraj döşəmələri, həyət betonlaması, pilləkənlər, yüngül tikililərin özülləri və ümumi məqsədli tökmələr. Çoxmərtəbəli və ya monolit təməl işləri üçün M300 və yuxarı markalara baxın.' },
      { q: 'M200 beton neçə manatdır?', a: 'Saytda sabit qiymət yazmırıq, çünki qiymət həcmdən, çatdırılma məsafəsindən və nasos ehtiyacından asılı dəyişir. Sorğu göndərin — layihənizə uyğun dəqiq rəqəmi qısa zamanda təqdim edək.' },
      { q: 'Həyətə neçə santimetr M200 beton tökülməlidir?', a: 'Piyada sahələr üçün adətən 8–10 sm, minik avtomobili keçən sahələr üçün 10–15 sm tövsiyə olunur. Sahəni və qalınlığı beton kalkulyatorumuza yazın — lazımi m³ avtomatik hesablanacaq.' },
      { q: 'B15 beton M200-ün eynisidir?', a: 'Bəli. B15 — M200 markasının möhkəmlik sinfidir (15 MPa). Layihə sənədlərində hər iki işarələnmə ilə rastlaşa bilərsiniz.' },
    ],
  },
  M250: {
    hero: imgHazirBeton,
    tagline: 'Zolaq təməl və daşıyıcı divarlar üçün etibarlı orta sinif marka',
    intro: [
      'M250 (B20 sinfi) fərdi yaşayış evlərinin zolaq təməlləri, daşıyıcı divarlar və orta yüklü monolit elementlər üçün nəzərdə tutulub. M200-dən möhkəm, M300-dən sərfəli olduğu üçün 1–2 mərtəbəli ev tikintisində tez-tez optimal nöqtə məhz M250 olur.',
      'İstehsal Novxanı zavodumuzda GOST 26633 üzrə aparılır; hər partiya laboratoriyada yoxlanılır və 28 günlük kub sınağından keçirilir. Təməl tökmə qrafikinizə uyğun mikser axını planlaşdırır, ehtiyac olduqda nasos xidməti də təşkil edirik.',
    ],
    benefits: [
      { title: 'Zolaq təməllər', text: '1–2 mərtəbəli evlərin lent tipli özül tökmələri üçün.' },
      { title: 'Daşıyıcı divarlar', text: 'Monolit daşıyıcı divar və dayaq elementləri.' },
      { title: 'Hasar özülləri', text: 'Ağır hasar və dayaq divarlarının bünövrəsi.' },
      { title: 'Orta yüklü plitələr', text: 'Yardımçı tikililərin monolit örtük plitələri.' },
    ],
    faqs: [
      { q: 'M250 beton harada istifadə olunur?', a: 'Fərdi evlərin zolaq təməlləri, daşıyıcı divarlar, dayaq divarları, ağır hasar özülləri və orta yüklü monolit plitələr. Ağır və çoxmərtəbəli konstruksiyalarda M300+ seçilməlidir.' },
      { q: 'Ev təməli üçün M250 yoxsa M300 seçim?', a: 'Yüngül konstruksiyalı 1–2 mərtəbəli evlərdə zolaq təməl üçün M250 çox vaxt kifayətdir; monolit plitə təməl, zəif qrunt və ya 2+ mərtəbə olduqda M300 tövsiyə olunur. Layihəni yazın — pulsuz dəqiqləşdirək.' },
      { q: 'M250 betonun qiyməti M200-dən nə qədər fərqlənir?', a: 'M250-də sement payı daha yüksəkdir, ona görə qiyməti bir qədər çoxdur. Dəqiq fərq cari xammal qiymətlərindən asılıdır — hər iki marka üçün eyni sorğuda müqayisəli təklif verə bilərik.' },
      { q: 'B20 sinfi nə deməkdir?', a: 'B20 — M250 markasına uyğun möhkəmlik sinfidir və betonun 20 MPa təzyiqə davam gətirdiyini göstərir.' },
    ],
  },
  M300: {
    hero: imgHazirBeton,
    tagline: 'Monolit təməl, plitə və sütunlar üçün ən çox sifariş olunan konstruktiv marka',
    intro: [
      'M300 (B22.5 sinfi) Azərbaycanda fərdi və aşağımərtəbəli tikintinin “qızıl standartı” sayılır: monolit təməllər, özül plitələri, sütunlar, riqellər və mərtəbəarası örtüklər üçün ən çox sifariş olunan markadır. Möhkəmliyi (22.5 MPa) əksər yaşayış layihələrinin yükünü rahat qarşılayır.',
      'Novxanı Beton M300-ü GOST 26633 tələblərinə uyğun istehsal edir — hər partiya laboratoriya nəzarətindən və 28 günlük möhkəmlik sınağından keçir. Bakı və Abşeron üzrə mikserlə çatdırılma, böyük tökmələrdə fasiləsiz mikser axını və nasos xidməti təşkil olunur.',
    ],
    benefits: [
      { title: 'Monolit təməllər', text: 'Plitə və zolaq təməllərin əsas markası — yaşayış tikintisinin standartı.' },
      { title: 'Sütun və riqellər', text: 'Karkas binaların daşıyıcı elementləri üçün kifayət qədər möhkəm.' },
      { title: 'Mərtəbəarası örtüklər', text: 'Monolit plitə və örtük tökmələrində geniş istifadə.' },
      { title: 'Hovuz və su qurğuları', text: 'Sıx strukturu su qurğularının tökülməsində üstünlük verir.' },
    ],
    faqs: [
      { q: 'M300 beton harada istifadə olunur?', a: 'Monolit təməllər (plitə və zolaq), sütunlar, riqellər, mərtəbəarası örtüklər, monolit divarlar, pilləkənlər və hovuz tökmələri — M300 fərdi və aşağımərtəbəli tikintinin ən universal konstruktiv markasıdır.' },
      { q: 'M300 və M400 betonun fərqi nədir?', a: 'M300 (B22.5) 22.5 MPa, M400 (B30) 30 MPa möhkəmliyə malikdir. M400-də sement payı daha yüksəkdir — körpü, hidrotexniki qurğular və yüksək yüklü konstruksiyalar üçündür. Adi yaşayış tikintisində M300 adətən kifayətdir və daha sərfəlidir.' },
      { q: '1 kub M300 beton neçə manatdır?', a: 'Qiymət sifariş həcmindən, çatdırılma məsafəsindən və nasos ehtiyacından asılı olaraq dəyişir, ona görə fərdi təklif veririk. Həcmi kalkulyatorla hesablayıb WhatsApp-la göndərin — dəqiq qiyməti qısa zamanda alacaqsınız.' },
      { q: 'Fundament üçün hansı beton lazımdır?', a: 'Monolit plitə təməl və 2+ mərtəbəli evlər üçün standart tövsiyə M300-dür. Yüngül 1–2 mərtəbəli evlərin zolaq təməlində M250 da yetərli ola bilər. Layihənizə görə pulsuz məsləhət veririk.' },
    ],
  },
  M350: {
    hero: imgPour,
    tagline: 'Çoxmərtəbəli karkas binalar və yüksək yüklü konstruksiyalar üçün marka',
    intro: [
      'M350 (B25 sinfi) çoxmərtəbəli binaların karkas elementləri — sütunlar, riqellər, diafraqmalar və yüksək yüklü örtük plitələri üçün nəzərdə tutulmuş markadır. 25 MPa möhkəmliyi onu layihə mühəndislərinin çoxmərtəbəli yaşayış və kommersiya obyektlərində standart seçiminə çevirir.',
      'Tikinti şirkətləri üçün M350 təchizatını qrafik üzrə, fasiləsiz mikser axını ilə təşkil edirik — beton tökmə növbələriniz dayanmır. İstehsal GOST 26633 üzrə, laboratoriya nəzarəti və 28 günlük kub sınağı ilə aparılır.',
    ],
    benefits: [
      { title: 'Çoxmərtəbəli karkas', text: 'Sütun, riqel və diafraqmaların layihə standartı.' },
      { title: 'Yüksək yüklü örtüklər', text: 'Böyük aşırımlı monolit plitələr üçün etibarlı möhkəmlik.' },
      { title: 'Kommersiya obyektləri', text: 'Ticarət mərkəzləri və inzibati binaların monolit işləri.' },
      { title: 'Davamlı təchizat', text: 'Layihə boyu qrafikli, fasiləsiz beton axını.' },
    ],
    faqs: [
      { q: 'M350 beton harada istifadə olunur?', a: 'Çoxmərtəbəli binaların karkası (sütun, riqel, diafraqma), yüksək yüklü mərtəbəarası örtüklər, böyük aşırımlı plitələr və kommersiya obyektlərinin monolit konstruksiyaları.' },
      { q: 'M350 ilə M300-ün fərqi nədir?', a: 'M350 (B25, 25 MPa) M300-dən (B22.5, 22.5 MPa) daha möhkəmdir və layihədə yük daha çox olduqda seçilir. Hansının lazım olduğunu layihə konstruktoru müəyyən edir — layihəniz yoxdursa, obyekt barədə məlumat verin, məsləhətləşək.' },
      { q: 'Böyük həcmli M350 sifarişində şərtlər necədir?', a: 'Çoxmərtəbəli layihələr üçün davamlı təchizat qrafiki qurulur və həcmə uyğun xüsusi kommersiya şərtləri təklif olunur. Layihənin ümumi həcmini bildirin — müqavilə əsaslı təklif hazırlayaq.' },
      { q: 'M350 nasosla vurula bilərmi?', a: 'Bəli, M350 qarışığı nasoslamaya uyğun hazırlanır — hündür mərtəbələrə tökmə üçün nasos xidmətini betonla birlikdə sifariş edə bilərsiniz.' },
    ],
  },
  M400: {
    hero: imgQiymet,
    tagline: 'Körpü, hidrotexniki qurğular və xüsusi yüklü konstruksiyalar üçün yüksək markalı beton',
    intro: [
      'M400 (B30 sinfi) yüksək möhkəmlikli betondur: körpülər, hidrotexniki qurğular, sənaye obyektlərinin ağır yüklü konstruksiyaları və xüsusi mühəndis layihələri üçün nəzərdə tutulub. 30 MPa möhkəmlik və sıx struktur ona həm yük, həm də aqressiv mühit davamlılığı verir.',
      'M400 istehsalında sement payı yüksəkdir və qarışıq daha ciddi nəzarət tələb edir — hər partiya laboratoriyamızda yoxlanılır, 28 günlük kub sınağından keçirilir. İnfrastruktur və sənaye layihələri üçün qrafikli təchizat təşkil edirik.',
    ],
    benefits: [
      { title: 'Körpü və yol qurğuları', text: 'İnfrastruktur obyektlərinin daşıyıcı konstruksiyaları.' },
      { title: 'Hidrotexniki qurğular', text: 'Su ilə təmasda olan konstruksiyalar üçün sıx struktur.' },
      { title: 'Sənaye konstruksiyaları', text: 'Ağır avadanlıq özülləri və sənaye döşəmələri.' },
      { title: 'Yüksək mərtəbəli binalar', text: 'Aşağı mərtəbələrin yüksək yüklü daşıyıcı elementləri.' },
    ],
    faqs: [
      { q: 'M400 beton harada istifadə olunur?', a: 'Körpülər, hidrotexniki qurğular, sənaye obyektlərinin ağır yüklü özülləri, yüksəkmərtəbəli binaların aşağı mərtəbə daşıyıcıları və xüsusi mühəndis konstruksiyaları. Adi yaşayış tikintisi üçün adətən M300–M350 kifayətdir.' },
      { q: 'M400 betonun qiyməti niyə yüksəkdir?', a: 'M400-də sement payı marka xəttinin ən yüksəklərindəndir və istehsal nəzarəti daha ciddidir. Dəqiq qiymət həcm və ünvana görə fərdi hesablanır — sorğu göndərin, müqayisəli təklif verək.' },
      { q: 'B30 beton nədir?', a: 'B30 — M400 markasının möhkəmlik sinfidir: 30 MPa təzyiqə davamlılıq. Layihələrdə M400 və B30 eyni betonu ifadə edir.' },
      { q: 'Fərdi ev tikintisində M400 lazımdırmı?', a: 'Əksər hallarda yox — bu, artıq xərcdir. M400 layihədə xüsusi tələb olduqda seçilir. Layihəsiz sifarişlərdə obyekt barədə məlumat verin, düzgün markanı birlikdə seçək.' },
    ],
  },
  M450: {
    hero: imgSite,
    tagline: 'Xüsusi mühəndis konstruksiyaları üçün xəttimizin ən yüksək möhkəmlikli markası',
    intro: [
      'M450 (B35 sinfi) istehsal xəttimizin ən yüksək markasıdır — 35 MPa möhkəmlik. Xüsusi mühəndis konstruksiyaları, hərtərəfli yüksək yük daşıyan elementlər və layihədə açıq şəkildə B35 tələb olunan obyektlər üçün istehsal olunur.',
      'Bu səviyyəli beton dəqiq resept və ciddi istehsal nəzarəti tələb edir: qarışıq laboratoriyada layihə tələbinə uyğun hazırlanır, hər partiya sınaqdan keçirilir və sənədləşdirilir. M450 sifarişləri adətən layihə sənədləri əsasında, əvvəlcədən razılaşdırılmış qrafiklə yerinə yetirilir.',
    ],
    benefits: [
      { title: 'Xüsusi konstruksiyalar', text: 'Layihədə B35 tələb olunan mühəndis obyektləri.' },
      { title: 'Maksimal möhkəmlik', text: 'Xəttimizin ən yüksək göstəricisi — 35 MPa.' },
      { title: 'Layihə əsaslı istehsal', text: 'Qarışıq layihə tələbinə uyğun laboratoriyada hazırlanır.' },
      { title: 'Sənədli keyfiyyət', text: 'Hər partiya sınaq nəticələri ilə sənədləşdirilir.' },
    ],
    faqs: [
      { q: 'M450 beton hansı işlərdə tələb olunur?', a: 'Xüsusi mühəndis konstruksiyaları, çox yüksək yüklü daşıyıcı elementlər və layihə sənədlərində B35 sinfi açıq göstərilən obyektlər üçün. Adi tikintidə bu markaya ehtiyac yaranmır.' },
      { q: 'M450 sifarişi necə verilir?', a: 'Layihə tələblərini (sinif, həcm, tökmə qrafiki) bizə göndərin — qarışıq laboratoriyada layihəyə uyğun hazırlanır və istehsal qrafiki əvvəlcədən razılaşdırılır.' },
      { q: 'M450-dən yuxarı marka istehsal edirsiniz?', a: 'Standart xəttimiz M100–M450 aralığını əhatə edir. Layihənizdə daha yüksək sinif tələb olunursa, əlaqə saxlayın — imkanları birlikdə dəyərləndirək.' },
      { q: 'M450 betonun keyfiyyəti necə təsdiqlənir?', a: 'İstehsal GOST 26633 üzrə aparılır, hər partiya laboratoriya nəzarətindən keçir, 28 günlük kub sınağı ilə yoxlanılır və nəticələr sənədlə təqdim olunur.' },
    ],
  },
};

// Neighbour-grade related links: previous/next grade + always-useful pages.
const buildRelated = (id) => {
  const idx = CONCRETE_GRADES.findIndex((g) => g.id === id);
  const rel = [
    { to: `/calculator?grade=${id}`, label: `${id} ilə həcmi hesabla` },
    { to: '/beton-qiymetleri', label: 'Qiymət necə formalaşır?' },
  ];
  const prev = CONCRETE_GRADES[idx - 1];
  const next = CONCRETE_GRADES[idx + 1];
  if (prev) rel.push({ to: `/${prev.id.toLowerCase()}-beton`, label: `${prev.id} beton (${prev.bClass})` });
  if (next) rel.push({ to: `/${next.id.toLowerCase()}-beton`, label: `${next.id} beton (${next.bClass})` });
  rel.push({ to: '/products', label: 'Bütün beton markaları' });
  return rel;
};

export const GRADE_PAGES = CONCRETE_GRADES.map((g) => {
  const c = GRADE_CONTENT[g.id];
  return {
    slug: `/${g.id.toLowerCase()}-beton`,
    seo: {
      title: `${g.id} Beton (${g.bClass}) — Qiyməti, İstifadə Sahələri və Sifariş | NOVXANI BETON`,
      description: `${g.id} beton (${g.bClass} sinfi, ${g.strength} MPa): ${g.use.toLowerCase()} üçün. GOST 26633 üzrə laboratoriya nəzarətli istehsal, Bakı və Abşeron üzrə çatdırılma. Fərdi qiymət təklifi alın.`,
    },
    crumb: `${g.id} Beton`,
    parentCrumb: { to: '/products', label: 'Beton Markaları' },
    h1: `${g.id} Beton (${g.bClass})`,
    tagline: c.tagline,
    hero: { image: c.hero, alt: `${g.id} beton — ${g.use.toLowerCase()}` },
    intro: c.intro,
    benefitsTitle: 'İstifadə sahələri',
    benefits: c.benefits,
    showGrades: true,
    currentGrade: g.id,
    stepsTitle: `${g.id} beton sifarişi necə verilir`,
    steps: orderSteps,
    faqs: c.faqs,
    related: buildRelated(g.id),
    whatsappText: `Salam! ${g.id} beton üçün qiymət təklifi almaq istəyirəm.`,
  };
});

export const getGradePage = (slug) => GRADE_PAGES.find((p) => p.slug === slug);
