# Web/Frontend - Security & Accessibility Audit Report
**Date:** April 23, 2026  
**Scope:** Web/frontend codebase comprehensive audit

---

## Executive Summary

This audit identified **4 major issue categories** across the Web/frontend codebase with **77 total findings**. Issues range from responsive design concerns to accessibility gaps and typography inconsistencies.

---

## 1. RESPONSIVE BREAKPOINT ISSUES: "hidden md:flex"

**Finding Count:** 24 instances  
**Severity:** MEDIUM  
**Category:** Responsive Design

### Issue Description
The pattern `hidden md:flex` hides elements on mobile and shows only on medium+ screens. This can cause content loss on smaller devices or uneven UX.

### Affected Components

| File | Line | Code Snippet | Issue |
|------|------|------|-------|
| [components/Navbar.tsx](components/Navbar.tsx) | 59 | `<nav className="hidden md:flex items-center gap-1 lg:gap-2">` | Desktop nav hidden on mobile with no mobile fallback visible |
| [app/acerca-de/components/HistorySection.tsx](app/acerca-de/components/HistorySection.tsx) | 62 | `<div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full..."` | Timeline dot hidden on mobile devices |
| [app/admin/components/layout/AdminHeader.tsx](app/admin/components/layout/AdminHeader.tsx) | 36 | `<div className="hidden md:flex flex-1 max-w-md mx-8">` | Search bar hidden on mobile admin interface |

### Recommendation
- Ensure mobile-friendly alternatives exist for hidden elements
- Verify mobile menu implementation is present for navbar
- Test responsive behavior on actual mobile devices (320px - 768px)

---

## 2. TEXT JUSTIFICATION USAGE

**Finding Count:** 50+ instances  
**Severity:** MEDIUM  
**Category:** Typography / Accessibility

### Issue Description
Justified text (`text-align: justify`) can create awkward spacing on narrow screens and may reduce readability, especially with longer words.

### Affected Components

| File | Line | Class Usage | Notes |
|------|------|------|-------|
| [app/globals.css](app/globals.css) | 96-97 | Global `p` element rule | `text-align: justify; text-justify: inter-word;` |
| [components/ui/ServiceHeroClean.tsx](components/ui/ServiceHeroClean.tsx) | 45 | `text-justify` | Hero text justified |
| [app/components/PressCards.tsx](app/components/PressCards.tsx) | 114 | `text-justify` | Press card descriptions |
| [app/components/NewsCards.tsx](app/components/NewsCards.tsx) | 97 | `text-justify` | News description text |
| [app/components/TrainingCenterSection.tsx](app/components/TrainingCenterSection.tsx) | 72, 168 | `text-justify` | Training section copy |
| [app/components/ContactSection.tsx](app/components/ContactSection.tsx) | 55 | `text-justify` | Contact form text |
| [app/noticias/page.tsx](app/noticias/page.tsx) | 142 | `text-justify` | News page content |
| [app/not-found.tsx](app/not-found.tsx) | 17 | `text-justify` | 404 error message |
| [app/prensa/[title]/page.tsx](app/prensa/[title]/page.tsx) | 167 | Prose modifier | Article content |

### Recommendation
- Replace global `text-justify` with `text-left` or `text-center` depending on context
- Use `md:text-justify` only for wider screens (>1024px) if design requires it
- Test readability on mobile devices (word spacing shouldn't exceed 2-3x normal)
- Consider using `hyphens: auto` CSS for better word breaking

---

## 3. TYPO: "Positivio" → "Positivo"

**Finding Count:** 27 instances  
**Severity:** HIGH  
**Category:** Content Quality / Brand

### Issue Description
Misspelled word "Positivio" (missing accent or wrong spelling) appears in social media icon filenames. Should be "Positivo" (Spanish for "Positive").

### Affected Files

| File | Line | Asset Path | Count |
|------|------|------|-------|
| [app/components/data/homeData.ts](app/components/data/homeData.ts) | 52 | `/web/image/icon/Iconos_Redes/Linkedin_PositivioStroke@2x.png` | 1 |
| [app/components/data/homeData.ts](app/components/data/homeData.ts) | 59 | `/web/image/icon/Iconos_Redes/Facebook_PositivioStroke@2x.png` | 1 |
| [app/components/data/homeData.ts](app/components/data/homeData.ts) | 66 | `/web/image/icon/Iconos_Redes/Instagram_PositivioStroke@2x.png` | 1 |
| Build artifacts | Multiple | Same paths repeated in compiled JS | 24 instances |

### Recommendation
1. **Rename asset files** on backend storage:
   - `Linkedin_PositivioStroke@2x.png` → `Linkedin_PositivoStroke@2x.png`
   - `Facebook_PositivioStroke@2x.png` → `Facebook_PositivoStroke@2x.png`
   - `Instagram_PositivioStroke@2x.png` → `Instagram_PositivoStroke@2x.png`

2. **Update paths in source**:
   ```typescript
   // app/components/data/homeData.ts
   icon: "/web/image/icon/Iconos_Redes/Linkedin_PositivoStroke@2x.png",
   ```

3. **Clear Next.js cache**: `rm -rf .next` and rebuild

---

## 4. IMAGES MISSING ALT ATTRIBUTES

**Finding Count:** 35+ instances  
**Severity:** HIGH  
**Category:** Accessibility (WCAG 2.1 Level A)

### Issue Description
HTML `<img>` tags without `alt` attributes fail accessibility compliance. Screen readers cannot identify image content.

### Critical Missing Alt Attributes

| File | Line | Code | Status |
|------|------|------|--------|
| [components/ui/WidersarForm.tsx](components/ui/WidersarForm.tsx) | 191-197 | `<img src={URL.createObjectURL(fileValue)} ... />` | ❌ Missing alt |
| [app/galeria/page.tsx](app/galeria/page.tsx) | 115 | `<img src={selected.path} alt={selected.filename} ...` | ✅ Has alt |
| [app/galeria/page.tsx](app/galeria/page.tsx) | 162 | `<img src={img.path} alt={img.filename} ...` | ✅ Has alt |
| [app/eventos/page.tsx](app/eventos/page.tsx) | 101, 176, 239 | Multiple `<img src={evento.imagen} alt={evento.titulo}` | ✅ Has alt |
| [app/components/PressCards.tsx](app/components/PressCards.tsx) | 138 | `<img src={String(item.image_url)} alt={item.title} ...` | ✅ Has alt |
| [app/admin/sub-servicio/components/SubServiceTable.tsx](app/admin/sub-servicio/components/SubServiceTable.tsx) | 27 | `<img src={s.heroImage} className="w-full h-full object-cover"/>` | ❌ Missing alt |
| [app/admin/sub-servicio/components/SubServicePreviewModal.tsx](app/admin/sub-servicio/components/SubServicePreviewModal.tsx) | 25 | `<img loading="lazy" src={data.heroImage} ... alt={data?.meta?.alt ...` | ✅ Has conditional alt |
| [app/admin/servicios/components/ServiceTable.tsx](app/admin/servicios/components/ServiceTable.tsx) | 21, 36 | Image previews with missing alt | ❌ Partially missing |
| [app/admin/servicios/components/ServicePageForm.tsx](app/admin/servicios/components/ServicePageForm.tsx) | 112 | `<img key={img} src={...} className="w-full h-20 object-cover rounded cursor-pointer"` | ❌ Missing alt |
| [app/admin/servicios/components/ServiceForm.tsx](app/admin/servicios/components/ServiceForm.tsx) | 166, 200, 215, 261, 273 | Multiple image previews | ❌ Missing alt |
| [app/admin/servicios/components/ServiceCard.tsx](app/admin/servicios/components/ServiceCard.tsx) | 22, 37 | Service card images | ❌ Missing alt |
| [app/admin/news/NewsCardList.tsx](app/admin/news/NewsCardList.tsx) | 108 | News image preview | ❌ Missing alt |
| [app/admin/press/PressCardList.tsx](app/admin/press/PressCardList.tsx) | 47 | Press image display | ❌ Missing alt |
| [app/admin/eventos/EventosCard.tsx](app/admin/eventos/EventosCard.tsx) | 29 | `<img src={imagen} alt={titulo}` | ✅ Has alt |
| [app/admin/ejecutivos/EjecutivosCard.tsx](app/admin/ejecutivos/EjecutivosCard.tsx) | 63+ | Executive photos | Mixed |

### Recommendation
For all `<img>` tags, add meaningful alt text:
```tsx
// ❌ Bad
<img src={imagePath} className="w-full h-full object-cover" />

// ✅ Good
<img 
  src={imagePath} 
  alt="Service category icon representing business consulting" 
  className="w-full h-full object-cover" 
/>

// ✅ Better (for decorative images)
<img 
  src={imagePath} 
  alt="" 
  aria-hidden="true"
  className="w-full h-full object-cover" 
/>
```

Prioritize:
1. Admin form images (SubServiceTable, ServiceForm, ServiceTable)
2. Gallery/Preview images (ServicePageForm)
3. Dynamic content in modals

---

## 5. NEWS COMPONENT API INTEGRATION

**Finding Count:** 1 component  
**Severity:** LOW  
**Category:** Robustness

### Component Details

**File:** [app/components/NewsCards.tsx](app/components/NewsCards.tsx)

```typescript
// API Endpoint
fetch(`${apiBase}/api/news`)

// Error Handling: ✅ Present
catch (err) {
  console.error('Error fetching news:', err);
}

// Fallback State: ✅ Skeleton Loading
{loading ? (
  <div className="grid md:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => <div key={i} className="h-96 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />)}
  </div>
) : ...}

// Empty State: ❌ Missing
// If news array is empty, no message shown to user
```

### Issue
No message displayed when no news items are returned from API.

### Recommendation
Add empty state handling:
```tsx
{loading ? (
  <SkeletonLoader />
) : news.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {news.map(...)}
  </div>
) : (
  <div className="text-center py-16">
    <p className="text-slate-500 dark:text-slate-400">
      No hay noticias disponibles en este momento.
    </p>
  </div>
)}
```

---

## 6. PRESS COMPONENT API INTEGRATION

**Finding Count:** 1 component  
**Severity:** LOW  
**Category:** Robustness

### Component Details

**File:** [app/components/PressCards.tsx](app/components/PressCards.tsx)

```typescript
// API Endpoint
fetch('/api/press')

// Error Handling: ✅ Present
catch (error) {
  console.error('Error fetching press:', error);
}

// Fallback State: ✅ PressSkeleton Component
const PressSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-800/90 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
          {/* Skeleton placeholders */}
        </div>
      ))}
    </div>
  );
};

// Empty State: ❌ Missing
// If press array is empty, no message shown
```

### Issue
No message displayed when no press items are returned.

### Recommendation
Add empty state handling similar to News component.

---

## 7. INTERACTIVE ELEMENTS BELOW 44×44PX WCAG MINIMUM

**Finding Count:** 50+ instances  
**Severity:** MEDIUM  
**Category:** Accessibility (Touch Target Size)

### Issue Description
WCAG 2.5.5 (Level AAA) recommends touch targets of at least 44×44 pixels. Many icon-only buttons use `w-4 h-4` or similar small sizes.

### Affected Patterns

| Pattern | Size | Elements | Risk Level |
|---------|------|----------|------------|
| `w-4 h-4` | 16px × 16px | 50+ icon elements | HIGH |
| `w-5 h-5` | 20px × 20px | 15+ icon elements | HIGH |
| `p-1` buttons | ~24px × 24px | Various controls | MEDIUM |
| `p-2` buttons | ~32px × 32px | Various controls | MEDIUM |

### Examples from Codebase

| File | Line | Element | Current Size | Usage |
|------|------|---------|----------|-------|
| [app/admin/usuarios/UserWizardForm.tsx](app/admin/usuarios/UserWizardForm.tsx) | 398 | `<Shield className="w-4 h-4" />` | 16px | Form icon |
| [app/admin/usuarios/UserCardList.tsx](app/admin/usuarios/UserCardList.tsx) | 130 | `<Edit2 className="w-4 h-4" />` | 16px | Edit button icon |
| [app/admin/usuarios/UserCardList.tsx](app/admin/usuarios/UserCardList.tsx) | 142 | `<Trash2 className="w-4 h-4" />` | 16px | Delete button icon |
| [app/admin/jobs/JobsList.tsx](app/admin/jobs/JobsList.tsx) | 175, 182, 204 | `<MapPin className="w-4 h-4" />` etc. | 16px | Info icons |
| [app/admin/internships/InternshipsList.tsx](app/admin/internships/InternshipsList.tsx) | 303, 318, 333 | Action icons | 16px | CRUD operations |

### Recommendation

**For icon buttons, wrap in clickable container:**
```tsx
// ❌ Too small
<button>
  <Trash2 className="w-4 h-4" />
</button>

// ✅ Better - 44px minimum touch target
<button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
  <Trash2 className="w-5 h-5" />
</button>

// ✅ Best - explicit size
<button 
  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
  aria-label="Delete item"
>
  <Trash2 className="w-5 h-5" />
</button>
```

**Strategy:**
1. Identify all interactive elements < 44px
2. Add padding (`p-2` = 32px, need `p-3` = 40px or higher)
3. Ensure visual focus indicators are clear
4. Test with touch devices and pointer precision tools

---

## 8. ADDITIONAL FINDINGS

### A. Next.js Image Component Best Practices
- **Status**: ✅ Mostly compliant
- **Notes**: Components use `OptimizedImage` wrapper and `next/image` correctly
- **Example**: [NewsCards.tsx](app/components/NewsCards.tsx) uses `OptimizedImage` with proper props

### B. Color Contrast
- **Status**: ⚠️ Not fully audited
- **Recommendation**: Run WCAG contrast checker on dark mode colors
- **Tool**: Use WebAIM Contrast Checker

### C. Keyboard Navigation
- **Status**: ⚠️ Not fully audited
- **Recommendation**: Test Tab key navigation through all interactive elements
- **Focus**: Admin panel CRUD buttons and forms

### D. Loading States
- **Status**: ✅ Generally well implemented
- **Examples**: 
  - [NewsCards.tsx](app/components/NewsCards.tsx) - Skeleton loader
  - [PressCards.tsx](app/components/PressCards.tsx) - PressSkeleton component

---

## Summary Table

| Category | Count | Severity | Action |
|----------|-------|----------|--------|
| Responsive Design (hidden md:flex) | 24 | MEDIUM | Verify mobile alternatives |
| Text Justification | 50+ | MEDIUM | Replace with left/center align |
| Typo (Positivio) | 27 | HIGH | Rename files & update paths |
| Missing Alt Text | 35+ | HIGH | Add descriptive alt attributes |
| Small Touch Targets | 50+ | MEDIUM | Wrap in larger clickable areas |
| News Empty State | 1 | LOW | Add fallback message |
| Press Empty State | 1 | LOW | Add fallback message |

---

## Priority Fix Order

### Phase 1 (Critical - Week 1)
1. Add alt attributes to all images
2. Fix "Positivio" typo and rebuild

### Phase 2 (High - Week 2)
1. Replace global `text-justify` rule
2. Increase touch target sizes for admin UI

### Phase 3 (Medium - Week 3)
1. Add empty state messages to News/Press components
2. Verify mobile responsive breakpoints

### Phase 4 (Nice to Have)
1. WCAG AA color contrast audit
2. Keyboard navigation testing

---

## Tools for Validation

```bash
# Accessibility testing
npx pa11y-ci

# Image optimization
npx next/image audit

# Responsive design testing
# Tools: Chrome DevTools, Responsively App, BrowserStack

# TypeScript strict checking
npx tsc --noEmit
```

---

## Contact & Follow-up

This audit should be reviewed quarterly as new components are added. Please reference this document when implementing fixes.

**Generated:** 2026-04-23  
**Framework:** Next.js 14 + React 18  
**Standards:** WCAG 2.1 Level AA
