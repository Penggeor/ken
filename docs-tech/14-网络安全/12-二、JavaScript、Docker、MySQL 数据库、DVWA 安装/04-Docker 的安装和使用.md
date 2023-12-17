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
- 阿里云  http://YOUR_ID.mirror.aliyuncs.com
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

> 在 Docker 中，`kill` 和 `stop` 是两个不同的命令，用于停止正在运行的容器。
>
> - `docker kill` 命令用于立即停止容器的运行。它发送一个 SIGKILL 信号给容器的主进程，强制终止容器的运行。这个命令会立即停止容器，不会给容器执行任何清理操作的机会。
>
> - `docker stop` 命令用于优雅地停止容器的运行。它发送一个 SIGTERM 信号给容器的主进程，然后等待一段时间（默认为 10 秒）让容器执行清理操作。如果容器在等待时间内没有停止，那么会发送一个 SIGKILL 信号给容器，强制终止容器的运行。
>
> 总结来说，`kill` 是立即停止容器的运行，而 `stop` 是优雅地停止容器的运行。在大多数情况下，应该优先使用 `stop` 命令来停止容器，以便容器有机会执行清理操作。只有在必要的情况下，才使用 `kill` 命令来立即停止容器。

### 扩展命令

```shell
# 宿主机拷贝到容器
docker cp source_path ${container_id}:destination_path

# 容器拷贝到宿主机
docker cp ${container_id}:destination_path source_path

# 保存一个 container 到 image
docker commit ${container_id} image:version

# 保存成 image
docker save -o destination_path image_name

# 加载到 image
docker load -i source_path
```





























