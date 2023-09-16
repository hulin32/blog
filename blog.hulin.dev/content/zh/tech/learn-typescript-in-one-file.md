---
title: "Learn Typescript in One File"
date: 2018-03-25T22:35:55+08:00
gitalk: true
---
尝试在一个文件中装下ts的全部特性
<!--more-->

typescript 是javascript的超级，在原来的基础上引入了类型系统，让代码更加好维护，正经typescript我也还没怎么写过，但在学习中比较没有类型系统时，明显会感觉typescript在项目大后会更好的维护(还没在项目中验证)，希望在今后的代码中也能将起引入。

这里我想通过创建一个类来尽量诠释其全部的概念
```typescript
// 枚举
enum Gender { Female, Male };

class Human {
  // string 类型
  static component: string = '碳水化合物';
}

// 接口
interface Character {
  kindly: boolean;
}

// 继承和实现
class Female extends Human implements Character {
  gender: Gender = Gender.Female;
  kindly: boolean;
  private years: number;
  name: string;
  constructor(kindly: boolean, years: number, name: string) {
    super();
    kindly = kindly;
    years = years;
  }
  // void 表示没有返回值
  sayHi(): void {
    let sentence = `Hello, I am ${this.years} years old`; // 类型推断
    console.log(sentence);
  }
}
```
待补充.....