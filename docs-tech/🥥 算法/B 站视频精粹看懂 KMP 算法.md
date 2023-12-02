---
slug: /algorithm/kmp
---

KMP 算法比较难，用文字无法表述，看完下面两个视频，对 KMP 算法就有了基础的入门：

- [天勤公开课-KMP算法易懂版](https://www.bilibili.com/video/BV1jb411V78H)
- [正月点灯笼-KMP匹配算法1](https://www.bilibili.com/video/BV1Px411z7Yo)

KMP 算法本质上是在暴力匹配之上所做的优化——利用字符串的前后缀实现下次匹配的步进。

![在这里插入图片描述](http://img.wukaipeng.com/2023/12/02-114839-PrJSne-20201009151951483.png)


KMP 最难的还是在于部分匹配表（Partial Match Table，PMT）的程序代码。

正月点灯笼up主对于求next数组讲得不太清楚，可以看[地衣芽孢杆菌-KMP算法实例详解(易懂)](https://www.bilibili.com/video/BV1S64y1u74P?from=search&seid=11914972193236888523)讲解next数组部分的视频，看完其实就会明白，其实**求 next 数组的代码过程也是一个类似 KMP 的算法**。

如此就可以编写代码了

求 next 数组：

```java
public int[] getNext(String pattern) {
        int[] next = new int[pattern.length()];
        // 控制子串的最长公共前后缀长度
        int len = 0;
        // 控制next数组的增量
        int k = 1;
        for(int i = 1; i < pattern.length(); i++) {
            // 失配的情况下
            while(pattern.charAt(i) != pattern.charAt(len) && len > 0) {
                len = next[len - 1];
            }

            // 匹配的情况下
            if(pattern.charAt(i) == pattern.charAt(len)) {
                len++;
            }

            next[k++] = len;
        }

        return next;
    }
```

求字符串：

```java
/**
     * 返回首次匹配字符串的下标，没有则返回-1
     * @param text
     * @param pattern
     * @return
     */
    public int kmpSearch(String text, String pattern) {
        int[] next = getNext(pattern);
        // i为控制text的增量， i为控制匹配串的增量
        int i = 0, j = 0;
        while(i < text.length() && j < pattern.length()) {
            // 不匹配的情况下
            if(text.charAt(i) != pattern.charAt(j)) {
                j = j == 0 ? 0 : next[j - 1];
            }

            //匹配的情况下
            if(text.charAt(i) == pattern.charAt(j)) {
                j++;
                i++;
            }
        }
        return j == pattern.length() ? i - j : -1;
    }
```
测试
```
    @Test
    public void testGetNext() {
        String pattern = "ABABCABAA";
        System.out.println(Arrays.toString(getNext(pattern)));
        String text = "ABABABABCABAAB";
        System.out.println(kmpSearch(text, pattern));
    }
    /*Output
    [0, 0, 1, 2, 0, 1, 2, 3, 1]
    4
     */
```
