import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 侧边栏由 nav-config.yaml 驱动，各 section 一律 autogenerate。
 *
 * 教训（2026-09-30）：cases 曾经是硬编码的 3 条 slug 列表——新增案例页后
 * 导航不会自动出现，页面只能靠直链访问，且不会报错（静默漏挂）。
 * 任何"手写清单式"导航都会重复这个错误，所以这里一律 autogenerate；
 * 排序改用每篇 frontmatter 的 `sidebar.order` 显式声明。
 */
export function generateSidebar() {
  const configPath = join(__dirname, '..', '..', 'nav-config.yaml');
  const config = parse(readFileSync(configPath, 'utf8'));

  return config.sections
    .filter((section) => section.showInNav)
    .map((section) => ({
      label: section.name,
      items: [{ autogenerate: { directory: section.dir } }],
    }));
}

export default generateSidebar;
