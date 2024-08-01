---
title: First Experience with Tailwindcss
date: 2020-04-23
feature_image: /images/tailwindcss.png
slug: css
---

A New Way of Writing CSS
<!--more-->

[Tailwindcss](https://www.tailwindcss.com/)has been around for a while, but recently, as I've been writing more CSS with poor reusability, I've tried BEM and atomic writing styles. However, I basically have to rewrite for each project, so I was wondering if there's a better method. Somehow, Tailwindcss popped up. This framework is also atomic, which isn't a new concept. I've written this way in my own projects before and found it convenient, but still not comfortable to use. I guess I was put off by my own CSS (laughs).

The documentation introduces it as:
>A utility-first CSS framework for
rapidly building custom designs

>Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

It provides you with a set of tools. Usually, when you write `background`, `font-size`, etc., you define a class each time and then add the corresponding CSS properties. Tailwindcss's approach is to define some classes, each corresponding to a CSS property, and then add these properties by adding these classes to the elements. The image above is from the official website. You can tell from its classes, for example, `text-gray-600` is for font color, and there can be responsive classes like `md:flex`. When the defaults don't meet your needs, you can add new property classes by writing a `tailwind.config.js` configuration file. This is great, really great. After using this, you can basically achieve reuse of some CSS across different projects (if you want to).

I skimmed through the documentation on the official website. It's not difficult to use. I'm planning to try it in my own projects. It takes some time to switch the mindset, but I think this framework is worth trying. Let's use it.

I'll talk about my feelings after a while.

A little complaint: I don't know if it's my network issue, but their official website is slow sometimes.

referrence:

1. https://tailwindcss.com/
2. https://www.tailwindcss.cn/docs/configuration

