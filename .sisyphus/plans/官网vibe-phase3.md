# 官网vibe Phase 3: Component Assembly & Style Protection

## TL;DR

> **Quick Summary**: Implement homepage components (Hero, Features, Testimonials) for 壹目贯维 using ONLY od-tokens.css design tokens, with verification that visual style can switch seamlessly by changing CSS variable values.
>
> **Deliverables**:
> - `src/components/Hero.astro` - Hero section with tagline
> - `src/components/Features.astro` - Three product matrices grid
> - `src/components/Testimonials.astro` - Human insights section
> - `src/layouts/LandingLayout.astro` - Layout consuming tokens
> - `src/content/docs/index.mdx` - New homepage (Starlight doc at site root)
>
> **Note**: Component styles go in `<style>` blocks within `.astro` files. NO separate CSS files. If a needed token is missing from od-tokens.css, extend it there - do NOT create new CSS files.
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Token validation → Layout → Components → Homepage → QA

---

## Context

### Original Request (from 官网vibe.txt Phase 3)
> "OC 组件开发指令：编写首页和布局组件。铁律：所有样式只能使用 src/styles/od-tokens.css 中的变量（如 var(–od-color-ai-speed)），绝对不允许写死任何颜色值、字体值和关键间距值！"

### Interview Summary

**Key Discussions**:
- Phase 0-2 infrastructure already complete (Astro + Starlight + tokens)
- Phase 3 focus: homepage component assembly with token-only CSS
- BDD scenario: visual seamless switching via token value changes only

**Research Findings**:
- od-tokens.css exists with 4 token categories (colors, fonts, radius, spacing)
- **Existing landing page**: `src/pages/index.astro` already exists with product grid using od-tokens. Phase 3 components should integrate with or extend this pattern.
- `src/content/docs/index.mdx` does NOT exist (only index.mdx.bak backup)
- Components must be `.astro` files (Astro component format)
- **Product names verified against MDX frontmatter**:
  - one-mu.mdx: "壹目·AI内容工坊" ✓
  - guan-wei.mdx: "贯维·行业智造引擎" ✓ (NOT "贯维·AI翻译旗舰")
  - guan-lan.mdx: "贯蓝·AI创意助手" ✓ (NOT "贯维·AI应用矩阵")
- **--od-color-bg-testimonials token verified**: exists in od-tokens.css:9

### Metis Review (Incorporated)

**Identified Gaps (addressed)**:
- No CSS audit enforcement at component level → Added PostCSS stylelint with token plugin
- No visual regression testing → Added Playwright screenshot comparison
- No component-scoped token validation → Added stylelint rule + manual verification task

**Guardrails Applied**:
- Components MUST use ONLY var(--od-*) tokens for colors, fonts, spacing
- No inline styles for design values
- No new token files - extend od-tokens.css if tokens missing
- Phase 3 NEW files only - existing Phase 1-2 files untouched unless broken

---

## Work Objectives

### Core Objective
Replace Starlight default homepage with custom landing page components that consume ONLY od-tokens.css design tokens, enabling visual style switching by modifying token values.

### Concrete Deliverables
- `src/components/Hero.astro` - Hero section (tagline: "AI Speed, Human Touch")
- `src/components/Features.astro` - Three product matrices display
- `src/components/Testimonials.astro` - Human insights section
- `src/layouts/LandingLayout.astro` - Base layout using tokens
- `src/content/docs/index.mdx` - New landing page content (create, not replace - file doesn't exist yet)
- Token coverage validation: ALL design values in components have corresponding od-tokens.css entry

**IMPORTANT - No Separate CSS Files**: All component styles MUST be in `<style>` blocks within `.astro` files. If a needed token doesn't exist in od-tokens.css, ADD IT THERE. Never create new CSS files.

### Definition of Done
- [ ] `npm run build` succeeds without errors
- [ ] `npm run lint:tokens` passes (no hardcoded color/font values)
- [ ] Playwright test loads homepage, no console errors
- [ ] Visual verification: all colors/fonts/spacing come from var(--od-*) tokens
- [ ] BDD test: change one token value, verify multiple components update

### Must Have
- Hero section with 壹目贯维 branding and "AI Speed, Human Touch" tagline
- Features section displaying three products (one-mu, guan-wei, guan-lan)
- Testimonials section with human insights quote
- LandingLayout wrapping all components
- Homepage using new layout, accessible at site root

### Must NOT Have (Guardrails)
- **NO hardcoded colors**: `color: #fff`, `color: red`, `color: rgb(...)` - use var(--od-color-*)
- **NO hardcoded spacing**: `padding: 24px` - use var(--od-space-*) or calc(var(--od-space-*))
- **NO hardcoded fonts**: `font-family: Arial` - use var(--od-font-*)
- **NO inline styles** for design values
- **NO modifications** to Phase 1-2 infrastructure files (nav-generator.js, content.config.ts, etc.)
- **NO new CSS files** - extend od-tokens.css only if tokens missing

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (Astro project, no custom test setup)
- **Automated tests**: NO (component-level unit tests not practical for Astro)
- **Framework**: N/A
- **Agent-Executed QA**: YES - Playwright for visual/functional verification

### QA Policy
Every task includes agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/`.

- **Frontend/UI**: Playwright - verify page loads, no console errors, tokens in use
- **CSS Audit**: stylelint with custom rule for token usage
- **Visual Regression**: Playwright screenshots, manual diff

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation - sequential):
├── Task 1: Setup linting harness (stylelint token plugin) [quick]
├── Task 2: Create LandingLayout.astro [quick] (blocked by 1)
└── Task 3: Create od-tokens.css coverage check [quick] (blocked by 1)
Note: Wave 1 is SEQUENTIAL, not parallel. Task 2 and 3 require stylelint to be installed first (Task 1).

Wave 2 (Core Components - after Wave 1):
├── Task 4: Hero.astro component [visual-engineering]
├── Task 5: Features.astro component [visual-engineering]
└── Task 6: Testimonials.astro component [visual-engineering]

Wave 3 (Integration - after Wave 2):
├── Task 7: Create index.mdx landing page [quick]
├── Task 8: BDD visual switching verification [unspecified-high]
└── Task 9: Final QA and evidence collection [unspecified-high]
```

### Dependency Matrix

| Task | Blocks | Blocked By |
|------|--------|------------|
| 1: Lint harness | 4, 5, 6 | None |
| 2: LandingLayout | 4, 5, 6 | 1 |
| 3: Token coverage | 4, 5, 6 | 1 |
| 4: Hero | 7 | 2, 3 |
| 5: Features | 7 | 2, 3 |
| 6: Testimonials | 7 | 2, 3 |
| 7: index.mdx | 8 | 4, 5, 6 |
| 8: BDD verification | 9 | 7 |
| 9: Final QA | - | 8 |

---

## TODOs

- [x] 1. Setup stylelint token-enforcement harness

  **What to do**:
  - Install stylelint and stylelint-config-recessary (or similar)
  - Create `.stylelintrc.json` with rule: `property-no-unknown` that flags hardcoded colors/fonts/spacing
  - Add npm script: `"lint:tokens": "stylelint \"src/components/**/*.astro\" \"src/layouts/**/*.astro\""`
  - Verify: running `npm run lint:tokens` on a file with `color: red` should fail

  **Must NOT do**:
  - DO NOT install heavy frameworks (Jest, etc.)
  - DO NOT modify existing Phase 1-2 files

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
    - No special skills needed - simple npm package setup

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 4, 5, 6
  - **Blocked By**: None

  **References**:
  - `https://stylelint.io/` - Stylelint documentation for rule configuration
  - `src/styles/od-tokens.css:1-19` - Token variables to reference in rules

  **Acceptance Criteria**:
  - [ ] `npm install stylelint` succeeds
  - [ ] `.stylelintrc.json` created with token enforcement rules
  - [ ] `npm run lint:tokens` available as npm script
  - [ ] `npm run lint:tokens` fails on `color: #fff` in test file

  **QA Scenarios**:
  ```
  Scenario: Stylelint catches hardcoded colors
    Tool: Bash
    Preconditions: Clean npm install, no stylelint config
    Steps:
      1. Create test file `/tmp/test-astro.astro` with content: `<style>.test { color: #fff; }</style>`
      2. Run `npx stylelint /tmp/test-astro.astro --config .stylelintrc.json`
    Expected Result: Exit code non-zero, error message contains "color" and "#fff"
    Failure Indicators: Exit code 0 (no error caught)
    Evidence: .sisyphus/evidence/task-1-stylelint-catches-hardcode.txt

  Scenario: Stylelint passes token usage
    Tool: Bash
    Preconditions: Test file with token usage
    Steps:
      1. Create test file `/tmp/test-token.astro` with content: `<style>.test { color: var(--od-color-ai-speed); }</style>`
      2. Run `npx stylelint /tmp/test-token.astro --config .stylelintrc.json`
    Expected Result: Exit code 0, no errors
    Failure Indicators: Exit code non-zero
    Evidence: .sisyphus/evidence/task-1-stylelint-passes-tokens.txt
  ```

  **Evidence to Capture**:
  - [ ] stylelint config file created
  - [ ] npm script added to package.json
  - [ ] Test evidence showing hardcode catch and token pass

  **Commit**: NO

---

- [x] 2. Create LandingLayout.astro

  **What to do**:
  - Create `src/layouts/LandingLayout.astro`
  - Import `od-tokens.css` globally
  - Define base HTML structure (html, head, body with slot)
  - Apply base token styles: background-color, font-family, line-height
  - Use Starlight's head component or minimal head for SEO
  - Create slot for page content

  **Must NOT do**:
  - DO NOT hardcode any color values (use var(--od-color-*))
  - DO NOT hardcode font values (use var(--od-font-*))
  - DO NOT hardcode spacing (use var(--od-space-*))
  - DO NOT create new CSS files - extend od-tokens.css if missing tokens

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
    - Basic Astro layout knowledge

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Tasks 4, 5, 6
  - **Blocked By**: Task 1 (needs lint harness first)

  **References**:
  - `src/styles/od-tokens.css:21-32` - Body styles to inherit
  - `src/styles/od-tokens.css:1-19` - All available tokens
  - `src/content/docs/index.mdx.bak:1-40` - Starlight default structure reference

  **Acceptance Criteria**:
  - [ ] File created: `src/layouts/LandingLayout.astro`
  - [ ] Contains `<html>`, `<head>`, `<body>` structure
  - [ ] Imports `od-tokens.css` via `import '../styles/od-tokens.css'`
  - [ ] Has `<slot />` for page content
  - [ ] All CSS uses var(--od-*) tokens only
  - [ ] `npm run lint:tokens` passes on this file

  **QA Scenarios**:
  ```
  Scenario: LandingLayout renders with tokens
    Tool: Bash
    Preconditions: LandingLayout exists
    Steps:
      1. Run `npm run build` to verify Astro compiles the layout
    Expected Result: Build succeeds, no errors about missing tokens
    Failure Indicators: Build fails with CSS parsing errors
    Evidence: .sisyphus/evidence/task-2-layout-build.txt

  Scenario: No hardcoded values in LandingLayout
    Tool: Bash
    Preconditions: LandingLayout exists
    Steps:
      1. Run enhanced hardcode detection (see below)
    Expected Result: No matches found
    Failure Indicators: Matches found - hardcoded values present
    Evidence: .sisyphus/evidence/task-2-no-hardcode.txt
  ```

  **Enhanced Hardcode Detection** (use instead of basic grep):
  ```bash
  # Colors: hex, rgb(), rgba(), hsl(), hsla(), named colors
  grep -rnE 'color:\s*(#[0-9a-f]{3,6}|rgb\(|rgba\(|hsl\(|hsla\(|red|blue|green|black|white|yellow|purple|orange|gray)' src/layouts/LandingLayout.astro

  # Fonts: anything not var(--od-font-*)
  grep -rnE 'font(-family)?:\s*(?!var\(--od-font)' src/layouts/LandingLayout.astro

  # Spacing: margin, padding, gap with numeric values
  grep -rnE '(margin|padding|gap):\s*[0-9]+' src/layouts/LandingLayout.astro

  # Border shorthand
  grep -rnE 'border:\s*[^v]' src/layouts/LandingLayout.astro
  ```

  **Evidence to Capture**:
  - [ ] LandingLayout.astro file created
  - [ ] Build output showing success
  - [ ] Grep results showing no hardcoded values

  **Commit**: NO

---

- [x] 3. Create od-tokens.css coverage check

  **What to do**:
  - Verify that od-tokens.css contains ALL tokens needed by the planned components
  - Check these tokens exist in od-tokens.css:
    - Colors: --od-color-ai-speed, --od-color-human-touch, --od-color-text-primary, --od-color-text-secondary, --od-color-bg-testimonials
    - Fonts: --od-font-display, --od-font-body
    - Spacing: --od-space-layout
    - Radius: --od-radius-ai-speed, --od-radius-human-touch
  - If ANY needed token is MISSING from od-tokens.css:
    1. ADD it to od-tokens.css (this is the ONLY exception to "no new files")
    2. Document which token was added and why
  - This task is a VERIFICATION task - it does NOT create new components

  **Must NOT do**:
  - DO NOT create new CSS files
  - DO NOT modify component files - only verify od-tokens.css coverage
  - DO NOT skip tokens - every design value needs a token

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
    - Basic CSS knowledge to identify design tokens

  **Parallelization**:
  - **Can Run In Parallel**: NO (after Task 1, before Tasks 4,5,6)
  - **Blocks**: Tasks 4, 5, 6
  - **Blocked By**: Task 1

  **References**:
  - `src/styles/od-tokens.css:1-19` - Current token definitions

  **Acceptance Criteria**:
  - [ ] All required tokens verified present in od-tokens.css
  - [ ] Any missing tokens added to od-tokens.css with documentation
  - [ ] Token coverage report generated

  **QA Scenarios**:
  ```
  Scenario: Verify token coverage for planned components
    Tool: Bash
    Preconditions: od-tokens.css exists, components planned
    Steps:
      1. Read src/styles/od-tokens.css
      2. List all tokens needed by Hero, Features, Testimonials
      3. Compare against existing tokens
      4. If missing tokens found, add them to od-tokens.css
    Expected Result: All needed tokens exist or are added
    Failure Indicators: Missing tokens not added, hardcoded fallback used
    Evidence: .sisyphus/evidence/task-3-token-coverage.txt
  ```

  **Evidence to Capture**:
  - [ ] Token coverage report
  - [ ] Any tokens added to od-tokens.css

  **Commit**: NO (this is a verification/infrastructure task)

---

- [x] 4. Create Hero.astro component

  **What to do**:
  - Create `src/components/Hero.astro`
  - Use LandingLayout or extend it
  - Hero section with:
    - Main headline: "AI Speed, Human Touch" (壹目贯维 brand)
    - Subheadline: tagline about告别AI随机感
    - CTA button using --od-color-ai-speed
    - Background using --od-color-human-touch
  - Typography: headline uses --od-font-display, body uses --od-font-body
  - Spacing from --od-space-layout
  - Border-radius from --od-radius-human-touch for cards/buttons

  **Must NOT do**:
  - NO hardcoded colors (use var(--od-color-*))
  - NO hardcoded fonts (use var(--od-font-*))
  - NO hardcoded spacing (use var(--od-space-*))
  - NO inline styles

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: ["playwright"]
    - playwright: For visual QA verification after component creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Tasks 1, 2, 3

  **References**:
  - `src/styles/od-tokens.css:1-19` - All available tokens
  - `src/layouts/LandingLayout.astro` - Layout to extend or use
  - Phase 2 MDX content: `src/content/docs/blog/ai-speed-human-touch.mdx:1-15` - Brand messaging

  **Acceptance Criteria**:
  - [ ] File created: `src/components/Hero.astro`
  - [ ] Headline displays "AI Speed, Human Touch"
  - [ ] CTA button styled with var(--od-color-ai-speed)
  - [ ] All CSS uses var(--od-*) tokens only
  - [ ] `npm run lint:tokens` passes on this file
  - [ ] Page renders correctly in dev mode

  **QA Scenarios**:
  ```
  Scenario: Hero renders in browser
    Tool: Playwright
    Preconditions: Hero.astro created, `npm run dev` running
    Steps:
      1. Open browser to localhost:4321
      2. Look for hero section with class `.hero` or similar
      3. Verify headline text "AI Speed, Human Touch" visible
      4. Verify CTA button visible
    Expected Result: Page loads, hero visible, no console errors
    Failure Indicators: Page blank, console errors, missing elements
    Evidence: .sisyphus/evidence/task-4-hero-render.png

  Scenario: Hero uses only tokens (no hardcodes)
    Tool: Bash
    Preconditions: Hero.astro exists
    Steps:
      1. Run enhanced hardcode detection (see below)
    Expected Result: No matches
    Failure Indicators: Matches found - hardcoded values present
    Evidence: .sisyphus/evidence/task-4-hero-no-hardcode.txt
  ```

  **Enhanced Hardcode Detection** (use instead of basic grep):
  ```bash
  # Colors: hex, rgb(), rgba(), hsl(), hsla(), named colors
  grep -rnE 'color:\s*(#[0-9a-f]{3,6}|rgb\(|rgba\(|hsl\(|hsla\(|red|blue|green|black|white|yellow|purple|orange|gray)' src/components/Hero.astro

  # Fonts: anything not var(--od-font-*)
  grep -rnE 'font(-family)?:\s*(?!var\(--od-font)' src/components/Hero.astro

  # Spacing: margin, padding, gap with numeric values
  grep -rnE '(margin|padding|gap):\s*[0-9]+' src/components/Hero.astro

  # Border shorthand
  grep -rnE 'border:\s*[^v]' src/components/Hero.astro
  ```

  **Evidence to Capture**:
  - [ ] Screenshot of hero in browser
  - [ ] Grep results showing no hardcoded values

  **Commit**: YES (with Tasks 5, 6) - Message: `feat(landing): add Hero component`

---

- [x] 5. Create Features.astro component

  **What to do**:
  - Create `src/components/Features.astro`
  - Display two products from existing MDX files (NOTE: Only 2 products exist - "知识IP共创" does NOT have an MDX file):
    - 壹目·AI内容工坊 (one-mu) - from `one-mu.mdx:2`
    - 贯维·行业智造引擎 (guan-wei) - from `guan-wei.mdx:2` (NOT "AI翻译旗舰")
    - 贯蓝·AI创意助手 (guan-lan) - from `guan-lan.mdx:2` (NOT "AI应用矩阵", note: 蓝 not 维)
  - **Display 2-column grid** (not 3) since only 2 products exist. Update layout when 3rd product is created.
  - Each product card shows: title, pain_point, core_selling
  - Grid layout with 2 columns (responsive)
  - Uses tokens: --od-color-ai-speed for highlights, --od-radius-human-touch for cards
  - Spacing from --od-space-layout

  **Must NOT do**:
  - DO NOT create a third fake product card - only 2 products exist
  - NO hardcoded colors
  - NO hardcoded fonts
  - NO hardcoded spacing
  - NO inline styles

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: ["playwright"]
    - playwright: For visual QA verification

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Tasks 1, 2, 3

  **References**:
  - `src/content/docs/products/one-mu.mdx:1-9` - Frontmatter for product data
  - `src/content/docs/products/guan-wei.mdx:1-9` - Product 2 frontmatter
  - `src/content/docs/products/guan-lan.mdx:1-9` - Product 3 frontmatter
  - `src/styles/od-tokens.css:1-19` - Tokens for styling

  **Acceptance Criteria**:
  - [ ] File created: `src/components/Features.astro`
  - [ ] Two product cards rendered (only 2 products exist in codebase)
  - [ ] Each card shows title, pain_point, core_selling
  - [ ] Grid layout 2-column responsive
  - [ ] All CSS uses var(--od-*) tokens only
  - [ ] `npm run lint:tokens` passes on this file

  **QA Scenarios**:
  ```
  Scenario: Features displays two products
    Tool: Playwright
    Preconditions: Features.astro created
    Steps:
      1. Open browser to localhost:4321
      2. Look for features section with 2 product cards
      3. Verify each card has title and description
    Expected Result: 2 product cards visible with correct data
    Failure Indicators: Missing cards, wrong data, layout broken
    Evidence: .sisyphus/evidence/task-5-features-render.png

  Scenario: Features uses only tokens
    Tool: Bash
    Preconditions: Features.astro exists
    Steps:
      1. Run enhanced hardcode detection (see below)
    Expected Result: No hardcoded values found
    Failure Indicators: Matches found - hardcoded values present
    Evidence: .sisyphus/evidence/task-5-features-no-hardcode.txt
  ```

  **Enhanced Hardcode Detection** (use instead of basic grep):
  ```bash
  # Colors: hex, rgb(), rgba(), hsl(), hsla(), named colors
  grep -rnE 'color:\s*(#[0-9a-f]{3,6}|rgb\(|rgba\(|hsl\(|hsla\(|red|blue|green|black|white|yellow|purple|orange|gray)' src/components/Features.astro

  # Fonts: anything not var(--od-font-*)
  grep -rnE 'font(-family)?:\s*(?!var\(--od-font)' src/components/Features.astro

  # Spacing: margin, padding, gap with numeric values
  grep -rnE '(margin|padding|gap):\s*[0-9]+' src/components/Features.astro

  # Border shorthand
  grep -rnE 'border:\s*[^v]' src/components/Features.astro
  ```

  **Evidence to Capture**:
  - [ ] Screenshot of features section
  - [ ] Grep results showing no hardcoded values

  **Commit**: YES (with Tasks 4, 6) - Message: `feat(landing): add Features component`

---

- [x] 6. Create Testimonials.astro component

  **What to do**:
  - Create `src/components/Testimonials.astro`
  - Section with human insight quote (based on brand "Human Touch")
  - Quote about AI + humanity collaboration
  - Background using --od-color-bg-testimonials
  - Text styling with --od-font-body (reading comfort)
  - Uses --od-space-layout for spacing

  **Must NOT do**:
  - NO hardcoded colors
  - NO hardcoded fonts
  - NO hardcoded spacing
  - NO inline styles

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: ["playwright"]
    - playwright: For visual QA verification

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: Task 7
  - **Blocked By**: Tasks 1, 2, 3

  **References**:
  - `src/styles/od-tokens.css:9` - --od-color-bg-testimonials token
  - `src/styles/od-tokens.css:13` - --od-font-body token
  - `src/content/docs/blog/human-ai-collaboration-methodology.mdx` - Human insight content

  **Acceptance Criteria**:
  - [ ] File created: `src/components/Testimonials.astro`
  - [ ] Quote displayed with human insight theme
  - [ ] Background using var(--od-color-bg-testimonials)
  - [ ] All CSS uses var(--od-*) tokens only
  - [ ] `npm run lint:tokens` passes on this file

  **QA Scenarios**:
  ```
  Scenario: Testimonials renders with human touch theme
    Tool: Playwright
    Preconditions: Testimonials.astro created
    Steps:
      1. Open browser to localhost:4321
      2. Look for testimonials section with quote
      3. Verify background color matches --od-color-bg-testimonials
    Expected Result: Section visible with warm/human feel
    Failure Indicators: Missing section, wrong background
    Evidence: .sisyphus/evidence/task-6-testimonials-render.png

  Scenario: Testimonials uses only tokens
    Tool: Bash
    Preconditions: Testimonials.astro exists
    Steps:
      1. Run enhanced hardcode detection (see below)
    Expected Result: No matches
    Failure Indicators: Matches found - hardcoded values present
    Evidence: .sisyphus/evidence/task-6-testimonials-no-hardcode.txt
  ```

  **Enhanced Hardcode Detection** (use instead of basic grep):
  ```bash
  # Colors: hex, rgb(), rgba(), hsl(), hsla(), named colors
  grep -rnE 'color:\s*(#[0-9a-f]{3,6}|rgb\(|rgba\(|hsl\(|hsla\(|red|blue|green|black|white|yellow|purple|orange|gray)' src/components/Testimonials.astro

  # Fonts: anything not var(--od-font-*)
  grep -rnE 'font(-family)?:\s*(?!var\(--od-font)' src/components/Testimonials.astro

  # Spacing: margin, padding, gap with numeric values
  grep -rnE '(margin|padding|gap):\s*[0-9]+' src/components/Testimonials.astro

  # Border shorthand
  grep -rnE 'border:\s*[^v]' src/components/Testimonials.astro
  ```

  **Evidence to Capture**:
  - [ ] Screenshot of testimonials section
  - [ ] Grep results showing no hardcoded values

  **Commit**: YES (with Tasks 4, 5) - Message: `feat(landing): add Testimonials component`

---

- [x] 7. Create index.mdx landing page

  **What to do**:
  - Create `src/content/docs/index.mdx` (file does NOT exist - only index.mdx.bak backup exists)
  - Use LandingLayout as wrapper
  - Import and render Hero, Features, Testimonials components
  - Content should be minimal MDX, components do the heavy lifting
  - Keep Starlight's frontmatter (title, description) for SEO

  **Must NOT do**:
  - DO NOT add hardcoded styles in MDX
  - DO NOT create complex content - components handle rendering
  - DO NOT break existing Starlight routing

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
    - Basic MDX + Astro knowledge

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (with Tasks 8, 9)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `src/content/docs/index.mdx.bak:1-40` - Original Starlight structure
  - `src/layouts/LandingLayout.astro` - Layout to use
  - `src/components/Hero.astro` - Hero component
  - `src/components/Features.astro` - Features component
  - `src/components/Testimonials.astro` - Testimonials component

  **Acceptance Criteria**:
  - [ ] `src/content/docs/index.mdx` created with LandingLayout
  - [ ] Hero, Features, Testimonials imported and rendered
  - [ ] `npm run build` succeeds
  - [ ] Homepage accessible at site root

  **QA Scenarios**:
  ```
  Scenario: Homepage renders all three sections
    Tool: Playwright
    Preconditions: index.mdx created, `npm run dev` running
    Steps:
      1. Open browser to localhost:4321
      2. Verify Hero section visible
      3. Verify Features section with 2 products (only 2 exist)
      4. Verify Testimonials section
    Expected Result: All three sections visible, no console errors
    Failure Indicators: Missing sections, console errors
    Evidence: .sisyphus/evidence/task-7-homepage-render.png

  Scenario: Build succeeds with new homepage
    Tool: Bash
    Preconditions: index.mdx updated
    Steps:
      1. Run `npm run build`
    Expected Result: Build succeeds, dist/ contains index.html
    Failure Indicators: Build fails
    Evidence: .sisyphus/evidence/task-7-build-success.txt
  ```

  **Evidence to Capture**:
  - [ ] Screenshot of complete homepage
  - [ ] Build output showing success

  **Commit**: YES - Message: `feat(landing): integrate homepage components`

---

- [x] 8. BDD visual seamless switching verification

  **What to do**:
  - Modify `od-tokens.css` - change ONE token value (e.g., --od-color-ai-speed to different color)
  - Take screenshots of homepage BEFORE and AFTER
  - Verify multiple components update (not just one)
  - Revert the change to od-tokens.css (keep original values)

  **Must NOT do**:
  - DO NOT commit the temporary token change
  - DO NOT modify any component files - only od-tokens.css should change

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: ["playwright"]
    - playwright: For screenshot comparison

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (with Tasks 7, 9)
  - **Blocks**: Task 9
  - **Blocked By**: Task 7

  **References**:
  - `src/styles/od-tokens.css:1-19` - Token definitions to modify temporarily
  - BDD scenario from 官网vibe.txt: "When: OC only modifies od-tokens.css"

  **Acceptance Criteria**:
  - [ ] Screenshot BEFORE token change captured
  - [ ] ONE token value modified (e.g., --od-color-ai-speed)
  - [ ] Screenshot AFTER token change captured
  - [ ] Visual diff shows changes in MULTIPLE components (proves seamless switching)
  - [ ] od-tokens.css reverted to original values
  - [ ] `npm run lint:tokens` still passes after revert

  **QA Scenarios**:
  ```
  Scenario: Token change affects multiple components
    Tool: Playwright
    Preconditions: Homepage fully rendered
    Steps:
      1. Run `npm run dev` in background
      2. Open localhost:4321, screenshot BEFORE
      3. Modify od-tokens.css: change --od-color-ai-speed to #FF0000
      4. Refresh browser, screenshot AFTER
      5. Revert od-tokens.css to original
    Expected Result: Screenshots differ in at least Hero AND button colors (multiple components affected)
    Failure Indicators: Only one component changes (token not propagating)
    Evidence: .sisyphus/evidence/task-8-before.png, task-8-after.png

  Scenario: Revert leaves build in good state
    Tool: Bash
    Preconditions: od-tokens.css reverted
    Steps:
      1. Run `npm run build`
    Expected Result: Build succeeds
    Failure Indicators: Build fails after revert
    Evidence: .sisyphus/evidence/task-8-revert-build.txt
  ```

  **Evidence to Capture**:
  - [ ] Before/after screenshots showing visual difference
  - [ ] Build success after revert

  **Commit**: NO (temporary change reverted)

---

- [x] 9. Final QA and evidence collection

  **What to do**:
  - Run full `npm run build` - verify no errors
  - Run `npm run lint:tokens` - verify all components pass
  - Playwright: open homepage, verify all sections load without errors
  - Collect all evidence files to `.sisyphus/evidence/`
  - Verify all acceptance criteria from previous tasks

  **Must NOT do**:
  - DO NOT make any changes during this task - pure verification

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: ["playwright"]
    - playwright: Final browser verification

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (with Tasks 7, 8)
  - **Blocks**: None (final task)
  - **Blocked By**: Task 8

  **References**:
  - All previous tasks' acceptance criteria

  **Acceptance Criteria**:
  - [ ] `npm run build` succeeds
  - [ ] `npm run lint:tokens` passes
  - [ ] Playwright: homepage loads, no console errors
  - [ ] All 3 sections (Hero, Features, Testimonials) visible
  - [ ] All evidence files present in `.sisyphus/evidence/`
  - [ ] No hardcoded values in any component

  **QA Scenarios**:
  ```
  Scenario: Full build passes
    Tool: Bash
    Preconditions: All tasks complete
    Steps:
      1. Run `npm run build`
    Expected Result: Build succeeds, dist/ folder populated
    Failure Indicators: Build fails
    Evidence: .sisyphus/evidence/task-9-build.txt

  Scenario: Lint passes on all components
    Tool: Bash
    Preconditions: All components created
    Steps:
      1. Run `npm run lint:tokens`
    Expected Result: Exit code 0, no errors
    Failure Indicators: Lint errors
    Evidence: .sisyphus/evidence/task-9-lint.txt

  Scenario: Final browser verification
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Open localhost:4321
      2. Check for console errors (Error level only)
      3. Verify Hero visible
      4. Verify Features has 3 cards
      5. Verify Testimonials visible
      6. Screenshot full page
    Expected Result: No errors, all sections visible
    Failure Indicators: Console errors, missing sections
    Evidence: .sisyphus/evidence/task-9-final.png
  ```

  **Evidence to Capture**:
  - [ ] Build output
  - [ ] Lint output
  - [ ] Final screenshot
  - [ ] All previous evidence files collected

  **Commit**: YES (if all tasks successful) - Message: `feat(landing): complete Phase 3`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run build` + `npm run lint:tokens`. Review all changed files for: hardcoded values (colors, fonts, spacing), inline styles, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1 (Tasks 1-3)**: NO commits - foundation only
- **Wave 2 (Tasks 4-6)**: ONE commit - `feat(landing): add Hero, Features, Testimonials`
- **Wave 3 (Task 7)**: ONE commit - `feat(landing): integrate homepage components`
- **Task 8**: NO commit - temporary BDD verification
- **Task 9**: ONE commit - `feat(landing): complete Phase 3` (only if all QA passes)

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: success, dist/ populated
npm run lint:tokens    # Expected: exit 0, no errors
```

### Final Checklist
- [ ] All "Must Have" present (Hero, Features, Testimonials, LandingLayout)
- [ ] All "Must NOT Have" absent (no hardcoded colors/fonts/spacing)
- [ ] Build succeeds
- [ ] Lint passes on all components
- [ ] Playwright verification: all sections render, no console errors
- [ ] BDD scenario verified: token change propagates to multiple components
- [ ] Evidence files collected in `.sisyphus/evidence/`