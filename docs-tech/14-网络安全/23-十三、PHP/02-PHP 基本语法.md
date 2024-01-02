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

























