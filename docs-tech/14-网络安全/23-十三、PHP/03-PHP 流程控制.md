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

```
```













