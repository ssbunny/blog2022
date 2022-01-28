# Grid 网格布局

Grid 用于二维布局，是 CSS 第一个真正意义上的布局系统。

<CodeGroup>
<CodeGroupItem title="CSS" active>

```css
.container {
  /*  
    grid: 把容器当作 block 再按 grid 布局其项目。
    inline-grid: 把容器当作 inline 再按 grid 布局其项目。
  */
  display: grid | inline-grid;
}
```

</CodeGroupItem>
<CodeGroupItem title="HTML" active>

```html
<div class="container">
  <div class="item item-1"> </div>
  <div class="item item-2"> </div>
  <div class="item item-3"> </div>
</div>
```

</CodeGroupItem>
</CodeGroup>

<Badge type="danger" text="注意"/> 设为 grid 布局以后，容器项目的 float、display: inline-block、display: table-cell、vertical-align 和 column-* 等设置都将失效。

## 术语

### grid line

![line](./line.jpg)

网格线 line 的编号从 1 开始，和书写模式有关（rtl 时最右边的是 1）。

### grid track

![track](./track.jpg)

track 指两条 line 之间的空间。row track 就是 row line 间，column track 就是 column line 间的空间。

### grid cell

![cell](./cell.jpg)

单元格 cell 是最小单元，是行和列的交叉区域。

### grid area

![area](./area.jpg)

area 是一组 cell 在一起。

### grid gap

![gap](./gap.jpg)

gap 是 track 间的空隙。

## 容器属性

### grid-template-columns，grid-template-rows

<div class="wapper">
<span class="label" style="width:190px">grid-template-columns:</span>
<input v-model="columns" style="width:200px"/><br/>
<span style="display:inline-block;width:190px">grid-template-rows: </span>
<input v-model="rows" style="width:200px"/>
</div>

<div class="container"
  :style="`grid-template-columns:${columns};grid-template-rows:${rows}`">
  <div class="item item-1">text</div>
  <div class="item item-2">text</div>
  <div class="item item-3">a loooooooong text</div>
  <div class="item item-4">你们中大多数人都熟悉程序员的美德，有三种：那就是懒惰、急躁和傲慢。</div>
  <div class="item item-5">5</div>
</div>

定义网格的列、行。其值表示 track 的大小，分隔各值用的空格相当于 line 。包含:

* track 大小 – 可以为长度、百分比、fr 等
* 网格线命名 – 自动生成或用户指定的名字

#### 网格线命名

网格线将从 1 开始被自动赋值（或从最后一条线开始从 -1 开始赋值）。
![line](./template-columns-rows-01.svg)

但也可以为网格线指定明确的名字：

```css
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```

![line](./template-columns-rows-02.svg)

网格线可以同时有多个名字：

```css
.container {
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}
```

重名的网格线可以通过其名字和序号引用到：

```css
.item {
  grid-column-start: col-start 2;
}
```

### grid-template-areas

依据 `grid-area` 所定义的区域名来定义整个网格的区域。可选值有三种：

* 与 grid-area 所对应的区域名
* `.` 表示空的单元格
* `none` 表示区域未定义

示例：

<CodeGroup>
<CodeGroupItem title="页面效果">

<div class="container area">
  <div class="item item-a">header</div>
  <div class="item item-b">main</div>
  <div class="item item-c">sidebar</div>
  <div class="item item-d">footer</div>
</div>

</CodeGroupItem>
<CodeGroupItem title="CSS" active>

```css{18-21}
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

.container {
  display: grid;
  height: 200px;
  grid-template-columns: 50px 1fr 50px 50px;
  grid-template-rows: 40px auto 20px;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```

</CodeGroupItem>
<CodeGroupItem title="HTML">

```html
<div class="container">
  <div class="item-a">header</div>
  <div class="item-b">main</div>
  <div class="item-c">sidebar</div>
  <div class="item-d">footer</div>
</div>
```

</CodeGroupItem>
</CodeGroup>

区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为 `区域名-start`，终止网格线自动命名为 `区域名-end`。正因此，某些网格线可能有多个名字，如上例最左侧网格线可用的命名为：header-start, main-start 及 footer-start

### grid-template

`grid-template-rows` `grid-template-columns` `grid-template-areas` 的缩写形式。

综合使用示例：

```css
.container {
  grid-template:
    [row1-start] "header header header" 25px [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}
/* 等价于：*/
.container {
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;
  grid-template-areas: 
    "header header header" 
    "footer footer footer";
}
```

通常最好使用 `grid` 代替 `grid-template` 。

### column-gap，row-gap

<div class="wapper">
column-gap: <input v-model="columnGap"/>&nbsp;
row-gap: <input v-model="rowGap"/>
</div>

<div class="container"
  style="grid-template-columns: repeat(3, 100px);grid-template-rows: 100px 100px;"
  :style="`column-gap:${columnGap};row-gap:${rowGap}`">
  <div class="item" v-for="i in 6">&nbsp;</div>
</div>

定义网格线的大小，可理解为行列间隙的宽度。

注：`grid-column-gap` `grid-row-gap` 为废弃属性。

### gap

`row-gap` `column-gap` 的缩写形式。

注：`grid-gap` 为废弃属性。

### justify-items

<div class="wapper">
justify-items: 
<select v-model="justifyItems">
    <option v-bind:value="i" 
    v-for="i in ['start', 'end', 'center', 'stretch']">{{ i }}</option>
</select>
</div>
<div class="container"
    style="grid-template-columns: repeat(3, 100px);grid-template-rows: 100px 100px;"
    :style="`justify-items:${justifyItems}`">
    <div v-for="i in 6" class="item center">{{ i }}</div>
</div>
<div class="container"
    style="grid-template-columns: repeat(3, 100px);grid-template-rows: 100px 100px;"
    :style="`justify-items:${justifyItems}`">
    <div v-for="i in 6" class="item center">{{ i }}</div>
</div>


设置容器内所有 row 轴上的对齐方式。

## 项目元素属性

## 特殊单位和函数

### fr

`fr` 表示剩余空间中的一部分，如下例表示 2 列分别占 25%、75% 。

```css
grid-template-columns: 1fr 3fr;
```

其与百分比的区别在于：如果存在 padding（如下例中的 padding:50px），`%` 将会导致宽度不再是 100%；而 `fr` 不会造成该问题。

<div class="container" style="grid-template-columns:1fr 3fr">
  <div class="item" style="padding:50px">1fr</div>
  <div class="item" style="padding:50px">3fr</div>
</div>

<div class="container" style="grid-template-columns:25% 75%">
  <div class="item" style="padding:50px">25%</div>
  <div class="item" style="padding:50px">75%</div>
</div>

单位 `fr` 计算的是去除所有非弹性项目后的空间，如：

```css
.container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}
```
会用总宽度减去 50px 后再将剩余空间三等分给 1、3、4 列。显然，单位 `fr` 在与其它单位联合使用时更为友好：

```css
grid-template-columns: 50px min-content 1fr;
```

### min-content

依据其内容的最小尺寸显示：

<CodeGroup>
<CodeGroupItem title="页面效果">
<div class="container" style="grid-template-columns:min-content 1fr 1fr;padding:30px 0;">
  <div class="item">The very long hotdog.</div>
  <div class="item"></div>
  <div class="item"></div>
</div>
</CodeGroupItem>
<CodeGroupItem title="CSS" active>

```css{3}
.container {
  display: grid;
  grid-template-columns: min-content 1fr 1fr;
  gap: 10px;
}
``` 

</CodeGroupItem>
<CodeGroupItem title="HTML">

```html{2}
<div class="container">
  <div class="item">The very long hotdog.</div>
  <div class="item"></div>
  <div class="item"></div>
</div>
``` 

</CodeGroupItem>
</CodeGroup>

### max-content

依据其内容的最大尺寸显示：

<CodeGroup>
<CodeGroupItem title="页面效果">
<div class="container" style="grid-template-columns:max-content 1fr 1fr;padding:30px 0;">
  <div class="item">The very long hotdog.</div>
  <div class="item"></div>
  <div class="item"></div>
</div>
</CodeGroupItem>
<CodeGroupItem title="CSS" active>

```css{3}
.container {
  display: grid;
  grid-template-columns: max-content 1fr 1fr;
  gap: 10px;
}
``` 

</CodeGroupItem>
<CodeGroupItem title="HTML">

```html{2}
<div class="container">
  <div class="item">The very long hotdog.</div>
  <div class="item"></div>
  <div class="item"></div>
</div>
``` 

</CodeGroupItem>
</CodeGroup>

### fit-content

在 `min-content` 与 `max-content` 之间调整可用空间：

<CodeGroup>
<CodeGroupItem title="页面效果">
<div class="container" 
  style="grid-template-columns:fit-content 1fr 1fr;grid-template-rows:20px;padding:30px 0;">
  <div class="item">The very long hotdog.</div>
  <div class="item">&nbsp;</div>
  <div class="item">&nbsp;</div>
</div>
</CodeGroupItem>
<CodeGroupItem title="CSS" active>

```css{3}
.container {
  display: grid;
  grid-template-columns: fit-content 1fr 1fr;
  gap: 10px;
}
``` 

</CodeGroupItem>
<CodeGroupItem title="HTML">

```html{2}
<div class="container">
  <div class="item">The very long hotdog.</div>
  <div class="item"></div>
  <div class="item"></div>
</div>
``` 

</CodeGroupItem>
</CodeGroup>

PS: 当前 Chrome (97.0.4692.99) 不支持该关键字。

### minmax()


<div class="wapper">
<span class="label">container 的 width: </span>&nbsp;
<input v-model="minmaxWidth" style="text-align:center;width:100px"/>px
</div>

<div class="container" 
  :style="`width:${minmaxWidth}px;grid-template-columns:minmax(200px, 1fr) 3fr;padding:10px 0`">
  <div class="item">minmax(200px, 1fr)</div>
  <div class="item">3fr</div>
</div>

即长度所允许的最小、最大值，因此它限定了一个长度范围。通常配合其它相对单位使用时非常方便。

### repeat()

网格很多时，可简化重复的值。`repeat()` 接受两个参数：1）重复的次数； 2）所要重复的值。

```css
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
/* 简写为: */
grid-template-columns: repeat(8, 1fr);
```

有时单元格的大小是固定的，但是容器的大小不确定。如果希望一行（或列）容纳尽可能多的单元格，可以配合 auto-fill 关键字自动填充。

```css
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))
```

<div class="container" 
  style="grid-template-columns:repeat(auto-fit, minmax(100px, 1fr))">
  <div class="item" v-for="i in 20">{{ i }}</div>
</div>

<script>
export default {
  data() {
    return {
        columns: '100px auto min-content',
        rows: '5em 50%',
        minmaxWidth: 800,
        columnGap: '20px',
        rowGap: '10px',
        justifyItems: 'stretch'
    }
  }
}
</script>

<style scoped>
.wapper {
  margin: 10px 0;
  display: inline-block;
}
.label {
  display:inline-block;
  min-width: 70px;
  margin: 10px 0;
}
.container {
  margin-top: 10px;
  display: grid;
  gap: 10px;
  background-color: #EEE;
}
.item {
  color: white;
  background-color: var(--c-brand);
}
.item.center {
  display: flex;
  justify-content: center;
  align-content: center;
}
.container.area {
  height: 200px;
  grid-template-columns: 50px 1fr 50px 50px;
  grid-template-rows: 40px auto 20px;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}
input {
  border: none;
  border-bottom: 1px solid #999;
  outline: none;
}
img {
  width: 70%;
  min-width: 400px;
}
</style>