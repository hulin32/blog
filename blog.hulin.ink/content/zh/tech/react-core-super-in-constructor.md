---
title: React源码--constructor
feature_image: /images/react.png
date: 2020-09-19T22:25:46+08:00
categories: react
gitalk: true
---

React构造器源码阅读(v16.13.0)
<!--more-->
该文章的demo
```jsx
import React from './react-dev/react';
import { render } from './react-dev/react-dom';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log('hello');
    console.log('event', event);
    this.setState((state) => {
        console.log('sasa');
        return {count: state.count + 1};
    });
  }

  render() {
    return [
        <button key="1" onClick={this.handleClick}>Update counter</button>,
        <span key="2">{this.state.count}</span>
    ]
  }
}

render(<App />, document.getElementById('app'));
```

我们写react代码的时候每次在写construtor的时候写`super(props)`，其实它做了什么真不知道，根据官方文档
> 在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug。

从源码的角度看是怎么回事呢，通过命令编译上面的demo
```shell
./node_modules/.bin/babel src/index.jsx
```
当有`super(props)`的时候
```jsx
function App(propss) {
    var _this;

    _classCallCheck(this, App);
    // 注意这行
    _this = _super.call(this, propss);
    _this.state = {
      count: 0
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
}
```
当没有的时候
```jsx
function App(props) {
    var _this;

    _classCallCheck(this, App);

    // super(props);
    _this.state = {
        count: 0
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _possibleConstructorReturn(_this);
}
```

看出什么了吗？`super(props)`就是去定义this的，如果没有的话，this就没有值，后面的代码都会报错。
其实我觉得上面官方的说法应该更硬气一点: 写constructor时必须调用super方法🐶

另外props又是做什么的呢，其实就是绑定从调用者那边传入的props到this对象上。

另外当你调用super时，如果你的编辑器有代码提示的话就可以看到其实super是可以传入`props, context, updater`3个变量的，不过一般使用就是用第一个，context在这里也是很少用的



referrence:
1. https://www.nstinfotech.com/difference-between-super-and-super-props-reactjs/
2. https://overreacted.io/zh-hans/why-do-we-write-super-props/