### ant-design源码分析-BreadCrumb

### Breadcrumb

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemRender | 自定义链接函数，和 react-router 配置使用 | (route, params, routes, paths) => ReactNode | - |
| params | 路由的参数 | object | - |
| routes | router 的路由栈信息 | [routes\[\]](#routes) | - |
| separator | 分隔符自定义 | string\|ReactNode | '/' |

### Breadcrumb.Item

| 参数      | 参数           | 类型                                   | 默认值 |
| --------- | -------------- | -------------------------------------- | ------ |
| href      | 链接的目的地   | string                                 | -      |
| separator | 自定义的分隔符 | string\|ReactNode                      | '/'    |
| overlay   | 下来菜单的内容 | [Menu](/components/menu) \| () => Menu | -      |
| onClick   | 单击事件       | (e:MouseEvent)=>void                   | -      |


ant的Breadcrumb是使用一系列的span做成的

### 1. separator
分隔符
```typescript jsx
<span>
    {link}
    <span className={`${prefixCls}-separator`}>{separator}</span>
</span>
```

### 2. params
官方文档没有相关的例子，这个从代码看是和react-router一起用的
```typescript jsx
getPath = (path: string, params: any) => {
    path = (path || '').replace(/^\//, '');
    Object.keys(params).forEach(key => {
      // 换掉路由内的参数
      path = path.replace(`:${key}`, params[key]);
    });
    return path;
};
```

### 3.routes
根据该数组生成BreadcrumbItem
```typescript jsx
genForRoutes = ({
    routes = [],
    params = {},
    separator,
    itemRender = defaultItemRender,
  }: BreadcrumbProps) => {
    const paths: string[] = [];
    return routes.map(route => {
      const path = this.getPath(route.path, params);

      if (path) {
        paths.push(path);
      }
      // generated overlay by route.children
      let overlay = null;
      if (route.children && route.children.length) {
        overlay = (
          <Menu>
            {route.children.map(child => (
              <Menu.Item key={child.breadcrumbName || child.path}>
                {itemRender(child, params, routes, this.addChildPath(paths, child.path, params))}
              </Menu.Item>
            ))}
          </Menu>
        );
      }

      return (
        <BreadcrumbItem overlay={overlay} separator={separator} key={route.breadcrumbName || path}>
          {itemRender(route, params, routes, paths)}
        </BreadcrumbItem>
      );
    });
  };
```

### 4.overlay
overlay是一个Menu组件，最后放入DropDown中，上面`3`中的例子，overlay会传入BreadcrumbItem，
然后在BreadcrumbItem中传入DropDown
```typescript jsx
  renderBreadcrumbNode = (breadcrumbItem: React.ReactNode, prefixCls: string) => {
    const { overlay } = this.props;
    if (overlay) {
      return (
        <DropDown overlay={overlay} placement="bottomCenter">
          <span className={`${prefixCls}-overlay-link`}>
            {breadcrumbItem}
            <Icon type="down" />
          </span>
        </DropDown>
      );
    }
    return breadcrumbItem;
  };
```
