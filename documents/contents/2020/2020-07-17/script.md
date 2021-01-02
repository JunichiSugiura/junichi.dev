---
title: Next.jsとTypeScriptを使ったモダンな技術ブログの作り方 [技術スタック・構成編]
description: >
  技術関連のことを調べる時、動画のチュートリアルを見ることもあれば、技術ブログなどを参考にすることも多いと思います。
  このチャンネルでも動画だけでなくブログという形でもいろんな人に見ていただけるよう、YouTubeに同期した技術ブログを開発することに決めました。
  今回は、その技術ブログを作っていくにあたって考慮した技術やツール、そして実際に使っていくツール・言語を紹介します 💻

  #毎週金曜配信 #技術ブログ #Nextjs

  ------------- 📌 Chapters -------------
  0:00 イントロ
  0:29 従来のポピュラーな実装方法
    - WordPress
    - サーバーサイドアプリケーション
    - シングルページアプリケーション
  3:28 JAMStack
  5:27 Next.js vs Gatsby
  7:16 今回使用する技術スタック
    - TypeScript
    - React
    - Next.js
    - MDX
    - Theme UI
    - ESLint + Prettier
    - GitHub Actions
    - Vercel

  # ----------- 🔔 チャンネル登録はこちらから -----------
  # https://www.youtube.com/channel/UC9IdI7wrSz9S3y5QxHvFseg?sub_confirmation=1
  # 今後もエンジニアに欠かせない情報、ワクワクする情報を発信していくので、
  # 通知を受け取りたい方はぜひ！

  # -------------📱 SNSはこちらから -------------
  # Twitter: https://twitter.com/JunichiSugiura
  # GitHub: https://github.com/JunichiSugiura
  # Instagram: https://www.instagram.com/junichisugiura_

  # ---------- 💁‍♂️ 自己紹介 ----------
  # エンジニア・OSS コントリビュータ
  # 現在はフランスのパリに住んでいます。
  # 普段は暗号通貨のハードウェアウォレットを作っています。
  # みなさんの暗号資産をできる限り安全に管理できるようにするのが仕事です。
thumbnailKeywords:
  - Nextjs
  - Gatsby
  - 🤔?
tags:
  # - プログラミング
  # - エンジニア
  # - プログラマー
  # - 開発
  # - 学習
  # - テック
  # - 海外就職
  # - キャリア
  - ブログ
  - TypeScript
  - React
  - Nextjs
  - MDX
  - ThemeUI
  - ESLint
  - Prettier
  - GitHub Actions
  - Vercel
  - 技術スタック
link: https://youtu.be/\<video-id\>
publishedAt: YYYY-MM-DD 05:00:00
playlists:
  - Next.jsで作る技術ブログ [チュートリアル]
endScreen:
  elements:
    - "Video: 2020-07-31-part1"
    - "Subscribe: Junichi"
    - "Video: Best for viewer"
sns:
  post: >
    今週の動画は新しくYouTubeと共に運営していくことに決めた技術ブログについてです。技術ブログを作っていくにあたって考慮した点や、実際に使うことに決めたツールについて紹介します。💻 #エンジニア #Nextjs
  twitter: https://twitter.com/JunichiSugiura/status/1283989809913102336?s=20
---

## Outline

- 一昔前のポピュラーな技術構成
  - WordPress
    - 公式サイトによると世界中の 35%のサイトが使用しているらしい
    - PHP + MySQL
    - MySQL データベースとテンプレートエンジンのセット
    - 利点
      - エコシステムの充実
      - 沢山の人が未だに使用している
      - ネット上にたくさん情報がある
      - コーディングしなくてもサイトを作れる・デプロイもできる
      - widget などサードパーティ製のプラグインが充実している
    - 欠点
      - 技術スタックがフレキシブルではない
      - 予め決められた技術を使う必要がある
      - MySQL データベースを用意する必要がある
      - PHP
        - 今のフロントエンド制作はほぼ React
      - 将来他の技術が進化してきた際に移行が難しい
  - Headless CMS
  - Rails をはじめとしたサーバーサイドアプリケーション
    - リクエストがきてから静的サイトを作成するので遅い
    - 動的な要素の追加が難しい
  - React をはじめとしたシングルページアプリケーション
    - Gmail のようなサクサク動く動的なアプリケーションを簡単に作ることができる
    - JavaScript を通してランタイムでページをレンダーするので初期のロードに時間がかかる
    - 静的ページではないので SEO に工夫が必要
      - 最近は Google のクローラーも SPA を考慮してくれるようになってきたが、比較的新しい技術のため静的ページほどの安心感はない
- モチベーション
  - 殆どのサイトは static (静的）であるべき
  - なぜなら静的サイトは安くて早くて簡単だから
  - ビルド時に静的ページをジェネレートしておき CMS にキャッシュしてそこから配信することで最高のパフォーマンスを引き出すことができる
  - 必要に応じて動的にサイトを動かす事もできる
  - → JamStack
  - 静的なサイトを作るには、コンテンツをどこで管理するかによって３つの方法がある
    - API リクエストなしにローカルのファイルを読み込む方法
      - ファイル形式としては html, json, jsx, mdx など
      - Next.js, Gatsby, Hugo, Jekyll 等のフレームワークが有名
    - ビルド時にサーバーからデータを fetch してくる方法
      - Headless CMS
        - Contentful
        - NetlifyCMS
        - Prismic
        - Strapi
        - Sanity
      - SQL, API, GQL
      - Next.js, Gatsby
    - runtime でデータを fetch してくる方法
      - リクエストが来たタイミングで動的にページを生成する
      - Incremental Static Generation っていう
      - Next.js, Gatsby
    - 静的サイトのパフォーマンスと動的サイトのフレキシビリティ、両方のいいとこ取りができる
- Next.js vs Gatsby
  - 元々は SSR -> Next.js, SSG -> Gatsby
  - v9.3 から Next.js が SSG に対応
  - どちらを使うべきかの判断が難しくなる
  - Gatsby
    - 利点
      - プラグインの充実
      - GQL
      - Opinionated
    - 欠点
      - Opinionated
      - 新たに覚えることがたくさんある
        - Plugin, GQL
  - Next.js
    - 静的サイトから初めて後に EC サイトなど動的な要素を入れていくことも可能
    - API がシンプルで覚えることが少ない
      - Data Fetching hook function を export するだけ
        - getStaticPaths
        - getStaticProps
        - getServerSideProps
    - function 自由に書くだけなので技術構成がフレキシブル
      - Data fetching レイヤーに GQL も使える
  - ## Next.js
- 技術スタック
  - Language: TypeScript
    - サイトのクオリティーを担保するには JS にも片付けは必須
    - 少し前には Flow という選択肢もあったが最近はほぼ TypeScript に移行している
    - サードパーティ製のライブラリを使う際にも型情報から API を把握することができる
    - リファクタ等をする際にもコンパイル時に型チェックをしてくれるのでバグを出しにくい
  - Frontend Library: React
    - 最近のフロントエンド界隈ではデファクト
  - Framework: Next.js (SSG)
  - CMD: mdx
    - jsx と markdown を一緒に書ける
    - markdown は GitHub の README を初めとしたエンジニア普段からよく書いている馴染みのあるフォーマット
    - 最近のフロントエンドは余程の場合 React を使った jsx で書かれている
  - Headless CMS (optional)
    - エンジニア以外も記事を投稿する場合に便利
    - エディター用の UI が用意されている
    - サーバーを自分で用意する必要がない -> サーバーレス
    - 僕の場合はエンジニアなのでマークダウン形式のほうが馴染みが深い
  - CSS in JS: ThemeUI
    - 内部的には emotion を採用
    - デザインシステム
    - MDX もサポート
    - CSSProperties を使った Theme もサポート
      - dark mode も作りやすい
      - CSSProperties によって最初にページをロードしたときにちらつきがでない
    - 多彩な component
      - Styled System にインスピレーションをうけた方式
      - Styled System -> low level
        - フレームワークに影響をウケない
        - React, Vue, Node, Svetle 等いろいろなフロントライブラリーと使える
  - Deploy: Vercel
    - Next.js を作っている会社と同じ会社が作っている
    - 無料プランが充実している
    - 使い方が簡単
      - 使い方っていうのもないくらい
    - PR 毎に環境を自動で立ち上げてくれる
    - 涼介さんのビデオ
  - Linter: ESLint
  - CI: GitHub Actions

## Intro

プログラマーにとって勉強したことのアウトプットって結構重要ですよね。最近自分もこうやって YouTube で発信していく中でいい意味でこれを感じています。YouTube に続いて技術ブログの方でも情報を発信していこうと思ったので、いろいろな技術構成についてリサーチしてみました。ということで今回は 2020 年にモダンな技術ブログを作るための技術スタックについて紹介していきたいと思います。

## Main

### 従来のポピュラーな実装方法

まず従来からある割とポピュラーなアプローチといえば主に３つあると思ってます。

1. 1 つ目は Wordpress を使う方法
1. 2 つ目は Rails を始めとしたサーバーサイドアプリケーションを実装方法
1. そして最後に React 等を使ってシングルページアプリケーションを作る方法

です。

#### Wordpress

まず Wordpress を使う方法なんですけど、
主な利点としては

- 偉大なエコシステムが存在していること
- きれいな UI を通してコードを書かなくてもサイトを公開できること
- 多彩なサードパーティ製のテンプレートやプラグイン、ウィジェットなんかをつかうことができること

です。

Wordpress の公式サイトによると世界中の約 35%のサイトが Wordpress を使って作られているそうです。これって結構すごい数字ですよね。みなさんも毎日 1 度は Wordpress で作られたサイトを見ているかもしれません。

Wordpress は主に PHP を使ったテンプレートエンジンとコンテンツ用のデータベースとして MySQL を使用していきます。

ただ自動で生成される Admin ページを使用したり、サードパーティ製のテンプレートを活用することでエンジニアリングの知識がない人でも簡単にサイトを作成・公開することができます。また先ほどお伝えしたとおり使っている人も多いので、分からないことはググれば比較的簡単に解決策を見つけることができます。

ただ欠点としては

- 技術構成がフレキシブルではないこと
- MySQL データベースを用意する必要があること
- PHP(草 w)を使う必要があること

です。

今どきの技術はどれもモジュラー化が進んでいてなるべく一つのフレームワークに依存することを避けることが推奨されています。Wordpress のような巨大なフレームワークに依存すると、将来新しくてもっと便利なライブラリーが出てきたときに、簡単に移行することができなくなります。このような仕様のことを技術的負債っていったりしますよね。あと最近のフロントエンドは割と React を初めとした JavaScript ベースのライブラリーを使って書かれているケースが多いので、このご時世に PHP って結構抵抗があったりします。あまりここで本音を言っちゃうと、予期しない宗教論争に発展しても困るのでこの編やめておきますｗ またブログの記事管理のためだけに MySQL を用意するのも個人的にはオーバーキルな気がしています。

こういった背景もあって最近は Wordpress からバックエンドだけを切り離した、Headless CMS と言われるサービスも人気になってきていますね。この辺りに後ほどもう少し詳しく解説していきます。

#### サーバーサイドアプリケーション

次に Rails を初めとするサーバーサイドアプリケーションを用意する方法ですが、これにもいくつか欠点があります。この様なアーキテクチャだとリクエストが来てから静的ページを作成してクライアントに送り返すのでコンテンツのロードに少し時間がかかります。あとっ将来的に動的な要素を追加したくなった際も実装が難しくなります。

#### シングルページアプリケーション

最後にシングルページアプリケーションを作る方法ですが、これにもいくつかトレードオフがあります。React とかモダンなフロントエンドライブラリーを使うことで Gmail のようなサクサク動く動的なアプリケーションがつくりやすくなったり、バックエンドが切り離されているので比較的フレキシブルな技術選定を行うことができるのですが、この様なアーキテクチャは基本的に JavaScript を通してランタイムでページをレンダーするので初期のロードに時間がかかります。あと表示されるサイトは静的ではないので SEO にも工夫が必要になってきます。最近は Google のクローラーも SPA を考慮してくれるようになってきてるみたいなんですけど、比較的新しい技術のため静的ページほどの安心感はないですよね。

### JAMStack

これらを踏まえた上で自分がどの様な構成で今回技術ブログを作って行きたいかと言うと、まずはブログを static サイトにすることです。なぜなら静的サイトは安くて早くて簡単だからです。ビルド時に事前に静的ページをジェネレートしておいて、CMS にキャッシュしておくことで、リクエストがあった場合にそこから素早くコンテンツを配信することができます。そして React を使っておくことで必要に応じて 動的な機能も実装しておけるようにしておきたいと思います。これらのアーキテクチャの事を通称 JamStack といったりもします。

では次に JamStack を使って static サイトを作るにはどんな方法があるかと言うと、コンテンツをどこで管理するかによって主に 3 つに別れます。

まずはコンテンツをファイルで管理して、それをビルド時に読み込んでジェネレートする方法です。ファイル形式としては html や json, yaml, markdown, jsx といったものが一般的にが使われます。この辺りは Jekyll という Ruby で書かれたフレームワークが走りとなって、その後に Go で実装された Hugo, JavaScript の Gatsby といった様々な実装がリリースされてきました。

次にローカルファイルの代わりとして先程紹介した Headless CMS を活用する方法です。Headless CMS を使用するとコンテンツ用のサーバーやデータベースを自分で構築する必要がなくなります。またきれいなエディターの UI も実装されているケースが多いので、エンジニア以外の人でも記事を簡単に作成・投稿することができます。ビルド時に SQL だったり REST API や、GraphQL といったものを通して CMS サーバーからコンテンツデータを fetch してきて、そこからページをジェネレートしていきます。有名所でいうと Contentful, Prismic, Strapi といったサービスがあります。

最後に必要におおじて runtime でデータを fetch してくる方法もあるんですけど、これはリクエストが来た際に動的に staic ページを生成できるので、medium のような投稿機能も実装することができます。Gatsby や Next.js といったフレームワークには Incremental Static Generation という機能があるのでこれを使って簡単に静的サイトのパフォーマンスと動的サイトの柔軟性両方のいいとこ取りができるようになります。

### Next.js vs Gatsby

ここまでわかった段階で自分が使えそうなフレームワークとしては Next.js と Gatsby が候補として上がってくるのですが、どちらを選ぶかの判断は日に日に難しくなってきています。

元々 Next.js はサーバーサイドレンダリングを売りとしたライブラリだったので、ブログのような静的サイトの作成したい場合は Gatsby を使うのが一般的だったのですが、v9.3 のアップデートから Next.js もサーバーサイトジェネレーションに対応したので、2 つの違いは非常に小さなものになりました。

Gatsby の利点としては

- 多彩なプラグインをコンフィグしていくことでブログに必要な機能を一通り簡単に実装できること
- データのフェッチレイヤーに GraphQL を使用すること

です。

ただ GraphQL は覚えることも多いので人によっては欠点にもなりえます。また比較的主張が強いフレームワークなので、後々自分でカスタマイズしたい際に調べることが多くなったり、plugin に依存するので柔軟さも低いです。

僕は一度 Gatsby を使った経験があるので今回は Next.js を使用することに決めました。
理由としては Next.js はもともと SSR に特化したフレームワークだったということもあり拡張性も高くて、後々 EC サイトやコミュニティーフォーラムみたいな動的な機能を実装したくなった場合でも、程度のパフォーマンスが期待できるなと思ったこと。そして API が非常にシンプルなので新しく覚えることが少なくてラーニングカーブが緩やかに感じたことです。基本的に Next.js で data フェッチングを実装するときには getStaticPaths, getStaticProps, getServerSideProps みたいな hook 用の function を各ページから export しておくだけなので、その中でどの様にデータを取ってくるかは自分で自由に実装することができます。自分のニーズによってはここで GraphQL を使用することもできます。ただ Gatsby のような plugin はないので、SEO やページング、画像読み込みみたいなブログでよく使われる機能を全て自分で実装していく必要があります。ただ現状の自分の経験値と将来の柔軟性を考慮して今回は Next.js を採用することにしました。

### 今回使用する技術スタック

最後に今回使用する技術スタックを一通り紹介していきます。

#### TypeScript

まず言語としては TypeScript を使用します。やはりある程度のクオリティーを担保するには JS にも片付けは必須だと思います。またサードパーティー性のライブラリを使う際にも型情報から API を把握することができたり、リファクタ等をする際にもコンパイル時の型チェックを通して未然にバグを潰すことができるので自分の中で使わない選択肢はありませんでした。少し前には Flow という選択肢もありましたが、最近のトレンドを考慮すると今は TypeScript 一択だと思います。

#### React

そしてフロントエンドのライブラリーとしては React を使っていきます。かれこれ 5 年ほど業務で使っていて個人的に慣れてて好きです。

#### Next.js

フレームワークは先程紹介した Next.js のサーバーサイドジェネレーション機能を利用していきます。

#### MDX

コンテンツは MDX という形式を使用してブログの実装と一緒に Git で管理していきます。これは README でエンジニアにはおなじみの markdown ファイルに jsx も書ける用になったフォーマットです。これによってブログの記事自体はマークダウンで書いて、必要におおじて React のコンポーネントを差し込むことができます。まあレイアウトをしていく際なんかにも便利になってきます。あと GitHub の PR を通してレビューも効率的に行うことができます。

#### Theme UI

スタイリングには ThemeUI という CSS in JS 系のライブラリーを使用していきます。これは比較的新しいライブラリーで内部的に emotion や StyledSystem を使用してものになります。採用を決めた理由としてはいくつかあるのですが、

まずは

- emotion を使うことで babel でトランスパイルする時に CSS を JavaScript から切り離して head タグに直接埋め込むことができることと
- 内部的に CSSProperties を使用しているのでダークモードをレンダーする際の初期のチラツキ、フラッシュをなくすことができること
- デザインシステムを採用しているので一貫したスタイリングを提供できること、
- MDX にも対応していること
- あとは Styled System に影響をうけた様々なコンポーネントを提供していることです。

なおこれらのコンポーネントにも自動で自分が設定したテーマを適用してくれます。

#### ESLint + Prettier

#### GitHub Actions

Linter としては ESLint と Prettier を使って GitHub Actions を通して CI でチェックだったり test を自動化していきます。

#### Vercel

そして最後に deploy には Vercel を使います。これは Next.js を作っている会社と同じところが提供しているサービスなので相性がいいからです。あと無料プランが結構いけてて、カスタムドメインが使用できたり、PR 毎に個別の deploy 環境を自動でたててくれたりするのでコーディング全くなしで deploy できます。

## Ending

以上 2020 年にモダンな技術ブログを作るためのスタックについて紹介してきましたが、いかがだったでしょうか？次回からは実際のセットアップ方法から実装、デプロイまでを 1 つ 1 つチュートリアルとして紹介していくのでよかったらチャンネル登録の方よろしくおねがいします。じゃあまたね〜👋