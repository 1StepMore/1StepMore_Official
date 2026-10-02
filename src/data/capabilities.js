/**
 * 首页「能力」数据源（2026-09-30 随 OD 设计落地新建）
 *
 * 刻意不写"四项能力"这类数量框定 —— 见 yimuguanwei-persona skill 的禁止项：
 * 数量说死会让客户觉得"就这几样"，也不利后续扩展。
 * 新增能力：往数组里加一项即可（首页轮播/导轨/案例区都从这里读）。
 *
 * metric 取自匿名案例页，数字为实践区间示意（客户名已隐去），不新增未经核对的数字。
 */
export const capabilities = [
  {
    id: 'content',
    num: '01',
    name: '内容生产',
    en: 'CONTENT PIPELINE',
    oneLiner:
      '热点发现 → 多平台文案 → 封面素材 → 分发排期，一条流水线跑完。人只做判断，不做重复劳动。',
    pain: 'AI 直出质量不稳，全人工又慢又贵',
    metric: { value: '50 篇/周', label: '单客户内容产出' },
    visual: 'pipeline',
    link: '/products/ai-content-studio/',
    bullets: [
      '选题从热点与自有素材双入口进入，自动去重、聚类',
      '一份选题适配各平台语气与长度，避免一稿多投的机械感',
      '封面与配图按渠道比例批量产出，发布状态可追踪',
    ],
  },
  {
    id: 'intake',
    num: '02',
    name: '信息收集与处理',
    en: 'INFORMATION INTAKE',
    oneLiner:
      '多源采集 → 结构化清洗 → 带来源交付，把“行业里发生了什么”变成可溯源的可用材料。',
    pain: '信息散在几十个来源里，人工盯不全、没出处不敢用',
    metric: { value: '30+ 个', label: '覆盖信息源（原 8 个）' },
    visual: 'sources',
    link: '/products/information-processing/',
    bullets: [
      '政策、行业媒体、竞品与平台规则按议题配置，新内容不漏',
      '去重、归类、统一字段，按主体聚合、按时间线排',
      '每条都带来源与时间，可直接引用',
    ],
  },
  {
    id: 'localization',
    num: '03',
    name: '本地化交付',
    en: 'LOCALIZATION',
    oneLiner:
      '格式原样保留、术语全项目一致、文化层面适配——交付的是能直接上线的成品，不是待返工的译稿。',
    pain: '翻译完还要返工：格式乱、术语不统一、读起来不像当地人说话',
    metric: { value: '30 分钟', label: '多语种交付/篇（原 2–3 天）' },
    visual: 'langs',
    link: '/products/localization-delivery/',
    bullets: [
      'DOCX / PPTX / PDF / HTML / 字幕：原文什么结构，交付什么结构',
      '统一术语表贯穿全项目，第 1 页与第 100 页说同一件事',
      '数字、日期、货币与表达习惯按目标市场调整',
    ],
  },
  {
    id: 'enterprise-ai',
    num: '04',
    name: '企业 AI 落地',
    en: 'ENTERPRISE AI',
    oneLiner:
      '五步操盘法：摸底 → 验证 → 治理 → 试点 → 复制。不谈概念，谈哪一步先做、做到什么算成功。',
    pain: 'AI 试了一圈，没有一个真正进生产、进报表',
    metric: { value: '16 周', label: '2 条业务线进报表' },
    visual: 'route',
    link: '/products/enterprise-ai-landing/',
    bullets: [
      '每个场景先算账：省了什么、快了多少、错了少了',
      '数据不达标先修数据，不硬上模型',
      '私有化交付 + 陪跑移交，交付后你自己的人能接着跑',
    ],
  },
];

/** 案例证据：数字与匿名案例页一一对应，不新增未经核对的数字 */
export const caseEvidence = [
  {
    tag: '内容生产',
    org: '某消费品牌',
    metric: '10 篇/周 → 50 篇/周',
    note: '内容组不再从零起标题、选题、封面，人只做审核与调性判断。',
    link: '/cases/ecommerce-brand-content-automation/',
  },
  {
    tag: '信息收集与处理',
    org: '某制造企业',
    metric: '8 个 → 30+ 个来源',
    note: '人工周汇总变成每天两份带来源简报，关键条目可回溯原文。',
    link: '/cases/manufacturer-policy-intelligence/',
  },
  {
    tag: '本地化交付',
    org: '某科技媒体',
    metric: '2–3 天 → 30 分钟/篇',
    note: '版式与术语保持一致，多语种从数天发布差压到同一天。',
    link: '/cases/tech-media-localization/',
  },
  {
    tag: '企业 AI 落地',
    org: '某加工制造企业',
    metric: '16 周 → 2 条业务线',
    note: '不停在演示环境，跑通并接入月度报表。',
    link: '/cases/manufacturer-ai-landing/',
  },
];

export default capabilities;
