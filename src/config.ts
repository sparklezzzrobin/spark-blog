/**
 * 站点个人信息 —— 单一来源。
 * 关于页的名片卡与页脚链接都从这里取值，以后改个人信息只动这个文件。
 */

export const SITE = {
  /** 昵称 */
  name: "Spark",
  /** 用户名（名片卡上的 @handle） */
  handle: "sparklezzzrobin",
  /** 一句话简介 */
  role: "GIS & 遥感 · 在学 Web 开发",
  /** 个性签名（名片卡上的引言） */
  signature: "以影像为纸，以代码为笔",
  /** 页脚默认坐标：Null Island（0°, 0°）—— 赤道与本初子午线交点，GIS 圈经典彩蛋；访客 IP 定位成功后会被替换 */
  location: "0.00°, 0.00°",
  // 头像暂用站点徽标；把照片放进 public/images/ 后改成 "/images/avatar.jpg" 即可
  avatar: "/favicon.svg",
  socials: {
    github: {
      label: "GitHub",
      icon: "github",
      href: "https://github.com/sparklezzzrobin",
    },
    email: {
      label: "Gmail",
      icon: "gmail",
      // 直接链到 Gmail 网页版写信页（mailto: 在内嵌浏览器里点了没反应）
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=faithldee@gmail.com",
    },
    bilibili: {
      label: "哔哩哔哩",
      icon: "bilibili",
      href: "https://space.bilibili.com/389315481",
    },
  },
} as const;
