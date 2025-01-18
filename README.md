# Ken - 快速搭建你的个人博客网站

```mermaid
graph LR;
   A[整体功能]
   B[适配 Web、移动端]
   C[夜间模式]
   D[支持文章评论]
   E[支持 HTTPS]
   F[支持网站监控]
   G[支持搜索]
   H[CI/CD 自动化]
   A --> B
   A --> C
   A --> D
   A --> E
   A --> F
   A --> G
   A --> H
```

基于 Facebook 开源的静态博客生成框架，短时间可完成部署并上线。


技术供应层面上：

1. [Docusaurus V3.0](https://docusaurus.io/)： Facebook 开源的博客网站，**名字有点难拼写**，它由 Docu 和 saurus 组合而成，前者是指“文档”，后者是指“蜥蜴”，寓意轻量快捷的文档生成框架。

   ![Docusaurus](https://ph-files.imgix.net/7a8c1deb-6539-476c-bd6a-907c830b2394.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fit=max&dpr=2)

2. [霞鹭字体](https://github.com/lxgw/LxgwWenKai)：开源的中文字体，非常好看。

   ![LXGW](https://lxgw.github.io/images/posts/klee-simpchin/wenkai-overview.png)

3. [Giscus](https://giscus.app/)：开源的评论集成工具，直接利用 GitHub Discuss，不用自己维护一个数据库。

4. [Posthog](https://posthog.com/)：开源的网站监控工具。它有 cloud 版本，有一百万事件的免费额度。

5. [Nginx](https://www.nginx.com/)：反向代理服务器。

6. [Docker](https://www.docker.com/)：部署网站

7. Algolia：网站内搜索服务，对于开源项目可以免费使用。

8. 又拍云 + uPic：又拍云提供云存储功能，uPic 是一款免费的图片上传应用，两者结合完成图床功能。

9. UCloud：提供服务器、域名、SSL 证书。

10. Github Action：CI/CD 部署


## Docker 部署

打包

```shell
docker build \
--build-arg POSTHOG_API_KEY=your_value \
--build-arg GISCUS_REPO_ID=your_value \
--build-arg GISCUS_CATEGORY_ID=your_value \
-t ken:v1.0.0 .
```

压缩

```shell
docker save ken:latest -o ken
```

上传

```shell
scp ./ken ucloud:~
```

解压

```shell
docker load -i ken
```

运行

```shell
docker run -d -p 4000:3000 --name ken ken:v1.0.0
```