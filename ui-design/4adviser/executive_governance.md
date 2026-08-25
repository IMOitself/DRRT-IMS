---
name: Executive Governance
colors:
  surface: '#faf8ff'
  surface-dim: '#dbd9e0'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3fa'
  surface-container: '#eaedff'
  surface-container-high: '#e9e7ee'
  surface-container-highest: '#e3e1e8'
  on-surface: '#131b2e'
  on-surface-variant: '#434654'
  inverse-surface: '#2f3035'
  inverse-on-surface: '#f2f0f7'
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
  secondary-container: '#d4e3ff'
  on-secondary-container: '#56657c'
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
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#b8c7e2'
  on-secondary-fixed: '#0c1c30'
  on-secondary-fixed-variant: '#39485e'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59b'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#812800'
  background: '#faf8ff'
  on-background: '#1a1b20'
  surface-variant: '#e3e1e8'
  executive-gold: '#D4AF37'
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

The design system establishes an **Executive-tier** layer atop the established operational foundation. It shifts the personality from "active responder" to "authoritative overseer," catering to an audience that demands high-stakes precision, governance auditing, and strategic clarity. The aesthetic is **Corporate / Modern** with a focus on high-density data visualization and institutional prestige.

The visual narrative is built on three pillars:
- **Sophistication:** Utilizing refined accents to distinguish advisor-level security and governance functions.
- **Precision:** A "data-first" approach that prioritizes high-contrast readability and grid-aligned structure for auditing.
- **Authority:** A calm, stable environment that evokes a sense of control and ultimate accountability.

## Colors

The palette leverages the core operational blue while introducing a refined **Executive Gold (#D4AF37)**. This gold is a "reserved" color, utilized strictly for security indicators, authoritative badges, and high-tier advisor status markers. It must never be used for primary actions or decorative elements to maintain its functional significance.

- **Primary Blue (#0052cc):** Used for navigation, primary utility, and core branding.
- **Executive Gold (#D4AF37):** Reserved for verification checkmarks, security clearance levels, and governance "Audit Passed" states.
- **Data Neutrals:** A range of cool grays and light surfaces ensure that complex data tables and analytics remain the focal point without visual noise.
- **Readability:** Maintain a minimum 4.5:1 contrast ratio for all analytical data points and 7:1 for critical security indicators.

## Typography

The dual-font strategy pairs the technical precision of **Geist** with the universal legibility of **Inter**. Geist serves as the "analytical" voice, used for headers, KPIs, and status labels. Inter provides a neutral, efficient vessel for auditing logs, reports, and governance documentation.

- **Headlines:** Use Geist for a "monospaced-adjacent" feel that suggests technical accuracy.
- **Body & Data:** Inter is the workhorse for dense data tables and long-form advisory notes.
- **Security Labels:** Small-caps Geist is preferred for security badges to reinforce an institutional, official tone.

## Layout & Spacing

The design system utilizes a **Fluid Grid** model with a high-density rhythm to accommodate complex executive dashboards. 

- **Desktop (12-column):** Optimized for wide-screen auditing views. Use 32px margins to provide "executive breathing room" around the central data density.
- **Mobile (4-column):** Simplifies data into single-column stacks with 16px margins, focusing on critical security alerts and high-level summaries.
- **Rhythm:** A 4px baseline unit governs all spacing. Vertical rhythm in data tables should be tight (`8px` or `12px` row padding) to allow for maximum information visibility without scrolling.

## Elevation & Depth

This design system uses **Tonal Layers** and **Low-contrast Outlines** to convey hierarchy. It avoids heavy shadows to maintain a clean, flat aesthetic that feels like a professional auditing tool rather than a consumer app.

- **Level 0 (Base):** The neutral background (#faf8ff) serves as the canvas.
- **Level 1 (Cards):** Primary containers use a pure white background with a 1px #E2E8F0 border.
- **Level 2 (Active/Audit Focus):** Elements under immediate review or hover use a subtle 4px blur shadow with 5% opacity to gently lift the element from the grid.
- **Advisor Overlays:** Specialized advisor-only modals use a slightly thicker 2px border in Primary Blue to signal a separate governance context.

## Shapes

Adhering to the "ROUND_EIGHT" standard, the system uses a **Rounded** language that feels contemporary but professional.

- **Core Components:** Buttons, input fields, and standard cards use 0.5rem (8px).
- **Audit Badges:** Security and status indicators use 0.25rem (4px) to appear more "clinical" and precise.
- **Large Containers:** Dashboard widgets and main content areas may scale to 1rem (16px) to define major structural boundaries.

## Components

### Executive Security Indicators
Used exclusively for advisor-level clearance. These badges use a light gold tint background with dark gold Geist text and a gold border. A "Locked" icon or "Verified" checkmark should accompany these.

### Governance Audit Tables
High-density tables with Geist `label-sm` headers and Inter `body-sm` cell data. Rows should use a subtle zebra-stripe (Surface-Dim) for increased row-tracking during long audits.

### Buttons
- **Primary:** Solid #0052cc with white text. Used for "Approve," "Confirm," or "Submit."
- **Governance Action:** Transparent with a 1px Executive Gold border and gold text, reserved for "Authorize Security" or "Override Audit."

### Cards
- **Executive KPI Cards:** Feature a top-aligned gold accent bar (2px) if the metric relates to security or high-level governance.
- **Data Cards:** Simple white surfaces with 8px radius and 1px outline-variant borders.

### Input Fields
Strictly professional with 1px borders that become Primary Blue on focus. Error states use a 1px red border, while "Verified" advisor inputs use a subtle gold focus ring.