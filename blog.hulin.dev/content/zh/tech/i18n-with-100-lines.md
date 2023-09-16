---
title: 100 行代码给你app国际化
date: 2018-06-18T22:32:18+08:00
categories: wheel
gitalk: true
---

npm轮子
<!--more-->

做网站的时候现在经常都会有国际化的要求，社区里面有很多相关的包可以用,最多被用的估计是[react-intl](https://github.com/yahoo/react-intl)，当然我们公司也不例外了，但是当我看着它出现在代码里面的时候真是不自在，一堆的api，需要很多的配置，而且很多其实平时根本就用不到，想了想根据最近react的api[*Context*](https://reactjs.org/docs/context.html)实现一个挺容易的，于是我自己动手试了一下，然后有了[react-i18context](https://github.com/flyingalex/react-i18context)。

做这个包的初衷是为了保持简单，所以接口就4个，但是我觉得大多数的国际化都已经够用了。

### 1.注入翻译文件

```js
// 在app最外层套一个，messages是翻译的一个数组对象， 然后初始化要使用的语言
<IntlProvider messages={messages} locale="en">
    <App />
</IntlProvider>
```

### 2. 使用翻译的字段
```js
// id 是你翻译文件里语言对象的key
<FormatMsg id="test" />
// 如果你的源文件的test是test: 'hello {name}',通过inject参数，test的值最终会变成‘hello inject'
<FormatMsg id="test"  inject={{ name: 'inject' }} />
```

### 3. 切换语言
```js
// locale的值根据你注入翻译文件时对象的key来定
<LocaleSet locale={lang}>
  <button>change language</button>
</LocaleSet>
```
### 4. 手动更换语言
```js
// FooComponent 的props里就会注入changeLan方法,然后你就可以自己选择调用的时机了。
InjectIntlLangWrapper(FooComponent)
```

在线[demo](https://codesandbox.io/s/rmwklmo34m)
[npm包](https://www.npmjs.com/package/react-i18context)
代码[react-i18context](https://github.com/flyingalex/react-i18context),欢迎代码骚扰
