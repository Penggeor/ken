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

```js  {2,5,8}
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



### 数据类型

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



🌰 一个经典的例子

值拷贝：`a` 改变了，但不会影响 `b`

```js
let a = 1
let b = a

a++

console.log(a) // 2
console.log(b) // 1
```

地址拷贝：`obj1` 拷贝的是 `obj1` 的地址，所以 `obj1` 地址指向的内容改变，也会体现在 `obj2`  中。

```js
let obj1 = { c: 1 }
let obj2 = obj1;

obj1.c++;

console.log(obj1) // { c: 2 }
console.log(obj2) // { c: 2 }
```



### 栈内存和堆内存

JS 中，所有变量都是存储在栈内存中的，而对象是保存在堆内存中的。

![stack and heap](http://img.wukaipeng.com/2023/0817-065506-image-20230817065505907.png)

### String

String：单引号（`'`）、双引号（`"`）引用的文本。

#### 引号

1. 单引号和双引号不能混用

```js
let str = 'hello" //! SyntaxError: Invalid or unexpected token
```

2. 同类引号不能嵌套；使用 `\` 转义

```js
let str = ''a'' //! SyntaxError: Unexpected identifier
```

```js
let str = '\'a\''
console.log(str) // 'a'
```

3. 单引号可以嵌套双引号；双引号可以嵌套单引号

```js
let str1 = '"a"'
let str2 = "'b'"

console.log(str1) // "a"
console.log(str2) // 'b'
```

#### 常见转义字符

| 转义字符 | 含义                         |
| -------- | ---------------------------- |
| `\"`     | 单引号                       |
| `\'`     | 双引号                       |
| `\\`     | 表示 `\`                     |
| `\r`     | Carriage <u>R</u>eturn，回车 |
| `\n`     | <u>N</u>ew Line，换行        |
| `\t`     | <u>T</u>ab，缩进             |
| `\b`     | <u>B</u>lank，空格           |



#### 长度

使用字符串的 `length` 属性。

```js
let str1 = '楷鹏';
let str2 = 'Kaipeng';

console.log(str1.length); // 2
console.log(str2.length); // 7
```



#### 拼接

```js
let str1 = 'hello';
let str2 = ' world';

console.log(str1 +  str2); // hello world
```



#### 不可变性

在内存中，字符串是不可变的，如果给一个变量重新赋值字符串，实际会赋值一块新字符串的内存。

```js
let str = '你好'
str = '楷鹏'
```

![Immutable](http://img.wukaipeng.com/2023/0817-073924-image-20230817073924174.png)



#### 模板字符串

使用反引号（<code>`</code> ）可以创建模板字符串，使用 <code>${}</code> 作为占位符。

```js {8}
const name = '楷鹏'
const age = 18

// 传统的字符串拼接
console.log('我叫' + name + ',今年' + age + '岁了')

// 模板字符串
console.log(`我叫${name},今年${age}岁了`)
```



##### 插入表达式

```js {8}
const a = 1
const b = 2

// 传统的字符串拼接
console.log('a + b = ' + (a + b))

// 模板字符串
console.log(`a + b = ${a + b}`)
```



##### 多行

```js
const str = `Dear.鹏
  你知道母猪的产后护理吗？
  速回复！`
```



##### 调用函数

```js {6}
function greeting() {
  return '你好呀'
}

console.log(`Dear.鹏
  ${greeting()}
  你知道母猪的产后护理吗？
  速回复！`)
```



##### 嵌套使用

```js {3,7,10}
const lis = ['吴', '楷', '鹏']

const str = `
  <ul>
    ${lis
      .map((item) => {
        return `<li>${item}</li>`
      })
      .join('\n\t')}
  </ul>`

console.log(str)
// <ul>
//   <li>吴</li>
//   <li>楷</li>
//   <li>鹏</li>
// </ul>
```



### Boolean

布尔值比较简单，就 `true` 和 `false`。



### Number

所有数值都是 Number 类型，包括整数和浮点数。

#### 数值范围

- 最大值: `Number.MAX_VALUE`
- 最小值：`Number.MIN_VALUE`

```js
console.log(Number.MAX_VALUE) // 1.7976931348623157e+308
console.log(Number.MIN_VALUE) // 5e-324
```

超过最大值，返回 `Infinity`：

- 正无穷：`Infinity`
- 负无穷：`-Infinity`

注意，`Infinity` 也是 Number 类型：

```js
console.log(typeof Infinity) // number
```



#### NaN

NaN Not a Number，即一个不合规的数值。

```js
const a = 1
const b = 'z'

console.log(a * b) // NaN
```

`NaN` 也是 Number 类型。



#### 隐式转换

数学运算的时候，会进行隐式转换，也就是对变量类型进行统一之后再进行运算。

- `+` 有字符串，则优先转换为 String
- `-`, `*`, `/` 优先转换为 Number

```js
const a = 1
const b = '2'

console.log(a + b) // 12
console.log(a - b) // -1
console.log(a * b) // 2
console.log(a / b) // 0.5
```



#### 浮点数

```js live
const a = 0.1
const b = 0.2

console.log(a + b) // 0.30000000000000004
```

底层运算的时候，会把数字转换为二进制再去计算，0.1 和 0.2 转换后是无穷的，因此相加结果不准确。

需要精确运算，可以使用库：

- [decimal.js](https://www.npmjs.com/package/decimal.js)
- [Math.js](https://www.npmjs.com/package/mathjs)

### Null

Null 是用来定义一个<u>空对象</u>。



### Undefined

Undefined 表示未定义。

#### Case 1： 变量未声明

```js
console.log(typeof a) // undefined
console.log(a) // ReferenceError: a is not defined
```



#### Case 2： 变量已声明，未赋值

```js
let a;
console.log(a) // undefined
```

可以看做隐式赋值 `let a = undefined`



#### Case 3：函数未传参

```js
function greeting(name) {
  console.log(`Hello, ${name}`)
}

greeting() // Hello, undefined
```

可以看做隐式传参 `greeting(undefined)`



#### Case 4： 函数无返回值

```js
function greeting(name) {
  console.log(`Hello, ${name}`)
}

const result = greeting() // Hello, undefined

console.log(result) // undefined
```

可以看做隐式返回 `return undefined`



#### Null 和 undefined 的区别

比较时

```js
console.log(null == undefined) // true
console.log(null === undefined) // false
```

> `==` 松散比较，先做隐式类型转换，再比较值
>
> `===` 严格比较，先比较类型，再比较值



和数值进行运算时

```js
console.log(10 + null) // 10
console.log(10 + undefined) // NaN
```

- 任何数据类型和 `undefined` 运算都是 `NaN`
- 任何值和 `null` 运算，`null`可看做 `0` 运算。

















