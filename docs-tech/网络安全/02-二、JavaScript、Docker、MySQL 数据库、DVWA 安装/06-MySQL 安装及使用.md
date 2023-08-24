## 数据库介绍

### 概念

🚛 数据库 *Database* *DB* 一种存储数据结构的文件系统：

1. 按照某种数据结构存储、管理数据
2. 持久化
3. 可读写

### 分类

#### 关系型

可以看做 excel 表

由 4 个部分组成：

1️⃣ 数据库管理系统 Database Management System DBMS

2️⃣ 数据库 Database

3️⃣ 数据表 Table

4️⃣ 数据字段 Field 



常见的关系型数据库有：MySQL、Postgres



#### 非关系型

非关系型 NoSQL(Not Only SQL)：没有具体模型的数据结构。

常见的非关系型数据库有：MongoDB、Redis、Memcached

> 😈 MongoDB 默认安装下，部署在 27017 端口，且没有账号密码
>
> 😈 Redis 默认安装下，部署在 6379 端口，且没有账号密码
>
> 😈 Zookeeper 默认安装下，部署在 2181 端口，且没有账号密码



## SQL 介绍

🔍 SQL Structured Query Language 结构化查询语言，针对关系型数据库的标准编程语言。

根据操作类型不同，SQL 可分为几类：

- DQL *Data Query Language* 数据查询语言，用于查询和检索数据
- DML *Data Manipulation Language* 数据操作语言，用于数据的写操作（增删改）
- DDL *Data Definition Language* 数据定义语言，用于创建数据结构
- DCL *Data Control Language* 数据控制语言，用于用户权限管理
- TPL *Transaction Process Language* 事务处理语言，辅助DML进行事务操作（因此也归属于
  DML



## MySQL

MySQL 开源，基于 C/S 架构。

### 安装

建议用 Docker 安装。

```shell
# 拉取镜像
docker pull mysql

# 运行容器
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=12345 -d mysql:latest
```

GUI 推荐：

- Windows：Navicat、Workbench
- MacOS：Table Plus、Sequal Pro

### 数据库

#### 创建

```sql
create database your_db_name [options]
```

命名规范：

- 数字、字母、下划线组成
- 大小写不敏感
- 不能以数字开头

🌰 例子

```sql
mysql> create database db_wukaipeng;
```

#### 查看

```sql
show databases;
```

🌰 例子

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| db_wukaipeng       |
| dvwa               |
| mysql              |
| performance_schema |
+--------------------+
```

查看具体的创建数据库指令

```sql
mysql> show create database db_wukaipeng;
+--------------+-------------------------------------------------------------------------+
| Database     | Create Database                                                         |
+--------------+-------------------------------------------------------------------------+
| db_wukaipeng | CREATE DATABASE `db_wukaipeng` /*!40100 DEFAULT CHARACTER SET latin1 */ |
+--------------+-------------------------------------------------------------------------+
```

> 由于系统加工，看到的不一定是原始的创建命令。

#### 使用

```sql
use your_db_name;
```

🌰 例子

```sql
mysql> use db_wukaipeng;
Database changed
```

#### 修改

```sql
alter database your_db_name [options]
```

🌰 例子 修改字符集

```sql
# 修改字符集
mysql> alter database db_wukaipeng charset gbk;


# 查看数据库的字符集
mysql> SELECT default_character_set_name, default_collation_name FROM information_schema.SCHEMATA WHERE schema_name = 'db_wukaipeng';
+----------------------------+------------------------+
| default_character_set_name | default_collation_name |
+----------------------------+------------------------+
| gbk                        | gbk_chinese_ci         |
+----------------------------+------------------------+
```

#### 删除

```sql
drop database your_db_name;
```

例如

```sql
mysql> drop database db_wukaipeng;
Query OK, 0 rows affected (0.00 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| dvwa               |
| mysql              |
| performance_schema |
+--------------------+
```





















