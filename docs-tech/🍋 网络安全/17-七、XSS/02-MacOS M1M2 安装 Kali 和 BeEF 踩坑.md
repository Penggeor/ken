---
slug: /net-security/07/02
---

### 在 M1/M2 Mac 上安装 Kali

下载 UMT 虚拟机：[https://mac.getutm.app/](https://mac.getutm.app/)

下载 Kali 镜像：[https://www.kali.org/get-kali/#kali-installer-images](https://www.kali.org/get-kali/#kali-installer-images)

下载第二个中间推荐的镜像，3.2G，下载时间可能会比较长。

![](http://img.wukaipeng.com/2023/1016-214732-image-20231016214732602.png)

> 在 UMT 上安装 Kali 镜像的具体安装参考链接：
>
> 🌗 前面部分参考：[Kali inside UTM (Guest VM)](https://www.kali.org/docs/virtualization/install-utm-guest-vm/)
>
> 🌓 后面部分参考：[How to Install Kali Linux on an M1 or M2 Mac](https://www.macobserver.com/tips/how-to/install-kali-linux-m1-m2-mac/)

安装过程：

> 🎇 安装软件部分时间可能比较久
>
> 🤓 安装的过程中，最后安装步骤一直卡住，删除掉虚拟机然后重试几次都一。后来就让它一直卡住，索性睡了一觉，第二天发现装好了，6

![](http://img.wukaipeng.com/2023/1016-214048-image-20231016214048669.png)

![](http://img.wukaipeng.com/2023/1016-214235-image-20231016214235202.png)

选择下载好的镜像：

![](http://img.wukaipeng.com/2023/1016-214245-image-20231016214244973.png)

接着就是选内存：2048MB，存储是 32GB

![](http://img.wukaipeng.com/2023/1016-214312-image-20231016214312407.png)

由于 UTM 的 Bug，我们需要加上 Serial，然后点击播放键开始安装

![](http://img.wukaipeng.com/2023/1016-214321-image-20231016214320929.png)

注意，这会打开两个窗口，一个是一直黑屏的直到安装结束，我们主要操作 Terminal1 这个窗口

![](http://img.wukaipeng.com/2023/1016-214358-image-20231016214357973.png)

接着就是选时区（HongKong）、选键盘地区（American English）

还有要设置账号密码的

![](http://img.wukaipeng.com/2023/1016-214431-image-20231016214431567.png)

到了这里，选择第一项

![](http://img.wukaipeng.com/2023/1016-214523-image-20231016214523107.png)

其他的都是一路回车，最后还有安装软件的，注意选择 Yes。

最终效果：

![](http://img.wukaipeng.com/2023/1016-064158-image-20231016064157705.png)

据说 Kali 自带 BeEF，但是安装后却没有，只能手动安装 BeEF，打开 Terminal：

```bash
sudo apt update

sudo apt upgrade

sudo apt install beef-xss
```

安装之后菜单就会出现 🐮 **beef start**

![](http://img.wukaipeng.com/2023/1016-073837-image-20231016073837216.png)

先别急修改配置文件，首先要把 `passwd` 改掉（因为 BeEF 不允许使用默认密码），host 改为本地的 IP 地址。可以通过 `ifconfig` 查看。

![](http://img.wukaipeng.com/2023/1016-134629-image-20231016134629121.png)

改好后通过命令运行 beef，并在浏览器打开 `<your_ip>:3000/ui/panel`：

```bash
# 进入到目录
cd /usr/share/beef-xss

# 执行，如果权限不足在前面加上 sudo
./beef
```

![](http://img.wukaipeng.com/2023/1016-211003-image-20231016211003715.png)
