---
slug: /net-security/02/02
---



## 字面量

1. 数字：`1`, `200`
2. 字符串：`"Hello World"`
3. 布尔值：`true`, `false`



## 变量基础

变量：存放数据的容器。变量可以存放字面量，也可以存放其他变量。

> 变量本质是程序在内存中申请的一块用于<u>存放数据的空间</u>。

### 声明

ES6 之前，只有 `var` 关键字声明变量

```js
var a; // 声明变量 a
```

ES6 之后，提供了两个新的定义变量关键字： `let` 和 `const` 

```js
let b;
const c;
```

现在基本用 ES6 语法，弃用 `var`。



### 赋值

```js showLineNumbers {2,5,8}
var a;
a = 1; // 给变量 a 赋值

let b;
b = 2;

const c;
c = 3;
```



### 初始化

初始化：声明变量的同时给变量赋值。

```js
var a = 1;
let b = 2;
const c = 3;
```

在前两小节中，为了演示作用，把 `const` 变量的声明和赋值给拆开了，但 `const` 变量声明和赋值是不能拆分的，也就是声明 `const` 变量之后必须赋值。



### 修改

```js
var a = 1;
a = 3;

let b = 2;
b = 4;
```

注意，`const` 变量是不能修改的。



### 声明多个变量

```js
var a = 1, b =2, c = 3;
```

### 命名规范

1. 只能由字母（A-Z，a-z）、数字（0-9）、下划线（`_`）、美元符号（`$`）组成。
2. 不能以数字开头。
3. 不能使用关键字 or 保留字。
4. 区分大小写。
5. 长度不超过 255 个字符。
6. 汉字可以作为变量名，但不建议使用。



### 标识符

标识符：在 JS 中所有自定义的变量、函数名、类名等等。



### 关键字 and 保留字

关键字和保留字可以看做是内置的「标识符」，关键字是说目前正在使用的，而保留字是为了之后可能扩展语法功能会用的而提前预留的。

| 关键字 / 保留字 |            |            |              |             |
| --------------- | ---------- | ---------- | ------------ | ----------- |
| `await`         | `break`    | `case`     | `catch`      | `class`     |
| `const`         | `continue` | `debugger` | `default`    | `delete`    |
| `do`            | `else`     | `enum`     | `export`     | `extends`   |
| `false`         | `finally`  | `for`      | `function`   | `if`        |
| `implements`    | `import`   | `in`       | `instanceof` | `interface` |
| `let`           | `new`      | `null`     | `package`    | `private`   |
| `protected`     | `public`   | `return`   | `super`      | `switch`    |
| `static`        | `this`     | `throw`    | `true`       | `try`       |
| `typeof`        | `var`      | `void`     | `while`      | `with`      |
| `yield`         |            |            |              |             |



## 变量的数据类型

不同数据的占用的存储空间不同，定义数据类型可以确定所需的存储空间。

JS 是「弱类型语言」，变量的数据类型在运行的时候才确定。



### 8 种数据类型

👉 基本数据类型：值传递（在参数赋值的时候，拷贝值）

1. Null

2. Undefined

3. Boolean 布尔值

4. Number 数字

5. Bigint 大数

6. String 字符串

7. Symbol 

   

👉 引用数据类型：引用传递（在参数赋值的时候，拷贝的引用地址）

1. Object 对象
   1. Function 函数
   2. Array 数组
   3. Date 日期
   4. Error 错误
   5. RegExp 正则表达式
   6. ...其他





















