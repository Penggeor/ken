Mac M1/M2 免费好用的虚拟机应用不多，一个是 UTM，另外一个是 VMware Fusion，试过用 UTM 安装了 Windows8、Windows10，但是安装完成之后不仅卡顿，而且显示效果也不是正常的 Windows 系统，因此改用了 VMware Fusion，VMware Fusion 是收费应用，不过个人版是免费的。

首先是下载 Windows11 镜像，可以用 👉 [CrystalFetch](https://apps.apple.com/us/app/crystalfetch-iso-downloader/id6454431289)

这是一个下载器来着，非常方便，你只需要选择一下语言，点击「Download」，就开始下载了。

![](http://img.wukaipeng.com/2023/10/26-060025-image-20231026060025229.png)



整体上安装 Windows11 可以见该教程文章，写得非常详细 👉 [【全站首发】用 VMware Fusion Tech Preview 2023 安装 Windows 11 arm64 虚拟机](https://zhuanlan.zhihu.com/p/643982058)

这是安装完成之后的效果：

![](http://img.wukaipeng.com/2023/10/26-061655-image-20231026061654931.png)

下载小皮面板 PHP 和一个上传文件漏洞靶场 Upload-labs 👉 



将他们拖到 Windows11 中（注意要按照教程所说，给 VMWare Fusion 录屏权限），然后首先打开小皮面板 PhpStudy2018.exe，将他们解压到一个**没有中文、没有空格**的路径的文件夹中，解压后再文件夹中打开 phpStudy.exe：

![](http://img.wukaipeng.com/2023/10/26-073302-image-20231026073301738.png)

刚开始运行 PhpStudy.exe 会提示缺少 vc9、vc11、vc14，可以打开官方的链接网站，登录后下载，也可以从 github 这里直接下载 👉 



安装好之后解压并安装，这时重启 PhpStudy 就不会报错了，我们可以打开 phpinfo 页面查看：

![](http://img.wukaipeng.com/2023/10/26-074927-image-20231026074927396.png)

接着我们打开网站根目录：

![](http://img.wukaipeng.com/2023/10/26-075241-image-20231026075240851.png)

 把 upload-labs 文件夹移动到该目录下，这样我们在浏览器中输入 `http://localhost/upload-labs` 就能访问到了：

![](http://img.wukaipeng.com/2023/10/26-075454-image-20231026075454597.png)

当然我们也可以在主机 Mac 环境中访问得到，先在 Windows11 中打开 Terminal，用 `ipconfig` 查看 IPV4 的地址：

![](http://img.wukaipeng.com/2023/10/26-062358-image-20231026062358352.png)

然后在 Mac 中打开浏览器，访问 `http://172.16.26.128/upload-labs/`

![](http://img.wukaipeng.com/2023/10/26-075634-image-20231026075634529.png)



