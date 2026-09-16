# Playful Illustrated Landing Page Design Guide

This document describes the visual system used for this website so another frontend agent can recreate, extend, or modify the design without losing the style.

## Design Name

Use this name when describing the style:

**Playful Illustrated EdTech Landing Page**

Related terms:

- Hand-drawn educational landing page
- Illustrated workbook-style landing page
- Playful SaaS landing page
- Sketchbook-inspired learning website
- Cartoon editorial web design

The design should feel like a modern learning product mixed with a friendly science workbook.

## Core Personality

The page should feel:

- Curious
- Smart but not intimidating
- Playful
- Warm
- Hand-made
- Educational
- Premium enough for a startup landing page

Avoid:

- Dark cyberpunk AI styling
- Corporate minimalism
- Cold SaaS dashboards
- Neon/glassmorphism
- Overly realistic 3D graphics
- Generic stock-photo layouts
- Perfectly rigid geometric decoration

## Page Structure

The landing page has one main hero screen:

1. Header/navigation
2. Large left hero text
3. Right illustrated image card
4. Primary and secondary CTA buttons
5. Four pastel feature cards
6. Decorative sticky quote note
7. Floating edge decorations

On normal laptop screens, the main section should fit without feeling oversized. On smaller screens, vertical scrolling is allowed, but nothing should be clipped or overlap.

## Background

Use a warm off-white paper color, not pure white.

Recommended:

```css
--page-bg: #faf8f4;
```

Subtle background effects are okay:

```css
background:
  radial-gradient(circle at 20% 20%, rgba(255, 218, 69, 0.16), transparent 24%),
  radial-gradient(circle at 74% 70%, rgba(102, 84, 245, 0.12), transparent 27%),
  #faf8f4;
```

Keep effects soft. The text must remain readable.

## Color Palette

Use these CSS variables:

```css
:root {
  --ink: #17191f;
  --page-bg: #faf8f4;

  --yellow: #ffda45;
  --yellow-soft: #fff4d9;

  --purple: #6654f5;
  --purple-2: #8b62ff;
  --purple-soft: #c9baff;

  --blue: #62a9ff;
  --blue-soft: #dcecff;

  --pink: #f58ab4;
  --pink-soft: #fbe1eb;

  --green: #65c99a;
  --green-soft: #dff4e8;

  --paper-card: #fffdf8;
}
```

Usage:

- Main text: `#17191f`
- Page background: `#faf8f4`
- Primary CTA: `#ffda45`
- Hero word `magic.`: purple gradient from `#6654f5` to `#8b62ff`
- Card backgrounds: cream, blue, pink, green pastels
- Outlines and chunky shadows: `#17191f`

## Typography

Use rounded, friendly fonts.

Recommended imports:

```css
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&family=Patrick+Hand&display=swap");
```

Font roles:

```css
--font-display: "Fredoka", "Baloo 2", "Nunito", sans-serif;
--font-body: "Nunito", "DM Sans", system-ui, sans-serif;
--font-hand: "Patrick Hand", "Comic Sans MS", cursive;
```

Use display font for:

- Logo wordmark
- Hero heading
- Feature card titles
- Sticky note quote
- Big labels

Use body font for:

- Paragraphs
- Navigation
- Button labels
- Search placeholder

Do not use Inter, Roboto, or Arial as the main visual font. They make the design too corporate.

## Logo Style

The logo should be a custom wordmark, not a generic icon plus text.

Current style:

- Text: `MATH`
- A yellow circular `x`
- Purple gradient `AI`
- Small hand-drawn yellow underline
- Subtitle: `SAME NUMBERS. BIGGER POSSIBILITIES.`

Do not use a square logo box on the left. The logo should stand on its own as a playful wordmark.

Suggested structure:

```jsx
<span className="font-display font-bold text-ink">
  MATH
  <span className="rounded-full border-2 border-ink bg-yellow">x</span>
  <span className="bg-gradient-to-r from-purple to-purple-2 bg-clip-text text-transparent">
    AI
  </span>
</span>
```

## Header

Header layout:

- Logo on the left
- Center navigation
- Search on the right
- No separate `Let's Go` button in the header

Navigation:

- `Home` is a yellow pill
- Other links are simple dark text
- Medium/bold weight
- Keep spacing generous but not huge

Search:

- Rounded pill
- Light border
- White/translucent background
- Search icon inside

## Hero Layout

Desktop:

- Two-column grid
- Left column: text and CTAs
- Right column: illustrated card image
- Left text should be dominant, but right illustration should balance the page

Recommended grid:

```css
grid-template-columns: 0.82fr 1.18fr;
```

For laptop-height screens, reduce:

- top padding
- hero font size
- card height
- footer/extra spacing

Mobile:

- Single column
- Text first
- Image below
- Cards stack below
- Hide or reposition decorations that overlap content

## Hero Heading

Text:

```text
AI is not
magic.
```

Rules:

- Very large
- Rounded display font
- Bold
- Tight line-height
- `AI is not` is black
- `magic.` is larger and purple gradient
- `magic.` is offset to the right
- The gap between the two lines should be tight
- Never let the bottom of `magic.` get clipped

Example:

```css
.hero-title {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 0.86;
  overflow: visible;
  padding-bottom: 0.5rem;
}

.magic-word {
  display: block;
  margin-left: 1.12em;
  font-size: 1.12em;
  padding-bottom: 1.25rem;
  background: linear-gradient(100deg, #6654f5, #8b62ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

## Yellow Rays Near `magic.`

There are three yellow chalk-like rays near the `c`/right side of `magic.`

They should:

- Look like sun rays
- Be rounded
- Feel hand-drawn/chalky
- Be close to the word, not floating near the image card
- Use layered strokes: main yellow plus lighter yellow overlay

Recommended SVG:

```jsx
<svg viewBox="0 0 112 112" aria-hidden="true">
  <path d="M52 14 L36 42" stroke="#ffda45" strokeWidth="9" strokeLinecap="round" />
  <path d="M54 16 L38 41" stroke="#fff0a6" strokeWidth="4" strokeOpacity="0.65" strokeLinecap="round" />

  <path d="M56 51 L84 34" stroke="#ffda45" strokeWidth="9" strokeLinecap="round" />
  <path d="M58 50 L82 36" stroke="#fff0a6" strokeWidth="4" strokeOpacity="0.65" strokeLinecap="round" />

  <path d="M60 68 L94 73" stroke="#ffda45" strokeWidth="9" strokeLinecap="round" />
  <path d="M62 67 L91 72" stroke="#fff0a6" strokeWidth="4" strokeOpacity="0.65" strokeLinecap="round" />
</svg>
```

Position the SVG absolutely relative to the `magic.` word. Adjust visually, but keep it tied to the text.

## Hero Subtitle

Text:

```text
It's Mathematics at scale.
```

Rules:

- Use display font
- Bold
- Black text
- `Mathematics at scale.` gets a curved chalk underline

Underline should not be a plain CSS underline. Use an SVG path.

Recommended:

```jsx
<span className="relative inline-block pb-1">
  Mathematics at scale.
  <svg className="absolute -bottom-1 left-0 h-4 w-full" viewBox="0 0 330 18" preserveAspectRatio="none">
    <path d="M4 11 C82 7, 168 15, 326 8" stroke="#ec5faa" strokeWidth="7" strokeLinecap="round" />
    <path d="M7 12 C88 9, 174 14, 321 9" stroke="#f5a3cf" strokeWidth="4" strokeOpacity="0.72" strokeLinecap="round" />
    <path d="M13 10 C92 8, 183 13, 306 8" stroke="#d83f97" strokeWidth="2" strokeOpacity="0.38" strokeLinecap="round" />
  </svg>
</span>
```

The underline should look slightly uneven, tilted, and chalk/marker-like.

## Body Copy

Hero body copy:

```text
From pixels to predictions, from probabilities to neural networks - AI is built on mathematical ideas you can explore, visualize, and play with.
```

Rules:

- Medium or semibold
- Comfortable line height
- Not too wide
- Add padding/background only if needed for readability

Recommended max width: `520px` to `560px`.

## Buttons

Primary CTA:

- Yellow background
- Thick black border
- Chunky black offset shadow
- Rounded rectangle
- Bold text
- Arrow icon

Example:

```css
.primary-button {
  height: 52px;
  padding: 0 28px;
  border: 3px solid #17191f;
  border-radius: 16px;
  background: #ffda45;
  box-shadow: 4px 5px 0 #17191f;
  font-weight: 700;
}
```

Secondary CTA:

- White background
- Thick black border
- Same chunky shadow
- Play icon in black circle

Both buttons should align in one row on desktop and stack only on small mobile.

## Right Illustration Card

The right side image should be inside a physical card-style frame.

Rules:

- Use the provided illustration image
- Warm paper card background
- Thick black border
- Rounded corners
- Slight rotation
- Chunky offset shadow like the CTA button
- Padding between image and card edge

Example:

```jsx
<figure className="rotate-[-1.2deg] rounded-[26px] border-[3px] border-ink bg-[#fffdf8] p-3 shadow-[7px_8px_0_#17191f]">
  <img className="w-full rounded-[18px] object-contain" src="/right-land.png" />
</figure>
```

Do not display the image plain without a card wrapper.

## Sticky Quote Note

The sticky note floats above the bottom cards.

Text:

```text
"Mathematics is the language in which the universe is written."
- Galileo Galilei
```

Rules:

- Yellow sticky note color
- Slight rotation
- Chunky black shadow
- Display font
- Place above the card row, usually lower-right
- Hide or reposition on smaller screens if it overlaps content

Example:

```css
.quote-note {
  position: absolute;
  right: 20px;
  bottom: 126px;
  width: 310px;
  transform: rotate(-2deg);
  background: #ffe36a;
  border: 1px solid rgba(23, 25, 31, 0.1);
  box-shadow: 5px 6px 0 #17191f;
  padding: 16px 20px;
}
```

Do not add a separate quote line elsewhere on the page.

## Feature Cards

There are four cards:

1. Interactive Visualizations
2. Hands-on Experiments
3. Real AI Examples
4. For Everyone

Cards should look like soft pastel blocks:

- No heavy black border
- Rounded corners
- Soft shadow
- Small icon at top-left
- Bold title
- Compact body text
- Comfortable padding

Recommended colors:

```js
[
  "from-[#fff4d9] to-[#fff8ea]",
  "from-[#dcecff] to-[#edf6ff]",
  "from-[#fbe1eb] to-[#fff0f5]",
  "from-[#dff4e8] to-[#effaf4]"
]
```

Recommended card CSS:

```css
.feature-card {
  min-height: 112px;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 16px 34px rgba(23, 25, 31, 0.06);
}

.feature-card-icon {
  width: 32px;
  height: 32px;
  stroke-width: 2.7;
}

.feature-card-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.1;
}

.feature-card-body {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.35;
  color: rgba(23, 25, 31, 0.85);
}
```

The card row should fit on one line on wide screens.

## Decorations

Use decorative elements around the edges only. They should not affect layout.

Decoration rules:

- `position: absolute`
- `pointer-events: none`
- `aria-hidden="true"`
- Keep them behind or away from important content
- Hide on mobile if they overlap

Recommended decorations:

- Purple cropped circle bottom-left
- Yellow cropped circle top-right
- Blue cropped circle lower-right
- Tilted lavender rounded rectangle on left edge
- Small irregular dot cluster on left

Do not add too many decorations. The hero text and illustration must remain the focus.

## Spacing and Screen Fit

The page should fit nicely on normal laptop screens.

Guidelines:

- Header padding: compact
- Hero top padding: compact
- Feature cards: around `104px` to `120px` tall
- Avoid large unused vertical gaps
- Remove unnecessary footer if it pushes content below the fold
- The page can scroll on mobile, but desktop should feel like a complete first viewport

Recommended laptop-height media query:

```css
@media (min-width: 1024px) and (max-height: 820px) {
  .page-shell {
    padding-top: 12px;
    padding-bottom: 8px;
  }

  .hero-grid {
    gap: 1rem;
    padding-top: 14px;
  }

  .hero-title {
    font-size: clamp(4.4rem, 6.2vw, 5.4rem);
  }

  .hero-copy {
    max-width: 31rem;
    font-size: 1rem;
    line-height: 1.45;
  }

  .hero-art {
    max-width: min(48vw, 660px);
  }

  .feature-grid article {
    min-height: 94px;
    padding: 0.85rem;
  }
}
```

## Responsiveness

Desktop:

- Two columns
- Card row has 4 columns
- Sticky note visible if it does not overlap

Tablet:

- Two columns may remain if enough width
- Feature cards can be 2 columns
- Sticky note can hide

Mobile:

- Single-column hero
- Hide desktop nav/search if necessary
- Buttons stack
- Image card below hero text
- Cards stack 1 column
- Hide large edge decorations that cause horizontal overflow

Important:

- Use `overflow-x-hidden`
- Do not use `overflow-hidden` on the entire page if it clips responsive content vertically
- Use `overflow-visible` around hero heading so `magic.` and rays are not cut off

## Implementation Rules

Do:

- Use React + Vite + Tailwind
- Use CSS variables or Tailwind theme extensions for colors
- Use rounded display font
- Use SVG paths for doodles/underlines/rays
- Use lucide icons for UI icons
- Keep the illustration image card
- Keep shadows chunky and black where appropriate
- Keep feature cards soft and pastel

Do not:

- Use a plain CSS underline for `Mathematics at scale.`
- Clip the `magic.` text
- Put the right image on the page without a card frame
- Add a separate footer quote or featured-in logos
- Bring back the header `Let's Go` button
- Bring back the old left square logo icon
- Make cards dark, bordered, or heavy
- Let decorations overlap text/buttons
- Let the desktop layout require unnecessary scrolling

## Current Key Assets

Right-side illustration:

```text
public/right-land.png
```

Main source files:

```text
src/main.jsx
src/styles.css
tailwind.config.js
```

## Final Visual Checklist

Before finishing, verify:

- `magic.` is large, purple, and not clipped.
- Yellow rays sit near the right side of `magic.`, close enough to feel connected.
- Rays and underline feel chalk-like, not like plain rigid bars.
- Logo is a custom wordmark with no separate square icon.
- Header has no `Let's Go` button.
- Right image is framed as a card with black chunky shadow.
- Sticky note contains the Galileo quote and floats above the feature cards.
- No separate quote/footer logos are present.
- Four feature cards match the soft pastel reference.
- Normal laptop viewport does not feel oversized.
- Mobile layout does not cut anything off.
