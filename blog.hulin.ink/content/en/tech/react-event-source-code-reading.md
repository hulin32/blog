---
title: React source reading--Events
feature_image: /images/react-event.png
date: 2020-05-15T07:43:32+08:00
---

react event source codes reading(v16.13.0)
<!--more-->
According to the official documentation, the event in react is implemented via a SyntheticEvent, writes a wrapper itself, and uses the `eventpool` for performance.
Let's see how it works in source codes, this article's code in [my github's repo event branch](https://github.com/flyingalex/react-related-source-code-reading/tree/event)。There are serveral types build cmd, please use webpack one.

First of all, we need a demo to see how event is running, the demo in `SRC/index. The JSX` file (don't care the other files, I put all react relevant source files here, a bit of a mess 🐶)
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
`handleClick` is the core of this article. First of all, JSX files need to be compiled into js, which we can compile from the command line of Babel
Run in the project root directory:
```shell
./node_modules/.bin/babel src/index.jsx
```
which will generate a index.compiled.js file, this file also in repo's `src/index.compiled.js`,main part like this:
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
This time we are looking at the `event`, how do React knows which one is an event, it's actually what we wrote 'onClick', how is this event bound? By debugging the breakpoint in the chrome browser, you can get a chain of calls like this. This is one of the steps of building the page when react is first time rendered:
![call chain](/images/call-tree.png)

In the `addEventBubbleListener` function code, you can see that called on an element of native addEventListener method to bind event, which will be passed through the browser when you click on the event to trigger the function. The function called by browser is an function wrapped the real function by React. In many articles said that react event is binding on the document, how do we know? That's the function, if you print element, you'll notice that it's the root element HTML.

When click event, the ` dispatchDiscreteEvent ` function called, in this function to initialize ` SyntheticEvent `, and through the ` getPooled ` to get ` SyntheticEvent ` instance, which can be confirmed by this demo, as for how to use the pool, when I look at the second click event is directly from ` eventPool ` gained, so I think that is the cache of the event object, don't recreate every time.

referrence:
1. https://zh-hans.reactjs.org/languages
2. https://github.com/flyingalex/react-related-source-code-reading/tree/event
