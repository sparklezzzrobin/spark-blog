---
name: spark.geo（本站）
description: 从设计规范到部署上线的个人博客：Astro + Tailwind，静态生成，写作即 Git 提交。
tech: [Astro, Tailwind CSS, TypeScript]
status: 进行中
year: 2026
featured: true
tags: [web, notes]
link: https://spark-blog-phi.vercel.app
repo: https://github.com/sparklezzzrobin/spark-blog
---

## 为什么自己写博客

需求很明确：长期可维护、内容归自己、顺便把现代 Web 开发、Git 工作流、部署流水线完整练一遍。现成平台给不了最后一条。

## 技术方案

- **框架**：Astro 7 静态生成，内容即 Markdown 文件，无数据库无后台；
- **样式**：Tailwind v4，设计规范先行（色彩令牌、组件风格都有文档约束）；
- **部署**：GitHub push 触发 Vercel 自动构建，写作即发布；
- **内容模型**：frontmatter 带类型校验，写错字段构建期直接报错。

## 设计特点

深青主色取自水体 / 植被遥感色系，等高线纹理退居背景，等宽字体承担"技术感"表达——GIS 是身份，不是皮肤。

## 收获

完整走通"设计规范 → 技术选型 → 实现 → CI/CD"闭环，后续迭代的每一步都有据可查。
