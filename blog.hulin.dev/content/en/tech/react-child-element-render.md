---
title: Rendering Logic of React Child Elements
date: 2019-07-02
categories: react
---

React source code
<!--more-->

An interesting issue was discovered in React. Among the following four writing styles, only the first one will render "demo":

Displays "demo"
```jsx
const Demo = (props) => <div {...props} class="demo" />;
<Demo>demo</Demo>
```

Displays "hello"
```jsx
const Demo = (props) => <div children="hello" class="demo" />;
<Demo>demo</Demo>
```

Doesn't display any information
```jsx
const Demo = (props) => <div class="demo" />;
<Demo>demo</Demo>
```

Doesn't display any information
```jsx
const Demo = () => <div class="demo" />;
<Demo>demo</Demo>
```

why?


The reason for the above behavior is due to the `createElement` function.
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
        // here it will copy parent's children
        props[propName] = config[propName];
      }
    }
  }

  // here if itself has children, it will overlap parent
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

