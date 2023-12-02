---
slug: /net-security/05/06
---

在 [攻防环境搭建](https://wukaipeng.com/technique/net-security/03/02) 一章 [工具：Burp Suite](https://wukaipeng.com/technique/net-security/03/02#%E5%B7%A5%E5%85%B7burp-suite) 中，我们简单使用了 BurpSuite 这款工具，接下来来详细介绍它。

Burp Suite 是渗透测试中最重要的工具。

下载地址：[https://portswigger.net/burp](https://portswigger.net/burp)

专业版地址，仅供学习使用：[https://www.lzskyline.com/index.php/archives/121/](https://www.lzskyline.com/index.php/archives/121/)

BurpSuite 是一个 jar（Java Archive）包，需要依赖 Java 环境。

## 打开

下载安装后，BurpSuite 可以通过桌面图标打开，也可以直接命令行打开：

```bash
# 进入 BurpSuite 地址
cd /Applications/Burp Suite Community Edition.app/Contents/Resources/app
# 运行
java -jar burpsuite_community.jar
```

## 加内存

BurpSuite 默认分配内存是 64M，如果请求太多会导致应用崩溃，可以手动加内存。

```bash
# 方式一：以 M 为单位
java -jar -Xmx2048M  burpsuite_community.jar

# 方式二：以 G 为单位
java -jar -Xmx2G  burpsuite_community.jar
```



## 机制和浏览器设置

BurpSuite 和 [Xray](https://wukaipeng.com/technique/net-security/05/02) 机制一样，都是通过中间拦截流量来实现的。

### 电脑代理

#### 局部代理

在 在[攻防环境搭建](https://wukaipeng.com/technique/net-security/03/02)一章 [工具：Burp Suite](https://wukaipeng.com/technique/net-security/03/02#%E5%B7%A5%E5%85%B7burp-suite) 中我们已经讲解了局部代理，也就是设置 Firefox 代理将流量转发到 BurpSuite 的 8080 端口，另外我们也可以直接装一个插件去方便切换代理：

![](http://img.wukaipeng.com/2023/0910-085625-image-20230910085625707.png)

添加我们的自定义代理

![](http://img.wukaipeng.com/2023/0910-085842-image-20230910085842444.png)



#### 全局代理

全局代理也就是将本机中所有应用流量转发到 BurpSuite。Windows 系统可参考：[Set up Global Proxy Settings for All Windows Applications](https://wukaipeng.com/technique/net-security/03/02#%E5%B7%A5%E5%85%B7burp-suite)

这里我们以 Mac 为例： > System Settings > Network > Wi-Fi > Details

![](http://img.wukaipeng.com/2023/0910-091604-image-20230910091604583.png)

接着在 Proxies 中设置我们的全局代理：

![](http://img.wukaipeng.com/2023/0910-091811-image-20230910091811106.png)



### 手机代理

首先确保电脑和手机在同一 WiFi 下。

获取电脑的 IP 地址，这里以 MacOS 为例：

```bash
ipconfig getifaddr en0
192.168.31.186
```

在 BurpSuite 上监听本机地址：

![](http://img.wukaipeng.com/2023/0910-094408-image-20230910094407922.png)

然后在手机上将代理改为**手动**，地址为我们获取到的电脑 IP 地址，端口为 8080。

![](http://img.wukaipeng.com/2023/0910-093230-image-20230910093229885.png)



在手机上安装 CA 证书

// TODO



🧨 注意：很多主流 APP 内置防护，禁止 Burp 抓包，所以可能存在抓不到包的情况。



## Proxy

Burp Proxy 是其核心功能，通过 Proxy 我们可以拦截、查看、修改请求。

默认情况下，Burp Proxy 只拦截普通的请求消息，不会拦截 JS、CSS、图片等的静态文件。



### 数据拦截与控制



![](http://img.wukaipeng.com/2023/0910-105539-image-20230910105539190.png)



### 设置

####  请求拦截设置

在 Request interception rules 可以添加拦截规则，去匹配我们想要的请求。

![](http://img.wukaipeng.com/2023/0910-110107-image-20230910110107284.png)



#### 响应拦截设置

![](http://img.wukaipeng.com/2023/0910-111034-image-20230910111034412.png)

#### 修改返回消息

![](http://img.wukaipeng.com/2023/0910-111342-image-20230910111342393.png)

- Unhide hidden form fields：显示 form 表单中隐藏字段
  - Prominently highlight unhidden fields：高亮显示 form 表单中隐藏字段
- Enable disabled form fields：使 form 表单中的 disable 字段生效，变成可输入域
- Remove input field length limits：移除输入域长度限制
- Remove JavaScript form validation：移除 JavaScript 验证
- Remove all JavaScript：移除所有 JavaScript
- Remove `<object>` tags：移除标签
- Convert HTTPS links to HTTP：转换 HTTPS 为 HTTP
- Remove secure flag from cookies：移除 Cookie 中所有的安全标志



#### 正则表达式

设置正则表达式自动替换请求和响应中的内容。

![](http://img.wukaipeng.com/2023/0910-125121-image-20230910125120578.png)

比如我们把请求中的邮箱都替换为 `wukaipeng@burpsuite.com`

![](http://img.wukaipeng.com/2023/0910-125815-image-20230910125815626.png)

在任意的地方输入一个邮箱，都会被修改：

![](http://img.wukaipeng.com/2023/0910-130118-image-20230910130118757.png)

### 转发请求：Request handling

Proxy 有一个选项是 Request handling，可以把流量转发到其他主机，比如我们可以转发到 Xray 上，做二次扫描。

```mermaid
graph LR
A(["网站请求"]) --拦截--> B(["Burp 记录 or 处理该请求"])
B --转发--> C(["Xray 扫描该请求"])
C --转发--> D(["真正的服务端"])
```

这种方式只适用于 HTTP 站点。

对于 HTTPS 方式，见文档 🔗  [https://docs.xray.cool/#/scenario/burp](https://docs.xray.cool/#/scenario/burp) 



:::info💡 Burp 和 Xray 联动的意义在于？

首先先了解下：

- WAF *Web Application Firewall* 应用防火墙，可以阻止像 AWVS 和 Xray 主动扫描对网站的扫描

- 防火墙和 IPS *Intrusion Prevention System* 可以防止像 Nessus 主机扫描

Burp 和 Xray 联动的意义可以通过

:::



## 添加 SSL

![](http://img.wukaipeng.com/2023/0910-131135-image-20230910131134890.png)

当我们打开 `https://wukaipeng.com` 的时候，会发现 FireFox 会提示这样的安全警告，这是因为在 HTTPS 通信中，需要安装 CA 证书。

📥  打开网站 [http://burp/](http://burp/)，在右上角下载 CA 证书

🤨 很奇怪的是，Chrome 和 Edge 都没办法访问 http://burp/，但是 FireFox 却可以。。。

我们已 Mac 为例导入 CA 证书，首先打开 Mac 自带的 Keychain Access，在菜单项选择 Import Items

![](http://img.wukaipeng.com/2023/0910-160950-iShot_2023-09-10_15.51.41.png)

然后导入下载好的 CA 证书，我们是把证书放在 System 下面，导入成功后在 Certificates 分类中可以看到我们刚刚导入的 PortSwigger CA 证书。

![](http://img.wukaipeng.com/2023/0910-161007-iShot_2023-09-10_15.54.09.png)

接着在 Firefox 打开设置，找到 Certificate Manager，然后导入证书：

![](http://img.wukaipeng.com/2023/0910-161308-image-20230910161307839.png)

导入之后重启一下 FireFox，这个时候重新访问 `https://wukaipeng.com` 就不会有安全警告了。



## Target

Burp Target 由三部分组成：

1. 作用域 Scope：想要监听请求的过滤面，可以是网站域名，也可以是网站下某一个目录
2. 站点地图 Site Map
3. Target 工具的使用

### 作用域

可以非常细粒度地设置拦截内容，包括协议、主机、端口，以及文件

![](http://img.wukaipeng.com/2023/0917-103650-image-20230917103649772.png)

### 站点地图

![](http://img.wukaipeng.com/2023/0917-104526-image-20230917104526066.png)

### 工具

![](http://img.wukaipeng.com/2023/0918-083415-image-20230918083414918.png)

#### Analyze tools

分析站点 URL

分析结果：

![](http://img.wukaipeng.com/2023/0918-073058-image-20230918073058040.png) 

包含：

1. Summary
2. Dynamic URLs：带参数的，比如 `https://wukaipeng.com?password=123&username=idiot`
3. Static URLs：不带参数的
4. Parameter

#### Dicover Content

分析站点的目录结构。



#### Burp Scan

在 Dashboard，Burp Scan 已经默认开启被动爬取和审计。

Live passive crawl from Proxy: 实时被动爬虫

Live audit from Proxy：实时审计

![](http://img.wukaipeng.com/2023/0918-084917-image-20230918084917241.png)

##### 被动扫描

被动扫描几乎不会去改造请求，只是对现有的请求响应做一个简单的分析。

- 优点：对业务几乎无影响，适用于扫描生产环境
- 缺点：扫描能力有限。



被动扫描容易发现的漏洞：

1. 提交的密码为未加密的明文（可用DVWA演示）
2. 不安全的Cookie的属性，比如缺少的HttpOnly和安全标志
3. cookie的范围缺失
4. 跨域脚本包含和站点引用泄漏
5. 表单值自动填充，尤其是密码
6. SSL保护的内容缓存
7. 目录列表
8. 提交密码后应答延迟
9. session令牌的不安全传输
10. 敏感信息泄露，像内部IP地址，电子邮件地址，堆栈跟踪等信息泄漏
11. 不安全的ViewState的配置
12. 错误或者不规范的Content-type指令

##### 主动扫描

向应用发送新的请求，并分析 payload 判断漏洞

- 优点：扫描效果好
- 缺点：产生大量的请求，对业务性能有影响，建议用于非生产环境。

Burp 在检测过程中，采用各个技术来验证漏洞是否存在，比如诱导时间延迟、强制修改 Boolean 值，与
模糊测试的结果进行比较，以达到高准确性的漏洞扫描报告。



![](http://img.wukaipeng.com/2023/0919-075520-image-20230919075519572.png)



## Intruder ⭐️

我们使用 DVWA 的 Brute Force 模块作为测试：

![](http://img.wukaipeng.com/2023/0920-073934-image-20230920073933893.png)

拦截到请求之后，发送到 Intruder

![](http://img.wukaipeng.com/2023/0919-082204-image-20230919082204477.png)

替换点

![](http://img.wukaipeng.com/2023/0919-082414-image-20230919082413909.png)



![](http://img.wukaipeng.com/2023/0919-083518-image-20230919083518720.png)

密码字典是预设的密码集合，比如：

```
abcdef
qwerty
1234
12345
123456
qazwsx
```

设置响应中是否有匹配正则的字符串：

![](http://img.wukaipeng.com/2023/0920-074524-image-20230920074523478.png)

常见登录页面可爆破的情况：

- 账号+密码

```mermaid
flowchart LR
A(["1. 账号"])-->B(["可爆破"])
C(["2. 密码"])-->B
```

- 账号+密码+图形验证码

```mermaid
flowchart LR
A(["1. 账号"])-->B(["可爆破"])
C(["2. 密码"])-->B
D(["3. 图形验证码"])-->E{{"图形码是否有效，即数据包有该对象"}}
D-->F{{"登录失败图形码是否刷新"}}
E-->B
F-->B
```

- 账号+密码+短信验证码

```mermaid
flowchart LR
A(["1. 账号"])-->B(["可爆破"])
C(["2. 密码"])-->B
D(["3. 短信验证码"])-->E{{"是否可短信轰炸，即后台没有限制短信验证码发送数量"}}
E-->B
D-->F{{"是否可以验证码枚举，比如四位验证码也就 10,000 种可能性"}}
F-->B
```





爆破的关键点在于<u>控制变量</u>。



## Repeater

多次重放请求。

![](http://img.wukaipeng.com/2023/0921-072924-image-20230921072924210.png)















