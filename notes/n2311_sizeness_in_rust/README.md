# Rust 中的 Sized

## 概述

**Sized** 其实是 Rust 中最重要的概念之一，可谓功成不居。它往往以微妙的形式与其他语言特性交织在一起，只有在形如 _"x doesn't have size known at compile time"_ 的错误信息中才会显露，这些错误信息对于每个 Rustacean 来说都太过熟悉了。在本文中，我们将探讨 **Sized** 的各种形式，包括固定大小类型、未定大小类型以及零大小类型，同时还将考察它们的用例、优势、痛点及相应解决方案。

[译注：本文的“宽度”通常指指针宽度，也就是机器字长。在 32 位系统中，1 个宽度的大小是 32 位，也就是 4 个字节；在 64 位系统中则是 8 个字节。2 个宽度也叫“胖指针”或“宽指针”。]

## Sized

在 Rust 中，如果一个类型的字节大小可以在编译期确定，那么它就是 **固定大小类型（sized type）**。确定某类型的大小非常重要，只有这样才能在栈上为该类型的实例分配足够的空间。固定大小类型可以通过值或引用进行传递。如果一个类型的大小无法在编译期确定，那么它被称为 **未定大小类型（unsized type）** 或 **动态大小类型（DST, Dynamically-Sized Type）**。由于未定大小类型无法放置在栈上，因此它们只能通过引用进行传递。以下是一些固定大小和未定大小类型的示例：

```rust
use std::mem::size_of;

fn main() {
    // 原生类型
    assert_eq!(4, size_of::<i32>());
    assert_eq!(8, size_of::<f64>());

    // 元组
    assert_eq!(8, size_of::<(i32, i32)>());

    // 数组
    assert_eq!(0, size_of::<[i32; 0]>());
    assert_eq!(12, size_of::<[i32; 3]>());

    struct Point {
        x: i32,
        y: i32,
    }

    // 结构体
    assert_eq!(8, size_of::<Point>());

    // 枚举
    assert_eq!(8, size_of::<Option<i32>>());

    // 获取指针宽度(即机器字长)，
    // 在 32 位系统上是 4 个字节
    // 在 64 位系统上是 8 个字节
    const WIDTH: usize = size_of::<&()>();

    // 指向固定大小类型的指针占用 1 个宽度
    assert_eq!(WIDTH, size_of::<&i32>());
    assert_eq!(WIDTH, size_of::<&mut i32>());
    assert_eq!(WIDTH, size_of::<Box<i32>>());
    assert_eq!(WIDTH, size_of::<fn(i32) -> i32>());

    const DOUBLE_WIDTH: usize = 2 * WIDTH;

    // 未定大小的结构体
    struct Unsized {
        unsized_field: [i32],
    }

    // 指向未定大小类型的指针占用 2 个宽度
    assert_eq!(DOUBLE_WIDTH, size_of::<&str>()); // 切片
    assert_eq!(DOUBLE_WIDTH, size_of::<&[i32]>()); // 切片
    assert_eq!(DOUBLE_WIDTH, size_of::<&dyn ToString>()); // trait 对象
    assert_eq!(DOUBLE_WIDTH, size_of::<Box<dyn ToString>>()); // trait 对象
    assert_eq!(DOUBLE_WIDTH, size_of::<&Unsized>()); // 自定义的未定大小类型

    // 未定大小类型
    size_of::<str>(); // 编译错误
    size_of::<[i32]>(); // 编译错误
    size_of::<dyn ToString>(); // 编译错误
    size_of::<Unsized>(); // 编译错误
}
```

固定大小类型的大小显而易见：所有原生类型和指针都具有已知大小，而所有的结构体、元组、枚举和数组都是由原生类型、指针或其他嵌套的结构体、元组、枚举和数组组成的，因此可以递归地计算其字节总数，以及内存填充和对齐所需的额外字节。同样显而易见的是，未定大小类型的大小无法确定：切片可以包含任意数量的元素，因此它在运行期具有任意大小；而 trait 对象则可以由任意数量的结构体或枚举实现，因此在运行期也可以具有任意大小。

**专业提示**
- 在 Rust 中，指向动态大小数组视图的指针被称为**切片（slice）**。例如，`&str` 被称为 *"字符串切片"*，`&[i32]` 被称为 *"i32 切片"*
- 切片占用 2 个宽度，分别存储指向数组的指针和数组中元素的数量
- trait 对象指针占用 2 个宽度，分别存储指向数据的指针和指向虚表（vtable）的指针
- 未定大小的结构体指针占用 2 个宽度，分别存储指向结构体数据的指针和结构体的大小
- 未定大小的结构体只能有一个未定大小的字段，并且它必须是结构体中最后一个字段

为了强化“未定大小类型占用 2 个宽度”的观点，此处通过带注释的代码示例，将数组与切片进行了比较。

```rust
use std::mem::size_of;

const WIDTH: usize = size_of::<&()>();
const DOUBLE_WIDTH: usize = 2 * WIDTH;

fn main() {
    // 类型中存储的数据长度
    // [i32; 3] 表示存放三个 i32 的数组
    let nums: &[i32; 3] = &[1, 2, 3];

    // 1 个指针宽度
    assert_eq!(WIDTH, size_of::<&[i32; 3]>());

    let mut sum = 0;

    // 可以安全地迭代 nums
    // Rust 知道其确切有 3 个元素
    for num in nums {
        sum += num;
    }

    assert_eq!(6, sum);

    // 未定大小强制转换，从 [i32; 3] 转为 [i32]
    // 数据长度现在存储在指针中
    let nums: &[i32] = &[1, 2, 3];
    
    // 需要 2 个指针宽度来同时存储数据长度
    assert_eq!(DOUBLE_WIDTH, size_of::<&[i32]>());

    let mut sum = 0;

    // 可以安全地迭代 nums
    // Rust 知道其确切有 3 个元素
    for num in nums {
        sum += num;
    }

    assert_eq!(6, sum);
}
```

以下是另一个有注释的代码示例，比较了结构体和 trait 对象的区别：

```rust
use std::mem::size_of;

const WIDTH: usize = size_of::<&()>();
const DOUBLE_WIDTH: usize = 2 * WIDTH;

trait Trait {
    fn print(&self);
}

struct Struct;
struct Struct2;

impl Trait for Struct {
    fn print(&self) {
        println!("struct");
    }
}

impl Trait for Struct2 {
    fn print(&self) {
        println!("struct2");
    }
}

fn print_struct(s: &Struct) {
    // 总是打印 "struct"，编译期即可知
    s.print();
    // 单宽度指针
    assert_eq!(WIDTH, size_of::<&Struct>());
}

fn print_struct2(s2: &Struct2) {
    // 总是打印 "struct2"，编译期即可知
    s2.print();
    // 单宽度指针
    assert_eq!(WIDTH, size_of::<&Struct2>());
}

fn print_trait(t: &dyn Trait) {
    // 打印 "struct" 还是 "struct2" ? 编译期不可知
    t.print();
    // Rust 需要在运行期检查指针以确定是使用
    // Struct 还是 Struct2 的 "print" 实现，
    // 所以指针必须是双宽度的
    assert_eq!(DOUBLE_WIDTH, size_of::<&dyn Trait>());
}

fn main() {
    // 单宽度指针，指向数据
    let s = &Struct; 
    print_struct(s); // 打印 "struct"
    
    // 单宽度指针，指向数据
    let s2 = &Struct2;
    print_struct2(s2); // 打印 "struct2"
    
    // 未定大小强制转换，从 Struct 到 dyn Trait
    // 双宽度指针，指向数据和 Struct 的虚表
    let t: &dyn Trait = &Struct;
    print_trait(t); // 打印 "struct"
    
    // 未定大小强制转换，从 Struct2 到 dyn Trait
    // 双宽度指针，指向数据和 Struct2 的虚表
    let t: &dyn Trait = &Struct2;
    print_trait(t); // 打印 "struct2"
}
```
**主要收获**
- 只有固定大小类型的实例可以放在栈上，也就是说，可以按值传递
- 未定大小类型的实例无法放在栈上，必须通过引用进行传递
- 指向未定大小类型的指针是双宽度的，因为除了指向数据之外，它们还有额外的信息要管理，用以跟踪数据的长度*或者*指向虚表

## `Sized` Trait

在 Rust 中，`Sized` trait 属于**自动 trait**，同时也是一个**标记 trait**。

自动 trait 是指在特定条件下自动为类型实现的 trait 。标记 trait 则用于表明类型具有某种特定属性，标记 trait 不包含任何 trait 项——像是方法、关联函数、关联常量或关联类型。所有自动 trait 都是标记 trait ，但不是所有标记 trait 都是自动 trait 。自动 trait 必须是标记 trait ，因为只有这样编译器才能为它们提供自动默认实现，如果某 trait 具有任何 trait 项，就无法再提供自动默认实现了。

如果一个类型的所有成员都是 `Sized` 类型，那么该类型将自动获得 `Sized` 实现。“成员”的具体含义取决于容器类型，例如：结构体的字段，枚举的变体，数组的元素，元组的项等等。一旦某类型被标记为具有 `Sized` 实现，意味着它的字节大小在编译期便已知。

其他自动标记 trait 的例子还有 `Send` 和 `Sync`。如果一个类型实现了 `Send`，则意味着该类型的值可以从一个线程传递到另一个线程。如果一个类型实现了 `Sync`，则意味着可以在多线程间使用共享引用共享其值。如果一个类型的所有成员都是 `Send` 和 `Sync` 类型，那么它将自动获得 `Send` 和 `Sync` 实现。`Sized` 有些特殊之处，与其他自动标记 trait 不同的是，它不可被取消。

```rust
#![feature(negative_impls)]

// 该类型是 Sized, Send 及 Sync
struct Struct;

// 取消 Send trait
impl !Send for Struct {} // ✅

// 取消 Sync trait
impl !Sync for Struct {} // ✅

// 不能取消 Sized
impl !Sized for Struct {} // ❌
```

这倒也合乎情理，毕竟我们可能出于一些原因不希望某类型被在线程之间传递或共享，然而很难想象出这种情景：希望编译器“忘记”某类型的大小，并将其视为一个未定大小的类型。这样做没有任何好处，只会使该类型变得更加难以处理。

此外，非常谨慎地说，`Sized` 在技术上其实并不是一个自动 trait，因为它并没有使用 `auto` 关键字进行定义，然而编译器对它的特殊处理方式使其行为非常类似于自动 trait，因此在实践中将其视为自动 trait 是可行的。

**主要收获**
- `Sized` 是 “自动” 标记 trait


## 泛型中的 `Sized`

可能不易察觉：当编写泛型代码时，每个泛型类型参数默认都会自动绑定到 `Sized` trait 上。

```rust
// 该泛型函数...
fn func<T>(t: T) {}

// ...去掉语法糖后...
fn func<T: Sized>(t: T) {}

// ...可以通过明确设置为 ?Sized 来取消它...
fn func<T: ?Sized>(t: T) {} // ❌

// ...然而这将无法编译，毕竟它没有已知的大小。
// 因此我们必须将其放在指针后面...
fn func<T: ?Sized>(t: &T) {} // ✅
fn func<T: ?Sized>(t: Box<T>) {} // ✅
```

**专业提示**
- `?Sized` 可读作“可选大小的”或“可能具有大小的”，其被添加到类型参数的约束中，表示该类型既可以是固定大小，也可以是未定大小的
- `?Sized` 通常被称为“放宽约束”或“宽松约束”，因为它放宽了对类型参数的限制
- `?Sized` 是 Rust 中唯一的宽松约束

这个知识点很重要，为什么？这样说吧，每当使用泛型类型并将其置于指针后面时，我们几乎总是希望取消掉默认的 `Sized` 约束，以使函数在接受参数类型时更加灵活。另一方面，如果不取消掉默认的 `Sized` 约束，最终将会得到些令人困惑的编译错误信息。

接下来参观一下我在 Rust 中编写的第一个泛型函数。我在 `dbg!` 宏稳定发布前便开始学习 Rust，那时打印调试值的唯一方法是每次都手动输入 `println!("{:?}", some_value);`，相当繁琐。因此，我决定编写这样一个 `debug` 辅助函数：

```rust
use std::fmt::Debug;

fn debug<T: Debug>(t: T) { // T: Debug + Sized
    println!("{:?}", t);
}

fn main() {
    debug("my str"); // T = &str, &str: Debug + Sized ✅
}
```

目前为止一切顺利，但是该函数会获取任何传递给它的值的所有权，这有点让人闹心，所以我将函数改为只接受引用作为参数：

```rust
use std::fmt::Debug;

fn dbg<T: Debug>(t: &T) { // T: Debug + Sized
    println!("{:?}", t);
}

fn main() {
    dbg("my str"); // &T = &str, T = str, str: Debug + !Sized ❌
}
```

这下报错了：

```none
error[E0277]: the size for values of type `str` cannot be known at compilation time
 --> src/main.rs:8:9
  |
3 | fn dbg<T: Debug>(t: &T) {
  |        - required by this bound in `dbg`
...
8 |     dbg("my str");
  |         ^^^^^^^^ doesn't have a size known at compile-time
  |
  = help: the trait `std::marker::Sized` is not implemented for `str`
  = note: to learn more, visit <https://doc.rust-lang.org/book/ch19-04-advanced-types.html#dynamically-sized-types-and-the-sized-trait>
help: consider relaxing the implicit `Sized` restriction
  |
3 | fn dbg<T: Debug + ?Sized>(t: &T) {
  |   
```

当我头一次看到这些错误信息时也是一脸懵逼。尽管函数接收的参数比之前更加严格了，但却出现了编译错误！到底发生了什么？

上面的代码注释中我已略微透露了答案，但总的来说：在编译过程中，Rust 解析 `T` 为具体类型时会执行模式匹配。下面的表格可以帮助厘清该问题：

| 类型 | `T` | `&T` |
|------------|---|----|
| `&str` | `T` = `&str` | `T` = `str` |

| 类型 | `Sized` |
|-|-|
| `str` | ❌ |
| `&str` | ✅ |
| `&&str` | ✅ |


这便是为什么在将函数改为接收引用后，我不得不添加 `?Sized` 约束以使函数按预期工作。下面是可以正常工作的函数：

```rust
use std::fmt::Debug;

fn debug<T: Debug + ?Sized>(t: &T) { // T: Debug + ?Sized
    println!("{:?}", t);
}

fn main() {
    debug("my str"); // &T = &str, T = str, str: Debug + !Sized ✅
}
```

**主要收获**
- 所有的泛型类型参数默认情况下都会自动绑定为 `Sized`。
- 若有泛型函数，它接收一个指针后面的参数 `T`，诸如 `&T`、`Box<T>`、`Rc<T>` 等等，此时几乎总是希望使用 `T: ?Sized` 取消掉默认的 `Sized` 约束


## 未定大小类型

### 切片

最常见的切片类型是字符串切片 `&str` 和数组切片 `&[T]`。切片之好处在于许多其他类型可以自动转换为切片，利用切片和 Rust 的自动类型转换机制，我们可以编写出灵活的 API。

强制类型转换可以发生在很多场景，但最显著的是在函数参数中以及方法调用时。值得关注的类型转换有两种，即 **解引用强转（Deref Coercion）** 和 **未定大小类型强转（Unsized Coercion）**。解引用强转是指使用解引用操作将 `T` 强制转换为 `U`，即 `T: Deref<Target = U>`，例如 `String.deref() -> str`。未定大小类型强转是指将 `T` 强制转换为 `U`，其中 `T` 是一个固定大小的类型，而 `U` 是一个未定大小的类型，即 `T: Unsize<U>`，例如 `[i32; 3] -> [i32]`。

```rust
trait Trait {
    fn method(&self) {}
}

impl Trait for str {
    // 现在可以使用以下类型调用 "method" 方法
    // 1) str 或
    // 2) String， 因为 String: Deref<Target = str>
}
impl<T> Trait for [T] {
    // 现在可以使用以下类型调用 "method" 方法
    // 1) 任意 &[T]
    // 2) 任意 U 且 U: Deref<Target = [T]>， 比如 Vec<T>
    // 3) [T; N] ，N 为任意值, 因为 [T; N]: Unsize<[T]>
}

fn str_fun(s: &str) {}
fn slice_fun<T>(s: &[T]) {}

fn main() {
    let str_slice: &str = "str slice";
    let string: String = "string".to_owned();

    // 函数参数
    str_fun(str_slice);
    str_fun(&string); // 解引用强转

    // 方法调用
    str_slice.method();
    string.method(); // 解引用强转

    let slice: &[i32] = &[1];
    let three_array: [i32; 3] = [1, 2, 3];
    let five_array: [i32; 5] = [1, 2, 3, 4, 5];
    let vec: Vec<i32> = vec![1];

    // 函数参数
    slice_fun(slice);
    slice_fun(&vec); // 解引用强转
    slice_fun(&three_array); // 未定大小类型强转
    slice_fun(&five_array); // 未定大小类型强转

    // 方法调用
    slice.method();
    vec.method(); // 解引用强转
    three_array.method(); // 未定大小类型强转
    five_array.method(); // 未定大小类型强转
}
```

**主要收获**
- 利用切片和 Rust 的自动类型转换可以编写灵活的 API

### Trait 对象

默认情况下，trait 是 `?Sized` 的。代码：

```rust
trait Trait: ?Sized {}
```

将会抛出：

```none
error: `?Trait` is not permitted in supertraits
 --> src/main.rs:1:14
  |
1 | trait Trait: ?Sized {}
  |              ^^^^^^
  |
  = note: traits are `?Sized` by default
```

我们很快就会讨论为什么 trait 默认是 `?Sized` 的，但首先需要思考一下 trait 是 `?Sized` 的意义何在？将上面的示例展开：

```rust
trait Trait where Self: ?Sized {}
```

默认情况下，trait 允许 `self` 可能为一个未定大小类型。之前讲过，不能通过值传递未定大小类型，因而限制了 trait 中可定义的方法的类型。理论上讲，不可能编写一个以值传递 `self` 或返回 `self` 的方法，但令人惊讶的是，以下代码竟然可以编译通过：

```rust
trait Trait {
    fn method(self); // ✅
}
```

然而一旦开始尝试实现该方法，无论是通过提供默认实现，还是通过为未定大小类型实现该 trait，都将导致编译错误：

```rust
trait Trait {
    fn method(self) {} // ❌
}

impl Trait for str {
    fn method(self) {} // ❌
}
```

抛出：

```none
error[E0277]: the size for values of type `Self` cannot be known at compilation time
 --> src/lib.rs:2:15
  |
2 |     fn method(self) {}
  |               ^^^^ doesn't have a size known at compile-time
  |
  = help: the trait `std::marker::Sized` is not implemented for `Self`
  = note: to learn more, visit <https://doc.rust-lang.org/book/ch19-04-advanced-types.html#dynamically-sized-types-and-the-sized-trait>
  = note: all local variables must have a statically known size
  = help: unsized locals are gated as an unstable feature
help: consider further restricting `Self`
  |
2 |     fn method(self) where Self: std::marker::Sized {}
  |                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

error[E0277]: the size for values of type `str` cannot be known at compilation time
 --> src/lib.rs:6:15
  |
6 |     fn method(self) {}
  |               ^^^^ doesn't have a size known at compile-time
  |
  = help: the trait `std::marker::Sized` is not implemented for `str`
  = note: to learn more, visit <https://doc.rust-lang.org/book/ch19-04-advanced-types.html#dynamically-sized-types-and-the-sized-trait>
  = note: all local variables must have a statically known size
  = help: unsized locals are gated as an unstable feature
```

若是想通过值传递 `self`，可以通过显式地将 trait 约束为 `Sized` 来修复第一个错误：

```rust
trait Trait: Sized {
    fn method(self) {} // ✅
}

impl Trait for str { // ❌
    fn method(self) {}
}
```

现在抛出：

```none
error[E0277]: the size for values of type `str` cannot be known at compilation time
 --> src/lib.rs:7:6
  |
1 | trait Trait: Sized {
  |              ----- required by this bound in `Trait`
...
7 | impl Trait for str {
  |      ^^^^^ doesn't have a size known at compile-time
  |
  = help: the trait `std::marker::Sized` is not implemented for `str`
  = note: to learn more, visit <https://doc.rust-lang.org/book/ch19-04-advanced-types.html#dynamically-sized-types-and-the-sized-trait>
```

这倒可以理解，毕竟当我们将 trait 约束为 `Sized` 时，就意味着无法再为 `str` 等未定大小类型实现它。另一方面，如果真想为 `str` 实现该 trait 呢？解决方案是保持 trait 为 `?Sized`，并通过引用来传递 `self`：

```rust
trait Trait {
    fn method(&self) {} // ✅
}

impl Trait for str {
    fn method(&self) {} // ✅
}
```

与其将整个 trait 标记为 `?Sized` 或 `Sized`，更精微准确的做法是将单个方法标记为 `Sized`，如下所示：

```rust
trait Trait {
    fn method(self) where Self: Sized {}
}

impl Trait for str {} // ✅!?

fn main() {
    "str".method(); // ❌
}
```

不可思议，Rust 编译了 `impl Trait for str {}`，没有发出任何警告！好在在未定大小类型上调用 `method` 时，它最终能捕获到该错误，一切正常。这一表现略显古怪，但它却为实现 trait 时提供了些灵活性——可以为未定大小类型实现具有 `Sized` 的方法，只要你别去调用这些 `Sized` 方法即可。

```rust
trait Trait {
    fn method(self) where Self: Sized {}
    fn method2(&self) {}
}

impl Trait for str {} // ✅

fn main() {
    // 别去调用 "method" 就没事儿
    "str".method2(); // ✅
}
```

现在回到最初的问题，为什么 trait 默认是 `?Sized` 的？答案在于 trait 对象。trait 对象本质上是未定大小的，毕竟任何大小的类型都可以实现某个 trait 。因此，若 `Trait: ?Sized`，则只能为 `dyn Trait` 实现 `Trait`。用代码表示如下：

```rust
trait Trait: ?Sized {}

// 上面是 **必须** 的

impl Trait for dyn Trait {
    // 此处已被编译器施法
}

// 由于 `dyn Trait` 是未定大小的
// 现在我们可以在程序中使用 `dyn Trait` 了

fn function(t: &dyn Trait) {} // ✅
```

如果尝试编译上面的程序，会得到以下错误：

```none
error[E0371]: the object type `(dyn Trait + 'static)` automatically implements the trait `Trait`
 --> src/lib.rs:5:1
  |
5 | impl Trait for dyn Trait {
  | ^^^^^^^^^^^^^^^^^^^^^^^^ `(dyn Trait + 'static)` automatically implements trait `Trait`
```

编译器告诫我们冷静下来，因为它会自动为 `dyn Trait` 提供 `Trait` 的实现。再次强调，由于 `dyn Trait` 是未定大小的，编译器只能在 `Trait: ?Sized` 的情况下提供这个实现。如果我们将 `Trait` 约束为 `Sized`，它就变成了 *“对象不安全”（object unsafe）*，这意味着无法将实现了 `Trait` 的类型转换为 `dyn Trait` 的 trait 对象。下面的程序如预期一样编译失败：

```rust
trait Trait: Sized {}

fn function(t: &dyn Trait) {} // ❌
```

抛出：

```none
error[E0038]: the trait `Trait` cannot be made into an object
 --> src/lib.rs:3:18
  |
1 | trait Trait: Sized {}
  |       -----  ----- ...because it requires `Self: Sized`
  |       |
  |       this trait cannot be made into an object...
2 | 
3 | fn function(t: &dyn Trait) {}
  |                ^^^^^^^^^^ the trait `Trait` cannot be made into an object
```

接下来尝试创建一个具有 `Sized` 方法的 `?Sized` trait，并看看是否可以将其转换为 trait 对象：

```rust
trait Trait {
    fn method(self) where Self: Sized {}
    fn method2(&self) {}
}

fn function(arg: &dyn Trait) { // ✅
    arg.method(); // ❌
    arg.method2(); // ✅
}
```

正如之前看到的，只要我们不在 trait 对象上调用 `Sized` 方法，一切都没问题。

**主要收获**
- 默认情况下，所有 trait 都是 `?Sized` 的
- 若 `impl Trait for dyn Trait` ，必须有 `Trait: ?Sized`
- 可以在各个方法上单独采用 `Self: Sized`
- 通过 `Sized` 约束的 trait 无法转换为 trait 对象

### Trait 对象的限制

即使某 trait 是对象安全（object-safe）的，仍会存在一些和大小相关的边界情况，它们限制了可以转换为 trait 对象的类型以及 trait 对象可以表示的 trait 数量、类型。

#### 无法将未定大小类型转换为 trait 对象

```rust
fn generic<T: ToString>(t: T) {}
fn trait_object(t: &dyn ToString) {}

fn main() {
    generic(String::from("String")); // ✅
    generic("str"); // ✅
    trait_object(&String::from("String")); // ✅ - 未定大小类型强转
    trait_object("str"); // ❌ - 无法进行未定大小类型强转
}
```

抛出:

```none
error[E0277]: the size for values of type `str` cannot be known at compilation time
 --> src/main.rs:8:18
  |
8 |     trait_object("str");
  |                  ^^^^^ doesn't have a size known at compile-time
  |
  = help: the trait `std::marker::Sized` is not implemented for `str`
  = note: to learn more, visit <https://doc.rust-lang.org/book/ch19-04-advanced-types.html#dynamically-sized-types-and-the-sized-trait>
  = note: required for the cast to the object type `dyn std::string::ToString`
```

将 `&String` 传递给接收 `&dyn ToString` 的函数能够正常工作，这是因为强制类型转换。`String` 实现了 `ToString`，而我们可以通过未定大小强转将固定大小类型（如 `String`）转换为未定大小类型（如 `dyn ToString`）。`str` 也实现了 `ToString`，将 `str` 转换为 `dyn ToString` 也需要未定大小强转，但 `str` 已经是未定大小的了！那又怎能将一个已是未定大小的类型转换为另一个未定大小的类型呢？

`&str` 指针是双宽的，分别存储了指向数据的指针和数据的长度。`&dyn ToString` 指针也是双宽的，存储了指向数据和指向虚表的指针。而将 `&str` 强制转换为 `&dyn ToString` 需要三个宽席的指针，用于存储指向数据的指针、数据的长度和指向虚表的指针。Rust 不支持三个宽度的指针，因此无法将未定大小类型转换为 trait 对象。

上面两段以表格形式总结如下：

| 类型 | 指向数据的指针 | 数据的长度 | 指向虚表的指针 | 总宽度 |
|-|-|-|-|-|
| `&String` | ✅ | ❌ | ❌ | 1 ✅ |
| `&str` | ✅ | ✅ | ❌ | 2 ✅ |
| `&String as &dyn ToString` | ✅ | ❌ | ✅ | 2 ✅ |
| `&str as &dyn ToString` | ✅ | ✅ | ✅ | 3 ❌ |



#### 无法创建多 trait 对象

```rust
trait Trait {}
trait Trait2 {}

fn function(t: &(dyn Trait + Trait2)) {}
```

抛出:

```none
error[E0225]: only auto traits can be used as additional traits in a trait object
 --> src/lib.rs:4:30
  |
4 | fn function(t: &(dyn Trait + Trait2)) {}
  |                      -----   ^^^^^^
  |                      |       |
  |                      |       additional non-auto trait
  |                      |       trait alias used in trait object type (additional use)
  |                      first non-auto trait
  |                      trait alias used in trait object type (first use)
```

记住，trait 对象的指针是双宽的：它存储着一个指向数据的指针和另一个指向虚表的指针，但此处有两个 trait，也就有两个虚表，这就需要将 `&(dyn Trait + Trait2)` 指针扩展为 3 个宽度（所以上述代码会报错）。而自动 trait（如 `Sync` 和 `Send`）是被允许的，毕竟它们没有方法，也就没有虚表。

解决此问题的方法是使用另一个 trait 将虚表合并起来，如下所示：

```rust
trait Trait {
    fn method(&self) {}
}

trait Trait2 {
    fn method2(&self) {}
}

trait Trait3: Trait + Trait2 {}

// 为同时实现了 Trait 和 Trait2 的类型 Trait3 自动提供默认实现
impl<T: Trait + Trait2> Trait3 for T {}

// 将 `dyn Trait + Trait2` 改为 `dyn Trait3` 
fn function(t: &dyn Trait3) {
    t.method(); // ✅
    t.method2(); // ✅
}
```

该变通方法的一个缺点是：Rust 不支持向上转换回 supertrait 类型。也就是说，对于 `dyn Trait3`，并不能将其用在需要 `dyn Trait` 或 `dyn Trait2` 的地方。以下程序无法编译：

```rust
trait Trait {
    fn method(&self) {}
}

trait Trait2 {
    fn method2(&self) {}
}

trait Trait3: Trait + Trait2 {}

impl<T: Trait + Trait2> Trait3 for T {}

struct Struct;
impl Trait for Struct {}
impl Trait2 for Struct {}

fn takes_trait(t: &dyn Trait) {}
fn takes_trait2(t: &dyn Trait2) {}

fn main() {
    let t: &dyn Trait3 = &Struct;
    takes_trait(t); // ❌
    takes_trait2(t); // ❌
}
```

抛出:

```none
error[E0308]: mismatched types
  --> src/main.rs:22:17
   |
22 |     takes_trait(t);
   |                 ^ expected trait `Trait`, found trait `Trait3`
   |
   = note: expected reference `&dyn Trait`
              found reference `&dyn Trait3`

error[E0308]: mismatched types
  --> src/main.rs:23:18
   |
23 |     takes_trait2(t);
   |                  ^ expected trait `Trait2`, found trait `Trait3`
   |
   = note: expected reference `&dyn Trait2`
              found reference `&dyn Trait3`
```

原因是在于尽管 `dyn Trait3` 包含了 `dyn Trait` 和 `dyn Trait2` 的所有方法，但它在某种意义上算作一个不同的类型，它与 `dyn Trait` 和 `dyn Trait2` 有着不同的虚表。再次变通的办法是添加显式的类型转换方法：

```rust
trait Trait {}
trait Trait2 {}

trait Trait3: Trait + Trait2 {
    fn as_trait(&self) -> &dyn Trait;
    fn as_trait2(&self) -> &dyn Trait2;
}

impl<T: Trait + Trait2> Trait3 for T {
    fn as_trait(&self) -> &dyn Trait {
        self
    }
    fn as_trait2(&self) -> &dyn Trait2 {
        self
    }
}

struct Struct;
impl Trait for Struct {}
impl Trait2 for Struct {}

fn takes_trait(t: &dyn Trait) {}
fn takes_trait2(t: &dyn Trait2) {}

fn main() {
    let t: &dyn Trait3 = &Struct;
    takes_trait(t.as_trait()); // ✅
    takes_trait2(t.as_trait2()); // ✅
}
```

这一解决办法简单又直接，而且看起来像是 Rust 编译器可以自动搞定的事情。Rust 在执行解引用和未定大小强转时表现得毫不犹豫，但又为什么没有向上游 trait 的强制转换呢？这个问题很好，答案也很熟悉：Rust 核心团队正在致力于其他优先级更高、影响更大的功能。行吧。

**主要收获**
- Rust 不支持超过 2 个宽度的指针，因此：
    - 无法将未定大小类型转换为 trait 对象
    - 无法创建多 trait 对象，但可以通过将多个 trait 合并为一个来解决该问题


### 用户自定义的未定大小类型

```rust
struct Unsized {
    unsized_field: [i32],
}
```

可以通过给结构体添加一个未定大小的字段来定义一个未定大小的结构体。未定大小的结构体只能有一个未定大小的字段，而且该字段必须是结构体的最后一个字段。这样做是为了让编译器能够在编译时确定结构体中各个字段的起始偏移量，以便高效、快速地访问它们。此外，使用双宽度指针最多只能追踪一个未定大小的字段，毕竟更多的未定大小字段将需要更多的宽度。

那么我们该如何实例化这个结构体呢？和其它未定大小类型一样，首先需要创建一个固定大小的版本，然后将其转换为未定大小的版本。然而，根据定义，`Unsized` 总是未定大小的，无法创建一个固定大小的版本！唯一的解决方法是将该结构体定义为泛型，这样它就可以同时存在固定大小和未定大小的版本：

```rust
struct MaybeSized<T: ?Sized> {
    maybe_sized: T,
}

fn main() {
    // 未定大小强转，从 MaybeSized<[i32; 3]> 至 MaybeSized<[i32]>
    let ms: &MaybeSized<[i32]> = &MaybeSized { maybe_sized: [1, 2, 3] };
}
```

它有何使用场景呢？实际上，并没有什么特别引人注目的使用场景:) 用户自定义的未定大小类型目前还是个不成熟的特性，其限制超过了其好处。此处提及只是为了本文完整性的考虑。

**小知识：** `std::ffi::OsStr`和`std::path::Path` 是标准库中的两个未定大小类型的结构体，之前你可能使用过它们却没有意识到！

**主要收获**
- 用户自定义的未定大小类型目前还是个不成熟的特性，其限制超过了其好处。


## 零大小类型

零大小类型（ZST）一开始听起来很奇特，但其实它们在各种场景都被使用。

### 单元类型（unit type）

最常见的零大小类型是单元类型：`()`。所有空代码块 `{}` 的求值结果均是 `()`。若代码块非空但其最后一个表达式使用分号 `;` 舍弃时，其求值结果也是 `()`。例如：


```rust
fn main() {
    let a: () = {};
    let b: i32 = {
        5
    };
    let c: () = {
        5;
    };
}
```

默认情况下，没有显式指定返回类型的函数均返回 `()`。

```rust
// 带语法糖
fn function() {}

// 去糖后
fn function() -> () {}
```

由于 `()` 占用零字节，所有 `()` 的实例都相同，这使得实现其 `Default`、`PartialEq` 及 `Ord` 非常简单：

```rust
use std::cmp::Ordering;

impl Default for () {
    fn default() {}
}

impl PartialEq for () {
    fn eq(&self, _other: &()) -> bool {
        true
    }
    fn ne(&self, _other: &()) -> bool {
        false
    }
}

impl Ord for () {
    fn cmp(&self, _other: &()) -> Ordering {
        Ordering::Equal
    }
}
```

编译器能够理解 `()` 为零大小，并优化与 `()` 实例相关的交互操作。例如，`Vec<()>` 不会进行任何堆分配，从 `Vec` 中 push 或 pop `()` 只会递增或递减其 `len` 字段：

```rust
fn main() {
    // “存储”无限多个 () 所需的全部容量是：零容量
    let mut vec: Vec<()> = Vec::with_capacity(0);
    // 不会导致堆分配或 vec 容量的变化
    vec.push(()); // len++
    vec.push(()); // len++
    vec.push(()); // len++
    vec.pop(); // len--
    assert_eq!(2, vec.len());
}
```

上面的例子并没什么实际用处，但是，是否可以在某种情况下以一种有意义的方式利用上述理念呢？必然可以，比如可以将 `Value` 设置为 `()`，从 `HashMap<Key, Value>` 中获得高效的 `HashSet<Key>` 实现，而这正是 Rust 标准库中 `HashSet` 的工作方式：

```rust
// std::collections::HashSet
pub struct HashSet<T> {
    map: HashMap<T, ()>,
}
```

**主要收获**
- 所有 ZST 实例互相都是等价的
- Rust 编译器清楚如何优化与 ZST 的交互


### 单元结构体（unit struct）

单元结构体是指没有任何字段（成员变量）的结构体，例如：

```rust
struct Struct;
```

有一些特性使得单元结构体比 `()` 更具价值：
- 可以在自定义的单元结构体上实现任意想要的 trait，Rust trait 所遵从的孤儿原则会阻止我们为 `()` 实现 trait，这是由于其在标准库中已经定义
- 可以根据程序上下文，为单元结构体赋予有意义的名称
- 单元结构体和所有结构体一样，默认情况下都是不可复制的，这在程序上下文中可能很重要。

### Never 类型

Never 类型可算作第二常见的零大小类型（ZST）：`!`。它之所以被称为 never 类型，是因为其代表的计算永远不会解析成任何值。

`!` 与 `()` 不同，它有一些有趣的特性：
- `!` 可以强制转换为任意其他类型
- 不可能创建 `!` 的实例

第一个特性非常有用，使得我们能够这样便捷地使用宏：

```rust
// 便于快速形成原型
fn example<T>(t: &[T]) -> Vec<T> {
    unimplemented!() // ! 强转为 Vec<T>
}

fn example2() -> i32 {
    // 可以看出此次调用 parse 永远不会失败
    match "123".parse::<i32>() {
        Ok(num) => num,
        Err(_) => unreachable!(), // ! 强转为 i32
    }
}

fn example3(some_condition: bool) -> &'static str {
    if !some_condition {
        panic!() // ! 强转为 &str
    } else {
        "str"
    }
}
```

`break`、 `continue` 及 `return` 表达式也是 `!` 类型:

```rust
fn example() -> i32 {
    // 此处 x 可以设为任意类型，
    // 因为该代码块不返回任何值。
    let x: String = {
        return 123 // ! 强转为 String
    };
}

fn example2(nums: &[i32]) -> Vec<i32> {
    let mut filtered = Vec::new();
    for num in nums {
        filtered.push(
            if *num < 0 {
                break // ! 强转为 i32
            } else if *num % 2 == 0 {
                *num
            } else {
                continue // ! 强转为 i32
            }
        );
    }
    filtered
}
```

第二个有趣的特性是：`!` 允许在类型层面上将某些状态标记为“不可能的”。以下面这个函数签名为例：

```rust
fn function() -> Result<Success, Error>;
```

我们知道，如果函数成功返回，`Result` 将包含某个类型为 `Success` 的实例，如果出现错误，`Result` 将包含某个类型为 `Error` 的实例。接下来将其与该函数签名进行比较：

```rust
fn function() -> Result<Success, !>;
```

我们知道，如果函数成功返回，`Result` 将包含某个类型为 `Success` 的实例，如果出现错误...等等，它永远不会出错，因为无法创建 `!` 的实例。根据上述函数签名可知该函数永远不会出错。那么下面这个函数签名呢：

```rust
fn function() -> Result<!, Error>;
```

与之前相反，如果该函数返回，我们知道它一定是出错了，毕竟它不可能成功。

前一个例子的实际应用是为 `String` 实现 `FromStr`，将 `&str` 转换为 `String` 不可能失败：

```rust
#![feature(never_type)]

use std::str::FromStr;

impl FromStr for String {
    type Err = !;
    fn from_str(s: &str) -> Result<String, Self::Err> {
        Ok(String::from(s))
    }
}
```

后一个例子的实际应用是：运行无限循环的函数，比如一个响应客户端请求的服务器，除非发生错误否则永远不会返回：

```rust
#![feature(never_type)]

fn run_server() -> Result<!, ConnectionError> {
    loop {
        let (request, response) = get_request()?;
        let result = request.process();
        response.send(result);
    }
}
```


在 Rust 内部使用 never 类型是可行的，但在用户代码层面使用它仍被视为实验性质的，因此需要使用 `never_type` 特性标识。

**主要收获**
- `!` 可以强制转换为其他任何类型
- 不能创建`!`的实例，但可以使用它在类型层面上标记某些不可能的状态


### 用户自定义的伪 Never 类型

尽管不能定义一个可以强制转换为任意其他类型的类型，但却可以定义一个无法创建实例的类型。例如，没有任何变体的枚举类型：

```rust
enum Void {}
```

这样一来就可以从上一节的两个例子中移除 feature 标识，并使用稳定版的 Rust 来实现它们：

```rust
enum Void {}

// 示例 1
impl FromStr for String {
    type Err = Void;
    fn from_str(s: &str) -> Result<String, Self::Err> {
        Ok(String::from(s))
    }
}

// 示例 2
fn run_server() -> Result<Void, ConnectionError> {
    loop {
        let (request, response) = get_request()?;
        let result = request.process();
        response.send(result);
    }
}
```

其实 Rust 标准库正是这么搞的，`String` 在实现 `FromStr` 时的 `Err` 类型用的是 `std::convert::Infallible`，其定义为：

```rust
pub enum Infallible {}
```

### PhantomData

第三个最常用的零大小类型（ZST）可能便是 `PhantomData`。`PhantomData` 是个零大小的**标记结构体**，包含它的结构体可以用它来“标记”其具有特定属性。它就像是 **自动标记 trait** （例如`Sized`、`Send`和`Sync`）的表亲，但由于它是一个结构体，使用方式会略有不同。详细解释 `PhantomData` 并探讨其所有用法已超出本文的范围，这里只简要介绍一个简单的例子。回想一下之前提到过的代码片段：

```rust
#![feature(negative_impls)]

// 该类型是 Send 及 Sync
struct Struct;

// 取消 Send trait
impl !Send for Struct {}

// 取消 Sync trait
impl !Sync for Struct {}
```

很遗憾此处不得不使用 feature 标识，但能否只使用稳定版的 Rust 来实现相同的效果呢？我们已知，只有当一个类型的所有成员都是 `Send` 且 `Sync` 时，该类型才是 `Send` 且 `Sync` 的。因此可以向 `Struct` 添加一个 `!Send` 且 `!Sync` 的成员，例如 `Rc<()>`：

```rust
use std::rc::Rc;

// 该类型不是 Send 或 Sync
struct Struct {
    // 为每个实例增加 8 个字节
    _not_send_or_sync: Rc<()>,
}
```

以上方式并不理想，因为它会增加各 `Struct` 实例的大小，而且每次想要创建 `Struct` 时，还需要无中生有个 `Rc<()>` 出来。由于 `PhantomData` 是零大小类型（ZST），它解决了这俩问题：


```rust
use std::rc::Rc;
use std::marker::PhantomData;

type NotSendOrSyncPhantom = PhantomData<Rc<()>>;

// 该类型不是 Send 或 Sync
struct Struct {
    // 没有增加其实例的大小
    _not_send_or_sync: NotSendOrSyncPhantom,
}
```

**主要收获**
- `PhantomData` 是个零大小的标记结构体，包含它的结构体可以用它来“标记”其具有特定属性

## 结论

- 只有固定大小类型的实例可以放在栈上，也就是说，可以按值传递
- 未定大小类型的实例无法放在栈上，必须通过引用进行传递
- 指向未定大小类型的指针是双宽度的，因为除了指向数据之外，它们还有额外的信息要管理，用以跟踪数据的长度*或者*指向虚表
- `Sized` 是 “自动” 标记 trait
- 所有的泛型类型参数默认情况下都会自动绑定为 `Sized`
- 若有泛型函数，它接收一个指针后面的参数 `T`，诸如 `&T`、`Box<T>`、`Rc<T>` 等等，此时几乎总是希望使用 `T: ?Sized` 取消掉默认的 `Sized` 约束
- 利用切片和 Rust 的自动类型转换可以编写灵活的 API
- 默认情况下，所有 trait 都是 `?Sized` 的
- 若 `impl Trait for dyn Trait` ，必须有 `Trait: ?Sized`
- 可以在各个方法上单独采用 `Self: Sized`
- 通过 `Sized` 约束的 trait 无法转换为 trait 对象
- Rust 不支持超过 2 个宽度的指针，因此：
    - 无法将未定大小类型转换为 trait 对象
    - 无法创建多 trait 对象，但可以通过将多个 trait 合并为一个来解决该问题
- 用户自定义的未定大小类型目前还是个不成熟的特性，其限制超过了其好处。
- 所有 ZST 实例互相都是等价的
- Rust 编译器清楚如何优化与 ZST 的交互
- `!` 可以强制转换为其他任何类型
- 不能创建`!`的实例，但可以使用它在类型层面上标记某些不可能的状态
- `PhantomData` 是个零大小的标记结构体，包含它的结构体可以用它来“标记”其具有特定属性

---
原文： [Sizedness in Rust](https://github.com/pretzelhammer/rust-blog/blob/master/posts/sizedness-in-rust.md) <br/>译者：ssbunny（兔子不咬人）
