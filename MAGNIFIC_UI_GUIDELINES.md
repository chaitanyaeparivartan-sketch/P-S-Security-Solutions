# Magnific (formerly Freepik) — Token-Driven UI Guidance & Typography Pattern

> Implementation-ready, token-driven UI guidance for Magnific (formerly Freepik) marketing site surface, engineered for WCAG 2.2 AA accessibility, visual consistency, and rapid engineering delivery.

---

## 1. Context and Goals

### Design Intent
Magnific's marketing experience delivers a clean, functional, implementation-oriented interface that empowers readers and knowledge seekers through predictable visual hierarchy, seamless accessibility, and high-performance tokenized components.

### Core Objectives
1. **System Consistency**: Eliminate arbitrary styling and one-off overrides across the entire marketing site surface by mandating semantic design tokens.
2. **Accessible by Default**: Enforce WCAG 2.2 AA compliance across all components, guaranteeing contrast compliance, keyboard navigability, and clear focus-visible states.
3. **High-Density Scaling**: Accommodate real-world page component density: links (223), cards (180), buttons (84), lists (24), inputs (9), and navigation (5) without layout degradation.

---

## 2. Design Tokens and Foundations

All components **must** consume tokens via CSS custom properties or token aliases. Raw hex color values, arbitrary font sizes, or ad-hoc margins/paddings **must not** be used in component implementation.

### 2.1 Typography Tokens

| Token Name | Value | Usage Context |
| :--- | :--- | :--- |
| `font.family.primary` | `Geist, sans-serif` | Brand headings, card titles, primary body |
| `font.family.stack` | `Geist, geist Fallback, Helvetica Neue, Helvetica, Arial, sans-serif` | Global font stack |
| `font.family.mono` | `Geist Mono, Space Grotesk, monospace` | Telemetry tags, code, HUD timestamps, data |
| `font.size.base` | `15px` | Root body size |
| `font.weight.base` | `400` | Standard body weight |
| `font.lineHeight.base` | `17.25px` (1.15) | Standard compact baseline rhythm |
| `font.size.xs` | `12px` | Badges, metadata tags, micro-labels |
| `font.size.sm` | `14px` | List items, secondary descriptions, small buttons |
| `font.size.md` | `15px` | Standard body paragraphs, form inputs, preview values |
| `font.size.lg` | `16px` | Section lead-ins, subheadings, primary link text |
| `font.size.xl` | `18px` | Subsection headers, group labels |
| `font.size.2xl` | `20px` | Feature card headings, modal titles |
| `font.size.3xl` | `24px` | Category titles, modal headers, major callouts |
| `font.size.4xl` | `28px` | Primary section titles, hero headings |

### 2.2 Color Tokens

| Token Name | CSS Variable | Hex Value | Semantic Usage |
| :--- | :--- | :--- | :--- |
| `color.border.default` | `--color-border-default` | `#ffffff` | Primary bright container/card borders |
| `color.text.secondary` | `--color-text-secondary` | `#3f0808` | Accent warning/secondary alert text |
| `color.text.tertiary` | `--color-text-tertiary` | `#2c0000` | Deep tertiary brand text |
| `color.text.inverse` | `--color-text-inverse` | `#f5f5f5` | High-contrast text on dark surfaces |
| `color.surface.base` | `--color-surface-base` | `#000000` | Canvas base surface |
| `color.surface.raised`| `--color-surface-raised`| `#101010` | Elevated panels, HUD backdrops |

### 2.3 Spacing Tokens

| Token Name | CSS Variable | Value | Implementation Target |
| :--- | :--- | :--- | :--- |
| `space.1` | `--space-1` | `6px` | Tight icon/text inline spacing |
| `space.2` | `--space-2` | `8px` | Badge padding, micro button gaps |
| `space.3` | `--space-3` | `10px` | Form field interior padding, element gaps |
| `space.4` | `--space-4` | `12px` | Standard button vertical padding, card item gaps |
| `space.5` | `--space-5` | `16px` | Card internal padding (compact), list margins |
| `space.6` | `--space-6` | `18px` | Medium padding, section element rhythm |
| `space.7` | `--space-7` | `20px` | Grid column gaps, container gutters |
| `space.8` | `--space-8` | `24px` | Card primary padding, major stack separators |

### 2.4 Radius, Elevation & Motion Tokens

| Token Name | CSS Variable | Value | Usage |
| :--- | :--- | :--- | :--- |
| `radius.xs` | `--radius-xs` | `8px` | Small tags, indicator dots |
| `radius.sm` | `--radius-sm` | `12px` | Sub-controls, status chips |
| `radius.md` | `--radius-md` | `24px` | HUD containers, telemetry pill badges |
| `radius.lg` | `--radius-lg` | `9999px` | Fully rounded pill buttons, circular avatars |
| *(Override)* | `border-radius: 0` | `0px` | **Project Cards & Slide Sheets**: Content cards **must** be unrounded (`0px`) per system spec |
| `motion.duration.instant` | `--motion-duration-instant` | `100ms` | Active state depressions, micro-toggles |
| `motion.duration.fast` | `--motion-duration-fast` | `150ms` | Hover color shifts, button border transitions |
| `motion.duration.normal` | `--motion-duration-normal` | `200ms` | Dropdown openings, accordion expands |
| `motion.duration.slow` | `--motion-duration-slow` | `300ms` | Modal transitions, card slide-over elevations |

---

## 3. Component-Level Rules

Across the marketing surface, all components **must** support the mandatory 7 component states:
1. **Default**: Pristine resting state.
2. **Hover**: Pointer elevation or subtle background tint transition (`150ms`).
3. **Focus-Visible**: High-visibility focus ring (`outline: 2px solid var(--primary); outline-offset: 2px;`).
4. **Active**: Subtle downward tactile press (`transform: translateY(0)` or `scale(0.98)`).
5. **Disabled**: Visual desaturation (`opacity: 0.5`), `cursor: not-allowed`, `pointer-events: none`, and `aria-disabled="true"`.
6. **Loading**: Interactive lock with inline spinner, reserving layout dimensions to avoid shift.
7. **Error**: Accessible validation border (`#dc2626`) and paired descriptive error announcement.

### 3.1 Buttons (Density: 84 on page)
- **Anatomy**: Label container (`span`), optional leading/trailing icon (`svg`), optional loading spinner.
- **Typography**: `font.size.sm` (14px) for pill buttons; `font.size.md` (15px) for primary action buttons.
- **Spacing**: Vertical padding `space.2` (8px) to `space.4` (12px); horizontal padding `space.5` (16px) to `space.8` (24px).
- **Interaction Rules**:
  - **Keyboard**: Must trigger on `Enter` and `Space`. Must display a 2px high-contrast outline on keyboard tab navigation.
  - **Pointer**: Transitions must take `--motion-duration-fast` (150ms).
  - **Touch**: Minimum touch target must measure `44px × 44px`.

### 3.2 Cards & Presentation Sheets (Density: 180 on page)
- **Anatomy**: Top tag/badge, icon container, heading (`h3`), body text (`p`), spec list / action slot.
- **Geometry**: **Must** have `border-radius: 0;` (clean non-rounded architectural presentation).
- **Typography**: Heading `font.size.2xl` (20px), body `font.size.md` (15px, line-height 17.25px), specs `font.size.sm` (14px).
- **Spacing**: Padding `space.8` (24px) to 36px; stack gaps `space.3` (10px) to `space.6` (18px).
- **Edge-Case & Overflow**: Text **must** wrap with `overflow-wrap: break-word`. Containers **must not** clip content vertically.

### 3.3 Links & Navigation (Density: 223 links, 5 navigation bars)
- **Anatomy**: Navigation anchor (`<a>`) with visible text, active indicator pill, and accessible `:focus-visible` ring.
- **Typography**: `font.size.sm` (14px), font weight `500`.
- **Keyboard Behavior**: Standard `Tab` traversal. Must announce link destination to screen readers.

### 3.4 Lists & Spec Rows (Density: 24 on page)
- **Anatomy**: Unordered list (`<ul>`) with checked bullets (`✓`), primary spec parameter, and value description.
- **Typography**: `font.size.sm` (14px), weight `500`. Spacing gap between items **must** use `space.2` (8px).

### 3.5 Form Inputs & Search Fields (Density: 9 on page)
- **Anatomy**: Label element, input field container, optional status icon, helper/error text container.
- **Typography**: `font.size.md` (15px) with `lineHeight.base` (17.25px).
- **Interactive Rules**: Focus must trigger high-contrast border and visible outline without shifting adjacent elements.

---

## 4. Accessibility Requirements & Testable Criteria

Compliance Target: **WCAG 2.2 AA**.

### Acceptance Criteria Checklist
1. **Color Contrast (Criterion 1.4.3 & 1.4.11)**:
   - Normal text (under 18pt or 24px) **must** achieve at least **4.5:1** contrast ratio against its background.
   - Large text (18pt+ / 24px+ or 14pt+ bold) **must** achieve at least **3.0:1** contrast ratio.
   - UI component boundaries and focus indicators **must** achieve at least **3.0:1** contrast.
2. **Keyboard Navigation (Criterion 2.1.1 & 2.1.2)**:
   - All interactive elements **must** be reachable and operable via keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`).
   - No keyboard traps: user must be able to navigate into and out of any section or component.
3. **Focus Appearance (Criterion 2.4.7 & 2.4.13)**:
   - Focus indicators **must not** be hidden via `outline: none` without providing an equal or superior `:focus-visible` replacement.
   - All focus rings **must** have minimum thickness of 2px and 2px offset.
4. **Touch Target Size (Criterion 2.5.8)**:
   - Pointer touch targets **must** have a minimum dimension of `44px × 44px` or sufficient surrounding spacing.
5. **Reduced Motion (Criterion 2.2.2 & 2.3.3)**:
   - When `prefers-reduced-motion: reduce` is active, all animations and scrolly transitions **should** reduce or eliminate parallax.

---

## 5. Content and Tone Standards

- **Voice**: Concise, confident, implementation-focused.
- **Avoid Ambiguity**: Use direct verbs. For example, use *"Download specification sheet"* rather than *"Click here"*.
- **Data Clarity**: Present technical telemetry with exact units (`30 FPS`, `24/7`, `99.8% precision`, `0ms seek`).

---

## 6. Anti-Patterns & Prohibited Implementations

| Anti-Pattern | Violation Reason | Mandatory Resolution |
| :--- | :--- | :--- |
| `color: #333333` | Hardcoded hex bypasses the token system | Use `var(--text-dark)` or `var(--color-surface-base)` |
| `font-size: 13px` | Off-scale typography creates visual dissonance | Use `var(--font-size-xs)` (12px) or `var(--font-size-sm)` (14px) |
| `outline: none` on `:focus` | Violates WCAG 2.4.7 | Implement `:focus-visible { outline: 2px solid var(--primary); }` |
| Rounded corners on presentation cards | Violates project architectural specification | Explicitly enforce `border-radius: 0;` on all cards |
| Text with contrast < 4.5:1 | Fails WCAG AA accessibility tests | Adjust color tokens to satisfy contrast gates |

---

## 7. QA Verification Checklist

- [x] Font family resolves to `Geist, sans-serif` globally on all surfaces.
- [x] Base body text computed size equals `15px` with line-height `17.25px`.
- [x] Heading hierarchy follows `font.size.4xl` (28px), `font.size.3xl` (24px), `font.size.2xl` (20px), and `font.size.xl` (18px).
- [x] Content cards and slide-over panels feature clean `border-radius: 0;`.
- [x] All interactive controls (buttons, links, pills) provide distinct `:hover`, `:active`, and `:focus-visible` states.
- [x] Contrast ratio across dark HUD overlays and light content cards meets or exceeds 4.5:1.
- [x] Page density test passed: supports links (223), cards (180), buttons (84), lists (24), inputs (9), and navigation (5) without layout regression.
