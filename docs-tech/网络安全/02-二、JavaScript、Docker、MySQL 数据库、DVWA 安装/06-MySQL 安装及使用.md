---
slug: /net-security/02/06
---



## 数据库介绍

### 概念

🚛 数据库 *Database* *DB* 一种存储数据结构的文件系统：

1. 按照某种数据结构存储、管理数据
2. 持久化
3. 可读写

### 分类

#### 关系型

可以看做 excel 表。

<br />

由 4 个部分组成：

1️⃣ 数据库管理系统 Database Management System DBMS

2️⃣ 数据库 Database

3️⃣ 数据表 Table

4️⃣ 数据字段 Field 

<br />

常见的关系型数据库有：MySQL、Postgres

#### 非关系型

非关系型 NoSQL(Not Only SQL)：没有具体模型的数据结构。

<br />

常见的非关系型数据库有：MongoDB、Redis、Memcached

> 😈 MongoDB 默认安装下，部署在 27017 端口，且没有账号密码
>
> 😈 Redis 默认安装下，部署在 6379 端口，且没有账号密码
>
> 😈 Zookeeper 默认安装下，部署在 2181 端口，且没有账号密码



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

<br />

GUI 推荐：

- Windows：Navicat、Workbench
- MacOS：Table Plus、Sequal Pro







