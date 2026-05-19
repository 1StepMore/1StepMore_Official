# 壹目贯维 官网 (1StepMore Official Website)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build) | [AI Speed, Human Touch](https://1stepmore.com)

## 项目简介

壹目贯维官网，基于 Astro + Starlight 构建，采用 OD/OC Vibe Coding 工作流：
- **OD (Operation Designer)**: 定调视觉方向，创建设计 Token
- **OC (Operation Coder)**: 用 Token 写组件，不硬编码样式
- **DD (DevOps Defender): CI/CD 守卫，自动检查

设计 Token 系统：`src/styles/od-tokens.css`

---

## 🚀 快速开始

```bash
npm install          # 安装依赖
npm run dev         # 本地开发 http://localhost:4321
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
```

---

## 📁 项目结构

```
src/
├── components/          # Astro 组件
│   ├── Hero.astro      # 首屏 Hero 区
│   ├── Features.astro   # 产品矩阵
│   └── Testimonials.astro  # 客户案例/人文洞察
├── layouts/
│   └── LandingLayout.astro  # 全局布局
├── content/docs/       # MDX 内容（Starlight 文档）
│   ├── index.mdx       # 主页（Hero + Features + Testimonials）
│   ├── products/       # 产品页
│   │   ├── one-mu.mdx     # 壹目·AI内容工坊
│   │   ├── guan-wei.mdx    # 贯维·行业智造引擎
│   │   └── guan-lan.mdx    # 贯蓝·AI创意助手
│   └── blog/           # 博客
│       ├── ai-speed-human-touch.mdx
│       └── human-ai-collaboration-methodology.mdx
├── lib/
│   └── nav-generator.js  # 导航配置生成器（读 nav-config.yaml）
├── pages/
│   └── index.astro    # 旧版主页（已废弃，仅作备份参考）
└── styles/
    └── od-tokens.css  # 设计 Token 变量（颜色/字体/间距/圆角）
```

---

## ✏️ 日常内容修改

### 发新文章

```bash
# 1. 在 src/content/docs/blog/ 新建 .mdx 文件
# 2. 填 Frontmatter（两行即可）
# 3. Push 即自动部署
```

**Frontmatter 模板**：
```yaml
---
title: 文章标题
type: blog
description: 简短描述
pubDate: 2026-05-19
---
```

### 新增栏目

```bash
# 1. 在 nav-config.yaml 加两行
# 2. 在 src/content/docs/ 新建文件夹
# 3. Push 即上线
```

**nav-config.yaml 格式**：
```yaml
sections:
  - name: 新栏目名
    dir: 文件夹名
    showInNav: true
```

### 修改产品信息

直接编辑 `src/content/docs/products/*.mdx` 的 Frontmatter：
```yaml
---
title: 产品名
type: product
pain_point: 痛点描述
core_selling: 核心卖点
price: 价格
---
```

---

## 🎨 改版风格（设计 Token）

### 方法一：改 Token 值

编辑 `src/styles/od-tokens.css`：

```css
:root {
  /* 颜色 */
  --od-color-ai-speed: #新颜色;
  --od-color-human-touch: #新背景色;

  /* 字体 */
  --od-font-display: '新字体', sans-serif;
  --od-font-body: '新正文字体', serif;

  /* 间距与圆角 */
  --od-radius-ai-speed: 4px;
  --od-radius-human-touch: 12px;
  --od-space-layout: 1.5rem;
}
```

### 效果

改 Token 值 → 全站视觉无缝切换，组件代码零修改。

**示例**：把网站从"科技极客风"调为"杂志人文风"：
```bash
# 只改 od-tokens.css 中的变量值
# Push 后自动换肤
```

---

## 🏗️ 组件开发（Vibe Coding）

### 设计原则

1. **只读 Token**：所有样式必须用 `var(--od-*)`，禁止硬编码
2. **无新增 CSS 文件**：需要新 Token → 加到 `od-tokens.css`
3. **不碰基础设施**：不修改 `nav-generator.js`、`content.config.ts`、`astro.config.mjs`

### 组件检查清单

| 检查项 | 命令 |
|--------|------|
| 硬编码颜色 | `grep -rnE 'color:\s*(#[0-9a-f]{3,6})' src/components/` |
| 硬编码字体 | `grep -rnE 'font-family:\s*(?!var)' src/components/` |
| 硬编码间距 | `grep -rnE '(margin\|padding\|gap):\s*[0-9]+' src/components/` |
| 构建测试 | `npm run build` |
| Token 检查 | `npm run lint:tokens` |

### CI 自动检查

GitHub Actions 自动运行：
- `Lint CSS Hardcode`：拦截硬编码颜色/字体
- `Check Token Integrity`：确保 Token 完整

---

## 🌐 部署

推送到 `main` 分支 → GitHub Actions 自动构建 → GitHub Pages 发布

```bash
git push origin main
# 无需手动部署
```

---

## 📝 重要路径

| 页面 | 路径 |
|------|------|
| 主页 | `/` |
| 产品列表 | `/products/one-mu/`, `/products/guan-wei/`, `/products/guan-lan/` |
| 博客 | `/blog/ai-speed-human-touch/` |
| 旧产品列表（已废弃） | `/pages/index.astro` |

---

## ❓ 常见问题

**Q: 本地跑不起来？**
```bash
npm install
npm run dev
```

**Q: 想加新页面？**
在 `src/content/docs/` 新建 `.mdx` 即可自动生成路由。

**Q: Token 不够用？**
在 `od-tokens.css` 中添加新变量，用 `--od-` 前缀命名。

**Q: 样式冲突？**
检查组件是否有硬编码值，用 Token 替换。

---

## 🔗 相关链接

- [Astro 文档](https://docs.astro.build)
- [Starlight 文档](https://starlight.astro.build)
- [GitHub 仓库](https://github.com/1StepMore/1StepMore_Official)
