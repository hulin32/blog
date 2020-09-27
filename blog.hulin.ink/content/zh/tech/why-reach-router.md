---
title: 为什么你应该尝试@reach/router
date: 2018-06-05T22:34:28+08:00
categories: why
gitalk: true
---

为什么
<!--more-->


最近react-router的一个作者另外写了一个类react-router的组件[`@reach/router`](https://github.com/reach/router)，尝试后感觉太棒了。如果你的项目只是web端的话我认为可以把你的react-router换掉了。

下面是我到目前看到的所有非常好的点。

1. 小，就4kb,压缩后比react-router小40kb左右。

2. 更少的配置

    a. react-router需要3个包(`history`, `react-router-dom`, `react-router-redux`)，reach-router只需要一个。

    b. 不需要在store配置router相关信息

    c. 不需要显示的使用history

    ```js
    // in store config file
    //react-router
    import { routerMiddleware } from 'react-router-redux';
    import createHistory from 'history/createBrowserHistory';
    const history = createHistory();
    const middleware = routerMiddleware(history);
    export { history };

    //reach/router, nothing

    ```

3. 更好用

    a. 当你想跳转页面时
    ```js
    // react-router
    import { push } from 'react-router-redux';
    import { PropTypes } from 'prop-types';
    // use it
    this.context.store.dispatch(push('/see-you'));

    FooComponent.contextTypes = {
      store: PropTypes.object,
    };
    ```

    ```js
    // reach/router
    import { navigate } from "@reach/router";
    navigate(`/lol`);
    ```

    b.当你想取url里面的参数时
    ```js
    // react-router
    import { withRouter } from 'react-router-dom';
    import { PropTypes } from 'prop-types';

    //use it
    const { match: { params: { iAmHere } } } = this.props;
    FooComponent.propTypes = {
        match: PropTypes.object,
    };
    export default withRouter(FooComponent);
    ```
    ```js
    // reach/router
    const { iAmHere } = this.props;
    ```

4. 基本一样的api,学习成本非常低

5. 源码非常简洁，总共就3个文件，900行，如果你想深入理解单页应用的路由是怎么实现的，reach-router,绝对是绝佳的下手资料。


不说了，去看看吧
[https://github.com/reach/router](https://github.com/reach/router)