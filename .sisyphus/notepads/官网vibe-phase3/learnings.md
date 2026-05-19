# 官网vibe Phase 3 Notepad

## Learnings
- Components created: Hero, Features, Testimonials in src/components/
- All use ONLY var(--od-*) tokens for styling
- Design tokens defined in src/styles/od-tokens.css
- Tokens support dual-vibe switching: ai-speed vs human-touch

## Issues Encountered
1. **Hero/Features/Testimonials NOT integrated** - Components exist but not imported in any page
2. **stylelint configuration missing** - Cannot parse Astro frontmatter (---)
3. **Playwright not available** - Platform (ubuntu26.04-x64) doesn't support chromium/firefox

## Decisions
- Build verification passed (10 pages)
- Components use correct tokens (verified manually)
- Lint failure is config issue, not component issue

## Problems
- Landing page (index.astro) shows products list, not Hero/Features/Testimonials
- Components need to be integrated into the actual site
