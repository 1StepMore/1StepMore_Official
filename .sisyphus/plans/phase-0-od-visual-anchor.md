# Phase 0 开发计划：OD 视觉锚定与 Token 宪法

> 本计划面向执行 agent（OC = OpenCode 执行 agent，OD = Open Design MCP agent）。用户仅提供上下文，不参与执行决策。

---

## 目标

在写一行代码前，先用 OD 确立视觉根基，从源头杜绝 "AI 味"。所有产出必须遵循"Design as Code"原则——风格切换靠修改 Token，而非修改组件。

---

## 角色定义

| 角色 | 定义 |
|------|------|
| **OC** | 当前 opencode session 中的执行 agent（我，即发出 task() 的 orchestration agent） |
| **OD** | Open Design MCP agent，运行于 `/mnt/d/open-design/` 目录，通过 MCP 协议调用，skills 目录位于 `/mnt/d/open-design/skills/` |

### OD 调用方式

OD 通过 `skill_mcp` 工具调用 MCP server。

**MCP name**：`open-design`（来自 app-config.json `agentId: "opencode"`）

**可用 Tool 列表**（来自 `apps/daemon/src/mcp.ts`）：

| Tool Name | 用途 |
|-----------|------|
| `list_projects` | 列出 OD 中所有项目 |
| `get_active_context` | 获取用户在 OD 中当前打开的项目/文件 |
| `get_artifact` | 拉取设计包（入口文件 + 所有引用文件） |
| `get_project` | 获取单个项目元数据 |
| `get_file` | 读取项目内单个文件 |
| `search_files` | 在项目内搜索文件内容 |
| `list_files` | 列出项目文件元数据 |
| `create_artifact` | 在 OD 项目中创建 artifact 文件 |

**注意**：OD MCP 的设计是"读写 Open Design 项目本身"，而非"执行 skill 生成新设计"。当前 plan 的 OD 调用方式需要重新设计——OD 作为设计输入源，通过 `get_artifact` 拉取用户在 OD 中创建的设计产物，而非主动调用 skill 生成。

### OD 使用前提

用户需在 Open Design 中已有或新建一个项目，创建 landing page 相关设计（HTML 原型），OD 才能通过 MCP 拉取产出物。若用户在 OD 中无活跃项目，需先在 OD 中操作创建。

---

## 上下文

| 字段 | 内容 |
|------|------|
| 品牌 | 壹目贯维 |
| Slogan | AI Speed, Human Touch. |
| 调性 | 冷峻科技（Linear 结构感）× 温暖人文（Notion 温暖感） |
| 竞品定位 | 告别"AI 随机感"，追求"一步到位"的交付品质 |
| 目标客群 | 15-45 岁内容生产从业者，AI 有一定了解，渴望 Turn-Key 解决方案 |
| GitHub 仓库 | `1StepMore/1StepMore_Official`（已创建，完整 URL: `https://github.com/1StepMore/1StepMore_Official`） |

---

## 交付物清单

### 交付物 1：`landing-design.md`

OD 产出的设计文档，必须包含：

- **Hero 区**：主标语 + 行动号召，核心信息"告别 AI 随机感"
- **Features 区**：三大产品矩阵卡片
  - 壹目·AI内容工坊（个人/小团队，9.9元/月起）
  - 贯维·行业智造引擎（中大型企业，私有化知识库+规范引擎）
  - 知识IP共创（高端项目制）
- **Testimonials 区**：人文洞察区块（方法论/客户案例）
- **Layout 规范**：栅格、间距、留白节奏、断点策略

### 交付物 2：`index.html` 原型

- 单文件，可直接在浏览器打开预览
- 展示 Hero / Features / Testimonials 三个区的静态布局
- **铁律**：颜色/字体/间距必须全部使用 CSS 变量引用，不允许写死任何值
- 命名规范：`--od-*` 前缀
- 所有资源引用使用相对路径或预留 `base` 占位符（`__BASE__`），便于后续替换为 `/1StepMore_Official/` 或 `/`

### 交付物 3：`src/styles/od-tokens.css`

Design Token 视觉宪法，**必须包含以下 4 类**：

```css
:root {
  /* 色彩：冷峻科技 vs 温暖人文 */
  --od-color-ai-speed: #6366F1;   /* 示例值（电光蓝）；OD 需根据品牌调性填入实际 HEX */
  --od-color-human-touch: #F8F5F0; /* 示例值（米白）；OD 需根据品牌调性填入实际 HEX */

  /* 字体：极客展示 vs 舒适阅读 */
  --od-font-display: 'Geist Sans', sans-serif; /* 科技感展示字体；若无此字体，用 'Inter' 等替代 */
  --od-font-body: 'Lora', serif;               /* 阅读舒适字体（人味）；若无此字体，用 'Noto Serif' 等替代 */

  /* 间距与圆角：风格无缝切换的核心变量 */
  --od-radius-ai-speed: 4px;   /* 锐利：代码块、标签、边框 */
  --od-radius-human-touch: 12px; /* 柔和：卡片、主按钮、容器 */
  --od-space-layout: 1.5rem;   /* 基础间距单位，可随风格调整宽松度 */
}
```

**注意**：
- 示例值 `#6366F1` / `#F8F5F0` 仅用于表示格式；OD 必须根据品牌调性替换为实际 HEX 值
- 如 `'Geist Sans'` 不可用，可使用同等风格的替代字体（如 `'Inter'`），但必须仍通过 `--od-font-*` 变量引用

---

## 执行步骤

### Step 1：获取 OD 设计产物

**执行者**：OC（通过 skill_mcp）

**前置条件**：用户在 Open Design 中已有或新建一个项目，内含 landing page 设计的 HTML 产物。

**执行方式**：OD MCP 工具是**只读**的（`get_artifact` / `get_file`），用于读取用户在 OD 中创建的设计产物，而非向 OD 写指令。OC 执行两步：

**Step 1a**：确认 OD 活跃项目（通过 `get_active_context`）

**Step 1b**：通过 `get_artifact` 拉取项目产出物

OC 通过 `skill_mcp` 调用 OD，工具调用序列：

1. `get_active_context` — 获取用户在 OD 中当前打开的项目 ID 和文件名
2. `get_artifact` — 拉取该项目的完整设计包（入口文件 + 所有引用文件）
3. `list_files` / `get_file` — 补充拉取设计规范文档（如 `landing-design.md`）

OC 将拉取到的内容按以下路径写入目标目录：

| 文件 | 写入路径 |
|------|----------|
| `landing-design.md` | `/mnt/d/贯维/1StepMore_Official/landing-design.md` |
| `index.html` | `/mnt/d/贯维/1StepMore_Official/index.html` |
| `od-tokens.css` | `/mnt/d/贯维/1StepMore_Official/src/styles/od-tokens.css` |

OC 负责将 OD 产出的内容写入指定路径。

**若用户在 OD 中无活跃项目**：OC 报错并提示用户："请先在 Open Design 中创建或打开 landing page 设计项目，然后继续。"

### Step 2：验证交付物

OC 验证以下条件：

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 1 | `od-tokens.css` 存在 | 路径 `src/styles/od-tokens.css` 存在，文件非空 |
| 2 | 色彩 Token 存在且非空 | `--od-color-ai-speed` 和 `--od-color-human-touch` 均已定义，且值为有效 6 位 HEX（如 `#6366F1`），不是 `#______` |
| 3 | 字体 Token 存在 | `--od-font-display` 和 `--od-font-body` 均已定义 |
| 4 | 圆角 Token 存在 | `--od-radius-ai-speed` 和 `--od-radius-human-touch` 均已定义 |
| 5 | 间距 Token 存在 | `--od-space-layout` 已定义 |
| 6 | 原型可预览 | `index.html` 存在，文件内容非空 |
| 7 | Token 引用检查 | `index.html` 中**所有** inline style 内颜色/字体值使用 `var(--od-*)` 引用，无硬编码 |
| 8 | 资源路径安全 | `index.html` 中所有外部资源（HTML src 属性和 CSS url()）使用相对路径，无 `https://` 引用 |
| 9 | `landing-design.md` 存在性 | 文件存在且包含 Hero、Features、Testimonials 三个章节 |

### Step 3：客观化验收命令（供 ATDD/OC 自检）

> 注意：`grep` 找到匹配（返回 exit code 0）表示验证**失败**；未找到匹配（返回 exit code 1）表示验证**通过**。

**Item 2 验证（Token 非空）**：
```bash
# 检查 od-tokens.css 中 ai-speed/human-touch Token 是否为有效 HEX 值
# 兼容 :root { 内缩进格式：--od-color-ai-speed: #XXXXXX;
grep -E '[[:space:]]*--od-color-ai-speed:[[:space:]]*#[0-9a-fA-F]{6}' src/styles/od-tokens.css && \
grep -E '[[:space:]]*--od-color-human-touch:[[:space:]]*#[0-9a-fA-F]{6}' src/styles/od-tokens.css
# 通过条件：两条 grep 均返回非空（即找到匹配）
```

**Item 7 验证（零硬编码）**：
```bash
# 检查 index.html 中是否存在未包裹在 var() 内的颜色/字体值
# grep 找到匹配 = 失败（exit 1）；未找到 = 通过（exit 0）
grep -Pn 'style=["\'][^"\']*#[0-9a-fA-F]{3,6}' index.html && exit 1
grep -Pn 'style=["\'][^"\']*rgb\(' index.html && exit 1
grep -Pn 'style=["\'][^"\']*hsl\(' index.html && exit 1
# 通过条件：三条 grep 均未找到匹配（即全部 exit code 1 或 command fails silently）
```

**Item 8 验证（资源路径）**：
```bash
# 检查 index.html 中是否存在非相对路径的外部资源引用
# grep 找到匹配 = 失败（exit 1）；未找到 = 通过（exit 0）
grep -Pn 'src=["\'][^"\']*(https?://|//[^/])' index.html && exit 1
grep -Pn 'url\(["\']?https?://' index.html && exit 1
# 通过条件：两条 grep 均未找到匹配
```

**Item 9：landing-design.md 存在性验证**：
```bash
# 检查设计文档存在且包含必要章节
test -f landing-design.md && \
grep -q 'Hero' landing-design.md && \
grep -q 'Features' landing-design.md && \
grep -q 'Testimonials' landing-design.md
# 通过条件：test 返回 0 且两个 grep 均返回非空
```

---

## Guardrails（本阶段禁止事项）

- ❌ 不允许在 `index.html` 中写死任何颜色值（`#hex`、`rgb()`、`hsl()`），必须全部引用 `var(--od-*)`
- ❌ 不允许在 `index.html` 中写死任何字体名，必须引用 `var(--od-font-*)`
- ❌ 不允许跳过 OD 直接写代码——所有视觉决策必须经由 OD
- ❌ 不允许在 Token 未锁定（所有 Token 均有实际值）前进入 Phase 1
- ❌ OD 指令中不得出现"随便选一个颜色"之类的模糊表达——颜色必须基于品牌调性给出具体建议

---

## 依赖关系

```
        用户上下文输入
               │
               ▼
      OC 解析上下文 & Plan
               │
               ▼
      OC 调用 OD（MCP skill_mcp）
        │  tool: get_artifact / get_file
        ▼
   OD 产出物（HTML/CSS/MD）存在于 OD 项目中
               │
               ▼
      OC 将文件写入目标路径
               │
        ┌──────┴──────┐
        ▼             ▼
  landing-         index.html
  design.md           │
        │             ├─► ATDD 验收（OC 自检）
        │             │      │
        ▼             ▼      ▼
  OD Tokens ◄── od-tokens.css
  (综合提取)
        │
        ▼
   ATDD 全部通过
        │
        ▼
   Phase 1 入口
```

### OD 调用失败处理

| 失败场景 | 处理方式 |
|----------|----------|
| OD MCP 连接失败（daemon 未运行） | OC 报错退出，提示用户启动 Open Design：`请在 Open Design 中打开或创建一个 landing page 设计项目` |
| OD 无活跃项目 | OC 提示用户先在 OD 中创建/打开项目后再继续 |
| OD 拉取的文件不完整 | OC 记录缺失文件，尝试从 OD 项目中继续拉取；若无法补全则报错 |

---

## Phase 0 完成标准

**全部 9 项检查通过**（Item 2 需两条 grep 均成功，Item 7 需三条 grep 均返回空，Item 8 需两条 grep 均返回空，Item 9 需 test 和两个 grep 均通过）。

未全部通过时：**不得进入 Phase 1**。OC 需根据失败的检查项调整指令并重新拉取或要求 OD 补充产出。

---

## 成功后自动进入

Phase 1：基础设施与输入守卫（Astro + Starlight 初始化 + GitHub Pages base 路径配置 + nav-config.yaml + Zod Schema）

---

## 附录：文件输出位置汇总

| 交付物 | 输出路径 |
|--------|----------|
| `landing-design.md` | `/mnt/d/贯维/1StepMore_Official/landing-design.md` |
| `index.html` | `/mnt/d/贯维/1StepMore_Official/index.html` |
| `od-tokens.css` | `/mnt/d/贯维/1StepMore_Official/src/styles/od-tokens.css` |