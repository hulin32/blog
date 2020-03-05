---
title: cache in js call
date: 2020-03-05T20:08:17+08:00
feature_image: /images/cache.jpg
slug: performance
gitalk: true
---

js中的缓存做法
<!--more-->

最近网上跟老铁交流的时候，他问我一个函数是干什么的我看了好久，硬是没看出其中的奥秘，你来看看:

```js
function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}
```
这函数干什么的？再看5min。

答案在这: 
https://stackoverflow.com/a/55430181 (还得面向stackoverflow编程)，
看完理解后内心真是万马奔腾，太赞了，主要是这写法遛得不行，**`通过重新定义函数来缓存函数的调用`**，

稍微再说一下stackoverflow那个答题的例子
```js
function f() {
  console.log("outer");
  f = function f() {
    console.log("inner");
  }
}
f(); //outer
f(); //inner
f(); //inner
```
第一次调f()的时候`outer`被打印，然后函数本身变成了新的f()，以后再调用的时候，`outer`是不会被调用的，只会调用新函数打印`inner`，我知道的一般是通过在对象Object上通过key的方式来做缓存，每次判断是否有key，然后再决定是否要计算。当然上面这种方法能在js内用我觉得因为js是解释型语言，代码会在

突发奇想去翻了一下loadash来看看它缓存怎么做的
```js
// lodash
function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
        return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;
```
熟悉的味道，loadash的比较完善些，毕竟这么多人在用，这个我觉得是比较常见的做法


react内也有类似的概念`useCallback`，
```js
function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      // 重点在这里
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```
我没仔细看源码，但大致分为两个部分，组件挂载的时候和更新时，对应上面`mountCallback`和`mountCallback`
然后通过`areHookInputsEqual(nextDeps, prevDeps)`比较参数来判断是否返回缓存

综上，看起来其实大家的做法差不多，只是写法有差别，根据代码的所处的情景做了响应调整。


referrence:
1. https://github.com/facebook/react/blob/f7278034de5a289571f26666e6717c4df9f519ad/packages/react-reconciler/src/ReactFiberHooks.js
2. https://stackoverflow.com/a/55430181
3. https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L10540