# spark.geo

简体中文 | [English](README.en.md)

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

基于 Astro 的静态个人博客，以等高线为视觉主题：全站背景为等高线图形，页脚显示经纬度坐标，favicon 同样为等高线图形。站点为全静态输出，无客户端框架与运行时依赖，交互使用浏览器原生能力实现。

**在线地址：<https://spark-blog-phi.vercel.app>**

## 站点特性

**设计**

- 等高线视觉主题：全站背景、页脚坐标、favicon 统一使用等高线元素
- 明暗双主题：切换时使用圆形揭幕过渡；代码块使用 Shiki 双主题，跟随站点配色
- 页脚默认显示坐标 `0.00°, 0.00°`（赤道与本初子午线交点），IP 定位成功后替换为访客所在地

**功能**

- 全局搜索：`Cmd/Ctrl + K` 唤起原生 `<dialog>` 弹窗；索引在构建期生成为静态 `/search.json`，首次打开时按需加载
- 文章系统：基于 Content Collections 与 zod 校验，支持标签筛选、置顶、系列归档、KaTeX 数学公式
- 目录导航：桌面端文章页侧边常驻目录并随滚动高亮当前章节；移动端通过悬浮按钮唤出底部抽屉目录
- 回顶按钮：文章页提供回到顶部按钮
- 项目展示：项目详情页由 Markdown 正文驱动，按共同标签自动关联相关文章
- RSS、sitemap、Open Graph

**工程**

- 全静态构建，无客户端框架：搜索弹窗使用原生 `dialog`，主题切换使用 View Transitions，客户端 JavaScript 开销很小
- 个人信息（昵称、签名、社交链接、页脚坐标）集中配置在 [`src/config.ts`](src/config.ts)

## 技术栈

| 类别 | 选型 |
| :--- | :--- |
| 框架 | [Astro 7](https://astro.build)（全静态输出） |
| 样式 | [Tailwind CSS v4](https://tailwindcss.com)（CSS-first 配置） |
| 语言 | TypeScript（strict） |
| 内容 | Content Collections + zod schema 校验 |
| 数学 | remark-math + rehype-katex |
| 高亮 | Shiki 双主题（github-light / github-dark） |
| 周边 | @astrojs/rss、@astrojs/sitemap |
| 部署 | Vercel |

## 快速开始

要求 Node.js **>= 22.12.0**。

```sh
npm install     # 安装依赖
npm run dev     # 开发服务器 http://localhost:4321
npm run build   # 构建产物到 ./dist/
npm run preview # 本地预览构建结果
```

## 目录结构

```text
spark-blog/
├── public/                  # 静态资源（favicon 等）
├── src/
│   ├── components/          # Header、Footer、SearchDialog、ContourBackground、TocDialog、BackToTop 等
│   ├── config.ts            # 站点个人信息配置（昵称 / 签名 / 社交链接 / 页脚坐标）
│   ├── content/
│   │   ├── posts/           # 文章（Markdown + frontmatter）
│   │   └── projects/        # 项目（Markdown + frontmatter）
│   ├── content.config.ts    # 集合 schema（zod 类型校验）
│   ├── layouts/             # 基础布局
│   ├── pages/               # 文件路由，含 rss.xml / search.json 端点
│   └── styles/              # 全局样式与设计令牌
└── astro.config.mjs         # 站点地址 / KaTeX / Shiki 双主题 / sitemap
```

## 自定义

- **个人信息**：编辑 [`src/config.ts`](src/config.ts)，包含昵称、签名、社交链接、页脚坐标
- **写文章**：在 `src/content/posts/` 新建 `YYYY-MM-DD-slug.md`；frontmatter 由 zod schema 校验，字段错误会导致构建失败
- **站点地址**：修改 `astro.config.mjs` 中的 `site`，用于 RSS / sitemap / Open Graph 中的绝对链接

## 链接

- 在线站点：<https://spark-blog-phi.vercel.app>
- RSS 订阅：<https://spark-blog-phi.vercel.app/rss.xml>
- GitHub：<https://github.com/sparklezzzrobin>
