---
slug: /net-security/02/01
---



## JavaScript 的特点

1. 易学
2. 弱类型。定义变量只需要 `var`/`let`/`const` 这三个关键字。



## JavaScript 的组成

1. ECMAScript：JS 的语法
2. DOM Document Object Model：浏览器提供的操作 HTML 节点的 API
3. BOM Browser Object Model：浏览器提供的操作浏览器、系统环境的 API



## JavaScript 的特点

1. 解释型语言。边解释边执行。
2. 单线程。
3. ECMAScript 标准。European Computer Manufactures Association 欧洲计算机制造商协会制定和发布的语言规范。



## 编程语言的分类

翻译器：把语言翻译成计算机能够执行的工具。

根据代码执行时机不同分为：

1. 编译器。实现将所有代码编译成中间文件，再一起执行。
2. 解释器。边解释边执行。

> 对应的语言称之为 编译型语言 解释型语言。

### 编译型语言

优点：执行很快。

缺点：移植性差，有中间产物。

例子：C、C++、Java

> 严格来说，Java 不算编译型语言，它先编译成 `.class` 文件，然后通过 JVM 执行实现了跨平台。

### 解释型语言

优点：没有中间产物

缺点：执行速度比编译型语言慢。

举例：JavaScript、PHP、Python



## 第一行 JavaScript 代码

JavaScript 在浏览器中，有多种执行位置。

### 行内式

```html {9} showLineNumbers
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
  <!--  行内式  -->
  <input type="button" value="Click Me" onclick="alert('Hello World')">
</body>
</html>
```



### 内嵌式

```html showLineNumbers {8-12}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
  <script>
    // 内嵌式
    alert('Hello World')
    console.log('Hello World')
  </script>
</body>
</html>
```



### 外链式

```js showNumberLines title="./demo.js"
alert('Hello World!')
console.log('Hello World!')
```

```html showLineNumbers {9} title="./demo.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
  <!-- 外链式 -->
  <script src="./demo.js"></script>
</body>
</html>
```

## JS 语法规则

1. 换行、缩进、空格不敏感。
2. 所有符号都是英文符号。
3. 严格区分大小写。

## 注释

行内注释

```js
// I am comment.
```

多行注释

```js
/*
 I am comment.
 */
```

VSCode 中

- 行内注释：<kbd>ctrl</kbd> + <kbd>/</kbd> (<kbd>cmd</kbd> + <kbd>/</kbd>)

- 多行注释：<kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>a</kbd> (<kbd>option</kbd> + <kbd>shift</kbd> + <kbd>a</kbd>)



## 输入输出

1. `alert`
2. `console.log`
3. `prompt`： 和 `alert` 一样，但是可以接受用户输入。

> 在安全测试的时候，会经常用到 `<script>alert(‘Hello World’)</script>` 这样的脚本片段作为安全测试，一方面是为了方便测试，另一方面是不会造成太大的影响。









