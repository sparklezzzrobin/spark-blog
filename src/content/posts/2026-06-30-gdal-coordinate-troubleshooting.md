---
title: 踩坑记录：GDAL 坐标转换报错排查
description: 一次 proj.db 找不到导致的坐标转换失败，从报错信息一路排查到环境变量，完整复盘。
pubDate: 2026-06-30
tags: [gis, troubleshooting]
---

这类文章是写给未来自己（以及搜索引擎上遇到同样报错的人）的。

## 现象

一段平时正常的坐标转换代码突然报错：

```
ERROR 1: PROJ: proj_create_from_database: Cannot find proj.db
ERROR 1: PROJ: proj_create: Error 1027 (Invalid value for an argument)
```

```python
from osgeo import osr

src = osr.SpatialReference()
src.ImportFromEPSG(4326)  # ← 这里抛异常
```

## 排查过程

1. **确认 proj.db 是否存在**：去 conda 环境的 `Library\share\proj\` 下找，文件在；
2. **猜到是路径问题**：PROJ 通过 `PROJ_LIB` 环境变量找数据库，检查发现当前 shell 里这个变量指向了一个早已删除的旧环境；
3. **验证**：

```bash
echo $PROJ_LIB   # 输出了旧路径
```

## 解决

```bash
# Git Bash / Linux
export PROJ_LIB="D:/miniconda3/envs/geo/Library/share/proj"

# PowerShell
$env:PROJ_LIB = "D:\miniconda3\envs\geo\Library\share\proj"
```

或者一劳永逸：删掉系统环境变量里遗留的 `PROJ_LIB` / `GDAL_DATA`，让 osgeo 自己按安装位置解析（较新版本的 GDAL/PROJ 已不需要手动设置）。

## 复盘

- 报错文本里其实写了 `proj.db`，**先相信报错、再去猜玄学**；
- 多个 conda 环境混用时，环境变量是最容易遗留的坑；
- 把排查过程记下来，下次同样的问题 5 分钟解决。
