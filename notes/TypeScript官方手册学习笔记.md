# TypeScript 官方手册学习笔记

## 1. 基本类型

### 1.1 布尔 

```ts
let isDone: boolean = false;
```

### 1.2 数字

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;  // ECMAScript 2015
let octal: number = 0o744;    // ECMAScript 2015
let big: bigint = 100n;
```

### 1.3 字符串

```ts
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.
I'll be ${age + 1} years old next month.`;
```

### 1.4 数组

```ts
let list: number[] = [1, 2, 3];
// 或使用泛型方式
let list: Array<number> = [1, 2, 3];
```

### 1.5 元组

数量固定但类型可不同的数组。

```ts
let x: [string, number];
x = ["hello", 10];
// 注意这样会报错
x = [10, "hello"];
```

### 1.6 枚举

默认是一组整数：

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

指定起始索引：

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
```

获取枚举名：

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];
console.log(colorName);  // 'Green'
```

### 1.7 未知类型

```ts
let notSure: unknown = 4;
notSure = "maybe a string instead";
notSure = false;
```

注意以下报错的情况：

```ts
declare const maybe: unknown;

const aNumber: number = maybe;     // 报错
if (maybe === true) {
  const aBoolean: boolean = maybe;
  const aString: string = maybe;   // 报错
}
if (typeof maybe === "string") {
  const aString: string = maybe;
  const aBoolean: boolean = maybe; // 报错
}
```

### 1.8 任意类型

`any` 允许任何类型，主要是用于兼容原有 js 代码或三方库，它不像 `unknown` 一样做类型推断。

```ts
let looselyTyped: any = 4;
looselyTyped.toFixed();
```

`any` 类型会传播：

```ts
let looselyTyped: any = {};
let d = looselyTyped.a.b.c.d;  // d 也是 any 类型
```

### 1.9 void

与 `any` 相反，代表没有任何类型，常用于无返回值的情况：
```ts
function warnUser(): void {
  console.log("This is my warning message");
}
```

不要把变量类型声明为 `void` .

### 1.10 null 和 undefined

`null` 和 `undefined` 是其它类型的子类，故在非严格模式(--strictNullChecks为false)下：

```ts
let a: number = null;
let b: string = undefined;
```
又：`undefined` 是 `null` 的子类。


### 1.11 never 类型

`never` 代表从不会产生的类型，如总会抛出异常或无法执行完毕的函数。`never` 是所有类型的子类型，`any` 类型也不可以赋值给 `never`

```ts
function error(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {}
}
```

### 1.12 对象

主要用于 API 描述，其它一般没啥用。

```ts
declare function create(o: object | null): void;
```

### 1.13 类型断言

```ts
let someValue: unknown = "this is a string";
// as 语法
let strLength: number = (someValue as string).length;
// 尖括号语法
let strLength: number = (<string>someValue).length;
```

JSX 中只支持 as 语法。

### 1.14 内置函数对象

Number, String, Boolean, Symbol 和 Object 不要作为类型使用，使用其小写形式的原始类型。

---

## 2. 接口

定义鸭子类型。

### 2.1 第一个例子

Typescript 的类型检测规则： 

```ts
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

用接口的方式定义：

```ts
interface LabeledValue {
  label: string;
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}
```

检测时不关注属性顺序。

### 2.2 可选属性

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}
```

好处是可以避免使用声明以外的属性：

```ts
function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.clor) { // clor 不在 SquareConfig 上，故报错
    ...
  }
  ...
```

函数提供可选参数对象时，该特性非常有用。

### 2.3 只读属性

对象创建后不可改：

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // 报错!
```

数组有 `ReadonlyArray<T>` 类型。

`const` 用于变量，`readonly` 用于属性。

### 2.4 过载属性检查(excess property checking)

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
// !传入接口外的 colour 会报错
let mySquare = createSquare({ colour: "red", width: 100 });
```

可以使用**类型断言**：

```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

更好的方式是使用**索引签名**：

```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
let squareOptions = { colour: "red" };
// 这个时候就必须传入任一普通属性(width 或 color)，
// 否则下面的代码是会报错的。
let mySquare = createSquare(squareOptions);
```

多数被过载属性检查到的情况，都是代码写错了！

### 2.5 函数类型

通过**调用签名**定义函数类型的接口：

```ts
interface SearchFunc {
  // 参数列表 + 返回值类型
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
```

参数列表中参数名可以不用匹配:

```ts
mySearch = function (src: string, sub: string): boolean {
  ...
};
```

以下代码编译器可以正常推断：

```ts
let mySearch: SearchFunc;

mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
};
```

[个人思考] ts 的这种设计，可以很好的兼容及迁移 js 代码，例如可以在原有代码上层提取出接口层，继而进行后续扩展。


### 2.6 可索引的类型

使用**索引签名**处理“数组”及“关联数组”的场景，索引签名只支持 string 和 number 类型。

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

注意这种情况：

```ts
interface NumberDictionary {
  [index: string]: number;
  length: number; // 这是可以的
  name: string; // 报错!! 已经定义了 string 类型的索引签名
}
```

定义过 string 后是不能再定义 number 的（这是由于 JS 对数组的解释方式其实是对象）：

```ts
interface NotOkay {
  [x: number]: Animal;  // 报错
  [x: string]: Dog;
}
```

只读：
 
```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
```

### 2.7 类

实现接口：

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
```

### 2.8 接口继承

采用多继承：

```ts
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: number;
}
interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

### 2.9 混合类型

可以将各类型混合在一起使用：

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

[个人思考] 这样 Counter 既表现得像函数，又像对象。主要用在对接三方库时使用，自己的代码这样写挺混乱，这是早期库如 jQuery 的风格。

### 2.10 接口继承类

接口可以继承类的所有成员，但不包含其实现。不论类的 public 还是 private 成员都会被继承：

```ts
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}
class TextBox extends Control {
  select() {}
}
class ImageControl implements SelectableControl {
  private state: any;   // 报错!!
  select() {}
}
```

主要作用是：在复杂的继承体系中，保障代码只能通过继承某特定子类才能实现该接口。如例子中的 `ImageControl` 没有继承 `Control` 故无法拥有 `state` 。

---

## 3. 函数

Typescript 同样支持命名函数和匿名函数。

### 3.1 给函数增加类型

```ts
function add(x: number, y: number): number {
  return x + y;
}
```

### 3.2 函数类型

完整的函数类型要包含参数列表和返回值(箭头符号 `=>` 后面是返回值，必须明确写出，无返回值时使用 `void` )：

```ts
let myAdd: (baseValue: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

### 3.3 类型推断

存在上下文信息时，TypeScript 编译器可以做类型推断：

```ts
let myAdd = function (x: number, y: number): number {
  return x + y;
};
let myAdd2: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};
```

### 3.4 可选参数和默认参数

可选参数使用 `?` 且必须在必填参数后面：

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}
```

默认参数：

```ts
function buildName(firstName: string, lastName = "Smith") {
  // ...
}
```

* 在必填参数后时，其定义的类型同可选参数
* 可在必填参数前使用

### 3.5 剩余参数

它是一组绑定在一起的可选参数，主要替换 JS 中用到 `arguments` 的场景。

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
```

### 3.6 this

首先要对 JS 的 `this` 有清醒的认识！在 TypeScript 中，可以在第一个参数明确定义出 `this` 来限制其 `callee` 的类型。

```ts
let deck: Deck = {
  suits: ...,
  cards: ...,
  createCardPicker: function (this: Deck) {
    return () => {
      ...
      return ...
    };
  },
};
```

在回调函数中的 `this` 要和调用者中声明的类型一致：

```ts
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    this.info = e.message;
  }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // 报错!
```

可以将 `onClickBad` 中的 `this` 声明为 `void` 但这样就无法使用 `this.info` 了。另一个办法是使用箭头函数做回调函数，但其副作用是：无法在原型链中增加方法，而是为每个实例都创建一个函数。


### 3.7 重载

```ts
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}
```

编译器会按顺序匹配重载函数，因此应该把最特殊的情况写前面，把更通用的情况写后面。

**注意**：`function pickCard(x): any` 并不是重载函数！调用 `any` 会报错。

---


## 4. 字面量(Literal)类型 

### 4.1 类型收缩

使用 `const` 会把类型收缩 (narrowing).

```ts
// 变量被编译器声明为 string 类型
let hiWorld = "Hi World";
// 声明为 "Hello World" 类型而非 string
const helloWorld = "Hello World";
```

### 4.2 String

string 字面量类型可以和 union 类型等配合使用：

```ts
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    ...
  }
}
```

还可以用来区分重载:

```ts
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
function createElement(tagName: string): Element {
  // ... 
}
```

[个人思考] TypeScript 中的字面量是其一种特殊类型，不同于 JS 中的引擎层面的类型。要始终**把它当成一种类型看待**。

### 4.3 Numeric

```ts
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}
```

### 4.4 Boolean

```ts
interface ValidationSuccess {
  isValid: true;
  reason: null;
}
interface ValidationFailure {
  isValid: false;
  reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;
```

---

## 5. 联合(Unions)和交叉(Intersection)类型

### 5.1 Union 类型

相比于传统面向对象引入类结构，它更好的保留了动态语言的灵活性，还能保障类型检查。

```ts
function padLeft(value: string, padding: string | number) {
  // ...
}
```

只取其行为共性：

```ts
interface Bird {
  fly(): void;
  layEggs(): void;
}
interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();  // 正确
pet.swim();     // 报错!!
```

在 TypeScript 中一个比较实用的技巧:

```ts
type NetworkLoadingState = {
  state: "loading";
};
type NetworkFailedState = {
  state: "failed";
  code: number;
};
type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};
// 限制类型范围
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;
  
function logger(state: NetworkState): string {
  // 这里不能取 state.state 以外的 key
  
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // switch 之后，编译器可以分析出其类型为 NetworkFailedState
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}
```

### 5.2 Intersection 类型

```ts
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}
interface ArtworksData {
  artworks: { title: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;

const handleArtistsResponse = (response: ArtworksResponse) => {
  if (response.error) {
    // ...
    return;
  }
  console.log(response.artworks);
};
```

---


## 6. 类

### 6.1 定义

```ts
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
```

### 6.2 继承

```ts
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  // 构造函数中必须调用 super()
  constructor(name: string) {
    super(name);
    // super 之后才能使用 this
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  // 子类覆盖父类实现
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
// 可以泛化类型
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

### 6.3 public 修饰符

默认是 `public` 的：

```ts
class Animal {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

### 6.4 private 修饰符

TypeScript 3.8 之后支持 ECMAScript 的私有域：

```ts
class Animal {
  #name: string;  // ECMAScript 语法
  private anotherName: string;  // TypeScript 语法
  constructor(theName: string) {
    this.#name = theName;
  }
}
```

### 6.5 protected 修饰符

`protected` 的属性只能在定义它的类及其子类中使用，不能在外部实例中调用。标记为 `protected` 的 `constructor` 不能被实例化，但能被继承。 

```ts
class Person {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}
class Employee extends Person {
  private department: string;
  
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.name); // 报错!!!
let john = new Person("John");  // 报错!!!
```

### 6.6 readonly 修饰符

必须在声明时初始化或在构造函数中初始化（就像 Java 的 final 修饰符）：

```ts
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;

  constructor(theName: string) {
    this.name = theName;
  }
}
```

### 6.7 修饰符可以用于参数

```ts
class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
}
```

### 6.8 getters/setters

```ts
class Employee {
  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    // ...
    this._fullName = newName;
  }
}
```

* 只能在 ECMAScript 5 以上的环境中使用
* 只有 `get` 时会自动推断为 `readonly`

### 6.9 静态属性

使用 `static` 修饰：

```ts
class Grid {
  static origin = { x: 0, y: 0 };

  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    // 直接使用类名调用
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  constructor(public scale: number) {}
}
```

### 6.10 抽象类

```ts
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("roaming the earth...");
  }
}
```

[注] 规则和 Java 基本一样。

### 6.11 高级

直接看例子：

```ts
class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    } else {
      return Greeter.standardGreeting;
    }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet()); // "Hello, there"

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"

let greeter3: Greeter;
greeter3 = new Greeter();
console.log(greeter3.greet()); // "Hey there!"
```

类用作接口：

```ts
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```

---

## 7. 枚举

### 7.1 数字枚举

定义：

```ts
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
```

设置初始值:

```ts
enum Direction {
  Up = 1,
  Down,   // 2
  Left,   // 3
  Right,  // 4
}
```

使用：

```ts
enum UserResponse {
  No = 0,
  Yes = 1,
}
function respond(recipient: string, message: UserResponse): void {
  // ...
}
// 直接通过名字调用即可
respond("Princess Caroline", UserResponse.Yes);
```

### 7.2 String 枚举

不支持自增。好处是便于运行时跟踪其值。

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

### 7.3 常量成员和计算成员

(具体的规则可以查阅官方文档，大概的含义看例子即可)

```ts
enum FileAccess {
  // 常量成员
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // 计算成员
  G = "123".length,
  H = getSomeValue(),
}
```

### 7.4 获取枚举名字

```ts
enum Enum {
  A,
}

let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

### 7.5 其它

[注] 还有其它很多特性，我感觉使用场景不是很多，从略。

---

## 8. 泛型

(在面向对象语言中很普遍，简单记几个例子)

### 8.1 定义

```ts
function identity<T>(arg: T): T {
  return arg;
}
// 调用时：
let output = identity<string>("myString");
// 或直接
let output = identity("myString");
```

### 8.2 泛型类型变量

```ts
function loggingIdentity<T>(arg: T[]): T[] {
  return arg;
}
// 等价于
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  return arg;
}
```

### 8.3 泛型类型

```ts
function identity<T>(arg: T): T {
  return arg;
}
// 用 T 还是用 U 随意
let myIdentity: <U>(arg: U) => U = identity;
```

### 8.4 定义接口中的方法声明

```ts
interface GenericIdentityFn {
  <T>(arg: T): T;
}
```

### 8.5 接口中使用

```ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}
```

### 8.6 类中使用

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
```

### 8.7 泛型约束

```ts
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

在泛型约束中使用类型参数：

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
```

### 8.8 泛型中使用 Class 类型

```ts
class BeeKeeper {
  hasMask: boolean;
}
class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}
class Bee extends Animal {
  keeper: BeeKeeper;
}
class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

---

## 高级类型

### 1 区分类型

使用 type assertion 获取实际的类型：

```ts
let pet = getSmallPet();
let fishPet = pet as Fish;
let birdPet = pet as Bird;

if (fishPet.swim) {
  fishPet.swim();
} else if (birdPet.fly) {
  birdPet.fly();
}
```

但不是最好的方式，可以用 type predicate 来自定义类型守卫：

```ts
// 注意 pet is Fish，pet 必须是当前函数签名中的参数名之一
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

使用 `in` 也可以将 `union` 类型收缩：

```ts
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}
```

`typeof` 的类型检测会被编译器自动进行类型收缩（减少不必要的 type predicate）。`instanceof` 有同样的效果，其右侧必需为构造函数。

### 2 可空类型

默认情况下 `null` 和 `undefined` 是其它所有类型的子类。开启 `--strictNullChecks` 后

```ts
let exampleString = "foo";
exampleString = null;  // 报错!!

let stringOrNull: string | null = "bar";
stringOrNull = null;
stringOrNull = undefined;  // 报错!!
```

对于可选参数，会自动添加一个 `| undefined` 进来(但是 `null` 不可以)。

```ts
class C {
  a: number;
  b?: number;
}

let c = new C();
c.a = 12;
c.a = undefined;  // 报错!!
c.b = 13;
c.b = undefined;
c.b = null;       // 报错!!
```

可以看出，可空类型是通过 union 实现的，所以需要对 null 特殊处理：

```ts
function f(stringOrNull: string | null): string {
  if (stringOrNull === null) {
    return "default";
  } else {
    return stringOrNull;
  }
}
```

TypeScript 也支持 ECMAScript 的语法：

```ts
function f(stringOrNull: string | null): string {
  return stringOrNull ?? "default";
}
```

### 3 类型别名

有点像接口，但是可以给原生类型、union、元组等任何类型定义别名。

```ts
type Second = number;
let timeInSecond: number = 10;
let time: Second = 10;

type Container<T> = { value: T };

type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};
```

接口可继承，而 Type 只能通过 intersection 来扩展属性：


<table>
  <tr>
    <td>
    <pre>
interface Animal {
  name: string
}
interface Bear extends Animal {
  honey: boolean
}
const bear = getBear() 
bear.name
bear.honey</pre>
    </td>
    <td>
    <pre>
type Animal = {
  name: string
}
type Bear = Animal & { 
  honey: Boolean 
}
const bear = getBear();
bear.name;
bear.honey;</pre>
    </td>
  </tr>
</table>


别名一般用在 union 或 tuple 中，通常情况下更推荐使用接口。


### 4 多态的 this 类型

返回其类型或子类型的 this ，构造流式 API ：

```ts
class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ...
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue();
```

### 5 索引类型

```ts
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map((n) => o[n]);
}

interface Car {
  manufacturer: string;
  model: string;
  year: number;
}

let taxi: Car = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2014,
};

let makeAndModel: string[] = pluck(taxi, ["manufacturer", "model"]);
let modelYear = pluck(taxi, ["model", "year"]);
```

`keyof` 返回的是 union ，`keyof Car` 就是 `"manufacturer" | "model" | "year"` ，当增加新的属性时， 其会自动增加相应属性。

`T[K]` 代表泛型上下文中的类型，如：

```ts
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  // o[propertyName] 的类型便是 T[K]
  return o[propertyName]; 
}
```

索引签名的参数类型只能是 string 或 number ，string 实际上是 `string | number`

```ts
interface Dictionary<T> {
  [key: string]: T;
}
let keys: keyof Dictionary<number>;   // string | number
let value: Dictionary<number>["foo"]; // number
```

### 6 映射类型

 通过旧类型生成新类型：
 
```ts
interface Person {
  name: string;
  age: number;
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

一个简单的例子：

```ts
type Keys = "option1" | "option2";
type Flags = { [K in Keys]: boolean };

// 等同于
type Flags = {
  option1: boolean;
  option2: boolean;
};
```

最有价值的作用还是结合泛型。如上面的 `Readonly<T>` 和 `Partial<T>` 。它两已被纳入 TypeScript 标准库，另外还有：

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

### 7 条件(Conditional)类型

TODO 高级知识，以后再回来看。

T 如果可被赋值给 U ，则类型为 X ，否则为 Y 。

```ts
T extends U ? X : Y
```

---
@ssbunny 2020-02-03
