---
title: Internationalize Your App with 100 Lines of Code
date: 2018-06-18
categories: wheel
---

npm wheel
<!--more-->
When building websites nowadays, there's often a requirement for internationalization. There are many related packages available in the community, with [react-intl](https://github.com/yahoo/react-intl) probably being the most widely used. Of course, our company is no exception. But when I see it appear in the code, I feel uncomfortable - a bunch of APIs, requiring lots of configuration, and many features that are rarely used in practice. Thinking about it, I realized it would be quite easy to implement using React's recent [*Context*](https://reactjs.org/docs/context.html) API, so I decided to give it a try myself, which resulted in [react-i18context](https://github.com/flyingalex/react-i18context).

The initial intention behind this package was to keep things simple, so there are only 4 interfaces, but I think they're sufficient for most internationalization needs:

### 1.Inject translation files

```js
// wrap app with IntlProvider, messages are trnslations object
<IntlProvider messages={messages} locale="en">
    <App />
</IntlProvider>
```

### 2. Use translated fields
```js
// id is translation object key
<FormatMsg id="test" />
// ex: { test: 'hello {name}'} 
<FormatMsg id="test"  inject={{ name: 'inject' }} />
```

### 3. Switch languages
```js
<LocaleSet locale={lang}>
  <button>change language</button>
</LocaleSet>
```
### 4. Manually change languages
```js
// FooComponent will inject changeLan method to change language manully
InjectIntlLangWrapper(FooComponent)
```

onlne [demo](https://codesandbox.io/s/rmwklmo34m)

[npm package](https://www.npmjs.com/package/react-i18context)

codes [react-i18context](https://github.com/flyingalex/react-i18context)

Code contributions are welcome!
