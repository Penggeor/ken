---
slug: /net-security/05/01
---

漏洞分为应用漏洞（前端）和主机漏洞（后端）。

学习扫描器要知道：

1. 该扫描器用于应用漏洞还是主机漏洞？
2. 什么场景下使用哪款扫描器？

## AWVS

AWVS *Acunetix Web Vulnerability Scanner*



### 安装

```bash
# 下载
docker pull dockermi3aka/awvs

# 运行
docker run -dit -p 3443:3443 dockermi3aka/awvs
```



## 登录

```
https://your_ip:3443
```

👆 注意这里是 https 登录

```
用户名：admin@admin.com
密码：Admin123
AWVS版本：14.7.220425114
```



![](http://img.wukaipeng.com/2023/0906-071825-image-20230906071824687.png)


🔗 推荐扫描测试站点：[http://testphp.vulnweb.com/search.php?test=query](http://testphp.vulnweb.com/search.php?test=query)


> 工作情况下，非授权不做登录扫描，一方面时候产生脏数据，另一方面是扫描会发送真实攻击导致业务瘫痪。


:::info 弊端

像 AWVS 这种传统扫描器的弊端是容易被发现，一般用于自查。

:::













