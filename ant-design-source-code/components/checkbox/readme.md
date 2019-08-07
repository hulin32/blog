### ant-design源码分析-CheckBox

先来看API

### 属性

#### Checkbox

| 参数           | 说明                                    | 类型              | 默认值 |
| -------------- | --------------------------------------- | ----------------- | ------ |
| autoFocus      | 自动获取焦点                            | boolean           | false  |
| checked        | 指定当前是否选中                        | boolean           | false  |
| defaultChecked | 初始是否选中                            | boolean           | false  |
| disabled       | 失效状态                                | boolean           | false  |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制 | boolean           | false  |
| onChange       | 变化时回调函数                          | Function(e:Event) | -      |

#### Checkbox Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的选项 | string\[] | \[] |
| disabled | 整组失效 | boolean | false |
| name | CheckboxGroup 下所有 `input[type="checkbox"]` 的 `name` 属性 | string | - |
| options | 指定可选项 | string\[] | \[] |
| value | 指定选中的选项 | string\[] | \[] |
| onChange | 变化时回调函数 | Function(checkedValue) | - |

### 方法

#### Checkbox

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |


改组件内部还使用了[rc-checkbox包](https://github.com/react-component/checkbox/blob/master/src/Checkbox.jsx)
最后渲染的核心会是这样
```typescript jsx
<input
  ...
  name={name}
  disabled={disabled}
  checked={!!checked}
  autoFocus={autoFocus}
  ...
/>
```
所以API内的`autoFocus`, `checked`, `disabled`, `name`会直接传给
Input标签

### 1.defaultChecked
在rc-checkbox内
```typescript jsx
const checked = 'checked' in props ? props.checked : props.defaultChecked;
```

### 2.indeterminate
添加一个class来加样式
```typescript jsx
const checkboxClass = classNames({
  [`${prefixCls}-indeterminate`]: indeterminate,
});
```

### 3.onChange
rc-checkbox内部封装了一下
```typescript jsx
handleChange = (e) => {
  const { disabled, onChange } = this.props;
  if (disabled) {
    return;
  }
  if (!('checked' in this.props)) {
    this.setState({
      checked: e.target.checked,
    });
  }
  if (onChange) {
    onChange({
      target: {
        ...this.props,
        checked: e.target.checked,
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      },
      nativeEvent: e.nativeEvent,
    });
  }
};
```

### 9.Group.defaultValue, Group.value
```typescript jsx
constructor(props: CheckboxGroupProps) {
  super(props);
  this.state = {
    value: props.value || props.defaultValue || [],
    ...
  };
}
```

### 10.Group.disabled
该值会静止掉全部的checkbox
```typescript jsx
let children = props.children;
if (options && options.length > 0) {
  children = this.getOptions().map(option => (
    <Checkbox
      ...
      disabled={'disabled' in option ? option.disabled : props.disabled}
      ...
    >
      {option.label}
    </Checkbox>
  ));
}
```

### 11.Group.name
整组的name通过context传入子数组
```typescript jsx
getChildContext() {
return {
  checkboxGroup: {
    ...
    name: this.props.name,
    ...
  },
};
}
```

### 12.Group.options
每个checkbox的值
```typescript jsx
getOptions() {
  const { options } = this.props;
  // https://github.com/Microsoft/TypeScript/issues/7960
  return (options as Array<CheckboxOptionType>).map(option => {
    if (typeof option === 'string') {
      return {
        label: option,
        value: option,
      } as CheckboxOptionType;
    }
    return option;
  });
}

renderGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
  ...
  children = this.getOptions().map(option => (
    <Checkbox
      ...
      value={option.value}
      ...
    >
      {option.label}
    </Checkbox>
  ));
  ...
}
```

### 13.Group.value
选中的值
```typescript jsx
<Checkbox
  ...
  checked={state.value.indexOf(option.value) !== -1}
  ...
>
  {option.label}
</Checkbox>
```

### 14.Group.onChange
将toggleOption传入CheckBox组件，然后通过内部定义的onChange去调用
```typescript jsx
 toggleOption = (option: CheckboxOptionType) => {
  const { registeredValues } = this.state;
  const optionIndex = this.state.value.indexOf(option.value);
  const value = [...this.state.value];
  if (optionIndex === -1) {
    value.push(option.value);
  } else {
    value.splice(optionIndex, 1);
  }
  if (!('value' in this.props)) {
    this.setState({ value });
  }
  const onChange = this.props.onChange;
  if (onChange) {
    const options = this.getOptions();
    onChange(
      value
        .filter(val => registeredValues.indexOf(val) !== -1)
        .sort((a, b) => {
          const indexA = options.findIndex(opt => opt.value === a);
          const indexB = options.findIndex(opt => opt.value === b);
          return indexA - indexB;
        }),
    );
  }
};

checkboxProps.onChange = (...args) => {
  if (restProps.onChange) {
    restProps.onChange(...args);
  }
  checkboxGroup.toggleOption({ label: children, value: props.value });
};
```
