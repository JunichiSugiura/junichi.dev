---
title: GitHub デフォルトbranchをmasterからmainに変更する方法と"理由"
videoId: GRL-kF088Y0
date: "2020-06-26"
spoiler: Githubのチュートリアル
cta:
  - React
  - GitHub
---

## この発表至るまでの経緯

今月 11 日に Google Chrome の developer である Una Kravet さんが@github をメンションに含んで従来のデフォルトのブランチ名を"master"から"main"に変えてもいいよとの趣旨のツイートを投稿しました。

https://twitter.com/Una/status/1271180494944829441

理由としては、

- 文字数が少なくなる
- master より覚えやすい
- 黒人の一人でも tech コミュニティーから阻害されていると感じる人がいるならやるべき

といったことが挙げられています。

翌日 12 日に GitHub の CEO である Nat さんがこの tweet に賛同し、これから GitHub 全社を上げて”master”ブランチをよりニュートラルな表現に変更することを発表しました。

https://twitter.com/natfriedman/status/1271253144442253312

そこで候補として"main"というワードが上がりました。

## 実際に変更してみた

そんなにブランチ名を変更すること自体に難しいステップではありませんが、サクッとデフォルトブランチの変更方法をお伝えしていきたいと思います。

それでは一緒に変更していきましょう。順序はこのようになります。

- ローカルで main branch を作成して checkout
- ローカルの main branch を remote に push
- 既存の Pull Request 全ての base branch を main に変更
- GitHub の設定から default branch を main に変更
- remote から"master" branch を削除

詳しくみていきましょう。

### ローカルで main branch を作成して checkout

以下のコマンドで、新しく main というブランチを作成し、そこに checkout することができます。一応"git brach"コマンドで確認することもできます。

```console
git checkout -b main
git branch
```

### ローカルの main branch を remote に push

次にローカルのリポジトリを先ほど作った remote リポジトリに push していきます。

```console
git push origin main
```

### 既存の Pull Request 全ての base branch を main に変更

Pull Request がすでにある場合は、それに飛んでマージされるはずのブランチを main に変更しておきましょう。

### GitHub の設定から default branch を main に変更

今後も main をデフォルトのブランチとして使用していくために、github のサイトの設定から該当のリポジトリのデフォルトブランチを変更していきます。
![変更画面](./picture2.png)

### remote から"master" branch を削除

最後にもうこれから使用しなくなる従来の master ブランチを削除しましょう。まずはローカルで master ブランチを削除してそれをリモートにも反映していきます。

```console
git branch -d master
git push -d origin master
```

## そもそもなぜデフォルトのブランチ名に"master"が使われるのか
