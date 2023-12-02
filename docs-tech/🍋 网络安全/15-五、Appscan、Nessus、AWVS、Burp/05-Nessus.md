---
slug: /net-security/05/05
---

获取激活码：[https://zh-cn.tenable.com/products/nessus/activation-code?tns_redirect=true](https://zh-cn.tenable.com/products/nessus/activation-code?tns_redirect=true)

选择 Essentials



下载：[https://www.tenable.com/downloads/nessus?loginAttempted=true](https://www.tenable.com/downloads/nessus?loginAttempted=true)



Nessus 安装之后不太一样，启动之后前端是在浏览器打开的。

启动之后选择 Essential，输入激活码，之后就会开始下载插件：

![](http://img.wukaipeng.com/2023/0910-060830-image-20230910060829779.png)

下载完毕：

![](http://img.wukaipeng.com/2023/0910-061451-image-20230910061450996.png)



点击右上角 New Scan，选择 Advanced Scan：

![](http://img.wukaipeng.com/2023/0910-062018-image-20230910062018751.png)

![](http://img.wukaipeng.com/2023/0910-062238-image-20230910062238343.png)

端口这里切记要改为 `1-65535`，即全端口扫描，否则默认扫描只会扫常见的端口：

![](http://img.wukaipeng.com/2023/0910-063056-image-20230910063056504.png)

主机扫描的两种方式：

- 版本扫描。根据已知的漏洞版本进行扫描并报告。
- 原理扫描。发送 POC 对服务器进行扫描。



漏洞扫描工具总结：

1. 漏洞扫描工具没办法发现网站&主机所有的漏洞
2. 漏洞扫描工具的作用
   1. 信息收集
   2. 工作需要，提升效率
   3. 初学者友好
3. 掌握程度？
   1. 基础的扫描使用
   2. 通过扫描工具获取的价值













