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

- `-sS` （TCP SYN 扫描）🔥

  执行速度快。SYN 扫描比较隐蔽，因为它不会完成 TCP 连接。

- `-sT` （TCP connect() 扫描）🔥

  当 SYN 扫描不可用的时候，TCP connect() 就是默认的扫描选项。它调用 connect() 系统连接。效率比较低，会留下痕迹。

- `-sU` （UDP 扫描）🔥

- `-sN; -sF; -sX` （TCP Null，FIN，和 Xmas 扫描）

- `-sA` （TCP ACK 扫描）

- `-sW` （TCP 窗口扫描）

- `-sM` （TCP Maimon 扫描）

- `--scanflags` （定制的 TCP 扫描）

- `-sl  <zombie host[:probeport]>` （Idlescan）

- `-sO` （IP 协议扫描)

- `-b` （FTP 弹跳扫描）



## 端口扫描顺序

Nmap 对端口 1~1024 以及 nmap-services 列出的更到的端口进行扫描

- `-p`（只扫描指定的端口）

  指定想扫描的端口

- `-F` （快速、有限的端口扫描）

  在 nmap-services 中指定想要扫描的端口，比扫描所有 65535 个端口快得多。

- `-r` （按照顺序进行扫描）

  默认情况下，Nmap 随机扫描（常用端口先扫，提高效率），该选项指定 Nmap 顺序扫描



## 服务和版本探测

- `-sV` （版本探测）🔥

  打开版本探测，也可以用 `-A` 同时打开 OS 探测和版本探测

- `-allports` （不跳过任何端口）🔥

- `--version-intensity` （设置版本扫描强度）

- `--version-light` （打开轻量级模式）

- `--version-all` （尝试每个探测）

- `version-trace` （跟踪版本扫描活动）

- `-sR` （RPC 扫描）



## 操作系统探测

- `-O` （启动操作系统检测）🔥
- `--osscan-limit` （针对指定的目标进行操作系统检测）
- `--osscan-guess;-fuzzy` （推测操作系统检测结果）

## 时间和性能

- `-T <Paranoid | Sneaky | Polite | Normal | Aggresive | Insane>` 设置时间模板

  前两种用户 IDS 躲避。Polite 降低扫描速度以及使用更少的带宽和目标主机资源。Normal 未做任何优化。Aggressive 加速扫描。Insane 最快速的扫描。



## 防火墙/IDS 躲避和欺骗

> IDS *Intrusion Detection System* 入侵探测系统

- `-f`（报文分段）；`--mtu`（使用指定的 MTU）🔥

  使用小点 IP 包分段，让包过滤器、IDS 以及其他工具扫描更加困难。

- `-D <decoy1[, decoy2][, ME], ...>` （使用诱饵隐蔽扫描）

- `-S <IP_Address>` （源地址欺骗）🔥

  让目标以为是另一个地址在进行扫描。

- `--source-port; -g` （源端口欺骗）🔥

- `--data-length`（发送报文时附加随机数据）🔥

- `--ttl` （设置 IP time-to-live 域）

- `--randomize-hosts` （对目标主机的顺序随机排列）

- `--spoof-mac <mac address, prefix, or vendor name>` （MAC 地址欺骗）🔥

## 输出

Nmap 提供 5 种不同的输出格式。

- `-oN` （标准输出）
- `oX`（XML 输出）
- `-v` （提高输出信息的详细度）
- `-d [level]` （提高或设置调试级别）



## 其他

- `-6`（启动 IPv6 扫描）



## 实例

```bash
# 扫描 scanme.nmap.org 中所有的保留 TCP 端口，选项 -v 启用细节模式
nmap -v scanme.nmap.org

# 进行秘密 SYN 扫描，对象为主机 scanme 所在的“C 类”网段的 255 台主机。同时尝试确定每台工作主机的操作系统类型。
nmap -sS -O scanme.nmap.org/24

# 进行主机列举和 TCP 扫描。对象为 B 类 198.116 网段中 255 个 8 位子网。用户确定系统是否运行了 sshd、DNS、imapd 或 4564 端口。如果这些端口打开，将使用版本检测来确定哪些应用在运行。
nmap -sV -p 25,53,110,143,4564 198.116.0-255.1-127
```























