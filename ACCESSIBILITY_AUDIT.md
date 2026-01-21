# Accessibility Audit Report - Digital Education & Safety Foundation

## Executive Summary
This audit evaluated the Digital Education & Safety Foundation website against **WCAG 2.1 Level AA** standards. The review included automated scanning (Pa11y), manual code inspection of Jekyll templates, and color contrast analysis.

Total Automated Errors Found: **118** (Across Home, Glossaries, Open Source, and Store pages)

## Findings by Category

### 1. Robustness (Principle 4)
*   **Duplicate IDs (Critical):** The ID `#portfolio` was used twice on the homepage. This can cause navigation issues for screen readers and breaks HTML validity.
*   **Form Labeling (Serious):** Contact form inputs (`#name`, `#email`, `#phone`, `#message`) lacked associated `<label>` elements.
*   **Empty Links (Moderate):** Social media links in the footer lacked descriptive text or `aria-label` attributes.

### 2. Perceivable (Principle 1)
*   **Color Contrast (Serious):**
    *   **Text Muted:** The `.text-muted` class (contrast ratio 4.45:1) slightly failed the 4.5:1 requirement for normal text.
    *   **Footer Links:** Privacy Policy, Terms, and Financials links (contrast ratio 1.9:1) failed significantly.
    *   **Buttons:** Primary buttons (contrast ratio 1.9:1) failed significantly for white text.
*   **Missing Alt Text (Moderate):** Several images in the grids lacked descriptive `alt` attributes.

### 3. Operable (Principle 2)
*   **Iframe Titles (Minor):** Several iframes (hidden contact iframe and tracking iframes) lacked `title` attributes.
*   **Navigation Hierarchy (Moderate):** Heading levels on the homepage did not follow a strict sequential order.

## Remediation Summary (Completed)

### 1. Robustness (Principle 4)
*   **Duplicate IDs:** Resolved. Renamed the duplicate `#portfolio` ID in `_includes/category_grid.html` to `#resources`.
*   **Form Labeling:** Resolved. Added `<label>` elements with `.sr-only` class to all contact form inputs in `_includes/contact.html`.
*   **Empty Links:** Resolved. Added `aria-label` attributes to all social media links in `_includes/footer.html`.
*   **Interactive Elements:** Improved Glossary filters by using `<button>` instead of `<a>` for the dropdown and ensuring proper ARIA attributes.

### 2. Perceivable (Principle 1)
*   **Color Contrast:**
    *   Darkened `.text-muted` text to `#686868` (meets 4.5:1).
    *   Darkened footer links to `#0056b3` for better contrast.
    *   Changed `.btn-primary` text to black (`#000`) for high contrast against the yellow background.
*   **Image Accessibility:** Added descriptive `alt` text to images in `_includes/program_grid.html` and `_includes/category_grid.html` using metadata.
*   **Iframe Titles:** Added `title` attributes to hidden iframes used for form submission and tracking.

### 3. Operable (Principle 2)
*   **Heading Hierarchy:**
    *   Implemented local overrides for `_includes/services.html` and `_includes/timeline.html` to fix heading jumps.
    *   Updated `_layouts/glossary.html` and `_layouts/store.html` to use `H1` in mastheads and logical subheadings.
    *   Changed grid item titles from `H4` to `H3` for better sequential order.
*   **Semantic Landmarks:** Added a `<main>` landmark wrapping the content in `_layouts/default.html`.

---
**Audit and remediation performed by Jules (AI Assistant) on Jan 20-21, 2026.**
