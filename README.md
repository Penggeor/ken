# 楷鹏的知识领域

几天时间，完成了梦想的个人博客网站。

🎉 https://wukaipeng.com

![](http://img.wukaipeng.com/2023/0805-103820-screenshot-wukaipeng.com-2023.08.05-10_34_31.png)



目前已经完成了：

- 整体代码架构
- 适配 Web、移动端
- 夜间模式
- 支持文章评论
- 支持 HTTPS
- 支持网站监控
- 支持搜索
- CI/CD 自动化



说一下动机，为什么要费心费力开发一个博客网站。原因有很多，最主要的还是作为一个开发者，长久以来，都没有自己成体系、稳定的知识库，并且 CSDN、掘金本质还是内容分发平台，他们更关注平台下的博客生产、分发，另外 Notion、语雀功能笔记实在太臃肿了。

犹记得有一次用 Notion 记录笔记，结果第二天记录的内容片段居然丢失，那一刻我对 Notion 就失去了信任。作为一个程序员，还是<u>更喜欢对底层的把控感</u>。

得益于如今成熟的博客网站搭建技术方案，能在短时间部署一个网站。计算下来，真正投入的时间不超过 2 天，更多的时间是在等待域名备案。话说广东省的备案还要求承诺书，且必须手写签名和盖手印：

![承诺书](http://img.wukaipeng.com/2023/0805-150957-image-20230805150956943.png)



供应商层面上：

1. [Docusaurus](https://docusaurus.io/)： Facebook 开源的博客网站，名字有点难拼写，它由 Docu 和 saurus 组合而成，前者是指“文档”，后者是指“蜥蜴”，寓意轻量快捷的文档生成框架。它如今的 V2 版本已经相当成熟，该有的响应式、主题模式、MDX、版本控制、多语言支持等等全都有，并且它通过 swizzle 的机制，能够让我们进一步自定义任意组件。

   ![Docusaurus](https://ph-files.imgix.net/7a8c1deb-6539-476c-bd6a-907c830b2394.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fit=max&dpr=2)

2. [霞鹭字体](https://github.com/lxgw/LxgwWenKai)：开源的中文字体，非常好看。

   ![LXGW](https://lxgw.github.io/images/posts/klee-simpchin/wenkai-overview.png)

3. [Giscus](https://giscus.app/)：开源的评论集成工具，利用 GitHub Discuss，不用自己维护一个数据库。当然缺点也是有，就是用户评论前需要登录 GitHub 并授权。

4. [Posthog](https://posthog.com/)：开源的网站监控工具。它有 cloud 版本，有一百万事件的免费额度。当然也可以自己 host 一个。

5. [Nginx](https://www.nginx.com/)：反向代理服务器。

6. [Docker](https://www.docker.com/)：除了部署网站，我还把 Nginx 运行在 Docker 上，而不是把 Nginx 安装在全局下。

7. Algolia：

8. 又拍云 + uPic：又拍云提供云存储功能，uPic 是一款免费的图片上传应用，两者结合完成图床功能。

9. UCloud：提供服务器、域名、SSL 证书。




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