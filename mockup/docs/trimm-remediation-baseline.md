# TRIMM Mockup — Remediation Baseline Snapshot

Captured before any remediation edits in this pass. Source of truth for what
must **not** regress. Project root: `mockup/site/`, served locally at
`http://localhost:8765/site/`.

## Architecture (correcting an assumption in the remediation brief)

This is **plain static HTML + one shared CSS file + a few inline `<script>`
blocks** — no framework. There is no Next.js, no React, no TypeScript, no
build step, no package.json, no router, no hydration. Phase 4D's "if
appropriate for the current Next.js architecture" and Phase 11's "TypeScript
/ lint / build" do not apply to this codebase and are addressed as N/A with
the closest honest equivalent (HTML/CSS validity, console-error check)
rather than skipped silently.

- 24 files total: 22 real content pages, 1 meta-refresh redirect stub
  (`index.html`), 1 shared stylesheet (`assets/styles.css`).
- No JS framework. Three files carry a small inline `<script>`:
  `external.html` (reads `?service=`/`?label=` query params to render which
  external system a link pointed at), `ministries/donation-confirmation.html`
  (reads `?tier=`), and none of the core 11 pages themselves.
- Images: 3 real JPEG/PNG assets sampled from the official brand guide
  (`cover-hero.jpg`, `toc-hero.jpg`, `logo-mark.png`), no stock photography.

## Existing Routes (all 24 files)

```
index.html                              (redirect stub -> main/index.html)
external.html                           (shared external-destination placeholder)
open-decisions.html                     (centralized open-decisions table)
main/index.html                         Home
main/story.html                         Story / About
main/media.html                         Media
main/booking.html                       Booking
main/booking-confirmation.html          Booking confirmation (supporting)
main/store.html                         Store
main/product.html                       Product Detail (supporting)
main/cart.html                          Cart (supporting)
main/events.html                        Upcoming Events
main/event.html                         Event Detail (supporting)
main/newsletter-success.html            Newsletter success (supporting)
learn/index.html                        Education Home
learn/soar-program.html                 SOAR Program Page
learn/soar-application.html             SOAR Application (supporting)
learn/soar-confirmation.html            SOAR confirmation (supporting)
soar/index.html                         SOAR Home/Landing
ministries/index.html                   Ministry Home
ministries/charity.html                 Trimm Global Charity
ministries/donation-confirmation.html   Donation confirmation (supporting)
trim360/login.html                      TRIM360 login (handoff)
trim360/dashboard.html                  TRIM360 dashboard (handoff)
```

## Existing Core Pages (11 — CONFIRMED PRESENT, PASSING)

1. Home — `main/index.html`
2. Story / About — `main/story.html`
3. Media — `main/media.html`
4. Booking — `main/booking.html`
5. Store — `main/store.html`
6. Upcoming Events — `main/events.html`
7. Ministry Home — `ministries/index.html`
8. Trimm Global Charity — `ministries/charity.html`
9. Education Home — `learn/index.html`
10. SOAR Program Page — `learn/soar-program.html`
11. SOAR Landing — `soar/index.html`

## Existing Supporting Screens

- Event Detail (`main/event.html`) — PASS
- Product Detail (`main/product.html`) — PASS
- Cart / Checkout Handoff (`main/cart.html`) — PASS
- Booking Confirmation (`main/booking-confirmation.html`) — PASS
- Newsletter Success (`main/newsletter-success.html`) — PASS
- SOAR Application (`learn/soar-application.html`) — PASS
- SOAR Confirmation (`learn/soar-confirmation.html`) — PASS
- Donation Confirmation (`ministries/donation-confirmation.html`) — PASS
- TRIM360 Login (`trim360/login.html`) — PASS
- TRIM360 Dashboard (`trim360/dashboard.html`) — PASS
- **Course/Program Detail — DOES NOT EXIST (confirmed blocker)**
- **Enrollment/Subscription — DOES NOT EXIST (confirmed blocker)**

## Existing Working Journeys (per last audit, re-confirmed by file trace before this pass)

- Flow 1 Booking: PASS
- Flow 2 Events: PASS
- Flow 3 Store: PASS
- Flow 4 Learning: **FAIL — course cards are bare `<div>`s, zero `<a href>`,
  no destination exists (`learn/index.html`, confirmed via grep before this
  pass: `grep -n 'COURSE PHOTO' -A2` shows no anchor tags)**
- Flow 5 SOAR: PASS (previously tested live end-to-end: Landing → Program →
  Application → Confirmation → TRIM360 Login → Dashboard)
- Flow 6 SOAR Onboarding: PARTIAL — Dashboard's onboarding card has no link
  back out to Calendly/DISC
- Flow 7 Media: PASS
- Flow 8 Charity: PASS
- Flow 9 Login: PASS (canonical `trim360/login.html` from every property)

## Existing Design Tokens (DO NOT CHANGE VALUES)

```css
--ivory: #FCF8F5;      /* Primary Ivory, sampled from brand guide */
--charcoal: #2A2A2A;   /* Charcoal Base */
--rose: #C94C86;       /* Signature Rose */
--muted-rose: #A05A74; /* Muted Rose */
--plum: #6C3A53;       /* Deep Plum */
--champagne: #E7D2A3;  /* Champagne Accent */
--font-display: 'Optima', 'Candara', 'Trebuchet MS', sans-serif;
--font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;
```
All 6 colors were pixel-sampled from the official brand guide PDF, not
guessed. These six hex values and the two font stacks are locked for this
remediation pass.

## Existing Shared Components (`assets/styles.css` — DO NOT REWRITE)

`.site-header` / `.site-nav` / `.header-actions`, `.btn-primary` /
`.btn-outline` / `.btn-outline-ivory`, `.tag` (placeholder-annotation
convention), `.eyebrow`, `.pill`, `.field` (form styling), `.site-footer`.
Every one of the 11 core pages and every supporting screen depends on this
single file. **Any edit to this file is, by definition, a shared-component
change per the remediation brief's Critical Safety Rule** — flagged and
isolated in Phase 1/2/4 below rather than avoided outright, since the
motion and mobile-nav blockers cannot be fixed without touching it.

## Existing Responsive Breakpoints

- `@media (max-width: 900px)`: wraps header/footer only.
- `@media (max-width: 680px)`: a same-session retrofit (attribute-selector
  based) that collapses inline grids to 1 column and reduces horizontal
  padding. **Never visually confirmed below ~764px** in the previous pass —
  logic-verified via `matchMedia`/`getComputedStyle` only. This is the
  starting point for Phase 2, not something already passing.
- No mobile hamburger menu exists in Site. (One exists in a separate,
  non-clickable Design-Canvas artifact — not part of this codebase.)

## Existing Animation (NONE)

`grep -rn 'transition\|@keyframes\|animation' assets/styles.css` → 0
results, confirmed again just now. This is the accurate starting point for
Phase 4 — there is no existing motion to preserve, only motion to add.

## Existing Placeholder System (DO NOT WEAKEN)

- Bracketed placeholders use the brief's literal hyphen format,
  `[X - OWNER]`, normalized in the last remediation pass (111 instances).
- The `.tag` component is the visual "this is an annotation, not real
  content" signal — dashed border, charcoal background, champagne text.
- Every unresolved fact carries a named real owner (Lisa, LaQuanta,
  Shanequa, Lisa Williams, Lisa Johnson, Marvin, Austin) drawn from the
  brief's own ownership matrix — never invented.
- Centralized `open-decisions.html` exists (13 rows, matches brief Section 8
  exactly), linked from the Home footer only.

## Existing External Integration Annotations (DO NOT ALTER MEANING)

Single shared `external.html?service=X&label=Y` placeholder pattern used for
every not-yet-integrated system: Stripe (store checkout), GigWell (booking
inquiry, event registration), DocuSign (contract, referenced as
post-approval only), Calendly (scheduling), DISC assessment, EmpoweredTV,
Amazon/Store (book purchases), Privacy/Terms/Shipping policy pages.

## Protected Components ("DO NOT REGRESS" list)

- All 11 core pages listed above, as they currently render and link.
- All 10 existing supporting screens listed above.
- `assets/styles.css`'s existing selectors, values, and the two existing
  media queries — additive changes only, no rewrites of existing rules.
- The canonical single TRIM360 login (`trim360/login.html`) and the tested
  live handoff to `trim360/dashboard.html`.
- The single shared `external.html` placeholder pattern and its query-param
  contract (`?service=&label=`).
- The `open-decisions.html` page and its 13-row content.
- The 3 real brand images and their exact file names/paths.
- All 6 CSS custom-property color values and the 2 font stacks.
- The existing `.tag` / `[X - OWNER]` placeholder convention and every
  currently-correct owner attribution.
- Flows 1, 2, 3, 5, 7, 8, 9 (all currently passing per the last audit).

## Risk Areas (files where a blocker fix could cause regression)

- `assets/styles.css` — shared by literally every page; any new class,
  media query, or animation rule lands here. **Highest-risk file in this
  remediation.** Mitigation: additive-only changes, new class names never
  reused from existing ones, new `@media` rules scoped tightly.
- `learn/index.html` — course cards must become real links without
  otherwise altering the page's existing passing sections (hero, levels,
  subscription tiers, KSM, SOAR feature, instructor section, login CTA).
- Every page's `<header>`/`<footer>` markup — if mobile nav requires new
  markup (e.g. a hamburger button + drawer), it must be added consistently
  to all 21 pages that currently share the header/footer pattern without
  altering their existing, already-correct nav links.
- `main/index.html`'s hero — the only place a "rotating hero" motion
  requirement could apply, but only one real hero image currently exists
  (multi-slide is an Open Decision, not a code gap) — motion work here must
  not fabricate additional slides/images that don't exist.

## Existing Confirmed Failures (the only things this pass is authorized to fix)

1. Learning journey (Flow 4) — course cards not clickable, no Course
   Detail page, no Enrollment/Subscription screen.
2. Mobile — real sub-680px rendering never visually confirmed; no mobile
   navigation menu exists in Site; 9-journey mobile-usability check never
   performed.
3. Motion — zero transition/animation/reveal system exists anywhere;
   `prefers-reduced-motion` unaddressed (nothing to guard yet).
