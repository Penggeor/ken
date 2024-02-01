---
slug: /net-security/13/06
---

```php
<?php
$servername = "127.0.0.1:33060"; //mysql的地址
$username = "root";
$password = "root";
$dbname = "magedu";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    echo "连接成功\r";
} catch (PDOException $e) {
    echo $e->getMessage();
}
```

