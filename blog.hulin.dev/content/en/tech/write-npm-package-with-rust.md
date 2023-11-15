---
title: Write npm package with rust programming lanuage
date: 2023-10-14T21:32:00+01:00
feature_image: /images/cache.png
slug: rust
gitalk: true
---

Faster npm package
<!--more-->

So these days, frontend are trying to rewrite everything with rust, looks like there is nothing to do in frontend :). I am also interested in rust, also as a frontend, I should need to understand how this work roughly. So I decide to explore a bit about this, and try to create one hello world npm package with rust.

As I first guessing before this, I think they are compling rust to webassembly to use it, but seems not right for me, the debug will be a bit hard? Then I searched on npm package, tried some famous packages in the community:

- https://www.npmjs.com/package/@biomejs/biome?activeTab=code
- https://www.npmjs.com/package/@swc/core?activeTab=code
- https://www.npmjs.com/package/turbo?activeTab=code
- https://github.com/search?q=repo%3Afarm-fe%2Ffarm%20wasm&type=code
- https://github.com/search?q=repo%3Aweb-infra-dev%2Frspack%20wasm&type=code
- https://github.com/search?q=repo%3Aparcel-bundler%2Fparcel%20wasm&type=code

I can see almost of them will have wasm related things. Since pacel has less rust codes, I will check that to see how it works in frontend.

1. First, I checked the [package.json](https://github.com/parcel-bundler/parcel/blob/v2/package.json) file, I saw some of packages I didn't familiar before, its `@napi-rs/cli`, `punycode`, `rimraf` and `sinon`, then check one by one

2. Only `@napi-rs` is related to rs, also in its doc(https://napi.rs), I can see its using to write node script with rust, ha, that's what we want.

3. But its also not what we think before: its not wasm. For me, I think its make sense, these are build tool, so it should use node script. In browser then it should use webassembly.

But I more curious about codes in browser, so let's try one api rust based.

I am going to ask Chatgpt to help me create this demo with this question: Please help to use rust programming language to create an webassembly API to use in browser.

Here is the result: https://chat.openai.com/share/b477e238-07f7-4772-84bf-e2556307ddd9

I am using Chatgpt 3.5, looks like result not very correct, you need to use `wasm-pack build --target web` to build it, then you can use it in browser, actually looks not very bad, even though some js function we can't use, but wasm-pack provide a way to let you do such `console.log`, `throw Error` things with rust way. But Looks like if the error you didn't throw it correctly, ex, devide 0 you didn't consider, then it happened, the error is very vague to debug.

But all in all, WebAssembly looks very good now in browser, also I rememeber WebAssembly is the four lanuage browser supported natively.

