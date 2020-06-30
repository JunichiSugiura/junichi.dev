---
title: [GitHub] デフォルトbranchをmasterからmainに変更する方法と"理由"
description: >
  今回はサクッとGitHubのデフォルトブランチを"mater"から"main"への変更する方法を紹介します。アメリカを中心に広がっている"Black Lives Matter"活動は、テック業界やエンジニア界隈でも様々なことを見直すきっかけになっています。その背景や他のテック企業の取り組みを知りながら、自分でも気軽にできるGitHubのチュートリアルです。

  ------------- 📌 Chapters -------------
  0:00 イントロ
  0:11 発表に至るまでの経緯
  1:09 GitHubでのbranch変更チュートリアル
  4:08 なぜそもそもデフォルトで"master"が使われているの？
  4:45 "Black Lives Matter"について
  5:50 "Black Lives Matter"に対してのテック業界の反応
  8:13 批判の声
  8:38 個人的な見解

  #BlackLivesMatter
thumbnailKeywords: 
  - GitHub
  - master -> main
  - 変更方法と"理由"
tags:
  - GitHub
  - BlackLivesMatter
  - チュートリアル
  - ニュース
  - 時事
link: https://youtu.be/GRL-kF088Y0
publishedAt: 2020-06-26 05:00:00
playlists:
  - Tutorials
endScreen:
  elements:
    - "Video: Best for viewer"
    - "Subscribe: Junichi"
sns: 
  post: "Black Lives Matter"はテック業界やエンジニア界隈でも様々なことを見直すきっかけになっています。今回はその背景や実際の取り組みを紹介します。#GitHub の取り組みでもあるbranch名を"master"から"main"に変更する作業を実際にやってみました💻#プログラミング
  twitter: https://twitter.com/JunichiSugiura/status/1276462715918258176?s=20
---

### Outline

先日GitHubのCEOであるNat Friedman氏が従来"master"と呼ばれていたデフォルトブランチを"main"と改名すると発表して、話題になりました

#### この発表至るまでの経緯

今月11日にGoogle ChromeのdeveloperであるUna Kravetさんが@githubをメンションに含んで従来のデフォルトのブランチ名を"master"から"main"に変えてもいいよとの趣旨のツイートを投稿

https://twitter.com/Una/status/1271180494944829441

理由としては、

- 文字数が少なくなる
- masterより覚えやすい
- 黒人の一人でもtechコミュニティーから阻害されていると感じる人がいるならやるべき

といったことが挙げられています。

翌日12日に先ほど紹介知ったGitHubのCEOであるNatさんがこのtweetに賛同し、これからGitHub全社を上げて”master”ブランチをよりニュートラルな表現に変更することを発表。

https://twitter.com/natfriedman/status/1271253144442253312

候補として"main"というワードが挙がる。

#### Tutorial

そんなにブランチ名を変更すること自体に難しいステップではありませんが、ちょうどこのチャンネルでも使っている`tutorials`repogitoryがあるので、それを使って皆さんにもサクッとデフォルトブランチの変更方法をお伝えしていきたいと思います。

それでは一緒に変更していきましょう。

- ローカルでmain branchを作成
- mainにcheckout
- ローカルのmain branchをremoteにpush
- 既存のPull Request全てのbase branchをmainに変更
- GitHubの設定からdefault branchをmainに変更
- remoteから"master" branchを削除

はい、という訳でチュートリアルの方いかがだったでしょうか？

#### そもそもなぜデフォルトのブランチ名に"master"が使われるのか

tech業界では歴史的に"master/slave"という概念を使うことが多く、

メインのシステムやソースのことを業界用語で"master"と呼び、それのコピーや"master"がコントロールするプロセスのことを"slaves"と表現してきた背景がある。

https://en.wikipedia.org/wiki/Master/slave_(technology)

これはtech業界に限った話ではなく音楽業界や映像業界でもこれらの言葉が一般的に使われて来ました。

例えば僕もYouTubeの動画編集をしている時に最終的にプラットフォームにアップロードするファイルを書き出すことを"mastering"と言ったりします。

ただ最近の"Black Lives Matter"や"Blackout Tuesday"など黒人差別に対する抗議やムーブメントが加熱する中、

こうした人種差別に関連する業界用語への疑問視をする声がたくさん上がってきた。

例えばGoogle Chromeの元となるchromiumというプロジェクトがあるんですが、その中の規約には男女差別や人種差別に関連するワードをソースコードやドキュメントから排除するように促すルールが存在しています。

https://chromium.googlesource.com/chromium/src/+/master/styleguide/inclusive_code.md#racially-neutral

例えば、英語では一般的に"his/her"等のgender表現を使うことがよくありますが、今の世の中ではそれらの言葉に当てはまらないケースも認知され始めているので、自分以外の人達を表現するワードとして、"everyone", "folks", "people"などの表現を使うよう定められています。

<!-- ”男女”と表現した場合も男性を表す言葉が女性の前に来ていることから推奨されていません。 -->

また"blacklist", "whitelist"などもblackは悪者、whiteは正義と捉えられることから、"blocklist", "allowlist"と表現するよう決められています。

実際にchromiumのソースコードで"blacklist"と検索した結果、778件ヒットしたため、どこまでこの規約が徹底されているのかは正直わかりませんが、コミュニティーとしての努力は見ることができます。

https://github.com/chromium/chromium/search?q=blacklist&type=Code

#### これらのムーブメントに対するTech業界での動き

も興味深いので紹介しておくと

Twitter

- 先日George Floyedさんという黒人男性が、白人警官に執拗に拘束されて、死亡するという事件が発生した
- 全米各地でdemoが起こった
- これがコロナの影響で外出禁止されていた世間のストレスとも合わさってじわじわ加熱していき、最終的に警察との激しい衝突に発展した
- Trumpがdemo参加者に対して"THUGS"と呼ぶ
- さらに、"略奪が始まったら発砲が始まる"というtweetを残す
- これに対してTwitter側は"暴力を美化している"発言はプラットフォームの規約に反するとして、Trump氏に警告を発した
- これによってユーザーは意図的にこのツイートをクリックしないと文章が表示されない仕様になる。
- またlikeやreplyもできなくなった

https://i.guim.co.uk/img/media/01cd2598194e1315662236f6c3f6f81ad2d3f7f3/51_0_950_570/master/950.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=bf0b3215845cb402d69c0e615dcc9d4b

Facebook

- これに対してFacebookはTrump氏の同様の投稿に対して、アクションを取らない方針を発表
- これに反発したReact Core Teamを始めとするFacebookの従業員はストライキを実行
  - https://twitter.com/dan_abramov/status/1267544361929256966
- コロナの自宅謹慎期間なので、オンライン上で実行された
- Dan Abramovを始めとするFacebookの従業員もTwitter上で転職を考えていることを示唆したり、実際にFacebookを退職した人もいる
- その後Reactの公式サイトでも"Black Lives Matter"というメッセージとともにNPO団体への寄付を促すリンクがトップページに表示されるようになる
  - https://reactjs.org/
- React Nativeの公式サイトにも同様のバナーが表示される
  - https://reactnative.dev/

Reddit, Revolutを始めとするTech企業も自社アプリのロゴを白黒に変更

https://github.com/JunichiSugiura/youtube-planning/issues/13#issuecomment-647977417

GitLabもGitHubに追随して同様の措置を実行

https://twitter.com/gitlab/status/1271493916580249606

#### 批判の声

- 特にこれらに差別を感じない
- 今一度取り上げる事自体が差別
- 他業界との共通概念でもあるため、混乱を起こす
- 差別への根本的な解決にはつながらない

#### 個人的な見解

正直自分が差別をされている当事者ではないので、branch名を"main"に変えることでどこまで差別をなくすことができるのかわかりませんが、
自分にできることはやっておきたいし、typingも減るので、自分が参加しているrepositoryのでdefault branch名は全て"main"に変更していこうと思っています。

日本で生活しているとそこまで人種問題に触れるケースは多くないかと思うのですが、僕を含めてエンジニアの方たちはソースコードを通して世界とやりとるする機会もあるかと思うので、ぜひその際には意識して、自分のできることから取り組んでみるといいのではないでしょうか。

次回はエンジニアが海外進出するメリットに関して話していこうと思うので、興味のある方はぜひチャンネル登録の方宜しくお願いいたします。

じゃあまたね👋
