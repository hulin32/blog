# ⚡ Notion 模板创建快速参考

> 快速查看关键步骤和命令

---

## 🚀 快速开始（5 分钟版）

### 1. 创建主页面
```
输入页面标题：🚀 开发者工作流
添加封面：点击 "Add cover"
添加图标：点击 "Add icon" → 选择 🚀
```

### 2. 创建 6 个子页面
```
依次输入：/page
然后输入页面名称：
- 📁 项目管理
- 📚 学习路径
- 💻 代码片段库
- 📝 技术笔记
- ✅ 任务管理
- 🔖 资源收藏
```

### 3. 在每个页面创建数据库
```
输入：/table
选择：Table - Inline
```

---

## 📋 数据库属性快速对照表

### 📁 项目管理
```
状态 (Select): 🟢 进行中, 🟡 规划中, 🔵 已完成, ⚫ 已暂停
优先级 (Select): 🔴 高, 🟠 中, 🟢 低
技术栈 (Multi-select): React, Vue, Node.js...
开始日期 (Date)
截止日期 (Date)
进度 (Number - Percent)
项目链接 (URL)
项目描述 (Text)
```

### 📚 学习路径
```
类型 (Select): 📖 教程, 🎥 视频, 📝 文档, 🛠️ 实战项目
难度 (Select): ⭐ 入门, ⭐⭐ 中级, ⭐⭐⭐ 高级
状态 (Select): 📌 待学习, 📖 学习中, ✅ 已完成
标签 (Multi-select): Frontend, Backend...
学习日期 (Date)
完成日期 (Date)
资源链接 (URL)
评分 (Number)
```

### 💻 代码片段库
```
语言 (Select): JavaScript, TypeScript, Python...
分类 (Select): 🎣 Hooks, 🛠️ Utils, 🎨 Components, 🔧 Config
标签 (Multi-select)
代码 (Text) - 在页面中添加 Code 块
使用场景 (Text)
示例 (Text)
创建日期 (Date - Created time)
使用次数 (Number)
```

### 📝 技术笔记
```
分类 (Select): 📖 概念, 🐛 Bug 解决, 💡 最佳实践, 🔍 源码分析
标签 (Multi-select)
创建日期 (Date - Created time)
更新日期 (Date - Last edited time)
关联项目 (Relation → 项目管理)
关联学习 (Relation → 学习路径)
```

### ✅ 任务管理
```
类型 (Select): 🐛 Bug, ✨ Feature, 🔧 Refactor, 📝 Doc
优先级 (Select): 🔴 P0, 🟠 P1, 🟡 P2, 🟢 P3
状态 (Select): 📋 Todo, 🔄 In Progress, ✅ Done, ❌ Cancelled
所属项目 (Relation → 项目管理)
截止日期 (Date)
预计工时 (Number)
实际工时 (Number)
描述 (Text)
```

### 🔖 资源收藏
```
类型 (Select): 📚 文章, 🎥 视频, 🛠️ 工具, 📦 库, 📖 文档
分类 (Select): Frontend, Backend, Design...
标签 (Multi-select)
链接 (URL)
评分 (Number)
收藏日期 (Date - Created time)
推荐理由 (Text)
已读状态 (Checkbox)
```

---

## 🎯 常用 Notion 命令

```
/page         创建新页面
/table        创建数据库
/icon         添加图标
/cover        添加封面
/code         添加代码块
/callout      添加提示框
/button       创建按钮
/link         添加链接
```

---

## 🔗 设置关联关系

### 任务 → 项目
```
1. 进入「任务管理」数据库
2. 添加属性「所属项目」
3. 类型选择：Relation
4. 关联到：「项目管理」数据库
5. 启用双向关联
```

### 笔记 → 项目/学习
```
1. 进入「技术笔记」数据库
2. 添加「关联项目」→ Relation → 「项目管理」
3. 添加「关联学习」→ Relation → 「学习路径」
4. 都启用双向关联
```

---

## 📊 创建视图

### 看板视图
```
Add a view → Board
分组方式：选择状态属性
```

### 日历视图
```
Add a view → Calendar
日期属性：选择日期属性
```

### 筛选视图
```
Add a view → Table
点击 Filter → 添加筛选条件
```

---

## 🎨 美化设置

### 添加图标
```
点击页面标题旁的图标按钮
选择对应的 emoji
```

### 设置封面
```
点击页面右上角 "Add cover"
选择图片或渐变色
```

### 设置颜色
```
在 Select 属性中
点击选项旁的颜色点
选择颜色
```

---

## ✅ 检查清单

- [ ] 主页面已创建（封面+图标）
- [ ] 6 个子页面已创建
- [ ] 6 个数据库已创建
- [ ] 所有属性已添加
- [ ] 视图已创建（看板、日历等）
- [ ] 关联关系已设置
- [ ] 至少添加了一条测试数据

---

## 💡 实用公式

### 剩余天数
```notion
dateBetween(prop("截止日期"), now(), "days")
```

### 进度百分比
```notion
prop("已完成任务") / prop("总任务") * 100
```

---

## 🆘 快速故障排除

**问题：找不到某个命令**
→ 输入 `/` 查看所有可用命令

**问题：属性类型选错了**
→ 点击属性名 → Change property type

**问题：视图不显示**
→ 检查分组/筛选设置

**问题：关联不工作**
→ 确保两个数据库都已创建

---

**详细教程请查看：** `notion-create-template-step-by-step.md`

