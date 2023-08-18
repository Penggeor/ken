---
slug: /net-security/02/04
---

Docker 是一个开源的应用容器引擎，可以把应用打包成可移植的镜像。容器是完全使用沙箱机制，相互之间不会有任何接口。

- 镜像 image：可以理解成安装包。

- 容器 container：安装包安装之后启动的程序。

- 仓库 repository：下载镜像的地方。



## 安装

🔗 见官方文档即可 [https://www.docker.com/](https://www.docker.com/)



国内镜像源：

- docker官方中国区  https://registry.docker-cn.com
- 网易  http://hub-mirror.c.163.com
- USTC  http://docker.mirrors.ustc.edu.cn
- 阿里云  http://<你的ID>.mirror.aliyuncs.com
- DaoCloud http://f1361db2.m.daocloud.io



## 基本命令

### Docker

```shell
docker version

docker info 

docker run hello-world

docker image ls

docker container ls --all
```



### 帮助

```shell
docker help

docker <command> --help
```



### 镜像

```shell
# 列出所有镜像
docker images 

# 搜索镜像
docker search ${image_name:version}

# 下载镜像
docker pull ${image_name:version}

# 删除镜像
docker rmi ${image_name:version}
```

























