---
title: Preload,Preconnect,Prefetch
date: 2019-02-28T22:23:38+08:00
categories: optimization
---

script额外参数
<!--more-->


### 1. preload:
<link rel="preload"> 告知浏览器当前导航需要某个资源，应尽快开始提取

### 2. preconnect
<link rel="preconnect"> 用于先建立于另外一个起点的链接，在后台先完成DNS 查询，域名解析的操作，当需要使用时更快的获取志愿

### 3. prefetch
<link rel="prefetch"> 与 <link rel="preload"> 以及 <link rel="preconnect"> 略有不同，它并不试图使关键操作更快发生，而是利用机会使非关键操作更早发生。通过告知浏览器未来导航或用户互动将需要的资源


##### 参考:
https://developers.google.com/web/fundamentals/performance/resource-prioritization