import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function generateSidebar() {
  const configPath = join(__dirname, '..', '..', 'nav-config.yaml');
  const configFile = readFileSync(configPath, 'utf8');
  const config = parse(configFile);

  const sidebar = [];

  for (const section of config.sections) {
    if (section.showInNav) {
      if (section.dir === 'cases') {
        // cases: manual item list with slug-based link to index (autogenerate would duplicate "客户案例" via index.mdx)
        sidebar.push({
          label: section.name,
          items: [
            { slug: 'cases/ecommerce-brand-content-automation' },
            { slug: 'cases/law-firm-knowledge-base' },
            { slug: 'cases/tech-media-localization' },
            { slug: 'cases' },
          ],
        });
      } else {
        sidebar.push({
          label: section.name,
          items: [{ autogenerate: { directory: section.dir } }]
        });
      }
    }
  }

  return sidebar;
}

export default generateSidebar;
