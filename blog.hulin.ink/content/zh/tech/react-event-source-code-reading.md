---
title: React源码--事件
feature_image: /images/react-event.png
date: 2020-05-15T07:43:32+08:00
categories: react
gitalk: true
---

React事件源码阅读(v16.13.0)
<!--more-->

根据官方文档,react内的事件是通过一个合成事件SyntheticEvent来实现的，自己写了一个wrapper,并且为了性能考虑用了事件池,
我们来看看源码内是怎么做的，本文代码都在我[github
repo的event分支上](https://github.com/flyingalex/react-related-source-code-reading/tree/event)。repo里构建命令有几种，请用webpack

首先我们需要一个demo来看看时间是怎么运行的，demo在`src/index.jsx`文件中（不用关其他文件，这里放了我看react相关源码的所有文件，有点乱🐶）
```js
import React from './react-dev/react';
import { render } from './react-dev/react-dom';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('hello');
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

`handleClick`是本文要研究的地方。首先jsx文件是需要被编译成js，我们可以通过babel的命令行去编译
在项目根目录跑
```shell
./node_modules/.bin/babel src/index.jsx
```
就会生成一个index.compiled.js文件，这个文件也在`src/index.compiled.js`中，跑完主要部分是这样(更多的请看repo)
```js
.......
var App = /*#__PURE__*/ function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      count: 0
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState(function (state) {
        console.log('sasa');
        return {
          count: state.count + 1
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return [_react["default"].createElement("button", {
        key: "1",
        onClick: this.handleClick
      }, "Update counter"), _react["default"].createElement("span", {
        key: "2"
      }, this.state.count)];
    }
  }]);

  return App;
}(_react["default"].Component);
```

本次我们看的是事件，那react又怎么知道哪个是事件，其实就是我们写的`onClick`，那这个事件是怎么绑定的呢，通过浏览器内断点调试，你能得到一个这样的调用链，这是react第一次渲染时页面构建的其中一个步骤:
![调用链](/images/call-tree.png)

在`addEventBubbleListener`代码处，你就能看到，它其实就是在一个元素上调用了原生的addEventListener方法来绑定事件，当你点击时就会通过通过浏览器的事件去触发，只是触发后调用的函数react再做了一次封装，很多文章说react事件是绑定在document上的，从哪里知道的呢？就是这个函数，你如果打印element，你会发现它是根元素html。

当在点击事件时，调用的是`dispatchDiscreteEvent`这个函数，在这个函数中会去初始化`SyntheticEvent`，并且是通过`getPooled`来获取`SyntheticEvent`实例,可以通过demo来证实这个，至于那个pool怎么用，我看第二次点击的时候就是直接从`eventPool`中获取的，所以我认为是缓存事件对象的，不要每次都重新创建。

完。


referrence:
1. https://zh-hans.reactjs.org/languages
2. https://github.com/flyingalex/react-related-source-code-reading/tree/event
