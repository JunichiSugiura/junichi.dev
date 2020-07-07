---
title: GitHub デフォルトbranchをmasterからmainに変更する方法と"理由"
date: '2019-03-09'
spoiler: Githubのチュートリアル
cta: 'react, github'
---


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
  
