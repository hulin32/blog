### ant-design源码分析-概览，Input

准备做一次ant-design源码的阅读，然后出一系列的文章，为何选它，
因为它是TS写的，我也正准备打算学习一下期最佳实践，
我的切入点是以起提供的API着手，分析API都是怎么实现的，今天就以Input
标签开始吧。

### Input

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | string\|ReactNode |  |
| addonBefore | 带标签的 input，设置前置标签 | string\|ReactNode |  |
| defaultValue | 输入框默认内容 | string |  |
| disabled | 是否禁用状态，默认为 false | boolean | false |
| id | 输入框的 id | string |  |
| prefix | 带有前缀图标的 input | string\|ReactNode |  |
| size | 控件大小。注：标准表单内的输入框大小限制为 `large`。可选 `large` `default` `small` | string | `default` |
| suffix | 带有后缀图标的 input | string\|ReactNode |  |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`)。 | string | `text` |
| value | 输入框内容 | string |  |
| onChange | 输入框内容变化时的回调 | function(e) |  |
| onPressEnter | 按下回车的回调 | function(e) |  |
| allowClear | 可以点击清除图标删除内容 | boolean |  |

### Input.TextArea

> `2.12` 后新增的组件，旧版请使用 `Input[type=textarea]`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autosize | 自适应内容高度，可设置为 `true|false` 或对象：`{ minRows: 2, maxRows: 6 }` | boolean\|object | false |
| defaultValue | 输入框默认内容 | string |  |
| value | 输入框内容 | string |  |
| onPressEnter | 按下回车的回调 | function(e) |  |

`Input.TextArea` 的其他属性和浏览器自带的 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 一致。

#### Input.Search

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enterButton | 是否有确认按钮，可设为按钮文字。该属性会与 addon 冲突。 | boolean\|ReactNode | false |
| onSearch | 点击搜索或按下回车键时的回调 | function(value, event) |  |

其余属性和 Input 一致。


#### Input.Password (3.12.0 中新增)

| 参数             | 说明             | 类型    | 默认值 |
| ---------------- | ---------------- | ------- | ------ |
| visibilityToggle | 是否显示切换按钮 | boolean | true   |

### 以上表格来自ant官方

### 1. addonAfter, addonBefore
这两个是一样的，用于放一些元素到input标签的前后，应属于输入内容的一部分(当然也看你代码怎么写了)，注意与prefix和
suffix区别，

```typescript jsx
renderLabeledInput(prefixCls: string, children: React.ReactElement<any>) {
  ....
  const addonBeforeNode = addonBefore ? (<span className={addonClassName}>{addonBefore}</span>) : null;
  const addonAfterNode = addonAfter ? <span className={addonClassName}>{addonAfter}</span> : null;
  ....
  return (
    <span className={mergedGroupClassName} style={style}>
      <span className={mergedWrapperClassName}>
        {addonBeforeNode}
        {React.cloneElement(children, { style: null })}
        {addonAfterNode}
      </span>
    </span>
  );
}

```

### 2. prefix, suffix
这两个API是添加前后图标的
```typescript jsx
  // 添加后缀名时，根据参数通过renderClearIcon添加清除icon
  renderSuffix(prefixCls: string) {
    const { suffix, allowClear } = this.props;
    if (suffix || allowClear) {
      return (
        <span className={`${prefixCls}-suffix`}>
          {this.renderClearIcon(prefixCls)}
          {suffix}
        </span>
      );
    }
    return null;
  }
  renderLabeledIcon(prefixCls: string, children: React.ReactElement<any>) {
    ...
    const suffix = this.renderSuffix(prefixCls);
    const prefix = props.prefix ? (<span className={`${prefixCls}-prefix`}>{props.prefix}</span>) : null;
    ...
    return (
      <span className={affixWrapperCls} style={props.style}>
        {prefix}
        {React.cloneElement(children, {
          style: null,
          className: this.getInputClassName(prefixCls),
        })}
        {suffix}
      </span>
    );
  }
```

### 3. defaultValue
默认值,这里ant用fixControlledValue做了一些处理
```typescript jsx
function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}
```
因为内部一直是controlled input,所以必须有个默认值

### 4. size
通过改变input上的class来改变大小
```typescript jsx
getInputClassName(prefixCls: string) {
  const { size, disabled } = this.props;
  return classNames(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-disabled`]: disabled,
  });
}
```

### 5. onPressEnter
添加enter事件，以通过判断keyCode为13来表示按Enter键
```typescript jsx
handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { onPressEnter, onKeyDown } = this.props;
  if (e.keyCode === 13 && onPressEnter) {
    onPressEnter(e);
  }
  if (onKeyDown) {
    onKeyDown(e);
  }
};
```

### 6. allowClear
清除按钮,添加close-circle按钮，当然会在有值的时候，
这里通过判断undefined，null，''
 ```typescript jsx
renderClearIcon(prefixCls: string) {
  const { allowClear } = this.props;
  const { value } = this.state;
  if (!allowClear || value === undefined || value === null || value === '') {
    return null;
  }
  return (
    <Icon
      type="close-circle"
      theme="filled"
      onClick={this.handleReset}
      className={`${prefixCls}-clear-icon`}
      role="button"
    />
  );
}
```

### 7. Search
Search是封装了Input,通过enterButton添加addonAfter属性
onSearch就是onPressEnter
```typescript jsx
onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
  const { onSearch } = this.props;
  if (onSearch) {
    onSearch(this.input.input.value, e);
  }
  this.input.focus();
};
....
return (
  <Input
    onPressEnter={this.onSearch}
    {...restProps}
    size={size}
    prefixCls={inputPrefixCls}
    addonAfter={this.renderAddonAfter(prefixCls)}
    suffix={this.renderSuffix(prefixCls)}
    ref={this.saveInput}
    className={inputClassName}
  />
);
```

### 8.TextArea
 TextArea有个很有意思的属性autoSize, 通过添加ResizeObserver，然后
 resizeTextarea里面计算新的textareaStyles，具体计算方法是calculateNodeHeight
 ，通过添加一个新的textarea元素来计算
 ```typescript jsx
  resizeOnNextFrame = () => {
    if (this.nextFrameActionId) {
      clearNextFrameAction(this.nextFrameActionId);
    }
    this.nextFrameActionId = onNextFrame(this.resizeTextarea);
  };
  resizeTextarea = () => {
    const { autosize } = this.props;
    if (!autosize || !this.textAreaRef) {
      return;
    }
    const { minRows, maxRows } = autosize as AutoSizeType;
    const textareaStyles = calculateNodeHeight(this.textAreaRef, false, minRows, maxRows);
    this.setState({ textareaStyles });
  };
  renderTextArea = ({ getPrefixCls }: ConfigConsumerProps) => {
  ....
    return (
      <ResizeObserver onResize={this.resizeOnNextFrame} disabled={!autosize}>
        <textarea
          {...otherProps}
          className={cls}
          style={style}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleTextareaChange}
          ref={this.saveTextAreaRef}
        />
      </ResizeObserver>
    );
  }
```
### 9.Password
Password主要就是visibilityToggle，通过改变input类型为text或password来看是否显示
输入的值，ant也在input末尾添加了一个eye Icon
```typescript jsx
getIcon() {
  const { prefixCls, action } = this.props;
  const iconTrigger = ActionMap[action!] || '';
  const iconProps = {
    [iconTrigger]: this.onChange,
    className: `${prefixCls}-icon`,
    type: this.state.visible ? 'eye' : 'eye-invisible',
    key: 'passwordIcon',
    onMouseDown: (e: MouseEvent) => {
      // Prevent focused state lost
      // https://github.com/ant-design/ant-design/issues/15173
      e.preventDefault();
    },
  };
  return <Icon {...iconProps} />;
}
render() {
  ....
  const suffixIcon = visibilityToggle && this.getIcon();
  ....
  return (
    <Input
      {...restProps}
      type={this.state.visible ? 'text' : 'password'} // 通过修改type来让input变成password
      size={size}
      className={inputClassName}
      prefixCls={inputPrefixCls}
      suffix={suffixIcon}
    />
  );
 }
```
