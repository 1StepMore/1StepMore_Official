# CLAUDE.md — 壹目贯维官网 AI 助手指南

## 项目身份

- **网站**: https://1stepmore.com
- **仓库**: github.com/1StepMore/1StepMore_Official
- **架构**: Astro + Starlight + MDX
- **设计师**: OD (Open Design) — 通过自然语言调用
- **管家**: Hermes (你) — 直接操作内容 + 代码

## 你的职责边界

| 任务 | 你能独立完成 | 需要 OD |
|------|-------------|---------|
| 增删改 MDX 内容（产品/博客） | ✅ | ❌ |
| 修改导航配置 (nav-config.yaml) | ✅ | ❌ |
| 更新 design tokens (od-tokens.css) | ✅ | 需要先调用 OD |
| 新增/修改组件 | ❌ | ✅ 先做设计 |
| 风格大幅调整 | ❌ | ✅ 先做设计 |

## 设计变更流程（调用 OD）

```
你 → 判断需要设计变更
   → 打开 OD Web UI (http://localhost:36173)
   → 选择 skill + design system
   → 输入 design brief
   → OD 生成 artifact
   → 提取 CSS token 值
   → 更新 src/styles/od-tokens.css
   → npm run build 验证
   → git push
```

**常用 Design Skills**:
- `saas-landing` — 产品落地页
- `web-prototype` — 通用网页原型
- `blog-post` — 博客文章
- `dashboard` — 管理后台

## 内容修改流程

### 添加/修改产品

```bash
# 文件路径: src/content/docs/products/[name].mdx
---
title: 产品名
type: product
pain_point: 痛点描述
core_selling: 核心卖点
price: ¥价格
description: 简短描述
pubDate: 2026-05-19
---

正文内容（Markdown）
```

### 发布博客

```bash
# 文件路径: src/content/docs/blog/[slug].mdx
---
title: 文章标题
type: blog
description: 简短描述
pubDate: 2026-05-19
---

正文内容
```

### 修改导航

编辑 `nav-config.yaml`:
```yaml
sections:
  - name: 栏目名
    dir: 文件夹名
    showInNav: true
```

## 设计 Token（OD 生成的值）

文件: `src/styles/od-tokens.css`

```css
:root {
  /* 颜色 */
  --od-color-ai-speed: #6366F1;        /* 主色-科技感 */
  --od-color-human-touch: #F8F5F0;     /* 背景-人文感 */
  --od-color-text-primary: #1a1a2e;     /* 主文字 */
  --od-color-text-secondary: #4a4a6a;  /* 次级文字 */
  --od-color-bg-testimonials: #f0eff4; /* 区块背景 */
  --od-color-white: #ffffff;

  /* 字体 */
  --od-font-display: "Geist Sans", "Inter", system-ui, sans-serif;
  --od-font-body: "Lora", "Noto Serif", Georgia, serif;

  /* 间距与圆角 */
  --od-radius-ai-speed: 4px;    /* 锐利 */
  --od-radius-human-touch: 12px; /* 柔和 */
  --od-space-layout: 1.5rem;   /* 基础间距 */
}
```

**规则**: 所有 CSS 值必须用 `var(--od-*)`，禁止硬编码。

## 验证清单（Push 前必做）

```bash
# 1. 无硬编码颜色
grep -rnE 'color:\s*(#[0-9a-f]{3,6})' src/components/

# 2. 无硬编码字体
grep -rnE 'font-family:\s*(?!var)' src/components/

# 3. 构建通过
npm run build

# 4. Token 检查
npm run lint:tokens
```

## 禁止事项

- ❌ 不修改 `nav-generator.js`、`content.config.ts`、`astro.config.mjs`
- ❌ 不在组件里硬编码 CSS 值
- ❌ 不新增 CSS 文件（需要新 token → 加到 od-tokens.css）
- ❌ 不手动写组件样式（要走 OD 设计流程）

## 提交规范

```bash
git add .
git commit -m "描述改了什么"
git push origin main
# → 自动触发 CI → 部署到 GitHub Pages
```

## 遇到问题？

1. 构建失败 → 运行 `npm run build` 看具体错误
2. Token 缺失 → 在 `od-tokens.css` 中添加，用 `--od-` 前缀
3. 需要设计 → 打开 OD Web UI 调用 OD