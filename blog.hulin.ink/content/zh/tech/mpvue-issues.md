---
title: "Mpvue Issues"
date: 2019-02-19T22:28:37+08:00
categories: mpvue
---

小坑总结
<!--more-->

1. `picker-view` 不要放在组件中的组件，深层嵌套会导致@change事件bug
2. `@touchmove.stop` 防止事件穿透
3. 使用小程序的scroll-view 横向不能滚动
https://github.com/Meituan-Dianping/mpvue/issues/416
4. input光标闪烁问题可以通过v-modal.lazy解决

该看源码了