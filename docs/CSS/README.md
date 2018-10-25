---
sidebar: auto
---

# CSS

## 常见属性

### flex

- flex-direction 属性决定主轴的方向
- flex-wrap 属性定义，如果一条轴线排不下，如何换行
- // flex-flow 上面两个的简写
- justify-content属性定义了项目在主轴上的对齐方式
- align-items 定义项目在交叉轴上如何对齐。
- align-content 定义了多根轴线的对齐方式

### display

- block       块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
- none        缺省值。象行内元素类型一样显示。
- inline      行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
- inline-block  默认宽度为内容宽度，可以设置宽高，同行显示。
- list-item   象块类型元素一样显示，并添加样式列表标记。
- table       此元素会作为块级表格来显示。
- inherit     规定应该从父元素继承 display 属性的值。

## 盒模型

有两种， IE 盒子模型、W3C 盒子模型；
盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
区  别： IE的content部分把 border 和 padding计算了进去;
选择器：

1. id选择器（ # myid）
2. 类选择器（.myclassname）
3. 标签选择器（div, h1, p）
4. 相邻选择器（h1 + p）
5. 子选择器（ul > li）
6. 后代选择器（li a）
7. 通配符选择器（ * ）
8. 属性选择器（a[rel = "external"]）
9. 伪类选择器（a:hover, li:nth-child）

## 垂直居中

### 绝对定位

不知道自己高度和父容器高度的情况下, 利用绝对定位只需要以下三行：
如果我们不知道元素的高度，那么就需要先将元素定位到容器的中心位置，然后使用 transform 的 translate 属性，将元素的中心和父容器的中心重合，从而实现垂直居中：

```css
parentElement{
    position:relative;
}
childElement{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```

### 相对定位

若父容器下只有一个元素，且父元素设置了高度，则只需要使用相对定位即可

```css
parentElement{
    height:xxx;
}
.childElement {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

### Flex 布局

不考虑兼容老式浏览器的话，用Flex布局简单直观一劳永逸：

```css
parentElement{
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items:center;/*指定垂直居中*/
}
```

## BFC

块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

下列方式会创建块格式化上下文：

- 根元素或包含根元素的元素
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content或 strict 的元素
- 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
- 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。
- 块格式化上下文包含创建它的元素内部的所有内容.

简写：
根元素

- float属性不为none
- position为absolute或fixed
- display为inline-block, table-cell, table-caption, flex, inline-flex
- overflow不为visible

块格式化上下文对浮动定位（参见 float）与清除浮动（参见 clear）都很重要。浮动定位和清除浮动时只会应用于同一个BFC内的元素。浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。

## 清除浮动

1. BFC
2. Clear

BFC之所以能够清除浮动，是因为它可以包含浮动元素，所以只要父容器形成BFC，就可以被子元素撑开。但是创建 BFC 的过程会带来一些副作用：

- 如果用 float，那么父容器的父容器不好处理
- 如果用 overflow 会影响滚动条和绝对定位的元素
- 如果用 postion 会改变元素的定位方式
- 如果用 display 的话兼容性不太好

添加空的div 设置 clear:both left right 清除浮动
更好的，是通过 css:after 伪元素中设置 clear 完成。
如果 不支持伪元素，可以用 hasLayout (zoom: 1)

## 两列布局

### float+BFC

原理是：

1. 浮动元素的块状兄弟元素会无视浮动元素的位置，尽量占满一整行，这样该兄弟元素就会被浮动元素覆盖。 
2. 若浮动元素的块状兄弟元素为BFC，则不会占满一整行，而是根据浮动元素的宽度，占据该行剩下的宽度，避免与浮动元素重叠。 
3. 浮动元素与其块状BFC兄弟元素之间的margin可以生效，这将继续减少兄弟元素的宽度。

<iframe height='265' scrolling='no' title='Two-cols: float+BFC' src='//codepen.io/Agrimonia/embed/gBQBpj/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/Agrimonia/pen/gBQBpj/'>Two-cols: float+BFC</a> by Lin Yongcong (<a href='https://codepen.io/Agrimonia'>@Agrimonia</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### flex

<iframe height='265' scrolling='no' title='Two-col: flex' src='//codepen.io/Agrimonia/embed/YJRJqe/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/Agrimonia/pen/YJRJqe/'>Two-col: flex</a> by Lin Yongcong (<a href='https://codepen.io/Agrimonia'>@Agrimonia</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>