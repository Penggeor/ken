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
# 列出本地所有镜像
docker images 

# 搜索镜像
docker search ${image_name:version}

## 搜索镜像 stars 大于 5000
docker search mysql --filter=STARS=5000

# 下载镜像
docker pull ${image_name:version}

# 删除镜像
docker rmi ${image_name:version}
```



### 容器

```shell
# 列出状态为运行中的容器
docker ps
-a # 列出所有状态的容器
-q # 列出运行中的容器 ID

# 运行容器
docker run ${image:version}
-d # 后台方式运行
-it # 交互方式运行，能够进入容器查看内容
-p # 端口映射
exit # 退出容器
ctrl+Q+P # 退出容器但是不会停止容器

# 查看容器信息
docker inspect ${container_id}

# 删除容器
docker rm ${container_id} 

# 停止正在运行的容器
docker stop ${container_id}

# 强制停止正在运行的容器
docker kill ${container_id}

# 启动容器
docker restart ${container_id}

# 进入一个正在运行中的容器
docker exec -it ${container_id} /bin/bash
```



























