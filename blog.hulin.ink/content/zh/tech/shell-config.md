---
title: "Shell Config"
date: 2019-04-23T21:58:34+08:00
categoires: shell
---

shell相关
<!--more-->

最近在换电脑，之前的电脑终端一直用着，虽然有些地方不如意，但是一直都没管它，这次换电脑想着一次搞定，到最后发现其实挺快的。

我用的oh-my-zsh, 这次发现真是简单。

1. 安装 oh-my-zsh
```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

2. 一个补全的自定义插件 zsh-autosuggestions
它会根据你的历史技术补全，完美
[安装教程](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

3. 官方插件
oh-my-zsh还有一个插件系统，里面维护有很多的插件，你可以在 `.oh-my-zsh/plugins/` 目录下找到，
当你需要使用是只需要在 `.zshrc` 文件中田间:
```shell
plugins=(
  git
  zsh-autosuggestions
  docker
)
```
添加完后命令会有很多补全，以及提示信息
