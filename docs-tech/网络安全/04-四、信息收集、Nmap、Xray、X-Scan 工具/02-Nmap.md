---
slug: /net-security/04/02
---

Nmap *Network mapper* 开源的网络探测和安全审核的工具，该工具设计主要是为了分析网络主机、服务和弱点。能力包括：

- 端口扫描。包括 TCP、UDP、SYN 还有其他。
- 服务探测
- 操作系统指纹
- 脚本引擎：Nmap 提供了一个叫做 NSE（Nmap Scripting Engine，Nmap 脚本引擎），能够执行用户自定义的脚本。
- 弱点探测
- 高性能和伸缩性：高效扫描大型网络
- 灵活的输出：Txt、XML 等
- 跨平台

```bash {1}
→ nmap -A -T4 scanme.nmap.org
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-03 21:01 HKT
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.16s latency).
Other addresses for scanme.nmap.org (not scanned): 2600:3c01::f03c:91ff:fe18:bb2f
Not shown: 996 closed tcp ports (reset)
PORT      STATE    SERVICE    VERSION
22/tcp    open     ssh        OpenSSH 6.6.1p1 Ubuntu 2ubuntu2.13 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   1024 ac:00:a0:1a:82:ff:cc:55:99:dc:67:2b:34:97:6b:75 (DSA)
|   2048 20:3d:2d:44:62:2a:b0:5a:9d:b5:b3:05:14:c2:a6:b2 (RSA)
|   256 96:02:bb:5e:57:54:1c:4e:45:2f:56:4c:4a:24:b2:57 (ECDSA)
|_  256 33:fa:91:0f:e0:e1:7b:1f:6d:05:a2:b0:f1:54:41:56 (ED25519)
80/tcp    filtered http
9929/tcp  open     nping-echo Nping echo
31337/tcp open     tcpwrapped
Device type: general purpose|WAP|storage-misc|media device|webcam
Running (JUST GUESSING): Linux 5.X|2.6.X|4.X (92%), Ubiquiti embedded (90%), HP embedded (89%), Infomir embedded (88%), Ubiquiti AirOS 5.X (88%), Tandberg embedded (88%)
OS CPE: cpe:/o:linux:linux_kernel:5.0 cpe:/o:linux:linux_kernel:2.6.32 cpe:/h:ubnt:airmax_nanostation cpe:/h:hp:p2000_g3 cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:2.6 cpe:/h:infomir:mag-250 cpe:/o:ubnt:airos:5.5.9
Aggressive OS guesses: Linux 5.0 (92%), Linux 5.0 - 5.4 (92%), Ubiquiti AirMax NanoStation WAP (Linux 2.6.32) (90%), HP P2000 G3 NAS device (89%), Linux 4.15 - 5.8 (89%), Linux 5.1 (89%), Linux 5.3 - 5.4 (89%), Linux 2.6.32 (89%), Infomir MAG-250 set-top box (88%), Linux 5.0 - 5.5 (88%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 19 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 80/tcp)
HOP RTT       ADDRESS
1   ...
2   0.47 ms   10.67.4.9
3   ...
4   0.86 ms   10.67.4.9
5   0.77 ms   10.67.4.24
6   ... 9
10  1.54 ms   172.21.161.62
11  4.04 ms   d1-161-230-143-118-on-nets.com (118.143.230.161)
12  4.35 ms   202.84.153.53
13  6.65 ms   unknown.telstraglobal.net (210.57.81.45)
14  155.77 ms i-92.eqnx03.telstraglobal.net (202.84.247.17)
15  157.64 ms i-10852.eqnx-core02.telstraglobal.net (202.84.140.2)
16  155.74 ms i-92.eqnx03.telstraglobal.net (202.84.247.17)
17  ... 18
19  154.28 ms scanme.nmap.org (45.33.32.156)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 30.10 seconds
```

- `-A` 开启操作系统探测，版本探测，脚本扫描，以及 traceroute（追踪路由）
- `-T<0-5>` 数字越快，扫描越快







## 主机发现

主机发现，也叫做 Ping 扫描，指从网络中寻找活跃主机的过程。

- `-sL` 列表扫描。

  仅仅列出指定网络上的每台主机，不发送任何报文到目标主机，也并不确定主机是否存活，所以扫描速度很快。默认情况下，Nmap 会对主机进行反向域名解析以获取他们的名字。

> （正向）域名解析：从一个域名解析出它的 IP 地址。
>
> 反向域名解析：从一个 IP 地址解析出它的域名。



- `-sP` Ping 扫描。

  仅进行 ping 扫描，然后输出对扫描做出响应的那些主机，没有进一步的测试（如端口扫描或者操作系统探测）。

  对攻击者来说，了解多少主机正在运行比列表扫描提供的一列 IP 和主机名往往更有价值。

  当防守严密的防火墙位于 Nmap 的源主机和目标网络之间，推荐使用那些高级选项，否则，当防火墙捕获并丢弃探测包或者响应包时，一些主机就不能被探测到。



## 端口扫描基础

端口扫描是 Nmap 的核心功能。

传统端口扫描只会列出端口是开放或者关闭的，Nmap 有更多的信息粒度，分为 6 种：

1. open

2. closed

   关闭状态也是有响应的（接受 Nmap 的探测报文并响应）但没有应用程序在其上监听。

3. filtered

   可能被防火墙过滤掉了，无法确定该端口是否开放。

4. unfiltered

5. open|filtered

   无法确定是 open 还是 filtered

6. closed|filtered

   无法确定是 closed 还是 filtered

🐼 注意：这些分类是 Nmap 定义的。



## 端口扫描技术





































