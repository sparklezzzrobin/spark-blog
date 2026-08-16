import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

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
 * 项目集合：单一 JSON 数据文件描述所有项目。
 * 加项目 = 在 projects.json 加一条数据，不动任何页面。
 */
const projects = defineCollection({
  loader: file("src/data/projects.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    status: z.enum(["进行中", "已完成"]),
    year: z.coerce.number(),
    link: z.string().url().optional(),
    repo: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
