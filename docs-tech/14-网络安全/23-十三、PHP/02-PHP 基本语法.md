---
slug: /net-security/13/02
---

## PHP 标记

- 开始标记：`<?php`

- 结束标记：`?>`

> `<?php echo` 的简写方式：`<?=`

开始标记和结束标记之外都会被忽略，除非处于条件语句中间：

```php
<?php $expression = true; ?>
<?php if ($expression == true) : ?>
  This will show if the expression is true.
<?php else : ?>
  Otherwise this will show.
<?php endif; ?>
```

## 注释

单行注释：`//` 或者 `#`

内联注释：`/* */`

## PHP 类型

10 种：

- 标量类型
  1. bool
  2. int
  3. float（浮点型，也称为 double）
  4. string
- 复合类型：
  1. array
  2. object
  3. callable
  4. iterable
- 特殊
  1. resource
  2. NULL



```php
<?php
$a = true; // bool
$b = 1; // int
$c = 1.0; // float
$d = '1'; // string
$e = array(1); // array
$f = null; // null
$g = new stdClass(); // object
$h = fopen('1.php', 'r'); // resource

echo gettype($a), "\n"; // bool
echo is_int($b), "\n"; // 1
echo "String: $d\n"; // String: 1
```

> 查看表达式的值和类型，使用 `var_dump` 函数

### Bool

当转换为 boolean 时，以下值被认为是  false ：

- 布尔值  `false`  本身
- 整型值 `0`（零）及 `-0` (零)
- 浮点型值 `0.0`（零）`-0.0`(零)
- 空字符串，以及字符串 "`0`"
- 不包括任何元素的数组
- 特殊类型 `NULL`（包括尚未赋值的变量）
- 从空标记生成的 `SimpleXML` 对象



所有其它值都被认为是  `true` （包括任何资源 和  `NAN` ）

> 注意：`-1` 强制转换后为 `true`



### Integer

int 是集合 $\mathbb{Z} = \{ \ldots, -2, -1, 0, 1, 2, \ldots \}$ 中的某个数

```php
<?php
$a = 123; // 十进制
$b = 0123; // 八进制
$c = 0x123; // 十六进制
$d = 0b101010; // 二进制
$e = 1_234_567; // 从 PHP 7.4.0 开始，可以使用下划线将数值常量的值进行分隔，以提高其可读性
```



### Float



### String

- 单引号

- 双引号：可以解析变量

- heredoc 语法结构

  ```php
  <?php
  echo <<<EOF
      <h1>我的第一个标题</h1>
      <p>我的第一个段落。</p>
  EOF;
  ```

- nowdoc 语法接口：类似 heredoc，但是无法解析变量

  

### Array

结构是：

```php
array(
  key1 => value1,
  key2 => value2,
  key3 => value3,
)
```

key 是可选的，默认为 `0`、`1`、`2` 等等。

key 是 integer 或者 string，不符合的话会被强制转换。





### Iterable

Array 或者实现 Traversable 接口的对象，能够用于

- foreach 迭代
- 生成器中的 yield from 一起使用

```php
<?php

$student_number = array(1, 2, 3, 4, 5, 6, 7, 8, 9);
foreach($student_number as $number) {
    echo $number, PHP_EOL;
}
```

> `PHP_EOL` 是一个内置常量，表示换行，等同于 `\n`，但是适用于所有平台。



### Object

```php
<?php
class Person {
    function speak() {
        echo "Hello\n";
    }
}

$person = new Person();
$person->speak();
```



### Resource

外部资源引用



### NULL

表示空，只有一个唯一值 `NULL`



