### Title

```txt
[プログラミング] Deno v1.0を使ってTypeScriptでREST APIサーバーを作る方法
```

### Schedule

19-6-2020 14:00 (GMT+0900) Tokyo

### Shareable Link

Part 1: https://youtu.be/5sPiwOllJoQ
Part 2: https://youtu.be/3hVy_yh7Fco

### Thumbnail (max 4 words)

- Deno v1.0
- TypeScript
- REST API

### Description

```txt
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

```

### Tags

- Deno
- TypeScript
- REST API

### End Screen

Part1: https://youtu.be/5sPiwOllJoQ
