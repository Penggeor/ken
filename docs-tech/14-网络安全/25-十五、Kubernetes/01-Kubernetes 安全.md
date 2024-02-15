---
slug: /net-security/15/01
---

👉 官网 [https://kubernetes.io/](https://kubernetes.io/)

## Kubernetes 介绍

![](http://img.wukaipeng.com/2024/02/13-165600-p4YpFI-0*xF0evAgZ_U3eqBGW.png)

Kubernetes 是一个开源的**容器集群管理平台**，实现容器集群的「自动化部署」、「自动扩容/缩容」、「维护」等功能。

> “Kubernetes”来自于希腊语，意思是“飞行员”

通过 Kubernetes 可以实现：

- 快速部署应用
- 快速扩展应用
- 无缝对接新的应用功能
- 节省资源，优化硬件资源的使用

### Kubernetes 特点

1. **可移植**：支持公有云、私有云、混合云、多重云
2. **可扩展**：模块化、插件化、可挂载、可组合
3. **自动化**：自动部署、自动重启、自动复制，自动伸缩/扩展



### Kubernetes 组件

![](http://img.wukaipeng.com/2024/02/13-172800-Q4Dzbk-1*iPCHG6_F6Sdn2qDfpTN_kg.png)

1. **Master 组件**：集群管理控制中心，Master 组件可以在任意 Node 运行
   1. **Kube-apiserver**：用于暴露 API，所有资源的请求/调用都是通过它来进行的。
   2. **ETCD**：存储系统，保存所有集群数据
   3. **kube-controller-manager**：运行管理控制器，控制器包括
      1. Node 控制器
      2. Replication 控制器：维护系统重每个副本中的 pod
      3. Endpoints 控制器：填充 Endpoints 对象（即链接 Services & Pods）
      4. Service Account 和 Token 控制器：为新的 Namespace 创建默认账户访问 API Token
   4. **cloud-controller-manager**：负责与底层的云提供商交互
   5. **kube-scheduler**：监视新创建的还未分配 Node 的 Pod，将 Pod 分派到一个 Node 中
   6. **Addon 插件**：实现集群 Pod 和 Services 功能的
      1. DNS
      2. 用户界面
      3. 容器资源监控
      4. Cluster-level Logging
2. **Node 组件**：Kubernetes 将容器放在 Node 下的 Pod 中运行，Node 可以是一个虚拟机或者物理机
   1. **Kubelet**：监视 Pod
      1. 安装 Pod 所需的 volume
      2. 下载 Pod 的 Secrets
      3. 运行 Docker 或 RKT 容器
      4. 定期检查容器健康
      5. 可以创建一个「镜像 Pod」，将 Pod 状态报告给系统的其他部分
      6. 向系统的其余部分报告节点的状态
   2. **kube-proxy**：维护网络规则
   3. Docker/RKT：容器
   4. supervisord：轻量级的监控系统，保障 kubelet 和 Docker 运行
   5. fluentd：一个搜索进程，提供 cluster-level logging

### Kubernetes 对象

在 Kubernetes 中，**对象**用于描述集群：

- 容器化应用正在运行（以及运行在哪些节点上）
- 应用的可用资源
- 应用如何运行的策略，如重启、升级和容错策略

#### 对象规范和状态

每个 Kubernetes 对象都包含：

- Object Spec（对象规范），描述对象所需的状态，希望对象具有的特征
- Object Status（对象状态），描述了对象的实际状态，并由 Kubernetes 系统提供和更新

#### 描述 Kubernetes 对象

必须字段：

- `apiVersion`：Kubernetes API 版本
- `kind`：创建对象的类型
- `metadata`：唯一表示对象的数据，包括 `name`、UID 和 Namespace（可选）

比如下面一个 Kubernetes Deployment 实例：

```yaml
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```



### Kubernetes Namespaces

Namespace 即命名空间，可以表示多个虚拟集群。



#### 创建

1. 命令行直接创建

```bash
kubectl create namespace new-namespace
```

2. 通过文件创建

```bash
cat my-namespace.yaml
apiVersion: v1
kind: Namespace
metadata: 
  name: new-namespace
  
kubectl create -f ./my-namespace.yaml
```



#### 删除

```bash
kubectl delete namespaces new-namespace
```

#### 操作

```bash
kubectl get namespaces
```



### Kubernetes Nodes

Node 是 Kubernetes 中的工作节点。

#### Node Status

节点的状态信息包含：

1. Addresses：来自云提供商和裸机的配置
2. Condition：描述节点的状态
3. Capacity：描述节点上可用的资源，比如 CPU、内存和可调度到节点上的最大 Pod 数量
4. Info：关于节点的一些基础信息，比如内核版本、Kubernetes 版本（kubelet 和 kube-proxy 版本）、Docker 版本、OS 名称等

#### Management

Kubernetes 创建节点其实只是创建节点的代表对象，真正的节点由云服务商 or 物理机提供。





### Kubernetes Pod

Pod 是 Kubernetes 中可部署的最小单位。一个 Pod 代表集群上正在运行的进程。

一个 Pod 封装一个应用容器，存储资源、一个独立的网络 IP 以及管理控制容器运行方式的策略选项。

![](http://img.wukaipeng.com/2024/02/14-085527-jObgJ6-image-20240214085526945.png)

Kubernetes 不直接管理容器，而是管理 Pod

Pod 的两种用法：

1. One-container-per-Pod，一个 Pod 一个容器
2. 一个 Pod 由多个容器组成，形成 Service 单位，一个共享文件，一个 sidecar 容器来更新文件。

### Ingress

管理外部访问的 API 对象，典型访问方式是的是 HTTP。

Ingress 可以提供负载均衡、SSL 终结和基于名称的虚拟托管。



## 搭建 Kubernetes

### 下载 Desktop

👉 下载地址：[https://www.docker.com/get-started/](https://www.docker.com/get-started/)

配置镜像源，加快拉取速度：https://registry.docker-cn.com

![](http://img.wukaipeng.com/2024/02/14-102826-apt7sJ-image-20240214102825851.png)

### 安装 kubectl

👉 安装教程：[https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/](https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/)

> 工具脚本，帮助下载 kubernetes 所需镜像：
>
> ```bash
> git clone https://github.com/AliyunContainerService/k8s-for-docker-desktop
> 
> cd k8s-for-docker-desktop
> 
> ./load_images.sh
> ```

打开 Docker Desktop，在设置中打开“Enable Kubernetes”，之后可以看到 Kubernetes Running 的状态：

![](http://img.wukaipeng.com/2024/02/15-102202-iCLqAp-image-20240215102202241.png)

执行 `kubectl cluster-info` 查看状态：

![](http://img.wukaipeng.com/2024/02/15-102305-kAp76q-image-20240215102304980.png)

安装 Kubernetes Dashboard:

```bash
cd k8s-for-docker-desktop
# 创建
kubectl create -f kubernetes-dashboard.yaml
# 打开
kubectl proxy
```

访问：`http://127.0.0.1:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login`

![](http://img.wukaipeng.com/2024/02/15-102844-06YCRE-image-20240215102843955.png)

获取 token：

```bash
# 授权 kube-system 默认服务账号
kubectl apply -f kube-system-default.yaml

# 获取 token
kubectl describe secret default -n kube-system
```



![](http://img.wukaipeng.com/2024/02/15-103737-mQQ6Sj-image-20240215103737612.png)

将 token 输入到 Dashboard 中，登录成功：

![](http://img.wukaipeng.com/2024/02/15-103817-bUeC4g-image-20240215103817100.png)



## Kubernetes 威胁矩阵

![](http://img.wukaipeng.com/2024/02/14-110353-1YAnS7-1_8rT2YvhbkyZK_LwBzzJqJQ.webp)



