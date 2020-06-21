### Outline

#### なぜbranch名をmasterからmainに変えていくことになったのか

今月11日にGoogle ChromeのdeveloperであるUna Kravetさんが@githubをメンションしてdefaultのbranch名を"master"から"main"に変えてもいいよとの趣旨のツイートを投稿

理由としては、

- 文字数が少なくなる
- masterより覚えやすい
- 黒人の一人でもtechコミュニティーから阻害されていると感じる人がいるならやるべき

翌日12日にGitHubのCEOであるNat Friedmanが賛同し会社を上げて”master”ブランチをよりニュートラルな表現に変更することを発表。候補として"main"というワードが挙がる。

#### そもそもなぜデフォルトのブランチ名に"master"が使われるのか

tech業界では歴史的に"master/slave"という概念を使うことが多く、

メインのシステムやソースのことを業界用語で"master"と呼び、それのコピーや"master"がコントロールするプロセスのことを"slaves"と表現してきた背景がある。

これはtech業界に限った話ではなく音楽業界や映像業界でもこれらの言葉が業界用語として使われてきました。

例えば僕みたいなYouTuberも動画編集時に最終的にプラットフォームにアップロードするファイルを書き出すことを"mastering"と言ったりします。

ただ最近の"Black Lives Matter"や"Blackout Tuesday"など黒人差別に関する抗議やムーブメントが加熱する中、こうした人種差別を連想される業界用語への疑問視をする声がたくさん上がってくることきた。

例えばGoogle Chromeの元となるchromiumの規約には"Inclusive Chromium code"というセクションが存在していて、男女差別や人種差別に関連するワードをソースコードやdocumentationから排除するように促すルールが存在しています。

例えば、英語では一般的に"his/her"等のgender表現を使うことがよくありますが、今の世の中ではそれらの言葉に当てはまらないケースも認知され始めているので、他の人達を表現するワードとして、"everyone", "folks", "people"などの表現を使うよう定められています。

”男女”と表現した場合も男性を表す言葉が女性の前に来ていることから推奨されていません。

また"blacklist", "whitelist"などもblackは悪者、whiteは正義と捉えられることから、"blocklist", "allowlist"と表現するよう定められています。

実際にchromiumのソースコードで"blacklist"と検索した結果、778件ヒットしたため、どこまでこの規約が徹底されているのかは正直わかりませんが、コミュニティーとしての努力は感じることができます。

#### Tech業界でのこれらのムーブメントへの動き

Twitter

- Trumpがdemo参加者に対して"THUGS"と表現
- "When The Looting Starts, Shooting Starts"というtweetを残す
- これに対して"暴力を美化している"発言はTwitterの規約に反するとしてを警告を発し、ユーザーが意図的にクリックしないと法事されない仕様になる。またlikeやreplyもできなくなった

Facebook

- これに対してFacebookはTrump氏の同様の投稿に対して、アクションを取らない方針を発表
- これに反発したReact Core Teamを始めとするFacebookの従業員は"virtual walkout"を実行
- Dan Abramovを始めとするFacebookの従業員もTwitter上で転職を考えていることを示唆したり、実際に会社を退職した人もいる
- reactjs.orgでも"Black Lives Matter"というメッセージとともに"Equal Justice Initiative"へのdonationリンクをトップページに表示されるようになる
- React Nativeの公式サイトにも同様のバナーが表示される

Reddit, Revolutを始めとするTech企業も自社アプリのロゴを白黒に変更

GitLabもGitHubに追随して同様の措置を実行

#### 批判の声

- 特にこれらに差別を感じない
- 今一度取り上げる事自体が差別
- 他業界との共通概念でもあるため、混乱を起こす
- 差別への根本的な解決にはつながらない

#### 個人的な見解

正直自分が差別をされている状況ではないので、branch名を"main"に帰ることでどこまで差別をなくすことができるのかわかりませんが、
自分にできることはやっておきたいし、”main"の方がしっくりきたりtypingも減るので、自分が参加しているrepositoryのでdefault branch名は"main"に変更しようと思っています。

そんなに難しいステップではありませんが、ちょうどこのチャンネルでも使っている`tutorials`repogitoryがあるので、それを使って皆さんにもブランチの変更の仕方をお伝えしていきたいと思います。

それでは一緒に変更していきましょう。

#### Tutorial

- ローカルでmain branchを作成し、remoteにpush
- 既存のPull Request全てのbase branchをmainに変更
- GitHubの設定からdefault branchをmainに変更
- remoteから"master" branchを削除
