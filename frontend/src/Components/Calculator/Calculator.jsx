import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('slab');
  const [activeToolTab, setActiveToolTab] = useState('calculator');
  const [unit, setUnit] = useState('metric');
  const [results, setResults] = useState(null);

  // Slab/Square footing state
  const [slabLength, setSlabLength] = useState('');
  const [slabWidth, setSlabWidth] = useState('');
  const [slabDepth, setSlabDepth] = useState('');
  const [slabQuantity, setSlabQuantity] = useState(1);

  // Column/Cylinder state
  const [columnDiameter, setColumnDiameter] = useState('');
  const [columnHeight, setColumnHeight] = useState('');
  const [columnQuantity, setColumnQuantity] = useState(1);

  // Stairs state
  const [stairsRun, setStairsRun] = useState('');
  const [stairsRise, setStairsRise] = useState('');
  const [stairsWidth, setStairsWidth] = useState('');
  const [stairsPlatformDepth, setStairsPlatformDepth] = useState('');
  const [stairsStepCount, setStairsStepCount] = useState('');

  // Curb/Gutter state
  const [curbLength, setCurbLength] = useState('');
  const [curbWidth, setCurbWidth] = useState('');
  const [curbHeight, setCurbHeight] = useState('');
  const [curbFlagDepth, setCurbFlagDepth] = useState('');
  const [curbQuantity, setCurbQuantity] = useState(1);

  // Wall state
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [wallThickness, setWallThickness] = useState('');

  // Footing state
  const [footingLength, setFootingLength] = useState('');
  const [footingWidth, setFootingWidth] = useState('');
  const [footingDepth, setFootingDepth] = useState('');
  const [footingQuantity, setFootingQuantity] = useState(1);

  // Tube/Hollow state
  const [tubeOuterLength, setTubeOuterLength] = useState('');
  const [tubeOuterWidth, setTubeOuterWidth] = useState('');
  const [tubeInnerLength, setTubeInnerLength] = useState('');
  const [tubeInnerWidth, setTubeInnerWidth] = useState('');
  const [tubeDepth, setTubeDepth] = useState('');

  // Advanced options
  const [concreteGrade, setConcreteGrade] = useState('M200');
  const [rebarEnabled, setRebarEnabled] = useState(true);
  const [rebarSpacing, setRebarSpacing] = useState(150);
  const [rebarDiameter, setRebarDiameter] = useState(12);
  const [meshEnabled, setMeshEnabled] = useState(false);
  const [meshType, setMeshType] = useState('6x6');
  const [pricePerM3, setPricePerM3] = useState(85);
  const [includeFormwork, setIncludeFormwork] = useState(true);
  const [truckCapacity, setTruckCapacity] = useState(8);

  // Unit Converter state
  const [converterValue, setConverterValue] = useState('');
  const [converterFrom, setConverterFrom] = useState('m3');
  const [converterTo, setConverterTo] = useState('ft3');
  const [converterResult, setConverterResult] = useState(null);

  const concreteGrades = [
    { id: 'M100', name: 'M100 - Asan işlər', cement: 220, strength: 7.5 },
    { id: 'M150', name: 'M150 - Pilləkən, bordür', cement: 265, strength: 10 },
    { id: 'M200', name: 'M200 - Ümumi tikinti', cement: 320, strength: 15 },
    { id: 'M250', name: 'M250 - Təməl, divar', cement: 360, strength: 20 },
    { id: 'M300', name: 'M300 - Yüklü konstruksiya', cement: 400, strength: 25 },
    { id: 'M350', name: 'M350 - Çoxmərtəbəli', cement: 450, strength: 30 },
    { id: 'M400', name: 'M400 - Körpü, tunel', cement: 500, strength: 35 },
  ];

  const rebarDiameters = [8, 10, 12, 14, 16, 20, 25, 32];
  const meshTypes = [
    { id: '4x4', name: '4x4 (100x100mm)', weight: 1.54 },
    { id: '6x6', name: '6x6 (150x150mm)', weight: 2.05 },
    { id: '8x8', name: '8x8 (200x200mm)', weight: 2.47 },
  ];

  const unitConversions = {
    m3: { name: 'Kub metr (m³)', factor: 1 },
    ft3: { name: 'Kub fut (ft³)', factor: 35.3147 },
    yd3: { name: 'Kub yard (yd³)', factor: 1.30795 },
    l: { name: 'Litr (L)', factor: 1000 },
    gal: { name: 'Gallon (gal)', factor: 264.172 },
  };

  const resetForm = () => {
    setSlabLength(''); setSlabWidth(''); setSlabDepth(''); setSlabQuantity(1);
    setColumnDiameter(''); setColumnHeight(''); setColumnQuantity(1);
    setStairsRun(''); setStairsRise(''); setStairsWidth(''); setStairsPlatformDepth(''); setStairsStepCount('');
    setCurbLength(''); setCurbWidth(''); setCurbHeight(''); setCurbFlagDepth(''); setCurbQuantity(1);
    setWallLength(''); setWallHeight(''); setWallThickness('');
    setFootingLength(''); setFootingWidth(''); setFootingDepth(''); setFootingQuantity(1);
    setTubeOuterLength(''); setTubeOuterWidth(''); setTubeInnerLength(''); setTubeInnerWidth(''); setTubeDepth('');
    setResults(null);
  };

  const convertUnits = () => {
    const value = parseFloat(converterValue);
    if (isNaN(value)) return;
    
    const inM3 = value / unitConversions[converterFrom].factor;
    const result = inM3 * unitConversions[converterTo].factor;
    setConverterResult(result.toFixed(4));
  };

  const calculateConcrete = () => {
    let volumeM3 = 0;
    let surfaceArea = 0;
    let formworkArea = 0;
    
    const toMeters = (val) => unit === 'metric' ? parseFloat(val) / 100 : parseFloat(val) * 0.0254;
    const toMetersLength = (val) => unit === 'metric' ? parseFloat(val) : parseFloat(val) * 0.3048;

    switch (activeTab) {
      case 'slab':
        const sLength = toMetersLength(slabLength);
        const sWidth = toMetersLength(slabWidth);
        const sDepth = toMeters(slabDepth);
        volumeM3 = sLength * sWidth * sDepth * slabQuantity;
        surfaceArea = sLength * sWidth * slabQuantity;
        formworkArea = (2 * (sLength + sWidth) * sDepth) * slabQuantity;
        break;

      case 'column':
        const radius = toMeters(columnDiameter) / 2;
        const cHeight = toMetersLength(columnHeight);
        volumeM3 = Math.PI * radius * radius * cHeight * columnQuantity;
        surfaceArea = Math.PI * radius * radius * columnQuantity;
        formworkArea = 2 * Math.PI * radius * cHeight * columnQuantity;
        break;

      case 'footing':
        const fLength = toMetersLength(footingLength);
        const fWidth = toMetersLength(footingWidth);
        const fDepth = toMeters(footingDepth);
        volumeM3 = fLength * fWidth * fDepth * footingQuantity;
        surfaceArea = fLength * fWidth * footingQuantity;
        formworkArea = (2 * (fLength + fWidth) * fDepth) * footingQuantity;
        break;

      case 'stairs':
        const run = toMetersLength(stairsRun);
        const rise = toMeters(stairsRise);
        const sWidth2 = toMetersLength(stairsWidth);
        const platformDepth = toMeters(stairsPlatformDepth);
        const stepCount = parseInt(stairsStepCount) || 0;
        const stairVolume = (run * rise * sWidth2 * stepCount) / 2;
        const platformVolume = run * sWidth2 * platformDepth;
        volumeM3 = stairVolume + platformVolume;
        surfaceArea = run * sWidth2 + (run * stepCount * sWidth2);
        formworkArea = surfaceArea * 1.5;
        break;

      case 'curb':
        const cuLength = toMetersLength(curbLength);
        const cuWidth = toMeters(curbWidth);
        const cuHeight = toMeters(curbHeight);
        const cuFlag = toMeters(curbFlagDepth);
        volumeM3 = (cuLength * cuWidth * cuHeight + cuLength * cuWidth * cuFlag) * curbQuantity;
        surfaceArea = cuLength * cuWidth * curbQuantity;
        formworkArea = (2 * cuHeight * cuLength + 2 * cuWidth * cuLength) * curbQuantity;
        break;

      case 'wall':
        const wLength = toMetersLength(wallLength);
        const wHeight = toMetersLength(wallHeight);
        const wThickness = toMeters(wallThickness);
        volumeM3 = wLength * wHeight * wThickness;
        surfaceArea = wLength * wHeight * 2;
        formworkArea = surfaceArea;
        break;

      case 'tube':
        const outerL = toMetersLength(tubeOuterLength);
        const outerW = toMetersLength(tubeOuterWidth);
        const innerL = toMetersLength(tubeInnerLength);
        const innerW = toMetersLength(tubeInnerWidth);
        const tDepth = toMeters(tubeDepth);
        const outerVol = outerL * outerW * tDepth;
        const innerVol = innerL * innerW * tDepth;
        volumeM3 = outerVol - innerVol;
        surfaceArea = outerL * outerW;
        formworkArea = 2 * (outerL + outerW + innerL + innerW) * tDepth;
        break;

      default:
        volumeM3 = 0;
    }

    // Get grade info
    const gradeInfo = concreteGrades.find(g => g.id === concreteGrade) || concreteGrades[2];
    
    // Calculate materials based on concrete grade
    const cement = volumeM3 * gradeInfo.cement;
    const sand = volumeM3 * 0.5;
    const gravel = volumeM3 * 0.8;
    const water = volumeM3 * 160;
    
    // Bag calculations - multiple sizes
    const bags50kg = Math.ceil(cement / 50);
    const bags40kg = Math.ceil(cement / 40);
    const bags25kg = Math.ceil(cement / 25);
    const bags80lb = Math.ceil(cement / 36.29);
    const bags60lb = Math.ceil(cement / 27.22);
    const bags40lb = Math.ceil(cement / 18.14);

    // Volume conversions
    const volumeYd3 = volumeM3 * 1.30795;
    const volumeFt3 = volumeM3 * 35.3147;
    const volumeL = volumeM3 * 1000;

    // Concrete weight
    const concreteWeight = volumeM3 * 2400;
    const concreteWeightTons = concreteWeight / 1000;
    const concreteWeightLbs = concreteWeight * 2.20462;

    // Rebar calculation
    let rebarLength = 0;
    let rebarWeight = 0;
    let rebarCount = 0;
    if (rebarEnabled && surfaceArea > 0) {
      const spacingM = rebarSpacing / 1000;
      const lengthDir = Math.sqrt(surfaceArea);
      const barsPerDirection = Math.ceil(lengthDir / spacingM) + 1;
      rebarCount = barsPerDirection * 2;
      rebarLength = rebarCount * lengthDir;
      const rebarWeightPerM = Math.PI * Math.pow(rebarDiameter / 2000, 2) * 7850;
      rebarWeight = rebarLength * rebarWeightPerM;
    }

    // Mesh calculation
    let meshArea = 0;
    let meshWeight = 0;
    let meshSheets = 0;
    if (meshEnabled && surfaceArea > 0) {
      meshArea = surfaceArea * 1.1;
      const meshInfo = meshTypes.find(m => m.id === meshType);
      meshWeight = meshArea * (meshInfo?.weight || 2.05);
      meshSheets = Math.ceil(meshArea / 5.8);
    }

    // Formwork calculation
    const formworkSheets = includeFormwork ? Math.ceil(formworkArea / 2.88) : 0;
    const formworkCost = formworkArea * 15;

    // Truck calculation
    const trucksNeeded = Math.ceil(volumeM3 / truckCapacity);
    const lastTruckLoad = volumeM3 % truckCapacity || truckCapacity;

    // Cost estimation
    const materialCost = volumeM3 * pricePerM3;
    const rebarCost = rebarWeight * 1.2;
    const meshCost = meshWeight * 1.5;
    const laborCost = volumeM3 * 25;
    const transportCost = trucksNeeded * 50;
    const totalCost = materialCost + (rebarEnabled ? rebarCost : 0) + (meshEnabled ? meshCost : 0) + 
                      (includeFormwork ? formworkCost : 0) + laborCost + transportCost;

    setResults({
      volumeM3: volumeM3.toFixed(2),
      volumeYd3: volumeYd3.toFixed(2),
      volumeFt3: volumeFt3.toFixed(2),
      volumeL: volumeL.toFixed(0),
      concreteWeight: concreteWeight.toFixed(0),
      concreteWeightTons: concreteWeightTons.toFixed(2),
      concreteWeightLbs: concreteWeightLbs.toFixed(0),
      cement: cement.toFixed(0),
      sand: sand.toFixed(2),
      gravel: gravel.toFixed(2),
      water: water.toFixed(0),
      gradeStrength: gradeInfo.strength,
      bags50kg, bags40kg, bags25kg,
      bags80lb, bags60lb, bags40lb,
      rebarEnabled,
      rebarLength: rebarLength.toFixed(1),
      rebarWeight: rebarWeight.toFixed(1),
      rebarCount, rebarDiameter, rebarSpacing,
      meshEnabled,
      meshArea: meshArea.toFixed(2),
      meshWeight: meshWeight.toFixed(1),
      meshSheets, meshType,
      includeFormwork,
      formworkArea: formworkArea.toFixed(2),
      formworkSheets,
      formworkCost: formworkCost.toFixed(2),
      trucksNeeded, truckCapacity,
      lastTruckLoad: lastTruckLoad.toFixed(2),
      materialCost: materialCost.toFixed(2),
      rebarCost: rebarCost.toFixed(2),
      meshCost: meshCost.toFixed(2),
      laborCost: laborCost.toFixed(2),
      transportCost: transportCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
    });
  };

  // Professional SVG Icons
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

  const renderFormFields = () => {
    const lengthUnit = unit === 'metric' ? 'm' : 'ft';
    const depthUnit = unit === 'metric' ? 'sm' : 'in';

    switch (activeTab) {
      case 'slab':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Uzunluq ({lengthUnit})</label>
                <input type="number" value={slabLength} onChange={(e) => setSlabLength(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>En ({lengthUnit})</label>
                <input type="number" value={slabWidth} onChange={(e) => setSlabWidth(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Qalınlıq ({depthUnit})</label>
                <input type="number" value={slabDepth} onChange={(e) => setSlabDepth(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Sayı</label>
                <input type="number" value={slabQuantity} onChange={(e) => setSlabQuantity(parseInt(e.target.value) || 1)} min="1" />
              </div>
            </div>
          </>
        );

      case 'footing':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Uzunluq ({lengthUnit})</label>
                <input type="number" value={footingLength} onChange={(e) => setFootingLength(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>En ({lengthUnit})</label>
                <input type="number" value={footingWidth} onChange={(e) => setFootingWidth(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Dərinlik ({depthUnit})</label>
                <input type="number" value={footingDepth} onChange={(e) => setFootingDepth(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Sayı</label>
                <input type="number" value={footingQuantity} onChange={(e) => setFootingQuantity(parseInt(e.target.value) || 1)} min="1" />
              </div>
            </div>
          </>
        );

      case 'column':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Diametr ({depthUnit})</label>
                <input type="number" value={columnDiameter} onChange={(e) => setColumnDiameter(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Hündürlük ({lengthUnit})</label>
                <input type="number" value={columnHeight} onChange={(e) => setColumnHeight(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Sayı</label>
                <input type="number" value={columnQuantity} onChange={(e) => setColumnQuantity(parseInt(e.target.value) || 1)} min="1" />
              </div>
            </div>
          </>
        );

      case 'wall':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Uzunluq ({lengthUnit})</label>
                <input type="number" value={wallLength} onChange={(e) => setWallLength(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Hündürlük ({lengthUnit})</label>
                <input type="number" value={wallHeight} onChange={(e) => setWallHeight(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Qalınlıq ({depthUnit})</label>
                <input type="number" value={wallThickness} onChange={(e) => setWallThickness(e.target.value)} placeholder="0" />
              </div>
            </div>
          </>
        );

      case 'stairs':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Pilləkən uzunluğu ({lengthUnit})</label>
                <input type="number" value={stairsRun} onChange={(e) => setStairsRun(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Pilləkən hündürlüyü ({depthUnit})</label>
                <input type="number" value={stairsRise} onChange={(e) => setStairsRise(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>En ({lengthUnit})</label>
                <input type="number" value={stairsWidth} onChange={(e) => setStairsWidth(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Platform qalınlığı ({depthUnit})</label>
                <input type="number" value={stairsPlatformDepth} onChange={(e) => setStairsPlatformDepth(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Pillə sayı</label>
                <input type="number" value={stairsStepCount} onChange={(e) => setStairsStepCount(e.target.value)} placeholder="0" />
              </div>
            </div>
          </>
        );

      case 'curb':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Uzunluq ({lengthUnit})</label>
                <input type="number" value={curbLength} onChange={(e) => setCurbLength(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>En ({depthUnit})</label>
                <input type="number" value={curbWidth} onChange={(e) => setCurbWidth(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Hündürlük ({depthUnit})</label>
                <input type="number" value={curbHeight} onChange={(e) => setCurbHeight(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Bayraq dərinliyi ({depthUnit})</label>
                <input type="number" value={curbFlagDepth} onChange={(e) => setCurbFlagDepth(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Sayı</label>
                <input type="number" value={curbQuantity} onChange={(e) => setCurbQuantity(parseInt(e.target.value) || 1)} min="1" />
              </div>
            </div>
          </>
        );

      case 'tube':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Xarici uzunluq ({lengthUnit})</label>
                <input type="number" value={tubeOuterLength} onChange={(e) => setTubeOuterLength(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Xarici en ({lengthUnit})</label>
                <input type="number" value={tubeOuterWidth} onChange={(e) => setTubeOuterWidth(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Daxili uzunluq ({lengthUnit})</label>
                <input type="number" value={tubeInnerLength} onChange={(e) => setTubeInnerLength(e.target.value)} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Daxili en ({lengthUnit})</label>
                <input type="number" value={tubeInnerWidth} onChange={(e) => setTubeInnerWidth(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Dərinlik ({depthUnit})</label>
                <input type="number" value={tubeDepth} onChange={(e) => setTubeDepth(e.target.value)} placeholder="0" />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="calculator-page">
      <div className="calculator-hero">
        <div className="calculator-hero-overlay"></div>
        <div className="container">
          <h1>Beton Kalkulyatoru Pro</h1>
          <p>Layihəniz üçün beton, armatur, qəlib və xərc hesablaması</p>
        </div>
      </div>

      <div className="calculator-content">
        <div className="container">
          {/* Tool Tabs */}
          <div className="tool-tabs">
            {toolTabs.map((tab) => (
              <button
                key={tab.id}
                className={`tool-tab ${activeToolTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveToolTab(tab.id)}
              >
                <span className="tool-tab-icon">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          {activeToolTab === 'calculator' ? (
            <div className="calculator-wrapper">
              {/* Unit Toggle */}
              <div className="unit-toggle">
                <button className={unit === 'metric' ? 'active' : ''} onClick={() => setUnit('metric')}>
                  Metrik (m, sm)
                </button>
                <button className={unit === 'imperial' ? 'active' : ''} onClick={() => setUnit('imperial')}>
                  İmperial (ft, in)
                </button>
              </div>

              {/* Form Tabs */}
              <div className="calculator-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => { setActiveTab(tab.id); setResults(null); }}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Form Section */}
              <div className="calculator-form">
                <h3>Ölçüləri daxil edin</h3>
                {renderFormFields()}

                {/* Concrete Grade */}
                <div className="form-section">
                  <h4>Beton Markası</h4>
                  <select value={concreteGrade} onChange={(e) => setConcreteGrade(e.target.value)} className="form-select">
                    {concreteGrades.map((grade) => (
                      <option key={grade.id} value={grade.id}>{grade.name}</option>
                    ))}
                  </select>
                </div>

                {/* Advanced Options */}
                <div className="advanced-options">
                  <h4>Əlavə Seçimlər</h4>
                  
                  {/* Rebar */}
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
                            {rebarDiameters.map((d) => (
                              <option key={d} value={d}>Ø{d}</option>
                            ))}
                          </select>
                        </div>
                        <div className="option-row">
                          <label>Aralıq (mm)</label>
                          <input type="number" value={rebarSpacing} onChange={(e) => setRebarSpacing(parseInt(e.target.value) || 150)} min="50" max="400" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mesh */}
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
                            {meshTypes.map((m) => (
                              <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Formwork */}
                  <div className="option-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={includeFormwork} onChange={(e) => setIncludeFormwork(e.target.checked)} />
                      <span className="option-icon">{icons.formwork}</span>
                      Qəlib (formwork) hesabla
                    </label>
                  </div>

                  {/* Cost & Truck */}
                  <div className="option-group pricing-options">
                    <div className="option-row">
                      <label><span className="option-icon">{icons.price}</span> Qiymət (AZN/m³)</label>
                      <input type="number" value={pricePerM3} onChange={(e) => setPricePerM3(parseFloat(e.target.value) || 85)} min="1" />
                    </div>
                    <div className="option-row">
                      <label><span className="option-icon">{icons.truck}</span> Mikser tutumu (m³)</label>
                      <input type="number" value={truckCapacity} onChange={(e) => setTruckCapacity(parseFloat(e.target.value) || 8)} min="1" max="15" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="form-actions">
                  <button className="btn-calculate" onClick={calculateConcrete}>Hesabla</button>
                  <button className="btn-reset" onClick={resetForm}>Sıfırla</button>
                </div>
              </div>

              {/* Results */}
              {results && (
                <div className="calculator-results">
                  {/* Volume Results */}
                  <h3><span className="section-title-icon">{icons.chart}</span> Həcm Nəticələri</h3>
                  <div className="results-grid">
                    <div className="result-card primary">
                      <div className="result-icon">{icons.cube}</div>
                      <div className="result-info">
                        <span className="result-value">{results.volumeM3}</span>
                        <span className="result-label">Kub metr (m³)</span>
                      </div>
                    </div>
                    <div className="result-card">
                      <div className="result-icon">{icons.triangle}</div>
                      <div className="result-info">
                        <span className="result-value">{results.volumeYd3}</span>
                        <span className="result-label">Kub yard (yd³)</span>
                      </div>
                    </div>
                    <div className="result-card">
                      <div className="result-icon">{icons.ruler}</div>
                      <div className="result-info">
                        <span className="result-value">{results.volumeFt3}</span>
                        <span className="result-label">Kub fut (ft³)</span>
                      </div>
                    </div>
                  </div>

                  {/* Weight Results */}
                  <h4><span className="section-title-icon">{icons.weight}</span> Beton Çəkisi</h4>
                  <div className="weight-grid">
                    <div className="weight-item">
                      <span className="weight-value">{results.concreteWeight}</span>
                      <span className="weight-label">kq</span>
                    </div>
                    <div className="weight-item">
                      <span className="weight-value">{results.concreteWeightTons}</span>
                      <span className="weight-label">ton</span>
                    </div>
                    <div className="weight-item">
                      <span className="weight-value">{results.concreteWeightLbs}</span>
                      <span className="weight-label">lbs</span>
                    </div>
                  </div>

                  {/* Materials */}
                  <h4><span className="section-title-icon">{icons.bricks}</span> Lazım Olan Materiallar</h4>
                  <div className="materials-grid">
                    <div className="material-item">
                      <span className="material-name">Sement ({concreteGrade})</span>
                      <span className="material-value">{results.cement} kq</span>
                    </div>
                    <div className="material-item">
                      <span className="material-name">Qum</span>
                      <span className="material-value">{results.sand} m³</span>
                    </div>
                    <div className="material-item">
                      <span className="material-name">Çınqıl</span>
                      <span className="material-value">{results.gravel} m³</span>
                    </div>
                    <div className="material-item">
                      <span className="material-name">Su</span>
                      <span className="material-value">{results.water} litr</span>
                    </div>
                  </div>

                  {/* Bag Calculations */}
                  <h4><span className="section-title-icon">{icons.bag}</span> Kisə Hesablaması</h4>
                  <div className="bags-section">
                    <div className="bags-group">
                      <h5>Metrik</h5>
                      <div className="bags-grid">
                        <div className="bag-item"><span className="bag-size">50 kq</span><span className="bag-count">{results.bags50kg} ədəd</span></div>
                        <div className="bag-item"><span className="bag-size">40 kq</span><span className="bag-count">{results.bags40kg} ədəd</span></div>
                        <div className="bag-item"><span className="bag-size">25 kq</span><span className="bag-count">{results.bags25kg} ədəd</span></div>
                      </div>
                    </div>
                    <div className="bags-group">
                      <h5>İmperial</h5>
                      <div className="bags-grid">
                        <div className="bag-item"><span className="bag-size">80 lb</span><span className="bag-count">{results.bags80lb} ədəd</span></div>
                        <div className="bag-item"><span className="bag-size">60 lb</span><span className="bag-count">{results.bags60lb} ədəd</span></div>
                        <div className="bag-item"><span className="bag-size">40 lb</span><span className="bag-count">{results.bags40lb} ədəd</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Rebar Results */}
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

                  {/* Mesh Results */}
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

                  {/* Formwork Results */}
                  {results.includeFormwork && (
                    <>
                      <h4><span className="section-title-icon">{icons.formwork}</span> Qəlib (Formwork)</h4>
                      <div className="formwork-results">
                        <div className="formwork-item"><span className="formwork-label">Qəlib sahəsi</span><span className="formwork-value">{results.formworkArea} m²</span></div>
                        <div className="formwork-item"><span className="formwork-label">Faner vərəqi (1.2×2.4m)</span><span className="formwork-value">{results.formworkSheets} ədəd</span></div>
                        <div className="formwork-item highlight"><span className="formwork-label">Təxmini qəlib xərci</span><span className="formwork-value">{results.formworkCost} AZN</span></div>
                      </div>
                    </>
                  )}

                  {/* Truck Planning */}
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

                  {/* Cost Breakdown */}
                  <h4><span className="section-title-icon">{icons.price}</span> Xərc Hesablaması</h4>
                  <div className="cost-breakdown">
                    <div className="cost-item"><span className="cost-label">Material xərci</span><span className="cost-value">{results.materialCost} AZN</span></div>
                    {results.rebarEnabled && <div className="cost-item"><span className="cost-label">Armatur xərci</span><span className="cost-value">{results.rebarCost} AZN</span></div>}
                    {results.meshEnabled && <div className="cost-item"><span className="cost-label">Tor xərci</span><span className="cost-value">{results.meshCost} AZN</span></div>}
                    {results.includeFormwork && <div className="cost-item"><span className="cost-label">Qəlib xərci</span><span className="cost-value">{results.formworkCost} AZN</span></div>}
                    <div className="cost-item"><span className="cost-label">İşçilik xərci</span><span className="cost-value">{results.laborCost} AZN</span></div>
                    <div className="cost-item"><span className="cost-label">Nəqliyyat xərci</span><span className="cost-value">{results.transportCost} AZN</span></div>
                    <div className="cost-item total"><span className="cost-label">Ümumi Xərc</span><span className="cost-value">{results.totalCost} AZN</span></div>
                  </div>

                  <div className="results-note">
                    <span className="note-icon">{icons.warning}</span>
                    <span><strong>Qeyd:</strong> Bu hesablamalar təxmini dəyərlərdir. Əlavə 5-10% material itgisi üçün əlavə edin. Dəqiq hesablama üçün bizimlə əlaqə saxlayın.</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Unit Converter */
            <div className="converter-wrapper">
              <h3><span className="section-title-icon">{icons.convert}</span> Vahid Konverteri</h3>
              <p className="converter-desc">Həcm vahidlərini asanlıqla çevirin</p>
              
              <div className="converter-form">
                <div className="converter-input-group">
                  <input type="number" value={converterValue} onChange={(e) => setConverterValue(e.target.value)} placeholder="Dəyər daxil edin" className="converter-input" />
                  <select value={converterFrom} onChange={(e) => setConverterFrom(e.target.value)} className="converter-select">
                    {Object.entries(unitConversions).map(([key, val]) => (
                      <option key={key} value={key}>{val.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="converter-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
                </div>
                
                <div className="converter-input-group">
                  <input type="text" value={converterResult || ''} readOnly placeholder="Nəticə" className="converter-input result" />
                  <select value={converterTo} onChange={(e) => setConverterTo(e.target.value)} className="converter-select">
                    {Object.entries(unitConversions).map(([key, val]) => (
                      <option key={key} value={key}>{val.name}</option>
                    ))}
                  </select>
                </div>
                
                <button className="btn-convert" onClick={convertUnits}>Çevir</button>
              </div>

              {/* Quick Reference Table */}
              <div className="converter-reference">
                <h4>Tez İstinad Cədvəli</h4>
                <table>
                  <thead>
                    <tr><th>Vahid</th><th>1 m³ =</th></tr>
                  </thead>
                  <tbody>
                    {Object.entries(unitConversions).map(([key, val]) => (
                      <tr key={key}><td>{val.name}</td><td>{val.factor.toFixed(4)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="calculator-info">
            <div className="info-card">
              <h4><span className="info-title-icon">{icons.building}</span> Beton Markası</h4>
              <ul>
                {concreteGrades.slice(0, 6).map((grade) => (
                  <li key={grade.id}><strong>{grade.id}:</strong> {grade.name.split(' - ')[1]}</li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <h4><span className="info-title-icon">{icons.phone}</span> Kömək lazımdır?</h4>
              <p>Layihəniz üçün dəqiq hesablama və məsləhət üçün mütəxəssislərimizlə əlaqə saxlayın.</p>
              <a href="tel:+994501234567" className="info-phone">+994 50 123 45 67</a>
            </div>
            <div className="info-card">
              <h4><span className="info-title-icon">{icons.truck}</span> Çatdırılma</h4>
              <p>Novxanı Beton olaraq bütün Bakı və Abşeron ərazisində çatdırılma xidməti təklif edirik.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
