---
title: 一些 Shell 小技巧
date: 2018-12-12T22:29:52+08:00
categoires: shell
gitalk: true
---

真的小
<!--more-->

### 1. pushd, popd, dirs---终端目录栈管理
这几条命令可以达到的目的是在不同目录之前快速切换。
`pushd`用于将目录压入目录栈内，`popd`弹出，`dirs`显示目录栈的内容
<img src="https://user-images.githubusercontent.com/11313145/50054270-297a5900-017b-11e9-90e8-35c1e1954d52.png" width="400px" height="300px" />
当在`pushd`或 `popd`后面使用数字时是对目录栈内的内容操作，如果是目录就是新的内容
##### 个人感觉： 一般

### 2. 终端快速移动
`Meta + f`: 向前移动一个单词
`Meta + b`: 向后移动一个单词
`Ctrl + y`: 粘贴最后一次的剪切
`Ctrl +  a`: 移动到段首
`Ctrl + e`: 移动到段尾
`Ctrl + k`: 从当前删到段尾
`Meta + d`: 从当前删到单词末
`Ctrl + w`: 从当前删到前一个空白符

(Meta在Mac上的设置位置Terminal > Preferences > Settings > Keyboard）
##### 个人感觉： 特别是1，2两个，很棒

###. 3 找文件---`find`
说说应用场景，当在编辑器中想改某个名字的时候，文件内的内容都可以搜索到，但是如果要改文件名的话，编辑器可能就不好使了，这时`find`就派上用场了.
命令格式：
```shell
find options starting/path expression
```
例子
```shell
# 搜索当前目录下的包含hello的文件名
find  .  -name  "*hello*"

# 忽略大小写
find  .  -iname  "*hello*"

# 可以提供-type过滤文件类型, 常用的有d(目录) 和 f(文件)
find  .  -iname  "*hello*" -type f
find  .  -iname "*hello*" -type d
```


##### 个人感觉：真的很好用

### 4.待续

参考：
1. [Shortcuts to move faster in Bash command line](http://teohm.com/blog/shortcuts-to-move-faster-in-bash-command-line/)

