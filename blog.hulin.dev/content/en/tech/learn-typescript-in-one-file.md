---
title: Learn Typescript in One File
date: 2018-03-25
---
Attempting to Fit All TypeScript Features in One File
<!--more-->

TypeScript is a superset of JavaScript that introduces a type system on top of the original, making code more maintainable. I haven't written much serious TypeScript yet, but while learning, it's clear that TypeScript would be easier to maintain in larger projects compared to not having a type system (though I haven't verified this in a project yet). I hope to introduce it in my future code as well.

Here, I want to try to illustrate all of its concepts as much as possible by creating a class.
```typescript
// Demonstrates interfaces, generics, and union types
interface Printable<T> {
  print(): T | string;
}

// Enum declaration
enum Color {
  Red,
  Green,
  Blue
}

// Type alias
type NumberOrString = number | string;

// Class declaration with generics, implementing an interface
class TypeScriptShowcase<T> implements Printable<T> {
  // Private field
  private data: T;

  // Public readonly property
  public readonly id: NumberOrString;

  // Constructor with parameter properties
  constructor(public name: string, private age: number = 30) {
    this.id = Date.now();
  }

  // Getter
  get info(): string {
    return `${this.name} (${this.age})`;
  }

  // Setter
  set info(value: string) {
    [this.name, this.age] = value.split(' ');
    this.age = Number(this.age);
  }

  // Method with rest parameters and arrow function
  public greet = (...names: string[]): void => {
    console.log(`Hello, ${names.join(', ')}!`);
  }

  // Static method
  static createInstance<U>(data: U): TypeScriptShowcase<U> {
    return new TypeScriptShowcase<U>("Default", 25);
  }

  // Implementation of interface method
  print(): T | string {
    return `Data: ${this.data}`;
  }

  // Method with function overloading
  public process(input: number): number;
  public process(input: string): string;
  public process(input: number | string): number | string {
    return typeof input === 'number' ? input * 2 : input.toUpperCase();
  }

  // Async method
  public async fetchData(): Promise<T> {
    // Simulating an API call
    return new Promise(resolve => setTimeout(() => resolve(this.data), 1000));
  }

  // Method using a tuple type
  public swapValues(a: T, b: T): [T, T] {
    return [b, a];
  }
}

// Usage of the class
const showcase = new TypeScriptShowcase<string>("Alice", 25);
showcase.greet("Bob", "Charlie");
console.log(showcase.info);
showcase.info = "David 35";
console.log(showcase.process(10));
console.log(showcase.process("hello"));

// Decorators (experimental feature)
function logged(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class DecoratorExample {
  @logged
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const dec = new DecoratorExample();
dec.multiply(2, 3);

// Demonstrating keyof and mapped types
type Keys = keyof TypeScriptShowcase<any>;
type ReadonlyTypeScriptShowcase<T> = {
  readonly [P in keyof TypeScriptShowcase<T>]: TypeScriptShowcase<T>[P];
};

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Utility types
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// Using a namespace
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// Using the namespace
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
```