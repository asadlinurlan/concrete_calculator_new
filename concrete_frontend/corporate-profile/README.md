# NOVXANI BETON — Korporativ Profil (PDF)

Print-ready, 8 səhifəlik A4 korporativ profil. Bütün mətn həqiqi (seçilə bilən)
mətndir, əlaqə linkləri (telefon, e-poçt, sayt, WhatsApp) kliklənəndir, son
səhifədə sayt və WhatsApp üçün QR kodlar var. Dizayn novxanibeton.az saytının
vizual kimliyi (qrafit + kəhrəba + polad mavisi, Space Grotesk / Inter) üzərində
qurulub.

## Qovluq strukturu

```
corporate-profile/
├── generate.js              ← PDF-i yenidən yaradan ƏSAS əmr
├── data/
│   └── company.data.js      ← BÜTÜN MƏZMUN BURADADIR (mətn, əlaqə, şəkillər)
├── template/
│   ├── render.js            ← HTML strukturu (dizayn layeri, adətən toxunulmur)
│   └── profile.css          ← Vizual dizayn (rənglər, şriftlər, ölçülər)
├── assets/
│   ├── fonts/               ← Yerli brend şriftləri (latin-ext — AZ hərfləri)
│   ├── img/                 ← Avtomatik hazırlanan optimallaşdırılmış şəkillər
│   └── qr/                  ← Avtomatik yaradılan QR kodlar
├── tools/                   ← Köməkçi skriptlər (şəkil, QR, PDF, yoxlama)
└── out/
    ├── profile.html         ← Brauzerde baxıla bilən versiya
    └── NOVXANI-BETON-korporativ-profil.pdf
```

## PDF-i yenidən yaratmaq

`concrete_frontend` qovluğundan:

```bash
node corporate-profile/generate.js
```

Nəticə: `corporate-profile/out/NOVXANI-BETON-korporativ-profil.pdf`

Faydalı variantlar:

```bash
node corporate-profile/generate.js --html-only   # yalnız HTML (sürətli önbaxış)
node corporate-profile/tools/verify-pdf.js       # PDF yoxlaması (səhifə sayı, linklər, AZ hərflər, ölçü)
node corporate-profile/tools/screenshot-pages.js # hər səhifənin PNG şəkli (vizual yoxlama)
```

**Asılılıqlar.** Layihənin mövcud `puppeteer` və `sharp` paketlərindən istifadə
olunur. QR kodlar üçün `qrcode` paketi lazımdır — o, `package.json`-a
**toxunmadan** quraşdırılıb. Təmiz mühitdə (yeni klon) bir dəfə bunu icra edin:

```bash
npm install --no-save qrcode
```

## Məzmunu necə yeniləmək olar

Bütün mətn və əlaqə məlumatları **yalnız** `data/company.data.js` faylındadır —
dizaynı dəyişmədən redaktə edin və `generate.js`-i yenidən işə salın.

| Nəyi dəyişmək istəyirsiniz | Harada |
| --- | --- |
| Telefon, e-poçt, WhatsApp, ünvan | `contacts` bölməsi |
| QR kodların ünvanları | `qr` bölməsi (dəyişəndən sonra QR avtomatik yenilənir) |
| Üz qabığı şüarı / alt yazı | `company.tagline`, `company.taglineAccent`, `company.coverSubtitle` |
| Haqqımızda mətni, faktlar | `pages.about` |
| Beton markaları və təsvirləri | `pages.products.grades` |
| Xidmətlər | `pages.services.items` (`icon` üçün mövcud adlar: plant, truck, pump, schedule, night, scale, advice) |
| Materiallar | `pages.materials.items` |
| Keyfiyyət prosesi | `pages.quality` |
| B2B bölməsi | `pages.b2b` |
| Son səhifə CTA | `pages.contact` |
| PDF faylının adı | `output.pdfFileName` |

### Şəkilləri dəyişmək

`data/company.data.js` → `images` massivində hər şəklin mənbəyi (`source`,
layihə kökünə görə yol), kadrı (`crop` — orijinalın 0..1 hissələri), eni və
keyfiyyəti göstərilib. Yeni real foto əlavə etmək üçün `source` yolunu dəyişin
və `generate.js`-i işə salın — `sharp` şəkli avtomatik kiçildib optimallaşdırır.

> **Vacib:** hazırda anbarda yalnız **bir** təsdiqlənmiş real şirkət fotosu var
> (`src/app/Pages/Slider/img/slider4.jpg` — Novxanı zavodu). Profilin 4 şəkli
> həmin fotonun müxtəlif kadrlarıdır. Digər şəkillər (unsplash-* və s.) stok
> fotolardır və profildə bilərəkdən istifadə olunMAyıb. Diqqət:
> `slider3.jpg` və `calc2.webp` fayllarında başqa şirkətin (“The Concrete
> Company, Peterborough”, Böyük Britaniya) loqolu texnikası görünür — onları
> heç vaxt profilə əlavə etməyin. Zavodda qısa fotosessiya (mikserlər, tərəzi,
> laboratoriya, komanda) profili xeyli gücləndirər.

### Placeholder-lər (doldurulmalı yerlər)

Məzmunda çatışmayan faktlar `[[ikiqat mötərizə]]` ilə işarələnib və PDF-də
tünd-sarı kəsik-xətli çərçivə kimi görünür. `generate.js` hər buraxılışda qalan
placeholder-lərin siyahısını çap edir.

## Yoxlama siyahısı — hazırda placeholder olan bölmələr

- [ ] **Dəqiq küçə ünvanı** — `contacts.addressExtra` (səh. 8). Sayt yalnız
      “Novxanı, Bakı” deyir.
- [ ] **Qum fraksiyası / texniki göstəricilər** — `pages.materials.items[0].spec` (səh. 5)
- [ ] **Atsep fraksiyası / texniki göstəricilər** — `pages.materials.items[1].spec` (səh. 5)
- [ ] **Şeben fraksiyası / texniki göstəricilər** — `pages.materials.items[2].spec` (səh. 5)
- [ ] **Sertifikat adları və nömrələri** — `pages.quality.note` (səh. 6).
      Sənədlər təqdim olunanda əlavə edin; sənədsiz sertifikat iddiası yazmayın.

Placeholder olmayan, amma bilərəkdən kənarda saxlanılanlar: qiymətlər (fərdi
təklif modeli), bank/VÖEN rekvizitləri (ictimai sənəddə olmamalıdır), müştəri
adları və istehsal gücü (mənbə yoxdur), sosial şəbəkə linkləri (saytdakılar
generik placeholder-dir).

**Qeyd — üz qabığı şüarı:** sifarişlə “Möhkəm təməlin etibarlı ünvanı” yazılıb;
saytın öz hero şüarı isə “Beton və Tikinti Materiallarının Etibarlı Ünvanı”dır.
İstəsəniz `company.tagline`-da saytdakı varianta keçirin.

## Texniki qeydlər

- A4 portret, 8 səhifə; üz qabığından başqa bütün səhifələrdə nömrə var.
- Şriftlər `assets/fonts/` qovluğunda yerli saxlanılır (latin-ext — ə, ş, ğ, ı,
  İ, ö, ü, ç düzgün çıxır); PDF yaratmaq üçün internet lazım deyil.
  Şriftləri yeniləmək lazım olsa: `node corporate-profile/tools/fetch-fonts.js`.
- PDF ölçüsü hazırda ~1,5 MB (hədəf < 5 MB). Şəkil ölçülərini
  `data/company.data.js` → `images[].width` / `quality` ilə tənzimləyin.
- Veb saytın kodu, `package.json` və `package-lock.json` dəyişdirilməyib.
