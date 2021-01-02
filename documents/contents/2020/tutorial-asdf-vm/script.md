## Intro

今回は asdf というライブラリを使ってランタイムのバージョン管理を一括で行えるようにしていこうと思います！

以前投稿した dotfiles のチュートリアルに沿った形でツールをインストールしていくのでHomebrew BundleやStowの使い方など分からない箇所があったらぜひそちらのビデオもチェックしてみてください。リンクは画面右上のインフォパネルか概要欄に張っておきます。もしよかったら画面左下のチャンネル登録ボタンも押してサポートしていただけると助かります 🙏

## ランタイムのバージョン管理って何?

ランタイムのバージョン管理何？って方のために簡単に説明すると、 例えば業務で NodeJS を普段書いていたとして、プロジェクト毎に違うバージョンのNodeを使わなければいけないことがちょくちょくあります。そういった場合に従来だったら nvm や nodebrew といったツールを使うことで異なるバージョンの node を同時にインストールして、プロジェクトによって随時切り替えることが出来ます。

ただ僕のように React Native などを使って開発してる場合は iOSのビルド用にRubyを入れたり, Android 用に Java...といったように言語が増えるたびに(rbenvなりjvmなり)個別のバージョンマネージャーをセットアップする必要があります。

そこでasdfの出番です。

asdf は様々なランタイムのバージョンを一括管理するための CLI ツールです。

このツールには plugin という概念が存在していて、NodeJS や Ruby、Python など様々な種類がすでに用意されています。また自分で新たに plugin を作成し、GitHub を通してホストすることもできます。

さらに plugin の中にはプログラミング言語だけではなく、gcloud だったり mysql みたいな様々なランタイムが用意されています。

まぁ正直プログラミング言語くらいしかバージョンを細かく切り替えての作業していくことってないかなと思うので、後のものは Homebrew で管理すれば良いかなと思います。

ということで早速 asdf をインストールして、僕が普段使っているプログラミング言語の開発環境を整えていきたいと思います。

## コーディング

### まずはasdfのインストール

[docs](https://asdf-vm.com/#/core-manage-asdf?id=dependencies)

```sh
brew install asdf coreutils curl git
```

僕はdotfilesの中にBrewfileを用意しているのでそちらの方に記載していきます。

[docs](https://asdf-vm.com/#/core-manage-asdf?id=add-to-your-shell)

次にこのコマンドを走らせます。

```sh
echo -e "\n. $(brew --prefix asdf)/asdf.sh" >> ~/.zshrc
```

すると`.zshrc`に新たにラインが追加されたのが確認できるかと思います。

### asdf plugin の追加方法

[docs](https://asdf-vm.com/#/core-manage-plugins?id=add)

```sh
asdf plugin add <plugin>
```
### Link .tool-versions

```sh
mkdir -p packages/asdf
touch packages/asdf/.tool-versions
```

```sh
# .tool-versions

nodejs 14.15.1
```

複数のバーションを使いたい場合は横に並べて書いておきます。

```sh
dotfiles

# ファイルがリンクされたことを確認
$ls -la ~/.tool-versions
```

### NodeJSのランタイムをインストール

[docs](https://github.com/asdf-vm/asdf-nodejs#install)

NodeJS pluginを使うってnodeランタイムをインストールする場合は予めキーリングをインポートする必要があるので、まずはそのスクリプトを走らせます。

`gpg`も必要になってくるので入ってない方は予めインストールしておきましょう。

```sh
bash -c '${ASDF_DATA_DIR:=$HOME/.asdf}/plugins/nodejs/bin/import-release-team-keyring'

asdf install nodejs
```

### インストールの自動化

次はこれをインストールするためのスクリプトを書いて`dotfiels`走らるだけで環境構築が終わるようにしたいと思います。また`.tool-verions`の変更にも対応できるようにしておきます。

### Install Script
```sh
# shellcheck disable=SC2013
for plugin in $(awk '{print $1}' ~/.tool-versions); do
    if ! is_dir ~/.asdf/plugins/"$plugin"; then
        asdf plugin add "$plugin"
    fi
done

is_runtime_versions_changed() {
    plugin="$1"
    specified=$(grep "$plugin" ~/.tool-versions | awk '{$1=""; print $0}')

    installed=$(asdf list "$plugin" 2>&1)
    is_changed=
    for version in $specified; do
        match=$(echo "$installed" | grep "$version")
        [ -z "$match" ] && is_changed=1
    done

    [ "$is_changed" ]
}

for plugin in $(asdf plugin list); do
    if is_runtime_versions_changed "$plugin"; then
        if [ "$plugin" = nodejs ]; then
            log 'Import release team keyring for Node.JS'
            # more info -> https://github.com/asdf-vm/asdf-nodejs#install
            bash -c '${ASDF_DATA_DIR:=$HOME/.asdf}/plugins/nodejs/bin/import-release-team-keyring'
        fi

        log "Install runtime: $plugin"
        asdf install "$plugin"
    fi
done
``` 

### 必要なランタイムを全部追加

```sh
# .tool-versions

nodejs 14.15.1
yarn 1.22.10
golang 1.15
rust 1.47.0
deno 1.5.2
python 3.9.0 2.7.18
ruby 2.6.6
java adoptopenjdk-11.0.9+101
```

## Ending
いかがだったでしょうか？asdfを使うことでかなりスッキリとしたdotfilesに仕上げることが出来たかなと思います。

面白かったという方はぜひチャンネル登録の方よろしくおねがいします。

じゃあまたね〜
