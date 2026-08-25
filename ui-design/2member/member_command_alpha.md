---
name: Member Command Alpha
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e1e7ff'
  surface-container-highest: '#dae2fc'
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
  secondary-container: '#d4e3ff'
  on-secondary-container: '#56657c'
  tertiary: '#7b2600'
  on-tertiary: '#ffffff'
  tertiary-container: '#9b3d16'
  on-tertiary-container: '#ffc6b3'
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
  on-tertiary-fixed-variant: '#802a03'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fc'
  compliance-green: '#16a34a'
  compliance-yellow: '#ca8a04'
  compliance-red: '#dc2626'
  premium-gradient-start: '#0052cc'
  premium-gradient-end: '#002d70'
  progress-ring-track: '#eaedff'
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

The design system evolves the operational rigor of the command center into a **Member-Centric** experience that balances professional authority with a warm, welcoming accessibility. The personality is defined as "Reliable Guardian"—a system that feels both institutional and deeply personal.

The design style is **Corporate / Modern** with **Glassmorphic** accents. It retains the structured precision required for operational data but softens the edges with subtle gradients and translucent layers for member-facing elements like Digital IDs. This approach ensures the member feels "looked after" rather than just "processed," moving from a purely utilitarian aesthetic to one that feels premium and supportive.

## Colors

The palette centers on **Primary Blue (#0052cc)**, signaling continuity and trust. To move toward a member-centric tone, we introduce a tiered semantic system and soft gradients.

- **Semantic Compliance:** High-contrast Green, Yellow, and Red are strictly mapped to member status, certifications, and urgent notifications. These use saturated values to ensure instant recognizability against the light neutral surfaces.
- **Member Premium Accents:** A deep-blue gradient (Primary to Dark Primary) is reserved for the Member ID and milestone progress, creating a sense of "earned" status.
- **Progress Gradients:** Circular progress indicators utilize a soft linear gradient from Primary Blue to a lighter sky-blue to make data visualization feel dynamic and encouraging.

## Typography

This system maintains the high-precision dual-font strategy. **Geist** provides the technical backbone for headers and metadata, while **Inter** ensures that long-form member information and instructions remain highly readable.

To achieve a warmer tone, headlines use slightly more generous line heights and sentence-case capitalization. Labels in Geist should be used for all data-driven metrics to maintain an "official" feel. On mobile, headlines scale down to prevent fragmentation of the card-based layout, ensuring clear entry points for every user flow.

## Layout & Spacing

The layout utilizes a **Fluid Grid** model centered on a 4px baseline. 

- **Desktop:** A 12-column grid focused on a dashboard view where the Member ID card is a persistent anchor in the sidebar or top header.
- **Mobile:** A 4-column grid optimized for a single-stack card layout. Every "task" or "status" is contained within a discrete card to improve touch targets and visual grouping.
- **Rhythm:** Use `lg` (24px) padding for external card margins to create a sense of breathability, while `md` (16px) is the standard for internal element spacing.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and subtle **Ambient Shadows**. The background uses a soft off-white (`#faf8ff`) to reduce eye strain.

- **Level 1 (Cards):** Surfaces are white with a very thin, low-opacity outline.
- **Level 2 (Premium/ID Cards):** These use a medium, tinted shadow that matches the primary blue hue (e.g., 15% opacity blue shadow) to make the ID feel like it is physically floating above the interface.
- **Glassmorphism:** Navigation bars and sticky headers on mobile use a 20px backdrop blur with 80% opacity, allowing the member's scroll position to be felt without sacrificing text legibility.

## Shapes

The shape language is **Rounded** (0.5rem base) to provide a friendly, modern interface that avoids the starkness of operational military-grade software.

- **Standard Elements:** Buttons and input fields use 8px (`rounded-md`).
- **Member ID & Progress Containers:** These use 1rem (`rounded-lg`) or 1.5rem (`rounded-xl`) to signify a "special" status and to better contain complex inner layouts like profile photos and QR codes.
- **Progress Rings:** Always use "full" rounding for stroke caps to maintain a soft, approachable visual language.

## Components

### Digital ID Card
The centerpiece of the member experience. It features a Primary-to-Dark-Blue gradient background, white Geist typography, and a subtle "internal glow" border. It includes the member’s profile photo (circular), a unique ID number, and a live "Compliance Status" badge.

### Progress Rings
Used for tracking certification completion or tenure milestones. These utilize a dual-tone gradient stroke on a light neutral track. The center of the ring displays the percentage in `label-md` Geist.

### Status Indicators
- **Compliance Badges:** High-contrast pills. Green indicates "Current," Yellow "Expiring Soon," and Red "Non-Compliant." They use white text on the semantic background for maximum pop against white cards.

### Member-Centric Cards
Used for task lists and news. Each card has a white background, 8px corner radius, and a 1px `outline-variant` border. On hover (Desktop) or press (Mobile), they transition to a Level 2 elevation with a subtle blue-tinted shadow.

### Primary Buttons
Large, 48px height for mobile accessibility. They use the solid Primary Blue with white text, using `label-md` weight to ensure the action is commanding but professional.