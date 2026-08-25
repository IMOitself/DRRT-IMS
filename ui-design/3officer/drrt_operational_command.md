---
name: DRRT Operational Command
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434654'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#0c56d0'
  primary: '#003d9b'
  on-primary: '#ffffff'
  primary-container: '#0052cc'
  on-primary-container: '#c4d2ff'
  inverse-primary: '#b2c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#7b2600'
  on-tertiary: '#ffffff'
  tertiary-container: '#a33500'
  on-tertiary-container: '#ffc6b2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#0040a2'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59b'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#812800'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is engineered for operational efficiency, high-stakes reliability, and institutional trust. It balances the urgency of emergency response with the precision of a modern SaaS platform. The aesthetic is **Corporate / Modern**, emphasizing clarity over decoration to ensure that users can process critical information rapidly under pressure.

The UI utilizes a "functional-first" philosophy:
- **Operational:** Every element has a clear purpose; no superfluous ornamentation.
- **Secure:** A sense of stability is maintained through structured grids and a restrained color palette.
- **Reliable:** High legibility and consistent interaction patterns reduce cognitive load during crises.

## Colors
The color palette is built for semantic clarity. The **Primary Blue (#0052CC)** is used exclusively for primary actions and navigational highlights, signaling authority and competence. 

**Semantic colors** are strictly reserved for status indicators:
- **Success (Green):** Compliance, resolved incidents, or "all-clear" status.
- **Warning (Yellow/Orange):** Pending tasks, approaching deadlines, or escalating situations.
- **Critical (Red):** Emergency alerts, confidential markers, or system errors.

**Neutrals** utilize a slate-gray scale to provide professional contrast without the harshness of pure black, ensuring long-term usability during extended operational shifts.

## Typography
This design system employs a dual-font strategy. **Geist** is used for headlines and labels to provide a technical, high-precision feel that aids in rapid scanning of metadata and headers. **Inter** is used for all body text and data entry to ensure maximum readability across different screen resolutions.

- **Headlines:** Use Semi-Bold weights to establish clear content hierarchy.
- **Data/Labels:** Use Medium to Semi-Bold weights in Geist for status badges and KPIs.
- **Accessibility:** Ensure a minimum contrast ratio of 4.5:1 for all text elements.

## Layout & Spacing
The layout follows a **Fluid Grid** system based on a 4px baseline unit. 

- **Desktop:** 12-column grid with 24px gutters. Use for complex data dashboards and resource management.
- **Tablet:** 8-column grid with 16px gutters.
- **Mobile:** 4-column grid with 16px margins. Primary focus on single-column action lists and critical alerts.

Information density should be high but organized. Use `md` (16px) spacing for internal card padding and `lg` (24px) for spacing between major sections.

## Elevation & Depth
This design system uses **Tonal Layers** and **Low-contrast Outlines** to define hierarchy. In an operational context, excessive shadows can distract or muddy the interface.

- **Level 0 (Background):** Solid neutral gray (#F8FAFC) for the main application canvas.
- **Level 1 (Cards/Surfaces):** Pure white surfaces with a 1px border (#E2E8F0).
- **Level 2 (Hover/Active States):** Subtle, extra-diffused ambient shadow (0px 4px 6px -1px rgba(0, 0, 0, 0.1)) to indicate interactivity.
- **Overlays:** Modals and dropdowns use a darker border and a medium shadow to separate them from the operational layer.

## Shapes
The shape language is **Rounded** but restrained, avoiding the "pill-shaped" look of consumer-facing apps to maintain a professional, institutional tone.

- **Components:** Standard buttons, input fields, and cards use 0.5rem (8px) corner radius.
- **Small Elements:** Tooltips and small status badges use 0.25rem (4px).
- **Large Containers:** Modals or feature hero sections may use up to 1rem (16px) for a modern, contained feel.

## Components

### Buttons
- **Primary:** Solid #0052CC background with white text. 8px radius.
- **Secondary:** White background with #E2E8F0 border and #0F172A text.
- **Emergency Action:** Solid #EF4444 background, reserved for irreversible or critical life-safety actions.

### Status Badges
- Small, uppercase Geist labels with light tinted backgrounds (e.g., Success: 10% opacity Green background with 100% opacity Green text). 

### KPI Cards
- Large Geist Display numbers for metrics (e.g., "Active Responders").
- Bordered containers with a 1px #E2E8F0 stroke.
- Include a small trend indicator or timestamp in the bottom right using `label-sm`.

### Input Fields
- 1px neutral border that transitions to 2px Primary Blue on focus.
- Labels are always visible above the field in `label-md` Geist.

### Responsive Data Views
- Use tables for desktop with sticky headers.
- Switch to "Card-List" views for mobile, where each row becomes a 8px-rounded card for easier tap targets.