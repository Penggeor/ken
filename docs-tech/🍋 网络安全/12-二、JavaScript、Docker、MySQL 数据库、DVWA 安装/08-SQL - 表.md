---
slug: /net-security/02/08
---

## 创建

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);
```

<br />

🌰 例子

```sql
create table kp_student (
  name varchar(255),
  age int
);

create table kp_teacher (
  # id 是 int 类型，不为空，自增，并且是主键
  id int not null auto_increment primary key
);
```

## 插入

```sql
# 方式一：指定插入列
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

# 方式二：每一列都插入
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

<br />

🌰 例子

```sql
insert into kp_student values ('𝞹', 18);
```

## 查看

### 查看所有表

```sql
# 查看当前数据库
SHOW TABLES;

# 查看指定数据库
SHOW TABLES FROM databasename;

```

<br />

模糊匹配

1. `$` 匹配任意多个字符。
2. `_` 匹配任意一个字符。

```sql
# 显示所有 kp 开头的表
show tables like 'kp%';

# 实现中间包含 t 的表
show tables like '%t%';
```

> 注意，当表名自身包含下划线时，可以用 `\` 进行转义。



### 查看表结构

```sql
# 方式一
desc kp_student;

# 方式二
describe kp_student;

# 方式三
show columns from kp_student;
```



### 查看记录

```sql
# 方式一：选择指定列
SELECT column1, column2, ...
FROM table_name;

# 方式而：查看所有列
SELECT * FROM table_name;
```

## 复制

只会复制表结构，不会复制数据。

```sql
CREATE TABLE table_name LIKE another_table_name;
```

<br />

🌰 例子

```sql
create table kp_dean like kp_teacher;
```

## 修改

### 修改表名

```sql
# 当前数据库
RENAME TABLE old_table_name to new_table_name;

# 指定数据库
RENAME TABLE databasename.old_table_name to databasename.new_table_name;
```

### 修改表结构

```sql
# 修改表的字符集
AlTER TABLE table_name charset gbk;
```

## 删除

```sql
DROP TABLE table_name;
```