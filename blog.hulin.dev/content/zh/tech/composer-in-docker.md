---
title: Composer Tips
date: 2021-02-25T23:35:27+08:00
gitalk: true
---

composer使用中的小知识
<!--more-->
## 添加 -vvv
这样可以看到安装的信息，最近就是因为这个发现个bug。

在docker内跑 
```shell
composer require "far/foo: ^2.xx"
```
全程没有报错，依赖也添加到composer.json了，但是vendor下就是没有安装包，傻眼了

后面就加`-vvv`到composer命令最后去跑，看到最后一行是 `killed` wtf!!!

又到了面向google编程了🐶，搜索相关composer install killed docker, 会发现是docker的配置问题
![image](/images/docker-setting.png)

最开始是2G，改成8G就好了，跑个下载命令2G都不够。。。