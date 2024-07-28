---
title: Share Login Between Nextjs And Session Based Website
date: 2024-07-25
feature_image: /images/share-session.png
slug: Nextjs, React
gitalk: true
---

Share session between nextjs rendered page and another server rendered page
<!--more-->

## Background
These days I am tring to do a prototype, thinking how to share the login from nodejs service to nextjs render page, so under one domain, some pages rendered from nextjs service directly, others rendered from a nodejs service:
![browser-to-multi-server](/images/browser-to-multi-server.png)

All user related logic(register/login) are in nodejs service and its session based login.

Imagine you login from nodejs rendered page, then redirect to the nextjs page, how can I know if the user is login or not? 


## Theory knowledge
After searching and checked some articles, also asked AI :), I found a straightforward solution. Ignore all above info, thinking a bit HTTP protocol, between the client and server, all these communications are based on text, there is no any magic. 

About the session login, how is it work? If you used it before, you should know, in frontend,its rely on the session id in the cookie, then in every request, you attach this cookie to backend, backend will know if session based info should be fetched or not. That means no matter where the reqeust comes from, if you can attach the cookie in the header when the request send to server, then the server can detect it and based on that to return you data.

## Demo
I also wrote a [demo](https://github.com/hulin32/nextjs-express) to verify this, that's actually work as I imagine. In the demo, I putted a cookie(`token=fake-token`) in header, then in nextjs I will read this cookie from header, then attach it to the call to the express api to get the user info
