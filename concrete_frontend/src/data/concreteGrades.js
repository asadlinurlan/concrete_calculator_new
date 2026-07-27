/* ============================================================
   Concrete grade reference data — single source of truth
   Used by both the Products page and the Calculator.

   SOURCES / ASSUMPTIONS (tune these to your local supplier norms):
   • Grade ↔ class mapping (M-strength kgf/cm² ↔ B-class MPa) per
     GOST 26633 / Azerbaijan ready-mix practice.
   • Nominal mix proportions (cement : sand : gravel, by loose volume)
     follow the IS 456 nominal-mix ladder, adjusted so derived cement
     content stays in the realistic 190–520 kg/m³ band.
   • Dry-to-wet bulking factor DRY_FACTOR = 1.52 (typical 1.50–1.57):
     loose dry material volume needed for 1 m³ of compacted concrete.
   • Material densities (kg/m³): cement 1440 (bulk), sand 1600,
     gravel/aggregate 1500. Water-cement ratio (wc) per grade.
   All values are ESTIMATES for planning — confirm with a mix design
   for structural work.
   ============================================================ */

export const DRY_FACTOR = 1.52;
export const DENSITY = {
  cement: 1440, // kg/m³ (bulk, loose)
  sand: 1600,   // kg/m³
  gravel: 1500, // kg/m³
  concrete: 2400, // kg/m³ (normal-weight reinforced concrete)
};

// ratio = [cement, sand, gravel] by loose volume; wc = water/cement by mass
export const CONCRETE_GRADES = [
  { id: 'M100', bClass: 'B7.5', strength: 7.5,  ratio: [1, 4, 6],     wc: 0.62,
    name: { az: 'Asan işlər', en: 'Light-duty work', ru: 'Лёгкие работы' },
    use:  { az: 'Altlıq, döşəmə altı, hamarlama qatı', en: 'Blinding, sub-floor, levelling layer', ru: 'Подбетонка, основание пола, выравнивающий слой' } },
  { id: 'M150', bClass: 'B10',  strength: 10,   ratio: [1, 3, 5],     wc: 0.58,
    name: { az: 'Pilləkən, bordür', en: 'Stairs, kerbs', ru: 'Лестницы, бордюры' },
    use:  { az: 'Səki, bordür, yüngül döşəmə', en: 'Pavements, kerbs, light floor slabs', ru: 'Тротуары, бордюры, лёгкие стяжки' } },
  { id: 'M200', bClass: 'B15',  strength: 15,   ratio: [1, 2, 4],     wc: 0.55,
    name: { az: 'Ümumi tikinti', en: 'General construction', ru: 'Общестроительные работы' },
    use:  { az: 'Döşəmə, cığır, ümumi məqsədli', en: 'Floor slabs, paths, general purpose', ru: 'Полы, дорожки, общего назначения' } },
  { id: 'M250', bClass: 'B20',  strength: 20,   ratio: [1, 1.6, 3.2], wc: 0.52,
    name: { az: 'Təməl, divar', en: 'Foundations, walls', ru: 'Фундаменты, стены' },
    use:  { az: 'Zolaq təməl, daşıyıcı divar', en: 'Strip foundations, load-bearing walls', ru: 'Ленточный фундамент, несущие стены' } },
  { id: 'M300', bClass: 'B22.5',strength: 22.5, ratio: [1, 1.5, 3],   wc: 0.50,
    name: { az: 'Yüklü konstruksiya', en: 'Loaded structures', ru: 'Нагруженные конструкции' },
    use:  { az: 'Monolit təməl, plitə, sütun', en: 'Monolithic foundations, slabs, columns', ru: 'Монолитный фундамент, плиты, колонны' } },
  { id: 'M350', bClass: 'B25',  strength: 25,   ratio: [1, 1.3, 2.6], wc: 0.48,
    name: { az: 'Çoxmərtəbəli', en: 'Multi-storey buildings', ru: 'Многоэтажные здания' },
    use:  { az: 'Karkas, riqel, çoxmərtəbəli bina', en: 'Frames, beams (rigels), multi-storey buildings', ru: 'Каркасы, ригели, многоэтажные здания' } },
  { id: 'M400', bClass: 'B30',  strength: 30,   ratio: [1, 1.2, 2.4], wc: 0.45,
    name: { az: 'Körpü, tunel', en: 'Bridges, tunnels', ru: 'Мосты, тоннели' },
    use:  { az: 'Körpü, hidrotexniki, yüksək yük', en: 'Bridges, hydraulic structures, high loads', ru: 'Мосты, гидротехнические сооружения, высокие нагрузки' } },
  { id: 'M450', bClass: 'B35',  strength: 35,   ratio: [1, 1.1, 2.2], wc: 0.43,
    name: { az: 'Xüsusi konstruksiya', en: 'Special structures', ru: 'Специальные конструкции' },
    use:  { az: 'Xüsusi mühəndis konstruksiyaları', en: 'Special engineering structures', ru: 'Специальные инженерные конструкции' } },
];

export const getGrade = (id) =>
  CONCRETE_GRADES.find((g) => g.id === id) || CONCRETE_GRADES[2];

/**
 * Per-1-m³ material breakdown for a grade, derived from its nominal mix.
 * Returns kg + m³ for cement/sand/gravel and litres of water.
 */
export function materialsPerM3(grade) {
  const [c, s, g] = grade.ratio;
  const total = c + s + g;
  const cementVol = (DRY_FACTOR * c) / total;     // m³ per m³ concrete
  const sandVol = (DRY_FACTOR * s) / total;
  const gravelVol = (DRY_FACTOR * g) / total;
  const cementKg = cementVol * DENSITY.cement;
  return {
    cementKg,
    cementVol,
    sandKg: sandVol * DENSITY.sand,
    sandVol,
    gravelKg: gravelVol * DENSITY.gravel,
    gravelVol,
    waterL: cementKg * grade.wc,
  };
}

export const ratioLabel = (grade) => grade.ratio.join(' : ');
