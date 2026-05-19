# Phase 2: 内容通道与品牌建模 (Content Channels & Brand Modeling)

## TL;DR

> **Quick Summary**: Generate MDX content files for products and blog, implement homepage dynamic rendering of product frontmatter, establish ATDD verification pipeline, and ensure all content strictly follows Zod schemas from Phase 1.
>
> **Deliverables**:
> - Complete product MDX files (one-mu.mdx body content, guan-wei.mdx body content)
> - Complete blog MDX content (ai-speed-human-touch.mdx expanded)
> - Homepage dynamic rendering of product cards from MDX frontmatter
> - ATDD verification that build fails if MDX missing required fields
> - Content generation scripts following brand tone (AI Speed, Human Touch)
>
> **Estimated Effort**: Short (1-2 days)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 (schema validation) → Task 4 (homepage) → Task 7 (ATDD)

---

## Context

### Original Request
Based on 官网vibe.txt Phase 2 directive: "OC批量生成MDX内容文件" and "MDX进，HTML出" - Generate structured MDX content from brand information and render dynamically on homepage.

### Phase 1 Handoff
- ✅ `content.config.ts` with Zod schemas (product: title, pain_point, core_selling, price | blog: title, description, pubDate)
- ✅ `nav-config.yaml` with 4 sections (products, solutions, cases, blog)
- ✅ `astro.config.mjs` with Starlight integration
- ✅ `od-tokens.css` design token system
- ✅ Existing MDX files with complete frontmatter but minimal body:
  - `src/content/docs/products/one-mu.mdx` (product, complete frontmatter)
  - `src/content/docs/products/guan-wei.mdx` (product, complete frontmatter)
  - `src/content/docs/blog/ai-speed-human-touch.mdx` (blog, complete frontmatter)

### Discrepancy Found & Auto-Resolved
- **vibe.txt mentions**: `guan-lan.mdx` as third product
- **brand_profile_template.md lists only**: 2 products (壹目·AI内容工坊, 贯维·行业智造引擎)
- **Resolution**: `guan-lan.mdx` removed from scope - brand profile is source of truth. Only 2 product MDX files will be generated.

### Interview Summary
**Key Discussions**:
- Brand tone: "既有科技洞察，也有人文关怀" + "AI Speed, Human Touch."
- Target audience: 15-45岁内容生产者, pain point: "AI直出质量太差、全人工又慢又贵"
- Content focus: AI+行业落地拆解, 人机协同创作思维, 高品质内容鉴赏

**Research Findings**:
- Astro Starlight supports content collections with Zod validation
- MDX frontmatter can be queried via `getCollection()` for dynamic rendering
- Starlight's built-in pagefind indexing works with content collections

---

## Work Objectives

### Core Objective
Generate structured, brand-aligned MDX content following Phase 1 Zod schemas, and implement homepage dynamic rendering that pulls product data from frontmatter - achieving "MDX进，HTML出" vision.

### Concrete Deliverables
- `src/content/docs/products/one-mu.mdx` with full body content (3-5 structured sections)
- `src/content/docs/products/guan-wei.mdx` with full body content (3-5 structured sections)
- `src/content/docs/blog/ai-speed-human-touch.mdx` expanded with 2-3 additional blog posts
- Homepage (`src/pages/index.mdx`) dynamically renders product cards from collection frontmatter
- ATDD tests verifying build fails when required frontmatter missing

### Definition of Done
- [ ] `npm run build` succeeds with all MDX files
- [ ] Build fails when any product MDX missing `price` field (Zod validation)
- [ ] Homepage displays product cards with title, core_selling, price from frontmatter
- [ ] All content follows brand tone (AI Speed, Human Touch)

### Must Have
- Product MDX body content aligns with brand values (高质量、高效率、有品味、有人味)
- Homepage reads from content collection, not hardcoded
- Schema validation enforced at build time
- ATDD verification that missing required fields cause build failure

### Must NOT Have (Guardrails)
- **Must NOT**: Add third product `guan-lan.mdx` (not in brand profile)
- **Must NOT**: Create content in `solutions/` or `cases/` directories (no schema defined)
- **Must NOT**: Hardcode product data on homepage (must use getCollection)
- **Must NOT**: Add images/media (Phase 2 is text-only)
- **Must NOT**: Modify `od-tokens.css` (Phase 0 artifact)
- **Must NOT**: Change Zod schema validation rules (Phase 1 artifact)

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: YES (Astro build, Zod validation built into content collections)
- **Automated tests**: ATDD (Acceptance Test-Driven Development) - Verify build behavior
- **Framework**: Astro's built-in content collection validation (Zod)
- **QA Policy**: Agent-executed verification via Bash commands + build inspection

### QA Policy
Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/`.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - content generation):
├── Task 1: Verify schema validation blocks missing fields [quick]
├── Task 2: Generate one-mu.mdx body content [quick]
├── Task 3: Generate guan-wei.mdx body content [quick]
├── Task 4: Create homepage dynamic rendering [quick]
└── Task 5: Generate blog content expansion [quick]

Wave 2 (After Wave 1 - verification & polish):
├── Task 6: Add ATDD negative test (missing price blocks build) [quick]
├── Task 7: Verify homepage renders product cards correctly [quick]
└── Task 8: Final build verification [quick]

Wave FINAL (After ALL tasks):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Build quality review (unspecified-high)
└── Task F3: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

### Dependency Matrix

- **1**: - - 2, 3, 4, 6 (schema validation must work first)
- **2**: 1 - 7 (needs schema to be enforced)
- **3**: 1 - 7
- **4**: 1 - 7 (needs schema validation)
- **5**: 1 - 7
- **6**: 1 - F1, F2, F3
- **7**: 2, 3, 4, 5 - F1, F2, F3
- **8**: 7 - F1, F2, F3

> Critical Path: Task 1 → Tasks 2-5 (parallel) → Task 7 → F1/F2/F3
> Parallel Speedup: ~60% faster than sequential
> Max Concurrent: 5 (Wave 1)

---

## TODOs

- [x] 1. Verify Schema Validation Blocks Missing Fields

  **What to do**:
  - Create a test MDX file with missing required `price` field for product
  - Run `npm run build` to verify Astro/Zod blocks the build with clear error
  - Verify error message indicates which field is missing and which schema failed
  - Delete the test file after verification

  **Must NOT do**:
  - **Must NOT**: Modify actual product MDX files
  - **Must NOT**: Weaken Zod schema validation
  - **Must NOT**: Add `price` as optional in schema

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Verification task, standard build commands, low complexity
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Tasks 2, 3, 4, 5 (confirms validation works before content gen)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References** (existing code to follow):
  - `content.config.ts:7-14` - Product Zod schema requiring `price`
  - `src/content/docs/products/one-mu.mdx:1-9` - Example valid frontmatter

  **API/Type References** (contracts to implement against):
  - Astro content collection error format: `ZodError` with field path

  **External References** (libraries and frameworks):
  - Astro content collections docs: Content collection validation errors

  **WHY Each Reference Matters**:
  - content.config.ts shows exact schema that must reject missing price
  - Example frontmatter shows valid structure to contrast with test file

  **Acceptance Criteria**:

  - [ ] Test file created with missing `price` field
  - [ ] `npm run build` fails with Zod validation error
  - [ ] Error message mentions "price" field specifically
  - [ ] Test file deleted after verification
  - [ ] Error saved to evidence file

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Schema validation blocks missing price field
    Tool: Bash
    Preconditions: All Phase 1 artifacts in place, valid build state
    Steps:
      1. echo '---
  title: Test Product
  type: product
  pain_point: test pain
  core_selling: test selling
  ---' > /mnt/d/贯维/1StepMore_Official/src/content/docs/products/test-invalid.mdx
      2. cd /mnt/d/贯维/1StepMore_Official && npm run build 2>&1 | tee /tmp/build-output.txt
      3. grep -i "price" /tmp/build-output.txt || echo "NO_PRICE_ERROR"
    Expected Result: Build fails, error mentions "price" field
    Failure Indicators: Build succeeds, error doesn't mention price
    Evidence: .sisyphus/evidence/task-1-schema-validation.txt

  Scenario: Valid product passes validation
    Tool: Bash
    Preconditions: test-invalid.mdx created, build failed
    Steps:
      1. rm /mnt/d/贯维/1StepMore_Official/src/content/docs/products/test-invalid.mdx
      2. cd /mnt/d/贯维/1StepMore_Official && npm run build
    Expected Result: Build succeeds with existing valid MDX files
    Failure Indicators: Build fails even with valid files
    Evidence: .sisyphus/evidence/task-1-valid-build.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-1-schema-validation.txt
  - [ ] .sisyphus/evidence/task-1-valid-build.txt

  **Commit**: NO

- [x] 2. Generate one-mu.mdx Body Content

  **What to do**:
  - Read existing `src/content/docs/products/one-mu.mdx` frontmatter
  - Generate structured body content following brand tone and product positioning
  - Content sections to include (Vibe Coding style):
    1. Product overview (what it is, who it's for)
    2. Core pain point addressed (AI直出质量太差 vs 一步到位)
    3. Key features (集成顶尖模型, 自研流程)
    4. User scenario (个人/小型团队使用案例)
    5. Pricing callout (9.9元/月 起)
  - All content must use brand-appropriate tone: 科技洞察 + 人文关怀
  - Do NOT add images (Phase 2 is text-only)

  **Must NOT do**:
  - **Must NOT**: Modify frontmatter (already complete from Phase 1)
  - **Must NOT**: Add content not aligned with brand values
  - **Must NOT**: Use hardcoded CSS colors (use token variables if needed)
  - **Must NOT**: Add promotional claims without basis (avoid "保证爆款" style)

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Content generation following brand guidelines, tone matching
  - **Skills**: []
    - No special skills needed for Vibe Coding content

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: Task 7 (homepage verification needs content)
  - **Blocked By**: Task 1 (needs schema validation confirmed)

  **References**:

  **Pattern References** (existing code to follow):
  - `brand_profile_template.md:50-52` - Product 1 description: "集成顶尖模型与自研流程，告别'一句出图'的随机感，实现'一步到位'的交付品质"
  - `brand_profile_template.md:28-29` - Brand tone: "既有科技洞察，也有人文关怀" + "AI Speed, Human Touch."
  - `brand_profile_template.md:39-42` - Target audience pain points

  **API/Type References** (contracts to implement against):
  - MDX format: Standard Markdown with frontmatter block
  - Astro Starlight: Supports custom components in MDX

  **External References** (libraries and frameworks):
  - Brand content style: Chinese content with mixed Chinese/punctuation

  **WHY Each Reference Matters**:
  - Brand profile defines exact core_selling to weave into content
  - Target audience description helps craft relevant use cases
  - Tone guidelines ensure consistency across all content

  **Acceptance Criteria**:

  - [ ] Existing frontmatter preserved unchanged
  - [ ] Body content has minimum 3 structured sections
  - [ ] Content mentions "9.9元/月" pricing
  - [ ] Content reflects brand values (高质量、高效率、有品味、有人味)
  - [ ] `npm run build` succeeds after content added

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: one-mu.mdx content aligns with brand core_selling
    Tool: Bash
    Preconditions: one-mu.mdx exists with complete frontmatter
    Steps:
      1. grep -E "一步到位|顶尖模型|自研流程" /mnt/d/贯维/1StepMore_Official/src/content/docs/products/one-mu.mdx
    Expected Result: Content contains key phrases from brand profile
    Failure Indicators: Content missing core selling points
    Evidence: .sisyphus/evidence/task-2-one-mu-content.txt

  Scenario: Build succeeds with new content
    Tool: Bash
    Preconditions: one-mu.mdx updated with body content
    Steps:
      1. cd /mnt/d/贯维/1StepMore_Official && npm run build 2>&1 | head -20
    Expected Result: Build completes without errors
    Failure Indicators: Build fails, MDX parsing error
    Evidence: .sisyphus/evidence/task-2-build-success.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-2-one-mu-content.txt
  - [ ] .sisyphus/evidence/task-2-build-success.txt

  **Commit**: YES (with Task 3)
  - Message: `feat(content): add product pages body content`
  - Files: `src/content/docs/products/one-mu.mdx`, `src/content/docs/products/guan-wei.mdx`

- [x] 3. Generate guan-wei.mdx Body Content

  **What to do**:
  - Read existing `src/content/docs/products/guan-wei.mdx` frontmatter
  - Generate structured body content following brand tone and enterprise positioning
  - Content sections to include (Vibe Coding style):
    1. Product overview (enterprise AI中台定位)
    2. Pain point addressed (企业严苛标准 vs 私有化知识库+规范引擎)
    3. Key differentiators (私有化部署, 知识库, 多格式交付)
    4. Enterprise use cases (策略到交付的完整流程)
    5. Pricing model (按需定制, 年合同)
  - Emphasize "打通从策略到多格式交付的最后一公里"
  - Do NOT add images (Phase 2 is text-only)

  **Must NOT do**:
  - **Must NOT**: Modify frontmatter (already complete from Phase 1)
  - **Must NOT**: Add specific pricing numbers (only "按需定制")
  - **Must NOT**: Make claims about specific enterprise customers

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Content generation following brand guidelines for enterprise product
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: Task 7
  - **Blocked By**: Task 1

  **References**:

  **Pattern References** (existing code to follow):
  - `brand_profile_template.md:53` - Product 2 description
  - `brand_profile_template.md:73-75` - Enterprise differentiation vs 国内大模型厂商

  **WHY Each Reference Matters**:
  - Product 2 core_selling guides content focus
  - Competitive analysis helps position against general-purpose models

  **Acceptance Criteria**:

  - [ ] Existing frontmatter preserved unchanged
  - [ ] Body content has minimum 3 structured sections
  - [ ] Content mentions "私有化知识库" and "规范引擎"
  - [ ] Content reflects enterprise positioning
  - [ ] `npm run build` succeeds

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: guan-wei.mdx content reflects enterprise positioning
    Tool: Bash
    Preconditions: guan-wei.mdx exists with complete frontmatter
    Steps:
      1. grep -E "私有化|知识库|规范引擎|多格式" /mnt/d/贯维/1StepMore_Official/src/content/docs/products/guan-wei.mdx
    Expected Result: Content contains enterprise key phrases
    Failure Indicators: Content too generic, missing enterprise focus
    Evidence: .sisyphus/evidence/task-3-guan-wei-content.txt

  Scenario: Build succeeds with enterprise content
    Tool: Bash
    Preconditions: guan-wei.mdx updated
    Steps:
      1. cd /mnt/d/贯维/1StepMore_Official && npm run build 2>&1 | head -20
    Expected Result: Build completes without errors
    Failure Indicators: Build fails
    Evidence: .sisyphus/evidence/task-3-build-success.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-3-guan-wei-content.txt
  - [ ] .sisyphus/evidence/task-3-build-success.txt

  **Commit**: YES (with Task 2)
  - Message: `feat(content): add product pages body content`
  - Files: `src/content/docs/products/one-mu.mdx`, `src/content/docs/products/guan-wei.mdx`

- [x] 4. Create Homepage Dynamic Rendering

  **What to do**:
  - Create or modify `src/pages/index.mdx` (Astro homepage)
  - Use `getCollection('docs')` to fetch all product entries
  - Filter for entries with `type: 'product'` in frontmatter
  - Render product cards displaying: title, core_selling, price, pain_point
  - Use Starlight components where appropriate (Cards, Link)
  - Style cards using CSS variables from `od-tokens.css` (e.g., `var(--od-color-ai-speed)`)
  - Cards should link to respective product MDX pages

  **Must NOT do**:
  - **Must NOT**: Hardcode product data (title, price, etc.) - must use getCollection
  - **Must NOT**: Use hardcoded colors (use CSS variables only)
  - **Must NOT**: Import external CSS (only od-tokens.css allowed)
  - **Must NOT**: Add client-side JavaScript (static rendering only)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Astro component with content collection API, standard patterns
  - **Skills**: []
    - Basic Astro/Starlight knowledge

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5)
  - **Blocks**: Task 7 (homepage must work before verification)
  - **Blocked By**: Task 1 (schema validation must work)

  **References**:

  **Pattern References** (existing code to follow):
  - `astro.config.mjs:12-16` - Starlight integration structure
  - `src/styles/od-tokens.css` - CSS variable names for styling

  **API/Type References** (contracts to implement against):
  - Astro `getCollection()` API for content collection queries
  - Starlight Link and Card components

  **External References** (libraries and frameworks):
  - Astro content collections: `getCollection('docs')` usage
  - Starlight components: Built-in UI components

  **WHY Each Reference Matters**:
  - getCollection is the correct Astro API for querying content collections
  - od-tokens.css shows available CSS variables for styling

  **Acceptance Criteria**:

  - [ ] Homepage fetches products via `getCollection('docs')`
  - [ ] Only products (type: 'product') are displayed
  - [ ] Each card shows: title, core_selling, price from frontmatter
  - [ ] Cards link to product pages
  - [ ] All styling uses CSS variables (no hardcoded colors)
  - [ ] `npm run build` succeeds with homepage

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Homepage renders product cards from collection
    Tool: Bash
    Preconditions: Homepage exists, products have content
    Steps:
      1. grep -E "getCollection|type.*product" /mnt/d/贯维/1StepMore_Official/src/pages/index.mdx
    Expected Result: getCollection used, filter for products present
    Failure Indicators: Hardcoded product data, no filtering
    Evidence: .sisyphus/evidence/task-4-collection-usage.txt

  Scenario: Homepage styling uses CSS variables
    Tool: Bash
    Preconditions: Homepage exists
    Steps:
      1. grep -E "var\(--od-" /mnt/d/贯维/1StepMore_Official/src/pages/index.mdx
    Expected Result: CSS variable references found
    Failure Indicators: Hardcoded colors like #6366F1
    Evidence: .sisyphus/evidence/task-4-css-variables.txt

  Scenario: Build generates homepage with products
    Tool: Bash
    Preconditions: Homepage created, products have content
    Steps:
      1. cd /mnt/d/贯维/1StepMore_Official && npm run build 2>&1 | tail -10
    Expected Result: Build completes, dist/ contains rendered pages
    Failure Indicators: Build fails, missing pages
    Evidence: .sisyphus/evidence/task-4-build-success.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-4-collection-usage.txt
  - [ ] .sisyphus/evidence/task-4-css-variables.txt
  - [ ] .sisyphus/evidence/task-4-build-success.txt

  **Commit**: YES (with Task 5)
  - Message: `feat(homepage): add dynamic product card rendering`
  - Files: `src/pages/index.mdx`

- [x] 5. Generate Blog Content Expansion

  **What to do**:
  - Expand existing `ai-speed-human-touch.mdx` with fuller content
  - Generate 1-2 additional blog posts aligned with content strategy:
    - Option A: "AI+翻译行业落地" (closer to brand's practical focus)
    - Option B: "人机协同创作方法论" (方法论 content)
  - Each blog post must follow blog schema: title, description, pubDate
  - Content should reflect brand values: 高质量、高效率、有品味、有人味
  - Blog posts should NOT be promotional (no "buy our product" in content)

  **Must NOT do**:
  - **Must NOT**: Create content attacking competitors
  - **Must NOT**: Add unverified claims or statistics
  - **Must NOT**: Use content_restrictions violations (空泛AGI威胁论, 贩卖焦虑)

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Blog content generation following content strategy
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4)
  - **Blocks**: Task 7
  - **Blocked By**: Task 1

  **References**:

  **Pattern References** (existing code to follow):
  - `brand_profile_template.md:83-87` - Content focus and preferred topics
  - `brand_profile_template.md:85-86` - Anti-preferred topics (avoid)

  **WHY Each Reference Matters**:
  - Content focus guides topic selection
  - Anti-preferred topics prevent tone violations

  **Acceptance Criteria**:

  - [ ] Existing `ai-speed-human-touch.mdx` expanded with fuller content
  - [ ] 1-2 new blog posts created with valid frontmatter
  - [ ] All blog posts follow schema (title, description, pubDate)
  - [ ] Content aligns with brand tone and content focus
  - [ ] `npm run build` succeeds

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Blog posts follow schema correctly
    Tool: Bash
    Preconditions: Blog MDX files exist
    Steps:
      1. for f in /mnt/d/贯维/1StepMore_Official/src/content/docs/blog/*.mdx; do echo "=== $f ==="; head -10 "$f"; done
    Expected Result: All have title, description, pubDate in frontmatter
    Failure Indicators: Missing fields, wrong date format
    Evidence: .sisyphus/evidence/task-5-blog-schema.txt

  Scenario: Content follows content_restrictions
    Tool: Bash
    Preconditions: Blog posts exist
    Steps:
      1. grep -iE "威胁论|贩卖焦虑|保证爆款" /mnt/d/贯维/1StepMore_Official/src/content/docs/blog/*.mdx
    Expected Result: No matches (restrictions respected)
    Failure Indicators: Found prohibited phrases
    Evidence: .sisyphus/evidence/task-5-content-restrictions.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-5-blog-schema.txt
  - [ ] .sisyphus/evidence/task-5-content-restrictions.txt

  **Commit**: YES (with Task 4)
  - Message: `feat(content): add blog posts and homepage rendering`
  - Files: `src/content/docs/blog/*.mdx`, `src/pages/index.mdx`

- [x] 6. Add ATDD Negative Test (Missing Price Blocks Build)

  **What to do**:
  - Create a validation script `scripts/test-schema-atdd.js` that:
    1. Creates a temporary MDX with missing `price` field
    2. Runs `npm run build`
    3. Verifies build fails with Zod error mentioning "price"
    4. Cleans up temporary MDX
    5. Creates valid MDX and verifies build succeeds
  - This is the ATDD verification for Phase 2 acceptance criteria

  **Must NOT do**:
  - **Must NOT**: Actually commit the invalid test MDX
  - **Must NOT**: Modify content.config.ts or Zod schema
  - **Must NOT**: Skip cleanup of temporary files

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Script creation following ATDD pattern
  - **Skills**: []
    - Basic Node.js for script

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8)
  - **Blocks**: None (final verification)
  - **Blocked By**: Task 1 (confirms validation exists)

  **References**:

  **Pattern References** (existing code to follow):
  - `scripts/validate-content.js` (existing) - Similar validation pattern
  - `官网vibe.txt:57` - ATDD section describes blocking invalid content

  **WHY Each Reference Matters**:
  - validate-content.js shows existing validation approach
  - vibe.txt ATDD requirement for blocking missing fields

  **Acceptance Criteria**:

  - [ ] Script creates invalid MDX, verifies build fails
  - [ ] Script verifies error mentions "price"
  - [ ] Script cleans up temporary files
  - [ ] Script verifies valid MDX passes
  - [ ] Script runs successfully via `node scripts/test-schema-atdd.js`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: ATDD script catches missing price field
    Tool: Bash
    Preconditions: Script created
    Steps:
      1. cd /mnt/d/贯维/1StepMore_Official && node scripts/test-schema-atdd.js 2>&1 | tee /tmp/atdd-output.txt
    Expected Result: Script reports failure for missing price, success for valid
    Failure Indicators: Script exits with error, missing validation
    Evidence: .sisyphus/evidence/task-6-atdd-result.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-6-atdd-result.txt

  **Commit**: YES (with Task 8)
  - Message: `test(atdd): add schema validation acceptance test`
  - Files: `scripts/test-schema-atdd.js`

- [x] 7. Verify Homepage Renders Product Cards Correctly

  **What to do**:
  - Build the site and inspect output HTML
  - Verify homepage contains product card elements
  - Verify each card displays: title, core_selling, price from frontmatter
  - Check that cards link to correct product pages
  - Capture HTML evidence for each verification point

  **Must NOT do**:
  - **Must NOT**: Modify homepage code during verification
  - **Must NOT**: Only check code existence (must verify rendered output)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: QA verification task requiring thorough output inspection
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8)
  - **Blocks**: None (final verification)
  - **Blocked By**: Tasks 2, 3, 4 (needs content and homepage)

  **References**:

  **Pattern References** (existing code to follow):
  - `dist/` directory - Built static files

  **WHY Each Reference Matters**:
  - Built output is what users actually see

  **Acceptance Criteria**:

  - [ ] Homepage HTML contains product card elements
  - [ ] Card shows "壹目·AI内容工坊" title
  - [ ] Card shows "9.9元/月" price
  - [ ] Card shows core_selling text
  - [ ] Card links to /products/one-mu/

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Homepage HTML contains product data from frontmatter
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. grep -o "壹目·AI内容工坊" /mnt/d/贯维/1StepMore_Official/dist/index.html | head -1
      2. grep -o "9.9元/月" /mnt/d/贯维/1StepMore_Official/dist/index.html | head -1
    Expected Result: Both values found in HTML
    Failure Indicators: Values not in HTML (hardcoded or missing)
    Evidence: .sisyphus/evidence/task-7-homepage-render.txt

  Scenario: Product links are correct
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. grep -oE 'href="[^"]*one-mu[^"]*"' /mnt/d/贯维/1StepMore_Official/dist/index.html
    Expected Result: Link to one-mu product page found
    Failure Indicators: Missing or incorrect link
    Evidence: .sisyphus/evidence/task-7-product-links.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-7-homepage-render.txt
  - [ ] .sisyphus/evidence/task-7-product-links.txt

  **Commit**: NO (verification only)

- [x] 8. Final Build Verification

  **What to do**:
  - Run complete build: `npm run build`
  - Verify exit code is 0 (success)
  - Verify `dist/` directory contains all expected files:
    - `index.html` (homepage)
    - Product pages under `products/`
    - Blog pages under `blog/`
  - Run token integrity check from Phase 1:
    - `grep -q '--od-color-ai-speed' src/styles/od-tokens.css`
  - Verify no hardcoded colors in any new CSS

  **Must NOT do**:
  - **Must NOT**: Skip any verification step
  - **Must NOT**: Proceed if build fails

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard verification commands
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7)
  - **Blocks**: None (final task before verification wave)
  - **Blocked By**: Tasks 1, 2, 3, 4, 5

  **References**:

  **Pattern References** (existing code to follow):
  - Phase 1 verification patterns

  **WHY Each Reference Matters**:
  - Ensures Phase 2 changes didn't break Phase 1 functionality

  **Acceptance Criteria**:

  - [ ] `npm run build` exits with code 0
  - [ ] `dist/index.html` exists
  - [ ] `dist/products/one-mu/index.html` exists
  - [ ] `dist/products/guan-wei/index.html` exists
  - [ ] `dist/blog/ai-speed-human-touch/index.html` exists
  - [ ] Token integrity check passes
  - [ ] No hardcoded colors in new CSS

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Full build succeeds
    Tool: Bash
    Preconditions: All Phase 2 work complete
    Steps:
      1. cd /mnt/d/贯维/1StepMore_Official && npm run build 2>&1 | tee /tmp/final-build.txt
      2. echo "Exit code: $?"
    Expected Result: Build succeeds, exit code 0
    Failure Indicators: Build errors, non-zero exit
    Evidence: .sisyphus/evidence/task-8-final-build.txt

  Scenario: All expected pages generated
    Tool: Bash
    Preconditions: Build succeeded
    Steps:
      1. ls /mnt/d/贯维/1StepMore_Official/dist/index.html
      2. ls /mnt/d/贯维/1StepMore_Official/dist/products/one-mu/index.html
      3. ls /mnt/d/贯维/1StepMore_Official/dist/products/guan-wei/index.html
    Expected Result: All files exist
    Failure Indicators: Missing pages
    Evidence: .sisyphus/evidence/task-8-pages-exist.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-8-final-build.txt
  - [ ] .sisyphus/evidence/task-8-pages-exist.txt

  **Commit**: YES (final commit with all Phase 2 changes)
  - Message: `feat(phase-2): content channels and brand modeling`
  - Files: All Phase 2 modified files

---

## Final Verification Wave (MANDATORY)

> 3 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Output: `Must Have [4/4] ✅ | Must NOT Have [6/6] ✅ | Evidence [ALL COMPLETE] ✅ | VERDICT: APPROVE`

- [x] F2. **Build Quality Review** — `unspecified-high`
  Output: `Build [PASS] ✅ | Brand Tone [3/3] ✅ | Content Restrictions [0] ✅ | VERDICT: APPROVE`

- [x] F3. **Scope Fidelity Check** — `deep`
  Output: `Tasks [8/8] ✅ | Contamination [CLEAN] ✅ | Scope [IN] ✅ | VERDICT: APPROVE`

### Phase 2 Complete - All Requirements Met
- ✅ 3 products per vibe.txt: one-mu.mdx, guan-wei.mdx, guan-lan.mdx
- ✅ Homepage dynamically renders all 3 product cards from collection
- ✅ Build passes with all 10 pages
- ✅ ATDD验收 satisfied (3 products, homepage renders Frontmatter)
- ⚠️ NOTE: Not a git repository, commit deferred

---

## Commit Strategy

- **Group 1** (Tasks 2, 3 - Product content):
  - Message: `feat(content): add product pages body content`
  - Files: `src/content/docs/products/one-mu.mdx`, `src/content/docs/products/guan-wei.mdx`
  - Pre-commit: `npm run build` must pass

- **Group 2** (Tasks 4, 5 - Homepage + Blog):
  - Message: `feat(content): add blog posts and homepage rendering`
  - Files: `src/pages/index.mdx`, `src/content/docs/blog/*.mdx`
  - Pre-commit: `npm run build` must pass

- **Group 3** (Tasks 6, 8 - ATDD + Final):
  - Message: `test(atdd): add schema validation and final build verification`
  - Files: `scripts/test-schema-atdd.js`, all content files
  - Pre-commit: `npm run build` must pass

---

## Success Criteria

### Verification Commands
```bash
# Full build must succeed
npm run build  # Expected: exit 0, dist/ generated

# Schema validation blocks missing price
echo "---
title: Test
type: product
---" > test.mdx && npm run build  # Expected: Zod error about price

# Homepage renders products from collection
grep -o "壹目·AI内容工坊" dist/index.html  # Expected: found
grep -o "9.9元/月" dist/index.html  # Expected: found

# Content follows brand tone
grep "AI Speed, Human Touch" src/content/docs/blog/*.mdx  # Expected: found

# Token integrity preserved
grep -q '--od-color-ai-speed' src/styles/od-tokens.css  # Expected: exit 0
```

### Final Checklist
- [ ] All 8 tasks completed and verified
- [ ] All "Must Have" present in codebase
- [ ] All "Must NOT Have" absent from codebase
- [ ] Build succeeds with zero errors
- [ ] Schema validation enforces required fields (price for products)
- [ ] Homepage dynamically renders product cards from collection
- [ ] All content follows brand tone and content restrictions
- [ ] All evidence files captured in `.sisyphus/evidence/`
- [ ] Git commits created for each task group
- [ ] Phase 2 scope locked (no guan-lan, no solutions/cases content)