import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

/** 每条正文截断长度：控制索引体积，命中片段只需要前后几十字 */
const BODY_LIMIT = 4000;

/** 剥掉 markdown 语法只留纯文本：代码块保留内容（可按函数名搜到），
    图片/链接退化为文字，标题/强调/列表标记全部去掉 */
function stripMarkdown(md: string): string {
  return md
    .replace(/^```.*$/gm, "")
    .replace(/`([^`\n]*)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<\/?[a-zA-Z][^>]*>/g, " ")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/(\*\*|__|\*|~~)/g, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 全局搜索索引：构建期静态生成 /search.json，客户端首次打开弹窗时才加载。
 * 文章在前（按发布时间倒序）、项目在后（按年份倒序），与站内列表顺序一致。
 */
export const GET: APIRoute = async () => {
  const [posts, projects] = await Promise.all([
    getCollection("posts"),
    getCollection("projects"),
  ]);

  const items = [
    ...posts
      .sort((a, b) => +b.data.pubDate - +a.data.pubDate)
      .map((post) => ({
        type: "post" as const,
        title: post.data.title,
        description: post.data.description,
        tags: post.data.tags,
        extra: post.data.series ?? "",
        meta: post.data.pubDate.toISOString().slice(0, 10),
        url: `/posts/${post.id}/`,
        pinned: post.data.pinned,
        body: stripMarkdown(post.body ?? "").slice(0, BODY_LIMIT),
      })),
    ...projects
      .sort((a, b) => b.data.year - a.data.year)
      .map((project) => ({
        type: "project" as const,
        title: project.data.name,
        description: project.data.description,
        tags: project.data.tags,
        extra: project.data.tech.join(" "),
        meta: `${project.data.status} · ${project.data.year}`,
        url: `/projects/${project.id}/`,
        pinned: false,
        body: stripMarkdown(project.body ?? "").slice(0, BODY_LIMIT),
      })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
