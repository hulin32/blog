---
title: 前端性能优化---字体
date: 2018-02-09T22:38:11+08:00
categories: optimization
---

前端优化
<!--more-->

当我们在开发中使用自己的字体的时候，由于字体文件一般都会比较大，所以需要对它们做优化。一般来说有这样几种方法。

页面渲染的过程

![font-crp](https://user-images.githubusercontent.com/11313145/36055514-ed821e06-0e37-11e8-9fea-90e8d368f8f3.png)

>1.浏览器请求 HTML 文档。
>2.浏览器开始解析 HTML 响应和构建 DOM。
>3.浏览器发现 CSS、JS 以及其他资源并分派请求。
>4.浏览器在收到所有 CSS 内容后构建 CSSOM，然后将其与 DOM 树合并以构建渲染树。
>- 在渲染树指示需要哪些字体变体在网页上渲染指定文本后，将分派字体请求。
>
>5.浏览器执行布局并将内容绘制到屏幕上。
>- 如果字体尚不可用，浏览器可能不会渲染任何文本像素。
>- 字体可用之后，浏览器将绘制文本像素。

字体的加载会阻塞页面的渲染，因而优化字体挺重要的

### 使用local()
当在加载自己的字体时，在最前面声明local(),像这样
```
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome.woff2') format('woff2'), 
       url('/fonts/awesome.woff') format('woff'),
       url('/fonts/awesome.ttf') format('truetype'),
       url('/fonts/awesome.eot') format('embedded-opentype');
}
```
如果字体文件在本地就不会发起新的请求

### 使用 Unicode-range
用法
```
@font-face {
  .....
  unicode-range: U+000-5FF; /* Latin glyphs */
}
```
这个霸道，你可以通过指定`unicode-range`来指定需要应用字体的范围，曾经在一个活动页面内使用过
,当时通过检查页面，发现整个项目就用了几个文字，其他全是图片，我就直接写了那几个字符的unicode,字体文件直接从200多kb降到30kb左右，性能测试字体方面直接从F变到了A.

### 内联
将字体直接放在css文件中，不用发起二次请求，不过css文件会比较大。

参考
1. [Web Font Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
