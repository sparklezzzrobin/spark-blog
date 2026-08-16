# spark.geo

简体中文 | [English](README.en.md)

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

一个等高线主题的个人博客——地图的浪漫装进网页里。

博客属于一名 GIS & 遥感方向、正在学 Web 开发的学生。整站以**等高线**为设计语言：全站背景是两座"巨山"的等高线弧，页脚以经纬度坐标落款，favicon 也是一圈等高线。技术上坚持极简：Astro 全静态输出，没有客户端框架，没有运行时依赖，交互全部交给浏览器原生能力。

**在线预览：<https://spark-blog-phi.vercel.app>**

## 站点特性

**设计**

- 🗺️ **等高线设计语言** —— 全站等高线背景、坐标式页脚、等高线 favicon，GIS 味拉满
- 🌗 **明暗双主题** —— 圆形揭幕过渡切换，代码块 Shiki 双主题跟随站点配色
- 📍 **Null Island 彩蛋** —— 页脚默认坐标 `0.00°, 0.00°`（赤道与本初子午线交点，GIS 圈经典梗），IP 定位成功后自动替换为访客所在地

**功能**

- 🔍 **全局搜索** —— `Cmd/Ctrl + K` 唤起原生 `<dialog>` 弹窗；索引在构建期生成静态 `/search.json`，首次打开时才按需加载
- 📝 **文章系统** —— Content Collections + zod 类型校验，标签筛选、置顶、系列归档；桌面端右侧常驻目录（滚动高亮），移动端文首折叠；KaTeX 数学公式
- 📦 **项目展示** —— 项目详情页，正文驱动，按标签自动关联同主题文章
- 📡 **标准订阅** —— RSS、sitemap、Open Graph 一应俱全

**工程**

- ⚡ **零客户端框架** —— 全静态构建，搜索弹窗用原生 `dialog`，主题切换用 View Transitions，页面交互几乎零 JS
- 🎯 **单一信息源** —— 昵称、签名、社交链接、页脚坐标全部收敛在 [`src/config.ts`](src/config.ts)，改个人信息只动一个文件

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
│   ├── components/          # Header、Footer、SearchDialog、ContourBackground 等
│   ├── config.ts            # 个人信息单一来源——昵称 / 签名 / 社交链接
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

- **改个人信息**：只改 [`src/config.ts`](src/config.ts)——昵称、签名、社交链接、页脚坐标都在这里
- **写文章**：在 `src/content/posts/` 新建 `YYYY-MM-DD-slug.md`，frontmatter 写错字段构建时会直接报错
- **换站点地址**：修改 `astro.config.mjs` 中的 `site`（影响 RSS / sitemap / OG 里的绝对链接）

## 链接

- 🌐 在线站点：<https://spark-blog-phi.vercel.app>
- 📡 RSS 订阅：<https://spark-blog-phi.vercel.app/rss.xml>
- 💻 GitHub：<https://github.com/sparklezzzrobin>
