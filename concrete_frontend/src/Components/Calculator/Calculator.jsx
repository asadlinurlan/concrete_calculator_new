import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics';
import { useT, useLocale } from '../../i18n/i18n';
import { MessageCircle } from 'lucide-react';
import {
  CONCRETE_GRADES,
  getGrade,
  materialsPerM3,
  ratioLabel,
  DENSITY,
} from '../../data/concreteGrades';
import Seo from '../Seo/Seo';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Faq from '../Faq/Faq';
import CtaBand from '../CtaBand/CtaBand';
import './Calculator.css';

const CALC_FAQS = [
  {
    q: {
      az: 'Kalkulyator nəyi hesablayır?',
      en: 'What does the calculator compute?',
      ru: 'Что рассчитывает калькулятор?',
    },
    a: {
      az: 'Seçdiyiniz forma və ölçülərə əsasən lazımi beton həcmini (m³), təxmini sement, qum və çınqıl miqdarını, armatur ehtiyacını və mikser sayını hesablayır. Vahid çevirici ilə m³-ü digər ölçü vahidlərinə də çevirə bilərsiniz.',
      en: 'Based on the shape and dimensions you select, it calculates the required concrete volume (m³), the approximate amounts of cement, sand and gravel, the rebar requirement and the number of mixer trucks. With the unit converter you can also convert m³ into other units.',
      ru: 'На основе выбранной формы и размеров он рассчитывает необходимый объем бетона (м³), примерное количество цемента, песка и щебня, потребность в арматуре и число миксеров. С помощью конвертера единиц вы также можете перевести м³ в другие единицы измерения.',
    },
  },
  {
    q: {
      az: '1 m³ beton neçə tondur?',
      en: 'How many tonnes is 1 m³ of concrete?',
      ru: 'Сколько тонн весит 1 м³ бетона?',
    },
    a: {
      az: 'Adi armaturlu beton təxminən 2,4 ton/m³-dür. Kalkulyator çəkini avtomatik hesablayır — nəticədə həm həcmi, həm də təxmini çəkini görürsünüz.',
      en: 'Ordinary reinforced concrete weighs about 2.4 t/m³. The calculator computes the weight automatically — in the results you see both the volume and the approximate weight.',
      ru: 'Обычный армированный бетон весит примерно 2,4 т/м³. Калькулятор рассчитывает вес автоматически — в результатах вы видите и объем, и примерный вес.',
    },
  },
  {
    q: {
      az: 'Bir mikserdə nə qədər beton gəlir?',
      en: 'How much concrete does one mixer truck carry?',
      ru: 'Сколько бетона привозит один миксер?',
    },
    a: {
      az: 'Standart mikserlərin tutumu adətən 7–10 m³ aralığındadır. Kalkulyator layihəniz üçün lazımi mikser sayını avtomatik təklif edir.',
      en: 'Standard mixer trucks usually hold 7–10 m³. The calculator automatically suggests the number of mixer trucks needed for your project.',
      ru: 'Вместимость стандартных миксеров обычно составляет 7–10 м³. Калькулятор автоматически подсказывает, сколько миксеров потребуется для вашего проекта.',
    },
  },
  {
    q: {
      az: 'Nəticələr nə dərəcədə dəqiqdir?',
      en: 'How accurate are the results?',
      ru: 'Насколько точны результаты?',
    },
    a: {
      az: 'Hesablamalar nominal qarışıq əsasında təxmini planlaşdırma dəyərləridir və layihələndirmə üçün etibarlı istinad rolunu oynayır. Konstruktiv işlərdə yekun qarışıq dizaynı laboratoriya nəzarəti ilə dəqiqləşdirilir — bunun üçün bizimlə əlaqə saxlaya bilərsiniz.',
      en: 'The calculations are approximate planning values based on a nominal mix and serve as a reliable reference for design. For structural work the final mix design is refined under laboratory control — feel free to contact us for this.',
      ru: 'Расчеты являются ориентировочными плановыми значениями на основе номинальной смеси и служат надежным ориентиром при проектировании. Для конструктивных работ окончательный состав смеси уточняется под лабораторным контролем — для этого свяжитесь с нами.',
    },
  },
];

/* ── UI strings (az byte-identical to the original literals) ── */
const TXT = {
  // Shape tabs
  slab: { az: 'Plitə', en: 'Slab', ru: 'Плита' },
  footing: { az: 'Təməl', en: 'Foundation', ru: 'Фундамент' },
  column: { az: 'Sütun', en: 'Column', ru: 'Колонна' },
  wall: { az: 'Divar', en: 'Wall', ru: 'Стена' },
  stairs: { az: 'Pilləkən', en: 'Stairs', ru: 'Лестница' },
  curb: { az: 'Bordür', en: 'Kerb', ru: 'Бордюр' },
  tube: { az: 'Boşluqlu', en: 'Hollow', ru: 'С пустотой' },
  // Tool tabs
  calculator: { az: 'Kalkulyator', en: 'Calculator', ru: 'Калькулятор' },
  converter: { az: 'Konverter', en: 'Converter', ru: 'Конвертер' },
  // Hero
  heroTitle: { az: 'Beton Kalkulyatoru', en: 'Concrete Calculator', ru: 'Калькулятор бетона' },
  heroSub: {
    az: 'Layihəniz üçün beton həcmi, material, armatur və mikser hesablaması — pulsuz',
    en: 'Concrete volume, material, rebar and mixer truck calculation for your project — free',
    ru: 'Расчет объема бетона, материалов, арматуры и миксеров для вашего проекта — бесплатно',
  },
  // Mode switcher
  simpleTitle: { az: 'Sadə', en: 'Simple', ru: 'Простой' },
  simpleDesc: { az: 'Həcm, mikser və kisə sayı', en: 'Volume, mixer trucks and bag count', ru: 'Объем, миксеры и число мешков' },
  proTitle: { az: 'Pro', en: 'Pro', ru: 'Pro' },
  proDesc: { az: 'Ətraflı material hesablaması', en: 'Detailed material calculation', ru: 'Подробный расчет материалов' },
  // Form
  gradeHeading: { az: 'Beton Markası', en: 'Concrete Grade', ru: 'Марка бетона' },
  enterDims: { az: 'Ölçüləri daxil edin', en: 'Enter the dimensions', ru: 'Введите размеры' },
  calcParams: { az: 'Hesablama Parametrləri', en: 'Calculation Parameters', ru: 'Параметры расчета' },
  extraOptions: { az: 'Əlavə Seçimlər', en: 'Additional Options', ru: 'Дополнительные параметры' },
  wasteLabel: { az: 'Material itkisi (%)', en: 'Material waste allowance (%)', ru: 'Запас на потери (%)' },
  wasteHint: {
    az: 'Tökülmə, nasos və mikserdə qalan qalıq, səthin qeyri-bərabərliyi üçün ehtiyat payı. Tövsiyə: 5–10%.',
    en: 'Allowance for spillage, residue left in the pump and mixer, and surface unevenness. Recommended: 5–10%.',
    ru: 'Запас на проливы, остатки в насосе и миксере, неровности поверхности. Рекомендуется: 5–10%.',
  },
  mixerCapacity: { az: 'Mikser tutumu (m³)', en: 'Mixer truck capacity (m³)', ru: 'Объем миксера (м³)' },
  rebarCalc: { az: 'Armatur hesabla', en: 'Calculate rebar', ru: 'Рассчитать арматуру' },
  diameterMm: { az: 'Diametr (mm)', en: 'Diameter (mm)', ru: 'Диаметр (мм)' },
  spacingMm: { az: 'Aralıq (mm)', en: 'Spacing (mm)', ru: 'Шаг (мм)' },
  meshCalc: { az: 'Tor (mesh) hesabla', en: 'Calculate mesh', ru: 'Рассчитать сетку' },
  meshTypeLabel: { az: 'Tor növü', en: 'Mesh type', ru: 'Тип сетки' },
  formworkCalc: { az: 'Qəlib (formwork) hesabla', en: 'Calculate formwork', ru: 'Рассчитать опалубку' },
  seeResults: { az: 'Nəticələrə bax', en: 'See results', ru: 'Смотреть результаты' },
  reset: { az: 'Sıfırla', en: 'Reset', ru: 'Сбросить' },
  // Field labels
  length: { az: 'Uzunluq', en: 'Length', ru: 'Длина' },
  width: { az: 'En', en: 'Width', ru: 'Ширина' },
  thickness: { az: 'Qalınlıq', en: 'Thickness', ru: 'Толщина' },
  depthLabel: { az: 'Dərinlik', en: 'Depth', ru: 'Глубина' },
  quantity: { az: 'Sayı', en: 'Quantity', ru: 'Количество' },
  height: { az: 'Hündürlük', en: 'Height', ru: 'Высота' },
  diameter: { az: 'Diametr', en: 'Diameter', ru: 'Диаметр' },
  stairsRunLabel: { az: 'Pilləkən uzunluğu', en: 'Stair length', ru: 'Длина лестницы' },
  stairsRiseLabel: { az: 'Pilləkən hündürlüyü', en: 'Stair rise', ru: 'Высота ступени' },
  platformDepth: { az: 'Platform qalınlığı', en: 'Platform thickness', ru: 'Толщина площадки' },
  stepCount: { az: 'Pillə sayı', en: 'Number of steps', ru: 'Число ступеней' },
  flagDepth: { az: 'Bayraq dərinliyi', en: 'Flag depth', ru: 'Глубина основания' },
  outerLength: { az: 'Xarici uzunluq', en: 'Outer length', ru: 'Внешняя длина' },
  outerWidth: { az: 'Xarici en', en: 'Outer width', ru: 'Внешняя ширина' },
  innerLength: { az: 'Daxili uzunluq', en: 'Inner length', ru: 'Внутренняя длина' },
  innerWidth: { az: 'Daxili en', en: 'Inner width', ru: 'Внутренняя ширина' },
  cm: { az: 'sm', en: 'cm', ru: 'см' },
  // Results
  emptyState: {
    az: 'Nəticələri görmək üçün yuxarıda ölçüləri daxil edin.',
    en: 'Enter the dimensions above to see the results.',
    ru: 'Чтобы увидеть результаты, введите размеры выше.',
  },
  liveCalc: { az: 'Canlı hesablama', en: 'Live calculation', ru: 'Расчет в реальном времени' },
  neededVolume: { az: 'Lazımi Beton Həcmi', en: 'Required Concrete Volume', ru: 'Необходимый объем бетона' },
  wasteIncluded: { az: 'itki daxil', en: 'waste included', ru: 'с учетом потерь' },
  mixerStat: { az: 'mikser', en: 'mixers', ru: 'миксеров' },
  bags50Stat: { az: '50kq kisə', en: '50kg bags', ru: 'мешков 50 кг' },
  tonsStat: { az: 'ton', en: 'tonnes', ru: 'тонн' },
  mix: { az: 'qarışıq', en: 'mix', ru: 'смесь' },
  volumeResults: { az: 'Həcm Nəticələri', en: 'Volume Results', ru: 'Результаты по объему' },
  m3Unit: { az: 'Kub metr (m³)', en: 'Cubic metre (m³)', ru: 'Кубический метр (м³)' },
  litreUnit: { az: 'Litr (L)', en: 'Litre (L)', ru: 'Литр (л)' },
  weightTons: { az: 'Çəki (ton)', en: 'Weight (tonnes)', ru: 'Вес (тонн)' },
  materialsNeeded: { az: 'Lazım Olan Materiallar', en: 'Required Materials', ru: 'Необходимые материалы' },
  cement: { az: 'Sement', en: 'Cement', ru: 'Цемент' },
  sand: { az: 'Qum', en: 'Sand', ru: 'Песок' },
  gravel: { az: 'Çınqıl', en: 'Gravel', ru: 'Щебень' },
  water: { az: 'Su', en: 'Water', ru: 'Вода' },
  kg: { az: 'kq', en: 'kg', ru: 'кг' },
  litr: { az: 'litr', en: 'L', ru: 'л' },
  pcs: { az: 'ədəd', en: 'pcs', ru: 'шт' },
  materialShares: { az: 'Material payları', en: 'Material shares', ru: 'Доли материалов' },
  bagCalc: { az: 'Kisə Hesablaması', en: 'Bag Calculation', ru: 'Расчет мешков' },
  cementBags: { az: 'Sement kisələri', en: 'Cement bags', ru: 'Мешки цемента' },
  rebarHeading: { az: 'Armatur Hesablaması', en: 'Rebar Calculation', ru: 'Расчет арматуры' },
  spacing: { az: 'Aralıq', en: 'Spacing', ru: 'Шаг' },
  barCount: { az: 'Çubuq sayı', en: 'Bar count', ru: 'Число стержней' },
  totalLength: { az: 'Ümumi uzunluq', en: 'Total length', ru: 'Общая длина' },
  totalWeight: { az: 'Ümumi çəki', en: 'Total weight', ru: 'Общий вес' },
  meshHeading: { az: 'Tor (Mesh) Hesablaması', en: 'Mesh Calculation', ru: 'Расчет сетки' },
  area: { az: 'Sahə', en: 'Area', ru: 'Площадь' },
  sheetCount: { az: 'Vərəq sayı', en: 'Sheet count', ru: 'Число листов' },
  formworkHeading: { az: 'Qəlib (Formwork)', en: 'Formwork', ru: 'Опалубка' },
  formworkArea: { az: 'Qəlib sahəsi', en: 'Formwork area', ru: 'Площадь опалубки' },
  plywoodSheet: { az: 'Faner vərəqi (1.2×2.4m)', en: 'Plywood sheets (1.2×2.4m)', ru: 'Листы фанеры (1.2×2.4м)' },
  mixerPlanning: { az: 'Mikser Planlaşdırması', en: 'Mixer Truck Planning', ru: 'Планирование миксеров' },
  more: { az: 'daha', en: 'more', ru: 'ещё' },
  mixersRequired: { az: 'mikser tələb olunur', en: 'mixer trucks required', ru: 'миксеров потребуется' },
  mixerCapShort: { az: 'Mikser tutumu', en: 'Mixer truck capacity', ru: 'Объем миксера' },
  lastTruckLoad: { az: 'Son mikser yükü', en: 'Last truck load', ru: 'Загрузка последнего миксера' },
  note: { az: 'Qeyd:', en: 'Note:', ru: 'Примечание:' },
  noteSimple: {
    az: 'Nəticələr planlaşdırma üçün təxmini dəyərlərdir. Dəqiq hesablama və qiymət üçün bizimlə əlaqə saxlayın.',
    en: 'The results are approximate planning values. Contact us for an exact calculation and price.',
    ru: 'Результаты являются ориентировочными значениями для планирования. Для точного расчета и цены свяжитесь с нами.',
  },
  notePro: {
    az: 'Bu hesablamalar planlaşdırma üçün təxmini dəyərlərdir (qarışıq nisbəti markaya görə nominal götürülüb). Dəqiq hesablama və qiymət təklifi üçün bizimlə əlaqə saxlayın.',
    en: 'These calculations are approximate planning values (the mix ratio is taken as nominal for the grade). Contact us for an exact calculation and a price quote.',
    ru: 'Эти расчеты являются ориентировочными значениями для планирования (пропорции смеси приняты номинально для марки). Для точного расчета и ценового предложения свяжитесь с нами.',
  },
  // Price tool
  costCalc: { az: 'Xərci hesabla', en: 'Calculate the cost', ru: 'Рассчитать стоимость' },
  optional: { az: 'istəyə bağlı', en: 'optional', ru: 'по желанию' },
  priceHintPre: { az: '', en: 'Enter the price you know for ', ru: 'Укажите известную вам цену для ' },
  priceHintPost: {
    az: ' markası üçün bildiyiniz qiyməti yazın — ümumi xərc dərhal görünsün.',
    en: ' — the total cost appears instantly.',
    ru: ' — общая стоимость появится сразу.',
  },
  priceAria: { az: 'Beton qiyməti (AZN/m³)', en: 'Concrete price (AZN/m³)', ru: 'Цена бетона (AZN/м³)' },
  estCost: { az: 'Təxmini Beton Xərci', en: 'Estimated Concrete Cost', ru: 'Примерная стоимость бетона' },
  userCostSub: { az: '— daxil etdiyiniz qiymətlə', en: '— at the price you entered', ru: '— по указанной вами цене' },
  // Quote CTA
  quoteTitle: {
    az: 'Bu layihə üçün dəqiq qiymət lazımdır?',
    en: 'Need an exact price for this project?',
    ru: 'Нужна точная цена для этого проекта?',
  },
  quoteText: {
    az: 'Hesablamanız hazırdır — bir kliklə bizə göndərin, qısa zamanda təklif verək.',
    en: 'Your calculation is ready — send it to us in one click and we will quote you shortly.',
    ru: 'Ваш расчет готов — отправьте его нам в один клик, и мы быстро подготовим предложение.',
  },
  waQuote: { az: 'WhatsApp ilə qiymət al', en: 'Get a quote on WhatsApp', ru: 'Узнать цену в WhatsApp' },
  call: { az: 'Zəng et', en: 'Call', ru: 'Позвонить' },
  // Converter
  unitConverter: { az: 'Vahid Konverteri', en: 'Unit Converter', ru: 'Конвертер единиц' },
  converterDesc: { az: 'Həcm vahidlərini asanlıqla çevirin', en: 'Convert volume units with ease', ru: 'Легко конвертируйте единицы объема' },
  enterValue: { az: 'Dəyər daxil edin', en: 'Enter a value', ru: 'Введите значение' },
  resultPh: { az: 'Nəticə', en: 'Result', ru: 'Результат' },
  quickRef: { az: 'Tez İstinad Cədvəli', en: 'Quick Reference Table', ru: 'Справочная таблица' },
  unit: { az: 'Vahid', en: 'Unit', ru: 'Единица' },
  // Info cards
  helpNeeded: { az: 'Kömək lazımdır?', en: 'Need help?', ru: 'Нужна помощь?' },
  helpText: {
    az: 'Layihəniz üçün dəqiq hesablama və məsləhət üçün mütəxəssislərimizlə əlaqə saxlayın.',
    en: 'Contact our specialists for an exact calculation and advice for your project.',
    ru: 'Свяжитесь с нашими специалистами для точного расчета и консультации по вашему проекту.',
  },
  delivery: { az: 'Çatdırılma', en: 'Delivery', ru: 'Доставка' },
  deliveryText: {
    az: 'Novxanı Beton olaraq bütün Bakı və Abşeron ərazisində çatdırılma xidməti təklif edirik.',
    en: 'As Novxani Beton, we offer delivery across all of Baku and Absheron.',
    ru: 'Компания Novxani Beton предлагает доставку по всей территории Баку и Абшерона.',
  },
  faqSubtitle: { az: 'Hesablama haqqında', en: 'About the calculation', ru: 'О расчете' },
};

/* Pre-filled WhatsApp enquiry text per locale (az byte-identical). */
const WA_CALC_MSG = {
  az: (grade, cls, vol, trucks) =>
    `Salam! Saytın kalkulyatorunda hesablama apardım:\n• Marka: ${grade} (${cls})\n• Həcm: ${vol} m³\n• Mikser: ${trucks} ədəd\nZəhmət olmasa qiymət təklifi göndərəsiniz.`,
  en: (grade, cls, vol, trucks) =>
    `Hello! I made a calculation with the calculator on your website:\n• Grade: ${grade} (${cls})\n• Volume: ${vol} m³\n• Mixer trucks: ${trucks}\nPlease send me a price quote.`,
  ru: (grade, cls, vol, trucks) =>
    `Здравствуйте! Я сделал расчет в калькуляторе на сайте:\n• Марка: ${grade} (${cls})\n• Объем: ${vol} м³\n• Миксеров: ${trucks}\nПожалуйста, отправьте ценовое предложение.`,
};

/* CtaBand props — passed as {az,en,ru} objects; CtaBand t()'s them itself. */
const CTA_BAND = {
  title: {
    az: 'Hesabladınız? İndi qiymət təklifi alın',
    en: 'Done calculating? Get a price quote now',
    ru: 'Рассчитали? Получите ценовое предложение',
  },
  text: {
    az: 'Hesabladığınız həcmi və ünvanı göndərin — marka və çatdırılmaya uyğun fərdi təklif hazırlayaq.',
    en: 'Send us the calculated volume and your address — we will prepare a personalised offer for the grade and delivery.',
    ru: 'Отправьте рассчитанный объем и адрес — мы подготовим индивидуальное предложение с учетом марки и доставки.',
  },
  whatsappText: {
    az: 'Salam! Kalkulyatorla hesabladığım beton həcmi üçün qiymət təklifi almaq istəyirəm.',
    en: 'Hello! I would like a price quote for the concrete volume I calculated with the calculator.',
    ru: 'Здравствуйте! Хочу получить ценовое предложение по объему бетона, рассчитанному в калькуляторе.',
  },
};

/* Volume + surface + formwork area for a given shape, all in SI (metres / m³).
   Depth-type inputs are entered in sm (cm), length-type inputs in m. */
function computeGeometry(tab, v) {
  const toMeters = (val) => parseFloat(val) / 100; // sm → m
  const toLen = (val) => parseFloat(val); // m
  // Quantity fields hold raw strings so the user can clear them while typing;
  // an empty/invalid value counts as 1.
  const qty = (val) => Math.max(1, parseInt(val, 10) || 1);

  let volumeM3 = 0;
  let surfaceArea = 0;
  let formworkArea = 0;

  switch (tab) {
    case 'slab': {
      const L = toLen(v.slabLength), W = toLen(v.slabWidth), D = toMeters(v.slabDepth);
      volumeM3 = L * W * D * qty(v.slabQuantity);
      surfaceArea = L * W * qty(v.slabQuantity);
      formworkArea = 2 * (L + W) * D * qty(v.slabQuantity);
      break;
    }
    case 'footing': {
      const L = toLen(v.footingLength), W = toLen(v.footingWidth), D = toMeters(v.footingDepth);
      volumeM3 = L * W * D * qty(v.footingQuantity);
      surfaceArea = L * W * qty(v.footingQuantity);
      formworkArea = 2 * (L + W) * D * qty(v.footingQuantity);
      break;
    }
    case 'column': {
      const r = toMeters(v.columnDiameter) / 2, H = toLen(v.columnHeight);
      volumeM3 = Math.PI * r * r * H * qty(v.columnQuantity);
      surfaceArea = Math.PI * r * r * qty(v.columnQuantity);
      formworkArea = 2 * Math.PI * r * H * qty(v.columnQuantity);
      break;
    }
    case 'wall': {
      const L = toLen(v.wallLength), H = toLen(v.wallHeight), T = toMeters(v.wallThickness);
      volumeM3 = L * H * T;
      surfaceArea = L * H * 2;
      formworkArea = surfaceArea;
      break;
    }
    case 'stairs': {
      const run = toLen(v.stairsRun), rise = toMeters(v.stairsRise), W = toLen(v.stairsWidth);
      const plat = toMeters(v.stairsPlatformDepth), steps = parseInt(v.stairsStepCount) || 0;
      volumeM3 = (run * rise * W * steps) / 2 + run * W * plat;
      surfaceArea = run * W + run * steps * W;
      formworkArea = surfaceArea * 1.5;
      break;
    }
    case 'curb': {
      const L = toLen(v.curbLength), W = toMeters(v.curbWidth), H = toMeters(v.curbHeight), F = toMeters(v.curbFlagDepth);
      volumeM3 = (L * W * H + L * W * F) * qty(v.curbQuantity);
      surfaceArea = L * W * qty(v.curbQuantity);
      formworkArea = (2 * H * L + 2 * W * L) * qty(v.curbQuantity);
      break;
    }
    case 'tube': {
      const oL = toLen(v.tubeOuterLength), oW = toLen(v.tubeOuterWidth);
      const iL = toLen(v.tubeInnerLength), iW = toLen(v.tubeInnerWidth), D = toMeters(v.tubeDepth);
      volumeM3 = oL * oW * D - iL * iW * D;
      surfaceArea = oL * oW;
      formworkArea = 2 * (oL + oW + iL + iW) * D;
      break;
    }
    default:
      volumeM3 = 0;
  }

  if (!isFinite(volumeM3) || volumeM3 < 0) volumeM3 = 0;
  return { volumeM3, surfaceArea: Math.max(0, surfaceArea) || 0, formworkArea: Math.max(0, formworkArea) || 0 };
}

const Calculator = () => {
  const t = useT();
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState('slab');
  const [activeToolTab, setActiveToolTab] = useState('calculator');
  const [mode, setMode] = useState('simple');

  // Dimension state (kept flat so existing inputs/CSS are unchanged)
  const [slabLength, setSlabLength] = useState('');
  const [slabWidth, setSlabWidth] = useState('');
  const [slabDepth, setSlabDepth] = useState('');
  const [slabQuantity, setSlabQuantity] = useState(1);

  const [columnDiameter, setColumnDiameter] = useState('');
  const [columnHeight, setColumnHeight] = useState('');
  const [columnQuantity, setColumnQuantity] = useState(1);

  const [stairsRun, setStairsRun] = useState('');
  const [stairsRise, setStairsRise] = useState('');
  const [stairsWidth, setStairsWidth] = useState('');
  const [stairsPlatformDepth, setStairsPlatformDepth] = useState('');
  const [stairsStepCount, setStairsStepCount] = useState('');

  const [curbLength, setCurbLength] = useState('');
  const [curbWidth, setCurbWidth] = useState('');
  const [curbHeight, setCurbHeight] = useState('');
  const [curbFlagDepth, setCurbFlagDepth] = useState('');
  const [curbQuantity, setCurbQuantity] = useState(1);

  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [wallThickness, setWallThickness] = useState('');

  const [footingLength, setFootingLength] = useState('');
  const [footingWidth, setFootingWidth] = useState('');
  const [footingDepth, setFootingDepth] = useState('');
  const [footingQuantity, setFootingQuantity] = useState(1);

  const [tubeOuterLength, setTubeOuterLength] = useState('');
  const [tubeOuterWidth, setTubeOuterWidth] = useState('');
  const [tubeInnerLength, setTubeInnerLength] = useState('');
  const [tubeInnerWidth, setTubeInnerWidth] = useState('');
  const [tubeDepth, setTubeDepth] = useState('');

  // Advanced options — preselect grade from ?grade=Mxxx (e.g. Products page CTA)
  const [searchParams] = useSearchParams();
  const gradeParam = searchParams.get('grade');
  const [concreteGrade, setConcreteGrade] = useState(
    CONCRETE_GRADES.some((g) => g.id === gradeParam) ? gradeParam : 'M300'
  );
  const [wastePct, setWastePct] = useState(5); // material waste allowance %
  const [rebarEnabled, setRebarEnabled] = useState(true);
  const [rebarSpacing, setRebarSpacing] = useState(150);
  const [rebarDiameter, setRebarDiameter] = useState(12);
  const [meshEnabled, setMeshEnabled] = useState(false);
  const [meshType, setMeshType] = useState('6x6');
  // Optional, user-supplied price — empty by default so the site itself
  // publishes no pricing. Filled in only if the visitor knows a price.
  const [userPrice, setUserPrice] = useState('');
  const [includeFormwork, setIncludeFormwork] = useState(true);
  const [truckCapacity, setTruckCapacity] = useState(8);

  // Unit converter
  const [converterValue, setConverterValue] = useState('');
  const [converterFrom, setConverterFrom] = useState('m3');
  const [converterTo, setConverterTo] = useState('l');

  const rebarDiameters = [8, 10, 12, 14, 16, 20, 25, 32];
  const meshTypes = [
    { id: '4x4', name: '4x4 (100x100mm)', weight: 1.54 },
    { id: '6x6', name: '6x6 (150x150mm)', weight: 2.05 },
    { id: '8x8', name: '8x8 (200x200mm)', weight: 2.47 },
  ];
  const unitConversions = {
    m3: { name: TXT.m3Unit, factor: 1 },
    l: { name: TXT.litreUnit, factor: 1000 },
  };

  const dims = {
    slabLength, slabWidth, slabDepth, slabQuantity,
    columnDiameter, columnHeight, columnQuantity,
    stairsRun, stairsRise, stairsWidth, stairsPlatformDepth, stairsStepCount,
    curbLength, curbWidth, curbHeight, curbFlagDepth, curbQuantity,
    wallLength, wallHeight, wallThickness,
    footingLength, footingWidth, footingDepth, footingQuantity,
    tubeOuterLength, tubeOuterWidth, tubeInnerLength, tubeInnerWidth, tubeDepth,
  };

  // ---- Simple ↔ Pro isolation ----
  // Each mode keeps its own independent dimensions/results. Switching modes
  // stashes the current form and restores the other mode's last state
  // (empty on its first visit), so calculations never leak across modes.
  const [otherModeDims, setOtherModeDims] = useState(null);

  const applyDims = (d) => {
    setActiveTab(d.activeTab || 'slab');
    setSlabLength(d.slabLength ?? ''); setSlabWidth(d.slabWidth ?? ''); setSlabDepth(d.slabDepth ?? ''); setSlabQuantity(d.slabQuantity ?? 1);
    setColumnDiameter(d.columnDiameter ?? ''); setColumnHeight(d.columnHeight ?? ''); setColumnQuantity(d.columnQuantity ?? 1);
    setStairsRun(d.stairsRun ?? ''); setStairsRise(d.stairsRise ?? ''); setStairsWidth(d.stairsWidth ?? ''); setStairsPlatformDepth(d.stairsPlatformDepth ?? ''); setStairsStepCount(d.stairsStepCount ?? '');
    setCurbLength(d.curbLength ?? ''); setCurbWidth(d.curbWidth ?? ''); setCurbHeight(d.curbHeight ?? ''); setCurbFlagDepth(d.curbFlagDepth ?? ''); setCurbQuantity(d.curbQuantity ?? 1);
    setWallLength(d.wallLength ?? ''); setWallHeight(d.wallHeight ?? ''); setWallThickness(d.wallThickness ?? '');
    setFootingLength(d.footingLength ?? ''); setFootingWidth(d.footingWidth ?? ''); setFootingDepth(d.footingDepth ?? ''); setFootingQuantity(d.footingQuantity ?? 1);
    setTubeOuterLength(d.tubeOuterLength ?? ''); setTubeOuterWidth(d.tubeOuterWidth ?? ''); setTubeInnerLength(d.tubeInnerLength ?? ''); setTubeInnerWidth(d.tubeInnerWidth ?? ''); setTubeDepth(d.tubeDepth ?? '');
  };

  const switchMode = (next) => {
    if (next === mode) return;
    setOtherModeDims({ activeTab, ...dims });
    applyDims(otherModeDims || {});
    setMode(next);
  };

  // ---- Real-time results (recompute whenever any input changes) ----
  const results = useMemo(() => {
    const { volumeM3: rawVol, surfaceArea, formworkArea } = computeGeometry(activeTab, dims);
    if (rawVol <= 0) return null;

    const wasteNum = Math.max(0, parseFloat(wastePct) || 0);
    const waste = 1 + wasteNum / 100;
    const volumeM3 = rawVol * waste; // apply waste allowance to ordered volume

    const grade = getGrade(concreteGrade);
    const per = materialsPerM3(grade); // per 1 m³, grade-specific (see data/concreteGrades.js)

    const cement = volumeM3 * per.cementKg;
    const sandKg = volumeM3 * per.sandKg;
    const sandVol = volumeM3 * per.sandVol;
    const gravelKg = volumeM3 * per.gravelKg;
    const gravelVol = volumeM3 * per.gravelVol;
    const water = volumeM3 * per.waterL;

    const bags50kg = Math.ceil(cement / 50);
    const bags40kg = Math.ceil(cement / 40);
    const bags25kg = Math.ceil(cement / 25);

    const volumeL = volumeM3 * 1000;

    const concreteWeight = volumeM3 * DENSITY.concrete; // kg
    const concreteWeightTons = concreteWeight / 1000;

    // Material mass breakdown (for the chart)
    const breakdownTotal = cement + sandKg + gravelKg + water;
    // Calm monochrome steel scale (avoids the "too many colors" clutter)
    const breakdown = [
      { key: 'cement', label: TXT.cement, kg: cement, color: '#3f70d6' },
      { key: 'gravel', label: TXT.gravel, kg: gravelKg, color: '#6f9bea' },
      { key: 'sand', label: TXT.sand, kg: sandKg, color: '#a9c3f2' },
      { key: 'water', label: TXT.water, kg: water, color: '#d4e2fa' },
    ].map((m) => ({ ...m, pct: (m.kg / breakdownTotal) * 100 }));

    // Rebar
    let rebarLength = 0, rebarWeight = 0, rebarCount = 0;
    const spacingMm = parseInt(rebarSpacing, 10) || 150;
    if (rebarEnabled && surfaceArea > 0) {
      const spacingM = spacingMm / 1000;
      const side = Math.sqrt(surfaceArea);
      const barsPerDir = Math.ceil(side / spacingM) + 1;
      rebarCount = barsPerDir * 2;
      rebarLength = rebarCount * side;
      const wPerM = Math.PI * Math.pow(rebarDiameter / 2000, 2) * 7850; // steel 7850 kg/m³
      rebarWeight = rebarLength * wPerM;
    }

    // Mesh
    let meshArea = 0, meshWeight = 0, meshSheets = 0;
    if (meshEnabled && surfaceArea > 0) {
      meshArea = surfaceArea * 1.1;
      const info = meshTypes.find((m) => m.id === meshType);
      meshWeight = meshArea * (info?.weight || 2.05);
      meshSheets = Math.ceil(meshArea / 5.8);
    }

    const formworkSheets = includeFormwork ? Math.ceil(formworkArea / 2.88) : 0;

    const capNum = parseFloat(truckCapacity);
    const cap = capNum > 0 ? capNum : 8;
    const trucksNeeded = Math.ceil(volumeM3 / cap);
    const lastTruckLoad = volumeM3 % cap || cap;

    // Cost estimate only when the visitor typed their own price
    const priceNum = parseFloat(userPrice);
    const estCost = priceNum > 0 ? volumeM3 * priceNum : null;

    return {
      rawVol, volumeM3, waste: wasteNum, ratio: ratioLabel(grade), gradeStrength: grade.strength, gradeClass: grade.bClass,
      volumeM3s: volumeM3.toFixed(2), volumeL: volumeL.toFixed(0),
      concreteWeight: concreteWeight.toFixed(0), concreteWeightTons: concreteWeightTons.toFixed(2),
      cement: cement.toFixed(0), sand: sandVol.toFixed(2), sandKg: sandKg.toFixed(0), gravel: gravelVol.toFixed(2), gravelKg: gravelKg.toFixed(0), water: water.toFixed(0),
      breakdown,
      bags50kg, bags40kg, bags25kg,
      rebarEnabled, rebarLength: rebarLength.toFixed(1), rebarWeight: rebarWeight.toFixed(1), rebarCount, rebarDiameter, rebarSpacing: spacingMm,
      meshEnabled, meshArea: meshArea.toFixed(2), meshWeight: meshWeight.toFixed(1), meshSheets, meshType,
      includeFormwork, formworkArea: formworkArea.toFixed(2), formworkSheets,
      trucksNeeded, truckCapacity: cap, lastTruckLoad: lastTruckLoad.toFixed(2),
      estCost: estCost !== null ? estCost.toFixed(0) : null, userPriceNum: priceNum,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, concreteGrade, wastePct, rebarEnabled, rebarSpacing, rebarDiameter,
      meshEnabled, meshType, userPrice, includeFormwork, truckCapacity,
      slabLength, slabWidth, slabDepth, slabQuantity,
      columnDiameter, columnHeight, columnQuantity,
      stairsRun, stairsRise, stairsWidth, stairsPlatformDepth, stairsStepCount,
      curbLength, curbWidth, curbHeight, curbFlagDepth, curbQuantity,
      wallLength, wallHeight, wallThickness,
      footingLength, footingWidth, footingDepth, footingQuantity,
      tubeOuterLength, tubeOuterWidth, tubeInnerLength, tubeInnerWidth, tubeDepth]);

  // ── Analytics: calculator engagement funnel (fired once each) ──
  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const onCalcInteract = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('calculator_start', { page_path: '/calculator' });
  };
  useEffect(() => {
    if (results && !completedRef.current) {
      completedRef.current = true;
      trackEvent('calculator_complete', {
        page_path: '/calculator',
        concrete_grade: concreteGrade,
        calculated_volume: parseFloat(results.volumeM3s),
      });
    }
  }, [results, concreteGrade]);

  const converterResult = useMemo(() => {
    const value = parseFloat(converterValue);
    if (isNaN(value)) return null;
    const inM3 = value / unitConversions[converterFrom].factor;
    return (inM3 * unitConversions[converterTo].factor).toFixed(4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [converterValue, converterFrom, converterTo]);

  const resetForm = () => {
    setSlabLength(''); setSlabWidth(''); setSlabDepth(''); setSlabQuantity(1);
    setColumnDiameter(''); setColumnHeight(''); setColumnQuantity(1);
    setStairsRun(''); setStairsRise(''); setStairsWidth(''); setStairsPlatformDepth(''); setStairsStepCount('');
    setCurbLength(''); setCurbWidth(''); setCurbHeight(''); setCurbFlagDepth(''); setCurbQuantity(1);
    setWallLength(''); setWallHeight(''); setWallThickness('');
    setFootingLength(''); setFootingWidth(''); setFootingDepth(''); setFootingQuantity(1);
    setTubeOuterLength(''); setTubeOuterWidth(''); setTubeInnerLength(''); setTubeInnerWidth(''); setTubeDepth('');
  };

  const scrollToResults = () => {
    const el = document.getElementById('calc-results');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ---- Icons (inline SVG — real icons, no emoji) ----
  const icons = {
    slab: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M5 14V12M9 14V11M13 14V12M17 14V11M19 14V12"/></svg>),
    column: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="5" ry="2"/><ellipse cx="12" cy="19" rx="5" ry="2"/><path d="M7 5v14M17 5v14"/></svg>),
    wall: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="1"/><path d="M2 9h20M2 14h20M7 4v5M12 9v5M17 14v6M7 14v6M12 4v5M17 4v5"/></svg>),
    stairs: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 20h4v-4h4v-4h4v-4h4"/><path d="M4 20V16h4v-4h4V8h4V4h4"/></svg>),
    curb: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20h20"/><rect x="4" y="12" width="16" height="8" rx="1"/><rect x="6" y="8" width="12" height="4" rx="1"/></svg>),
    tube: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>),
    footing: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="14" width="20" height="6" rx="1"/><rect x="6" y="8" width="12" height="6" rx="1"/><path d="M10 4h4v4h-4z"/></svg>),
    price: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>),
    building: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>),
    truck: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>),
    warning: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>),
    chart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>),
    cube: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>),
    ruler: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v1M3 10h18M3 14h18M6 4h2M10 4h2M14 4h2M6 20h2M10 20h2M14 20h2M3 6a2 2 0 012-2M3 18a2 2 0 002 2M21 18a2 2 0 01-2 2h-2M3 6v12M21 6v12"/></svg>),
    triangle: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18L12 4z"/><path d="M12 4v16M3 20l9-8"/></svg>),
    bricks: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="6" rx="1"/><rect x="2" y="14" width="20" height="6" rx="1"/><path d="M8 4v6M16 4v6M12 14v6"/></svg>),
    rebar: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M4 20l16-16"/><circle cx="12" cy="12" r="2"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/></svg>),
    mesh: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>),
    weight: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h12M6 6h12M12 6v12"/><path d="M8 6a4 4 0 018 0"/><rect x="4" y="16" width="4" height="4" rx="1"/><rect x="16" y="16" width="4" height="4" rx="1"/></svg>),
    formwork: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>),
    convert: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>),
    calculator: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h8"/></svg>),
    bag: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>),
  };

  // WhatsApp price-quote link — the calculated volume/grade is pre-filled so
  // every enquiry arrives as a ready lead. No prices are shown on the site.
  const waMsg = WA_CALC_MSG[locale] || WA_CALC_MSG.az;
  const waLink = results
    ? `https://wa.me/994503260343?text=${encodeURIComponent(
        waMsg(concreteGrade, results.gradeClass, results.volumeM3s, results.trucksNeeded)
      )}`
    : '';

  // One self-contained "price in → cost out" box shown INSIDE the results,
  // so the input form stays clean (dimensions → grade → results).
  const priceTool = results && (
    <div className="price-input-card price-inline">
      <div className="price-input-head">
        <span className="price-input-icon">{icons.price}</span>
        <div className="price-input-titles">
          <h4>{t(TXT.costCalc)} <span className="optional-tag">{t(TXT.optional)}</span></h4>
          <p>{t(TXT.priceHintPre)}{concreteGrade}{t(TXT.priceHintPost)}</p>
        </div>
      </div>
      <div className="price-input-row">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={userPrice}
          onChange={(e) => setUserPrice(e.target.value)}
          placeholder="0"
          aria-label={t(TXT.priceAria)}
        />
        <span className="price-unit">AZN / m³</span>
      </div>
      {results.estCost && (
        <div className="user-cost-card">
          <span className="user-cost-label">{t(TXT.estCost)}</span>
          <span className="user-cost-value">{results.estCost}<small> AZN</small></span>
          <span className="user-cost-sub">{results.volumeM3s} m³ × {results.userPriceNum} AZN/m³ {t(TXT.userCostSub)}</span>
        </div>
      )}
    </div>
  );

  const quoteCta = results && (
    <div className="quote-cta">
      <div className="quote-cta-text">
        <strong>{t(TXT.quoteTitle)}</strong>
        <span>{t(TXT.quoteText)}</span>
      </div>
      <div className="quote-cta-actions">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-wa--light">
          <MessageCircle size={18} aria-hidden="true" />
          {t(TXT.waQuote)}
        </a>
        <a href="tel:+994506209584" className="btn-call">{t(TXT.call)}</a>
      </div>
    </div>
  );

  const tabs = [
    { id: 'slab', name: TXT.slab, icon: icons.slab },
    { id: 'footing', name: TXT.footing, icon: icons.footing },
    { id: 'column', name: TXT.column, icon: icons.column },
    { id: 'wall', name: TXT.wall, icon: icons.wall },
    { id: 'stairs', name: TXT.stairs, icon: icons.stairs },
    { id: 'curb', name: TXT.curb, icon: icons.curb },
    { id: 'tube', name: TXT.tube, icon: icons.tube },
  ];
  const toolTabs = [
    { id: 'calculator', name: TXT.calculator, icon: icons.calculator },
    { id: 'converter', name: TXT.converter, icon: icons.convert },
  ];

  const num = (val, set, opts = {}) => (
    <input
      type="number"
      inputMode="decimal"
      min="0"
      value={val}
      onChange={(e) => set(e.target.value)}
      placeholder="0"
      {...opts}
    />
  );

  const renderFormFields = () => {
    const lengthUnit = 'm';
    const depthUnit = t(TXT.cm);
    switch (activeTab) {
      case 'slab':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.length)} ({lengthUnit})</label>{num(slabLength, setSlabLength)}</div>
              <div className="form-group"><label>{t(TXT.width)} ({lengthUnit})</label>{num(slabWidth, setSlabWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.thickness)} ({depthUnit})</label>{num(slabDepth, setSlabDepth)}</div>
              <div className="form-group"><label>{t(TXT.quantity)}</label><input type="number" min="1" value={slabQuantity} onChange={(e) => setSlabQuantity(e.target.value)} /></div>
            </div>
          </>
        );
      case 'footing':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.length)} ({lengthUnit})</label>{num(footingLength, setFootingLength)}</div>
              <div className="form-group"><label>{t(TXT.width)} ({lengthUnit})</label>{num(footingWidth, setFootingWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.depthLabel)} ({depthUnit})</label>{num(footingDepth, setFootingDepth)}</div>
              <div className="form-group"><label>{t(TXT.quantity)}</label><input type="number" min="1" value={footingQuantity} onChange={(e) => setFootingQuantity(e.target.value)} /></div>
            </div>
          </>
        );
      case 'column':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.diameter)} ({depthUnit})</label>{num(columnDiameter, setColumnDiameter)}</div>
              <div className="form-group"><label>{t(TXT.height)} ({lengthUnit})</label>{num(columnHeight, setColumnHeight)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.quantity)}</label><input type="number" min="1" value={columnQuantity} onChange={(e) => setColumnQuantity(e.target.value)} /></div>
            </div>
          </>
        );
      case 'wall':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.length)} ({lengthUnit})</label>{num(wallLength, setWallLength)}</div>
              <div className="form-group"><label>{t(TXT.height)} ({lengthUnit})</label>{num(wallHeight, setWallHeight)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.thickness)} ({depthUnit})</label>{num(wallThickness, setWallThickness)}</div>
            </div>
          </>
        );
      case 'stairs':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.stairsRunLabel)} ({lengthUnit})</label>{num(stairsRun, setStairsRun)}</div>
              <div className="form-group"><label>{t(TXT.stairsRiseLabel)} ({depthUnit})</label>{num(stairsRise, setStairsRise)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.width)} ({lengthUnit})</label>{num(stairsWidth, setStairsWidth)}</div>
              <div className="form-group"><label>{t(TXT.platformDepth)} ({depthUnit})</label>{num(stairsPlatformDepth, setStairsPlatformDepth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.stepCount)}</label>{num(stairsStepCount, setStairsStepCount)}</div>
            </div>
          </>
        );
      case 'curb':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.length)} ({lengthUnit})</label>{num(curbLength, setCurbLength)}</div>
              <div className="form-group"><label>{t(TXT.width)} ({depthUnit})</label>{num(curbWidth, setCurbWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.height)} ({depthUnit})</label>{num(curbHeight, setCurbHeight)}</div>
              <div className="form-group"><label>{t(TXT.flagDepth)} ({depthUnit})</label>{num(curbFlagDepth, setCurbFlagDepth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.quantity)}</label><input type="number" min="1" value={curbQuantity} onChange={(e) => setCurbQuantity(e.target.value)} /></div>
            </div>
          </>
        );
      case 'tube':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.outerLength)} ({lengthUnit})</label>{num(tubeOuterLength, setTubeOuterLength)}</div>
              <div className="form-group"><label>{t(TXT.outerWidth)} ({lengthUnit})</label>{num(tubeOuterWidth, setTubeOuterWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.innerLength)} ({lengthUnit})</label>{num(tubeInnerLength, setTubeInnerLength)}</div>
              <div className="form-group"><label>{t(TXT.innerWidth)} ({lengthUnit})</label>{num(tubeInnerWidth, setTubeInnerWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>{t(TXT.depthLabel)} ({depthUnit})</label>{num(tubeDepth, setTubeDepth)}</div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="calculator-page" onChangeCapture={onCalcInteract}>
      <Seo page="calculator" />
      <div className="calculator-hero">
        <div className="calculator-hero-overlay"></div>
        <div className="container">
          <h1>{t(TXT.heroTitle)}</h1>
          <p>{t(TXT.heroSub)}</p>
        </div>
      </div>

      <div className="calculator-content">
        <div className="container">
          <Breadcrumbs current={t(TXT.calculator)} />
          <div className="tool-tabs">
            {toolTabs.map((tab) => (
              <button key={tab.id} className={`tool-tab ${activeToolTab === tab.id ? 'active' : ''}`} onClick={() => setActiveToolTab(tab.id)}>
                <span className="tool-tab-icon">{tab.icon}</span>
                {t(tab.name)}
              </button>
            ))}
          </div>

          {activeToolTab === 'calculator' ? (
            <div className="calculator-wrapper">
              <div className="mode-switcher">
                <button className={`mode-btn ${mode === 'simple' ? 'active' : ''}`} onClick={() => switchMode('simple')}>
                  <span className="mode-btn-icon">{icons.calculator}</span>
                  <span className="mode-btn-text">
                    <span className="mode-btn-title">{t(TXT.simpleTitle)}</span>
                    <span className="mode-btn-desc">{t(TXT.simpleDesc)}</span>
                  </span>
                </button>
                <button className={`mode-btn ${mode === 'pro' ? 'active' : ''}`} onClick={() => switchMode('pro')}>
                  <span className="mode-btn-icon">{icons.chart}</span>
                  <span className="mode-btn-text">
                    <span className="mode-btn-title">{t(TXT.proTitle)}</span>
                    <span className="mode-btn-desc">{t(TXT.proDesc)}</span>
                  </span>
                </button>
              </div>
              <div className="calculator-tabs">
                {tabs.map((tab) => (
                  <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                    <span className="tab-icon">{tab.icon}</span>
                    {t(tab.name)}
                  </button>
                ))}
              </div>

              <div className="calculator-form">
                <div className="form-section grade-first">
                  <h4>{t(TXT.gradeHeading)}</h4>
                  <select value={concreteGrade} onChange={(e) => setConcreteGrade(e.target.value)} className="form-select">
                    {CONCRETE_GRADES.map((g) => (
                      <option key={g.id} value={g.id}>{g.id} ({g.bClass}) – {t(g.name)}</option>
                    ))}
                  </select>
                </div>

                <h3>{t(TXT.enterDims)}</h3>
                {renderFormFields()}

                {mode === 'simple' ? (
                  <div className="advanced-options">
                    <h4>{t(TXT.calcParams)}</h4>
                    <div className="option-group pricing-options">
                      <div className="option-row">
                        <label>{t(TXT.wasteLabel)}</label>
                        <input type="number" value={wastePct} onChange={(e) => setWastePct(e.target.value)} min="0" max="30" />
                      </div>
                      <p className="option-hint">
                        {t(TXT.wasteHint)}
                      </p>
                      <div className="option-row">
                        <label><span className="option-icon">{icons.truck}</span> {t(TXT.mixerCapacity)}</label>
                        <input type="number" value={truckCapacity} onChange={(e) => setTruckCapacity(e.target.value)} min="1" max="15" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="advanced-options">
                    <h4>{t(TXT.extraOptions)}</h4>

                    <div className="option-group">
                      <label className="checkbox-label">
                        <input type="checkbox" checked={rebarEnabled} onChange={(e) => setRebarEnabled(e.target.checked)} />
                        <span className="option-icon">{icons.rebar}</span>
                        {t(TXT.rebarCalc)}
                      </label>
                      {rebarEnabled && (
                        <div className="option-details">
                          <div className="option-row">
                            <label>{t(TXT.diameterMm)}</label>
                            <select value={rebarDiameter} onChange={(e) => setRebarDiameter(parseInt(e.target.value))}>
                              {rebarDiameters.map((d) => <option key={d} value={d}>Ø{d}</option>)}
                            </select>
                          </div>
                          <div className="option-row">
                            <label>{t(TXT.spacingMm)}</label>
                            <input type="number" value={rebarSpacing} onChange={(e) => setRebarSpacing(e.target.value)} min="50" max="400" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="option-group">
                      <label className="checkbox-label">
                        <input type="checkbox" checked={meshEnabled} onChange={(e) => setMeshEnabled(e.target.checked)} />
                        <span className="option-icon">{icons.mesh}</span>
                        {t(TXT.meshCalc)}
                      </label>
                      {meshEnabled && (
                        <div className="option-details">
                          <div className="option-row">
                            <label>{t(TXT.meshTypeLabel)}</label>
                            <select value={meshType} onChange={(e) => setMeshType(e.target.value)}>
                              {meshTypes.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="option-group">
                      <label className="checkbox-label">
                        <input type="checkbox" checked={includeFormwork} onChange={(e) => setIncludeFormwork(e.target.checked)} />
                        <span className="option-icon">{icons.formwork}</span>
                        {t(TXT.formworkCalc)}
                      </label>
                    </div>

                    <div className="option-group pricing-options">
                      <div className="option-row">
                        <label>{t(TXT.wasteLabel)}</label>
                        <input type="number" value={wastePct} onChange={(e) => setWastePct(e.target.value)} min="0" max="30" />
                      </div>
                      <p className="option-hint">
                        {t(TXT.wasteHint)}
                      </p>
                      <div className="option-row">
                        <label><span className="option-icon">{icons.truck}</span> {t(TXT.mixerCapacity)}</label>
                        <input type="number" value={truckCapacity} onChange={(e) => setTruckCapacity(e.target.value)} min="1" max="15" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button className="btn-calculate" onClick={scrollToResults}>{t(TXT.seeResults)}</button>
                  <button className="btn-reset" onClick={resetForm}>{t(TXT.reset)}</button>
                </div>
              </div>

              <div id="calc-results">
                {!results ? (
                  <div className="calculator-empty">
                    <span className="empty-icon">{icons.calculator}</span>
                    <p>{t(TXT.emptyState)}</p>
                  </div>
                ) : (
                  <div className="calculator-results">
                    <div className="results-live-badge">● {t(TXT.liveCalc)}</div>

                    {mode === 'simple' ? (
                      /* ── SIMPLE MODE: quick volume answer ── */
                      <div className="simple-result">
                        <div className="simple-cost-card">
                          <span className="simple-cost-label">{t(TXT.neededVolume)}</span>
                          <span className="simple-cost-value">{results.volumeM3s}<small> m³</small></span>
                          <span className="simple-cost-sub">{concreteGrade} ({results.gradeClass}){results.waste > 0 ? ` · +${results.waste}% ${t(TXT.wasteIncluded)}` : ''}</span>
                        </div>
                        <div className="summary-stats simple-stats">
                          <div className="summary-stat"><span className="ss-value">{results.trucksNeeded}</span><span className="ss-label">{t(TXT.mixerStat)}</span></div>
                          <div className="summary-stat"><span className="ss-value">{results.bags50kg}</span><span className="ss-label">{t(TXT.bags50Stat)}</span></div>
                          <div className="summary-stat"><span className="ss-value">{results.concreteWeightTons}</span><span className="ss-label">{t(TXT.tonsStat)}</span></div>
                        </div>
                        {priceTool}
                        {quoteCta}
                        <div className="results-note">
                          <span className="note-icon">{icons.warning}</span>
                          <span><strong>{t(TXT.note)}</strong> {t(TXT.noteSimple)}</span>
                        </div>
                      </div>
                    ) : (
                      /* ── PRO MODE: full detail, no concrete weight ── */
                      <>
                        <div className="result-summary">
                          <div className="summary-primary">
                            <span className="summary-label">{t(TXT.neededVolume)}</span>
                            <span className="summary-value">{results.volumeM3s} <small>m³</small></span>
                            <span className="summary-sub">{concreteGrade} ({results.gradeClass}) · {t(TXT.mix)} {results.ratio}</span>
                          </div>
                          <div className="summary-stats">
                            <div className="summary-stat"><span className="ss-value">{results.concreteWeightTons}</span><span className="ss-label">{t(TXT.tonsStat)}</span></div>
                            <div className="summary-stat"><span className="ss-value">{results.trucksNeeded}</span><span className="ss-label">{t(TXT.mixerStat)}</span></div>
                            <div className="summary-stat"><span className="ss-value">{results.bags50kg}</span><span className="ss-label">{t(TXT.bags50Stat)}</span></div>
                          </div>
                        </div>

                        {priceTool}

                        <h3><span className="section-title-icon">{icons.chart}</span> {t(TXT.volumeResults)}</h3>
                        <div className="results-grid">
                          <div className="result-card primary">
                            <div className="result-icon">{icons.cube}</div>
                            <div className="result-info">
                              <span className="result-value">{results.volumeM3s}</span>
                              <span className="result-label">{t(TXT.m3Unit)}{results.waste > 0 ? ` · +${results.waste}% ${t(TXT.wasteIncluded)}` : ''}</span>
                            </div>
                          </div>
                          <div className="result-card">
                            <div className="result-icon">{icons.ruler}</div>
                            <div className="result-info">
                              <span className="result-value">{results.volumeL}</span>
                              <span className="result-label">{t(TXT.litreUnit)}</span>
                            </div>
                          </div>
                          <div className="result-card">
                            <div className="result-icon">{icons.weight}</div>
                            <div className="result-info">
                              <span className="result-value">{results.concreteWeightTons}</span>
                              <span className="result-label">{t(TXT.weightTons)}</span>
                            </div>
                          </div>
                        </div>

                        <h4><span className="section-title-icon">{icons.bricks}</span> {t(TXT.materialsNeeded)} <span className="grade-pill">{concreteGrade} · {results.ratio}</span></h4>
                        <div className="materials-grid">
                          <div className="material-item"><span className="material-name">{t(TXT.cement)} ({concreteGrade})</span><span className="material-value">{results.cement} {t(TXT.kg)}</span></div>
                          <div className="material-item"><span className="material-name">{t(TXT.sand)}</span><span className="material-value">{results.sand} m³ (~{results.sandKg} {t(TXT.kg)})</span></div>
                          <div className="material-item"><span className="material-name">{t(TXT.gravel)}</span><span className="material-value">{results.gravel} m³ (~{results.gravelKg} {t(TXT.kg)})</span></div>
                          <div className="material-item"><span className="material-name">{t(TXT.water)}</span><span className="material-value">{results.water} {t(TXT.litr)}</span></div>
                        </div>

                        <div className="breakdown">
                          <div className="breakdown-bar" role="img" aria-label={t(TXT.materialShares)}>
                            {results.breakdown.map((m) => (
                              <span key={m.key} className="breakdown-seg" style={{ width: `${m.pct}%`, background: m.color }} title={`${t(m.label)}: ${m.pct.toFixed(1)}%`} />
                            ))}
                          </div>
                          <div className="breakdown-legend">
                            {results.breakdown.map((m) => (
                              <span key={m.key} className="legend-item">
                                <span className="legend-dot" style={{ background: m.color }} />
                                {t(m.label)} <strong>{m.pct.toFixed(1)}%</strong>
                              </span>
                            ))}
                          </div>
                        </div>

                        <h4><span className="section-title-icon">{icons.bag}</span> {t(TXT.bagCalc)}</h4>
                        <div className="bags-section">
                          <div className="bags-group">
                            <h5>{t(TXT.cementBags)}</h5>
                            <div className="bags-grid">
                              <div className="bag-item"><span className="bag-size">50 {t(TXT.kg)}</span><span className="bag-count">{results.bags50kg} {t(TXT.pcs)}</span></div>
                              <div className="bag-item"><span className="bag-size">40 {t(TXT.kg)}</span><span className="bag-count">{results.bags40kg} {t(TXT.pcs)}</span></div>
                              <div className="bag-item"><span className="bag-size">25 {t(TXT.kg)}</span><span className="bag-count">{results.bags25kg} {t(TXT.pcs)}</span></div>
                            </div>
                          </div>
                        </div>

                        {results.rebarEnabled && (
                          <>
                            <h4><span className="section-title-icon">{icons.rebar}</span> {t(TXT.rebarHeading)}</h4>
                            <div className="rebar-results">
                              <div className="rebar-item"><span className="rebar-label">{t(TXT.diameter)}</span><span className="rebar-value">Ø{results.rebarDiameter} mm</span></div>
                              <div className="rebar-item"><span className="rebar-label">{t(TXT.spacing)}</span><span className="rebar-value">{results.rebarSpacing} mm</span></div>
                              <div className="rebar-item"><span className="rebar-label">{t(TXT.barCount)}</span><span className="rebar-value">{results.rebarCount} {t(TXT.pcs)}</span></div>
                              <div className="rebar-item"><span className="rebar-label">{t(TXT.totalLength)}</span><span className="rebar-value">{results.rebarLength} m</span></div>
                              <div className="rebar-item highlight"><span className="rebar-label">{t(TXT.totalWeight)}</span><span className="rebar-value">{results.rebarWeight} {t(TXT.kg)}</span></div>
                            </div>
                          </>
                        )}

                        {results.meshEnabled && (
                          <>
                            <h4><span className="section-title-icon">{icons.mesh}</span> {t(TXT.meshHeading)}</h4>
                            <div className="mesh-results">
                              <div className="mesh-item"><span className="mesh-label">{t(TXT.meshTypeLabel)}</span><span className="mesh-value">{results.meshType}</span></div>
                              <div className="mesh-item"><span className="mesh-label">{t(TXT.area)}</span><span className="mesh-value">{results.meshArea} m²</span></div>
                              <div className="mesh-item"><span className="mesh-label">{t(TXT.sheetCount)}</span><span className="mesh-value">{results.meshSheets} {t(TXT.pcs)}</span></div>
                              <div className="mesh-item highlight"><span className="mesh-label">{t(TXT.totalWeight)}</span><span className="mesh-value">{results.meshWeight} {t(TXT.kg)}</span></div>
                            </div>
                          </>
                        )}

                        {results.includeFormwork && (
                          <>
                            <h4><span className="section-title-icon">{icons.formwork}</span> {t(TXT.formworkHeading)}</h4>
                            <div className="formwork-results">
                              <div className="formwork-item"><span className="formwork-label">{t(TXT.formworkArea)}</span><span className="formwork-value">{results.formworkArea} m²</span></div>
                              <div className="formwork-item highlight"><span className="formwork-label">{t(TXT.plywoodSheet)}</span><span className="formwork-value">{results.formworkSheets} {t(TXT.pcs)}</span></div>
                            </div>
                          </>
                        )}

                        <h4><span className="section-title-icon">{icons.truck}</span> {t(TXT.mixerPlanning)}</h4>
                        <div className="truck-results">
                          <div className="truck-visual">
                            {[...Array(Math.min(results.trucksNeeded, 6))].map((_, i) => (
                              <div key={i} className={`truck-icon ${i === results.trucksNeeded - 1 ? 'partial' : ''}`}>
                                {icons.truck}
                                <span className="truck-load">{i === results.trucksNeeded - 1 ? results.lastTruckLoad : results.truckCapacity} m³</span>
                              </div>
                            ))}
                            {results.trucksNeeded > 6 && <span className="truck-more">+{results.trucksNeeded - 6} {t(TXT.more)}</span>}
                          </div>
                          <div className="truck-info">
                            <p><strong>{results.trucksNeeded}</strong> {t(TXT.mixersRequired)}</p>
                            <p>{t(TXT.mixerCapShort)}: <strong>{results.truckCapacity} m³</strong></p>
                            {results.trucksNeeded > 1 && <p>{t(TXT.lastTruckLoad)}: <strong>{results.lastTruckLoad} m³</strong></p>}
                          </div>
                        </div>

                        {quoteCta}

                        <div className="results-note">
                          <span className="note-icon">{icons.warning}</span>
                          <span><strong>{t(TXT.note)}</strong> {t(TXT.notePro)}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="converter-wrapper">
              <h3><span className="section-title-icon">{icons.convert}</span> {t(TXT.unitConverter)}</h3>
              <p className="converter-desc">{t(TXT.converterDesc)}</p>

              <div className="converter-form">
                <div className="converter-input-group">
                  <input type="number" value={converterValue} onChange={(e) => setConverterValue(e.target.value)} placeholder={t(TXT.enterValue)} className="converter-input" />
                  <select value={converterFrom} onChange={(e) => setConverterFrom(e.target.value)} className="converter-select">
                    {Object.entries(unitConversions).map(([key, val]) => <option key={key} value={key}>{t(val.name)}</option>)}
                  </select>
                </div>
                <div className="converter-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
                </div>
                <div className="converter-input-group">
                  <input type="text" value={converterResult || ''} readOnly placeholder={t(TXT.resultPh)} className="converter-input result" />
                  <select value={converterTo} onChange={(e) => setConverterTo(e.target.value)} className="converter-select">
                    {Object.entries(unitConversions).map(([key, val]) => <option key={key} value={key}>{t(val.name)}</option>)}
                  </select>
                </div>
              </div>

              <div className="converter-reference">
                <h4>{t(TXT.quickRef)}</h4>
                <table>
                  <thead><tr><th>{t(TXT.unit)}</th><th>1 m³ =</th></tr></thead>
                  <tbody>
                    {Object.entries(unitConversions).map(([key, val]) => (
                      <tr key={key}><td>{t(val.name)}</td><td>{val.factor.toFixed(4)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="calculator-info">
            <div className="info-card">
              <h4><span className="info-title-icon">{icons.building}</span> {t(TXT.gradeHeading)}</h4>
              <ul>
                {CONCRETE_GRADES.map((g) => (
                  <li key={g.id}><strong>{g.id}:</strong> {t(g.use)}</li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <h4><span className="info-title-icon">{icons.phone}</span> {t(TXT.helpNeeded)}</h4>
              <p>{t(TXT.helpText)}</p>
              <a href="tel:+994506209584" className="info-phone">+994 50 620 95 84</a>
            </div>
            <div className="info-card">
              <h4><span className="info-title-icon">{icons.truck}</span> {t(TXT.delivery)}</h4>
              <p>{t(TXT.deliveryText)}</p>
            </div>
          </div>

          <Faq items={CALC_FAQS.map((f) => ({ ...f, q: t(f.q), a: t(f.a) }))} subtitle={t(TXT.faqSubtitle)} />
        </div>
      </div>

      <CtaBand
        title={CTA_BAND.title}
        text={CTA_BAND.text}
        whatsappText={CTA_BAND.whatsappText}
      />
    </div>
  );
};

export default Calculator;
