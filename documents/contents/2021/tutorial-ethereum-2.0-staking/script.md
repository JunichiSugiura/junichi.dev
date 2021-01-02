## イントロ

今回はEth Stakingを始めるために必要なバリデーターノードのセットアップ方法を紹介していきます。
Eth StakingをすることでEthereum 2.0の安全性の強化に貢献したり、その対価として不労所得を得たりすることができます。
Ethereum 2.0とかstakingの概要に関しては先週投稿したこちらの動画を参考にしていただけたらと思います。概要欄にも張っておきます。

[Ethereum 2.0が解決する３つの問題](https://youtu.be/yjiNggXoc9E)

今回は練習ということでPyrmontとGoerliというtestnetを使ってnodeを走らせていこうと思います。

主な流れとしては
- Metamaskと32ETHの用意
- gethを使ってEth1 nodeを立ち上げ
- Prysmを使ってEth2のBeacon Chainをsync
- Validator用の鍵を生成
- Validator nodeを立ち上げ
- デポジットコントラクトへのトランザクションを作成

こちらは全てLaunchpadというサイトに手順がまとまっているので、そちらを見ながら進めていきたいと思います。

## チュートリアル

### Metamask
- インストール
- Ledgerからアカウントをインポート

### Launchpad
[Eth2 Launch Pad for Pyrmont testnet](https://pyrmont.launchpad.ethereum.org/)

- Overview
  <!-- - Ethereum 2.0はproof-of-stakeを使います
  - PoWのマイナーに変わってバリデーターがブロックの整合性のチェックと新規ブロックの作成を行います
  - その対価として誠実なバリデーターには報酬が付与されます
  - バリデーターははじめに決められた分のETHを担保としてデポジットする必要があります
  - これを資金をstakeすると表現します
  - バリデーターになる唯一の方法はETH 1.0チェーンに存在するデポジットコントラクトに向けたトランザクションを作成することです
  - **一度デポジットすると将来ETH2.0がラウンチするまで引き出すことはできません。** -->
- Signup
  <!-- - バリデーター１つにつき32ETHをデポジットする必要があります。 -->
  - **一度デポジットすると将来ETH2.0がラウンチするまで引き出すことはできません。**
- Responsibilities
  <!-- - アクティブに参加しているバリデーターのみに報酬が付与されます。
  - **オフライン状態になると正常時に報酬として受け取るはずだった対価と同額のETHがペナルティとしてデポジットから引かれます。** -->
- Slashing
  <!-- - 悪意を持った行動を起こしたバリデーターやスペックに反したものにはスラッシュという厳しいペナルティが課せられます
  - 要するに変なブロックを作ってしまったりするとデポジットからかなりの資金を溶かされることになります -->
- Key Management*
  - バリデーターの鍵は固有のネモニックフレーズから復元ができます
  - ネモニックは24個のワードのこと
  - 24個のワードをhex値にしたもののことをシードといいます
  - このシード・ネモニックをなくすと鍵を復元できなくなるので注意してください
  - 無論、鍵を復元できないとデポジットした資産を後で引き出せなくなります
  - 紙などインターネットに接続していないものにメモをとって誰にも見られない安全な場所に保管しましょう
- Signing Keys
  <!-- - このページ(Launchpad)はバリデーター用の鍵を作成したり後ほど作成する公開鍵が入ったデポジットファイルをアップロードするのに役立ちます -->
- Transfer Delay*
  - フェーズ１に移行するまでバリデーター間の送受金することはできません
  - フェーズ２に移行するまでデポジットや報酬を引き出すことは出来ません
  - **depositしたETHをwithdraw(引き出し)できるのは少なくとも2年後ですよ**
- Commitment
  <!-- - バリデーターを一度はじめたらフェーズ１に送受金が解禁されるまで途中でやめたり再スタートすることはできません
  - 長い戦いになることを覚悟してください -->
- Early Adoption Risks
  - アーリーアダプターとしてソフトウェアにバグがあった場合にスラッシュにつながるリスクがあることを承知してください
- Confirmation

### Eth1 クライアントの選定

こちらではEth1ノードを走らせるためのクライアントを選択します。
Ethereumクライアントというのはノードを走らせるためのCLIツールのことです。
これを使って走らせたノードはネットワーク上の他のノードと通信することによってみんなのブロックチェーンを同期してきます。
Ethereumのいいところはクライアントアプリが複数あることによってバグが有った場合などに全部のネットワークが止まってしまうのを回避しているところですね。
初期の頃はクライアント毎に若干仕様が違ってそこから問題が生じることもしばしばありましたが、テストの共通化などを通してだいぶ安全になりました。

今回はGethを使っていきます。理由はEthereum foundation自体が開発しているプログラムになるので一番普及している点です。
何かに困ったときにググりやすい。
Gethという名前はgo-ethereumの略です。その名の通りGoで実装されています。
その他にもRustで実装されたParityのOpenEthereumや.NETベースのNethermind,
エンタープライズ向けのJavaで書かれたBesuなどが候補として挙がってます。

### Ethereum 1.0のNodeをセットアップ

一旦コンソールの方に移動してGethをインストールしていきます。

### チェーンデータを保管するディレクトリを作成する

mac内蔵のSSDだと容量が心配なので今回は外部接続のSSDを使います。HDDだとチェーンのシンクが間に合わないので必ずSSDを用意するようにしていください。Eth1メインネットをシンクするためにはだいたい3~400GBくらい必要です。今回はGoerliテストネットなので20GBあれば十分だと思います。

それ用のサブディレクトリを作成しておきます。

```sh
mkdir -p /Volumes/Lacie/ethereum/goerli
```

### Gethを使ってEthereum 1.0 nodeをsyncさせる

```sh
geth --http --datadir /Volumes/LaCie/ethereum/goerli --goerli
```

最新のBlock heightを比べてsyncが終わったかどうかを確認。

```sh
geth attach --datadir /Volumes/LaCie/ethereum/goerli

> eth.syncing
{
  currentBlock: 3914181,
  highestBlock: 3914262,
  knownStates: 19214579,
  pulledStates: 19182568,
  startingBlock: 3912193
}

# falseが帰ってくるまで待つ
```

[Goerli Testnet Explore](https://goerli.etherscan.io/)
こちらでも最新のブロックを確認できる

<!-- TODO: syncにかかる時間と容量 -->

一度Launchpadに戻ります。

<!-- 各クライアントの紹介をしてコンソールに戻る -->

### Ethereum 2.0のBeacon Nodeをセットアップ

#### インストール

[docs](https://docs.prylabs.network/docs/install/install-with-script#installing-prysm)

インストール方法は３つ
1. インストールスクリプト
2. Docker
3. Bazelを使ってソースコードからビルド

一番簡単な`インストールスクリプト`で今回はインストールしていきます。

```sh
### インストール
mkdir prysm && cd prysm
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```

aliasかpathを設定

```sh
# ~/.zshrc
alias prysm="~/prysm/prysm.sh"
# or
# export PATH=$PATH:$HOME/prysm
```


#### 最新バージョンを確認(自動アップグレード)

```sh
prysm beacon-chain --version
```

#### チェーンデータを保管するディレクトリを作成する

```sh
mkdir -p /Volumes/Lacie/ethereum/pyrmont
```

#### Nodeを走らせてBeacon Chainをsyncする

所要時間: 3, 4時間

```sh
prysm beacon-chain --http-web3provider=http://localhost:8545 --datadir=/Volumes/Lacie/ethereum/pyrmont --pyrmont

# Prysmatic Labs Terms of Use

# By downloading, accessing or using the Prysm implementation (“Prysm”), you (referenced herein
# as “you” or the “user”) certify that you have read and agreed to the terms and conditions below.

# TERMS AND CONDITIONS: https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md


# Type "accept" to accept this terms and conditions [accept/decline]: (default: decline):
accept
```

Explores
- [BeaconScan](https://beaconscan.com/pyrmont)
- [beaconcha.in](https://pyrmont.beaconcha.in/)

<!-- Launchpadに戻る -->

### キーペアの作成

LaunchpadのGitHubへのリンクからツールをインストール。

```sh
# HOMEにdeposit excutableをコピー
mv ~/Downloads/eth2deposit-cli-ed5a6d3-darwin-amd64 ~/eth2.0-deposit-cli

# そしてネモニックの作成
~/eth2.0-deposit-cli/deposit new-mnemonic --num_validators 1 --chain pyrmont

# ネモニックを紙にメモ
```

今回はチュートリアルなので表示させてますが、みなさんは絶対に誰にもシェアしないでね。

作成された鍵を確認

```sh
ls -la validator_keys
```

### バリデーターノードを立ち上げる

[Step 5: Import your validator accounts into Prysm](https://docs.prylabs.network/docs/testnet/pyrmont/#step-5-import-your-validator-accounts-into-prysm)

```sh
# バリデーター鍵をインポート
prysm validator accounts import --keys-dir=$HOME/eth2.0-deposit-cli/validator_keys --pyrmont

# バリデーターノードをスタート
prysm validator --pyrmont
```

### デポジットコントラクトへのトランザクションを作成

<!-- Launchpad -->

[Etherscan Goerli Testnet](https://goerli.etherscan.io/) で確認


## まとめ

ということでチュートリアルの方は以上になります。
いかがだったでしょうか？
ここまで見事たどり着いたよって方はおめでとうございます！
そして長い時間ご視聴ありがとうございました。

実際にメインネットにバリデーターを運用していく際には2年以上にも渡り24時間365日フル稼働させる必要があるので、
実用性のあるLinuxサーバーを自宅で運営してそこにホストするのをおすすめします。

また要望いただければ必要機材だったりLinuxサーバーの環境構築方法なんかも動画で紹介しようと思っているので、ぜひコメント欄で教えて下さい。
<!-- systemdを使ってバックグラウンドで自動でノードを起動させたり、FWの設定、sshを通した遠隔でのモニターなどなど、 細かいTipsがそちらもたくさんあるので、 -->

ぜひこの動画をきっかけにより多くの方々にEth2に参加してもらって、より安全なネットワークにつながれば幸いです。

参考になったよっていう方はぜひチャンネル登録を通してサポートの方をよろしくお願いいたします！

じゃあまたね
