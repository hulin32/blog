# Hulin's Blog

[INNER PEACE](https://blog.hulin.dev) - 技术博客，记录学习与成长

## 简介

这是一个基于 Hugo 的静态博客，使用 Paper 主题。记录前端、后端、算法、工具等学习笔记和技术总结。

## 📚 博客内容

### 前端
- React 源码解析
- TypeScript 教程
- 性能优化（图片、字体）
- 工具函数

### 后端
- JVM 调优
- 微服务
- 系统设计

### 算法
- 排序算法
- 查找算法
- 数据结构

### 其他
- Vim 使用技巧
- Shell 脚本
- WebGL

## 🚀 本地开发

### 环境要求
- Hugo >= 0.112.0
- Node.js >= 18
- pnpm

### 安装依赖
```bash
cd blog.hulin.dev
pnpm install
```

### 开发模式
```bash
hugo server --themesDir=../.. --disableFastRender
```

访问: [http://localhost:1313](http://localhost:1313)

### 构建生产版本
```bash
hugo --themesDir=../..
```

构建产物在 `public` 目录

## 📝 内容组织

```
blog.hulin.dev/
├── archetypes/        # 文章模板
├── content/          # 内容目录
│   ├── en/          # 英文内容
│   └── zh/          # 中文内容
├── layouts/         # 自定义布局
├── resources/       # Hugo 处理的资源
└── static/         # 静态资源
```

### 创建新文章

1. 使用默认模板创建
```bash
cd blog.hulin.dev
hugo new content/zh/tech/your-topic.md
```

2. 或创建分类文章
```bash
hugo new content/en/tech/your-topic.md
```

3. 编辑文章内容，头部需要以下字段：
```yaml
---
title: "文章标题"
date: "2023-01-01"
description: "简短描述"
tags:
  - tag1
  - tag2
---
```

## 🎨 主题定制

### 添加新的布局
在 `layouts/` 目录下创建自定义布局，会覆盖主题默认布局

### 自定义主题变量
在 `themes/paper/` 中修改主题文件

## 🔍 搜索功能

使用 Algolia 实现全文搜索：
- 配置 Algolia Search
- 安装 Algolia 集成

参考: [Algolia 文档](https://github.com/pacocoursey/paper#algolia-search)

## 💬 评论系统

使用 Giscus 实现：
```yaml
giscus:
  repo: hulin32/blog
  repoId: MDEwOlJlcG9zaXRvcnkxMDkxMDEyODI
  category: Announcements
  categoryId: DIC_kwDOBoDA4s4ChWGe
  mapping: url
```

## 📊 分析工具

参考 [ANALYTICS.md](./ANALYTICS.md) 添加 Google Analytics、Umami 等分析工具

## 🗂️ 相关仓库

- [Ant Design 源码](https://github.com/hulin32/ant-design-source-code)
- [算法练习](https://github.com/hulin32/blog) (根目录)
- [WebGL 教程](https://github.com/hulin32/blog) (根目录)

## 🤝 贡献

欢迎提交 Issue 和 PR！

## 📄 许可证

MIT

## 📧 联系

- GitHub: [@hulin32](https://github.com/hulin32)
- LinkedIn: [lin-hu-247638117](https://linkedin.com/in/lin-hu-247638117)
- Email: [your-email@example.com](mailto:your-email@example.com)
