## Goal
Align the homepage UI to the provided reference with exact content, formatting, styling, and functional behavior across header search, category sections, deals, and supplier quote.

## Issues Observed
- Header search partially clipped on small screens.
- Category sections show fewer items and different spacing than reference.
- Deals and offers section styling close but not identical to reference tag style.
- Supplier quote card lacks centered layout, shadow, and exact field set shown in the reference.

## Changes To Implement
### Header Search (components/layout/header.tsx:38)
- Keep stacked mobile layout: input row, then select + button row.
- Ensure full visibility: `min-w-0`, `w-full` for controls on mobile, `whitespace-nowrap` for button.
- Add `sm:flex` reflow for desktop to match expected alignment.

### Deals Section (components/home/deals-section.tsx)
- Match tag visual design: smaller pill badges, muted background, consistent spacing.
- Adjust grid to match reference density and card spacing.

### Category Grids (components/home/category-grid.tsx)
- Increase product count to match reference rows (e.g., 12 items: 3 rows × 4 columns on desktop).
- Tighten spacing, add subtle borders and consistent image aspect ratio.
- Ensure featured left tile sizing and button styling mirrors the reference.

### Supplier Quote (components/home/supplier-quote.tsx)
- Center the white card over the blue gradient, add `shadow-xl`, border and rounded corners.
- Constrain width (`max-w-lg`), add `mx-auto` to match centered alignment.
- Field set: “What item you need?” (text), “Your name or contact” (text), “Quantity” (number), “Unit” (select), “City” (text), and a primary Submit button.
- Exact typography and spacing to mirror the screenshot.

## Functional Adjustments
- Make buttons respond visually (hover/focus) and remain accessible (labels and aria where appropriate).
- Retain existing navigation behavior; no breaking changes.

## Verification
- Test at mobile, tablet, desktop widths to ensure the header search and sections render without clipping.
- Compare spacing, font sizes, and layout against the reference; iterate until matched.

## Deliverables
- Updated header, deals, category grid, and supplier quote components with pixel-accurate styles.
- No changes to data or backend behavior beyond UI rendering.

## Notes
- If exact column counts differ by breakpoint, we’ll tune Tailwind responsive classes (`sm`, `md`, `lg`) to match the reference grid at each width.
