---
name: Public Safety Portal
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fd'
  surface-container: '#ededf8'
  surface-container-high: '#e7e7f2'
  surface-container-highest: '#e1e2ec'
  on-surface: '#191b23'
  on-surface-variant: '#434654'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#f0f0fb'
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
  on-background: '#191b23'
  surface-variant: '#e1e2ec'
  status-success: '#16a34a'
  status-warning: '#ca8a04'
  status-critical: '#dc2626'
  map-evacuation: '#2563eb'
  map-assembly: '#059669'
  map-hazard: '#ea580c'
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
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
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
  unit: 4px
  gutter-desktop: 24px
  margin-desktop: 32px
  gutter-mobile: 16px
  margin-mobile: 16px
  section-gap: 48px
  stack-gap: 16px
---

## Brand & Style

The design system evolves the operational rigor of the command center into an **Informational & Welcoming** public-facing experience. While the underlying foundation remains rooted in institutional trust and reliability, the visual tone shifts toward clarity, accessibility, and reassurance. The target audience—students and the general public—requires a UI that feels supportive and easy to navigate during both routine information gathering and high-stress emergency scenarios.

The design style is **Corporate / Modern** with a lean toward **Minimalism**. It prioritizes high-contrast legibility, generous white space to reduce cognitive load, and a refined card-based architecture that feels approachable rather than technical. The atmosphere should feel calm and authoritative, replacing "operational density" with "instructional clarity."

## Colors

The palette is anchored by the established **Primary Blue (#0052cc)**, signaling official institutional presence. The color mode is strictly **light**, utilizing pure white surfaces to maximize contrast and instill a sense of cleanliness and calm.

Semantic colors are mapped to specific safety meanings:
- **Success (Green):** Indicates "Normal" status, resolved incidents, or safe zones.
- **Warning (Yellow):** Used for alerts, active monitoring, or precautionary instructions.
- **Critical (Red):** Reserved exclusively for active emergencies and immediate life-safety actions.

Interactive map symbology uses a distinct set of saturated hues to ensure visibility over complex cartographic backgrounds: **Evacuation Blue**, **Assembly Green**, and **Hazard Orange**.

## Typography

The typography system is unified under **Geist** to maintain a precise, modern, and highly legible technical character. The type scale is intentionally generous to ensure readability for a wide range of users, including those in high-stress situations.

- **Headlines:** Use Semi-Bold weights for clear section breaks. 
- **Body Text:** Uses the regular weight of Geist, providing a clean and contemporary alternative to traditional sans-serifs, ensuring instructional text is easy to scan.
- **Mobile Scaling:** Large headlines scale down aggressively on mobile to ensure critical alerts remain visible above the fold without excessive scrolling.

## Layout & Spacing

This design system utilizes a **Fixed Grid** for content-heavy pages to ensure readability, while the dashboard views utilize a **Fluid Grid** to maximize map real estate.

- **Desktop (12-column):** Centered container at 1280px max-width for informational pages. 24px gutters provide significant visual breathing room.
- **Mobile (4-column):** Full-width layout with 16px margins. 
- **Rhythm:** A 4px baseline grid governs all spacing. Use `section-gap` (48px) to separate distinct informational blocks and `stack-gap` (16px) for related items within a card or list.

## Elevation & Depth

To shift away from the "flat" operational feel, this design system uses **Ambient Shadows** and **Tonal Layers** to create a more intuitive, layered interface.

- **Base Layer:** The background is a very light neutral gray (#F8FAFC) to reduce glare.
- **Surface Layer:** White cards (#FFFFFF) use a subtle, 1px neutral outline (#E2E8F0) and a soft, diffused shadow (Y: 4px, Blur: 12px, Opacity: 0.05) to appear elevated and "tappable."
- **Alert Layer:** Emergency banners and high-priority alerts use high-saturation color fills with no shadows to maximize urgency and contrast against the soft base layers.

## Shapes

The shape language is **Rounded**, using a 0.5rem (8px) base radius. This softens the institutional tone of the platform, making it feel more like a modern service portal and less like a restricted government tool.

- **Interactive Elements:** Buttons and input fields use the base 8px radius.
- **Information Containers:** Content cards and map overlays use `rounded-lg` (16px) to create a friendly, contained appearance.
- **Full-Pill:** Used exclusively for tags and status chips to distinguish them from actionable buttons.

## Components

### Buttons
- **Primary:** Solid #0052CC with white text. High-contrast and easily identifiable.
- **Secondary:** Transparent with a 1px border. Used for secondary navigation or "Learn More" actions.
- **Emergency:** Large, bold red buttons with white text, reserved for "Report Emergency" or "Call Security."

### Public Alerts
- **Banners:** Full-width top banners that use the semantic color palette. Warning alerts use black text on yellow; Critical alerts use white text on red.
- **Pulse Indicators:** Interactive maps use a soft pulsing outer glow for "Current Hazard Zones" to draw attention without obstructing text.

### Interactive Map Symology
- **Evacuation Routes:** Bold, dashed lines in #2563eb with directional arrows.
- **Assembly Areas:** Circular icons in #059669 with a white "People" icon.
- **Hazard Zones:** Semi-transparent red or orange fills with a 2px solid border of the same color.

### Cards
- **Informational Cards:** White background, 16px radius, and 24px internal padding. Use `body-lg` for descriptions.
- **Action Cards:** Feature a Primary Blue icon and a bold `headline-md` title, used for quick links like "Campus Safety Plan."

### Input Fields
- Soft, 1px bordered fields that use a subtle background tint (#F1F5F9) to increase their perceived "hit area" and make them feel more approachable.