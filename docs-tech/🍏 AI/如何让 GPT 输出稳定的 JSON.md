---
slug: /ai/output-json
---

如何让 GPT 输出稳定的 JSON 结构是一个常见的需求，根据   [@宝玉老师](https://weibo.com/1727858283/NhkVKolQ8) 的提示，发现除了用 function calling，还可以用 TypeScript 去做限制，稳定输出 JSON 结果。

比如在下面这段 prompt 中，我希望 LLM 识别用户的输入，并提取其中用户名、性别、出生日期和个人介绍，最后结果输出 JSON：

```
你叫做“妙妙”，是一款叫做“妙语笔记”的智能助手，接下来你会分析下面用户的输入：
"""
我的称呼是吴楷鹏，可以叫我大帅哥，出生于香港回归的那一年，生日是 3 月 13 号，喜欢上班
"""
设定：
1. 现在是 2025.10.01 21:21，时区是 Asia/Shanghai
2. 提取昵称、性别、出生日期，剩余全部信息整理成个人介绍
3. 要求输出结构化 JSON 对象，符合下面 TypeScript：
interface UserInfo {
  nickname?: string;
  gender?: 'male'  | 'female';
  dataOfBirth?: string;
  bio?: string;
}
4. 这是例子：const userInfo = {
    "nickname":"董小姐",
    "gender": "female",
    "dateOfBirth":"2001-03-07",
    "bio": "家住在长沙，喜欢做饭"
}

接下来开始分析：const userInfo=
```

这里使用 `interface` 这样的 TypeScript 语法限定输出的 JSON 对象，并且给出少量样例学习 few-shot，GPT4 稳定输出结果不带一丝废话：

```
{
"nickname": "大帅哥",
"gender": "male",
"dateOfBirth": "1997-03-13",
"bio": "我叫吴楷鹏，出生于香港回归的那一年，喜欢上班。"
}
```

而对于 GPT3.5-turbo，测试十几轮下来，也是稳定输出 JSON 不带任何废话。

给到文心一言，输出结果带了一些杂质：

```
json
{  
  "nickname": "大帅哥",  
  "gender": "male",  
  "dateOfBirth": "1997-03-13",  
  "bio": "喜欢上班"  
}```
```

智谱的 chatglm_pro 废话就比较多了：

````
根据您提供的信息，我为您生成了一个结构化 JSON 对象：
```typescript
const userInfo = {  
 "nickname": "吴楷鹏",  
 "gender": "male",  
 "dateOfBirth": "1997-03-13",  
 "bio": "喜欢上班"  
};  
```
请注意，我在分析时发现您提到了“出生于香港回归的那一年”，根据您给出的日期（3 月 13 号），这一年应该是 1997 年。因此，我在生成的 JSON 对象中，将出生日期设置为 1997-03-13。现在，这个对象符合您所提供的 TypeScript 接口要求。
````

讯飞星火就更离谱：

````
解析：
1. 首先，我们需要从输入的文本中提取出昵称、性别、出生日期和生日。
2. 然后，我们需要将这些信息整理成一个个人介绍的文本。
3. 最后，我们需要将这个个人介绍转换为一个结构化的JSON对象。

代码如下：

```
const text = `我的称呼是吴楷鹏，可以叫我大帅哥，出生于香港回归的那一年，生日是 3 月 13 号，喜欢上班`;

// 提取昵称、性别、出生日期
const nicknameMatch = text.match(/可以叫我(.*?)，/);
const genderMatch = text.match(/(.*?)，/);
const birthDateMatch = text.match(/出生于(.*?)，/);
const birthdayMatch = text.match(/生日是 (.*?) 号，/);

// 整理成个人介绍
let bio = "";
if (nicknameMatch) {
  bio += "昵称：" + nicknameMatch[1] + "，";
}
bio += "性别：" + genderMatch[1] + "，";
bio += "出生日期：" + birthDateMatch[1] + "，";
bio += "生日：" + birthdayMatch[1];
bio += "，";
bio += "剩余全部信息整理成个人介绍";

// 输出结构化 JSON 对象
const userInfo: UserInfo = {
  nickname: nicknameMatch && nicknameMatch[1] || "",
  gender: genderMatch && genderMatch[1] || "",
  dataOfBirth: birthDateMatch && birthDateMatch[1] || "",
  bio: bio,
};
console.log(userInfo);
```
````

国产大模型任重而道远。
