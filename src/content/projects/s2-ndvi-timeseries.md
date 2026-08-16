---
name: Sentinel-2 NDVI 时序分析
description: 用 Sentinel-2 Level-2A 数据构建研究区 NDVI 年内时序曲线，分析植被物候特征并与气象数据对照。
tech: [Python, rasterio, pandas, Sentinel-2]
status: 进行中
year: 2026
featured: true
tags: [remote-sensing, python]
---

## 背景

单期影像只能回答"那里有多少植被"，回答不了"植被长势如何变化"。Sentinel-2 五天重访周期使其成为构建 NDVI 年内时序的理想数据源。本项目目标是产出一套从下载到时序曲线的自动化流程。

## 技术方案

1. sentinelsat 按区域 + 时间范围检索下载 L2A 产品；
2. SCL 波段做云掩膜，逐期计算 NDVI；
3. 像元级时序聚合到研究区均值，pandas 清洗与重采样；
4. 物候参数提取（生长季开始 / 结束 / 峰值），与同期气温降水数据对照。

## 当前进度

- [x] 单期 NDVI 计算与可视化
- [x] 云掩膜处理
- [ ] 多期批处理与缺失期插值
- [ ] 物候参数拟合
- [ ] 结题报告与制图

## 下一步

补齐 2024–2025 两个完整年份的数据，验证插值策略对结果的影响。
