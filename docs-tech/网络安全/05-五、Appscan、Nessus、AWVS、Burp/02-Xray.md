---
slug: /net-security/05/02
---

Xray 一款应用漏洞扫描器，支持主动扫描和被动扫描。

![](https://docs.xray.cool/assets/term.svg)



🏠 使用&安装文档：https://docs.xray.cool/#/



## 基础爬虫进行扫描（主动扫描）



```bash
./xray_linux_amd64 webscan --basic-crawler http://testphp.vulnweb.com/ --html-output x
ray-crawler-testphp.html
```



## 代理模式进行扫描（被动扫描）

代理模式下的基本架构为，扫描器作为中间人，首先原样转发流量，并返回服务器响应给浏览器等客户端，通讯两端都认为自己直接与对方对话，同时记录该流量，然后修改参数并重新发送请求进行扫描。

![](http://img.wukaipeng.com/2023/0908-072657-image-20230908072656874.png)

 

🦀 操作：https://docs.xray.cool/#/tutorial/webscan_proxy



















