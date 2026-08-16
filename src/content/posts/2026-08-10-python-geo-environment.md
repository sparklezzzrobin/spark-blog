---
title: 用 conda 搭建 GIS / 遥感 Python 环境
description: 从零配置一个可复现的地理空间 Python 开发环境：conda 环境、GDAL 安装、常用库清单与版本锁定。
pubDate: 2026-08-10
tags: [python, gis]
---

搞地理空间开发，第一步往往不是写代码，而是把环境装对。GDAL、rasterio、 Fiona 这些库对系统依赖要求多，直接 `pip install` 经常在 Windows 上翻车。这篇文章记录我目前用下来最稳的方案。

## 为什么选 conda

核心原因只有一个：**GDAL 的二进制依赖由 conda-forge 打包好了**，不需要自己编译 PROJ、GEOS、SQLite 这些底层库。

## 环境创建

```bash
# 创建独立环境，避免污染 base
conda create -n geo python=3.12 -y
conda activate geo

# 关键：从 conda-forge 频道安装地理空间三件套
conda install -c conda-forge gdal rasterio geopandas -y
```

## 常用库清单

安装完成后，我再补装这些：

| 库 | 用途 |
| --- | --- |
| numpy | 栅格数据本质上是多维数组 |
| matplotlib | 制图与可视化 |
| pandas | 属性表与统计 |
| earthpy / contextily | 制图辅助与底图 |

## 验证安装

```python
from osgeo import gdal

ds = gdal.Open("demo.tif")
print(ds.RasterXSize, ds.RasterYSize)
```

能正常输出影像的行列数，环境就通了。

## 一个小教训

曾经图省事用 pip 装过 rasterio，结果和 conda 装的 GDAL 版本冲突，`PROJ: proj_create_from_database: Cannot find proj.db` 报错排查了一晚上。**结论：地理空间库全家桶统一走 conda-forge，不要混用 pip。**
