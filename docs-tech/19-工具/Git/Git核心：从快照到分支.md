---
slug: /git/snapshot
---



## 快照概念

首先先阅读 [https://www.zhihu.com/question/20374919](https://www.zhihu.com/question/20374919)“木头龙”的回答
1. 快照是什么？
**快照 Snapshot**: 某一时刻数据的状态
2. 为什么要快照？
	1. 快
	2. 记录
3. 快照的实现
快照通过记录逻辑地址的位置，进而记录物理地址，由于逻辑地址较少，因此生成的快照又快又小

读“木头龙”回答的几个注意点：
1. 为什么需要锁定物理单元内容？
>![在这里插入图片描述](http://img.wukaipeng.com/2023/12/01-184743-YfrJNw-watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NhcDIyMDU5MA==,size_16,color_FFFFFF,t_70.png)

对物理单元内容上锁，其他应用就不能执行写操作，这样做的目的有：
一、可以在保存快照的时候，内容不会被改变；
二、锁定后，对该物理单元内容的改变将会在新的地址进行

2. 快照地址跟物理单元是分不开的

>![在这里插入图片描述](http://img.wukaipeng.com/2023/12/01-184812-3AmOsL-watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NhcDIyMDU5MA==,size_16,color_FFFFFF,t_70-20231201184812160.png)
>
>
>
>![在这里插入图片描述](http://img.wukaipeng.com/2023/12/01-184822-grJZnj-watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NhcDIyMDU5MA==,size_16,color_FFFFFF,t_70-20231201184822313.png)

可以看到快照地址和物理单元内容是分不开的，也就是说，生成的快照和原文件是存放在一起的
> 这里就是快照和备份的一个区别了，备份和原文件是独立的，而快照和原文件是息息相关的。

## Git 的快照流
如果你理解了上一节，那么对于 Git 就明白许多了，在 Git 之前的版本控制做的更多的是一个对变化的文档进行备份，每次消耗的时间和空间比较大，而 Git 做的是一个快照，消耗较少，所以这也就是为什么说 Git 版本控制下的文件是一个 ** 快照流（*stream of snapshots*)** 了


![在这里插入图片描述](http://img.wukaipeng.com/2023/12/01-184839-J8kXBq-watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NhcDIyMDU5MA==,size_16,color_FFFFFF,t_70-20231201184838930.png)

## Git 的分支
当你理解完快照和 Git 的快照流之后，继续看 Git 官方文档，了解关于分支的这一块 [https://Git-scm.com/book/zh/v2/Git-% E5%88%86% E6%94% AF-% E5%88%86% E6%94% AF% E7% AE%80% E4% BB%8 B](https://Git-scm.com/book/zh/v2/Git-% E5%88%86% E6%94% AF-% E5%88%86% E6%94% AF% E7% AE%80% E4% BB%8 B)