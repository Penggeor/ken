---
slug: /net-security/13/03
---

## `if`

`if` 中只有一条语句，可以省略括号

```php
<?php
if ($a > $b)
  echo "a is bigger than b";
```

`if...elseif...else`

```php
<?php
if ($a > $b) {
    echo "a is bigger than b";
} elseif ($a == $b) {
    echo "a is equal to b";
} else {
    echo "a is smaller than b";
}
```

## `while`

先判断再执行：

```php
<?php
$index = 1;
while ($index <= 10) {
  echo $index . PHP_EOL;
  $index++;
}
```

先执行再判断：

```php
<?php
$index = 1;
do {
  echo $index . PHP_EOL;
  $index++;
} while ($index <= 10);
```

## `for`

```php
// 通过 foreach 循环遍历一个数组
$names = ['Tom', 'Jerry', 'Spike', 'Tyke'];
foreach ($names as $name) {
  echo $name . PHP_EOL;
}

// 通过 for 循环遍历一个数组
for ($i = 0; $i < count($names); $i++) {
  echo $names[$i] . PHP_EOL;
}
```



## `switch`

```php
<?php
switch($i) {
  case 0:
    echo "i = 0" . PHP_EOL;
    break;
  case 1:
    echo "i = 1" . PHP_EOL;
    break;
  case 2:
    echo "i = 2" . PHP_EOL;
    break;
}
```





## 替代语法

`if`、`while`、`for`、`foreach`、`switch`，用冒号 `:` 替代左花括号 `{}`，用 `endif`、`endwhile`、`endfor`、`endforeach`、`endswitch` 替代右花括号：

```php
<?php
$a = 1;
if($a == 1):
    echo "a is 1";
    echo PHP_EOL;
endif;
```





## `require`

和 `include` 一样，区别是失败时会报错（`E_COMPILE_ERROR`），而 `include` 只是告警（`E_WARNING`）。



## `include`

包含并运行指定文件。



## `require_one` 和 `include_one`

如果文件被包含过了，则不会再次包含















