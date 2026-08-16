import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * 文章集合：每篇一个 md 文件，frontmatter 是唯一元数据来源。
 * 文件名约定：YYYY-MM-DD-slug.md（构建时类型校验，写错字段直接报错）
 */
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    pinned: z.boolean().default(false),
  }),
});

/**
 * 项目集合：与文章同构（md + frontmatter + 正文）。
 * frontmatter 驱动列表卡片，正文渲染详情页；
 * tags 用于自动关联同主题文章。
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    status: z.enum(["进行中", "已完成"]),
    year: z.coerce.number(),
    link: z.string().url().optional(),
    repo: z.string().url().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, projects };
