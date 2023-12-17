---
slug: /cloud-native/docker/commands
---


## 重启策略

`--restart`:
- `no`：容器不在宿主机重启时自动启动。（这是默认值）
- `on-failure`：仅当容器非正常退出时（退出状态非0）才重启容器。
- `always`：无论退出状态如何，总是重启容器。
- `unless-stopped`：无论退出状态如何，总是重启容器，除非它是被明确停止的（例如，通过 docker stop 命令或者其它方式）。

新运行容器：

```bash
docker run -d --restart=always your_image
```

已运行容器：

```bash
docker update --restart=always your_container
```

