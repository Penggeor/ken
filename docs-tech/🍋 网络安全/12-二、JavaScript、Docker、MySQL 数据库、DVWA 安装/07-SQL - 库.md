---
slug: /net-security/02/07
---

## SQL 介绍

🔍 SQL *Structured Query Language* 结构化查询语言，针对关系型数据库的标准编程语言。

## 数据库

### 创建

```sql
CREATE DATABASE databasename;
```

命名规范：

- 数字、字母、下划线组成
- 大小写不敏感
- 不能以数字开头

<br />

🌰 例子

```sql
create database db_wukaipeng;
```

### 查看

#### 查看数据库

```sql
SHOW DATABASES;
```

#### 查看具体的创建数据库指令

```sql
show create database db_wukaipeng;
```

> 由于系统加工，看到的不一定是原始的创建命令。

### 使用

```sql
USE databasename;
```

### 修改

```sql
ALTER DATABASE databasename [options];
```

<br />

🌰 例子 修改字符集

```sql
# 修改字符集
alter database db_wukaipeng charset gbk;

## 查看数据库的字符集
SELECT default_character_set_name, default_collation_name FROM information_schema.SCHEMATA WHERE schema_name = 'db_wukaipeng';
```

### 删除

```sql
DROP DATABASE databasename;
```

