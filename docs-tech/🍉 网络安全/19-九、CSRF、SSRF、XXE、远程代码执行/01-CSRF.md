---
slug: /net-security/09/01
---

跨站请求伪造（CSRF，Cross Site Request Forgery），用户登陆了网站，然后另外一个网站利用了该登录态，然后发起伪造的请求。



![](http://img.wukaipeng.com/2023/11/03-080416-image-20231103080415904.png)



CSRF 的三个关键条件：

1. 属于功能操作。比如点击修改邮箱、密码
2. 基于 Cookie。后端仅依赖 Cookie 识别验证用户
3. 参数确定。没有随机、不可预测的参数。



## DVWA 演示

### Low

打开 CSRF 模块，查看源码：

```php
<?php

if( isset( $_GET[ 'Change' ] ) ) {
    // Get input
    $pass_new  = $_GET[ 'password_new' ];
    $pass_conf = $_GET[ 'password_conf' ];

    // Do the passwords match?
    if( $pass_new == $pass_conf ) {
        // They do!
        $pass_new = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $pass_new ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
        $pass_new = md5( $pass_new );

        // Update the database
        $insert = "UPDATE `users` SET password = '$pass_new' WHERE user = '" . dvwaCurrentUser() . "';";
        $result = mysqli_query($GLOBALS["___mysqli_ston"],  $insert ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

        // Feedback for the user
        echo "<pre>Password Changed.</pre>";
    }
    else {
        // Issue with passwords matching
        echo "<pre>Passwords did not match.</pre>";
    }

    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}

?> 
```

抓包后，发现符合 CSRF 攻击的三个条件：

- 修改密码操作
- 仅用 Cookie 做校验
- 参数确定

![](http://img.wukaipeng.com/2023/11/03-084127-image-20231103084127381.png)

在同一网页下，访问 `http://175.178.126.31:8080/vulnerabilities/csrf/?password_new=234&password_conf=234&Change=Change#` 就可以修改密码

为了伪装这条链接，可以使用短链接工具 🧰 [He3 - 短链生成器](https://t.he3app.com/nvmj) 生成短链：`https://3ehapps.com/s/DSTjbX`



### Medium

之前如果是使用 `sagikazarmark/dvwa` 的镜像的话，现在改为 `citizenstig/dvwa`：

```bash
docker pull docker.io/citizenstig/dvwa
docker run -d --name c-dvwa -p 8081:80 -p 3307:3306 docker.io/citizenstig/dvwa
```

> 初始化后，账号为 `admin`，密码为 `password`

查看 CSRF 模块源码，可以看到，比 Low 源码增加了验证 `SERVER_NAME` 和 `HTPP_REFERER`

```php
<?php

if( isset( $_GET[ 'Change' ] ) ) {
    // Checks to see where the request came from
    if( eregi( $_SERVER[ 'SERVER_NAME' ], $_SERVER[ 'HTTP_REFERER' ] ) ) {
       //...
    }
    //...
}

?> 
```

> 💡 这里用 `eregi()` 函数做校验，这也是为什么用 `citizenstig/dvwa` 这个镜像的原因。这个函数用于匹配正则表达式 or 字符串匹配，不区分大小写，最新 PHP7 已经完全移除了，用 `preg_match()` 替代

绕过方法：比如目标网站是 `www.wukaipeng.com`，可以构造网站 `www.wukaipeng.com.hacker.com`，该网站包含目标网站字符串，因此可以绕过校验。







