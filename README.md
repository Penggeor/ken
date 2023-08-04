# 楷鹏的技术领域

作为一个程序员，有一个自己的个人网站是一件很酷的事情。

我已经很酷了。

那接下来，我要在这里沉淀个人在技术领域的知识。

你应该感到高兴，又多了一位旗鼓相当的对手。

---

一棵树，在现在最好的时机被种下。

很期待十年之后，它会长成什么样。

我是说，十年的时间，除了变成中年人，我还可以做多少很酷的事。


## Docker 部署

打包

```shell
docker build -t ken:latest .
docker buildx build --platform=linux/amd64 -t ken:v1.0.0 .
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
docker run -d -p 4000:3000 --name ken -e \
POSTHOG_API_KEY= \
GISCUS_REPO_ID= \
GISCUS_CATEGORY_ID= \
ken:v1.0.0
```

## Roadmap

- [x] 环境变量
- [x] 支持评论
- [x] 网站流量分析
- [ ] HTTPS 支持
- [ ] CI/CD 自动化