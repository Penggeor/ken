---
slug: /net-security/13/05
---

## 文件系统安全

PHP 基本遵守服务器文件和目录安全机制。PHP 只能已 User 级别访问文件。

```php
<?php
// 从用户目录中删除指定的文件
$username = $_POST['user_submitted_name'];
$userfile = $_POST['user_submitted_filename'];
$homedir = "/home/$username";
unlink ("$homedir/$userfile"); // 删除文件
echo "The file has been deleted!";
?>
```

问题：

1. 目录穿越，用户输入可能是 `../../../../../etc/passwd`