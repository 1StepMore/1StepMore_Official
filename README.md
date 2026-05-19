# 壹目贯维 官网 (1StepMore Official Website)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build) | [AI Speed, Human Touch](https://1stepmore.com)

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                         壹目贯维官网系统                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌─────────────┐         ┌─────────────┐         ┌─────────────┐   │
│   │  Open Design │  ───►  │   Hermes    │  ───►  │  Website    │   │
│   │   (设计师)   │  设计   │  (管家)     │  实现   │  (Astro)    │   │
│   └─────────────┘         └─────────────┘         └─────────────┘   │
│        ▲                        ▲                       ▲           │
│        │                        │                       │           │
│   OD Web UI              MDX 内容修改              代码落地         │
│   生成 design            直接推送到 main            验证 + 部署      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 角色说明

| 角色 | 职责 | 入口 |
|------|------|------|
| **OD** (Open Design) | 定调视觉方向，生成设计 Token / CSS | `http://localhost:36173` (OD Web UI) |
| **Hermes** | 万能管家，调用 OD 做设计，实现内容 + 代码变更 | 直接操作，无需中间层 |
| **你** | 最终验收，通过自然语言指挥 Hermes | 对话即可 |

### 设计变更流程

```
你（自然语言）
  └─► Hermes
        ├─► 调用 OD（生成新 design）
        │     └─► OD 输出 CSS / Token 值
        │
        └─► 更新 od-tokens.css
              └─► Push → 自动部署
```

### 内容变更流程

```
你（自然语言）
  └─► Hermes
        ├─► 直接修改 MDX 文件（产品/博客）
        ├─► 或修改 nav-config.yaml（导航）
        └─► Push → 自动部署
```

---

## 📁 项目结构

```
1StepMore_Official/
├── src/
│   ├── components/          # Astro 组件（只用 Token，禁止硬编码）
│   ├── layouts/             # 全局布局
│   ├── content/docs/        # MDX 内容
│   │   ├── index.mdx        # 主页
│   │   ├── products/        # 产品页
│   │   └── blog/           # 博客
│   ├── lib/
│   │   └── nav-generator.js # 导航配置生成器
│   └── styles/
│       └── od-tokens.css   # 设计 Token（OD 生成，Hermes 更新）
├── nav-config.yaml          # 导航配置
├── package.json
└── .github/workflows/       # CI/CD
```

---

## 🚀 快速开始

### 本地开发

```bash
npm install          # 安装依赖
npm run dev         # 本地开发 http://localhost:4321
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
```

---

## 👤 人类操作指南

### 方式一：直接操作（快速改内容）

```bash
# 改产品信息
nano src/content/docs/products/one-mu.mdx

# 发博客
nano src/content/docs/blog/new-post.mdx

# 推送到 main
git add . && git push
# → 自动部署
```

### 方式二：通过 Hermes（推荐）

用自然语言告诉 Hermes 你想要什么：

```
"把首页的 Hero 区风格从科技感改成人文杂志风"
"添加一个新的产品：智能客服助手，定价 ¥2999/月"
"把博客标题字体换成思源宋体"
```

Hermes 会：
1. 判断是否需要 OD 设计
2. 如果需要，调用 OD 生成新 design
3. 更新 `od-tokens.css` 或 MDX 文件
4. 验证后 Push

### 方式三：通过 OD Web UI 单独做设计

1. 打开 OD：`http://localhost:36173`
2. 选 skill（如 `saas-landing`）+ design system
3. 输入 design brief
4. OD 生成 artifact
5. 把 OD 输出的 CSS token 值复制到 `od-tokens.css`
6. 手动 Push 或告诉 Hermes 已完成设计更新

---

## 🤖 Hermes 操作指南

### 与 OD 交互

**启动 OD daemon**（如果未运行）：
```bash
cd /path/to/open-design
OD_DATA_DIR=/path/to/open-design/.od pnpm tools-dev start web
# OD Web UI: http://localhost:36173
# OD Daemon: http://localhost:37375
```

**通过 OD 做设计**：

OD 支持 Hermes 作为 design engine。Hermes 调用 OD 时，OD 会 spawn Hermes 来执行设计任务。

设计完成后，Hermes 会收到 OD 输出的 CSS/Token，Hermes 需要：
1. 提取设计值（颜色、字体、间距等）
2. 更新 `/path/to/1StepMore_Official/src/styles/od-tokens.css`
3. 验证 `npm run build` 通过
4. Push 到 main

### 内容修改

**添加新产品页**：
```bash
# 1. 在 src/content/docs/products/ 新建 .mdx
# 2. Frontmatter 模板：
cat > src/content/docs/products/new-product.mdx << 'EOF'
---
title: 产品名称
type: product
pain_point: 痛点描述
core_selling: 核心卖点
price: ¥价格
description: 产品描述
pubDate: 2026-05-19
---

## 这里是正文内容
EOF

# 3. 在 nav-config.yaml 添加导航项
# 4. git add . && git commit && git push
```

**发布博客**：
```bash
cat > src/content/docs/blog/new-post.mdx << 'EOF'
---
title: 文章标题
type: blog
description: 简短描述
pubDate: 2026-05-19
---

文章正文...
EOF
```

**修改导航**：
```bash
# 编辑 nav-config.yaml
# 格式：
sections:
  - name: 栏目名
    dir: 文件夹名
    showInNav: true
```

### 设计 Token 规范

所有 CSS 值必须使用 Token，禁止硬编码：

```css
/* ✅ 正确 */
color: var(--od-color-ai-speed);
font-family: var(--od-font-display);
border-radius: var(--od-radius-human-touch);
margin: var(--od-space-layout);

/* ❌ 错误 */
color: #6366F1;
font-family: 'Geist Sans';
border-radius: 12px;
```

**现有 Token**（见 `src/styles/od-tokens.css`）：

| Token | 用途 |
|-------|------|
| `--od-color-ai-speed` | 主色（AI 速度感） |
| `--od-color-human-touch` | 背景色（人文温暖） |
| `--od-color-text-primary` | 主文字 |
| `--od-color-text-secondary` | 次级文字 |
| `--od-font-display` | 标题字体 |
| `--od-font-body` | 正文字体 |
| `--od-radius-ai-speed` | 锐利圆角 |
| `--od-radius-human-touch` | 柔和圆角 |
| `--od-space-layout` | 基础间距 |

---

## 🔒 设计原则

1. **只读 Token**：组件样式全部使用 `var(--od-*)`，禁止硬编码
2. **无新增 CSS 文件**：新样式加到 `od-tokens.css`
3. **不碰基础设施**：不修改 `nav-generator.js`、`content.config.ts`、`astro.config.mjs`
4. **设计变更走 OD**：不要手动改组件的 CSS，OD 生成的设计才符合品牌规范

---

## 🌐 部署

推送到 `main` 分支 → GitHub Actions 自动构建 → GitHub Pages 发布

```bash
git push origin main
```

---

## 🔍 验证命令

```bash
# 检查硬编码颜色
grep -rnE 'color:\s*(#[0-9a-f]{3,6})' src/components/

# 检查硬编码字体
grep -rnE 'font-family:\s*(?!var)' src/components/

# 构建测试
npm run build

# Token 检查
npm run lint:tokens
```

---

## 🔗 相关链接

- [Astro 文档](https://docs.astro.build)
- [Starlight 文档](https://starlight.astro.build)
- [Open Design (OD)](https://github.com/nexu-io/open-design)
- [GitHub 仓库](https://github.com/1StepMore/1StepMore_Official)