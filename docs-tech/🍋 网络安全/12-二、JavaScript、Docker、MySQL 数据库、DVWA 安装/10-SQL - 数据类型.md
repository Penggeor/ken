---
slug: /net-security/02/10
---

MySQL 中，主要有三种数据类型：

1. 整型
2. 浮点型
3. 字符串



## 整型

在 MySQL 中，整型有 5 种：

1. `tinyint` 1 个字节
2. `smallint` 2 个字节
3. `mediumint` 3 个字节
4. `int` 4 个字节
5. `bigint`  8 个字节

<br />

注意

1. `int` 是标准整型，不确定的话默认用它。
2. 整型是有正负的，无符号需要使用 `unsigned` 修饰，代表正整型。



### 显示宽度

在定义整型的时候，添加括号+数字描述，比如 `int(11)`，其他 `11` 就代表显示宽度，比如 `int(3)`

1. 插入数据为 `1` 时，会显示成 `001`。
2. 插入数据为 `1000` 时，超过了 3 位，不再进行 零填充，显示的就是 `1000`。

<br />

注意：

1. 只适用于整型

2. 改变样式，不会改变值 or 字段结构

3. 需要通过 `ZEROFILL` 开启

   ```sql
   # 创建的时候给字段指定
   create table kp_zerofill (
     age int(3) zerofill,
     name varchar(100)
   );
   
   # 或者给原先表字段加上
   alter table kp_zerofill change age age int(3) zerofill;
   ```


## 浮点数

MySQL 中浮点数分为：

1. 单精度 float：4 个字节，精度范围在 6~7 位有效数字
2. 双精度 double：8 个字节，精度范围在 14~15 位有效数字

<br />

注意：

- 超过精度范围会自动四舍五入
- 精度可以指定整数和小数部分

## 字符串类型

| Type         | Size              | Way                |
| ------------ | ----------------- | ------------------ |
| `CHAR`       | 0-255 Byte        | 定长字符串         |
| `VARCHAR`    | 0-65536 Byte      | 变长字符串         |
| `TINYBLOB`   | 0-255 Byte        | 二进制的短字符串   |
| `TINYTEXT`   | 0-255 Byte        | 短文本             |
| `BLOB`       | 0-65536 Byte      | 二进制的长文本     |
| `TEXT`       | 0-65536 Byte      | 长文本             |
| `MEDIUMBLOB` | 0-16777215 Byte   | 二进制的中等长文本 |
| `MEDIUMTEXT` | 0-16777215 Byte   | 中等长文本         |
| `LONGBLOB`   | 0-4294967295 Byte | 二进制的极大长文本 |
| `LONGTEXT`   | 0-4294967295 Byte | 极大长文本         |
|              |                   |                    |

































