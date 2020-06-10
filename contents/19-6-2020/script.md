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
