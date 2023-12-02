---
slug: /net-security/02/11
---

## 新增

```sql
# 指定插入的字段
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

# 不指定，插入全量字段数据
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

## 查询

```sql
# 指定查询的字段
SELECT column1, column2, ...
FROM table_name;

# 查询全量
SELECT * FROM table_name;
```

## 修改

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

## 删除

```sql
DELETE FROM table_name WHERE condition;
```



