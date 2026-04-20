# TipidMoto — Antigravity Design Language
**Version 1.0 | Internal Design Reference**

---

## What is Antigravity?

Antigravity is TipidMoto's design philosophy. It is built on a single tension: **motorcycle parts are heavy, metal, greasy, and earthbound — the marketplace should feel like the opposite.** Listings float. Cards lift on hover. Prices snap into view with weight, then release. The UI breathes upward.

This is not a decorative choice. It is strategic. The current alternatives — Facebook Groups, OLX, tiangge — feel cluttered, static, and suspicious. TipidMoto should feel like the parts themselves have been freed from the junkyard and placed in a clean, open space where you can actually see them. Trustworthy. Airy. Alive.

Antigravity does not mean weightless or toy-like. It means **controlled lift** — everything has mass, but nothing feels stuck.

---

## 1. Core Principles

### 1.1 Lift, Don't Float
Every interactive element should respond to the user's presence. Cards rise 3–4px on hover. Buttons push back with a subtle shadow bloom. The user should feel like they are reaching into the screen and the UI is meeting them halfway.

> Rule: No element that the user can interact with should be visually inert at rest.

### 1.2 Trust Through Clarity
Antigravity never sacrifices legibility for style. The Filipino motorcycle buyer is price-conscious and scam-aware. Every peso amount, every seller badge, every condition label must be immediately readable at a glance — even on a mid-range Android screen in direct sunlight.

> Rule: If a design choice makes the price or the verified badge harder to read, it is wrong.

### 1.3 One Anchor Per Page
Every page has exactly one visual anchor — the heaviest, most saturated element on screen. Everything else orbits it. On the marketplace, the anchor is the listing grid. On the dashboard, it is the stat row. On the item detail page, it is the price and the CTA button. Nothing competes with the anchor.

> Rule: Scan any page and name the anchor in under two seconds. If you cannot, the layout has too many anchors.

### 1.4 Warmth, Not Friendliness
The palette is warm — brick red, cream, warm ink — but the tone is not playful. TipidMoto is not a food delivery app. It is a marketplace for serious riders spending real money on real parts. Warm means trustworthy. It does not mean casual.

> Rule: No rounded avatars with confetti. No celebration animations on purchases. Dignity at every step.

### 1.5 The Filipino Context
Designs are tested against the following constraints:
- **Device:** Mid-range Android (Redmi, realme, Samsung A-series), 360–390px viewport
- **Connection:** LTE with intermittent drops; skeleton states are mandatory
- **Lighting:** Outdoors, bright sun — contrast ratios must exceed WCAG AA at all times
- **Language:** Filipino/English code-switching is natural — UI copy must support mixed-language reading patterns

---

## 2. Color System

### 2.1 Palette

| Token | Value | Role |
|---|---|---|
| `--red` | `#D0311A` | Primary action, prices, primary CTA |
| `--red-dark` | `#A82410` | Button hover state, pressed states |
| `--red-mid` | `#E8503A` | Logo accent, decorative highlights |
| `--red-light` | `#F5E6E3` | Error backgrounds, badge fills |
| `--ink` | `#1A1612` | Deep text, navbar background |
| `--ink-2` | `#2E2720` | Secondary dark surfaces, footer |
| `--ink-3` | `#4A3F36` | Tertiary dark text |
| `--stone` | `#7A6E66` | Secondary text, placeholders, metadata |
| `--dust` | `#B0A89E` | Disabled states, subtle borders |
| `--ash` | `#DDD8D3` | Card borders, dividers, inactive tabs |
| `--cream` | `#F5F1EC` | Page background |
| `--white` | `#FDFCFB` | Card surfaces, input backgrounds |
| `--gold` | `#C8922A` | Legit Partner badge, verification accents |
| `--gold-dark` | `#8A6218` | Gold text on light backgrounds |
| `--gold-light` | `#F5EDD6` | Legit Partner card tints |
| `--green` | `#1E7A4A` | Trust score, success states |
| `--green-light` | `#E3F2EB` | Success alert backgrounds |
| `--blue` | `#1A4FAD` | Info states, featured badge |
| `--blue-light` | `#E3EAFB` | Info alert backgrounds |

### 2.2 Color Rules

**Red is for action and price only.** The buyer's eye must be trained: red means "this costs money" or "click this." Using red for decorative elements breaks that contract. The only exceptions are the logo accent and error states.

**Gold is exclusively Legit Partner.** Every time gold appears — the badge, the card tint, the avatar ring, the stat card border — it communicates verified identity. Gold must never be used for generic decoration. This scarcity is what gives the badge its weight.

**Cream (#F5F1EC) is the page background, not white.** Pure white feels clinical and cold. The warm cream pulls the entire palette together and gives photographs of motorcycle parts a naturally warm, slightly aged quality — like a well-maintained bike, not a sterile showroom.

**Never use pure black (#000000).** All dark values come from the warm ink ramp. Cold blacks feel clinical and fight the warm palette.

### 2.3 Contrast Requirements

| Foreground | Background | Minimum Ratio |
|---|---|---|
| `--ink` | `--cream` | 12:1 (exceeds AAA) |
| `--ink` | `--white` | 13:1 |
| `--white` | `--red` | 4.8:1 (passes AA) |
| `--white` | `--ink` | 13:1 |
| `--gold-dark` | `--gold-light` | 5.2:1 (passes AA) |
| `--stone` | `--white` | 4.6:1 (passes AA) |

Note: `--dust` on `--white` does **not** pass AA and must never be used for body text. It is a border/divider color only.

---

## 3. Typography

### 3.1 Type Stack

**Display font: Syne**
- Source: Google Fonts (`font-family: 'Syne', sans-serif`)
- Weights used: 700 (bold), 800 (extrabold)
- Used for: All headings, the logo, navbar links, form labels, listing prices, button text, badge text, stat values, tab labels, section labels
- Rationale: Syne is geometric without being cold. It has a slight optical tension — letters sit close, feel deliberate — that communicates craft without pretension. It is distinctive enough to own.

**Body font: DM Sans**
- Source: Google Fonts (`font-family: 'DM Sans', sans-serif`)
- Weights used: 300 (light), 400 (regular), 500 (medium)
- Used for: Listing descriptions, seller bios, alert messages, chat bubbles, helper text, metadata, footer copy
- Rationale: DM Sans is highly legible at 13–15px even on low-resolution screens. Its slightly wide proportions make it comfortable for longer reads in Filipino/English mixed copy.

**Monospace: System mono**
- Used for: Price formatting in admin panel, API response previews, version strings
- Stack: `'Courier New', Courier, monospace`

### 3.2 Type Scale

| Name | Font | Size | Weight | Letter-spacing | Line-height | Use |
|---|---|---|---|---|---|---|
| `display-xl` | Syne | 48px | 800 | -0.04em | 1.0 | Hero headlines only |
| `display-lg` | Syne | 32px | 800 | -0.03em | 1.1 | Page titles, section heroes |
| `display-md` | Syne | 24px | 700 | -0.025em | 1.2 | Card section headers, item titles |
| `display-sm` | Syne | 18px | 700 | -0.02em | 1.3 | Subsection titles, dashboard labels |
| `body-lg` | DM Sans | 17px | 400 | 0 | 1.7 | Lead paragraphs, intro copy |
| `body-md` | DM Sans | 15px | 400 | 0 | 1.6 | Standard body text, descriptions |
| `body-sm` | DM Sans | 13px | 400 | 0 | 1.5 | Metadata, secondary info, timestamps |
| `label` | Syne | 11px | 700 | +0.12em | 1.0 | All-caps UI labels, section markers |
| `price` | Syne | 24–32px | 800 | -0.03em | 1.0 | Listing price, offer amounts |

### 3.3 Typography Rules

**Prices always use the `price` style, always in `--red`.** No exceptions. Sold items use `--stone`. Offer amounts in the negotiation UI use `--ink`.

**Section labels are always Syne 700, 11px, uppercase, +0.12em letter-spacing, `--stone`.** This pattern is the visual punctuation of the layout — it tells the user "a new zone is beginning." It must be consistent across every page.

**Maximum line length for body text is 68 characters (≈ 640px at 15px).** On wide viewports, body columns are constrained. Reading comfort matters more than filling horizontal space.

**Never use font-weight 600.** The system uses only 400 (regular), 500 (medium), 700 (bold), and 800 (extrabold). 600 is a muddy middle that weakens both the bold/regular contrast and the Syne/DM Sans pairing.

---

## 4. Spacing System

Base unit: **4px.** All spacing values are multiples of 4.

| Token | Value | Common use |
|---|---|---|
| `--space-1` | 4px | Icon-to-text gaps, tight badge padding |
| `--space-2` | 8px | Internal component padding (small), badge padding |
| `--space-3` | 12px | Between form elements, button padding (sm) |
| `--space-4` | 16px | Card internal padding (compact), grid gaps |
| `--space-6` | 24px | Card internal padding (standard), section sub-gaps |
| `--space-8` | 32px | Between components within a section |
| `--space-10` | 40px | Section padding (horizontal) |
| `--space-12` | 48px | Section padding (vertical), between major sections |
| `--space-16` | 64px | Hero vertical rhythm, large section gaps |

### Page Container

```
max-width: 1280px
padding: 0 40px (desktop)
padding: 0 20px (tablet, ≤768px)
padding: 0 16px (mobile, ≤480px)
```

### Grid System

The marketplace uses a **fluid 12-column grid** with 16px gutters.

| Viewport | Columns | Card layout |
|---|---|---|
| ≥1024px (desktop) | 12 | 4 listing cards per row (3 cols each) |
| 768–1023px (tablet) | 8 | 2 listing cards per row (4 cols each) |
| ≤767px (mobile) | 4 | 1 listing card per row (4 cols) |

---

## 5. Border Radius

| Token | Value | Used on |
|---|---|---|
| `--r-sm` | 6px | Navbar links, small chips, icon buttons |
| `--r-md` | 10px | Buttons, inputs, alerts, dropdown menus |
| `--r-lg` | 16px | Listing cards, info cards, modals, toast notifications |
| `--r-xl` | 24px | Hero image containers, page preview wrappers |
| `--r-pill` | 999px | Badges, pill buttons, quick-reply chips, count bubbles |

Rule: **Radius should increase as the component gets larger.** A small badge gets a pill. A large modal gets 24px. Applying pill radius to a full card makes it feel toy-like; applying 6px to a badge makes it feel rigid. Size and radius scale together.

---

## 6. Elevation & Shadow

Antigravity expresses depth through shadows. Three levels:

| Level | CSS | Used on |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgba(26,22,18,.08), 0 1px 2px rgba(26,22,18,.06)` | All cards at rest, inputs |
| `shadow-md` | `0 4px 12px rgba(26,22,18,.10), 0 2px 6px rgba(26,22,18,.06)` | Listing cards on hover, dropdowns |
| `shadow-lg` | `0 12px 32px rgba(26,22,18,.12), 0 4px 12px rgba(26,22,18,.08)` | Modals, floating panels, toast notifications |

All shadow values use warm ink (`#1A1612`) as the base color — never cold gray or pure black. This keeps shadows from fighting the warm palette.

**Hover lift pattern:** Cards move `translateY(-2px)` to `translateY(-4px)` on hover, paired with upgrading from `shadow-sm` to `shadow-md`. Transition: `200ms ease-out`. This is the physical expression of Antigravity — the thing rising to meet you.

---

## 7. Motion & Animation

Antigravity motion is **purposeful and brief.** No decorative looping animations. No full-page transitions. Motion communicates state, not personality.

### 7.1 Timing Tokens

| Token | Duration | Easing | Used for |
|---|---|---|---|
| `--motion-fast` | 120ms | `ease-out` | Button press, focus ring appearance |
| `--motion-base` | 200ms | `ease-out` | Hover lift, color transitions, border changes |
| `--motion-slow` | 300ms | `ease-in-out` | Modal open, toast slide-in, panel expand |
| `--motion-enter` | 400ms | `cubic-bezier(0.16,1,0.3,1)` | Page content stagger on load |

### 7.2 Interaction Patterns

**Card hover:** `transform: translateY(-2px)` + upgrade shadow. 200ms ease-out.

**Button hover:** `transform: translateY(-1px)` + shadow bloom on primary buttons. 120ms.

**Button press (`:active`):** `transform: translateY(0)` — returns to baseline. 80ms.

**Focus ring:** `box-shadow: 0 0 0 3px rgba(208,49,26,.15)` in red. Appears at 120ms. Never uses browser default outline — replaced universally with the red ring for consistency and brand alignment.

**Toast / alert slide-in:** Enter from `translateY(-12px)` at opacity 0 → rest position at opacity 1. 300ms `ease-in-out`.

**Modal open:** Backdrop fades in at 200ms. Modal panel enters at `translateY(8px)` → 0 at 300ms `cubic-bezier(0.16,1,0.3,1)`.

**Page load stagger:** On marketplace feed, listing cards enter with staggered opacity 0 → 1 with 60ms delays per card. Max 6 cards stagger; remaining load instantly to avoid long wait.

**Skeleton screens:** All loading states use a shimmer animation — `background: linear-gradient(90deg, --ash 25%, --cream 50%, --ash 75%)` moving left to right at 1.5s infinite. Never use spinning loaders.

### 7.3 Reduced Motion

All animations must respect `prefers-reduced-motion: reduce`. When reduced motion is active:
- Hover lifts are disabled (shadow still changes)
- Stagger animations are disabled (cards appear instantly)
- Modal and toast transitions use opacity only (no translate)
- Skeleton shimmer is replaced with a static `--ash` fill

---

## 8. Component Specifications

### 8.1 Navbar

**Applies to:** All pages — public, authenticated, dashboard, admin.

- Background: `--ink` always. Never transparent, never cream. The navbar is the one dark constant.
- Height: 62px (desktop), 54px (mobile)
- Logo: Syne 800, 19px, `--white` with `--red-mid` accent on "Moto"
- Nav links: Syne 600, 12px, `+0.04em`, `--dust` at rest → `--white` on hover, `--r-sm` background on hover
- Right side: changes based on auth state (see section 8.1a)
- Sticky: `position: sticky; top: 0; z-index: 100`
- Mobile: links collapse to hamburger menu at ≤768px

**Auth states (right side):**
- **Logged out:** Ghost "Log in" + Primary "Sign up" button
- **Logged in:** "+ Post listing" primary button + avatar circle (initials, `--red-light` background)
- **Admin:** Replace avatar with "Log out" ghost button; add "ADMIN" chip next to logo

**Inbox badge:** Red pill counter on "Inbox" nav link when unread messages exist. Syne 700, 10px, white text, `--red` background.

### 8.2 Listing Card

The listing card is the most repeated component on the site. Every pixel matters.

**Structure:**
```
┌─────────────────────────────┐
│  [Photo / placeholder]      │  160px tall
│  [Badge]                    │  absolute, top-left, 10px inset
├─────────────────────────────┤
│  Part title (display-sm)    │  truncate at 1 line
│  Meta: model · cat · city   │  body-sm, --stone
│  ₱ Price                    │  price style, --red
├─────────────────────────────┤
│  [Avatar] seller   [Score]  │  --cream background footer
└─────────────────────────────┘
```

**States:**
- **Default:** `shadow-sm`, white surface
- **Hover:** `translateY(-2px)`, `shadow-md`, 200ms
- **Legit Partner:** Gold-tinted image background (`--gold-light`), gold badge, gold avatar ring
- **Sold:** 65% opacity on entire card. Price switches to `--stone`. Sold badge replaces status badge.
- **Expired:** Same as Sold but badge reads "Expired" in gray.

**Trust score chip:** `--green-light` background, `--green` text, Syne 700, 11px, pill shape. Displayed as `+48` format.

### 8.3 Buttons

| Variant | Background | Text | Use |
|---|---|---|---|
| Primary | `--red` | `--white` | One per view. Main action only. |
| Secondary | `--ink` | `--white` | Browse, navigate, secondary actions |
| Outline | transparent + `--ash` border | `--ink` | Save, cancel, tertiary actions |
| Ghost | transparent | `--stone` | Cancel, log out, dismiss |
| Gold | `--gold` | `--white` | Legit Partner CTA only |

**Size variants:**
- `sm`: 8px/16px padding, 12px text
- `md` (default): 12px/24px padding, 13px text
- `lg`: 15px/32px padding, 15px text

All buttons use Syne 700 with `+0.02em` letter-spacing. Border radius `--r-md` (10px) for standard, `--r-pill` for pill variant.

### 8.4 Legit Partner Badge

The badge is the most important trust signal on the platform. It must be unmistakable.

**Appearance:**
- Background: `--gold-light`
- Border: 1px solid `#E5CC8A`
- Text: `--gold-dark` (`#7A5510`)
- Font: Syne 700, 10px, +0.10em, uppercase
- Icon: Hexagon outline (⬡) preceding the text
- Shape: `--r-pill`

**Appears on:**
1. Listing card — image overlay, top-left
2. Seller profile — below username
3. Search result card — same as listing card
4. Chat thread header — inline next to seller name
5. Admin user detail — inline next to username

**Absent-badge behavior:** Do not render a placeholder where the badge would be. The absence of the badge is itself a signal. Do not explain it.

### 8.5 Form Inputs

- Background: `--white`
- Border: 1.5px solid `--ash`
- Border radius: `--r-md` (10px)
- Padding: 10px 14px
- Font: DM Sans 400, 14px
- Focus: border becomes `--red`, `box-shadow: 0 0 0 3px rgba(208,49,26,.10)`
- Error: border becomes `#E05A4A`, helper text in `#C0391F`
- Label: Syne 700, 11px, uppercase, +0.08em, `--ink-3`

**Select elements** use custom chevron SVG replacing native arrow. Chevron color: `--stone`.

**Search input** has a search icon (⌕) at 15px positioned 13px from left, with 38px left padding on the input.

### 8.6 Alerts & Feedback

| Type | Background | Border | Text |
|---|---|---|---|
| Success | `--green-light` | `#9FD4B8` | `#0E5A30` |
| Error | `--red-light` | `#E8B0A8` | `--red-dark` |
| Info | `--blue-light` | `#A0B8EE` | `#0E2E7A` |
| Warning | `--gold-light` | `#E5CC8A` | `--gold-dark` |

Alert title: Syne 700, 13px. Alert body: DM Sans 400, 13px. Border radius: `--r-md`. Padding: 14px 16px.

### 8.7 Skeleton States

Every page that loads remote data must implement skeleton screens. No spinners.

- Use `--ash` as the skeleton fill color
- Apply shimmer animation (see motion section)
- Skeleton shapes must mirror the real content dimensions exactly — card skeleton is same width/height as card

### 8.8 Stat Cards (Dashboard)

Stat cards appear in a 4-column row at the top of the dashboard.

- Background: `--white`
- Border: 1px solid `--ash`
- Border radius: `--r-lg`
- Padding: 20px
- Label: Syne 700, 10px, uppercase, +0.12em, `--stone`
- Value: Syne 800, 30px, -0.03em, `--ink`
- Sub-text: DM Sans 400, 12px (green for positive, stone for neutral)

**Legit Partner stat card** gets a gold treatment: `--gold-light` background, `#E5CC8A` border, all text in gold tones.

---

## 9. Page-Level Patterns

### 9.1 Public Pages (Homepage, Marketplace, Item Detail)

- Page background: `--cream`
- Navbar: dark ink, sticky
- Content container: max 1280px, centered, 40px horizontal padding
- Footer: dark ink-2 background, always present
- Listing grid uses responsive 4/2/1 column layout

### 9.2 Authenticated Dashboard

- Page background: `--cream`
- Sidebar (desktop ≥1024px): 240px wide, `--white`, 1px right border `--ash`, sticky
- Main content: remaining width, 32px padding
- No sidebar on mobile — tabs replace it

### 9.3 Admin Panel

- Identical layout to dashboard but navbar carries "ADMIN" chip
- Table rows use alternating `--white` / `--cream` for readability
- Destructive actions (revoke badge, suspend user) always shown in `--red-light` button or confirmation modal — never inline and never one-click

### 9.4 Error Pages (404, 500)

- Full-screen `--cream` background
- Centered single column, max 480px
- Large Syne 800 error code in `--ash` (decorative, not alarming)
- Short explanation in DM Sans body-md
- Single primary button back to marketplace
- No illustration required — the typography alone is sufficient

### 9.5 Maintenance Mode

- Full-screen `--ink` background
- Logo centered, white
- Short DM Sans message in `--stone`
- No timer, no ETA — never promise a return time

---

## 10. Iconography

TipidMoto does not use an icon library. It uses a constrained set of **Unicode symbols and emoji** for low-weight iconography. This avoids icon font load cost and keeps the visual language simple.

| Symbol | Unicode | Use |
|---|---|---|
| ⬡ | U+2B21 | Legit Partner badge |
| ⌕ | U+2315 | Search inputs |
| ✓ | U+2713 | Sold badge, success states |
| ✕ | U+2715 | Error states, close buttons |
| ↑ | U+2191 | Hot listing, positive trend |
| ★ | U+2605 | Featured badge |
| ⚑ | U+2691 | Flagged content |
| ♡ | U+2661 | Save / wishlist (unfilled) |
| ♥ | U+2665 | Save / wishlist (filled) |
| ⚙ | U+2699 | Engine parts category |
| ⤢ | U+2922 | Expand / fullscreen |
| ↻ | U+21BB | Bump / refresh listing |

For category icons (Engine, Tires, Electrical, Fairings), use emoji as visual accents in the Shop by Bike grid only — not in nav, cards, or forms.

---

## 11. Writing Style (UI Copy)

**Tone:** Direct. Practical. Respectful. Like a knowledgeable mechanic who respects your time.

**Filipino context:** UI copy is in English. Error messages and empty states may use casual English that mirrors how Filipino riders naturally speak online. Avoid formal corporate English.

| Situation | ❌ Don't | ✓ Do |
|---|---|---|
| Empty listings | "No results were found for your query." | "No parts found. Try a different keyword or model." |
| Sold item | "This item is no longer available." | "Already sold. Check similar listings below." |
| After posting | "Your listing has been successfully submitted." | "Listing is live! Buyers can see it now." |
| Badge revoked | "Your verification status has been removed." | "Your Legit Partner badge was deactivated. Renew to get it back." |
| Rate limit hit | "You have exceeded the message limit." | "You've sent 5 new message requests today. Try again tomorrow." |

**Price formatting:** Always use `₱` prefix with a space before the number. Thousands separator is a comma.
- ✓ `₱ 2,800`
- ✗ `PHP2800`
- ✗ `2,800 PHP`

**Dates and times:** Use relative time for recent events ("2 hours ago", "3 days ago"). Switch to absolute date for events older than 7 days ("Mar 12, 2025"). Never show full datetime for casual events.

---

## 12. Accessibility

- All interactive elements have visible focus states (red ring, `--r-md`)
- Minimum tap target: 44×44px on mobile
- All images require `alt` text; listing photo alt = `"{part name} for {bike model}"`
- Color is never the only differentiator — badges also use icons; alerts also use bold titles
- WCAG AA contrast minimum on all text (see section 2.3)
- Skeleton screens use `aria-busy="true"` and `aria-label="Loading listings"`
- The Legit Partner badge includes `title="Verified seller — identity confirmed"` on hover

---

## 13. Anti-patterns

These are explicitly prohibited in TipidMoto UI:

- ❌ Purple or gradient backgrounds of any kind
- ❌ Cold grays (use warm ink and stone ramps instead)
- ❌ Inter, Roboto, or system-sans fonts
- ❌ Spinning loaders (use skeleton screens)
- ❌ Confetti, celebration animations, or playful motion
- ❌ More than one primary (red) button per view
- ❌ Gold used for anything except Legit Partner
- ❌ Rounded corners (pill) on full-width cards or containers
- ❌ Pure black (#000000) anywhere
- ❌ Placeholder text used as a label substitute
- ❌ Truncating prices — always show full peso amount
- ❌ Showing the absence of a Legit badge with a "Not verified" label — silence is the signal

---

## 14. File & Asset Conventions

**Images:**
- Listing photos uploaded as any format, converted server-side to WebP
- Max display size: 800×600px in item detail, 400×300px in cards
- Aspect ratio: 4:3 enforced via CSS `object-fit: cover`
- Placeholder: warm gray gradient with category symbol centered

**Favicons:**
- 32×32 and 16×16 PNG: Red square with white "T" in Syne 800
- Apple touch icon: 180×180 PNG

**OG / Social:**
- og:image dimensions: 1200×630px
- Template: dark ink background, white logo left-aligned, listing title and price right
- Generated server-side per listing for social sharing

---

## 15. Design Token Quick Reference

```css
/* Paste into any component file for full token access */

:root {
  /* Colors — Primary */
  --red: #D0311A;
  --red-dark: #A82410;
  --red-mid: #E8503A;
  --red-light: #F5E6E3;

  /* Colors — Neutral */
  --ink: #1A1612;
  --ink-2: #2E2720;
  --ink-3: #4A3F36;
  --stone: #7A6E66;
  --dust: #B0A89E;
  --ash: #DDD8D3;
  --cream: #F5F1EC;
  --white: #FDFCFB;

  /* Colors — Accent */
  --gold: #C8922A;
  --gold-dark: #8A6218;
  --gold-light: #F5EDD6;

  /* Colors — Semantic */
  --green: #1E7A4A;
  --green-light: #E3F2EB;
  --blue: #1A4FAD;
  --blue-light: #E3EAFB;

  /* Typography */
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'Courier New', Courier, monospace;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Border Radius */
  --r-sm: 6px;
  --r-md: 10px;
  --r-lg: 16px;
  --r-xl: 24px;
  --r-pill: 999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(26,22,18,.08), 0 1px 2px rgba(26,22,18,.06);
  --shadow-md: 0 4px 12px rgba(26,22,18,.10), 0 2px 6px rgba(26,22,18,.06);
  --shadow-lg: 0 12px 32px rgba(26,22,18,.12), 0 4px 12px rgba(26,22,18,.08);

  /* Motion */
  --motion-fast: 120ms ease-out;
  --motion-base: 200ms ease-out;
  --motion-slow: 300ms ease-in-out;
  --motion-enter: 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

*TipidMoto Design System — Antigravity v1.0*
*Internal use only. Not for distribution.*