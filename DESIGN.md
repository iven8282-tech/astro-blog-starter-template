# KidsDodoDoing — Canvas Design Contract

## Product goal & audience
A bilingual-ready English-first B2B brand showroom for Wuhan Kunxiang Textile Technology Co., Ltd. / KidsDodoDoing. The site helps importers, distributors, private-label brands and children’s-space buyers discover eight product groups and start a quote conversation. It intentionally has no retail pricing, shopping cart, checkout or online payment.

## Visual direction
**Soft Play Showroom**: real product photography, warm oatmeal canvas, mint structural bands, amber action color, rounded modular geometry, and mono “spec sheet” labels. The first screen presents “Soft play, built to ship.” with a stacked three-product media composition and a single clear conversion action: Get a Quote.

## Reference Sources
- `vendor/open-design/adapter/STATIC_POLICY.md`
- `vendor/open-design/adapter/RESOURCE_INDEX.md`
- `vendor/open-design/adapter/SKILL_TRANSLATION.md`
- `subagents/canvas-designer/references/output-contract.md`
- `vendor/open-design/upstream/design-systems/friendly/DESIGN.md`
- `vendor/open-design/upstream/design-systems/friendly/tokens.css`
- `vendor/open-design/upstream/design-systems/friendly/components.html`
- `vendor/open-design/upstream/craft/anti-ai-slop.md`
- `vendor/open-design/upstream/craft/color.md`
- `vendor/open-design/upstream/craft/typography.md`
- `vendor/open-design/upstream/craft/laws-of-ux.md`
- `vendor/open-design/upstream/craft/animation-discipline.md`
- `vendor/open-design/upstream/craft/accessibility-baseline.md`
- `merchant-material/company_basic_info.md`, `company_extra_info.md`, `product_groups.md`

## Vendor Grounding
- Applies to: new site and non-trivial visual system.
- Selected baseline: `friendly` design system.
- Token source: `friendly/tokens.css`, mapped into project semantic variables rather than copied wholesale.
- Component fixture: `friendly/components.html`, informing pill buttons, hairline borders, focus rings, form heights and soft cards.
- Anti-ai-slop checks: no indigo/purple gradients, no emoji icons, no fabricated prices/reviews/metrics, no lorem ipsum, no generic card-wall hero.
- Intentional deviations: warm oatmeal `#FBF7F0` instead of the baseline yellow; amber `#F2A63B` instead of orange; system UI fonts instead of external font CDNs; real user-provided Alibaba CDN product images instead of stock or generated product art.

## Color tokens
`--canvas #FBF7F0`, `--surface #FFFFFF`, `--surface-alt #EFF4F3`, `--surface-warm #FDF1DE`, `--ink #2D3436`, `--ink-2 #55666B`, `--muted #7A8A8E`, `--line #E6DED2`, `--brand #3E8F98`, `--brand-deep #2B6A72`, `--accent #F2A63B`, `--accent-strong #D9821B`.

## Typography, spacing, radius and shadow
English-first system stack: `Inter, Segoe UI, system-ui, sans-serif`; display uses a heavy system UI weight; mono labels use `ui-monospace`. Display sizes use responsive `clamp`; section rhythm is 70–112px, page gutters 16–32px, max container 1240px. Radius scale: 16/24/32px and pill. Shadows are soft and low-contrast, with a small hard shadow reserved for the amber CTA.

## Component inventory
`site-header`, `logo`, `hero`, `hero-media-stack`, `certification-strip`, `category-bento`, `product-card`, `oem-process-rail`, `heritage-story`, `market-reach`, `inquiry-band`, `inquiry-modal`, `site-footer`.

## Page structure and responsive rules
The landing page includes sticky capsule navigation, hero, certification strip, eight-group product bento, four-step OEM process, heritage timeline, export reach visualization, inquiry band and footer. Product groups link to the user-provided Alibaba group pages in a new tab. At ≤900px the hero stacks and products become six-column/one-column layouts; at ≤640px navigation becomes a mobile menu, product grid is two columns, process steps are two columns, CTA buttons expand to full width, and the inquiry form is a mobile-safe modal.

## Interaction & motion
CTA hover uses ≤2px lift, cards use subtle image scale, modal form has idle/submitting-like success state, and all motion is reduced under `prefers-reduced-motion`. Form submission is intentionally preview-only until a mailbox/CRM endpoint is connected; no persistence claim is made.

## Image Manifest
All product image URLs below are user-provided in `merchant-material/product_groups.md` and are used as external sources in the implementation.

| URL | Source | Usage |
|---|---|---|
| `https://sc01.alicdn.com/kf/H045f9256de92480ead7a6662e77ee1c5B.jpg` | user-provided | Brand logo source record |
| `https://sc04.alicdn.com/kf/H1a07a9f9713d47bc9247d25b2699c9fet.jpg` | user-provided | Hero and Kids Modular Sofa |
| `https://sc04.alicdn.com/kf/H49e69da433e24a2baa5faf648217ac61Z.jpg` | user-provided | Hero and Foam Climber Block |
| `https://sc04.alicdn.com/kf/H2425833ae7544f818cf41db93d7abddcU.jpg` | user-provided | Hero and Ball Pit |
| `https://sc04.alicdn.com/kf/H68b1c495ff5045919e0e47b774445a8cg.jpg` | user-provided | Baby Sofa card |
| `https://sc04.alicdn.com/kf/H2d0b6fccb5d1487b9ec0bea36bfad9f5M.png` | user-provided | Sofa Bed card |
| `https://sc04.alicdn.com/kf/H0e29b6b7f7b04ab995e03960123df5a9w.png` | user-provided | Kids Lazy Sofa card |
| `https://sc04.alicdn.com/kf/Hb16776ef97d649dca9cadb1b30969169m.jpg` | user-provided | Related Toys card |
| `https://sc04.alicdn.com/kf/Hff67efad92b44868a8fba7306008b3d8g.jpg` | user-provided | Cushion & Pillow Foam card and story visual |
