---
title: cache in js call
date: 2020-03-05T20:08:17+08:00
feature_image: /images/cache.png
slug: performance
gitalk: true
---

Caching in js
<!--more-->

Recently, when I was communicating with someone on the Internet, he asked me what a function was. I looked at it for a long time, but I couldn't find the secret. Let's have a look:
```js
function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}
```
What does this function do? Look at 5 more min.

Here is the anwser: 
https://stackoverflow.com/a/55430181 (Object to stackoverflow programming)，
After reading and understanding it, just want to say: fucking great,
**by redefining the function to cache the function call**,

Say a little more about the stackoverflow example:
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
The first time I call f(), `outer` is printed, and then the function itself becomes a new f(). When I call it again later, `outer` will not be called, only the new function will be called to print `inner`. What I know is that the cache is usually done by the method of key on the Object. And this method can be used inside js I think because js is an interpreted language, the code will be called when its excuted.

I went through loadash source codes to see how it do cache?
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
Familiar taste, loadash is more perfect, after all, so many people are using it, I think this is a common practice

There's a similar concept in react: `useCallback`，
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
      // note!!!!!
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```
I didn't take a close look at the source code, but it is roughly divided into two parts, `mountCallback` and `mountCallback` are called when the component is mounted and updated
. Then use `areHookInputsEqual(nextDeps, prevDeps)` to compare parameters and determine whether the cache is returned.

To sum up, it seems that everyone is doing the same, but there are differences in writing, according to the situation of the code to do some adjustion.


referrence:
1. https://github.com/facebook/react/blob/f7278034de5a289571f26666e6717c4df9f519ad/packages/react-reconciler/src/ReactFiberHooks.js
2. https://stackoverflow.com/a/55430181
3. https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L10540
