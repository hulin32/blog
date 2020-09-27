---
title: 前端性能优化---图片
date: 2018-02-07T22:38:11+08:00
categories: optimization
gitalk: true
---

前端优化
<!--more-->

这章我们来聊聊图片的优化。

### 大小
图片现在基本每个网站都会有，并且还不少，网站logo，图表，产品展示图，这是我们首先需要优化的，而且我觉得这些优化其实难度不大，大多是体力活。应该图片格式不一样所需要使用的工具也不一样，所以不好统一用工具去生成(其实还是有的，后面会介绍到，只是效果不如针对不同格式的优化工具好)，因为生成出来图片有的会糊掉。但是如果多的话还是建议这样去生成，再去筛查。

前面说到图片格式不一样，这里谈谈图片的种类，从大类来分有矢量图和栅格图两种，就我现在的了解，矢量图是有很多线条组成，是可以任意收缩大小的，所以表现复杂的图像就显得有点吃力了，栅格图片就主要展示复杂颜色的图片啦，比如相机图片.所以应该根据你要显示的内容选择相应的图片格式。 矢量图格式一般为SVG, 栅格图片格式有JPEG，PNG, GIF,新的格式有WebP等.

1.SVG优化
压缩工具有如下:
[svgo](https://github.com/svg/svgo)
[在线工具](https://jakearchibald.github.io/svgomg/)
[sketch svgo](https://github.com/BohemianCoding/svgo-compressor)
我找svg图片试过，根据图片的不同，优化的效率也不大一样。我用了两张不同大小的图片进行了压缩([图片在这里](https://github.com/flyingalex/optimization_example/tree/master/svg_compress)),分别压缩了25%和50%，所以感觉这样的工具还是挺好的。

2.JPG优化
有两个imagemin插件
[imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg)
[imagemin-guetzli](https://github.com/imagemin/imagemin-guetzli])
([我是google官网的例子代码](https://github.com/flyingalex/optimization_example/tree/master/jpeg_compress))

3.PNG优化
有两个imagemin插件
[imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant)
[imagemin-advpng](https://github.com/imagemin/imagemin-advpng)

当然如果可以的话可以用更新的格式WebP，更好的压缩率。
记得服务器开启gzip压缩，这个见效很好。

如果使用webpack的话，也有相应的[插件](https://github.com/Klathmon/imagemin-webpack-plugin)(没用过)可以用于图片优化

### 缓存
服务器端开启文件缓存，尽量不重复获取相同的数据。

### \<picture\> 标签 和 image srcset 属性
如果你在img标签中这样使用
```
<img src="photo.png" srcset="photo@2x.png 2x">
```
那么在像素高的设备上就会读取更高清的图片

另外还有就是*picture*标签
```
<picture>
  <source media="(min-width: 800px)" srcset="head.jpg, head-2x.jpg 2x">
  <source media="(min-width: 450px)" srcset="head-small.jpg, head-small-2x.jpg 2x">
  <img src="head-fb.jpg" srcset="head-fb-2x.jpg 2x" alt="a head carved out of wood">
</picture>
```
会使用媒体查询并且根据分辨率的不同来显示图片

### SEO 
添加 alt 语义化，图片命名

###  无障碍阅读
添加aria-label等标签（后面会专门写一章）