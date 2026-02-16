# 贡献指南 (Contributing Guidelines)

欢迎贡献！无论是修复错别字、添加新文章、改进代码还是优化页面，都请随意。

## 📝 如何贡献

### 报告问题 (Bug 报告)

如果你发现博客有问题，请：

1. 访问 [GitHub Issues](https://github.com/hulin32/blog/issues)
2. 点击 "New Issue"
3. 模板选择 "Bug Report"
4. 填写必要信息：
   - 问题描述
   - 复现步骤
   - 期望行为
   - 实际行为
   - 环境信息（浏览器版本等）
   - 截图（如适用）

### 建议改进 (Feature Requests)

如果你有改进建议：

1. 访问 [GitHub Issues](https://github.com/hulin32/blog/issues)
2. 点击 "New Issue"
3. 模板选择 "Feature Request"
4. 填写以下信息：
   - 功能描述
   - 为什么需要这个功能
   - 使用场景
   - 建议的实现方式（可选）

### 提交代码 (Pull Requests)

1. Fork 本仓库
2. 创建你的分支：`git checkout -b feature/your-feature-name`
3. 提交更改：`git commit -m 'feat: add your feature'`
4. 推送到分支：`git push origin feature/your-feature-name`
5. 创建 Pull Request

## ✍️ 写作规范

### 文章格式

每篇文章都应该包含：

```yaml
---
title: "文章标题"
date: "2023-01-01"
description: "简短描述（用于搜索结果和社交媒体）"
tags:
  - react
  - 性能优化
  - 源码解析
categories:
  - tech
  - 前端
---

## 简介

简要介绍文章内容。

## 正文

### 章节

使用 Markdown 标题分隔不同部分。

#### 代码示例

```javascript
// 示例代码
function example() {
  console.log('Hello, World!');
}
```

> 重要提示或注意事项

## 总结

### 相关文章
- [文章1](链接)
- [文章2](链接)
```

### 内容要求

- ✅ 代码示例要完整可运行
- ✅ 解释清楚原理和实现细节
- ✅ 提供实际应用场景
- ✅ 包含相关的参考链接
- ✅ 格式清晰，易于阅读
- ❌ 避免过于简短或没有实质内容
- ❌ 避免大段复制粘贴

## 🎨 代码风格

- 使用 2 空格缩进
- 保持一致的命名风格（驼峰或下划线）
- 添加必要的注释
- 遵循 ESLint 规则（如果适用）

## 🤝 许可

你的代码将采用 MIT 许可证。

## 🙏 致谢

感谢所有贡献者！
