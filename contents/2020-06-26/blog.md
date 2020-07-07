---
title: A[GitHub] デフォルトbranchをmasterからmainに変更する方法と"理由"
date: '2019-03-09'
spoiler: Effects are a part of your data flow.
cta: 'react'
---

先日GitHubのCEOであるNat Friedman氏が従来"master"と呼ばれていたデフォルトブランチを"main"と改名すると発表して、話題になりました。今回はサクッとGitHubのデフォルトブランチを"mater"から"main"への変更する方法を紹介します。アメリカを中心に広がっている"Black Lives Matter"活動は、テック業界やエンジニア界隈でも様々なことを見直すきっかけになっています。その背景や他のテック企業の取り組みも解説していきます。

## この発表至るまでの経緯


```jsx{6}
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
  
