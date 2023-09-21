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
