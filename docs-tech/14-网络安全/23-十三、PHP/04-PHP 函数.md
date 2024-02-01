---
slug: /net-security/13/04
---

## 定义函数

函数中定义函数

```php
<?php
function foo() {
  function bar() {
    echo "I don't exist until foo() is called.\n";
  }
}

// 还不能调用 bar() 函数，因为它还不存在
// !PHP Fatal error:  Uncaught Error: Call to undefined function bar() 
// bar();

foo();

// 现在可以安全调用函数 bar()
bar();
```

## 参数

引用参数

```php
<?php
function add_some_extra(&$string)
{
  $string .= 'and something extra.';
}

$str = 'This is a string, ';

add_some_extra($str);

echo $str;    // outputs 'This is a string, and something extra.'
```

3. 默认值参数

```php
<?php

function foo($a, $b = 1) {
  echo $a + $b;
}

foo(1, 2); // 3
```

默认值必须是常量表达式，不能是诸如变量，类成员，或者函数调用等。

默认值参数不能放在非默认值参数前面

```php
<?php
function bar($b = 1, $a) {
  echo $a + $b;
}

// !Deprecated: Optional parameter $b declared before required parameter $a is implicitly treated as a required parameter
bar(1, 2); // 3
```

## 返回值

用 `list` 解构返回值

```php
<?php
function foo() {
  return [1, 2];
}

list($a, $b) = foo();
echo $a  . PHP_EOL; // 1
echo $b  . PHP_EOL; // 2
```

## 可变函数

函数可以当做一个变量

```php
<?php
$func = function ($arg) { // 这里是用匿名函数
  echo $arg . PHP_EOL;
};
$func('hello'); // hello
```

## 箭头函数

匿名函数和箭头函数都是 Closure 类的实现，箭头函数的语法为：`fn(argument_list) => expr`

箭头函数会自动获取父作用域的变量值。

```php
<?php
$y = 10;

// 箭头函数
$fn1 = fn($x) => $x * $y;

// 等价于
$fn2 = function($x) use ($y) {
    return $x * $y;
};

echo $fn1(2); // 20
echo $fn2(4); // 40
```



















