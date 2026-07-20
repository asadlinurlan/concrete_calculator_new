import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    q: 'Kalkulyator nəyi hesablayır?',
    a: 'Seçdiyiniz forma və ölçülərə əsasən lazımi beton həcmini (m³), təxmini sement, qum və çınqıl miqdarını, armatur ehtiyacını və mikser sayını hesablayır. Vahid çevirici ilə m³-ü digər ölçü vahidlərinə də çevirə bilərsiniz.',
  },
  {
    q: '1 m³ beton neçə tondur?',
    a: 'Adi armaturlu beton təxminən 2,4 ton/m³-dür. Kalkulyator çəkini avtomatik hesablayır — nəticədə həm həcmi, həm də təxmini çəkini görürsünüz.',
  },
  {
    q: 'Bir mikserdə nə qədər beton gəlir?',
    a: 'Standart mikserlərin tutumu adətən 7–10 m³ aralığındadır. Kalkulyator layihəniz üçün lazımi mikser sayını avtomatik təklif edir.',
  },
  {
    q: 'Nəticələr nə dərəcədə dəqiqdir?',
    a: 'Hesablamalar nominal qarışıq əsasında təxmini planlaşdırma dəyərləridir və layihələndirmə üçün etibarlı istinad rolunu oynayır. Konstruktiv işlərdə yekun qarışıq dizaynı laboratoriya nəzarəti ilə dəqiqləşdirilir — bunun üçün bizimlə əlaqə saxlaya bilərsiniz.',
  },
];

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
    m3: { name: 'Kub metr (m³)', factor: 1 },
    l: { name: 'Litr (L)', factor: 1000 },
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
      { key: 'cement', label: 'Sement', kg: cement, color: '#3f70d6' },
      { key: 'gravel', label: 'Çınqıl', kg: gravelKg, color: '#6f9bea' },
      { key: 'sand', label: 'Qum', kg: sandKg, color: '#a9c3f2' },
      { key: 'water', label: 'Su', kg: water, color: '#d4e2fa' },
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
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>),
  };

  // WhatsApp price-quote link — the calculated volume/grade is pre-filled so
  // every enquiry arrives as a ready lead. No prices are shown on the site.
  const waLink = results
    ? `https://wa.me/994503260343?text=${encodeURIComponent(
        `Salam! Saytın kalkulyatorunda hesablama apardım:\n• Marka: ${concreteGrade} (${results.gradeClass})\n• Həcm: ${results.volumeM3s} m³\n• Mikser: ${results.trucksNeeded} ədəd\nZəhmət olmasa qiymət təklifi göndərəsiniz.`
      )}`
    : '';

  // One self-contained "price in → cost out" box shown INSIDE the results,
  // so the input form stays clean (dimensions → grade → results).
  const priceTool = results && (
    <div className="price-input-card price-inline">
      <div className="price-input-head">
        <span className="price-input-icon">{icons.price}</span>
        <div className="price-input-titles">
          <h4>Xərci hesabla <span className="optional-tag">istəyə bağlı</span></h4>
          <p>{concreteGrade} markası üçün bildiyiniz qiyməti yazın — ümumi xərc dərhal görünsün.</p>
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
          aria-label="Beton qiyməti (AZN/m³)"
        />
        <span className="price-unit">AZN / m³</span>
      </div>
      {results.estCost && (
        <div className="user-cost-card">
          <span className="user-cost-label">Təxmini Beton Xərci</span>
          <span className="user-cost-value">{results.estCost}<small> AZN</small></span>
          <span className="user-cost-sub">{results.volumeM3s} m³ × {results.userPriceNum} AZN/m³ — daxil etdiyiniz qiymətlə</span>
        </div>
      )}
    </div>
  );

  const quoteCta = results && (
    <div className="quote-cta">
      <div className="quote-cta-text">
        <strong>Bu layihə üçün dəqiq qiymət lazımdır?</strong>
        <span>Hesablamanız hazırdır — bir kliklə bizə göndərin, qısa zamanda təklif verək.</span>
      </div>
      <div className="quote-cta-actions">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          {icons.whatsapp} WhatsApp ilə qiymət al
        </a>
        <a href="tel:+994506209584" className="btn-call">Zəng et</a>
      </div>
    </div>
  );

  const tabs = [
    { id: 'slab', name: 'Plitə', icon: icons.slab },
    { id: 'footing', name: 'Təməl', icon: icons.footing },
    { id: 'column', name: 'Sütun', icon: icons.column },
    { id: 'wall', name: 'Divar', icon: icons.wall },
    { id: 'stairs', name: 'Pilləkən', icon: icons.stairs },
    { id: 'curb', name: 'Bordür', icon: icons.curb },
    { id: 'tube', name: 'Boşluqlu', icon: icons.tube },
  ];
  const toolTabs = [
    { id: 'calculator', name: 'Kalkulyator', icon: icons.calculator },
    { id: 'converter', name: 'Konverter', icon: icons.convert },
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
    const depthUnit = 'sm';
    switch (activeTab) {
      case 'slab':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>Uzunluq ({lengthUnit})</label>{num(slabLength, setSlabLength)}</div>
              <div className="form-group"><label>En ({lengthUnit})</label>{num(slabWidth, setSlabWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Qalınlıq ({depthUnit})</label>{num(slabDepth, setSlabDepth)}</div>
              <div className="form-group"><label>Sayı</label><input type="number" min="1" value={slabQuantity} onChange={(e) => setSlabQuantity(e.target.value)} /></div>
            </div>
          </>
        );
      case 'footing':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>Uzunluq ({lengthUnit})</label>{num(footingLength, setFootingLength)}</div>
              <div className="form-group"><label>En ({lengthUnit})</label>{num(footingWidth, setFootingWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Dərinlik ({depthUnit})</label>{num(footingDepth, setFootingDepth)}</div>
              <div className="form-group"><label>Sayı</label><input type="number" min="1" value={footingQuantity} onChange={(e) => setFootingQuantity(e.target.value)} /></div>
            </div>
          </>
        );
      case 'column':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>Diametr ({depthUnit})</label>{num(columnDiameter, setColumnDiameter)}</div>
              <div className="form-group"><label>Hündürlük ({lengthUnit})</label>{num(columnHeight, setColumnHeight)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Sayı</label><input type="number" min="1" value={columnQuantity} onChange={(e) => setColumnQuantity(e.target.value)} /></div>
            </div>
          </>
        );
      case 'wall':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>Uzunluq ({lengthUnit})</label>{num(wallLength, setWallLength)}</div>
              <div className="form-group"><label>Hündürlük ({lengthUnit})</label>{num(wallHeight, setWallHeight)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Qalınlıq ({depthUnit})</label>{num(wallThickness, setWallThickness)}</div>
            </div>
          </>
        );
      case 'stairs':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>Pilləkən uzunluğu ({lengthUnit})</label>{num(stairsRun, setStairsRun)}</div>
              <div className="form-group"><label>Pilləkən hündürlüyü ({depthUnit})</label>{num(stairsRise, setStairsRise)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>En ({lengthUnit})</label>{num(stairsWidth, setStairsWidth)}</div>
              <div className="form-group"><label>Platform qalınlığı ({depthUnit})</label>{num(stairsPlatformDepth, setStairsPlatformDepth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Pillə sayı</label>{num(stairsStepCount, setStairsStepCount)}</div>
            </div>
          </>
        );
      case 'curb':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>Uzunluq ({lengthUnit})</label>{num(curbLength, setCurbLength)}</div>
              <div className="form-group"><label>En ({depthUnit})</label>{num(curbWidth, setCurbWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Hündürlük ({depthUnit})</label>{num(curbHeight, setCurbHeight)}</div>
              <div className="form-group"><label>Bayraq dərinliyi ({depthUnit})</label>{num(curbFlagDepth, setCurbFlagDepth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Sayı</label><input type="number" min="1" value={curbQuantity} onChange={(e) => setCurbQuantity(e.target.value)} /></div>
            </div>
          </>
        );
      case 'tube':
        return (
          <>
            <div className="form-row">
              <div className="form-group"><label>Xarici uzunluq ({lengthUnit})</label>{num(tubeOuterLength, setTubeOuterLength)}</div>
              <div className="form-group"><label>Xarici en ({lengthUnit})</label>{num(tubeOuterWidth, setTubeOuterWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Daxili uzunluq ({lengthUnit})</label>{num(tubeInnerLength, setTubeInnerLength)}</div>
              <div className="form-group"><label>Daxili en ({lengthUnit})</label>{num(tubeInnerWidth, setTubeInnerWidth)}</div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Dərinlik ({depthUnit})</label>{num(tubeDepth, setTubeDepth)}</div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="calculator-page">
      <Seo page="calculator" />
      <div className="calculator-hero">
        <div className="calculator-hero-overlay"></div>
        <div className="container">
          <h1>Beton Kalkulyatoru</h1>
          <p>Layihəniz üçün beton həcmi, material, armatur və mikser hesablaması — pulsuz</p>
        </div>
      </div>

      <div className="calculator-content">
        <div className="container">
          <Breadcrumbs current="Kalkulyator" />
          <div className="tool-tabs">
            {toolTabs.map((tab) => (
              <button key={tab.id} className={`tool-tab ${activeToolTab === tab.id ? 'active' : ''}`} onClick={() => setActiveToolTab(tab.id)}>
                <span className="tool-tab-icon">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          {activeToolTab === 'calculator' ? (
            <div className="calculator-wrapper">
              <div className="mode-switcher">
                <button className={`mode-btn ${mode === 'simple' ? 'active' : ''}`} onClick={() => switchMode('simple')}>
                  <span className="mode-btn-icon">{icons.calculator}</span>
                  <span className="mode-btn-text">
                    <span className="mode-btn-title">Sadə</span>
                    <span className="mode-btn-desc">Həcm, mikser və kisə sayı</span>
                  </span>
                </button>
                <button className={`mode-btn ${mode === 'pro' ? 'active' : ''}`} onClick={() => switchMode('pro')}>
                  <span className="mode-btn-icon">{icons.chart}</span>
                  <span className="mode-btn-text">
                    <span className="mode-btn-title">Pro</span>
                    <span className="mode-btn-desc">Ətraflı material hesablaması</span>
                  </span>
                </button>
              </div>
              <div className="calculator-tabs">
                {tabs.map((tab) => (
                  <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                    <span className="tab-icon">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </div>

              <div className="calculator-form">
                <div className="form-section grade-first">
                  <h4>Beton Markası</h4>
                  <select value={concreteGrade} onChange={(e) => setConcreteGrade(e.target.value)} className="form-select">
                    {CONCRETE_GRADES.map((g) => (
                      <option key={g.id} value={g.id}>{g.id} ({g.bClass}) – {g.name}</option>
                    ))}
                  </select>
                </div>

                <h3>Ölçüləri daxil edin</h3>
                {renderFormFields()}

                {mode === 'simple' ? (
                  <div className="advanced-options">
                    <h4>Hesablama Parametrləri</h4>
                    <div className="option-group pricing-options">
                      <div className="option-row">
                        <label>Material itkisi (%)</label>
                        <input type="number" value={wastePct} onChange={(e) => setWastePct(e.target.value)} min="0" max="30" />
                      </div>
                      <p className="option-hint">
                        Tökülmə, nasos və mikserdə qalan qalıq, səthin qeyri-bərabərliyi üçün ehtiyat payı.
                        Tövsiyə: 5–10%.
                      </p>
                      <div className="option-row">
                        <label><span className="option-icon">{icons.truck}</span> Mikser tutumu (m³)</label>
                        <input type="number" value={truckCapacity} onChange={(e) => setTruckCapacity(e.target.value)} min="1" max="15" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="advanced-options">
                    <h4>Əlavə Seçimlər</h4>

                    <div className="option-group">
                      <label className="checkbox-label">
                        <input type="checkbox" checked={rebarEnabled} onChange={(e) => setRebarEnabled(e.target.checked)} />
                        <span className="option-icon">{icons.rebar}</span>
                        Armatur hesabla
                      </label>
                      {rebarEnabled && (
                        <div className="option-details">
                          <div className="option-row">
                            <label>Diametr (mm)</label>
                            <select value={rebarDiameter} onChange={(e) => setRebarDiameter(parseInt(e.target.value))}>
                              {rebarDiameters.map((d) => <option key={d} value={d}>Ø{d}</option>)}
                            </select>
                          </div>
                          <div className="option-row">
                            <label>Aralıq (mm)</label>
                            <input type="number" value={rebarSpacing} onChange={(e) => setRebarSpacing(e.target.value)} min="50" max="400" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="option-group">
                      <label className="checkbox-label">
                        <input type="checkbox" checked={meshEnabled} onChange={(e) => setMeshEnabled(e.target.checked)} />
                        <span className="option-icon">{icons.mesh}</span>
                        Tor (mesh) hesabla
                      </label>
                      {meshEnabled && (
                        <div className="option-details">
                          <div className="option-row">
                            <label>Tor növü</label>
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
                        Qəlib (formwork) hesabla
                      </label>
                    </div>

                    <div className="option-group pricing-options">
                      <div className="option-row">
                        <label>Material itkisi (%)</label>
                        <input type="number" value={wastePct} onChange={(e) => setWastePct(e.target.value)} min="0" max="30" />
                      </div>
                      <p className="option-hint">
                        Tökülmə, nasos və mikserdə qalan qalıq, səthin qeyri-bərabərliyi üçün ehtiyat payı.
                        Tövsiyə: 5–10%.
                      </p>
                      <div className="option-row">
                        <label><span className="option-icon">{icons.truck}</span> Mikser tutumu (m³)</label>
                        <input type="number" value={truckCapacity} onChange={(e) => setTruckCapacity(e.target.value)} min="1" max="15" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button className="btn-calculate" onClick={scrollToResults}>Nəticələrə bax</button>
                  <button className="btn-reset" onClick={resetForm}>Sıfırla</button>
                </div>
              </div>

              <div id="calc-results">
                {!results ? (
                  <div className="calculator-empty">
                    <span className="empty-icon">{icons.calculator}</span>
                    <p>Nəticələri görmək üçün yuxarıda ölçüləri daxil edin.</p>
                  </div>
                ) : (
                  <div className="calculator-results">
                    <div className="results-live-badge">● Canlı hesablama</div>

                    {mode === 'simple' ? (
                      /* ── SIMPLE MODE: quick volume answer ── */
                      <div className="simple-result">
                        <div className="simple-cost-card">
                          <span className="simple-cost-label">Lazımi Beton Həcmi</span>
                          <span className="simple-cost-value">{results.volumeM3s}<small> m³</small></span>
                          <span className="simple-cost-sub">{concreteGrade} ({results.gradeClass}){results.waste > 0 ? ` · +${results.waste}% itki daxil` : ''}</span>
                        </div>
                        <div className="summary-stats simple-stats">
                          <div className="summary-stat"><span className="ss-value">{results.trucksNeeded}</span><span className="ss-label">mikser</span></div>
                          <div className="summary-stat"><span className="ss-value">{results.bags50kg}</span><span className="ss-label">50kq kisə</span></div>
                          <div className="summary-stat"><span className="ss-value">{results.concreteWeightTons}</span><span className="ss-label">ton</span></div>
                        </div>
                        {priceTool}
                        {quoteCta}
                        <div className="results-note">
                          <span className="note-icon">{icons.warning}</span>
                          <span><strong>Qeyd:</strong> Nəticələr planlaşdırma üçün təxmini dəyərlərdir. Dəqiq hesablama və qiymət üçün bizimlə əlaqə saxlayın.</span>
                        </div>
                      </div>
                    ) : (
                      /* ── PRO MODE: full detail, no concrete weight ── */
                      <>
                        <div className="result-summary">
                          <div className="summary-primary">
                            <span className="summary-label">Lazımi Beton Həcmi</span>
                            <span className="summary-value">{results.volumeM3s} <small>m³</small></span>
                            <span className="summary-sub">{concreteGrade} ({results.gradeClass}) · qarışıq {results.ratio}</span>
                          </div>
                          <div className="summary-stats">
                            <div className="summary-stat"><span className="ss-value">{results.concreteWeightTons}</span><span className="ss-label">ton</span></div>
                            <div className="summary-stat"><span className="ss-value">{results.trucksNeeded}</span><span className="ss-label">mikser</span></div>
                            <div className="summary-stat"><span className="ss-value">{results.bags50kg}</span><span className="ss-label">50kq kisə</span></div>
                          </div>
                        </div>

                        {priceTool}

                        <h3><span className="section-title-icon">{icons.chart}</span> Həcm Nəticələri</h3>
                        <div className="results-grid">
                          <div className="result-card primary">
                            <div className="result-icon">{icons.cube}</div>
                            <div className="result-info">
                              <span className="result-value">{results.volumeM3s}</span>
                              <span className="result-label">Kub metr (m³){results.waste > 0 ? ` · +${results.waste}% itki daxil` : ''}</span>
                            </div>
                          </div>
                          <div className="result-card">
                            <div className="result-icon">{icons.ruler}</div>
                            <div className="result-info">
                              <span className="result-value">{results.volumeL}</span>
                              <span className="result-label">Litr (L)</span>
                            </div>
                          </div>
                          <div className="result-card">
                            <div className="result-icon">{icons.weight}</div>
                            <div className="result-info">
                              <span className="result-value">{results.concreteWeightTons}</span>
                              <span className="result-label">Çəki (ton)</span>
                            </div>
                          </div>
                        </div>

                        <h4><span className="section-title-icon">{icons.bricks}</span> Lazım Olan Materiallar <span className="grade-pill">{concreteGrade} · {results.ratio}</span></h4>
                        <div className="materials-grid">
                          <div className="material-item"><span className="material-name">Sement ({concreteGrade})</span><span className="material-value">{results.cement} kq</span></div>
                          <div className="material-item"><span className="material-name">Qum</span><span className="material-value">{results.sand} m³ (~{results.sandKg} kq)</span></div>
                          <div className="material-item"><span className="material-name">Çınqıl</span><span className="material-value">{results.gravel} m³ (~{results.gravelKg} kq)</span></div>
                          <div className="material-item"><span className="material-name">Su</span><span className="material-value">{results.water} litr</span></div>
                        </div>

                        <div className="breakdown">
                          <div className="breakdown-bar" role="img" aria-label="Material payları">
                            {results.breakdown.map((m) => (
                              <span key={m.key} className="breakdown-seg" style={{ width: `${m.pct}%`, background: m.color }} title={`${m.label}: ${m.pct.toFixed(1)}%`} />
                            ))}
                          </div>
                          <div className="breakdown-legend">
                            {results.breakdown.map((m) => (
                              <span key={m.key} className="legend-item">
                                <span className="legend-dot" style={{ background: m.color }} />
                                {m.label} <strong>{m.pct.toFixed(1)}%</strong>
                              </span>
                            ))}
                          </div>
                        </div>

                        <h4><span className="section-title-icon">{icons.bag}</span> Kisə Hesablaması</h4>
                        <div className="bags-section">
                          <div className="bags-group">
                            <h5>Sement kisələri</h5>
                            <div className="bags-grid">
                              <div className="bag-item"><span className="bag-size">50 kq</span><span className="bag-count">{results.bags50kg} ədəd</span></div>
                              <div className="bag-item"><span className="bag-size">40 kq</span><span className="bag-count">{results.bags40kg} ədəd</span></div>
                              <div className="bag-item"><span className="bag-size">25 kq</span><span className="bag-count">{results.bags25kg} ədəd</span></div>
                            </div>
                          </div>
                        </div>

                        {results.rebarEnabled && (
                          <>
                            <h4><span className="section-title-icon">{icons.rebar}</span> Armatur Hesablaması</h4>
                            <div className="rebar-results">
                              <div className="rebar-item"><span className="rebar-label">Diametr</span><span className="rebar-value">Ø{results.rebarDiameter} mm</span></div>
                              <div className="rebar-item"><span className="rebar-label">Aralıq</span><span className="rebar-value">{results.rebarSpacing} mm</span></div>
                              <div className="rebar-item"><span className="rebar-label">Çubuq sayı</span><span className="rebar-value">{results.rebarCount} ədəd</span></div>
                              <div className="rebar-item"><span className="rebar-label">Ümumi uzunluq</span><span className="rebar-value">{results.rebarLength} m</span></div>
                              <div className="rebar-item highlight"><span className="rebar-label">Ümumi çəki</span><span className="rebar-value">{results.rebarWeight} kq</span></div>
                            </div>
                          </>
                        )}

                        {results.meshEnabled && (
                          <>
                            <h4><span className="section-title-icon">{icons.mesh}</span> Tor (Mesh) Hesablaması</h4>
                            <div className="mesh-results">
                              <div className="mesh-item"><span className="mesh-label">Tor növü</span><span className="mesh-value">{results.meshType}</span></div>
                              <div className="mesh-item"><span className="mesh-label">Sahə</span><span className="mesh-value">{results.meshArea} m²</span></div>
                              <div className="mesh-item"><span className="mesh-label">Vərəq sayı</span><span className="mesh-value">{results.meshSheets} ədəd</span></div>
                              <div className="mesh-item highlight"><span className="mesh-label">Ümumi çəki</span><span className="mesh-value">{results.meshWeight} kq</span></div>
                            </div>
                          </>
                        )}

                        {results.includeFormwork && (
                          <>
                            <h4><span className="section-title-icon">{icons.formwork}</span> Qəlib (Formwork)</h4>
                            <div className="formwork-results">
                              <div className="formwork-item"><span className="formwork-label">Qəlib sahəsi</span><span className="formwork-value">{results.formworkArea} m²</span></div>
                              <div className="formwork-item highlight"><span className="formwork-label">Faner vərəqi (1.2×2.4m)</span><span className="formwork-value">{results.formworkSheets} ədəd</span></div>
                            </div>
                          </>
                        )}

                        <h4><span className="section-title-icon">{icons.truck}</span> Mikser Planlaşdırması</h4>
                        <div className="truck-results">
                          <div className="truck-visual">
                            {[...Array(Math.min(results.trucksNeeded, 6))].map((_, i) => (
                              <div key={i} className={`truck-icon ${i === results.trucksNeeded - 1 ? 'partial' : ''}`}>
                                {icons.truck}
                                <span className="truck-load">{i === results.trucksNeeded - 1 ? results.lastTruckLoad : results.truckCapacity} m³</span>
                              </div>
                            ))}
                            {results.trucksNeeded > 6 && <span className="truck-more">+{results.trucksNeeded - 6} daha</span>}
                          </div>
                          <div className="truck-info">
                            <p><strong>{results.trucksNeeded}</strong> mikser tələb olunur</p>
                            <p>Mikser tutumu: <strong>{results.truckCapacity} m³</strong></p>
                            {results.trucksNeeded > 1 && <p>Son mikser yükü: <strong>{results.lastTruckLoad} m³</strong></p>}
                          </div>
                        </div>

                        {quoteCta}

                        <div className="results-note">
                          <span className="note-icon">{icons.warning}</span>
                          <span><strong>Qeyd:</strong> Bu hesablamalar planlaşdırma üçün təxmini dəyərlərdir (qarışıq nisbəti markaya görə nominal götürülüb). Dəqiq hesablama və qiymət təklifi üçün bizimlə əlaqə saxlayın.</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="converter-wrapper">
              <h3><span className="section-title-icon">{icons.convert}</span> Vahid Konverteri</h3>
              <p className="converter-desc">Həcm vahidlərini asanlıqla çevirin</p>

              <div className="converter-form">
                <div className="converter-input-group">
                  <input type="number" value={converterValue} onChange={(e) => setConverterValue(e.target.value)} placeholder="Dəyər daxil edin" className="converter-input" />
                  <select value={converterFrom} onChange={(e) => setConverterFrom(e.target.value)} className="converter-select">
                    {Object.entries(unitConversions).map(([key, val]) => <option key={key} value={key}>{val.name}</option>)}
                  </select>
                </div>
                <div className="converter-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
                </div>
                <div className="converter-input-group">
                  <input type="text" value={converterResult || ''} readOnly placeholder="Nəticə" className="converter-input result" />
                  <select value={converterTo} onChange={(e) => setConverterTo(e.target.value)} className="converter-select">
                    {Object.entries(unitConversions).map(([key, val]) => <option key={key} value={key}>{val.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="converter-reference">
                <h4>Tez İstinad Cədvəli</h4>
                <table>
                  <thead><tr><th>Vahid</th><th>1 m³ =</th></tr></thead>
                  <tbody>
                    {Object.entries(unitConversions).map(([key, val]) => (
                      <tr key={key}><td>{val.name}</td><td>{val.factor.toFixed(4)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="calculator-info">
            <div className="info-card">
              <h4><span className="info-title-icon">{icons.building}</span> Beton Markası</h4>
              <ul>
                {CONCRETE_GRADES.map((g) => (
                  <li key={g.id}><strong>{g.id}:</strong> {g.use}</li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <h4><span className="info-title-icon">{icons.phone}</span> Kömək lazımdır?</h4>
              <p>Layihəniz üçün dəqiq hesablama və məsləhət üçün mütəxəssislərimizlə əlaqə saxlayın.</p>
              <a href="tel:+994506209584" className="info-phone">+994 50 620 95 84</a>
            </div>
            <div className="info-card">
              <h4><span className="info-title-icon">{icons.truck}</span> Çatdırılma</h4>
              <p>Novxanı Beton olaraq bütün Bakı və Abşeron ərazisində çatdırılma xidməti təklif edirik.</p>
            </div>
          </div>

          <Faq items={CALC_FAQS} subtitle="Hesablama haqqında" />
        </div>
      </div>

      <CtaBand
        title="Hesabladınız? İndi qiymət təklifi alın"
        text="Hesabladığınız həcmi və ünvanı göndərin — marka və çatdırılmaya uyğun fərdi təklif hazırlayaq."
        whatsappText="Salam! Kalkulyatorla hesabladığım beton həcmi üçün qiymət təklifi almaq istəyirəm."
      />
    </div>
  );
};

export default Calculator;
