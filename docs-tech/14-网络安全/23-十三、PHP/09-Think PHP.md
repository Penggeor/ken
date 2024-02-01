---
slug: /net-security/13/09
---

ThinkPHP 是一个开源免费、快速简单的面向对象的轻量级 PHP 开发框架。

通过 Composer 安装 ThinkPHP，首先安装 Composer，它是 PHP 管理依赖的工具：

```bash
# 安装
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# 检查版本
composer --version
Composer version 2.6.6 2023-12-08 18:32:26

# 设置安装源为阿里镜像
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

👉 ThinkPHP 官方文档：[https://doc.thinkphp.cn/v8_0/preface.html](https://doc.thinkphp.cn/v8_0/preface.html)

> 如果安装报错需要先删除之前的镜像
> composer config -g --unset repos.packagist

创建项目并启动：

```bash
# 安装一个名为 tp 的项目
composer create-project topthink/think tp 
cd tp
# 运行项目
php think run
```

打开 `localhost:8000`

![](http://img.wukaipeng.com/2024/02/01-205447-wBqyse-image-20240201205447023.png)

ThinkPHP 是 MVC 架构，想要添加新的路由，在 `route/app.php` 中路径添加：

```php
Route::get('jike/:name', 'index/jike');
```

然后在 `app/controller/index.php` 中添加成员方法：

```php
    public function jike($name = 'ThinkPHP8')
    {
        return 'hello,' . $name;
    }
```

接着就可以访问了：

![](http://img.wukaipeng.com/2024/02/01-235347-wjbtVC-image-20240201235347741.png)

