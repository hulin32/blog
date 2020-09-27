---
title: React source reading--constructor
feature_image: /images/react.png
date: 2020-09-19T22:25:46+08:00
categories: react
---

react event source codes reading(v16.13.0)
<!--more-->
article's demo
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

When we write the actual codes, we write `super(props)` every time when we write construtor, in fact, I don't know what's happen when we call it, according to the official documentation
> When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs.

To see what's going on from a source-code perspective, compile above demo with this command:
```shell
./node_modules/.bin/babel src/index.jsx
```
when `super(props)` is there
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
otherwise
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

See what I mean? `super(props)` is to define `this`, if not there, then this has no value, and all the rest of the codes will report an error.
In fact, I think above official statement should be more rigid: you must call the super method when writing the constructor 🐶.

Also what's `props`, it binds the props passed from parent.

In addition, when you call `super`, if your editor has a code hint, you can see that super can pass in `props, context, updater` three variables, but the general use is to use the first one, context is also rarely used here!

referrence:
1. [https://www.nstinfotech.com/difference-between-super-and-super-props-reactjs/](https://www.nstinfotech.com/difference-between-super-and-super-props-reactjs/)
2. [https://overreacted.io/why-do-we-write-super-props](https://overreacted.io/why-do-we-write-super-props)