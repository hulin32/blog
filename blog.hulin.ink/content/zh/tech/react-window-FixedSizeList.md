---
title: react-window 源码解析--FixedSizeList
date: 2019-06-11T21:57:21+08:00
categories: react-window 
gitalk: true
---

FixedSizeList 解析
<!--more-->

先看简单的的吧，FixedSizeList在底层调用了createListComponent, createListComponent是一个高阶函数，返回一个PureComponent
```js
export default function createListComponent({
  getItemOffset,
  getEstimatedTotalSize,
  getItemSize,
  getOffsetForIndexAndAlignment,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  initInstanceProps,
  shouldResetStyleCacheOnItemSizeChange,
  validateProps,
}: {|
  getItemOffset: GetItemOffset,
  getEstimatedTotalSize: GetEstimatedTotalSize,
  getItemSize: GetItemSize,
  getOffsetForIndexAndAlignment: GetOffsetForIndexAndAlignment,
  getStartIndexForOffset: GetStartIndexForOffset,
  getStopIndexForStartIndex: GetStopIndexForStartIndex,
  initInstanceProps: InitInstanceProps,
  shouldResetStyleCacheOnItemSizeChange: boolean,
  validateProps: ValidateProps,
|}) {
  return class List<T> extends PureComponent<Props<T>, State> {
.....
```
 别怕，我看着也头晕，作者还使用了flow类型，我也没学过，但是感觉跟ts差不太多，还是可以看得懂。

 然后我们根据声明周期来看看这个高阶函数吧,我就挑我认为重要的讲了.

在`getDerivedStateFromProps`会对参数做一些验证,因为其会在render方法前调用，放这里验证也比价合理

然后在`render`里面，
```js
const [startIndex, stopIndex] = this._getRangeToRender();

const items = [];
if (itemCount > 0) {
  for (let index = startIndex; index <= stopIndex; index++) {
    items.push(
      createElement(children, {
        data: itemData,
        key: itemKey(index, itemData),
        index,
        isScrolling: useIsScrolling ? isScrolling : undefined,
        style: this._getItemStyle(index),
      })
    );
  }
}
```
这里生成的`items`就是最终渲染在页面上的内容,这里巧的就是通过控制startIndex, stopIndex，只是渲染一部分的内容到页面上，所以即使有再多的数据，渲染的内容都是一样的，然后看看`_getRangeToRender`方法

```js
_getRangeToRender(): [number, number, number, number] {
  const { itemCount, overscanCount } = this.props;
  const { isScrolling, scrollDirection, scrollOffset } = this.state;

  if (itemCount === 0) {
    return [0, 0, 0, 0];
  }

  // 该方法是使用时才从父组件传下来的
  const startIndex = getStartIndexForOffset(
    this.props,
    scrollOffset,
    this._instanceProps
  );
  // 该方法是使用时才从父组件传下来的
  const stopIndex = getStopIndexForStartIndex(
    this.props,
    startIndex,
    scrollOffset,
    this._instanceProps
  );

  // Overscan by one item in each direction so that tab/focus works.
  // If there isn't at least one extra item, tab loops back around.
  const overscanBackward =
    !isScrolling || scrollDirection === 'backward'
      ? Math.max(1, overscanCount)
      : 1;
  const overscanForward =
    !isScrolling || scrollDirection === 'forward'
      ? Math.max(1, overscanCount)
      : 1;

  return [
    Math.max(0, startIndex - overscanBackward), // 往前加一个
    Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)), // 往后再加一个
    startIndex,
    stopIndex,
  ];
}
```

```js
getStartIndexForOffset: (
  { itemCount, itemSize }: Props<any>,
  offset: number
): number =>
  Math.max(
    0,
    // 简单的将移动的个数算出来
    Math.min(itemCount - 1, Math.floor(offset / ((itemSize: any): number)))
  ),
```

```js
getStopIndexForStartIndex: (
  { direction, height, itemCount, itemSize, layout, width }: Props<any>,
  startIndex: number,
  scrollOffset: number
): number => {
  const isHorizontal = direction === 'horizontal' || layout === 'horizontal';
  // itemSize 是每个item的大小的高或宽，根据isHorizontal 来决定
  const offset = startIndex * ((itemSize: any): number);
  const size = (((isHorizontal ? width : height): any): number);
  return Math.max(
    0,
    Math.min(
      itemCount - 1,
      startIndex +
        Math.floor(
          // 这里的算法就是用区域的大小再加上还未完全移出的那一个的部分大小
          // 不知道为什么要加那一部分，尝试后没有影响
          (size + (scrollOffset - offset)) / ((itemSize: any): number)
        )
    )
  );
},
```

然后重要的就是监听onScroll来改变scrollOffset的值了

当是垂直滚动时
```js
_onScrollVertical = (event: ScrollEvent): void => {
  const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
  this.setState(prevState => {
    if (prevState.scrollOffset === scrollTop) {
    // 如果移动距离是一样的就不更新了
      return null;
    }

    // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
    // scrollTop 就是滚动出去的大小
    // clientHeight 是区域的大小，
    // 其实这里一直都会等于scrollTop
    const scrollOffset = Math.max(
      0,
      Math.min(scrollTop, scrollHeight - clientHeight)
    );

    return {
      isScrolling: true,
      scrollDirection:
        prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
      scrollOffset,
      scrollUpdateWasRequested: false,
    };
  }, this._resetIsScrollingDebounced);
};
```

当是水平滚动时
```js
_onScrollHorizontal = (event: ScrollEvent): void => {
  const { clientWidth, scrollLeft, scrollWidth } = event.currentTarget;
  this.setState(prevState => {
    if (prevState.scrollOffset === scrollLeft) {
        // 如果移动距离是一样的就不更新了
      return null;
    }

    const { direction } = this.props;

    let scrollOffset = scrollLeft;
    if (direction === 'rtl') {
      const isNegative = isRTLOffsetNegative();
      // 这里是当向右阅读时scrollOffset的不同
      // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
      // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
      // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
      // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.
      if (isNegative) {
        scrollOffset = -scrollLeft;
      } else {
        scrollOffset = scrollWidth - clientWidth - scrollLeft;
      }
    }

    // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
    scrollOffset = Math.max(
      0,
      Math.min(scrollOffset, scrollWidth - clientWidth)
    );

    return {
      isScrolling: true,
      scrollDirection:
        prevState.scrollOffset < scrollLeft ? 'forward' : 'backward',
      scrollOffset,
      scrollUpdateWasRequested: false,
    };
  }, this._resetIsScrollingDebounced);
};
```