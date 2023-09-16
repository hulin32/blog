---
title: React子元素的渲染逻辑
date: 2019-07-02T21:48:30+08:00
categories: react
gitalk: true
---

React 源码
<!--more-->

react发现个有趣的问题，在下面四种写法中，只有第一种会渲染demo

显示demo
```jsx
const Demo = (props) => <div {...props} class="demo" />;
<Demo>demo</Demo>
```

显示hello
```jsx
const Demo = (props) => <div children="hello" class="demo" />;
<Demo>demo</Demo>
```

不显示任何信息
```jsx
const Demo = (props) => <div class="demo" />;
<Demo>demo</Demo>
```

不显示任何信息
```jsx
const Demo = () => <div class="demo" />;
<Demo>demo</Demo>
```

why?


发生上面的原因是因为`createElement`函数
```js
function createElement(type, config, children) {
  var propName = void 0;
  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        // 这里会把parent的children复制过来
        props[propName] = config[propName];
      }
    }
  }

  // 这里如果自身有children会覆盖来自parent的
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
```

