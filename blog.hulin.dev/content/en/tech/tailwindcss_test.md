---
title: "Tailwindcss 初体验"
date: 2020-04-23T22:41:39+08:00
feature_image: /images/tailwindcss.png
slug: css
gitalk: true
draft: true
---

css新的写法
<!--more-->

[Tailwindcss](https://www.tailwindcss.com/)这个框架出来很久了，不过最近因为写css比较多，但是复用性特别差，尝试过BEM，原子写法，每个项目基本都要重写，在想有没有更好的方法，不知道什么时候Tailwindcss就冒出来了，这个框架也是原子式(atomic)的，这个概念不新，之前在自己的项目中自己也这样写过，是感觉方便，但是还是用着不舒服，估计是被自己的css恶心到了(逃)

文档是这样介绍的:
>A utility-first CSS framework for
rapidly building custom designs

>Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

它就给你提供一些工具集，就是平常你写`backgroud`,`font-size`等等，每次都是定义一个class,然后添加相应的css属性，而Tailwindcss的做法是定义好一些class，每个都对应一个css属性，然后通过在元素上添加这些class来添加相应的属性，上面的图片来自于官网，你看它的class应该就知道，比如`text-gray-600`,就是字体颜色，还可以有响应式`md:flex`,当默认的不满足的时候你还可以通过写`tailwind.config.js`配置文件添加新属性的class，这个香，是真香，这样使用后基本就能达到写的一些css可以在不同项目复用了(想的话)。

官网的文档我扫了一遍，用起来不难，我准备现在自己的项目中用用看，还是要点时间转换一下思维，不过这个框架我觉得是值得尝试的，用起来吧。

过段时间再来谈谈感受。

吐个槽，不知道是不是我自己网络问题，他们官网有的慢

referrence:

1. https://tailwindcss.com/
2. https://www.tailwindcss.cn/docs/configuration

