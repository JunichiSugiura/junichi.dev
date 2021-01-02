---
title: "Apple Tax"をめぐる戦い[Epic Games(Fortnite) vs Apple]
description: >
  iOS/iPadOSアプリ内での支払いに"一律"30%の手数料を徴収する通称"Apple Tax"。アプリ開発者が買い切りモデルからサブスクリプションモデルに移行した今、はたしてこれはプラットフォーマーに支払われるべき妥当な対価なのでしょうか？今回はEpic Gamesの身を削った挑戦についてまとめてみました。

  ------------- 📌 Chapters -------------
  0:00 イントロ
  0:13 Epic Gamesの紹介
  1:11 Appleの紹介
  1:33 Apple Tax
  1:57 これまでの出来事
  2:05 バトルのはじまり (The Fortnite Mega Drop)
  3:01 Appleの反撃
  3:39 SDKのアクセス制限
  3:52 Unreal Engine
  4:43 起訴内容
  5:30 #FREEFORTNITE
  5:38 Nineteen Eighteen-Fortnite
  6:22 Free Fortnite Cupと皮肉の効いた賞品
  7:44 Microsoftの賛同
  8:25 裁判と判決
  9:08 #FREEFORTNITE Asset Pack
  9:53 ゲーム業界でのApple Tax影響
  11:22 App Storeの売上
  11:51 サブスクリプションモデルとApple Tax
  13:42 Apple Taxの例外
  14:29 Google Play StoreとGoogleの独占
  16:09 Facebookの試み
  17:09 Epic Games CEOのツイート
  17:54 今後の流れ

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

  ---------- 🙏 ATTRIBUTION ----------
  By Official GDC - _DSC5777, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=77551318
  By Source (WP:NFCC#4), Fair use, https://en.wikipedia.org/w/index.php?curid=53764597
thumbnailKeywords:
  -
tags:
  # - プログラミング
  # - エンジニア
  # - プログラマー
  # - 開発
  # - 学習
  # - テック
  # - 海外就職
  # - キャリア
  - Epic Games
  - Fortnite
  - Apple
  - Apple Tax
  - 30%
  - iOS
  - iPadOS
  - App Store
  - Google
  - Google Play
  - Microsoft
  - Facebook
  - The Fortnite Mega Drop
  - Unreal Engine
  - Nineteen Eighteen-Fortnite
  - FREEFORTNITE
  - gaming
  - game
  - Antitrust
  - Amazon
  - Prime Video
  - アップル
  - エピックゲームズ
  - フォートナイト
  - グーグル
  - マイクロソフト
  - フェイスブック
  - 独占
  - 市場独占
  - ゲーム
  - アマゾン
  - プライムビデオ
link: https://youtu.be/jsOvclqQkhw
publishedAt: 2020-09-26 02:00:00
playlists:
  -
endScreen:
  elements:
    - "Video: Best for viewer"
    - "Subscribe: Junichi"
sns:
  post: >
    iOSアプリ内での支払いに"一律"30%の手数料を徴収する通称"Apple Tax"
    
    買い切りモデルからサブスクリプションモデルに移行した今、果たしてこれはプラットフォーマーへの妥当な対価なのでしょうか？

    今回はEpic Gamesの身を削った挑戦についてまとめてみました
    https://youtu.be/jsOvclqQkhw
  twitter: https://twitter.com/JunichiSugiura/status/1309643850898485248
---

## Outline

### 概要
- Epic GamesとAppleバチバチですね
- 以前反トラスト公聴会についてお話しましたが、Appleの独占に疑問視しているのはアメリカ議会だけではない
- Epic Games(Fortnite, Unreal engineを作っている会社)
  - Fortnite
    - バトルロワイヤルゲームのジャンルでトップ
    - 今年５月時点でプレイヤーは3億5000万人
    - ゲーム自体は無料でプレイする事ができるが、課金をすることでプレイするキャラクターのコスチュームなどを購入することができる
    - これによって、数千億の売上を得ている
    - iOS以外にも様々なプラットフォームに対応
      - スマホ
        - Android
      - コンソール
        - PlayStation
        - Xbox
        - Nintendo Switch
      - PC/Mac
- Apple(世界で一番市場価値の高い会社)
- App Store
  - iOSのユーザーにアプリを配信する唯一のエントリーポイント
  - Apple Tax
    - アプリ内課金の手数料として取引金額の30%を徴収
    - App Store(iOS, iPad OS)上のアプリ開発者全員*に適用

### Epic Gamesの反撃
- Epic Direct Payment
  - The Fortnite Mega Dropキャンペーンの一貫
  - 8月13日に発表
  - iOSとAndroidアプリ内
  - 最大20%の割引
  - Apple/Google paymentを通すと30%のtax (←これを回避してユーザーに還元)
  - 完全にプラットフォーム規約違反
  - 同時に他のプラットフォームでも同様の割引キャンペーンを展開

### Appleの反撃
- すぐにFortniteをApp Storeから削除
- developer agreementに違反したため
- すでにinstallしているユーザーはプレイできる
- 新たにインストールはできなくなった
- 新しいシーズン等のアップデートはできない
- 8月17日にAppleはEpicGamesの開発環境へのアクセス制限を検討しているとEpicGamesが主張
  - 後にAppleも認める
  - FortniteだけではなくUnreal Engineにも影響
  - 世界中のゲームデベロッパーが焦る

### Epic Gamesの追撃
- Appleを起訴
  - 事前に用意していたと考えられる
  - Appleがシャーマン法に違反している
  - AppleのiOSアプリの流通における独占を指摘
  - EpicGamesの目的はお金ではなく、裁判所からAppleにiOS市場における競合阻止をとめるように命令してもらうこと
- #FreeFortnite
  - Nineteen Eighty-Fortnite
    - 1984年に放送されたMachintosh commercialのパロディー
    - Apple
      - George Orwellの小説を引用
      - 大物に支配される悲惨な将来
  - #FreeFortnite Cup Tournamennt
    - 8/23
    - 賞品
      - "Tart Tycoon"
      - Free Fortnite hat
      - Alienware Gaming Laptop®
      - Samsung Galaxy Tab S7®
      - OnePlus 8®
      - PlayStation 4 Pro®
      - Xbox One X®
      - Nintendo Switch®
      - Razer® Gaming Laptop

### Microsoftの賛同
- 8月23日
- Unreal Engineはゲームクリエイターにとってなくてはならないツール
  - 他のゲームエンジンに乗り換えるには長い時間がかかる
  - 会社の規模によってはプロジェクトの存続不可能
- 自社のForza Streetで使用している
- EpicGamesを支援

### 判決
- 8月24日
- オンラインでのバーチャル裁判
- Epic Gamesは意図的、戦略的にApp Storeの規約を破ったものの、開発ツールへのアクセス制限は公共の利に有害な影響を及ぼす
- 開発ツールへのアクセスは復旧、Fortniteは戻らず

### #FreeFortnite Gear
- 8/26
- #FreeFortnite Asset Pack
- このLogoを使った商品開発、販売を許可
  - Tシャツ
  - ステッカー等

### Big picture (Apple Taxの背景)
- 20年前、ゲームがほしいときは店頭で購入する必要があった
- 当時お店は50%のマージンをとっていた
  - 流通費、店舗の家賃、人件費、マーケティング費
- 開発者の利益は薄かった
- 今はPlaystation Storeのようなオンライン配信で買える
  - 30%
  - Appleが生み出したApp Storeの仕組みによる影響が大きい
- 公聴会でのTim Cook (流通費50-70% / 2 = 30%)
- 2019年の売上 $50billion = 5兆円, 1.5兆円ほどの利益
  - サーバー維持費には高すぎない？
- 昔は有料アプリの買い切りが主流だったが今はSubscriptionモデル
- AppTaxを避けるためにKindleの購入はウェブ
- Spotifyも少し前までアプリから直接支払いする場合は+$3を課していた
  - 売上の30%は競合に支払われる仕組み
- Appleは例外も認めている
  - 今年の4月、Amazon Primeに独自決済の仕組みの使用を許可している
    - AmazonはApple Taxを回避
    - Amazonはルールを曲げれるほど強い会社

### Google Play Storeの独占
- AndroidのアプリはGoogle Play Store以外からもインストールすることができる
- 現状US市場はほぼGoogle Play Storeからダウンロードされている
- Fortniteも他のプラットフォームから配信をしてみたが、ユーザーを促すことはできなかった
- Googleはあの手この手でGoogle Play Storeが競合プラットフォームから有利になるようにしている
  - Gmail, Google Search, YouTubeはGoogle Play Storeのみで配信
  - Android端末を製造する会社はGoogle Play StoreをデフォルトのApp Storeに設定にしない限り、↑のアプリをプリインストールしておくことはできない
  - AmazonのFire OSはオープンソースになっているAndroidのコードをベースに独自のエコシステムを開発したもの

### Facebook
- 8月28日
- "Apple takes 30% of this purchase"
- メッセージを表示しようとしたらAppleにブロックされる
- "ユーザーに関係ない情報を表示した"

### PUBG
- 8/28
- PUBGがv1.0をリリースし大幅なアップデート
- Epic GamesのCEOが促進
- バトルロワイヤル系ゲームの競合
- Unreal Engineを使用

### References
- [What you need to know about Epic Games’ feud with Apple (and Google)](https://www.digitaltrends.com/gaming/epic-games-feud-with-apple-and-google-explained/)
- [Epic Games Wants You To Sell Your Own "Free Fortnite" Merch](https://www.gamespot.com/articles/epic-games-wants-you-to-sell-your-own-free-fortnit/1100-6481596/)
- [Epic Games CEO Promotes PUBG Mobile In Jab At Apple Over Fortnite Ban](https://www.gamespot.com/articles/epic-games-ceo-promotes-pubg-mobile-in-jab-at-appl/1100-6481597/)
- [Fortnite vs Apple: App Store Royale](https://youtu.be/r70ZdDQt4K8)
- [THE FORTNITE MEGA DROP - PERMANENT DISCOUNTS UP TO 20%](https://www.epicgames.com/fortnite/en-US/news/the-fortnite-mega-drop-permanent-discounts-up-to-20-percent)
- [Apple blocks Facebook update that called out 30-percent App Store ‘tax’](https://www.theverge.com/2020/8/28/21405140/apple-rejects-facebook-update-30-percent-cut)
- [‘Free Fortnite’ Cup: Here Are All The Prizes, And How To Earn Them](https://www.forbes.com/sites/davidthier/2020/08/23/list-tart-tycoon-free-fortnite-cup-here-are-all-the-prizes-and-how-to-earn-them/#2160fbe15177)