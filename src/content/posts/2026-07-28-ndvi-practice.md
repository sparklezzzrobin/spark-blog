---
title: 实践：用 Python 计算 NDVI 并可视化
description: 从 Sentinel-2 波段数据出发，手写 NDVI 计算、阈值分类与配色制图的完整过程。
pubDate: 2026-07-28
tags: [remote-sensing, python, practice]
---

NDVI（归一化植被指数）是遥感里最经典的入门指数，公式只有一行，但从"拿到影像"到"出一张像样的专题图"中间有不少细节。这篇记录完整流程。

## 原理

$$NDVI = \frac{NIR - Red}{NIR + Red}$$

- NIR：近红外波段（Sentinel-2 为 B8）
- Red：红光波段（B4）
- 值域 -1 到 1，植被通常大于 0.3

## 数据准备

用 SNAP 或 sentinelsat 下载 L2A 级产品，重采样到 10m 分辨率，导出 B04、B08 两个 GeoTIFF。

## 计算

```python
import numpy as np
import rasterio

with rasterio.open("B04.tif") as red_src, rasterio.open("B08.tif") as nir_src:
    red = red_src.read(1).astype("float32") / 10000
    nir = nir_src.read(1).astype("float32") / 10000
    profile = red_src.profile

np.seterr(divide="ignore", invalid="ignore")
ndvi = (nir - red) / (nir + red)
```

> 注意：先转 float 再除以 10000（L2A 的缩放因子），整型相减会溢出。

## 可视化

用分段配色区分水体、裸地、稀疏植被、茂密植被：

```python
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap, BoundaryNorm

classes = ListedColormap(["#0D7377", "#C2A878", "#9CB380", "#3E7C4F"])
norm = BoundaryNorm([-1, 0, 0.3, 0.6, 1], classes.N)

fig, ax = plt.subplots(figsize=(8, 8))
ax.imshow(ndvi, cmap=classes, norm=norm)
ax.set_axis_off()
plt.savefig("ndvi.png", dpi=150, bbox_inches="tight")
```

## 结果与坑

- 云_mask 没做，图上云影区域被误判成水体，后续要补 SCL 云掩膜；
- 统计直方图发现城区 NDVI 普遍偏低（0.1–0.25），阈值 0.3 对高密度城市偏保守，可能需要分地类调整。

完整代码整理后放在了项目仓库里，见项目页的「城市绿地变化分析」。
