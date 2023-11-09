# Rust 生命周期的常见误区

这篇文章写得很好，网上也有诸多译文。之所以再译一次，是因为我对这些译文的质量不太满意。它们大多过于拗口，译文无法突出原文所表达的重点，有些甚至存在错译。我谨慎地再译一次，只为分享给你。

## 导言

接下来要讲的这些误区我都曾陷入过，如今也看到许多初学者在其中挣扎。可能我使用的术语不够标准，所以我列了个短语速记表，以阐述我想表达的意思。

| 短语 | 含义 |
|-|-|
| `T` | 1) 一个集合，包含所有可能的类型 _或_<br>2) 该集合中的某个类型 |
| 拥有所有权的类型 | 一些非引用类型，像是 `i32`, `String`, `Vec` 等 |
| 1) 借用类型 _或_<br>2) 引用类型 | 一些引用类型，无论可变性如何，像是 `&i32`, `&mut i32` 等 |
| 1) 可变引用 _或_<br>2) 独占引用 | 独占可变引用，如 `&mut T` |
| 1) 不可变引用 _或_<br>2) 共享引用 | 共享不可变引用，如 `&T` |

## 误区

一言以蔽之： 变量的生命周期是指编译器可静态验证变量指向的数据，在其当前内存地址的有效时间。接下来，我将用大约 6500 字（英文原文）的篇幅详细介绍大家通常会混淆的地方。

### 1) `T` 仅包含拥有所有权的类型

这一误区更多源自对泛型的错误理解，而非生命周期。但在 Rust 中，泛型和生命周期是紧密相连的，谈论其中之一时不可能规避另一个不谈。这么说吧：

当我刚开始学习 Rust 时，我知道 `i32`、`&i32` 和 `&mut i32` 是不同的类型。我还知道泛型变量 `T` 代表一个集合，其中包含所有可能的类型。然而，尽管我分别理解了这两件事，却无法将它们放在一起理解。在我这个 Rust 新手的脑海中，认为泛型是这样工作的：

| | | | |
|-|-|-|-|
| **类型变量** | `T` | `&T` | `&mut T` |
| **例子** | `i32` | `&i32` | `&mut i32` |

`T` 包含所有拥有所有权的类型。`&T` 包含所有不可变引用类型。`&mut T` 包含所有可变引用类型。`T`、`&T` 和 `&mut T` 是互不相交的有限集合。漂亮、简单、干净、容易、直观，但完全是大错特错。事实上，在 Rust 中泛型是这样工作的：

| | | | |
|-|-|-|-|
| **类型变量** | `T` | `&T` | `&mut T` |
| **例子** | `i32`, `&i32`, `&mut i32`, `&&i32`, `&mut &mut i32`, ... | `&i32`, `&&i32`, `&&mut i32`, ... | `&mut i32`, `&mut &mut i32`, `&mut &i32`, ... |

其实 `T`、`&T` 和 `&mut T` 都是无限集，因为可以无限借用一个类型。`T` 是 `&T` 和 `&mut T` 的超集。下面是几个验证这些概念的例子：

```rust
trait Trait {}

impl<T> Trait for T {}

impl<T> Trait for &T {} // ❌

impl<T> Trait for &mut T {} // ❌
```

上述代码无法如期编译：

```none
error[E0119]: conflicting implementations of trait `Trait` for type `&_`:
 --> src/lib.rs:5:1
  |
3 | impl<T> Trait for T {}
  | ------------------- first implementation here
4 |
5 | impl<T> Trait for &T {}
  | ^^^^^^^^^^^^^^^^^^^^ conflicting implementation for `&_`

error[E0119]: conflicting implementations of trait `Trait` for type `&mut _`:
 --> src/lib.rs:7:1
  |
3 | impl<T> Trait for T {}
  | ------------------- first implementation here
...
7 | impl<T> Trait for &mut T {}
  | ^^^^^^^^^^^^^^^^^^^^^^^^ conflicting implementation for `&mut _`
```

编译器不允许我们为 `&T` 和 `&mut T` 定义 `Trait` 的实现，因为这会与 `T` 对 `Trait` 的实现冲突，后者已经包含了 `&T` 和 `&mut T`。由于 `&T` 和 `&mut T` 不相交，因此下面的代码可以按预期编译：

```rust
trait Trait {}

impl<T> Trait for &T {} // ✅

impl<T> Trait for &mut T {} // ✅
```

**主要收获**
- `T` 是 `&T` 和 `&mut T` 的超集
- `&T` 和 `&mut T` 是互不相交的集合

### 2) 若 `T: 'static` 则 `T` 必须在整个程序运行期间有效

**误区延伸**
- `T: 'static` 被视作 _"`T` 拥有 `'static` 生命周期"_
- `&'static T` 与 `T: 'static` 相同
- 若 `T: 'static` 则 `T` 是不可变的
- 若 `T: 'static` 则 `T` 只能在编译期创建

多数 Rust 初学者第一次接触 `'static` 生命周期时，都见到过类似这种示例代码：

```rust
fn main() {
    let str_literal: &'static str = "str literal";
}
```

这些初学者们被告知：`"str literal"` 已被硬编码到编译后的二进制文件中，并会在运行期加载到只读内存区，因此它是不可变的，在整个程序运行期间都有效，这正是它之所以称作 `"static"` 的原因。而 Rust 使用 `static` 关键字定义 `static` 变量的语法规则，更是进一步强化了这种观念。

```rust
// 注意：本例纯粹用于演示说明，切勿使用 `static mut`。它是一把双刃剑。
// 在 Rust 中有 safe 模式的全局可变单例，但这不在本文讨论范围。

static BYTES: [u8; 3] = [1, 2, 3];
static mut MUT_BYTES: [u8; 3] = [1, 2, 3];

fn main() {
   MUT_BYTES[0] = 99; // ❌ - 修改静态变量是 unsafe 操作

    unsafe {
        MUT_BYTES[0] = 99;
        assert_eq!(99, MUT_BYTES[0]);
    }
}
```

关于静态变量
- 它们只能在编译时创建
- 它们是不可变的，改变它们是不安全的
- 它们在整个程序运行期间有效

`'static` 生命周期可能得名于 `static` 变量的默认生命周期，是这样吗？因此可以合理地认为，`static` 生命周期必须遵循所有相同的规则，是这样吗？

是这样的，但*具有* `'static` 生命周期的类型和*绑定*了 `'static` 生命周期的类型是不同的概念。后者可以在运行期动态分配，可以安全、自由地修改，可以 drop，可以存活任意时长。

在这一点上，区分 `&'static T` 和 `T: 'static` 至关重要。

`&'static T` 是对 `T` 的不可变引用，该引用可以安全地、无限期驻留在内存中，甚至到程序结束。然而只有当 `T` 本身是不可变的，并且在*创建引用后*不会移动时，才有可能做到这一点。`T` 不需要在编译期创建。完全可以在运行期生成随机的动态分配数据，并以内存泄漏为代价返回对它的 `'static` 引用，例如：

```rust
use rand;

// 运行期随机生成 'static str 引用
fn rand_str_generator() -> &'static str {
    let rand_string = rand::random::<u64>().to_string();
    Box::leak(rand_string.into_boxed_str())
}
```

`T: 'static` 则是指 `T` 本身可以安全地、无限期驻留在内存中，甚至到程序结束。`T: 'static` 既包括所有 `&'static T`，也包括所有拥有所有权的类型，如 `String`、`Vec` 等。只要数据的所有者持有这些数据，就能保证其永不失效，也就是说所有者可以安全地、无限期地持有这些数据，直到程序结束。`T: 'static` 应被视作 *“`T` 受 `'static` 生命周期约束”*，而**不是** *“`T` 拥有 `'static` 生命周期”*。用程序来说明这一概念：

```rust
use rand;

fn drop_static<T: 'static>(t: T) {
    std::mem::drop(t);
}

fn main() {
    let mut strings: Vec<String> = Vec::new();
    for _ in 0..10 {
        if rand::random() {
            // 所有字符串都是随机生成的，并在运行期动态分配
            let string = rand::random::<u64>().to_string();
            strings.push(string);
        }
    }

    // strings 是拥有所有权的类型，因此它们受 'static 约束
    for mut string in strings {
        // 所有字符串都是可变的
        string.push_str("a mutation");
        // 而且都可以被 drop
        drop_static(string); // ✅
    }

    // 在程序结束前，strings 都已失效
    println!("I am the end of the program");
}
```

**主要收获**
- `T: 'static` 应被理解为 _“`T` 受 `'static` 生命周期约束”_
- 若 `T: 'static` 则 `T` 可以是拥有 `'static` 生命周期的借用类型 _或_ 拥有所有权的类型
- 既然 `T: 'static` 包括拥有所有权的类型，便意味着 `T`
    - 可以在运行期动态分配
    - 不必在整个程序运行期间有效
    - 可以安全、自由地修改
    - 可以在运行期动态 drop
    - 可以有不同的生命周期

### 3) `&'a T` 和 `T: 'a` 相同

这一误区其实是上一个的泛化。

`&'a T` 要求并隐含了 `T: 'a`，因为如果 `T` 本身对生命周期 `'a` 无效，那么生命周期为 `'a` 的 `T` 的引用更不可能对 `'a` 有效。比方说，Rust 编译器从不允许构造 `&'static Ref<'a, T>` 类型，正是因为如果 `Ref` 只对 `'a` 有效，就不可能对它进行 `'static` 引用。

`T：'a` 包括所有 `&'a T`，反之则不成立。

```rust
// 只接受满足生命周期 'a 的引用类型
fn t_ref<'a, T: 'a>(t: &'a T) {}

// 接受满足生命周期 'a 的所有类型
fn t_bound<'a, T: 'a>(t: T) {}

// 拥有所有权的类型，其内部包含引用
struct Ref<'a, T: 'a>(&'a T);

fn main() {
    let string = String::from("string");

    t_bound(&string); // ✅
    t_bound(Ref(&string)); // ✅
    t_bound(&Ref(&string)); // ✅

    t_ref(&string); // ✅
    t_ref(Ref(&string)); // ❌ - expected ref, found struct
    t_ref(&Ref(&string)); // ✅

    // 字符串变量受 'static 约束，而 'static 受 'a 约束
    t_bound(string); // ✅
}
```

**主要收获**
- 与 `&'a T` 相比，`T: 'a` 更通用、更灵活
- `T: 'a` 接受拥有所有权的类型（其内部可含有引用）、引用类型
- `&'a T` 只接受引用类型
- 若 `T: 'static` 则 `T: 'a` ，因为对于所有 `'a` 都有 `'static` >= `'a`


### 4) 我的代码没使用泛型也不含生命周期注解

**误区延伸**
- 可以避免使用泛型和生命周期注解

这一看似令人舒适的误区祸起自 Rust 的生命周期省略规则（lifetime elision rules），它允许在函数中省略生命周期注解。之所以能够省略，是因为 Rust 的借用检查器可以基于以下规则推断出相应的注解：
- 函数的每个输入引用都有一个独立的生命周期
- 如果有且只有一个输入生命周期，该生命周期将应用于所有输出引用
- 如果有多个输入生命周期，但其中一个是 `&self` 或 `&mut self`，那么 `self` 的生命周期将应用于所有输出引用
- 否则，必须明确指出输出生命周期

[译注：函数或方法的参数的生命周期被称为输入生命周期（input lifetimes），而返回值的生命周期被称为输出生命周期（output lifetimes）]

要理解的有点多，不妨来看一些例子：

```rust
// 省略形式
fn print(s: &str);

// 完整形式
fn print<'a>(s: &'a str);

// 省略形式
fn trim(s: &str) -> &str;

// 完整形式
fn trim<'a>(s: &'a str) -> &'a str;

// 非法，无法确定输出生命周期，无输入
fn get_str() -> &str;

// 显式标注
fn get_str<'a>() -> &'a str; // 泛型版本
fn get_str() -> &'static str; // 'static 版本

// 非法，无法确定输出生命周期，多输入
fn overlap(s: &str, t: &str) -> &str;

// 显式标注（但仍有部分标注被省略）
fn overlap<'a>(s: &'a str, t: &str) -> &'a str; // 返回值的生命周期不长于 s
fn overlap<'a>(s: &str, t: &'a str) -> &'a str; // 返回值的生命周期不长于 t
fn overlap<'a>(s: &'a str, t: &'a str) -> &'a str; // 返回值的生命周期不长于 s & t
fn overlap(s: &str, t: &str) -> &'static str; // 返回值的生命周期可以长于 s & t
fn overlap<'a>(s: &str, t: &str) -> &'a str; // 返回值的生命周期与输入无关

// 完整形式
fn overlap<'a, 'b>(s: &'a str, t: &'b str) -> &'a str;
fn overlap<'a, 'b>(s: &'a str, t: &'b str) -> &'b str;
fn overlap<'a>(s: &'a str, t: &'a str) -> &'a str;
fn overlap<'a, 'b>(s: &'a str, t: &'b str) -> &'static str;
fn overlap<'a, 'b, 'c>(s: &'a str, t: &'b str) -> &'c str;

// 省略形式
fn compare(&self, s: &str) -> &str;

// 完整形式
fn compare<'a, 'b>(&'a self, &'b str) -> &'a str;
```

如果你曾写过
* struct 方法
* 获取引用的函数
* 返回引用的函数
* 泛型函数
* trait 对象（稍后详述）
* 闭包（稍后详述）

那么你的代码中就遍布省略的泛型生命周期注解。

**主要收获**
- 几乎所有 Rust 代码都是泛型代码，四处皆是省略的生命周期注解



### 5) 只要编译成功，生命周期注解就是正确的

**误区延伸**
- Rust 的函数生命周期省略规则总是正确的
- Rust 的借用检查器在技术上和 _语义上_ 总是正确的
- Rust 比我更了解程序的语义

Rust 程序有可能在技术上可以编译，但在语义上仍然是错误的。举个例子：

```rust
struct ByteIter<'a> {
    remainder: &'a [u8]
}

impl<'a> ByteIter<'a> {
    fn next(&mut self) -> Option<&u8> {
        if self.remainder.is_empty() {
            None
        } else {
            let byte = &self.remainder[0];
            self.remainder = &self.remainder[1..];
            Some(byte)
        }
    }
}

fn main() {
    let mut bytes = ByteIter { remainder: b"1" };
    assert_eq!(Some(&b'1'), bytes.next());
    assert_eq!(None, bytes.next());
}
```

`ByteIter` 是一个用来迭代字节切片的迭代器。为了简洁起见，我们跳过了 `Iterator` trait 的实现。目前一切正常，但如果我们想同时查看一对字节呢？

```rust
fn main() {
    let mut bytes = ByteIter { remainder: b"1123" };
    let byte_1 = bytes.next();
    let byte_2 = bytes.next();
    if byte_1 == byte_2 { // ❌
        // do something
    }
}
```

呦！编译错误：

```none
error[E0499]: cannot borrow `bytes` as mutable more than once at a time
  --> src/main.rs:20:18
   |
19 |     let byte_1 = bytes.next();
   |                  ----- first mutable borrow occurs here
20 |     let byte_2 = bytes.next();
   |                  ^^^^^ second mutable borrow occurs here
21 |     if byte_1 == byte_2 {
   |        ------ first borrow later used here
```

可以逐个复制字节来解决此编译错误。确实，在处理字节时复制是没问题的，但如果打算把 `ByteIter` 做成一个通用的切片迭代器，可以遍历任何 `&'a [T]`，那就有可能把它用在复制或克隆成本很高的类型上，甚至是不可能复制或克隆的类型上。好吧，我想咱们对此都无能为力，代码能编译，那么生命周期注解一定是正确的，对吗？

不对，当前的生命周期注解实际上正是 bug 的根源！该 bug 特别难以发现，因为错误的生命周期注释被省略掉了。我们来补充上被省略的生命周期，以便更清楚地了解问题所在：

```rust
struct ByteIter<'a> {
    remainder: &'a [u8]
}

impl<'a> ByteIter<'a> {
    fn next<'b>(&'b mut self) -> Option<&'b u8> {
        if self.remainder.is_empty() {
            None
        } else {
            let byte = &self.remainder[0];
            self.remainder = &self.remainder[1..];
            Some(byte)
        }
    }
}
```

一点帮助都没有，看起来还是一头雾水。此处有个只有 Rust 高手才知道的小窍门：给生命周期注解起个有意义的名字。来，再试一次：

```rust
struct ByteIter<'remainder> {
    remainder: &'remainder [u8]
}

impl<'remainder> ByteIter<'remainder> {
    fn next<'mut_self>(&'mut_self mut self) -> Option<&'mut_self u8> {
        if self.remainder.is_empty() {
            None
        } else {
            let byte = &self.remainder[0];
            self.remainder = &self.remainder[1..];
            Some(byte)
        }
    }
}
```

每个返回的字节都被注解为 `'mut_self`，但这些字节显然来自 `'remainder` ！来，搞定它。

```rust
struct ByteIter<'remainder> {
    remainder: &'remainder [u8]
}

impl<'remainder> ByteIter<'remainder> {
    fn next(&mut self) -> Option<&'remainder u8> {
        if self.remainder.is_empty() {
            None
        } else {
            let byte = &self.remainder[0];
            self.remainder = &self.remainder[1..];
            Some(byte)
        }
    }
}

fn main() {
    let mut bytes = ByteIter { remainder: b"1123" };
    let byte_1 = bytes.next();
    let byte_2 = bytes.next();
    // 调整后甚至可以 drop 掉迭代器
    std::mem::drop(bytes);
    if byte_1 == byte_2 { // ✅
        // do something
    }
}
```

现在回过头来看看上一个版本的代码，既然它是错误的，Rust 为什么要编译它呢？原因很简单：内存安全。

Rust 借用检查器只要能利用生命周期注解静态验证程序的内存安全性就够了，多余的事情概不关心。即使生命周期注解存在语义错误，Rust 也乐于编译它，哪怕会给程序带来不必要的限制。

来看一个与上面相反的例子：示例中，Rust 的生命周期省略规则语义上正确，但我们却无意中写出了一个限制极严的方法，并使用了不必要的显式生命周期注解。

```rust
#[derive(Debug)]
struct NumRef<'a>(&'a i32);

impl<'a> NumRef<'a> {
    // 结构体的泛型是 'a ，是否意味着
    // 也需要用 'a 来注解 self 参数？(答案：否）
    fn some_method(&'a mut self) {}
}

fn main() {
    let mut num_ref = NumRef(&5);
    // 在其生命周期内可变地借用 num_ref
    num_ref.some_method();
    num_ref.some_method(); // ❌
    println!("{:?}", num_ref); // ❌
}
```

当 struct 存在泛型参数 `'a` 时，几乎永远不会再写一个接收 `&'a mut self` 的方法，因为这样写相当于告诉 Rust _"该方法将在 struct 的整个生命周期内可变地借用该 struct"_。实践中意味着 Rust 的借用检查器最多只允许调用 `some_method` 一次，之后 struct 就永久地被可变借用走，从而无法再使用。这种使用场景极其罕见，但对于懵懂的初学者来说，却非常容易编写出上面这类代码，关键它还能编译通过。解决方法是不去添加不必要的显式生命周期注解，交由 Rust 的生命周期省略规则处理：

```rust
#[derive(Debug)]
struct NumRef<'a>(&'a i32);

impl<'a> NumRef<'a> {
    // mut self 上不再使用 'a
    fn some_method(&mut self) {}

    // 去掉语法糖后相当于
    fn some_method_desugared<'b>(&'b mut self){}
}

fn main() {
    let mut num_ref = NumRef(&5);
    num_ref.some_method();
    num_ref.some_method(); // ✅
    println!("{:?}", num_ref); // ✅
}
```

**主要收获**
- Rust 的函数生命周期省略规则并不总是适用于所有情况
- Rust 并不比你更了解程序的语义
- 为生命周期注解赋予有意义的名称
- 谨慎考虑在何处放置显式生命周期注解以及为什么要这样做



### 6) 装箱后的 trait 对象没有生命周期

前面我们讨论了 Rust 针对函数的生命周期省略规则。Rust 也有针对 trait 对象的生命周期省略规则，它们是：
- 如果 trait 对象被用作泛型的类型参数，那么它的生命周期约束从包含类型中推断
    - 如果在包含类型中存在唯一一个约束，则使用该约束
    - 如果在包含类型中存在多个约束，则必须指定显式约束
- 如果上述情况不适用，则
    - 如果 trait 的定义只有一个生命周期约束，则使用该约束
    - 如果 `'static` 被用于任何生命周期约束，则使用 `'static`
    - 如果 trait 没有生命周期约束，则在表达式中推断生命周期，并在表达式外使用 `'static`

这些听起来超复杂，但可以简单概括为 _"根据上下文推断出 trait 对象的生命周期约束"_ 。看几个例子后你就会发现，生命周期约束推断非常直观，根本不必记住正式的规则：

```rust
use std::cell::Ref;

trait Trait {}

// 省略形式
type T1 = Box<dyn Trait>;
// 完整形式，Box<T> 对 T 没有生命周期约束，因此推断为 'static
type T2 = Box<dyn Trait + 'static>;

// 省略形式
impl dyn Trait {}
// 完整形式
impl dyn Trait + 'static {}

// 省略形式
type T3<'a> = &'a dyn Trait;
// 完整形式，&'a T 要求 T: 'a，因此推断为 'a
type T4<'a> = &'a (dyn Trait + 'a);

// 省略形式
type T5<'a> = Ref<'a, dyn Trait>;
// 完整形式，Ref<'a, T> 要求 T: 'a，因此推断为 'a
type T6<'a> = Ref<'a, dyn Trait + 'a>;

trait GenericTrait<'a>: 'a {}

// 省略形式
type T7<'a> = Box<dyn GenericTrait<'a>>;
// 完整形式
type T8<'a> = Box<dyn GenericTrait<'a> + 'a>;

// 省略形式
impl<'a> dyn GenericTrait<'a> {}
// 完整形式
impl<'a> dyn GenericTrait<'a> + 'a {}
```

实现了 trait 的具体类型可以包含引用，因此它们也有生命周期约束，继而它们对应的 trait 对象也有生命周期约束。此外，还可以直接为引用实现 trait，而引用显然也有生命周期约束：

```rust
trait Trait {}

struct Struct {}
struct Ref<'a, T>(&'a T);

impl Trait for Struct {}
// 在引用类型上直接实现 Trait
impl Trait for &Struct {}
// 在包含引用的类型上实现 Trait
impl<'a, T> Trait for Ref<'a, T> {} 
```

总之，这点很值得强调，因为初学者将函数从使用 trait 对象重构为使用泛型（或反之）时，经常会感到困惑。以此程序为例：

```rust
use std::fmt::Display;

fn dynamic_thread_print(t: Box<dyn Display + Send>) {
    std::thread::spawn(move || {
        println!("{}", t);
    }).join();
}

fn static_thread_print<T: Display + Send>(t: T) { // ❌
    std::thread::spawn(move || {
        println!("{}", t);
    }).join();
}
```

程序抛出编译错误：

```none
error[E0310]: the parameter type `T` may not live long enough
  --> src/lib.rs:10:5
   |
9  | fn static_thread_print<T: Display + Send>(t: T) {
   |                        -- help: consider adding an explicit lifetime bound...: `T: 'static +`
10 |     std::thread::spawn(move || {
   |     ^^^^^^^^^^^^^^^^^^
   |
note: ...so that the type `[closure@src/lib.rs:10:24: 12:6 t:T]` will meet its required lifetime bounds
  --> src/lib.rs:10:5
   |
10 |     std::thread::spawn(move || {
   |     ^^^^^^^^^^^^^^^^^^
```

好极了，编译器告知了如何解决问题，那就按它说的来解决一下吧。

```rust
use std::fmt::Display;

fn dynamic_thread_print(t: Box<dyn Display + Send>) {
    std::thread::spawn(move || {
        println!("{}", t);
    }).join();
}

fn static_thread_print<T: Display + Send + 'static>(t: T) { // ✅
    std::thread::spawn(move || {
        println!("{}", t);
    }).join();
}
```

现在可以编译了，但这两个函数放在一起看时会很别扭：为什么第二个函数需要对 `T` 进行 `'static` 约束，而第一个函数不需要呢？令人迷惑。其实 Rust 使用生命周期省略规则自动在第一个函数中推断出了 `'static` 约束，因此这两个函数实际上都有 `'static` 约束。下面才是 Rust 编译器看到的：

```rust
use std::fmt::Display;

fn dynamic_thread_print(t: Box<dyn Display + Send + 'static>) {
    std::thread::spawn(move || {
        println!("{}", t);
    }).join();
}

fn static_thread_print<T: Display + Send + 'static>(t: T) {
    std::thread::spawn(move || {
        println!("{}", t);
    }).join();
}
```

**主要收获**
- 所有 trait 对象都有隐含的默认生命周期约束

### 7) 编译器的错误信息足以指导修复程序

**误区延伸**
- Rust 针对 trait 对象的生命周期省略规则总是正确的
- Rust 比我更了解程序的语义

这一误区刚好是将前两个合二为一的范例：

```rust
use std::fmt::Display;

fn box_displayable<T: Display>(t: T) -> Box<dyn Display> { // ❌
    Box::new(t)
}
```

抛出错误：

```none
error[E0310]: the parameter type `T` may not live long enough
 --> src/lib.rs:4:5
  |
3 | fn box_displayable<T: Display>(t: T) -> Box<dyn Display> {
  |                    -- help: consider adding an explicit lifetime bound...: `T: 'static +`
4 |     Box::new(t)
  |     ^^^^^^^^^^^
  |
note: ...so that the type `T` will meet its required lifetime bounds
 --> src/lib.rs:4:5
  |
4 |     Box::new(t)
  |     ^^^^^^^^^^^
```

好，我们来按照编译器说的方式修复该问题，别忘了它自动为装箱后的 trait 对象推断出了 `'static` 生命周期约束，而编译器推荐的解决方式正是基于这一未说明的事实：

```rust
use std::fmt::Display;

fn box_displayable<T: Display + 'static>(t: T) -> Box<dyn Display> { // ✅
    Box::new(t)
}
```

程序现在可以编译了...但这就是我们想要的吗？也许是，也许不是。编译器没有提到其他修复方式，但这样其实也可以：

```rust
use std::fmt::Display;

fn box_displayable<'a, T: Display + 'a>(t: T) -> Box<dyn Display + 'a> { // ✅
    Box::new(t)
}
```

该函数不仅兼容前一版本的所有参数，还能接受更多参数！然而这样就更好吗？也不一定，这取决于程序的要求和限制。该例略为抽象，再来看个更简单、更明显的例子：

```rust
fn return_first(a: &str, b: &str) -> &str { // ❌
    a
}
```

抛出：

```none
error[E0106]: missing lifetime specifier
 --> src/lib.rs:1:38
  |
1 | fn return_first(a: &str, b: &str) -> &str {
  |                    ----     ----     ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from `a` or `b`
help: consider introducing a named lifetime parameter
  |
1 | fn return_first<'a>(a: &'a str, b: &'a str) -> &'a str {
  |                ^^^^    ^^^^^^^     ^^^^^^^     ^^^
```

错误信息建议将输入、输出标注为相同的生命周期。如果按它说的做，程序确实可以编译，但该函数会过度约束返回类型。实际上，我们想要的是：

```rust
fn return_first<'a>(a: &'a str, b: &str) -> &'a str { // ✅
    a
}
```

**主要收获**
- Rust 针对 trait 对象的生命周期省略规则并非适合每种情况
- Rust 不会比你更了解程序的语义
- Rust 编译器错误信息所建议的修复方法可以使程序编译成功，但这并不等同于可以使程序编译成功 _并且_ 最符合要求。

### 8) 生命周期可以在运行期增长或缩短

**误区延伸**
- 容器类型可在运行期交换引用以改变其生命周期
- Rust 借用检查器可进行高级控制流分析

以下代码无法编译：

```rust
struct Has<'lifetime> {
    lifetime: &'lifetime str,
}

fn main() {
    let long = String::from("long");
    let mut has = Has { lifetime: &long };
    assert_eq!(has.lifetime, "long");

    {
        let short = String::from("short");
        // “切换”到 short 生命周期
        has.lifetime = &short;
        assert_eq!(has.lifetime, "short");

        // “切换回” long 生命周期（其实并没有）
        has.lifetime = &long;
        assert_eq!(has.lifetime, "long");
        // `short` 在此处被 drop
    }
    // ❌ - `short` 在 drop 后仍处于 “借用” 状态
    assert_eq!(has.lifetime, "long"); 
}
```

它会抛出：

```none
error[E0597]: `short` does not live long enough
  --> src/main.rs:11:24
   |
11 |         has.lifetime = &short;
   |                        ^^^^^^ borrowed value does not live long enough
...
15 |     }
   |     - `short` dropped here while still borrowed
16 |     assert_eq!(has.lifetime, "long");
   |     --------------------------------- borrow later used here
```

改成下面这样也无法编译，它会抛出与上面完全相同的错误：

```rust
struct Has<'lifetime> {
    lifetime: &'lifetime str,
}

fn main() {
    let long = String::from("long");
    let mut has = Has { lifetime: &long };
    assert_eq!(has.lifetime, "long");

    // 该代码块永不会执行
    if false {
        let short = String::from("short");
        // “切换”到 short 生命周期
        has.lifetime = &short;
        assert_eq!(has.lifetime, "short");

        // “切换回” long 生命周期（其实并没有）
        has.lifetime = &long;
        assert_eq!(has.lifetime, "long");
        // `short` 在此处被 drop
    }
    // ❌ - `short` 在 drop 后仍处于 “借用” 状态
    assert_eq!(has.lifetime, "long"); 
}
```

生命周期必须在编译期进行静态验证，而 Rust 借用检查器也只能进行非常基础的控制流分析，因此它假定 `if-else` 语句和 `match` 语句中的每个分支代码块都将被执行[译注：Rust 编译器采用了流敏感分析(flow-sensitive analyses)]，然后为变量选择最短的生命周期。变量的生命周期一旦被确定，就会*永远*受该生命周期约束。变量的生命周期只能缩短，而所有的缩短都会在编译期决定。

**主要收获**
- 生命周期在编译期进行静态验证
- 生命周期不能在运行期以任何方式增长、缩短或改变
- Rust 借用检查器总是假定所有代码路径都会被执行，然后为变量选择最短的生命周期

### 9) 将可变引用降级为共享引用是安全操作

**误区延伸**
- 重新借用引用会结束其原有生命周期，并开始新的生命周期

可以将可变引用传递给期望使用共享引用的函数，Rust 会隐式地重新借用可变引用，并将其视为不可变：

```rust
fn takes_shared_ref(n: &i32) {}

fn main() {
    let mut a = 10;
    takes_shared_ref(&mut a); // ✅
    takes_shared_ref(&*(&mut a)); // 上行代码去掉语法糖后
}
```

直觉上这也没问题，毕竟重新借用一个可变引用并将其视为不可变的，没什么毛病，对吧？令人惊讶的是，情况并非如此，下面的程序无法编译：

```rust
fn main() {
    let mut a = 10;
    let b: &i32 = &*(&mut a); // 重新借用为不可变引用
    let c: &i32 = &a;
    dbg!(b, c); // ❌
}
```

抛出错误：

```none
error[E0502]: cannot borrow `a` as immutable because it is also borrowed as mutable
 --> src/main.rs:4:19
  |
3 |     let b: &i32 = &*(&mut a);
  |                     -------- mutable borrow occurs here
4 |     let c: &i32 = &a;
  |                   ^^ immutable borrow occurs here
5 |     dbg!(b, c);
  |          - mutable borrow later used here
```

可变借用确实发生了，但它会被立即无条件地重新借用为不可变的，继而被 drop 掉。为什么 Rust 会把“不可变的重新借用”视作“仍具有可变引用”的独占生命周期呢？上例虽没有问题，但允许将可变引用降级为共享引用确实会带来潜在的内存安全问题：

```rust
use std::sync::Mutex;

struct Struct {
    mutex: Mutex<String>
}

impl Struct {
    // 将可变引用 self 降级为共享引用 str
    fn get_string(&mut self) -> &str {
        self.mutex.get_mut().unwrap()
    }
    fn mutate_string(&self) {
        // 如果 Rust 允许将可变引用降级为共享引用，那么下面一行
        // 将使 get_string 方法返回的任何共享引用都失效
        *self.mutex.lock().unwrap() = "surprise!".to_owned();
    }
}

fn main() {
    let mut s = Struct {
        mutex: Mutex::new("string".to_owned())
    };
    // 可变引用降级为共享引用
    let str_ref = s.get_string(); 
    // str_ref 已失效，成了个悬垂指针
    s.mutate_string(); 
    dbg!(str_ref); // ❌ - 一如所料！
}
```

这里的重点是，重新将可变引用借用为共享引用，并不能顺利地获得共享引用：即使可变引用本身已被 drop，它也会在重新借用期间延长可变引用的生命周期。使用重新借用的共享引用非常困难，尽管它是不可变的，但它不能与任何其他共享引用重叠[译注：即，不能与其他引用同时访问相同的资源]。重新借用的共享引用既有可变引用的所有缺点，也有共享引用的所有缺点，而且还不具备两者的优点。所以我认为，“重新将可变引用借用为共享引用”应被视为 Rust 的反模式。意识到这种反模式很重要，这样当你看到类似代码时就能很快辨别它：

```rust
// 将可变引用 T 降级为共享引用 T
fn some_function<T>(some_arg: &mut T) -> &T;

struct Struct;

impl Struct {
    // 将可变引用 self 降级为共享引用 self
    fn some_method(&mut self) -> &Self;

    // 将可变引用 self 降级为共享引用 T
    fn other_method(&mut self) -> &T;
}
```

即便在函数或方法签名中避免了重新借用，Rust 仍会自动进行隐式的重新借用，因此很容易在不知情的情况下遇到问题，例如：

```rust
use std::collections::HashMap;

type PlayerID = i32;

#[derive(Debug, Default)]
struct Player {
    score: i32,
}

fn start_game(player_a: PlayerID, player_b: PlayerID, server: &mut HashMap<PlayerID, Player>) {
    // 从 server 获取 player，若无，则创建并插入新 player
    let player_a: &Player = server.entry(player_a).or_default();
    let player_b: &Player = server.entry(player_b).or_default();

    // 对 player 进行某些操作
    dbg!(player_a, player_b); // ❌
}
```

上述代码编译失败。由于我们显式地标注了数据类型，Rust 会隐式地将 `or_default()` 返回的 `&mut Player` 重新借用为 `&Player`。为了达成目的，我们必须：

```rust
use std::collections::HashMap;

type PlayerID = i32;

#[derive(Debug, Default)]
struct Player {
    score: i32,
}

fn start_game(player_a: PlayerID, player_b: PlayerID, server: &mut HashMap<PlayerID, Player>) {
    // 丢弃所有返回的 Player 可变引用，反正也不能同时使用它们
    server.entry(player_a).or_default();
    server.entry(player_b).or_default();

    // 这次以不可变方式再次获取 player，而不会有任何隐式的重新借用。
    let player_a = server.get(&player_a);
    let player_b = server.get(&player_b);

    // 对 player 进行某些操作
    dbg!(player_a, player_b); // ✅
}
```

虽然有些拙劣，而且不够优雅，但这是我们给“内存安全祭坛”献上的祭品。

**主要收获**
- 尽量避免将可变引用重新借用为共享引用，否则会让你头大
- 重新借用可变引用不会结束其生命周期，即使该引用已被 drop 掉

### 10) 闭包遵循与函数相同的生命周期省略规则

这条更像是 Rust 中的一个陷阱，而不是误区。

闭包，尽管也是函数，但并不遵循与函数相同的生命周期省略规则。

```rust
fn function(x: &i32) -> &i32 {
    x
}

fn main() {
    let closure = |x: &i32| x; // ❌
}
```

抛出:

```none
error: lifetime may not live long enough
 --> src/main.rs:6:29
  |
6 |     let closure = |x: &i32| x;
  |                       -   - ^ returning this value requires that `'1` must outlive `'2`
  |                       |   |
  |                       |   return type of closure is &'2 i32
  |                       let's call the lifetime of this reference `'1`
```

（将省略规则）展开后得到：

```rust
// 输入生命周期同时应用于输出
fn function<'a>(x: &'a i32) -> &'a i32 {
    x
}

fn main() {
    // 输入和输出各自具有独立的生命周期
    let closure = for<'a, 'b> |x: &'a i32| -> &'b i32 { x };
    // 注意：上行不是有效的语法，只是用它来说明问题
}
```

造成这种差异的原因挺荒谬的。闭包在最一开始时便使用了与函数不同的类型推断语义，而现今我们永远都只能如此了，因为此时再统一它们将是个不兼容的改变。那么该如何显式标注闭包的类型呢？可选项有：

```rust
fn main() {
    // 转换为 trait 对象，变成 unsized，呃，可能导致编译错误
    let identity: dyn Fn(&i32) -> &i32 = |x: &i32| x;

    // 可以将其分配到堆上，倒也算个笨方法
    let identity: Box<dyn Fn(&i32) -> &i32> = Box::new(|x: &i32| x);

    // 可以跳过分配过程，直接创建一个静态引用
    let identity: &dyn Fn(&i32) -> &i32 = &|x: &i32| x;

    // 将上一行展开 :)
    let identity: &'static (dyn for<'a> Fn(&'a i32) -> &'a i32 + 'static) = &|x: &i32| -> &i32 { x };

    // 这样做似乎更理想，但它是无效语法
    let identity: impl Fn(&i32) -> &i32 = |x: &i32| x;

    // 这样做也很好，但同样是无效语法
    let identity = for<'a> |x: &'a i32| -> &'a i32 { x };

    // 鉴于 "impl trait" 在函数返回值处有效
    fn return_identity() -> impl Fn(&i32) -> &i32 {
        |x| x
    }
    let identity = return_identity();

    // 前一解决方案更通用的版本
    fn annotate<T, F>(f: F) -> F where F: Fn(&T) -> &T {
        f
    }
    let identity = annotate(|x: &i32| x);
}
```

从上面的示例中可以看出，当闭包类型用作 trait 约束时，它们确实遵循常规的函数生命周期省略规则。

关于这一条没有什么经验教训或启示了，事情就是这样。

**主要收获**
- 每种语言皆有陷阱 🤷


## 结论

- `T` 是 `&T` 和 `&mut T` 的超集
- `&T` 和 `&mut T` 是互不相交的集合
- `T: 'static` 应被理解为 _“`T` 受 `'static` 生命周期约束”_
- 若 `T: 'static` 则 `T` 可以是拥有 `'static` 生命周期的借用类型 _或_ 拥有所有权的类型
- 既然 `T: 'static` 包括拥有所有权的类型，便意味着 `T`
    - 可以在运行期动态分配
    - 不必在整个程序运行期间有效
    - 可以安全、自由地修改
    - 可以在运行期动态 drop
    - 可以有不同的生命周期
- 与 `&'a T` 相比，`T: 'a` 更通用、更灵活
- `T: 'a` 接受拥有所有权的类型（其内部可含有引用）、引用类型
- `&'a T` 只接受引用类型
- 若 `T: 'static` 则 `T: 'a` ，因为对于所有 `'a` 都有 `'static` >= `'a`
- 几乎所有 Rust 代码都是泛型代码，四处皆是省略的生命周期注解
- Rust 的函数生命周期省略规则并不总是适用于所有情况
- Rust 并不比你更了解程序的语义
- 为生命周期注解赋予有意义的名称
- 谨慎考虑在何处放置显式生命周期注解以及为什么要这样做
- 所有 trait 对象都有隐含的默认生命周期约束
- Rust 针对 trait 对象的生命周期省略规则并非适合每种情况
- Rust 不会比你更了解程序的语义
- Rust 编译器错误信息所建议的修复方法可以使程序编译成功，但这并不等同于可以使程序编译成功 _并且_ 最符合要求。
- 生命周期在编译期进行静态验证
- 生命周期不能在运行期以任何方式增长、缩短或改变
- Rust 借用检查器总是假定所有代码路径都会被执行，然后为变量选择最短的生命周期
- 尽量避免将可变引用重新借用为共享引用，否则会让你头大
- 重新借用可变引用不会结束其生命周期，即使该引用已被 drop 掉
- 每种语言皆有陷阱 🤷

---
原文：[Common Rust Lifetime Misconceptions](
https://github.com/pretzelhammer/rust-blog/blob/master/posts/common-rust-lifetime-misconceptions.md)<br/>译者：ssbunny（兔子不咬人）