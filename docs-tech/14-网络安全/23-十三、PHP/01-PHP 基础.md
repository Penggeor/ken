---
slug: /net-security/13/01
---

##  安装

### Mac 下安装 PHP

```bash
# zsh 替换 brew bintray 镜像
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> 
~/.zshrc
source ~/.zshrc

# 刷新源
brew update

# 搜索 PHP 资源
brew search php
==> Formulae
brew-php-switcher    php-cs-fixer         php@8.1              phpmd                phpunit              pop
php                  php-cs-fixer@2       php@8.2              phpmyadmin           pup
php-code-sniffer     php@8.0              phpbrew              phpstan              pcp

==> Casks
eclipse-php                     phpstorm                        phpwebstudy                     pop
➜  ~ brew install php@7.4
Warning: No available formula with the name "php@7.4". Did you mean php@8.2, php@8.1 or php@8.0?
==> Searching for similarly named formulae and casks...
==> Formulae
php@8.2                                    php@8.1                                    php@8.0

To install php@8.2, run:
  brew install php@8.2
  
# 安装 php
brew install php@8.2

# 安装最后会有一些提示
To enable PHP in Apache add the following to httpd.conf and restart Apache:
    LoadModule php_module /opt/homebrew/opt/php@8.2/lib/httpd/modules/libphp.so

    <FilesMatch \.php$>
        SetHandler application/x-httpd-php
    </FilesMatch>

Finally, check DirectoryIndex includes index.php
    DirectoryIndex index.php index.html

The php.ini and php-fpm.ini file can be found in:
    /opt/homebrew/etc/php/8.2/

php@8.2 is keg-only, which means it was not symlinked into /opt/homebrew,
because this is an alternate version of another formula.

If you need to have php@8.2 first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/php@8.2/bin:$PATH"' >> ~/.zshrc
  echo 'export PATH="/opt/homebrew/opt/php@8.2/sbin:$PATH"' >> ~/.zshrc

For compilers to find php@8.2 you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/php@8.2/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/php@8.2/include"

To start php@8.2 now and restart at login:
  brew services start php@8.2
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/php@8.2/sbin/php-fpm --nodaemonize
```

安装位置

```bash
usr/bin/php
# 最新版Mac系统
/opt/homebrew/opt/php@8.0/bin/
# 配置文件位置
/opt/homebrew/etc/php/8.0/php.ini
```

配置文件位置

```bash
vim /opt/homebrew/etc/php/8.0/php.ini
```

### 安装 VSCode 插件 PHP Server

👉 [PHP Server 下载地址](https://marketplace.visualstudio.com/items?itemName=brapifra.phpserver)

创建一个 php 文件

```php
<html>
<head>
  <title>Example</title>
</head>
<body>
  <?php
  echo "Hi, I'm a PHP script!";
  ?>
</body>
</html>
```

右键 run 起来

![](http://img.wukaipeng.com/2023/12/18-084720-72iHWN-image-20231218084719595.png)

如果遇到了 `reason: Can't assign requested address`，尝试在插件设置中将 `localhost` 改为 `127.0.0.1`，因为 `localhost` 可能解析不到，所以直接用 IP 地址。

### 安装 XAMPP

XAMPP是一个集（Apache+MySQL+PHP+PERL）为一体的功能强大的建站集成软件包

👉 下载地址：[https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html)

## PHP 的作用

PHP 跨平台、支持大部分 web 服务器、很大部分数据库，它的作用有：

1️⃣ 服务端脚本。

2️⃣ 命令行脚本。只需要解释器就可以运行脚本，运行一些定时任务比较方便。



## 第一个 PHP 代码

```php
<?php
if (strpos($_SERVER['HTTP_USER_AGENT'], 'Firefox') == true) {
  echo "You are using Firefox.<br />";
} else {
  echo "You are not using Firefox.<br />";
}
```

> `$_SERVER` 是 PHP 特殊的保留变量，包含 web 的全部信息，称为「超全局变量」



## 处理表单

```php
# 4.php
<form action="4-1.php" method="post">
  <input type="text" name="name" placeholder="请输入姓名">
  <input type="text" name="age" placeholder="请输入年龄">
  <input type="submit" value="提交">
</form>
```

```php
# 4-1.php
<p>
  我今年 <?php echo $_POST['age']; ?> 岁了，我的名字叫 <?php echo $_POST['name']; ?>。
</p>
```

![](http://img.wukaipeng.com/2023/12/30-213648-x3jxWz-image-20231230213647377.png)



4-1.php 存在 XSS 漏洞，进一步修改

```php
# 4-1.php
<p>
  我今年 <?php echo htmlspecialchars($_POST['age'])  ?> 岁了，我的名字叫 <?php echo (int)$_POST['name']; ?>。
</p>
```

- `htmlspecialchars` 可以正确解析 html 实体符号
- `(int)` 可以强制转换类型



















