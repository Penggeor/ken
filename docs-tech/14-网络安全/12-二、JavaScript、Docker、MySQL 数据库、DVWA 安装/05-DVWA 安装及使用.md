---
slug: /net-security/02/05
---

DVWA *Damn Vulnerable Web Application*: 一个基于 PHP 和 MySQL 的 Web 应用，作为网络安全测试的一个<u>靶场</u>。



## 通过 Docker 安装

### 拉取镜像

```shell
docker pull sagikazarmark/dvwa
```

### 运行容器

```shell
docker run -d --name dvwa -p 8080:80 -p 3306:3306 sagikazarmark/dvwa
```

### 查看容器

```shell
docker ps
CONTAINER ID   IMAGE                COMMAND     CREATED          STATUS          PORTS                                                                                NAMES
8b815ffc4432   sagikazarmark/dvwa   "/run.sh"   27 minutes ago   Up 27 minutes   0.0.0.0:8080->80/tcp, :::8080->80/tcp, 0.0.0.0:33060->3306/tcp, :::3306->3306/tcp   dvwa

# 这里看到端口部分有四个映射，其中 0.0.0.0:8080->80/tcp 是 IPV4，:::8080->80/tcp 是 IPV6
```

### 删除容器

```shell
docker stop dvwa
docker rm dvwa
```



## 运行

### 环境

技术栈

- PHP 5.6.30
- Apache 2.4.10
- MySQL 5.5.54

用户名密码

- User: root
- Password: password
- Database: dvwa



### 初始化

点击 Create/Reset Database 初始化，初始化后的新账户密码：

- User: admin
- Password: password

![](http://img.wukaipeng.com/2023/0823-075851-image-20230823075850664.png)



![](http://img.wukaipeng.com/2023/0823-080151-image-20230823080151205.png)



设置低安全性



![](http://img.wukaipeng.com/2023/0823-080655-image-20230823080655409.png)



















