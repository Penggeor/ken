# 个人博客网站

功能包含：

- 整体代码架构
- 适配 Web、移动端
- 夜间模式
- **支持文章评论**
- 支持 HTTPS
- **支持网站监控**
- **支持搜索**
- **CI/CD 自动化**

基于 Facebook 开源的静态博客生成框架，短时间就完成部署上线，**实际投入的时间不超过 2 天**，更多的时间是在等待域名备案。

预案在广东备案，已签署承诺书，并手写签名和盖手印：

![承诺书](https://img.wukaipeng.com/2023/0805-150957-image-20230805150956943.png)



技术供应层面上：

1. [Docusaurus V3.0](https://docusaurus.io/)： Facebook 开源的博客网站，**名字有点难拼写**，它由 Docu 和 saurus 组合而成，前者是指“文档”，后者是指“蜥蜴”，寓意轻量快捷的文档生成框架。它如今的 **v3.0 版本已经相当成熟**，该有的响应式、主题模式、MDX、版本控制、多语言支持等等全都有，还支持它通过 swizzle 的机制，能够让我们进一步自定义任意组件。

   ![Docusaurus](https://ph-files.imgix.net/7a8c1deb-6539-476c-bd6a-907c830b2394.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fit=max&dpr=2)

2. [霞鹭字体](https://github.com/lxgw/LxgwWenKai)：开源的中文字体，非常好看。

   ![LXGW](https://lxgw.github.io/images/posts/klee-simpchin/wenkai-overview.png)

3. [Giscus](https://giscus.app/)：开源的评论集成工具，利用 GitHub Discuss，不用自己维护一个数据库。当然缺点也是有，就是用户评论前需要登录 GitHub 并授权。

4. [Posthog](https://posthog.com/)：开源的网站监控工具。它有 cloud 版本，有一百万事件的免费额度。当然也可以自己 host 一个。

5. [Nginx](https://www.nginx.com/)：反向代理服务器。

6. [Docker](https://www.docker.com/)：除了部署网站，我还把 Nginx 运行在 Docker 上，而不是把 Nginx 安装在全局下。

7. Algolia：搜索服务，对于开源项目可以免费使用。

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