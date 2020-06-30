---
title: [プログラミング] Deno v1.0を使ってTypeScriptでREST APIサーバーを作る方法
description: >
  今回のチュートリアルではDeno v1.0、TypeScript、oakフレームワークを使ってTodoリストを管理するための簡単なREST APIを作っていきます。
  Denoの使い勝手、Node.jsとの違いなどを説明とプログラミングを通して伝えています。
  プログラミング学習、仕事に活用頂けたら幸いです。

  ----- 📝 詰まったらこちらを参考にしてみてください -----
  チュートリアルのソースコード: https://github.com/JunichiSugiura/tutorials/tree/master/deno-rest-api
  denoの公式サイト・インストール方法: https://deno.land
  oak: https://deno.land/x/oak
  denon: https://deno.land/x/denon
  colors: https://deno.land/std/fmt/colors.ts
  uuid: https://deno.land/std/uuid
  REST Client (VSCode Extension): https://marketplace.visualstudio.com/items?itemName=humao.rest-client

  * コメント欄での質問もお待ちしてます!

  Part 1
  0:00 Denoの概要紹介
  3:33 Tutorial イントロ
  3:50 Denoのインストール方法
  4:23 プロジェクトディレクトリの作成
  5:12 Oakサーバー
  8:19 Networkへのアクセス権限
  9:03 環境変数の使い方
  10:36 std/fmt/colorsモジュールを使ってログをフォーマット
  12:26 depsモジュール作成
  13:58 GET / handler実装
  15:17 REST Client VSCode Extension
  16:19 routerモジュールの実装
  17:17 Status enum
  18:19 loggerの実装・middlewareの作り方
  22:06 error handlerの実装
  25:34 root handlerの実装
  27:31 todo handlerのgetAllを実装
  29:40 データベースとしてJSONファイルを扱う
  30:44 readFileを使ってJSONファイルを読み込む
  34:01 todo modelのgetAllを実装
  36:39 denonを使ってファイルを監視・再実行

  Part 2はこちら: https://youtu.be/3hVy_yh7Fco

  Part 1はこちら: https://youtu.be/5sPiwOllJoQ

  Part 2
  0:00 イントロ
  0:20 todo modelのgetを実装、 配列からMapへの変換
  5:23 todo modelのcreateを実装、std/uuidの使い方
  10:21 todo modelのupdateを実装
  13:21 todo modelのremoveを実装
  15:30 todo handlerのgetを実装、Paramsの取得方法
  21:30 todo handlerのcreateを実装
  22:21 todo handlerのupdateを実装
  23:21 todo handlerのremoveを実装
  24:34 残りのrouter実装
  25:40 REST Clientを使って実装したAPIを呼んでみる
  30:54 まとめ

  #毎週金曜日午後２時に投稿してるのでチャンネル登録してね！
thumbnailKeywords: 
  - Deno v1.0
  - TypeScript
  - REST API
tags:
  - Deno
  - TypeScript
  - REST API
link: 
  - https://youtu.be/5sPiwOllJoQ
  - https://youtu.be/3hVy_yh7Fco
publishedAt: 2020-06-19 05:00:00
playlists:
  - Tutorials
endScreen:
  elements:
    - "Video: https://youtu.be/3hVy_yh7Fco"
    - "Video: Best for viewer"
    - "Subscribe: Junichi"
sns: 
  post: >
    今週はDenoを使ったチュートリアル動画を投稿してみました！
    Part 2もアップロード中なのでお楽しみに。
    ADSL回線だとなかなか大変😅
  twitter: https://twitter.com/JunichiSugiura/status/1273863846340460545
---

### Intro

先日、5 月 14 日についに Deno v1.0 がリリースされました 🎉

Deno は一言でいうと V8 と Rust を使って作られた JavaScript と TypeScript 用のシンプルでモダン、そして安全な runtime です。

一言になってましたかね？w

実は`Node.js`のクリエーターとして有名な`Ryan Dahl`によって作られていて、彼が node を開発していく中で取り返しのつかなくなった後悔とか反省点を踏まえて、新たに 2018 年から開発されています。

この反省点に関して Ryan 自信が 2018 年の JSConf で実際に話している動画があるので、興味のある方は概要欄より見てみてください。

https://youtu.be/M3BM9TB-8yA

彼は JS 界隈ではかなり偉大な存在で、もし彼いなかったらここ 10 年の凄まじい JavaScript の進化・普及はなかったかもしれません。

これは全然関係ないですけど、Ryan が初めて Node を世界に紹介した時と言われている動画も YouTube に上がっていて、この時に比べると、本人かなり垢抜けてないですか？ｗ T シャツとか髪型いい感じですよね。

https://youtu.be/ztspvPYybIY

#### Deno の特徴

では Deno の特徴をざっくり紹介していきます。

##### Secure by default

まず１つ目の特徴は、Deno ではよりセキュアにするために、ファイルだったり、ネットワーク、あと環境変数といったものへのアクセスがデフォルトでは無効になっています。プログラムに必要な部分だけ allow フラグを渡すことによって実行時のアクセスが可能になります。

##### Supports TypeScript out of the box

2 つ目。
Deno は JavaScript と TypeScript 両方をデフォルトでサポートしています。
Deno を一旦インストールしてしまえば、TypeScript コンパイラーとか babel といったツールを用意する必要はありません。

##### Ships only a single executable file

3 つ目の特徴は、Deno で作った module は最終的に１つの実行可能なファイルとしてデプロイされるので、従来のように webpack だったり parcel といった bundler を使う必要はもうありません。

##### Standard modules

4 つ目。
Deno には standard library が付随してるんですが、これはしっかり監査が通っていて、確実に Deno で動くことが保証されています。JavaScript には存在してるけど実際にプロダクションコードでは使いたくない API って結構ありますよね。これによって、moment とか BigNumber といった third party モジュールはもう必要なくなるかもしれません。

##### Third Party Modules

5 つ目。
node では基本的に npm と require syntax を通して third party module をインストールしていたんですが、Deno では これが ES module syntax に代わって web のどこからでも import することが可能になりました。Go の様に GitHub から直接 import したりとか、jspm のような CDN からも 直接 import することができます。deno.land という Deno の公式サイトがあるんですけど、そこにも public hosting が可能な機能が用意されているので、実際はここから配布していくパターンが一般的になるのではないかと思っています。

##### Promises All The Way Down

6 つ目。
ここからは内部的な話になるのですが、Node で使われていた EventEmitter に代わって、非同期処理を挟む API は全て Promise を返します。async/await と組み合わせればかなりスッキリとしたコードになるうえに、内部的には flooding issue だったりがシンプルに解決されて、少ないコードでより効率よく動くようになりました。

##### Rust APIs

最後に Deno は内部で Rust を使用して c++で書かれた v8 の API をバインドしているんですけど、これによって、Rust の Future なんかも JavaScript の Promise に簡単にバインドできるみたいです。ちなみに最初 Ryan が書いたプロトタイプは実は Go で実装されていたんですけど、Go も JavaScript と同じで Garbage Collector によって runtiem でメモリーの管理がされるので２つの GC を組み合わせることによって起こりそうなバグを未然に防ぐために コンパイル時にメモリの管理が決まる Rust で書き直されたみたいです。

ここまでが Deno のざっくりした紹介なのですが、まあ説明聞いてるだけだとしっくりこないところもあると思うので今回は例として簡単な REST API サーバーを作っていこうと思います。
では一緒にコーディングしていきましょう。

### Tutorial

今回は oak という サードパーティーモジュール を使って簡単な Todo List を管理するための REST API サーバーを作っていこうと思います。一応完成したコードを GitHub の方に上げてあるので、もし途中で詰まってしまった場合は概要欄よりチェックしてしてみてください。あと質問などあったらコメントいただければできるだけお返事していきます。

- deno のインストール
- プロジェクトの directory を作る
- server.ts // console out "Hello"
- deps.ts (oak module を import)
- GET / を実装
- denon をセットアップして file の変更を watch + rebuild

はい、と言う訳で、ここまで前半どうでだったでしょうか？まだついて来てますでしょうか？僕は一旦疲れてしまったので、お昼を食べてコーヒーを補充して来ました！

では気を取り直して後半戦もがんばってコード書いてきましょう！

ここからは開発のスピードを上げるために、一旦モデルから全部必要な function を書いていこうと思います。

### Ending

いかがだったでしょうか？個人的には Node よりかなりシンプルになった上に、さらに Go とか Rust といった後発の言語のいいところを吸収していて、かなり魅力的なワークフローが実現されたんじゃないかなぁって思います。とはいえ Node のエコシステムは偉大でかなりのモジュールが動いているので、これからどれだけ Deno に移行してくるのかなぁっていうのが気になります。

じゃあまた次の動画で 👋
