// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { generateSidebar } from './src/lib/nav-generator.js';

// https://astro.build/config
export default defineConfig({
	site: "https://1stepmore.com",
	base: "/1StepMore_Official/",
	integrations: [
		starlight({
			title: '壹目贯维',
			defaultLocale: 'zh',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: generateSidebar(),
		}),
	],
});
