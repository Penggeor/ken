---
slug: transform-web-app-to-desktop-app
date: 2023-02-25
---

在桌面端应用上，Electron 也早已做大做强，GitHub桌面端、VSCode、Figma、Notion、飞书、剪映、得物都基于此。但最近后起之秀的 Tauri 也引人注目，它解决了 Electron 一个大的痛点——**打包产物特别大**。

我们知道 Electron 基于谷歌内核 Chromium 构建，打包后无论应用多小，至少都得 70M 起步，而 Tauri 使用操作系统内的 Webview[^1]，运行时才会去动态连接 webview，这使得它的**打包速度非常快、打包后的应用更小**。

[^1]: Tauri vs. Electron: A comparison, how-to, and migration guide: https://blog.logrocket.com/tauri-electron-comparison-migration-guide/

Tauri 跟 Electron 一点不同，Electron 使用 JavaScript 编写后台服务，而 Tauri 则使用 Rust，Rust 这两年势头很猛，**更安全、性能更好**，很多应用都开始转入 Rust 的怀抱，相信不久后也会是前端必学基础。

本文就基于 Tauri 作为构建桌面端应用框架，仅需一点时间，就可以将一个 **Web 应用转为桌面端应用**。

## 1. 打开一个 Web 应用

我们以 FocusTide 这个应用为转换对象，它是 GitHub 开源的一个计时 Web 应用：

![](http://img.wukaipeng.com/2023/12/02-121001-rIhYVr-08eab53012484b70be26b0382c651936.png)

![](http://img.wukaipeng.com/2023/12/02-121005-TeXIZH-6282d1fac4b04a289b5f918eb6a2ebbe.png)



- 网站地址：[https://focustide.app/](https://focustide.app/)
- 仓库地址：
[https://github.com/Hanziness/FocusTide](https://github.com/Hanziness/FocusTide)

首先我们先 Clone 该仓库到本地：

```shell
$ git clone git@github.com:Hanziness/FocusTide.git
```

然后我们安装并且运行起来：

```shell
# 安装依赖
$ yarn install

# 启动服务，在 localhost:3000
$ yarn dev
```



## 2. 安装 Tauri 依赖
我们以 Mac 为例，Mac 下需要安装 CLang 和 MacOS 相关开发依赖：

```shell
$ xcode-select --install
```

安装 Tauri：
```
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```
这条命令会安装下载 Rustup，它会下载安装 Rust 相关依赖，当安装成功后控制台会显示：

```shell
$ Rust is installed now. Great!
```

其他操作系统安装 Tauri：

1. Windows 下安装 Tauri：[https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites/#windows](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites/#windows)
2. Linux 下安装 Tauri：[https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites/#linux](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites/#linux)



## 3. 将 Tauri 集合到项目中
在 Web 应用内，先安装 Tauri 相关的 npm 包
```shell
$ npm install --save-dev @tauri-apps/cli
```

在 `pakcage.json` 增加脚本命令：

```json
"scripts": {
  "tauri": "tauri"
}
```

接着跑 Tauri 初始化项目命令：

```shell
$ npm run tauri init
```
这条命令执行之后，会在当前 Web 项目产生如下 Tauri 项目：

![](http://img.wukaipeng.com/2023/12/02-121011-iig1xH-ff9ceef6ea0341dd910df26b105daddd.png)


执行之后，会有一些问题需要我们去填写

![](http://img.wukaipeng.com/2023/12/02-121015-RBJHbg-0e7b4ec330f445cda1c4601cab694104.png)

1. *What is your app name?*
**应用名**。这个名字会作为打包后应用的正式名称。

2. *What should the window title be?*
**默认窗口名称**。这个会作为我们打开应用窗口的名称，后续我们不需要这个窗口的话我们可以在 `tauri.conf.json`  的 `hiddenTitle` 字段去隐藏它。

3. *Where are your web assets (HTML/CSS/JS) located relative to the &lt; current dir $gt; /src-tauri/tauri.conf.json file that will be created?*
**生产环境下的文件路径**。也就是前端项目打包之后的项目路径，这个路径相对于 `/src-tauri/tauri.conf.json` 路径。FocusTide 项目打包产物放在项目的 `dist`  文件夹中，所以我们填 `..dist`。

4. *What is the URL of your dev server?*
**开发环境下的服务路径**。FocusTide 项目开发下的服务路径为 `http://localhost:3000`。

5. *What is your frontend dev command?*
**前端启动开发命令**。FocusTide 项目启动开发命令是 `yarn dev`。

6. *What is your frontend build command?*
**前端打包命令**。FocusTide 项目的打包命令是 `yarn generate`。


执行后，生成 `src-tauri`，接着我们就可以把项目跑起来了：
```shell
$ npm run tauri dev
```

可以看到，我们的应用在窗口跑起来了：

![](http://img.wukaipeng.com/2023/12/02-121019-wkozpv-271beed775124437977b26287fd4c8c9.png)

## 4. 打包发布
如果开发 OK，我们就可以把应用打包出来。

```shell
$ npm run tauri build
```

执行打包命令后，打包应用会存放在 `src-tauri/target/release/bundle` 下，可以看到，打包产物非常小：

![](http://img.wukaipeng.com/2023/12/02-121023-f2kEOL-74132756adf04a6e967d9be2bd87849c.png)


> Tauri 打包过程中，会更根据当前系统平台打包，比如 Mac 下只能打包 `.dmg` 和 `.app` 包，Windows 下打包 `.msi` 和 `.exe` 包。

## 5. 部署
下载后，如果我们要公开这个应用，需要部署应用，这里我们推荐 [Laf](https://www.lafyun.com/) ，我们可以使用它的云存储#文件管理，把我们的应用上传上去并且得到下载链接：

![](http://img.wukaipeng.com/2023/12/02-121029-7UBxEv-75313a644c014420aee88e18b28a2760.png)

## 6. 最后
整个转换过程其实非常简单快速，如果你花费了超过 10 分钟的话，那我们深表歉意。如果你要继续深入使用桌面后台服务，可以查看 [Tauri 官网](https://tauri.app/zh-cn/v1/guides/)。

最后，我把转换后的 FocusTide 项目放到了个人 GitHub 上，并且取名为「**来做**」，目前仅限 Mac 端，欢迎下载  👏🏻
- 下载链接：[下载链接](https://oss.lafyun.com/iemwd3-app/Lai%20Todo_0.1.0_aarch64.dmg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=WKIIB9JJ54H604R8DQ7P/20230219/us-east-1/s3/aws4_request&X-Amz-Date=20230219T131932Z&X-Amz-Expires=900&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJXS0lJQjlKSjU0SDYwNFI4RFE3UCIsImV4cCI6MTY3Njg5OTE3MiwicGFyZW50IjoiaWVtd2QzIiwic2Vzc2lvblBvbGljeSI6ImV5SldaWEp6YVc5dUlqb2lNakF4TWkweE1DMHhOeUlzSWxOMFlYUmxiV1Z1ZENJNlczc2lVMmxrSWpvaVlYQndMWE4wY3kxbWRXeHNMV2R5WVc1MElpd2lSV1ptWldOMElqb2lRV3hzYjNjaUxDSkJZM1JwYjI0aU9pSnpNem9xSWl3aVVtVnpiM1Z5WTJVaU9pSmhjbTQ2WVhkek9uTXpPam82S2lKOVhYMD0ifQ.iVAx0shFo9G9pTGxDpP1WEQ8YYAF9i2MJu0GdqCo3zVRrXoNQUDIhaSnQq4Vm-qBO_xpaJ-Pi4fdqhav6GOn9w&X-Amz-Signature=8c7cd7660610fd8391209e5bd0e7c9fc8ce438560ce45216dbd37413e1aa04c2&X-Amz-SignedHeaders=host)
- GitHub 仓库：[https://github.com/Penggeor/lai-todo](https://github.com/Penggeor/lai-todo)



