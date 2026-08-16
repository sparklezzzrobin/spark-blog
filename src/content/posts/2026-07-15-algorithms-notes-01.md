---
title: "算法学习笔记 #1：从数组到哈希表"
description: 系列第一篇：用 Python 重新梳理数组、链表与哈希表，重点理解哈希表为什么能把查找降到 O(1)。
pubDate: 2026-07-15
tags: [algorithms, notes]
series: 算法学习笔记
---

开始系统补数据结构与算法。计划以 Python 为语言载体，每个主题一篇笔记：概念梳理、手写实现、LeetCode 实战、易错点。这是第一篇。

## 数组：连续内存的代价与收益

数组最大的特点是**随机访问 O(1)**，代价是插入 / 删除需要搬移元素。Python 的 `list` 底层是动态数组，扩容策略和 Java 的 ArrayList 类似。

## 哈希表：空间换时间

核心思想一句话：**把 key 通过哈希函数映射成数组下标**。

```python
class SimpleHashMap:
    def __init__(self, capacity: int = 256):
        self.capacity = capacity
        self.buckets = [[] for _ in range(capacity)]

    def _index(self, key) -> int:
        return hash(key) % self.capacity

    def put(self, key, value):
        bucket = self.buckets[self._index(key)]
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key):
        for k, v in self.buckets[self._index(key)]:
            if k == key:
                return v
        raise KeyError(key)
```

手写一遍才明白"链地址法处理冲突"到底是怎么回事——桶里那个 list 就是冲突链。

## 实战感受

LeetCode 两数之和（#1）以前用双重循环 O(n²) 硬解，现在条件反射地想到：**遍历时把"我需要的另一半"存进 dict**，一次遍历 O(n) 解决。

## 易错点

- dict 迭代时不能增删 key（RuntimeError）；
- `setdefault` / `defaultdict` 能省掉大量 `if key not in dict` 样板代码；
- 可变对象不能做 key（list 不行，tuple 可以）。

下一篇：链表与双指针。
