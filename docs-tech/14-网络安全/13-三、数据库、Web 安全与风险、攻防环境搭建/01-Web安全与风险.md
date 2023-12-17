---
slug: /net-security/03/01
---

## Web 攻击基础知识

### 概念

Web 攻击的本质，就是利用 HTTP 协议篡改应用程序。

<br />

可利用点：请求方法、请求头、数据体

可利用过程：认证、会话、授权

> 认证过程中存在的攻击：
>
> 账号枚举：在认证过程中，hacker 手中有账号数据源，根据将其中账号认证接口“该账号不存在”响应，进而枚举出存在于该平台的账号。
>
> 密码爆破：枚举账号之后，用密码字典再挨个去攻击账号。

利用途径：Web、客户端、HTML、其他协议



### 特点

1. 广泛性
2. 匿名性
3. 利用难度低（对比主机漏洞、木马病毒）



### 常见攻击点

- 中间件：针对 HTTP 底层服务器，如 IIS、Apache、Nginx、Tomcat

- Web 应用：授权、认证、输入验证、程序逻辑、钓鱼等
- 数据库：SQL 注入
- Web 客户端：客户端软件漏洞、浏览器、APP、小程序等
- 传输：中间人攻击、窃听等
- 可用性：DDOS（Distributed Denial of Service，利用大量傀儡机/肉机去攻击某个网站服务，造成网站服务无法处理正常用户请求）、CC 攻击（Credential Stuffing Attack）



### 渗透测试学习框架

渗透测试我们将学习如下内容：

#### 1. 信息搜集

假设我们要扫描淘宝的漏洞：https://www.taobao.com

首先登录网站，可收集如下信息：

1. 端口
2. 子站，比如 abc.taobao.com、a.b.taobao.com
3. 新业务
4. 收集业务
5. 微信小程序
6. 友情链接
7. 旁站

#### 2. 漏洞攻防

1. SQL 注入
2. XSS
3. CSRF
4. SSRF
5. 命令注入
6. 目录穿越
7. 暴力破解
8. 文件读取 `../../../etc/passwd`
9. 文件上传 `.php`
10. 文件包含 `include(filename)`
11. XXE 代码解析 XML 文件是解析外部实体引发漏洞
12. 逻辑漏洞 / 业务漏洞：比如短信轰炸，就是抓住接口没有限制短信发送
13. 中间件

#### 3. 编程语言

PHP

Python

Java

JavaScript

#### 5. 代码审计

- 代码审计属于白盒测试

#### 6. 应急响应



## HTTP 协议

### 1. 概念

HTTP *HyperText Transfer Protocol* 即超文本传输协议，规定了浏览器和服务器通信的规则，允许将 HTML 文档从服务器传送到浏览器中。

URL *Uniform Resource Locator* 即统一定位资源符，可以唯一定位资源。格式如下：

```
协议://IP[:端口]/路径/[?查询]
```

比如在 URL 中：https://wukaipeng.com/english

- https → 协议
- 443 → 端口号，HTTPS 默认走 443，HTTP 某人走 80
- wukaipeng → 主机域名，通过域名解析服务解析成 IP 地址“101.36.110.12”
- english → 路径



### 2. 详解

HTTP 特点：无状态

#### 请求

请求包含三部分：

1. 请求行
2. 请求头
3. 请求正文

```http
POST / login.php HTTP/1.1 //请求行
HOST: www.baidu.com //请求头
User-Agent: Mozilla/5.0 (windows NT 6.1; rv:15.0)
Gecko/20100101 Firefox/15.0
//空白行，代表请求头结束
username=admin&password=admin //请求正文
```

 

#### 响应

响应包含三部分：

1. 响应行
2. 响应头
3. 响应正文

```http
HTTP/1.1 200 OK //响应行
Date: Thu, 28 Feb 2013 07:36:47 GMT //响应头
Server: Bws/1.0 //服务器信息
Content-Length: 4199
Content-Type: text/html;charset=utf-8//提问：告诉谁的？
Cache-Control: private
Expires: Thu, 28 Feb 2021 07:36:47 GMT
Content-Encoding: gzip
Set-Cookie: H_PS_PSSID=2022_1438_1944_1788；path=/；domain=.baidu.com
Connection: Keep-Al ive
//空白行，代表响应头结束
<html>
//响应正文或者叫消息主体
<headxtitle> Index.html </title></head>
```



> 什么情况下会设置 Cookie？
>
> - 登录的时候才设置 ✅ 安全
> - 第一次访问就设置 Cookie，且登录之后不更新 Cookie ❌不安全，存在“固定会话攻击”
> - 第一次访问就设置 Cookie，且登录之后更新 Cookie 或者新增校验字段 ✅ 安全



### 3. 请求方法

1. GET
2. HEAD：和 GET 请求一样，除了没有响应正文。一般用于<u>测试资源的有效性、可访问性和最近改变</u>。

![head request](http://img.wukaipeng.com/2023/0827-210501-image-20230827210500670.png)

> 一般扫描接口用的就是 HEAD 请求，因为没有响应正文，速度比较快。

3. POST：可以在请求正文中添加参数，安全性比 POST 高。
4. PUT：更新资源
5. DELETE：删除资源
6. TRACE：查看远程应用层的请求消息回路。
7. OPTIONS：查看服务器支持的 HTTP 方法。

### 4. 状态码

1xx：继续处理

2xx：成功

3xx：重定向

4xx：客户端错误状态码

5xx：服务端错误

🛠️ HTTP 状态码清单工具： [https://t.he3app.com?djv8](https://t.he3app.com?djv8)

### 5. HTTP 消息

HTTP 消息又叫做 HTTP 头（HTTP Header），有 4 种，分别为：

- 请求头
- 响应头
- 普通头
- 实体头

#### 请求头

只出现在请求中

##### 1. Host

请求的主机和端口号

```http
Host: wukaipeng.com
```

##### 2. User-Agent

发起请求的浏览器的相关信息

```http
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36
```

##### 3. Refererer

从上一个 URL 跳转过来的地址

```http
Referer: https://wukaipeng.com/post/improve-efficiency
```

##### 4. Cookie

##### 5. Range

请求实体的部分内容

##### 6. X-forward-for

请求端的 IP

##### 7. Accept

指定可以接受哪些 MIME 类型

```http
Accept: text/html
```

##### Accept-Charset

可接受的字符集

```http
Accept-Charset: utf-8
```

#### 响应头

##### 1. Server

服务器信息

```http
Server: nginx/1.25.1
```

##### 2. Set-Cookie

##### 3. Last-Modified

```http
Last-Modified: Sun, 27 Aug 2023 10:06:18 GMT
```

资源最后的修改时间

##### 4. Location

告诉浏览器去访问哪个页面，通常用于重定向

```http
Location: https://wukaipeng.com/english
```

##### 5. Refresh

告诉浏览器定时刷新

#### 普通头

指示这条传输的信息。

##### 1. Data

这条请求产生的时间

```http
Date: Sun, 27 Aug 2023 23:02:06 GMT
```

##### 2. Connection

指定连接的选项

```http
Connection: keep-alive
```

##### 3. Cache-Control 

缓存策略

```http
Cache-Control: no-cache
```

#### 实体头

指示有关于实体的信息。

##### 1. Content-Type

```http
Content-Type: text/html; charset=utf-8
```

##### 2. Content-Encoding

```http
Content-Encoding: br
```

##### 3. Content-Length

```http
Content-Length: 3450
```

##### 4. Last-Modifed



### HTTPS 协议

HTTPS = HTTP + SSL

HTTP 和 HTTPS 区别：

1. HTTP 明文，HTTPS 加密传输，更加安全
2. HTTP 端口是 80，HTTPS 端口是 443
3. HTTPS 需要到 CA 申请证书
4. HTTP 连接比较简单，HTTPS 需要加密等操作，速度相比 HTTP 会稍慢

> HTTPS 协议把流量给加密了，那么要怎么做流量监控呢？
>
> **旁路部署**：不影响正常的请求，只是把请求复制一遍，送到流量监控设备，用密钥解密然后分析请求。



### 常见的编码

#### URL 编码

URL 主要使用 ASCII 上可打印字符，对于超出 ASCII 的特殊字符，会<u>编码成 UTF-8</u>，但是并不是 `\u4f60` 这种形式，而是<u>十六进制字节形式</u>。

比如“你”，在 UTF-8 中，用十六进制字节表示为：`0xE4 0xBD 0xA0`，接着再进一步编码为 `%E4%BD%A0`。

🛠️ URL 解码工具： [https://t.he3app.com?edh4](https://t.he3app.com?edh4)

#### Unicode 编码

目前盛行的统一编码方式，UTF-8 是其中一种。

#### HTML 编码

在 HTML 表示一些特殊字符。

🛠️ [HTML 编码列表](https://t.he3app.com?ytm0)

#### Base64 编码

用 64 个字符去代表任意的二进制数据。这 64 个字符包括大写、小写字母，数字，和两个特殊字符（一般是加号 `+`  和反斜线 `/`）。转换过程：

1. 三个字节为一组。
2. 编码成 base64。
3. 填充。原数据可能无法平均分组，在末尾填充字符（一般是 “=”）。

```
编码前原数据：My name is wukaipeng
Base64编码: TXkgbmFtZSBpcyB3dWthaXBlbmc=
```

特点：

🔸 对原数据无损转换。

🔸 一般比原数据还大，但它能插入在一些文本数据之中。

#### 16 进制编码

许多应用程序在传输二进制时直接使用十六进制，用 ASCII 字符表示 16 进制数据块。

```
daf -> 646166
```

























