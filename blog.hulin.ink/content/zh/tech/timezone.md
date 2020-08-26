---
title: "Timezone"
date: 2020-08-26T23:30:23+08:00
feature_image: /images/timezone.png
---

蛋疼的时区问题
<!--more-->

最近在给公司做一个小demo，写一些后端，刚开始用的php，后面客户说他只懂nodejs，所以又让给个nodejs版本，好嘛，翻译咯

翻译代码其实到不难，其中最烦人的一个问题居然是因为docker时区问题，卡了好几个小时，在我本地的时区是对的，push到线上就不行了，我尝试了改docker时区:

```yaml
environment:
  - SET_CONTAINER_TIMEZONE=true
  - CONTAINER_TIMEZONE=Asia/Shanghai
```

```yaml
environment:
  - TZ=Asia/Shanghai
```

还是不行，后面突发奇想，是不是宿主环境(ubuntu)本身的问题

**还真是!!!!!**

这里发现一个命令挺好用，可以查看系统时间
```shell
timedatectl
```

通过上面这个命令你可以查看系统时间，大概是这个样
```shell
ubuntu@VM-0-2-ubuntu:~$ timedatectl
                      Local time: Thu 2020-08-27 00:05:28 CST
                  Universal time: Wed 2020-08-26 16:05:28 UTC
                        RTC time: Wed 2020-08-26 16:05:29
                       Time zone: Asia/Shanghai (CST, +0800)
       System clock synchronized: yes
systemd-timesyncd.service active: no
                 RTC in local TZ: no
```

但是公司体统上虽然显示的是`Time zone: Asia/Shanghai`，但是时间根本不对，通过
```shell
timedatectl set-time TIME
```
改系统内时间，问题解决

奇葩问题