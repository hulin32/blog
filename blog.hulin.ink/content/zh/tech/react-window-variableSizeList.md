---
title: react-window 源码解析--VariableSizeList
date: 2019-06-12T21:55:21+08:00
categories: react-window
---

VariableSizeList解析
<!--more-->


和前面 #25 一样，最都是调用的`createListComponent`，不一样的地方就是调用那个函数时传入的方法,我们来一起看看。
主要的就是`getStartIndexForOffset`和`getStopIndexForStartIndex`两个函数了

```js
// 主要调用了findNearestItem
getStartIndexForOffset: (
  props: Props<any>,
  offset: number,
  instanceProps: InstanceProps
): number => findNearestItem(props, instanceProps, offset),
```

```js
const findNearestItem = (
  props: Props<any>,
  instanceProps: InstanceProps,
  offset: number
) => {
  const { itemMetadataMap, lastMeasuredIndex } = instanceProps;
  console.log('offset', offset);
  const lastMeasuredItemOffset =
    lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;

  if (lastMeasuredItemOffset >= offset) {
    // 如果查找过就直接使用二分查找
    return findNearestItemBinarySearch(
      props,
      instanceProps,
      lastMeasuredIndex,
      0,
      offset
    );
  } else {
    // 如果没有就使用指数搜索
    return findNearestItemExponentialSearch(
      props,
      instanceProps,
      Math.max(0, lastMeasuredIndex),
      offset
    );
  }
};
```

二分查找我猜很多人都看过了，通过查找中位数来折半查找，非常的快,来主要看看指数查找
```js
const findNearestItemExponentialSearch = (
  props: Props<any>,
  instanceProps: InstanceProps,
  index: number,
  offset: number
): number => {
  const { itemCount } = props;
  let interval = 1;

  // 这里主要就是找到那个偏移大于现在的点
  while (
    index < itemCount &&
    getItemMetadata(props, index, instanceProps).offset < offset
  ) {
    index += interval;
    interval *= 2;
  }
  // 找到那个点后就可以使用二分查找了
  return findNearestItemBinarySearch(
    props,
    instanceProps,
    Math.min(index, itemCount - 1),
    Math.floor(index / 2),
    offset
  );
};
```

接下来再看看`getStopIndexForStartIndex`
```js
getStopIndexForStartIndex: (
  props: Props<any>,
  startIndex: number,
  scrollOffset: number,
  instanceProps: InstanceProps
): number => {
  const { direction, height, itemCount, layout, width } = props;

  const isHorizontal = direction === 'horizontal' || layout === 'horizontal';
  // 可见区域的滑动方向的长度
  const size = (((isHorizontal ? width : height): any): number);
  const itemMetadata = getItemMetadata(props, startIndex, instanceProps);
  // 距离第一个的最大距离
  const maxOffset = scrollOffset + size;

  // 可见区域里第一个的偏移
  let offset = itemMetadata.offset + itemMetadata.size;
  let stopIndex = startIndex;

  while (stopIndex < itemCount - 1 && offset < maxOffset) {
    stopIndex++;
    offset += getItemMetadata(props, stopIndex, instanceProps).size;
  }

  return stopIndex;
},
```