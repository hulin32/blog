---
title: "中国武汉新型冠状病毒2019-nCoV市级分布图，自动部署: github action + netlify"
date: 2020-02-02T18:03:23+08:00
feature_image: /images/mouth-guard-4787018_1920.jpg
slug: github-action-and-netlify
gitalk: true
---

使用github和netlify搭建自己免费静态网站
<!--more-->

最近国内冠状病毒爆发，推迟上班，在家快发毛了，研究了一下[Github Action](https://help.github.com/en/actions/automating-your-workflow-with-github-actions), 发现可以用它来实现网站的自动化部署，通过[netlify](https://www.netlify.com/)，可以做一个免费的自动化部署的静态网站，这个网站也是这样做的，这篇文章就是跟大家说一下怎么做？

其实有两个方式来实现自动化部署，看你的需要

### 只用通过netlify的部署功能

在netlify上你可以选择 `New sit from Git`, 然后选择一个目录，你就可以把那个目录下的静态网站部署到netlify上了，如果你想要自己配置域名，netlify上也可以做，上面还有很多功能，你可以看一下

说一下这个网站的部署
1. git项目: [https://github.com/flyingalex/blog](https://github.com/flyingalex/blog)，`/blog.hulin.ink/public` 目录，我这个网站是用[hugo](https://gohugo.io/)建的，跑完命令`hugo -D`就会生成`public`部署目录

2. 在netlify上build的时候选择这个项目的这个目录，直接就可以部署了

3. 以后每次更新这个目录，会触发netlify的钩子函数，实现自动部署


### Github Action + netlify

先看创建的网站[http://ncov.hulin.ink/](http://ncov.hulin.ink/), 这个网站的数据来自[丁香园疫情地图](https://ncov.dxy.cn/ncovh5/view/pneumonia),每四个小时拉去一次数据更新

1. git项目，这个疫情地图是一个react项目，[代码在这里](https://github.com/flyingalex/2019-nCoV)

2. 在项目内创建`.github/workflow/main.yml`, 内容大概是这样的
```yml
name: CI

on: 
  push:
    branches:
      - master
  schedule:
    - cron:  '0 */4 * * *'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-python@v1
      with:
        python-version: '3.x'
    - name: generate data
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        python main.py
    - name: build frontend
      run: |
        npm install
        npm run build
    - name: publish to netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --dir=build --prod
      env:
        NETLIFY_AUTH_TOKEN: `NETLIFY_AUTH_TOKEN`
        NETLIFY_SITE_ID: `NETLIFY_SITE_ID`
```

主要看:
```yml
- name: publish to netlify
  uses: netlify/actions/cli@master
  with:
    args: deploy --dir=build --prod
  env:
    NETLIFY_AUTH_TOKEN: `NETLIFY_AUTH_TOKEN`
    NETLIFY_SITE_ID: `NETLIFY_SITE_ID`
```
其余代码都是构建静态网站用的
使用了`netlify/actions/cli@master`, `--dir=build`代表你部署的目录
然后`NETLIFY_AUTH_TOKEN`和`NETLIFY_SITE_ID`都可以到他们[cli repo](https://github.com/netlify/actions/tree/master/cli)找到出处

另外每四个小时部署一次是在这里的:
```yml
schedule:
    - cron:  '0 */4 * * *'
```
