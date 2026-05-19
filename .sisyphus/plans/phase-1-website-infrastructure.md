# Phase 1: 基础设施与输入守卫 (Infrastructure & Input Guardians)

## TL;DR

> **Quick Summary**: Initialize Astro + Starlight with GitHub Pages base path, create nav-config.yaml driven routing, implement strict Zod schemas for content validation, and establish the build verification pipeline.
>
> **Deliverables**:
> - Astro + Starlight project with correct `site` and `base` configuration
> - `nav-config.yaml` as single source of truth for sidebar generation
> - `src/content/config.ts` with Zod schemas for products and blog
> - Build verification pipeline with lint guards
> - GitHub Actions workflow for automatic deployment
>
> **Estimated Effort**: Short (1-2 days)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 (Astro init) → Task 3 (Zod schema) → Task 5 (Build verification)

---

## Context

### Original Request
Based on 官网vibe.txt Phase 1 directive: "在 OpenCode 中输入：'使用 Astro + Starlight 初始化项目...确保部署到 GitHub Pages 时 CSS 和路由不会 404'"

### Phase 0 Handoff
- ✅ `od-tokens.css` exists with all 7 core tokens + extended tokens
- ✅ `index.html` and `landing-design.md` created
- ✅ Brand context loaded from `brand_profile_template.md`
- Repository: `1StepMore/1StepMore_Official`
- Base path for GitHub Pages: `/1StepMore_Official/`

### Interview Summary
**Metis Gap Analysis Found**:
- Repository name confirmed: `1StepMore/1StepMore_Official`
- Astro project NOT initialized yet (no package.json exists)
- Test infrastructure decision pending (TLDD recommended for Phase 1)
- Content scope: Products + Blog + Cases per nav-config.yaml

---

## Work Objectives

### Core Objective
Establish the infrastructure foundation for 壹目贯维 website using Astro + Starlight, with configuration-driven routing and strict content validation.

### Concrete Deliverables
- `package.json` with Astro + Starlight dependencies
- `astro.config.mjs` with correct `site` and `base: '/1StepMore_Official/'`
- `src/content/config.ts` with Zod schemas
- `nav-config.yaml` for dynamic sidebar generation
- `.github/workflows/deploy.yml` for GitHub Pages deployment
- Lint harness in CI to block hardcoded CSS values

### Definition of Done
- [ ] `npm run build` succeeds with zero errors
- [ ] Build output is served correctly at `/1StepMore_Official/` base path
- [ ] Content schema validation blocks missing required fields
- [ ] GitHub Actions deploys to GitHub Pages on main branch push

### Must Have
- Astro + Starlight properly initialized
- GitHub Pages base path configured correctly
- Zod schema validation for products (title, pain_point, core_selling, price) and blog (title, description, pubDate)
- nav-config.yaml driven sidebar (not hardcoded Starlight sidebar)
- Token integrity preserved (no hardcoded colors anywhere)

### Must NOT Have (Guardrails)
- **Must NOT**: Initialize Astro outside workspace root
- **Must NOT**: Touch or modify `od-tokens.css` (Phase 0 output, sacred)
- **Must NOT**: Use hardcoded color values in any new CSS
- **Must NOT**: Use inline styles for anything that should be token-based
- **Must NOT**: Create static sidebar entries (must be yaml-driven)
- **Must NOT**: Skip build verification step
- **Must NOT**: Relax Zod validation (price is required for products)

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO (starting from scratch)
- **Automated tests**: TLDD (Tests After) - Phase 1 focuses on infrastructure, testing comes in later phases
- **Framework**: None in Phase 1 (build verification only)
- **QA Policy**: Agent-executed verification via Bash commands

### QA Policy
Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - foundation + config):
├── Task 1: Initialize Astro + Starlight project [quick]
├── Task 2: Configure astro.config.mjs base path [quick]
├── Task 3: Create nav-config.yaml structure [quick]
└── Task 4: Create src/content/config.ts Zod schemas [quick]

Wave 2 (After Wave 1 - build + deploy):
├── Task 5: Build verification + token integrity check [quick]
├── Task 6: Create stub MDX content for ATDD [quick]
├── Task 7: Set up GitHub Actions deploy workflow [quick]
└── Task 8: Configure lint harness in CI [quick]

Wave FINAL (After ALL tasks):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Build quality review (unspecified-high)
└── Task F3: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

### Dependency Matrix

- **1**: - - 5
- **2**: 1 - 5
- **3**: - - (independent, can run with Wave 1)
- **4**: - - (independent, can run with Wave 1)
- **5**: 1, 2 - F1, F2, F3
- **6**: 3, 4 - F1, F2, F3
- **7**: 5 - F1, F2, F3
- **8**: 5, 7 - F1, F2, F3

> Critical Path: Task 1 → Task 2 → Task 5 → F1/F2/F3
> Parallel Speedup: ~40% faster than sequential
> Max Concurrent: 4 (Wave 1)

---

- [x] 1. Initialize Astro + Starlight Project

  **What to do**:
  - Run `npm create astro@latest . -- --template starlight --no-install --no-git` in workspace root
  - Install dependencies: `npm install`
  - Verify Starlight templates are properly installed
  - Create initial `src/content/` directory structure

  **Must NOT do**:
  - **Must NOT**: Initialize outside `/mnt/d/贯维/1StepMore_Official/` workspace
  - **Must NOT**: Touch `od-tokens.css` (Phase 0 artifact, sacred)
  - **Must NOT**: Modify `index.html` from Phase 0

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard scaffolding task, well-defined commands, no complex problem-solving
  - **Skills**: []
    - No special skills needed for npm scaffolding

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Task 2, Task 5
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References** (existing code to follow):
  - None - this is fresh initialization

  **API/Type References** (contracts to implement against):
  - Astro Starlight docs: `https://starlight.astro.build/getting-started/` - official setup guide

  **External References** (libraries and frameworks):
  - `npm create astro@latest` - Starlight template flag: `--template starlight`
  - Node.js >=18.17.0 or >=20.03.0 required

  **WHY Each Reference Matters**:
  - Astro Starlight getting-started guide provides the canonical init commands

  **Acceptance Criteria**:

  - [ ] `package.json` exists with `astro` and `@astrojs/starlight` dependencies
  - [ ] `astro.config.mjs` exists (unconfigured yet)
  - [ ] `src/` directory created with initial structure
  - [ ] `npm install` completes without error

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Astro project initializes without error
    Tool: Bash
    Preconditions: Clean workspace, no existing package.json
    Steps:
      1. cd /mnt/d/贯维/1StepMore_Official && npm create astro@latest . -- --template starlight --no-install --no-git --yes
      2. npm install
    Expected Result: package.json created, node_modules/ installed, no errors
    Failure Indicators: Package manager errors, permission denied, template not found
    Evidence: .sisyphus/evidence/task-1-init-success.log

  Scenario: Starlight dependencies are correctly installed
    Tool: Bash
    Preconditions: package.json exists from previous scenario
    Steps:
      1. cat package.json | grep -E '"@astrojs/starlight"|"astro"'
    Expected Result: Both packages listed in dependencies
    Failure Indicators: Missing packages, wrong versions
    Evidence: .sisyphus/evidence/task-1-deps-check.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-1-init-success.log
  - [ ] .sisyphus/evidence/task-1-deps-check.txt

  **Commit**: NO

- [x] 2. Configure astro.config.mjs with GitHub Pages Base Path

  **What to do**:
  - Read current `astro.config.mjs` (created by Starlight template)
  - Configure `site` URL and `base` path for GitHub Pages
  - Add required Starlight configuration with `social` and `nav` integrations
  - Ensure base path is `/1StepMore_Official/` for GitHub Pages deployment

  **Must NOT do**:
  - **Must NOT**: Use hardcoded colors (use `var(--od-*)` tokens only)
  - **Must NOT**: Set wrong base path (must be exactly `/1StepMore_Official/`)
  - **Must NOT**: Modify `od-tokens.css` (read-only reference)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard config modification, template-driven, low complexity
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Task 5
  - **Blocked By**: Task 1 (needs astro.config.mjs to exist)

  **References**:

  **Pattern References** (existing code to follow):
  - `src/styles/od-tokens.css` - Reference token variable names only

  **API/Type References** (contracts to implement against):
  - Astro config schema: `site` (string, full URL) and `base` (string, starts with /)
  - Starlight config: `title`, `defaultLocale`, `locales`

  **External References** (libraries and frameworks):
  - Astro docs: `https://docs.astro.build/en/reference/configuration-reference/` - site and base options
  - Starlight docs: `https://starlight.astro.build/reference/configuration/` - full config reference

  **WHY Each Reference Matters**:
  - Astro config reference shows correct `site` and `base` typing
  - Starlight config reference shows how to integrate with Astro's base path

  **Acceptance Criteria**:

  - [ ] `astro.config.mjs` has `site: "https://1stepmore.com"` (or placeholder)
  - [ ] `astro.config.mjs` has `base: "/1StepMore_Official/"`
  - [ ] Starlight config has `title: "壹目贯维"` and `defaultLocale: "zh"`
  - [ ] `npm run build` succeeds after this change

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: astro.config.mjs has correct base path
    Tool: Bash
    Preconditions: astro.config.mjs exists
    Steps:
      1. grep -E "base.*1StepMore_Official" /mnt/d/贯维/1StepMore_Official/astro.config.mjs
    Expected Result: Line contains "base: '/1StepMore_Official/'"
    Failure Indicators: base path missing, wrong path, no quote marks
    Evidence: .sisyphus/evidence/task-2-base-path-check.txt

  Scenario: Build succeeds with new config
    Tool: Bash
    Preconditions: astro.config.mjs configured, npm install completed
    Steps:
      1. cd /mnt/d/贯维/1StepMore_Official && npm run build
    Expected Result: Build completes with "✓ Built" message, dist/ created
    Failure Indicators: Build errors, missing CSS, routing 404s
    Evidence: .sisyphus/evidence/task-2-build-success.log
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-2-base-path-check.txt
  - [ ] .sisyphus/evidence/task-2-build-success.log

  **Commit**: YES (with Task 1)
  - Message: `feat(infra): initialize Astro Starlight with GitHub Pages base`
  - Files: `package.json`, `astro.config.mjs`, `src/`

- [x] 3. Create nav-config.yaml Structure

  **What to do**:
  - Create `nav-config.yaml` in project root as single source of truth for navigation
  - Define four sections: 产品服务 (products), 解决方案 (solutions), 客户案例 (cases), 博客 (blog)
  - Each section has `name`, `dir`, `showInNav: true/false` fields
  - Build a Starlight sidebar generation script that reads this YAML

  **Must NOT do**:
  - **Must NOT**: Hardcode sidebar items in astro.config.mjs (must be yaml-driven)
  - **Must NOT**: Create static sidebar entries that bypass nav-config.yaml

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Config file creation with standard YAML structure
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: Task 6
  - **Blocked By**: None (can start immediately, independent of Tasks 1-2)

  **References**:

  **Pattern References** (existing code to follow):
  - `官网vibe.txt:38-51` - nav-config.yaml structure from Phase 1 directive

  **API/Type References** (contracts to implement against):
  - Starlight sidebar config: `label`, `items`, `autogenerate` options
  - YAML parsing: JavaScript `yaml` package or native fetch

  **External References** (libraries and frameworks):
  - Starlight sidebar docs: `https://starlight.astro.build/reference/configuration/#sidebars` - official sidebar configuration

  **WHY Each Reference Matters**:
  - 官网vibe.txt shows the exact nav-config.yaml structure to follow
  - Starlight docs show how to programmatically generate sidebar from external config

  **Acceptance Criteria**:

  - [ ] `nav-config.yaml` exists in project root
  - [ ] All four sections (products, solutions, cases, blog) defined with `showInNav: true`
  - [ ] `showInNav: false` hides section from nav (verified via test)
  - [ ] Starlight sidebar generates from nav-config.yaml (not hardcoded)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: nav-config.yaml exists with correct structure
    Tool: Bash
    Preconditions: None
    Steps:
      1. cat /mnt/d/贯维/1StepMore_Official/nav-config.yaml
    Expected Result: Valid YAML with sections array, each having name, dir, showInNav
    Failure Indicators: Invalid YAML, missing fields, wrong structure
    Evidence: .sisyphus/evidence/task-3-nav-config.txt

  Scenario: Setting showInNav: false hides section
    Tool: Bash
    Preconditions: nav-config.yaml exists, sidebar generation script exists
    Steps:
      1. Modify nav-config.yaml to set one section's showInNav: false
      2. Run sidebar generation script
      3. Check generated config does not include that section
    Expected Result: Section with showInNav: false not in generated sidebar
    Failure Indicators: showInNav ignored, section still appears
    Evidence: .sisyphus/evidence/task-3-hide-nav-test.yaml
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-3-nav-config.txt
  - [ ] .sisyphus/evidence/task-3-hide-nav-test.yaml

  **Commit**: YES (with Task 4)
  - Message: `feat(config): add nav-config.yaml driven sidebar generation`
  - Files: `nav-config.yaml`, `src/lib/nav-generator.ts` (or similar)

- [x] 4. Create src/content/config.ts Zod Schemas

- [x] 5. Build Verification + Token Integrity Check

- [x] 6. Create Stub MDX Content for ATDD

- [x] 7. Set Up GitHub Actions Deploy Workflow

- [x] 8. Configure Lint Harness in CI

  **What to do**:
  - Add lint step to deploy.yml that blocks hardcoded CSS values
  - Use grep command: `grep -rnE 'color: #(.*);|color: rgb|color: hsl|color: red|color: blue|color: black|color: white' src/ && exit 1 || exit 0`
  - Add token integrity check: verify `--od-color-ai-speed`, `--od-color-human-touch`, `--od-font-display`, `--od-radius-ai-speed` exist in od-tokens.css
  - Make lint failure block deployment

  **Must NOT do**:
  - **Must NOT**: Allow lint to pass with hardcoded colors present
  - **Must NOT**: Skip lint step on partial failures

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Shell script addition to existing CI workflow
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7)
  - **Blocks**: None
  - **Blocked By**: Task 7 (needs deploy.yml to exist first)

  **References**:

  **Pattern References** (existing code to follow):
  - `官网vibe.txt:82-95` - Exact lint commands from ATDD section

  **API/Type References** (contracts to implement against):
  - GitHub Actions step syntax: `name`, `run`, `shell: bash`
  - Exit codes: non-zero blocks pipeline

  **External References** (libraries and frameworks):
  - `grep -q` syntax for file content checking
  - GitHub Actions exit code behavior

  **WHY Each Reference Matters**:
  - 官网vibe.txt has exact lint commands to copy
  - Exit code 1 blocks deployment, exit 0 allows it

  **Acceptance Criteria**:

  - [ ] deploy.yml has lint step that runs before deployment
  - [ ] Lint blocks on hardcoded colors: `color: #`, `rgb`, `hsl`, color names
  - [ ] Token integrity check verifies all 4 core tokens exist
  - [ ] Lint failure causes job to fail (not just warning)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Lint catches hardcoded color (negative test)
    Tool: Bash
    Preconditions: deploy.yml exists with lint step
    Steps:
      1. echo "color: #FF0000;" >> /tmp/test.css
      2. grep -rnE 'color: #(.*);|color: rgb|color: hsl' /tmp/test.css && echo "FAIL" || echo "PASS"
    Expected Result: "FAIL" output (lint correctly catches hardcoded color)
    Failure Indicators: Exit code 0 when hardcoded color present (lint broken)
    Evidence: .sisyphus/evidence/task-8-lint-negative-test.txt

  Scenario: Token integrity check passes with valid tokens
    Tool: Bash
    Preconditions: od-tokens.css exists
    Steps:
      1. grep -q '--od-color-ai-speed' /mnt/d/贯维/1StepMore_Official/src/styles/od-tokens.css && echo "PASS" || echo "FAIL"
    Expected Result: "PASS" output
    Failure Indicators: Token missing from od-tokens.css (被人修改过)
    Evidence: .sisyphus/evidence/task-8-token-integrity-pass.txt
  ```

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-8-lint-negative-test.txt
  - [ ] .sisyphus/evidence/task-8-token-integrity-pass.txt

  **Commit**: YES (with Task 7)
  - Message: `feat(ci): add lint harness to block hardcoded CSS`
  - Files: `.github/workflows/deploy.yml`

---

## Final Verification Wave (MANDATORY)

> 3 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, grep pattern). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Build Quality Review** — `unspecified-high`
  Run `npm run build` + linter. Review all changed files for: hardcoded colors, missing token references, broken imports. Check CSS for `color: #` hardcoded values (should use `var(--od-*)` only).
  Output: `Build [PASS/FAIL] | Token Integrity [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git status/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Group 1** (Tasks 1, 2):
  - Message: `feat(infra): initialize Astro Starlight with GitHub Pages base`
  - Files: `package.json`, `astro.config.mjs`, `src/` directory structure
  - Pre-commit: `npm run build` must pass

- **Group 2** (Tasks 3, 4):
  - Message: `feat(config): add nav-config.yaml driven sidebar + Zod schemas`
  - Files: `nav-config.yaml`, `src/content/config.ts`
  - Pre-commit: `npm run build` must pass

- **Group 3** (Tasks 5, 6, 7, 8):
  - Message: `feat(ci): add build verification + GitHub Actions deployment`
  - Files: `.github/workflows/deploy.yml`, `src/content/products/*.mdx`, `src/content/blog/*.mdx`
  - Pre-commit: `npm run build` must pass, lint checks must pass

---

## Success Criteria

### Verification Commands
```bash
# Build must succeed
npm run build  # Expected: zero errors, dist/ output generated

# Token integrity check
grep -rnE 'color: #(.*);|color: rgb|color: hsl' src/  # Expected: exit 0 (no matches)

# Schema validation (should fail without price)
echo "title: Test" > test-product.mdx && npm run build  # Expected: Zod error about missing price

# GitHub Actions syntax validation
cat .github/workflows/deploy.yml | grep -E "steps|uses|run"  # Expected: valid YAML structure
```

### Final Checklist
- [ ] All "Must Have" present in codebase
- [ ] All "Must NOT Have" absent from codebase
- [ ] Build succeeds with zero errors
- [ ] GitHub Pages base path `/1StepMore_Official/` configured correctly
- [ ] Zod schema blocks missing required fields
- [ ] nav-config.yaml drives sidebar (not hardcoded)
- [ ] Lint harness blocks hardcoded CSS in CI
- [ ] GitHub Actions deploys on main branch push
- [ ] All evidence files captured in `.sisyphus/evidence/`