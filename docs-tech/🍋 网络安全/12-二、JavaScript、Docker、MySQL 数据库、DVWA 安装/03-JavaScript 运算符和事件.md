---
slug: /net-security/02/03
---

## 运算符的定义和分类

👉 运算符，也称为操作符，对值进行运算。

👉 表达式，由运算符，字面量或变量组合的式子。

👉 返回值，表达式运算的结果。



### 算术运算符

| 算术运算符 | 描述 |
| ---------- | ---- |
| `+`        | 加   |
| `-`        | 减   |
| `*`        | 乘   |
| `/`        | 除   |
| `%`        | 取余 |



#### 运算优先级

1️⃣ 小括号`()` 最优先

2️⃣ 先乘除，后加减

3️⃣ 取余比乘除低，比加减高

```js
const result1 = (33 * 3) % 2
console.log(result1) // 1

const result2 = 33 + (3 % 2)
console.log(result2) // 34
```

💡 生产环境优先的运算都会用小括号



#### 浮点数运算的精度问题

浮点数最高支持 17 位小数，算术运算时会有精度问题。

```js
console.log(0.1 + 0.2) // 0.30000000000000004
console.log(0.07 * 100) // 7.000000000000001
```



🔗 解决方案见：[浮点数](02#浮点数)



### 自增和自减

`++` 可以让变量自增 `1`

```js {2,6}
let a = 1
a++
console.log(a) // 2

let b = 1
++b
console.log(b) // 2
```

- `a++` 是先用再加
- `++b` 是先加再用

```js
let a = 1
console.log(a++) // 1
console.log(a) // 2

let b = 1
console.log(++b) // 2
console.log(b) // 2
```

在 `console.log(a++)` 这条表达式中，等价于 `console.log(a); a = a + 1;` 

<br />

同理，自减是 `--`



### 一元运算符

#### `typeof`

打印类型。

```js
let a = 1
console.log(typeof a) // number
```



#### `+`

- 对于正数不会有影响
- 对于其他类型，可以隐式转换为 number 类型

```js
let a = 1
let b = +a
console.log(b) // 1

let c = '1'
let d = +c
console.log(d) // 1
```



#### `-`

对数字取负。



### 布尔运算

`&&` 与

`||` 或

`!` 取反



#### 非布尔值的运算

非布尔值运算的过程中，先隐式转换为布尔值比较，最终结果返回原值。

```js
console.log(1 && 2) // 2
console.log(0 && 2) // 0
console.log(1 || 0) // 1
console.log(0 || 2) // 2
```



#### 非布尔值的 `!` 运算

```js
const a = 1
const b = !a
console.log(b) // false
console.log(typeof b) // boolean
```



### 赋值运算符

`a += 5`  等价于 `a = a + 5`

`a -= 5` 等价于 `a = a - 5`

`a *= 5` 等价于 `a = a * 5`

`a /= 5` 等价于 `a = a / 5`

`a %= 5` 等价于 `a = a % 5`



## Unicode 编码

在字符串中可以使用 Unicode 编码。

```js
console.log('\u2600') // ☀
console.log('\u2602') // ☂
```

😈 在一些网站中，可能会设置拦截恶意字符 `*` ，但此时 hacker 可能用 unicode 编码取绕开这个限制。



## 事件句柄



| 属性          | 事件                     | FF   | N    | IE   |
| ------------- | ------------------------ | ---- | ---- | ---- |
| `onabort`     | 图像加载被中断           | 1    | 3    | 4    |
| `onblur`      | 元素失去焦点             | 1    | 2    | 3    |
| `onchange`    | 改变内容                 | 1    | 2    | 3    |
| `onclick`     | 点击某个对象             | 1    | 2    | 3    |
| `ondblclick`  | 双击某个对象             | 1    | 4    | 4    |
| `onerror`     | 加载文档或图像发生错误   | 1    | 3    | 4    |
| `onfocus`     | 元素获得焦点             | 1    | 2    | 3    |
| `onkeydown`   | 某个键盘的键被按下       | 1    | 4    | 3    |
| `onkeypress`  | 某个键盘的键被按下或按住 | 1    | 4    | 3    |
| `onkeyup`     | 蒙恩键盘的键被松开       | 1    | 4    | 3    |
| `onload`      | 某个页面或图像加载完毕   | 1    | 2    | 3    |
| `onmousedown` | 某个鼠标按键被按下       | 1    | 4    | 4    |
| `onmousemove` | 鼠标移动                 | 1    | 6    | 3    |
| `onmouseout`  | 鼠标从某元素移开         | 1    | 4    | 4    |
| `onmouseover` | 鼠标移动到某元素之上     | 1    | 2    | 3    |
| `onmouseup`   | 鼠标按键被松开           | 1    | 4    | 4    |
| `onreset`     | 重置按钮被点击           | 1    | 3    | 4    |
| `onresize`    | 窗口或框架被调整尺寸     | 1    | 4    | 4    |
| `onselect`    | 文本被选定               | 1    | 2    | 3    |
| `onsubmit`    | 提交按钮被点击           | 1    | 2    | 3    |
| `onunload`    | 用户退出页面             | 1    | 2    | 3    |









