// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  // 开发工具栏（dev-only 的底部浮动菜单）关闭，生产构建本就不包含它
  devToolbar: { enabled: false },
  // TODO: 绑定自定义域名后替换为真实地址（影响 RSS 链接与 sitemap）
  site: "https://spark-geo.example.com",
  integrations: [sitemap()],
  markdown: {
    // Unified 处理器：使用 remark/rehype 生态插件（数学公式渲染）
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
      shikiConfig: {
        // 双主题：浅色 github-light / 暗色 github-dark（由 global.css 按 .dark 切换）
        themes: { light: "github-light", dark: "github-dark" },
        wrap: true,
      },
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
