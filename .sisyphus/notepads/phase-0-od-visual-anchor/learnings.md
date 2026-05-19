# Phase 0 OD Visual Anchor - Learnings

## OD Daemon Status
- **URL**: http://127.0.0.1:37375
- **Version**: 0.7.0
- **Projects**: 0 (empty) - user hasn't created OD project yet
- **OD MCP**: Available but requires user to have an active OD project

## MCP Tools Confirmed Available
- `get_active_context` - get current active project/file
- `get_artifact` - pull full design bundle
- `get_file` - read single file
- `list_files` - list project files
- `create_artifact` - write artifact to OD project
- `list_projects` - list all OD projects
- `search_files` - search within project

## Key Finding: OD MCP is Read-Only for Designs
- OD MCP tools (`get_artifact`/`get_file`) read from OD projects
- OD does NOT generate designs via MCP - it stores/retrieves them
- Design generation requires either: (1) user manually creates in OD UI, (2) `od run --plugin` CLI command

## OD Projects Location
- Data dir: `/mnt/d/open-design/.od/`
- Projects stored at: `OD_DATA_DIR/projects/`

## MCP Name for skill_mcp
- MCP server name: `open-design`
- But skill_mcp doesn't auto-load OD MCP - needs MCP server configured separately

## Blockers
1. No OD project exists - waiting for user to create one in OD UI ✅ RESOLVED - project "Landing Page" created
2. OD MCP server not configured in opencode - skill_mcp cannot find "open-design" server ❌ BLOCKED
   - OD daemon running (v0.7.0) at http://127.0.0.1:37375
   - OD project exists: "9a85f527-1f0e-4ee5-8676-6073a7c29cde" with skillId "agent-browser"
   - But skill_mcp only shows "playwright" server, no "open-design"
   - MCP integration between opencode and OD is NOT configured

## Root Cause
The opencode session doesn't have the "open-design" MCP server configured. The OD daemon runs independently, but the opencode agent can't talk to it via MCP.

## Possible Solutions
1. Configure opencode's MCP to connect to OD's daemon (add "open-design" server to opencode's mcp.json)
2. Use OD's HTTP API directly (already working - curl can reach it)
3. Use `create_artifact` via HTTP API to create design files from opencode side

## Current Status: BLOCKED - Need MCP configuration

## User Question Answered
Q: OD 项目文件夹和 OpenCode 工作目录要一致吗？
A: **不需要**。OD 项目存在 OD 自己管理的目录（`~/.open-design/.od/`），OpenCode 工作在 `/mnt/d/贯维/1StepMore_Official/`。两者通过 MCP 交互。

## Next Steps (when user creates OD project)
1. Call `get_active_context` to find project ID
2. Call `get_artifact` to pull design bundle
3. Extract landing-design.md, index.html, od-tokens.css
4. Write to /mnt/d/贯维/1StepMore_Official/ target paths
5. Run ATDD verification

## Design Generation Path (if needed)
- CLI: `od run --plugin od-new-generation --prompt "..." --json --follow`
- HTTP: POST /api/projects with `pendingPrompt` + `pluginId` (had BAD_REQUEST error - needs valid pluginId)

## Phase 0 Execution Summary
- OD Project ID: 9a85f527-1f0e-4ee5-8676-6073a7c29cde ("Landing Page")
- OD MCP not usable from opencode (no "open-design" MCP server configured)
- **Workaround**: Used OD HTTP API directly (curl) to create and read files
- Files synced TO OD project via HTTP API after local fixes

## Phase 0 Final State: COMPLETE ✅
- All 9 ATDD checks passed (after fixing hardcoded hex colors in index.html)
- landing-design.md: 449 bytes, Hero/Features/Testimonials sections
- index.html: 127 lines, all colors use var(--od-color-*) references
- od-tokens.css: 35 lines, all 7 token types defined

## Issue: Comment in od-tokens.css
- Line 6 has comment "/* 扩展色彩：文本与背景（由核心色彩推导） */"
- This was flagged by the comment/docstring hook
- Justification: The comment helps understand token groupings (core vs extended colors) - necessary for maintainability

## Next: Phase 1
Phase 1 is pending: "基础设施与输入守卫（Astro + Starlight 初始化 + GitHub Pages base 路径配置 + nav-config.yaml + Zod Schema）"
No Phase 1 plan file exists yet. Need to create it.