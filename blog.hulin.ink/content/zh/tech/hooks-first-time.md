---
title: "Hooks First Time"
date: 2019-03-02T22:43:32+08:00
categories: react
---
React 新特性
<!--more-->

19年初，期待以久的hooks在16.8上稳定了。在这之前我也尝试过了这些新的特性，真的很好用，完全可以取带现有的class，让有副作用的代码类似请求也能达到复用的效果。以下是我自己的一些感受。

hooks最最重要的两个的api是useState和useEffect, 顾名思义，useState是用与管理状态的，useEffect是与副作用相关的。

上一段官网的代码
```js
import React, { useState } from 'react';

function Example() {
  // 这里通过解构语法获取state和改变state的方法
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
看看是不是很很简介，想想如果像以前一样如果要使用state，那必须使用class，而且必须使用constructer申明，也写一下
```js
import React from 'react';

export default class Example extends React.Component {
  constructor(props) {
      super(props);
      this.state {
          count: 0,
      };
  }
  
  render() {
    const { count } = this.state;
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => this.seState({ count: count + 1})}>
            Click me
        </button>
      </div>
    );
  }
}
```
有了useState，我看你觉得不会想回去写class了，并且hooks还可以让你自定义hooks，让你的代码复用，state可能吧，醒醒，不要想了。

另外一个接口是useEffect，就我看教程了解到的最直观的好处是代码更想组件了，还是看官网的例子
```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
看到没有订阅和取消订阅再一个地方的，并且相关没有，如果这个函数只有订阅的代码的话它是不是可以复用的，像一个组件一样，如果是之前的class你要怎么做，最多是用高阶函数，但我是感觉那个嵌套太多了，之前我也尝试过去写，但后面还是不了了之了。useEffect大法好。

另外有一点useEffect还可以设置签署去确定它是否需要更新.
```js
useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, [props.friend.id]);
```
上面的代码只有在`props.friend.id`变化的时候才会去调用函数，如果你只想这个函数在mount和unmount执行的话，只需要给useEffect的第二个参数设置为空数组就可以了。

官方提供的api还有很多，有兴趣的可以自己去看看，前端无止境呀，学起来

另外react作者还把相关的源码做了整理，方便查看，[点我去看看](https://gist.github.com/gaearon/864f451ff2a2a5821fe2c4db344ebcdf)