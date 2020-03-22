---
title: 前端常用的一些工具包
date: 2020-03-01T15:50:02+08:00
feature_image: /images/tool.jpeg
slug: tool
gitalk: true
---

聊聊前端开发中常使用的一些工具包
<!--more-->

在前端开发中使用一些类库可以提高我们的效率，也让我们的开发体验更好，所以使用一些还是有必要的。我主要做react开发，还有小程序，这里说一下我自己会用到的一些类库，只是抛个砖，有更好的欢迎补充。

### Form表单

[formik](https://github.com/jaredpalmer/formik)
是在一些比较出名的库(redux-form这样的)出来后才火的，我记得官方好想都推荐过，它是把form所有的状态放在本地管理，所以很快，并且少了很多的样板代码，另外搭配[yup](https://github.com/jquense/yup)做验证的错误信息处理简直无敌，写表单再也不纠结了。

小程序中的话因为考虑到项目体积，一般建议尽量少用包，但是验证我觉得还是可以找一些辅助代码，我主要用的是[we-validator](https://github.com/ChanceYu/we-validator)，因为代码不多，就600行左右，我把源码直接复制进了项目，然后根据自己的需要去改，这个给平时开发做表单验证减轻了不少负担，当然其实如果你对react项目的包体积有比较苛刻的要求的话，我觉得也可以不用formik那套，因为yup那边使用了loadash，会增加包体积，直接使用we-validator我觉得也够用

### Icon加载
一般一个项目内都会有图标，至于怎么去加载这些图片内就是工程师们自己的责任了，以前公司会使用字体文件，并且还专门付费买了https://icomoon.io账号用于项目的图标字体文件的生成，不过一直用着有个让人很不舒服的地方是如果要增加一个新图标，全部图片都需要拿去重新构建字体文件，这操作很不美丽，后面偶然间在和社区内其他人讨论时发现svg-sprite，恨啦，早该用它了，svg-sprite主要是把图片用svg的形式来加载，不仅不会失真，而且每次添加新图标的时候，只需要把svg文件放进项目，在使用的地方将其名字放在css的class中就可以引用了，方面效果还好。react项目中可以使用webpack的插件[svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader)

### Dayjs
时间处理，现在一般都会用[dayjs](https://github.com/iamkun/dayjs), 小，满足需求，感觉比[moment](https://github.com/moment/moment)好很多

### CSS
一般项目都会要响应式，[bootstrap](https://github.com/twbs/bootstrap)的栅格系统我觉得很好用，你可以只使用/引用这部分，我也就只使用这部分，这样可以减少打包体积，另外在写响应式网站时，记得**mobile first**，这不是一句空话，会让你的css维护其他好很多，另外使用media query时用`min-width`和栅格系统保持一直，写下来那叫一个舒服，只要遵守这个规则，我觉得写出来的网站不会差到哪里去。

### Webpack
[看这里](https://developers.google.com/web/fundamentals/performance/webpack)，google出的一个文档，很好很强大

### 视差
[rellax](https://github.com/dixonandmoe/rellax)

### reference

1. formik: https://github.com/jaredpalmer/formik
2. yup: https://github.com/jquense/yup
3. svg-sprite-loader: https://github.com/JetBrains/svg-sprite-loader
4. dayjs: https://github.com/iamkun/dayjs
5. momentjs: https://github.com/moment/moment
5. bootstrap: https://github.com/twbs/bootstrap
5. webpack performance: https://developers.google.com/web/fundamentals/performance/webpack
6. rellax: https://github.com/dixonandmoe/rellax