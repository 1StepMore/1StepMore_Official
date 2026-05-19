# Phase 1 Learnings - Infrastructure & Input Guardians

## Key Findings

### 1. Astro Starlight Version Compatibility
- Astro v6 requires Node >= 22.12.0 and npm >= 9.6.5
- Starlight v0.39+ removed support for autogenerate with label (must use `items: [{ autogenerate: ... }]` format)
- When initializing, use `npm create astro@latest . -- --template starlight --no-install --no-git --yes`

### 2. Content Collections in Astro v6
- Legacy content config (`src/content/config.ts`) is deprecated
- Must use `content.config.ts` in project root with `docsLoader()`
- Products and blog collections must have `loader: docsLoader()` defined

### 3. nav-generator.js Issues
- Need to install `yaml` package separately: `npm install yaml`
- Starlight sidebar format change in v0.39:
  - OLD (broken): `{ label: '产品服务', autogenerate: { directory: 'products' } }`
  - NEW (correct): `{ label: '产品服务', items: [{ autogenerate: { directory: 'products' } }] }`

### 4. Project Name
- Initialized with template name "subsequent-sphere" instead of preserving workspace name
- package.json shows `"name": "subsequent-sphere"` - may need to rename to `1stepmore` or similar

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Used Starlight (not vanilla Astro) | Per 官网vibe.txt Phase 1 directive |
| Kept base path as `/1StepMore_Official/` | Per 官网vibe.txt, user confirmed Starlight |
| Created stub content for ATDD | Build verification needs real content structure |

## Files Created/Modified

| File | Change |
|------|--------|
| `package.json` | Added astro + @astrojs/starlight |
| `astro.config.mjs` | Added site, base, and dynamic sidebar |
| `content.config.ts` | Zod schemas for products + blog |
| `nav-config.yaml` | 4 sections with showInNav flag |
| `src/lib/nav-generator.js` | YAML-driven sidebar generation |
| `.github/workflows/deploy.yml` | GitHub Actions with lint step |
| `src/content/docs/products/*.mdx` | Stub product content |
| `src/content/docs/blog/*.mdx` | Stub blog content |

## Warnings/Issues

| Issue | Status |
|-------|--------|
| "The collection docs does not exist or is empty" | ⚠️ Starlight default docs collection not populated - OK for now |
| "No pages found" for sitemap | ⚠️ No pages in docs root - will be fixed when real content added |
| npm engine warnings | ⚠️ Node version slightly lower than recommended - still works |

## Next Steps for Phase 2

1. Add real product pages with full content
2. Configure proper social links in Starlight
3. Add favicon and branding assets
4. Consider renaming project in package.json