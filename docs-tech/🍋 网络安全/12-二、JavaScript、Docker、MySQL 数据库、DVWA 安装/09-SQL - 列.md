---
slug: /net-security/02/09
---

## 新增

```sql
ALTER TABLE table_name 
ADD column_name datatype;
```

<br />

🌰 例子

```sql
alter table kp_student
  add sex varchar(255);
```

<br />

新增列的位置默认放在最后，我们也可以指定列的位置：

- `first` 放在最前
- `after` 指定在某个字段后面

```sql
# 新增的 home 列会放置在 name 后面
alter table kp_student add home varchar(255) after name;
```

## 修改

`change` 修改列名、列属性

```sql
# 把 sex 改为 gender，并且从原来的 varchar 改为 int 类型
alter table kp_student change sex gender int;
```

<br />

`modify` 修改列位置、列属性

```sql
# 把 age 字段放置到 name 后面，注意这里 age 后跟着它的类型
alter table kp_student modify age int after name;
```

## 重命名

```sql
ALTER TABLE table_name 
RENAME COLUMN old_name to new_name;
```

## 删除

```sql
ALTER TABLE table_name 
DROP COLUMN column_name;
```
