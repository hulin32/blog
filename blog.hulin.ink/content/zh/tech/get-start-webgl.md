---
title: WebGL 入门
date: 2019-02-28T22:23:38+08:00
categories: webgl
---

webgl尝鲜
<!--more-->

WebGL 入门

这里谈的都是WebGL1.0

3D的东西想上手很久了，最近看了一些计算机图形学方面的资料，感觉国内能找到的资料真的不多，这里是一片宝地，值得探索呀。最近先看了《WebGL编程指南》，预备做下笔记，一是为了巩固知识，二也是为了将来可以回来回忆看看。

WebGL是拿来在网页上做复杂三维图形的渲染的，并允许用户和它交互，WebGL起源于OpenGL的一个子集OpenGL ES 2.0, 它本身有带有一个很重要的特性：可编程着色器方法，也叫`着色器语言`，GLSL ES类似其他编程语言一样。WebGL就介绍到这里，更多的去翻一下书吧，这本书入门绝佳，市面上另外一本大家推荐的是《WebGL高级编程》，我也买了，还没看，翻了一下，感觉那本可以作为这本的深入。

先从一个最简单的清空绘图区开始，HelloCanvas（我用的代码都是随书源码，请查看这个项目下的源文件）

```js
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // 获取webgl上下文
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // 指定背景色
  gl.clearColor(0.1, 0.5, 0.5, 1.0);

 // 填充
  gl.clear(gl.COLOR_BUFFER_BIT);
}
```
gl.clear 可以有的参数有：

COLOR_BUFFER_BIT: 颜色缓冲区
DEPTH_BUFFER_BIT: 深度缓冲区
STENCIL_BUFFER_BIT: 模版缓冲区

接下来让我们看看着色器(shader),这是编写WebGL必不可少的部分，着色器分为`顶点着色器(Vertex shader)`和`片元着色器(Fragment shader)`

```js
// HelloPoint1.js (c) 2012 matsuda
// 顶点着色器程序
var VSHADER_SOURCE =
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.5, 0.0, 1.0);\n' + // 设置顶点坐标
  '  gl_PointSize = 10.0;\n' +                    // 设置点的尺寸
  '}\n';

// 片元着色器程序
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // 设置片元颜色
  '}\n';

function main() {
  var canvas = document.getElementById('webgl');

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

// 初始化着色器
if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制一个点 可以是 
  /*
    gl.{
        POINTS, LINES, LINE_STRIP, LINE_LOOP,
        TRIANGLES, TRIANGLE_STRIP, TRIANGLE_FAN
    }
  */
  gl.drawArrays(gl.POINTS, 0, 1);
}
```

WebGL和canvas的坐标系也有所区别，中心是(0,0,0)

既然GLSL ES 作为一门语言肯定也会有变量了，是的，它有，只是和我们平时用的有些许差别，我觉得可能是因为它是嵌入式的吧，不清楚。

ES的变量有两个attribute和uniform,attribute的数据和顶点有关，uniform是那些与顶点无关的数据，来我们看看代码，我决定对着例子敲一遍，走起。

```js
// HelloPoint2.js
// 顶点着色器 这里vec4是一个类型
var VSHADER_SOURCE = 
    'attribute vec4 a_Position; \n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '  gl_PointSize = 10.0;\n' +
    '} \n';

var FSHADER_SOURCE = 
    'precision mediump float; \n'+
    'uniform vec4 u_FragColor; \n'+
    'void main() { \n' +
    '   gl_FragColor = u_FragColor;\n' +
    '}\n';

function main() {
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }    

    // 获取a_Position变量的地址
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    var u_FragColor = gl.getAttribLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    // 设置顶点位置的值
    gl.vertextAttrib3f(a_Position, 0.1, 0.0, 0.0);

    // 设置颜色
    gl.uniform4f(u_FragColor, 1, 0.0, 0.0, 1.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 画
    gl.drawArrays(gl.POINTS, 0, 1);
}
```
抄下来其实你会发现ES编程和我们普通的区别不大，无非是有更多的限制。
当然你也可以在canvas上绑定事件`canvas.onmousedown`来做一些简单的交互，这里就不抄代码了，有兴趣自己去看看。

好了，这些入门算是可以了。
我们了解了：
1. 变量种类
2. 变量使用方法
3. 用WebGL画一个基本的图形

书中的例子用到了两个方法`getWebGLContext`和`initShaders`，书在最后有讲过一个，代码不多，接下来让我们看看这两个方法吧. 这两个方法在这个项目的文件里，可以看一下，主要就是初始化webgl的一些操作，确实是挺繁琐的。想要用起来还是要学很多呀。