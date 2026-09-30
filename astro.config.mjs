// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { generateSidebar } from './src/lib/nav-generator.js';

// https://astro.build/config
export default defineConfig({
	site: "https://1stepmore.github.io",
	base: "/1StepMore_Official/",
	// 旧的内部工具页（Omni Localizer / Pre-Processor / Re-Formatter）不再对外展示，
	// URL 保留并重定向到对应能力页（避免 404，也不留下"卖工具"的页面）
	redirects: {
		'/solutions/omni-localizer': '/1StepMore_Official/products/localization-delivery',
		'/solutions/omni-pre-processor': '/1StepMore_Official/products/information-processing',
		'/solutions/omni-re-formatter': '/1StepMore_Official/products/localization-delivery',
	},
	integrations: [
		starlight({
			title: '壹目贯维',
			defaultLocale: 'zh',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/1StepMore/1StepMore_Official' }],
			sidebar: generateSidebar(),
			customCss: [
				'./src/styles/od-tokens.css',
				'./src/styles/article-page.css',
			],
		}),
	],
});
