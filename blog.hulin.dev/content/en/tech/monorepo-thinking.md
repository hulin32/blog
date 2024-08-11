---
title: Monorepo thinking
date: 2024-08-11
slug: monorepo
---

New ways to manage frontend
<!--more-->

These days I am actively working on a new project, with latest Next.js and a design system. We started to do it in seperate projects but in one repo, with this way, we need to have a way to manage it: build, test, develop, etc.

At the beginning, we thought there are not too many projects, we only use npm to manage it, although it works, but I can feel the pain to manage cmds in different projects to make them work together accordingly. For instance, if one project should be build before other project, then we need to manully write such cmd.

We did some search, found monorepo and related tools, nx is the favorite one we tried and used. The best feature I like right now is that **if your project depends on some other libaray, you can import it to use directly and don't need to build it**. Another one is **you can have one package.json to manage all the projects, don't need to maintain the same package in different version**, it has pros and cons, but the maintaince part drive me to follow this as much as possiable.