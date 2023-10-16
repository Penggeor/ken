### 在 M1/M2 Mac 上安装 Kali

下载 UMT 虚拟机：[https://mac.getutm.app/](https://mac.getutm.app/)

下载 Kali 镜像：[https://www.kali.org/get-kali/#kali-installer-images](https://www.kali.org/get-kali/#kali-installer-images)

> 下载中间推荐的，3.2G，下载时间可能要比较长。

在 UMT 上安装 Kali 镜像的具体安装教程：

前面部分参考：[Kali inside UTM (Guest VM)](https://www.kali.org/docs/virtualization/install-utm-guest-vm/)

后面部分参考：[How to Install Kali Linux on an M1 or M2 Mac](https://www.macobserver.com/tips/how-to/install-kali-linux-m1-m2-mac/)

> 安装软件部分时间可能比较久

最终效果：

![](http://img.wukaipeng.com/2023/1016-064158-image-20231016064157705.png)

如果 Kali 没有 BeEF 的话，打开一个 Terminal 去安装它：

```bash
sudo apt update

sudo apt upgrade

sudo apt install beef-xss
```

![](http://img.wukaipeng.com/2023/1016-073837-image-20231016073837216.png)

